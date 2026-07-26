-- BB-İLS-05 — Danışmanlık ve teknik hizmet talep akışı

alter table public.consultancy_leads
  add column if not exists process_area text,
  add column if not exists contact_preference text,
  add column if not exists reference_url text;

alter table public.consultancy_leads
  drop constraint if exists consultancy_leads_contact_preference_check;

alter table public.consultancy_leads
  add constraint consultancy_leads_contact_preference_check
  check (
    contact_preference is null
    or contact_preference in ('email', 'phone', 'either')
  );

create or replace function public.submit_consultancy_lead(
  p_request_type text,
  p_process_area text,
  p_subject text,
  p_message text,
  p_company_name text default null,
  p_phone text default null,
  p_priority text default 'normal',
  p_contact_preference text default 'email',
  p_reference_url text default null,
  p_source text default '/member-support'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text;
  v_full_name text;
  v_company_name text;
  v_lead_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_request_type not in (
    'technical-consultancy',
    'field-assessment',
    'process-review',
    'chemical-solution',
    'maintenance',
    'fire-safety',
    'training',
    'other'
  ) then
    raise exception 'Unsupported request type';
  end if;

  if p_priority not in (
    'low',
    'normal',
    'high',
    'urgent'
  ) then
    raise exception 'Unsupported priority';
  end if;

  if p_contact_preference not in (
    'email',
    'phone',
    'either'
  ) then
    raise exception 'Unsupported contact preference';
  end if;

  if length(trim(coalesce(p_subject, ''))) < 3 then
    raise exception 'Subject is required';
  end if;

  if length(trim(coalesce(p_message, ''))) < 20 then
    raise exception 'Message is too short';
  end if;

  select
    u.email,
    nullif(trim(coalesce(p.full_name, '')), ''),
    nullif(trim(coalesce(p.company_name, '')), '')
  into
    v_email,
    v_full_name,
    v_company_name
  from auth.users as u
  left join public.profiles as p
    on p.id = u.id
  where u.id = v_user_id;

  insert into public.consultancy_leads (
    user_id,
    email,
    full_name,
    company_name,
    phone,
    request_type,
    process_area,
    subject,
    message,
    source,
    status,
    priority,
    contact_preference,
    reference_url
  )
  values (
    v_user_id,
    v_email,
    v_full_name,
    coalesce(
      nullif(trim(coalesce(p_company_name, '')), ''),
      v_company_name
    ),
    nullif(trim(coalesce(p_phone, '')), ''),
    p_request_type,
    nullif(trim(coalesce(p_process_area, '')), ''),
    trim(p_subject),
    trim(p_message),
    coalesce(
      nullif(trim(coalesce(p_source, '')), ''),
      '/member-support'
    ),
    'new',
    p_priority,
    p_contact_preference,
    nullif(trim(coalesce(p_reference_url, '')), '')
  )
  returning id into v_lead_id;

  perform public.record_member_activity(
    p_event_type => 'consultancy_request',
    p_resource_id => null,
    p_publication_slug => null,
    p_path => nullif(trim(coalesce(p_source, '')), ''),
    p_source => 'consultancy-request',
    p_metadata => jsonb_build_object(
      'lead_id', v_lead_id,
      'request_type', p_request_type,
      'process_area', p_process_area,
      'priority', p_priority
    )
  );

  return v_lead_id;
end;
$$;

revoke all on function public.submit_consultancy_lead(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) from public, anon;

grant execute on function public.submit_consultancy_lead(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to authenticated;

comment on function public.submit_consultancy_lead(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) is
  'BB-İLS-05 üye danışmanlık ve teknik hizmet talep RPC''si.';
