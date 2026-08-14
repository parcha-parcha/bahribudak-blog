-- BB-OS / BB-ADM-01 — SECURITY DEFINER execute hardening
-- Public technical requests must pass through the server route, which applies
-- same-origin validation, input validation, honeypot and rate limiting.

revoke execute on function public.submit_public_technical_request(
  text, text, text, text, text, text, text, text, text, text, text,
  text, text, text, boolean, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.submit_public_technical_request(
  text, text, text, text, text, text, text, text, text, text, text,
  text, text, text, boolean, text, text, text, text, text, text, text
) to service_role;

-- Trigger/helper functions are not client RPCs.
revoke execute on function public.handle_new_user()
from public, anon, authenticated;

revoke execute on function public.rls_auto_enable()
from public, anon, authenticated;

-- Intentionally retained:
-- current_admin_role(): authenticated sessions need a minimal role lookup.
-- get_resource_access_for_download(uuid): supports public/member access decisions.
-- record_download_event(...), record_member_activity(...): authenticated member telemetry.
