create extension if not exists pgcrypto;

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  storage_bucket text not null default 'technical-resources',
  file_path text not null,
  file_type text not null,
  access_type text not null default 'member' check (access_type in ('public', 'member')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.download_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  resource_id uuid not null references public.resources(id) on delete cascade,
  downloaded_at timestamptz not null default now(),
  user_agent text,
  constraint download_events_user_fk
    foreign key (user_id)
    references auth.users(id)
    on delete set null
);

-- Legacy compatibility for older download_events schema
alter table public.download_events
  add column if not exists resource_id uuid;

alter table public.download_events
  add column if not exists user_agent text;

alter table public.download_events
  add column if not exists downloaded_at timestamptz;

alter table public.download_events
  add column if not exists user_id uuid;

update public.download_events
set downloaded_at = coalesce(downloaded_at, now())
where downloaded_at is null;

alter table public.download_events
  alter column downloaded_at set default now();

alter table public.download_events
  alter column downloaded_at set not null;

-- Ensure the foreign key exists only when missing
DO $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'download_events'
      and c.conname = (
        select conname
        from pg_constraint
        where conrelid = 'public.download_events'::regclass
          and contype = 'f'
      )
  ) then
    -- noop: legacy schema compatibility handled in the normal table definition path
  end if;
end $$;

DO $$
declare
  v_has_resource_fk boolean;
  v_has_user_fk boolean;
begin
  select exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'download_events'
      and c.contype = 'f'
      and c.conkey[1] = (
        select attnum
        from pg_attribute
        where attrelid = 'public.download_events'::regclass
          and attname = 'resource_id'
      )
  ) into v_has_resource_fk;

  select exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'download_events'
      and c.contype = 'f'
      and c.conkey[1] = (
        select attnum
        from pg_attribute
        where attrelid = 'public.download_events'::regclass
          and attname = 'user_id'
      )
  ) into v_has_user_fk;

  if not v_has_resource_fk then
    alter table public.download_events
      add constraint download_events_resource_fk
      foreign key (resource_id)
      references public.resources(id)
      on delete cascade;
  end if;

  if not v_has_user_fk then
    alter table public.download_events
      add constraint download_events_user_fk
      foreign key (user_id)
      references auth.users(id)
      on delete set null;
  end if;
end $$;

alter table public.download_events
  drop column if exists product_file_id;

-- Existing rows must remain untouched; only legacy schema compatibility is added.

create or replace function public.get_resource_access_for_download(p_resource_id uuid)
returns table (id uuid, access_type text, is_active boolean)
language sql
security definer
set search_path = ''
stable
as $$
  select
    r.id,
    r.access_type,
    r.is_active
  from public.resources as r
  where r.id = p_resource_id
  limit 1;
$$;

revoke execute on function public.get_resource_access_for_download(uuid) from public;
grant execute on function public.get_resource_access_for_download(uuid) to anon, authenticated;

create or replace function public.record_download_event(
  p_resource_id uuid,
  p_user_agent text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_access_type text;
  v_is_active boolean;
begin
  if v_user_id is null then
    raise exception 'Authentication required.' using errcode = '42501';
  end if;

  select r.access_type, r.is_active
  into v_access_type, v_is_active
  from public.resources as r
  where r.id = p_resource_id
  limit 1;

  if v_access_type is null then
    raise exception 'Resource not found.' using errcode = 'P0002';
  end if;

  if v_is_active = false then
    raise exception 'Resource inactive.' using errcode = 'P0002';
  end if;

  insert into public.download_events (user_id, resource_id, downloaded_at, user_agent)
  values (v_user_id, p_resource_id, now(), p_user_agent);
end;
$$;

revoke execute on function public.record_download_event(uuid, text) from public, anon;
grant execute on function public.record_download_event(uuid, text) to authenticated;

create or replace function public.set_resources_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

revoke execute on function public.set_resources_updated_at() from public, anon, authenticated;

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
before update on public.resources
for each row
execute function public.set_resources_updated_at();

alter table public.resources enable row level security;
alter table public.download_events enable row level security;

-- Idempotent bucket creation
insert into storage.buckets (id, name, public)
values ('technical-resources', 'technical-resources', false)
on conflict (id) do update
set
  name = excluded.name,
  public = false;

-- Data API permissions
revoke all on table public.resources from public, anon, authenticated;
revoke all on table public.download_events from public, anon, authenticated;

grant select on table public.resources to anon, authenticated;
grant select on table public.download_events to authenticated;

-- resources policies

drop policy if exists "resources_select_public" on public.resources;
drop policy if exists "resources_select_member" on public.resources;
drop policy if exists "resources_block_write" on public.resources;

create policy "resources_select_public"
on public.resources
for select
using (
  is_active = true
  and access_type = 'public'
);

create policy "resources_select_member"
on public.resources
for select
using (
  is_active = true
  and access_type = 'member'
  and auth.role() = 'authenticated'
);

create policy "resources_block_write"
on public.resources
for all
using (false)
with check (false);

-- download_events policies

drop policy if exists "download_events_select_own" on public.download_events;
drop policy if exists "download_events_insert_own" on public.download_events;
drop policy if exists "download_events_block_update_delete" on public.download_events;
drop policy if exists "download_events_block_delete" on public.download_events;

create policy "download_events_select_own"
on public.download_events
for select
using (user_id = auth.uid());

create policy "download_events_block_update_delete"
on public.download_events
for update using (false) with check (false);

create policy "download_events_block_delete"
on public.download_events
for delete using (false);

-- Storage policies (bucket restricted to technical-resources)
drop policy if exists "technical_resources_public_select" on storage.objects;
drop policy if exists "technical_resources_member_select" on storage.objects;
drop policy if exists "technical_resources_no_write" on storage.objects;
drop policy if exists "technical_resources_select_public" on storage.objects;
drop policy if exists "technical_resources_select_member" on storage.objects;
drop policy if exists "technical_resources_write_blocked" on storage.objects;

create policy "technical_resources_select_public"
on storage.objects
for select
using (
  bucket_id = 'technical-resources'
  and exists (
    select 1
    from public.resources as r
    where r.storage_bucket = 'technical-resources'
      and r.file_path = storage.objects.name
      and r.is_active = true
      and r.access_type = 'public'
  )
);

create policy "technical_resources_select_member"
on storage.objects
for select
using (
  bucket_id = 'technical-resources'
  and auth.role() = 'authenticated'
  and exists (
    select 1
    from public.resources as r
    where r.storage_bucket = 'technical-resources'
      and r.file_path = storage.objects.name
      and r.is_active = true
      and r.access_type = 'member'
  )
);

create policy "technical_resources_write_blocked"
on storage.objects
for all
using (false)
with check (false);
