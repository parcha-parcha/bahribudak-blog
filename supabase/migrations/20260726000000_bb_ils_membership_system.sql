-- BB-ILS-01 — Üyelik veri modeli, izin kayıtları, kaynak takibi ve temel segmentasyon
-- Mevcut public.profiles tablosunu genişletir; auth.users kimliğini tek kaynak olarak korur.
-- Tarih: 2026-07-26

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Üye profili
-- ---------------------------------------------------------------------------

create table if not exists public.member_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  job_title text,
  department text,
  company_type text,
  city text,
  country_code text not null default 'TR',
  preferred_language text not null default 'tr'
    check (preferred_language in ('tr', 'en')),
  membership_status text not null default 'active'
    check (membership_status in ('active', 'inactive', 'blocked', 'deleted')),
  email_verified_at timestamptz,
  onboarding_completed_at timestamptz,
  last_activity_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists member_profiles_status_idx
  on public.member_profiles (membership_status);

create index if not exists member_profiles_last_activity_idx
  on public.member_profiles (last_activity_at desc);

-- ---------------------------------------------------------------------------
-- 2. İzin kayıtları
-- Her değişiklik yeni satır olarak saklanır. Geçmiş kayıtlar güncellenmez.
-- ---------------------------------------------------------------------------

create table if not exists public.communication_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null
    check (consent_type in (
      'membership_terms',
      'privacy_notice',
      'email_marketing',
      'service_updates',
      'profiling'
    )),
  status text not null check (status in ('granted', 'withdrawn')),
  legal_text_version text not null,
  source text not null,
  ip_address inet,
  user_agent text,
  recorded_at timestamptz not null default timezone('utc', now())
);

create index if not exists communication_consents_user_type_idx
  on public.communication_consents (user_id, consent_type, recorded_at desc);

-- Güncel izin durumunu güvenli biçimde okumak için görünüm.
create or replace view public.current_communication_consents
with (security_invoker = true)
as
select distinct on (user_id, consent_type)
  id,
  user_id,
  consent_type,
  status,
  legal_text_version,
  source,
  recorded_at
from public.communication_consents
order by user_id, consent_type, recorded_at desc, id desc;

-- ---------------------------------------------------------------------------
-- 3. İlgi alanları
-- ---------------------------------------------------------------------------

create table if not exists public.member_interests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  interest_code text not null,
  interest_level text not null default 'declared'
    check (interest_level in ('declared', 'observed', 'high')),
  source text not null default 'profile',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, interest_code)
);

create index if not exists member_interests_code_idx
  on public.member_interests (interest_code);

-- ---------------------------------------------------------------------------
-- 4. Kayıt ve edinim kaynakları
-- ---------------------------------------------------------------------------

create table if not exists public.member_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_code text not null,
  campaign_code text,
  publication_slug text,
  landing_path text,
  is_primary boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  recorded_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists member_sources_one_primary_per_user_idx
  on public.member_sources (user_id)
  where is_primary = true;

create index if not exists member_sources_source_code_idx
  on public.member_sources (source_code, recorded_at desc);

create index if not exists member_sources_publication_idx
  on public.member_sources (publication_slug)
  where publication_slug is not null;

-- ---------------------------------------------------------------------------
-- 5. Segmentler
-- ---------------------------------------------------------------------------

create table if not exists public.member_segments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  segment_code text not null,
  assignment_type text not null default 'automatic'
    check (assignment_type in ('automatic', 'manual')),
  assigned_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  unique (user_id, segment_code)
);

create index if not exists member_segments_code_idx
  on public.member_segments (segment_code);

-- ---------------------------------------------------------------------------
-- 6. Üye etkinlikleri
-- ---------------------------------------------------------------------------

create table if not exists public.member_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  resource_id uuid references public.resources(id) on delete set null,
  publication_slug text,
  path text,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default timezone('utc', now())
);

create index if not exists member_activity_events_user_idx
  on public.member_activity_events (user_id, occurred_at desc);

create index if not exists member_activity_events_type_idx
  on public.member_activity_events (event_type, occurred_at desc);

-- ---------------------------------------------------------------------------
-- 7. Danışmanlık ve teknik hizmet adayları
-- ---------------------------------------------------------------------------

create table if not exists public.consultancy_leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  full_name text,
  company_name text,
  phone text,
  request_type text not null default 'consultancy',
  subject text,
  message text,
  source text not null,
  status text not null default 'new'
    check (status in ('new', 'qualified', 'contacted', 'proposal', 'won', 'lost', 'closed')),
  priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high', 'urgent')),
  owner_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint consultancy_leads_identity_check
    check (user_id is not null or email is not null)
);

create index if not exists consultancy_leads_status_idx
  on public.consultancy_leads (status, created_at desc);

create index if not exists consultancy_leads_user_idx
  on public.consultancy_leads (user_id)
  where user_id is not null;

-- ---------------------------------------------------------------------------
-- 8. updated_at tetikleyicileri
-- Mevcut public.set_updated_at() fonksiyonu 20260716000000_auth_profiles.sql
-- migration'ında tanımlıdır.
-- ---------------------------------------------------------------------------

drop trigger if exists member_profiles_set_updated_at on public.member_profiles;
create trigger member_profiles_set_updated_at
before update on public.member_profiles
for each row execute function public.set_updated_at();

drop trigger if exists member_interests_set_updated_at on public.member_interests;
create trigger member_interests_set_updated_at
before update on public.member_interests
for each row execute function public.set_updated_at();

