-- BB-ILS — Herkese açık teknik talep kayıt sistemi
-- Tarih: 2026-07-31

alter table public.consultancy_leads
  add column if not exists role_title text,
  add column if not exists process_area text,
  add column if not exists problem_category text,
  add column if not exists occurrence_frequency text,
  add column if not exists support_preference text,
  add column if not exists reference_url text,
  add column if not exists language text not null default 'tr'
    check (language in ('tr', 'en')),
  add column if not exists consent_accepted boolean not null default false,
  add column if not exists consent_recorded_at timestamptz,
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists consultancy_leads_process_idx
  on public.consultancy_leads (process_area, created_at desc);

create index if not exists consultancy_leads_problem_idx
  on public.consultancy_leads (problem_category, created_at desc);

create or replace function public.submit_public_technical_request(
  p_email text,
  p_full_name text,
  p_company_name text,
  p_role_title text,
  p_request_type text,
  p_process_area text,
  p_problem_category text,
  p_occurrence_frequency text,
  p_support_preference text,
  p_subject text,
  p_message text,
  p_reference_url text,
  p_language text,
  p_source text,
  p_consent_accepted boolean
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_user_id uuid := auth.uid();
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if v_email = '' or position('@' in v_email) < 2 then
    raise exception 'Geçerli bir e-posta adresi gereklidir.';
  end if;

  if trim(coalesce(p_full_name, '')) = '' then
    raise exception 'Ad soyad gereklidir.';
  end if;

  if trim(coalesce(p_request_type, '')) = ''
     or trim(coalesce(p_process_area, '')) = ''
     or trim(coalesce(p_problem_category, '')) = ''
     or trim(coalesce(p_occurrence_frequency, '')) = ''
     or trim(coalesce(p_support_preference, '')) = ''
     or trim(coalesce(p_subject, '')) = ''
     or trim(coalesce(p_message, '')) = '' then
    raise exception 'Zorunlu teknik talep alanları eksiktir.';
  end if;

  if length(p_message) > 3000 then
    raise exception 'Çalışma kapsamı 3000 karakteri aşamaz.';
  end if;

  if coalesce(p_consent_accepted, false) is not true then
    raise exception 'Açık rıza/onay gereklidir.';
  end if;

  insert into public.consultancy_leads (
    user_id,
    email,
    full_name,
    company_name,
    role_title,
    request_type,
    process_area,
    problem_category,
    occurrence_frequency,
    support_preference,
    subject,
    message,
    reference_url,
    language,
    source,
    consent_accepted,
    consent_recorded_at,
    metadata
  )
  values (
    v_user_id,
    v_email,
    nullif(trim(p_full_name), ''),
    nullif(trim(coalesce(p_company_name, '')), ''),
    nullif(trim(coalesce(p_role_title, '')), ''),
    trim(p_request_type),
    trim(p_process_area),
    trim(p_problem_category),
    trim(p_occurrence_frequency),
    trim(p_support_preference),
    trim(p_subject),
    trim(p_message),
    nullif(trim(coalesce(p_reference_url, '')), ''),
    case when lower(coalesce(p_language, 'tr')) = 'en' then 'en' else 'tr' end,
    coalesce(nullif(trim(p_source), ''), '/contact'),
    true,
    timezone('utc', now()),
    jsonb_build_object('submission_channel', 'website-contact-form')
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_public_technical_request(
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, boolean
) from public;

grant execute on function public.submit_public_technical_request(
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, boolean
) to anon, authenticated;

comment on function public.submit_public_technical_request(
  text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, boolean
) is 'Herkese açık teknik talep formunu kontrollü biçimde consultancy_leads tablosuna kaydeder.';
