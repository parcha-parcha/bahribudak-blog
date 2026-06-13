# Bahri Budak Blog — Kurumsal Kimlik Revizyon 2

Bu paket kurumsal kimlik renk sistemine göre hazırlanmış Revizyon 2 dosyalarını içerir.

# Bahri Budak — Kişisel Blog

Next.js 14 tabanlı, iki dilli (TR/EN) kişisel blog projesi.

## Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
# http://localhost:3000  →  otomatik olarak /tr'ye yönlendirir
```

## Proje Yapısı

```
src/
├── app/
│   ├── [lang]/          # TR ve EN sayfaları
│   │   ├── page.tsx     # Ana sayfa
│   │   └── blog/        # Blog listesi ve yazı sayfaları
│   └── globals.css      # BB tasarım sistemi
├── components/          # Header, Footer, PostCard
├── content/
│   ├── tr/              # Türkçe yazılar (.mdx)
│   └── en/              # İngilizce yazılar (.mdx)
└── lib/
    ├── i18n.ts          # Çeviri sistemi
    └── posts.ts         # İçerik okuma fonksiyonları
```

## Yeni Yazı Eklemek

`src/content/tr/` klasörüne yeni bir `.mdx` dosyası oluştur:

```mdx
---
title: "Yazı Başlığı"
excerpt: "Kısa özet (kart görünümünde görünür)"
date: "2025-05-08"
category: "kisisel-gelisim"   # veya: tekstil | turkiye-gundemi
tags: ["etiket1", "etiket2"]
---

Yazı içeriği buraya gelir. **Kalın**, *italik*, > alıntı desteklenir.

## Başlık

Paragraflar, listeler, kod blokları kullanabilirsin.
```

## Kategoriler

| Slug | Türkçe | İngilizce |
|------|--------|-----------|
| `kisisel-gelisim` | Kişisel Gelişim | Personal Growth |
| `tekstil` | Tekstil | Textile |
| `turkiye-gundemi` | Türkiye Gündemi | Turkey Today |

## Vercel'e Deploy

```bash
# 1. GitHub'a push et
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/kullanicin/bahribudak-blog.git
git push -u origin main

# 2. vercel.com → Import Project → GitHub repo seç
# 3. bahribudak.com DNS'ini Vercel'e yönlendir
```

## Tasarım Sistemi

- **Ana renk:** Navy `#0B2343`
- **Vurgu rengi:** Sarı `#2EA6D9`
- **Font:** Poppins (700 başlık, 400 gövde)
- **İmza fontu:** Great Vibes


## Revizyon 3
Hizmetler ve Hakkımda sayfalarındaki silik metinler koyulaştırıldı ve okunabilirlik artırıldı.


## Revizyon 4 Notu
Hakkımda ve Hizmetler sayfalarındaki düşük kontrast/silik yazı problemi giderildi.


## Revizyon 5 – Logo Okunabilirlik Düzeltmesi

Üst menüde koyu lacivert zemin üzerinde okunmayan BAHRİ BUDAK logo yazısı düzeltildi. Logo yazıları açık modda lacivert, koyu modda beyaz okunacak şekilde ayarlandı. Ayrıca `Magazam` menü yazımı `Mağazam` olarak düzeltildi.


## Kurumsal Tasarım Revizyon 7

- Footer logo okunabilirliği düzeltildi.
- İletişim ve Blog sayfaları açık zemin / koyu yazı sistemine alındı.
- Felsefe kategori kalıntıları kaldırıldı.
- Hakkımda başlığı ve içerik sütun sayısı güncellendi.


## Revizyon 9

Ana sayfa Hakkımda logosu ve Hizmetler sayfası koyu panel okunabilirliği düzeltildi. Felsefe görünür kategori olarak eklenmedi.


## Revizyon 11

Kamuya açık olmayan çalışma ifadeleri kaldırıldı, hizmet/şablon metinleri profesyonelleştirildi ve blog kartı okunabilirliği düzeltildi.


## Revizyon 13
Blog kartları, kurumsal font ve renk standardına göre düzeltildi.