drop trigger if exists consultancy_leads_set_updated_at on public.consultancy_leads;
create trigger consultancy_leads_set_updated_at
before update on public.consultancy_leads
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 9. Yeni kullanıcı için BB-İLS profil kaydı
-- Mevcut auth trigger'ı bozulmadan ikinci bir güvenli trigger eklenir.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_member_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.member_profiles (
    user_id,
    preferred_language,
    email_verified_at
  )
  values (
    new.id,
    case
      when lower(coalesce(new.raw_user_meta_data ->> 'preferred_language', 'tr')) = 'en'
        then 'en'
      else 'tr'
    end,
    new.email_confirmed_at
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

revoke execute on function public.handle_new_member_profile() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_bb_ils on auth.users;
create trigger on_auth_user_created_bb_ils
after insert on auth.users
for each row execute function public.handle_new_member_profile();

-- Mevcut kullanıcılar için geriye dönük profil oluştur.
insert into public.member_profiles (user_id, email_verified_at)
select u.id, u.email_confirmed_at
from auth.users as u
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- 10. RLS
-- ---------------------------------------------------------------------------

alter table public.member_profiles enable row level security;
alter table public.communication_consents enable row level security;
alter table public.member_interests enable row level security;
alter table public.member_sources enable row level security;
alter table public.member_segments enable row level security;
alter table public.member_activity_events enable row level security;
alter table public.consultancy_leads enable row level security;

-- Üye profili
drop policy if exists member_profiles_select_own on public.member_profiles;
create policy member_profiles_select_own
on public.member_profiles for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists member_profiles_update_own on public.member_profiles;
create policy member_profiles_update_own
on public.member_profiles for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- İzinler: kullanıcı kendi kayıtlarını okuyabilir ve yalnızca kendi adına yeni kayıt ekleyebilir.
drop policy if exists communication_consents_select_own on public.communication_consents;
create policy communication_consents_select_own
on public.communication_consents for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists communication_consents_insert_own on public.communication_consents;
create policy communication_consents_insert_own
on public.communication_consents for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- İlgi alanları
drop policy if exists member_interests_select_own on public.member_interests;
create policy member_interests_select_own
on public.member_interests for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists member_interests_insert_own on public.member_interests;
create policy member_interests_insert_own
on public.member_interests for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists member_interests_update_own on public.member_interests;
create policy member_interests_update_own
on public.member_interests for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists member_interests_delete_own on public.member_interests;
create policy member_interests_delete_own
on public.member_interests for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Kaynaklar ve segmentler kullanıcı tarafından okunabilir; atamalar sunucu tarafında yapılır.
drop policy if exists member_sources_select_own on public.member_sources;
create policy member_sources_select_own
on public.member_sources for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists member_segments_select_own on public.member_segments;
create policy member_segments_select_own
on public.member_segments for select
to authenticated
using ((select auth.uid()) = user_id);

-- Etkinlikler: kullanıcı yalnızca kendi etkinliklerini okuyabilir.
drop policy if exists member_activity_events_select_own on public.member_activity_events;
create policy member_activity_events_select_own
on public.member_activity_events for select
to authenticated
using ((select auth.uid()) = user_id);

-- Danışmanlık adayı: kullanıcı kendi hesabına bağlı talebi ekleyebilir ve okuyabilir.
drop policy if exists consultancy_leads_select_own on public.consultancy_leads;
create policy consultancy_leads_select_own
on public.consultancy_leads for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists consultancy_leads_insert_own on public.consultancy_leads;
create policy consultancy_leads_insert_own
on public.consultancy_leads for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- 11. Data API yetkileri
-- Sunucu/service_role RLS'yi aşabilir. İstemciye yalnızca gerekli yetkiler verilir.
-- ---------------------------------------------------------------------------

revoke all on table public.member_profiles from public, anon, authenticated;
revoke all on table public.communication_consents from public, anon, authenticated;
revoke all on table public.member_interests from public, anon, authenticated;
revoke all on table public.member_sources from public, anon, authenticated;
revoke all on table public.member_segments from public, anon, authenticated;
revoke all on table public.member_activity_events from public, anon, authenticated;
revoke all on table public.consultancy_leads from public, anon, authenticated;
revoke all on table public.current_communication_consents from public, anon, authenticated;

grant select, update on table public.member_profiles to authenticated;
grant select, insert on table public.communication_consents to authenticated;
grant select on table public.current_communication_consents to authenticated;
grant select, insert, update, delete on table public.member_interests to authenticated;
grant select on table public.member_sources to authenticated;
grant select on table public.member_segments to authenticated;
grant select on table public.member_activity_events to authenticated;
grant select, insert on table public.consultancy_leads to authenticated;

-- ---------------------------------------------------------------------------
-- 12. Başlangıç kod sözlüğü
-- Uygulama tarafında sabit enum/listeler olarak kullanılacaktır.
-- ---------------------------------------------------------------------------

comment on table public.member_profiles is
  'BB-İLS üye profili; public.profiles kimlik kaydını genişletir.';

comment on table public.communication_consents is
  'BB-İLS izin günlüğü; değişiklikler append-only tutulur.';

comment on table public.member_sources is
  'Üyenin edinim kaynağı, kampanya ve yayın bağlamı.';

comment on table public.member_segments is
  'Otomatik veya manuel üye segment atamaları.';

comment on table public.member_activity_events is
  'Yayın, kaynak ve dönüşüm davranış olayları.';

comment on table public.consultancy_leads is
  'Danışmanlık, teknik hizmet ve saha çalışması aday kayıtları.';
