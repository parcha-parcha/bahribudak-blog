-- BB-İLS-06 — Yönetim raporlama ekranı service-role okuma yetkileri

grant select on table public.member_profiles
to service_role;

grant select on table public.communication_consents
to service_role;

grant select on table public.current_communication_consents
to service_role;

grant select on table public.member_interests
to service_role;

grant select on table public.member_sources
to service_role;

grant select on table public.member_segments
to service_role;

grant select on table public.member_activity_events
to service_role;

grant select on table public.consultancy_leads
to service_role;

grant select on table public.profiles
to service_role;

grant select on table public.download_events
to service_role;

grant select on table public.resources
to service_role;