-- BB-OS PR #58 — Teknik talep kaynak/UTM izlenebilirliği
-- Tarih: 2026-08-03
-- Bu migration yalnızca geriye dönük uyumlu kolon ve indeks ekler.
-- RPC imzaları sonraki patch'te, mevcut fonksiyon gövdesi korunarak güncellenecektir.

alter table public.consultancy_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists landing_page text,
  add column if not exists referrer text,
  add column if not exists source_post text;

update public.consultancy_leads
set landing_page = source
where landing_page is null
  and nullif(trim(source), '') is not null;

create index if not exists consultancy_leads_utm_source_created_idx
  on public.consultancy_leads (utm_source, created_at desc)
  where utm_source is not null;

create index if not exists consultancy_leads_utm_campaign_created_idx
  on public.consultancy_leads (utm_campaign, created_at desc)
  where utm_campaign is not null;

create index if not exists consultancy_leads_source_post_created_idx
  on public.consultancy_leads (source_post, created_at desc)
  where source_post is not null;

comment on column public.consultancy_leads.utm_source is
  'Talebi getiren trafik kaynağı (utm_source).';

comment on column public.consultancy_leads.utm_medium is
  'Talebi getiren trafik ortamı (utm_medium).';

comment on column public.consultancy_leads.utm_campaign is
  'Talebi getiren kampanya (utm_campaign).';

comment on column public.consultancy_leads.utm_content is
  'Kampanya içerik varyantı (utm_content).';

comment on column public.consultancy_leads.landing_page is
  'Oturumun ilk yakalanan açılış sayfası.';

comment on column public.consultancy_leads.referrer is
  'Oturumun ilk yakalanan yönlendiren adresi.';

comment on column public.consultancy_leads.source_post is
  'Talebe kaynak olan blog yazısı veya içerik kimliği.';
