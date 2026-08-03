# BB-OS Faz 5 R04-A — Kamusal Arayüz ve Ortak Stil Kontrol Kaydı

## Amaç

Kamusal arayüzlerde kalan legacy lacivert–mavi renkleri, ağır kart efektlerini ve geçici stil dosyalarını BB-OS v3.3 kurumsal kimlik standardına göre temizlemek.

## Kapsam

- Teknik yayın kartı
- Haberler sayfası
- Hizmetler sayfası
- Site içi arama sayfası
- Haber bandı
- Global ortak kart, rozet ve CTA sınıfları
- Kullanılmayan geçici CSS yama dosyaları

## Uygulanan kurallar

- Graphite Black `#111315`
- Warm White `#F6F4EF`
- Slate Gray `#6F7782`
- Signal Orange `#E45A2B`
- Soft Gray `#E5E2DA`
- Kartlarda gölgesiz, sınır temelli ayrım
- Standart köşe yarıçapı: 8–14 px
- Hover sırasında yükselme ve ölçek büyütme yok
- Gradient ve dekoratif zemin dokusu yok
- İşlevsel veri çekme, arama, filtreleme ve yönlendirme mantığı korunur

## Değişen dosyalar

- `src/app/[lang]/PostCard.tsx`
- `src/app/[lang]/haberler/page.tsx`
- `src/app/[lang]/hizmetler/page.tsx`
- `src/app/[lang]/search/page.tsx`
- `src/components/NewsTicker.tsx`
- `src/app/globals.css`

## Kaldırılan geçici dosyalar

- `src/app/globals-css-patch.txt`
- `src/components/styles-to-add.css`

Bu iki dosya aktif kod tarafından kullanılmayan eski yama kalıntılarıdır.

## Korunan iş mantığı

- Haber API isteği ve filtreleme
- Arama parametreleri ve sonuç üretimi
- Dil yönlendirmeleri
- Teknik yayın kartı bağlantıları
- Haber bandının duraklatma ve animasyon davranışı

## Doğrulama

- `git diff --check`
- `npm run quality`
- R04-A hedef dosyalarında legacy renk ve ağır efekt taraması
- Masaüstü ve mobil Preview kontrolü

## Durum

Uygulama ve doğrulama bekleniyor.
