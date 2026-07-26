-- BB-İLS-02 — Kayıt formu metadatasını BB-İLS tablolarına aktarır.
-- Bu migration, e-posta doğrulaması öncesinde istemci RLS engeline takılmadan
-- auth.users trigger'ı üzerinden güvenli kayıt oluşturur.

create or replace function public.handle_new_member_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_language text;
  v_interest text;
  v_source text;
  v_legal_version text;
begin
  v_language :=
    case
      when lower(coalesce(v_meta ->> 'preferred_language', 'tr')) = 'en'
        then 'en'
      else 'tr'
    end;

  v_interest := nullif(trim(coalesce(v_meta ->> 'interest_code', '')), '');
  v_source := coalesce(nullif(trim(v_meta ->> 'registration_source'), ''), 'membership-form');
  v_legal_version :=
    coalesce(nullif(trim(v_meta ->> 'legal_text_version'), ''), '2026-07-26-v1');

  insert into public.member_profiles (
    user_id,
    job_title,
    preferred_language,
    email_verified_at
  )
  values (
    new.id,
    nullif(trim(coalesce(v_meta ->> 'job_title', '')), ''),
    v_language,
    new.email_confirmed_at
  )
  on conflict (user_id) do update
  set
    job_title = excluded.job_title,
    preferred_language = excluded.preferred_language,
    email_verified_at = excluded.email_verified_at,
    updated_at = timezone('utc', now());

  insert into public.member_sources (
    user_id,
    source_code,
    is_primary,
    metadata
  )
  values (
    new.id,
    v_source,
    true,
    jsonb_build_object(
      'language', v_language,
      'registration_flow', 'bb-ils-02'
    )
  )
  on conflict (user_id) where is_primary = true
  do nothing;

  if v_interest is not null then
    insert into public.member_interests (
      user_id,
      interest_code,
      interest_level,
      source
    )
    values (
      new.id,
      v_interest,
      'declared',
      'registration-form'
    )
    on conflict (user_id, interest_code) do nothing;
  end if;

  if coalesce((v_meta ->> 'membership_terms')::boolean, false) then
    insert into public.communication_consents (
      user_id,
      consent_type,
      status,
      legal_text_version,
      source
    )
    values (
      new.id,
      'membership_terms',
      'granted',
      v_legal_version,
      v_source
    );
  end if;

  if coalesce((v_meta ->> 'privacy_notice')::boolean, false) then
    insert into public.communication_consents (
      user_id,
      consent_type,
      status,
      legal_text_version,
      source
    )
    values (
      new.id,
      'privacy_notice',
      'granted',
      v_legal_version,
      v_source
    );
  end if;

  if coalesce((v_meta ->> 'email_marketing')::boolean, false) then
    insert into public.communication_consents (
      user_id,
      consent_type,
      status,
      legal_text_version,
      source
    )
    values (
      new.id,
      'email_marketing',
      'granted',
      v_legal_version,
      v_source
    );
  end if;

  insert into public.member_segments (
    user_id,
    segment_code,
    assignment_type,
    metadata
  )
  values (
    new.id,
    'reader',
    'automatic',
    jsonb_build_object('source', v_source)
  )
  on conflict (user_id, segment_code) do nothing;

  return new;
end;
$$;

revoke execute on function public.handle_new_member_profile()
from public, anon, authenticated;
