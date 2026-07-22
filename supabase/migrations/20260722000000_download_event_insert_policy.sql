grant insert (user_id, resource_id, downloaded_at, user_agent)
on public.download_events
to authenticated;

drop policy if exists "download_events_insert_own" on public.download_events;

create policy "download_events_insert_own"
on public.download_events
for insert
with check (user_id = auth.uid());
