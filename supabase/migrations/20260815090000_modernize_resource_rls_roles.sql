-- BB-SITE Security Hardening Phase 3
-- Modernize resource and storage RLS role scoping.
-- Preserve the existing access model while removing deprecated auth.role() checks.

-- public.resources

drop policy if exists "resources_select_public" on public.resources;
drop policy if exists "resources_select_member" on public.resources;

create policy "resources_select_public"
on public.resources
for select
to anon, authenticated
using (
  is_active = true
  and access_type = 'public'
);

create policy "resources_select_member"
on public.resources
for select
to authenticated
using (
  is_active = true
  and access_type = 'member'
);

-- storage.objects / technical-resources

drop policy if exists "technical_resources_select_public" on storage.objects;
drop policy if exists "technical_resources_select_member" on storage.objects;

create policy "technical_resources_select_public"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'technical-resources'
  and exists (
    select 1
    from public.resources as r
    where r.storage_bucket = 'technical-resources'
      and r.file_path = storage.objects.name
      and r.is_active = true
      and r.access_type = 'public'
  )
);

create policy "technical_resources_select_member"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'technical-resources'
  and exists (
    select 1
    from public.resources as r
    where r.storage_bucket = 'technical-resources'
      and r.file_path = storage.objects.name
      and r.is_active = true
      and r.access_type = 'member'
  )
);
