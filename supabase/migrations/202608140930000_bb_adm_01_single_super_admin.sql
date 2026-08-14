-- BB-ADM-01 — Tek aktif Süper Yönetici kuralı
-- Normal üyelik akışından bağımsızdır.

create or replace function public.enforce_single_active_super_admin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role = 'super_admin' and new.is_active = true then
    if exists (
      select 1
      from public.admin_roles ar
      where ar.role = 'super_admin'
        and ar.is_active = true
        and ar.user_id <> new.user_id
    ) then
      raise exception 'BB-ADM-01 permits only one active super_admin';
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_single_active_super_admin()
from public, anon, authenticated;

drop trigger if exists admin_roles_single_super_admin
  on public.admin_roles;

create trigger admin_roles_single_super_admin
before insert or update of role, is_active
on public.admin_roles
for each row execute function public.enforce_single_active_super_admin();

comment on function public.enforce_single_active_super_admin() is
  'BB-ADM-01: prevents creation of a second active super_admin account.';
