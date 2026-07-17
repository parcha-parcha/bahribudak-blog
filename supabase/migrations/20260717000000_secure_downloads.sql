create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

create or replace function public.get_resource_for_download(p_resource_id uuid)
returns public.resources
language sql
security definer
set search_path = public
stable
as $$
  select *
  from public.resources
  where id = p_resource_id
  limit 1;
$$;

create or replace function public.ensure_resources_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
before update on public.resources
for each row
execute function public.set_updated_at();

alter table public.resources enable row level security;
alter table public.download_events enable row level security;

-- Idempotent bucket creation
DO $$
begin
  if not exists (
    select 1
    from storage.buckets
    where id = 'technical-resources'
  ) then
    perform storage.create_bucket('technical-resources', false);
  end if;
end $$;

-- Ensure bucket metadata remains private
update storage.buckets
set public = false
where id = 'technical-resources';

-- resources
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

-- download_events

drop policy if exists "download_events_select_own" on public.download_events;
drop policy if exists "download_events_insert_own" on public.download_events;
drop policy if exists "download_events_block_update_delete" on public.download_events;

create policy "download_events_select_own"
on public.download_events
for select
using (user_id = auth.uid());

create policy "download_events_insert_own"
on public.download_events
for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
);

create policy "download_events_block_update_delete"
on public.download_events
for update using (false) with check (false);

create policy "download_events_block_delete"
on public.download_events
for delete using (false);

-- Storage policies (bucket restricted to technical-resources)
alter table storage.objects enable row level security;

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
    from public.resources r
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
    from public.resources r
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
