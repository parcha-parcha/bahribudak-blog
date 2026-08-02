-- BB-OS Faz 2 R04
-- Atomic rolling 5-minute deduplication for publication downloads.

create or replace function public.enqueue_bb_download_event(
  p_event_id uuid,
  p_dedupe_key text,
  p_occurred_at timestamptz,
  p_user_id uuid,
  p_masked_email text,
  p_resource_path text,
  p_resource_title text,
  p_metadata jsonb
)
returns table (
  id uuid,
  event_type text,
  occurred_at timestamptz,
  masked_email text,
  resource_path text,
  resource_title text,
  metadata jsonb,
  status text,
  inserted boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  existing_event public.bb_event_queue%rowtype;
begin
  perform pg_advisory_xact_lock(
    hashtextextended(
      coalesce(p_user_id::text, '') || '|' || coalesce(p_resource_path, ''),
      0
    )
  );

  select q.*
  into existing_event
  from public.bb_event_queue as q
  where q.event_type = 'publication_download'
    and q.user_id is not distinct from p_user_id
    and q.resource_path is not distinct from p_resource_path
    and q.occurred_at >= p_occurred_at - interval '5 minutes'
    and q.occurred_at <= p_occurred_at
  order by q.occurred_at desc
  limit 1;

  if found then
    return query
    select
      existing_event.id,
      existing_event.event_type,
      existing_event.occurred_at,
      existing_event.masked_email,
      existing_event.resource_path,
      existing_event.resource_title,
      existing_event.metadata,
      existing_event.status,
      false;
    return;
  end if;

  insert into public.bb_event_queue (
    id,
    event_type,
    dedupe_key,
    occurred_at,
    user_id,
    masked_email,
    resource_path,
    resource_title,
    metadata,
    status
  )
  values (
    p_event_id,
    'publication_download',
    p_dedupe_key,
    p_occurred_at,
    p_user_id,
    p_masked_email,
    p_resource_path,
    p_resource_title,
    coalesce(p_metadata, '{}'::jsonb),
    'pending'
  )
  returning *
  into existing_event;

  return query
  select
    existing_event.id,
    existing_event.event_type,
    existing_event.occurred_at,
    existing_event.masked_email,
    existing_event.resource_path,
    existing_event.resource_title,
    existing_event.metadata,
    existing_event.status,
    true;
end;
$$;

revoke all
on function public.enqueue_bb_download_event(
  uuid,
  text,
  timestamptz,
  uuid,
  text,
  text,
  text,
  jsonb
)
from public, anon, authenticated;

grant execute
on function public.enqueue_bb_download_event(
  uuid,
  text,
  timestamptz,
  uuid,
  text,
  text,
  text,
  jsonb
)
to service_role;

comment on function public.enqueue_bb_download_event(
  uuid,
  text,
  timestamptz,
  uuid,
  text,
  text,
  text,
  jsonb
) is
'Atomically suppresses repeated publication-download notifications for the same user and resource within the preceding five minutes.';
