-- BB-OS — Yönetici rol ve yetki sistemi
-- Tarih: 2026-07-31
-- Roller: editor, admin, super_admin

create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null
    check (role in ('editor', 'admin', 'super_admin')),
  is_active boolean not null default true,
  granted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists admin_roles_role_active_idx
  on public.admin_roles (role, is_active);

drop trigger if exists admin_roles_set_updated_at
  on public.admin_roles;

create trigger admin_roles_set_updated_at
before update on public.admin_roles
for each row execute function public.set_updated_at();

create table if not exists public.admin_role_audit (
  id uuid primary key default gen_random_uuid(),
  target_user_id uuid not null references auth.users(id) on delete cascade,
  old_role text,
  new_role text,
  old_is_active boolean,
  new_is_active boolean,
  changed_by uuid references auth.users(id) on delete set null,
  change_source text not null default 'system',
  changed_at timestamptz not null default timezone('utc', now())
);

create index if not exists admin_role_audit_target_idx
  on public.admin_role_audit (target_user_id, changed_at desc);

create or replace function public.audit_admin_role_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.admin_role_audit (
    target_user_id,
    old_role,
    new_role,
    old_is_active,
    new_is_active,
    changed_by,
    change_source
  )
  values (
    coalesce(new.user_id, old.user_id),
    case when tg_op = 'INSERT' then null else old.role end,
    case when tg_op = 'DELETE' then null else new.role end,
    case when tg_op = 'INSERT' then null else old.is_active end,
    case when tg_op = 'DELETE' then null else new.is_active end,
    auth.uid(),
    'admin_roles_trigger'
  );

  return coalesce(new, old);
end;
$$;

revoke all on function public.audit_admin_role_change()
from public, anon, authenticated;

drop trigger if exists admin_roles_audit_change
  on public.admin_roles;

create trigger admin_roles_audit_change
after insert or update or delete on public.admin_roles
for each row execute function public.audit_admin_role_change();

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select ar.role
  from public.admin_roles as ar
  where ar.user_id = auth.uid()
    and ar.is_active = true
  limit 1;
$$;

revoke all on function public.current_admin_role()
from public, anon;

grant execute on function public.current_admin_role()
to authenticated;

alter table public.admin_roles enable row level security;
alter table public.admin_role_audit enable row level security;

revoke all on table public.admin_roles
from public, anon, authenticated;

revoke all on table public.admin_role_audit
from public, anon, authenticated;

grant select, insert, update, delete
on table public.admin_roles
to service_role;

grant select, insert
on table public.admin_role_audit
to service_role;

insert into public.admin_roles (
  user_id,
  role,
  is_active,
  granted_by
)
select
  u.id,
  'super_admin',
  true,
  u.id
from auth.users as u
where lower(u.email) = 'bahribudak@gmail.com'
on conflict (user_id) do update
set
  role = excluded.role,
  is_active = true,
  updated_at = timezone('utc', now());

comment on table public.admin_roles is
  'BB-OS yönetici rolleri: editor, admin ve super_admin. Normal üyelikten ayrıdır.';

comment on table public.admin_role_audit is
  'BB-OS yönetici rol değişikliklerinin denetim kaydı.';
