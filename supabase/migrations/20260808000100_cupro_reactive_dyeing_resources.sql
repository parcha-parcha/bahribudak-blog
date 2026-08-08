-- Cupro reactive dyeing member-only resources
-- BB-OS v3.6 / REV04 / 2026-08-08
-- Requires the secure_downloads infrastructure and private technical-resources bucket.

insert into public.resources (
  id, slug, title, description, storage_bucket, file_path, file_type, access_type, is_active
)
values
  (
    'f869d39f-55f9-5962-acd9-3fa3cb904d96'::uuid,
    'cupro-reaktif-boyama-master-docx-v1-0',
    'Cupro Kumaşlarda Reaktif Boyama - Master DOCX',
    'Düzenlenebilir teknik Master DOCX, yayın sürümü 1.0.',
    'technical-resources',
    'cupro-reaktif-boyama/v1-0/bbos-cupro-reaktif-boyama-tr-master-v1-0.docx',
    'DOCX', 'member', true
  ),
  (
    'a669781d-e77c-5688-98cf-11670d2ddc3c'::uuid,
    'cupro-reaktif-boyama-master-pdf-v1-0',
    'Cupro Kumaşlarda Reaktif Boyama - Master PDF',
    'Final teknik referans PDF, yayın sürümü 1.0.',
    'technical-resources',
    'cupro-reaktif-boyama/v1-0/bbos-cupro-reaktif-boyama-tr-master-v1-0.pdf',
    'PDF', 'member', true
  ),
  (
    'ac30e4b2-642f-5316-8093-03c473999f73'::uuid,
    'cupro-reaktif-boyama-presentation-pptx-v1-0',
    'Cupro Kumaşlarda Reaktif Boyama - PPTX',
    'Düzenlenebilir teknik sunum, yayın sürümü 1.0.',
    'technical-resources',
    'cupro-reaktif-boyama/v1-0/bbos-cupro-reaktif-boyama-tr-presentation-v1-0.pptx',
    'PPTX', 'member', true
  ),
  (
    'df0dce75-61e4-580c-9226-6b3e221ddaaf'::uuid,
    'cupro-reaktif-boyama-carousel-pdf-v1-0',
    'Cupro Kumaşlarda Reaktif Boyama - Carousel PDF',
    'Teknik carousel PDF, yayın sürümü 1.0.',
    'technical-resources',
    'cupro-reaktif-boyama/v1-0/bbos-cupro-reaktif-boyama-tr-carousel-v1-0.pdf',
    'PDF', 'member', true
  )
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  description = excluded.description,
  storage_bucket = excluded.storage_bucket,
  file_path = excluded.file_path,
  file_type = excluded.file_type,
  access_type = excluded.access_type,
  is_active = excluded.is_active,
  updated_at = now();
