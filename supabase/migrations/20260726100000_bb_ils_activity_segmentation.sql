-- BB-İLS-04 — Üye aktivitesi ve otomatik segmentasyon
-- İstemci doğrudan member_activity_events/member_segments tablolarına yazmaz.
-- auth.uid() doğrulaması yapan SECURITY DEFINER RPC kullanılır.

create or replace function public.record_member_activity(
  p_event_type text,
  p_resource_id uuid default null,
  p_publication_slug text default null,
  p_path text default null,
  p_source text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_event_id uuid;
  v_download_count integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_event_type not in (
    'publication_view',
    'publication_download',
    'resource_view',
    'consultancy_form_open',
    'consultancy_request'
  ) then
    raise exception 'Unsupported event type';
  end if;

  insert into public.member_activity_events (
    user_id,
    event_type,
    resource_id,
    publication_slug,
    path,
    source,
    metadata
  )
  values (
    v_user_id,
    p_event_type,
    p_resource_id,
    nullif(trim(coalesce(p_publication_slug, '')), ''),
    nullif(trim(coalesce(p_path, '')), ''),
    nullif(trim(coalesce(p_source, '')), ''),
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_event_id;

  update public.member_profiles
  set last_activity_at = timezone('utc', now())
  where user_id = v_user_id;

  -- Her indirme yapan kullanıcı kaynak indiricisi segmentine alınır.
  if p_event_type = 'publication_download' then
    insert into public.member_segments (
      user_id,
      segment_code,
      assignment_type,
      metadata
    )
    values (
      v_user_id,
      'resource-downloader',
      'automatic',
      jsonb_build_object(
        'reason', 'publication_download',
        'updated_at', timezone('utc', now())
      )
    )
    on conflict (user_id, segment_code) do update
    set
      assignment_type = 'automatic',
      assigned_at = timezone('utc', now()),
      expires_at = null,
      metadata = excluded.metadata;

    select count(*)
    into v_download_count
    from public.member_activity_events
    where user_id = v_user_id
      and event_type = 'publication_download'
      and occurred_at >= timezone('utc', now()) - interval '90 days';

    -- Son 90 günde en az 3 indirme yapan üye aktif okuyucu olarak işaretlenir.
    if v_download_count >= 3 then
      insert into public.member_segments (
        user_id,
        segment_code,
        assignment_type,
        metadata
      )
      values (
        v_user_id,
        'active-reader',
        'automatic',
        jsonb_build_object(
          'reason', 'three_downloads_in_90_days',
          'download_count', v_download_count,
          'updated_at', timezone('utc', now())
        )
      )
      on conflict (user_id, segment_code) do update
      set
        assignment_type = 'automatic',
        assigned_at = timezone('utc', now()),
        expires_at = timezone('utc', now()) + interval '90 days',
        metadata = excluded.metadata;
    end if;
  end if;

  -- Açık danışmanlık talebi doğrudan aday segmenti üretir.
  if p_event_type = 'consultancy_request' then
    insert into public.member_segments (
      user_id,
      segment_code,
      assignment_type,
      metadata
    )
    values (
      v_user_id,
      'consultancy-candidate',
      'automatic',
      jsonb_build_object(
        'reason', 'consultancy_request',
        'updated_at', timezone('utc', now())
      )
    )
    on conflict (user_id, segment_code) do update
    set
      assignment_type = 'automatic',
      assigned_at = timezone('utc', now()),
      expires_at = null,
      metadata = excluded.metadata;
  end if;

  return v_event_id;
end;
$$;

revoke all on function public.record_member_activity(
  text,
  uuid,
  text,
  text,
  text,
  jsonb
) from public, anon;

grant execute on function public.record_member_activity(
  text,
  uuid,
  text,
  text,
  text,
  jsonb
) to authenticated;

comment on function public.record_member_activity(
  text,
  uuid,
  text,
  text,
  text,
  jsonb
) is
  'BB-İLS aktivite kaydı ve otomatik segmentasyon RPC''si.';
