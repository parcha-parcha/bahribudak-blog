# REVİZYON 07 — SİTE GENELİ KALİTE KONTROLÜ

**Dal:** `revizyon-07-site-geneli-kalite-kontrolu`  
**Belge tarihi:** 25 Haziran 2026  
**Kapsam:** Türkçe–İngilizce içerik tutarlılığı, SEO, erişilebilirlik, yönlendirme, mobil tablo ve rota doğrulaması

---

## 1. Uygulanan Ana Düzeltmeler

### 1.1 Türkçe–İngilizce içerik tutarlılığı

Aşağıdaki ana sayfalar iki dilde yeniden yapılandırılmıştır:

- Ana Sayfa / Home
- Hakkımda / About
- Teknik Hizmetler / Technical Services
- İletişim / Contact

İngilizce rotalarda görünen Türkçe başlık ve açıklamalar kaldırılmış; teknik terminoloji Örgü / Knitting, Boya / Dyeing ve Apre / Finishing ekseninde sabitlenmiştir.

### 1.2 SEO ve metadata kontrolü

- Ana Sayfa, Teknik Yayınlar, Hakkımda, Hizmetler ve İletişim sayfalarına sayfa bazlı metadata eklenmiştir.
- Canonical ve `hreflang` eşleşmeleri doğrulanmıştır.
- Teknik yayınlarda Türkçe–İngilizce karşılık rotaları metadata içine eklenmiştir.
- Mükerrer `| Bahri Budak | Bahri Budak` başlıkları giderilmiştir.
- Open Graph ve Twitter görselleri mevcut kurumsal görsele bağlanmıştır.
- Yapılandırılmış veri içindeki var olmayan `og-default.jpg` yedeği kaldırılmıştır.

### 1.3 Erişilebilirlik

- “Ana içeriğe geç / Skip to main content” bağlantısı eklenmiştir.
- Masaüstü ve mobil navigasyona `aria-current` eklenmiştir.
- Mobil menüye `aria-controls` ve Escape tuşuyla kapanma davranışı eklenmiştir.
- Klavye odak göstergeleri güçlendirilmiştir.
- Hareket azaltma tercihi / `prefers-reduced-motion` desteklenmiştir.
- İletişim ikonları dekoratif olarak işaretlenmiştir.

### 1.4 Mobil ve teknik tablo kontrolü

- Teknik yayın tablolarına yatay kaydırma desteği eklenmiştir.
- Küçük ekranlarda tablo hücre genişliği ve okunabilirlik korunmuştur.
- Görsellerde maksimum genişlik ve otomatik yükseklik güvence altına alınmıştır.
- Sayfa genelinde yatay taşma riski sınırlandırılmıştır.

### 1.5 Yönlendirme ve eski rota kontrolü

- Eski `/hizmetler` rotası kalıcı olarak `/tr/hizmetler` adresine yönlendirilmiştir.
- İngilizce karşılığı bulunmayan eski Türkçe doküman sayfaları `/en/magazam` Kaynak Merkezi’ne yönlendirilmiştir.
- Sitemap’ten yönlendirme üreten İngilizce eski doküman rotaları çıkarılmıştır.
- 404 sayfası Türkçe–İngilizce ortak yapıda hazırlanmıştır.

### 1.6 Sitemap ve robots

- Hakkımda, Hizmetler ve İletişim sayfaları sitemap kapsamına alınmıştır.
- Yalnızca Türkçe içeriği bulunan eski doküman rotaları Türkçe olarak listelenmiştir.
- `robots.txt` içine site ana alan adı / host bilgisi eklenmiştir.

---

## 2. Değişen Dosyalar

1. `REVISION_07_NOTES.md`
2. `SITE_REVISION_PLAN.md`
3. `src/app/globals.css`
4. `src/app/layout.tsx`
5. `src/app/robots.ts`
6. `src/app/sitemap.ts`
7. `src/app/not-found.tsx`
8. `src/app/hizmetler/page.jsx`
9. `src/app/[lang]/layout.tsx`
10. `src/app/[lang]/page.tsx`
11. `src/app/[lang]/about/page.tsx`
12. `src/app/[lang]/blog/page.tsx`
13. `src/app/[lang]/blog/[slug]/page.tsx`
14. `src/app/[lang]/contact/page.tsx`
15. `src/app/[lang]/hizmetler/page.tsx`
16. `src/app/[lang]/magazam/page.tsx`
17. `src/app/[lang]/proses-formlari/page.tsx`
18. `src/app/[lang]/uzmanlik/page.tsx`
19. `src/app/[lang]/uzmanlik/[slug]/page.tsx`
20. `src/app/[lang]/sablonlar/tekstil-teknik-dokumanlari/page.tsx`
21. `src/app/[lang]/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari/page.tsx`
22. `src/app/[lang]/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri/page.tsx`
23. `src/app/[lang]/sablonlar/tekstil-teknik-dokumanlari/proses-formlari/page.tsx`
24. `src/components/ArticleSchema.tsx`
25. `src/components/Header.tsx`

---

## 3. Teknik Doğrulama

- `npm ci`: başarılı
- `npm run build`: başarılı
- TypeScript kontrolü: başarılı
- 75 statik/dinamik sayfa üretimi: başarılı
- 24 çekirdek rota: HTTP 200
- Türkçe ana rotalar: başarılı
- İngilizce ana rotalar: başarılı
- Eski rota yönlendirmeleri: başarılı
- Kaynak kodundaki `/downloads/` bağlantıları: 34
- Eksik fiziksel indirme dosyası: 0
- Sitemap: HTTP 200
- Robots: HTTP 200

---

## 4. Yayın Öncesi Kontrol

Vercel Preview üzerinde aşağıdaki sayfalar kontrol edilmelidir:

- `/tr`
- `/en`
- `/tr/about`
- `/en/about`
- `/tr/hizmetler`
- `/en/hizmetler`
- `/tr/blog`
- `/en/blog`
- `/tr/magazam`
- `/en/magazam`
- Türkçe ve İngilizce üç teknik yayın
- Mobil menü
- Teknik yayın tabloları
- 404 sayfası
- TR / EN geçişleri

Kontrol tamamlanmadan `main` dalına birleştirme yapılmamalıdır.
