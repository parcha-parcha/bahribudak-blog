# BB-İLS-01 — Uygulama Paketi

## Kapsam

Bu paket aşağıdaki ilk altyapıyı kurar:

- Üye profili
- İzin geçmişi
- İlgi alanları
- Kayıt kaynağı
- Segment atamaları
- Üye etkinlikleri
- Danışmanlık adayları
- Row Level Security politikaları

## Hedef repository yolu

`supabase/migrations/20260726000000_bb_ils_membership_system.sql`

## Uygulama yöntemi

1. Repository’de `feature/bb-ils-01-membership-data-model` dalını oluşturun.
2. SQL dosyasını `supabase/migrations/` klasörüne kopyalayın.
3. Supabase yerel veya bağlı geliştirme ortamında migration’ı çalıştırın.
4. `npm run quality` komutunu çalıştırın.
5. Pull Request açın ve GitHub Actions ile Vercel Preview sonuçlarını kontrol edin.
6. Doğrulama tamamlanmadan `main` dalına birleştirmeyin.

## Kontrol sorguları

```sql
select count(*) from public.member_profiles;
select * from public.current_communication_consents limit 20;
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'member_profiles',
    'communication_consents',
    'member_interests',
    'member_sources',
    'member_segments',
    'member_activity_events',
    'consultancy_leads'
  );
```

## Başlangıç kodları

### İlgi alanları

- `knitting`
- `dyeing`
- `finishing`
- `textile_chemicals`
- `energy_efficiency`
- `maintenance`
- `quality`
- `fire_safety`
- `management`

### Kaynaklar

- `site-header-membership`
- `site-footer-membership`
- `resource-center`
- `publication-download`
- `consultancy-form`
- `contact-form`
- `linkedin`
- `direct`

### Segmentler

- `reader`
- `verified-member`
- `resource-downloader`
- `technical-manager`
- `business-owner`
- `production-professional`
- `chemical-process-interest`
- `consultancy-candidate`
- `active-client`
- `inactive-member`

## Güvenlik kararı

İzin kayıtları güncellenmez veya silinmez. Her değişiklik yeni bir `communication_consents`
satırı olarak kaydedilir. Böylece onay ve geri çekme geçmişi korunur.
