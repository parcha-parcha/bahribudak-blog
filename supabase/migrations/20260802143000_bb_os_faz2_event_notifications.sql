-- BB-OS Faz 2: üyelik ve indirme olay kuyruğu.
create extension if not exists pgcrypto;

create table if not exists public.bb_event_queue (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (
    event_type in ('member_registered', 'publication_download')
  ),
  dedupe_key text not null unique,
  occurred_at timestamptz not null default timezone('utc', now()),
  user_id uuid references auth.users(id) on delete set null,
  masked_email text,
  resource_path text,
  resource_title text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (
    status in ('pending', 'sent', 'failed')
  ),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  sent_at timestamptz,
  provider_message_id text,
  last_error text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists bb_event_queue_status_idx
  on public.bb_event_queue (status, occurred_at);

create index if not exists bb_event_queue_event_type_idx
  on public.bb_event_queue (event_type, occurred_at desc);

create or replace function public.set_bb_event_queue_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists bb_event_queue_set_updated_at
on public.bb_event_queue;

create trigger bb_event_queue_set_updated_at
before update on public.bb_event_queue
for each row
execute function public.set_bb_event_queue_updated_at();

alter table public.bb_event_queue enable row level security;

revoke all on table public.bb_event_queue
from public, anon, authenticated;

comment on table public.bb_event_queue is
'BB-OS Faz 2 olay kuyruğu: üyelik ve indirme bildirimleri, idempotency, hata ve yeniden deneme kaydı.';
