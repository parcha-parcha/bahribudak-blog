# REVİZYON 02 - FAZ 2 UZMANLIK SAYFALARI

**Tarih:** 24 Haziran 2026  
**Kapsam:** Örgü / Knitting, Boya / Dyeing, Apre / Finishing bilgi mimarisi

## 1. Uygulanan Sayfalar

- `/tr/uzmanlik`
- `/tr/uzmanlik/orgu`
- `/tr/uzmanlik/boya`
- `/tr/uzmanlik/apre`
- `/en/uzmanlik`
- `/en/uzmanlik/orgu`
- `/en/uzmanlik/boya`
- `/en/uzmanlik/apre`

## 2. Ortak Teknik Şablon

Her uzmanlık detay sayfası aynı sırayı kullanır:

1. Prosesin amacı
2. Makine ve ekipmanlar
3. Kritik proses parametreleri
4. Ölçüm ve kontrol noktaları
5. Yaygın hata türleri
6. Kök neden / Root Cause
7. Düzeltici faaliyet / Corrective Action
8. İndirilebilir teknik kaynaklar
9. İlgili teknik yayınlar
10. Teknik referans çerçevesi
11. Saha fotoğrafı çekim standardı

## 3. Teknik İçerik İlkeleri

- Evrensel reçete veya sabit makine set değeri verilmemiştir.
- Proses değerlerinin elyaf, iplik, konstrüksiyon, makine, kimyasal sistem ve müşteri spesifikasyonuna göre doğrulanması gerektiği açıkça belirtilmiştir.
- Türkçe ve İngilizce saha terminolojisi birlikte kullanılmıştır.
- Hata açıklamaları belirti → kök neden → düzeltici faaliyet mantığıyla kurulmuştur.
- Mevcut PDF ve XLSX kaynakları ilgili proses sayfalarına bağlanmıştır.

## 4. SEO ve Teknik Uygulamalar

- Sayfa bazlı title ve description
- Canonical URL
- TR/EN hreflang
- Open Graph
- TechArticle JSON-LD
- Sitemap kapsamı
- Statik sayfa üretimi / SSG

## 5. Değişen Dosyalar

- `src/lib/expertise.ts`
- `src/app/[lang]/uzmanlik/page.tsx`
- `src/app/[lang]/uzmanlik/[slug]/page.tsx`
- `src/app/[lang]/page.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/app/sitemap.ts`
- `SITE_REVISION_PLAN.md`
- `REVISION_02_NOTES.md`

## 6. Teknik Doğrulama

- `npm ci`: başarılı
- `npm run build`: başarılı
- Next.js: 16.2.9
- TypeScript kontrolü: başarılı
- 69 sayfa üretimi: başarılı
- Türkçe uzmanlık merkezi ve üç detay rotası: HTTP 200
- İngilizce uzmanlık merkezi ve detay rotası: HTTP 200
- Sitemap: HTTP 200
- NPM güvenlik taraması: 4 orta seviye uyarı; kritik veya yüksek seviye uyarı yok

## 7. Teknik Referanslar

### Örgü / Knitting
- CottonWorks™ — Knit Basics
- CottonWorks™ — Knit Machinery: Flat, Circular, and Seamless

### Boya / Dyeing
- CottonWorks™ — Dyeing Preparation
- CottonWorks™ — Dyeing Basics
- Cotton Incorporated — Textile Dyeing Booklet

### Apre / Finishing
- CottonWorks™ — Chemical Finishing
- CottonWorks™ — Shrinkage & Skewing
- ISO 5077 — Textiles: Determination of dimensional change in washing and drying

## 8. Saha Görseli Notu

Mevcut görseller sayfa yapısını desteklemek amacıyla kullanılmıştır. Nihai kurumsal yayın standardı için aşağıdaki özgün saha fotoğrafları önerilir:

- Örgü: feeder, iğne yatağı ve kumaş çekim bölgesini aynı karede gösteren yuvarlak örme makinesi
- Boya: HT Jet gövdesi, nozul-pompa devresi ve otomatik dozaj bağlantısı
- Apre: ramöz giriş foulardı, atkı düzeltici ve zincir/klips bölgesi

Fotoğraflar yatay 16:9, 30–45° çapraz açıdan, firma ve operatör kimliği görünmeden çekilmelidir.
