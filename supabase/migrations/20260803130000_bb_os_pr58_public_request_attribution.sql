-- BB-OS PR #58 — Herkese açık teknik talep kaynak/UTM bağlantısı
-- Tarih: 2026-08-03
-- Mevcut 15 parametreli çağrılar, yeni parametrelerin varsayılanları sayesinde çalışmaya devam eder.

-- CREATE OR REPLACE, giriş parametresi listesini değiştiremediği için
-- eski imza kaldırılıp geriye dönük uyumlu yeni imza oluşturulur.
drop function if exists public.submit_public_technical_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean
);

drop function if exists public.submit_public_technical_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text
);

create function public.submit_public_technical_request(
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
  p_consent_accepted boolean,
  p_utm_source text default null,
  p_utm_medium text default null,
  p_utm_campaign text default null,
  p_utm_content text default null,
  p_landing_page text default null,
  p_referrer text default null,
  p_source_post text default null
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
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    landing_page,
    referrer,
    source_post,
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
    nullif(left(trim(coalesce(p_utm_source, '')), 2048), ''),
    nullif(left(trim(coalesce(p_utm_medium, '')), 2048), ''),
    nullif(left(trim(coalesce(p_utm_campaign, '')), 2048), ''),
    nullif(left(trim(coalesce(p_utm_content, '')), 2048), ''),
    nullif(left(trim(coalesce(p_landing_page, '')), 2048), ''),
    nullif(left(trim(coalesce(p_referrer, '')), 2048), ''),
    nullif(left(trim(coalesce(p_source_post, '')), 2048), ''),
    jsonb_strip_nulls(
      jsonb_build_object(
        'submission_channel', 'website-contact-form',
        'utm_source', nullif(trim(coalesce(p_utm_source, '')), ''),
        'utm_medium', nullif(trim(coalesce(p_utm_medium, '')), ''),
        'utm_campaign', nullif(trim(coalesce(p_utm_campaign, '')), ''),
        'utm_content', nullif(trim(coalesce(p_utm_content, '')), ''),
        'landing_page', nullif(trim(coalesce(p_landing_page, '')), ''),
        'referrer', nullif(trim(coalesce(p_referrer, '')), ''),
        'source_post', nullif(trim(coalesce(p_source_post, '')), '')
      )
    )
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_public_technical_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) from public;

grant execute on function public.submit_public_technical_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to anon, authenticated, service_role;

comment on function public.submit_public_technical_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) is
  'Herkese açık teknik talep formu ve PR #58 kaynak/UTM izlenebilirliği RPC''si.';
