# REVİZYON 03 — TEKNİK YAYIN SİSTEMİ

**Dal:** `revizyon-03-teknik-yayin-sistemi`  
**Kapsam:** Teknik yayın veri modeli, süreç filtreleri, doküman kontrolü ve ilk Örgü / Knitting yayını  
**Belge tarihi:** 2026-06-25

---

## 1. Uygulanan Yapı

- Blog alanı **Teknik Yayınlar / Technical Publications** olarak yeniden konumlandırıldı.
- Yayınlar **Örgü / Knitting, Boya / Dyeing ve Apre / Finishing** proses alanlarına göre filtrelenebilir hâle getirildi.
- Teknik yayınlar için aşağıdaki kontrollü metadata alanları eklendi:
  - `technicalPublication`
  - `processArea`
  - `documentCode`
  - `revision`
  - `revisionDate`
  - `documentStatus`
  - `standards`
- Teknik yayın detay sayfasına **Doküman Kontrolü / Document Control** paneli eklendi.
- Referans standartlar ayrı ve okunabilir bir bölümde gösterildi.
- Teknik tablolar, formül blokları ve uzun içerikler için mobil uyumlu yayın stili oluşturuldu.
- Schema.org yapılandırılmış verisi teknik yayınlarda `TechArticle` olarak güncellendi.
- Sitemap içindeki `lastModified` değeri revizyon tarihi üzerinden çalışacak şekilde düzenlendi.
- Ana sayfa ve alt bilgi bağlantıları yeni proses filtrelerine bağlandı.

## 2. İlk Teknik Yayın

**Türkçe başlık:**  
İlmek Boyu / Stitch Length, Gramaj / GSM ve Kumaş Eni Arasındaki Proses İlişkisi

**İngilizce başlık:**  
Process Relationship Between Stitch Length, Fabric Weight / GSM and Fabric Width

**Belge kodu:** `BB-ORG-TP-001`  
**Revizyon:** `R00`  
**Proses alanı:** Örgü / Knitting

Yayın yapısı:

1. Amaç / Purpose
2. Kapsam ve varsayımlar / Scope and Assumptions
3. Temel tanımlar / Key Definitions
4. İlmek boyunun proses etkisi / Process Effect of Stitch Length
5. Sıra boyu / Course Length
6. Teorik gramaj ilişkisi / Theoretical GSM Relationship
7. Hesaplama örneği / Worked Example
8. En–gramaj–lineer metre ilişkisi
9. Prosesler arası kütle–alan dengesi
10. Ölçüm ve numune alma planı
11. Hata–kök neden–düzeltici faaliyet
12. Saha kontrol sırası
13. Kabul kriteri hakkında teknik ikaz
14. Kaynaklar / References

## 3. Teknik Sağlama

- `G_teorik = (T x l x C x W) / 100` bağıntısının birim dönüşümü doğrulandı.
- `Mf = G x B` bağıntısında `B` değerinin **açık en / open width** olduğu açıklandı.
- Tüp kumaşta serili düz en kullanılıyorsa `Mf_tüp = G x 2 x B_düz` düzeltmesi eklendi.
- `Lc = l x Na` bağıntısının besleyici ve iplik yolu bazında uygulanması gerektiği açıklandı.
- Hesaplama örnekleri bağımsız olarak yeniden hesaplandı.
- Evrensel makine set değeri veya müşteri şartnamesinden bağımsız tolerans verilmedi.

## 4. Standart Çerçevesi

Yayında aşağıdaki standartlar referanslanmıştır:

- ASTM D3776/D3776M-20(2025)
- ISO 139:2005 + Amd 1:2011
- ISO 22198:2006
- ISO 3759:2011
- ISO 6330:2021
- AATCC TM135-2025

Standartların tam metinleri siteye kopyalanmamış; yalnızca kapsam ve referans bilgileri kullanılmıştır.

## 5. Görsel Notu

İlk yayında mevcut kurumsal örgü görseli kullanılmıştır. Bir sonraki görsel revizyonunda tercih edilen saha fotoğrafı:

- Yuvarlak örme makinesinin kumaş çıkış bölgesi
- Pozitif iplik sevk sistemi ile çekim / take-down bölümünün aynı karede görünmesi
- Makineye yaklaşık 45° açı
- Operatör yüzü ve firma bilgisi görünmeyecek kadraj
- Yatay 16:9, en az 1600 × 900 px

## 6. Doğrulama

- `npm run build`: başarılı
- TypeScript kontrolü: başarılı
- 71 sayfa üretimi: başarılı
- Türkçe ve İngilizce teknik yayın rotaları: üretim derlemesine dahil
- Mobil tablolar: yatay taşma kontrollü
- Paket kaynak adresleri: resmî NPM registry yapısı korunuyor

## 7. Değişen Dosyalar

- `src/app/[lang]/PostCard.tsx`
- `src/app/[lang]/blog/[slug]/page.tsx`
- `src/app/[lang]/blog/page.tsx`
- `src/app/[lang]/page.tsx`
- `src/app/globals.css`
- `src/app/sitemap.ts`
- `src/components/ArticleSchema.tsx`
- `src/components/Footer.tsx`
- `src/components/PostCard.tsx`
- `src/content/tr/ilmek-boyu-gramaj-kumas-eni-proses-iliskisi.mdx`
- `src/content/en/stitch-length-gsm-fabric-width-process-relationship.mdx`
- `src/lib/i18n.ts`
- `src/lib/posts.ts`
- `SITE_REVISION_PLAN.md`
- `REVISION_03_NOTES.md`

## 8. Sonraki Aşama

- Boya / Dyeing için ilk kontrollü teknik yayın
- Apre / Finishing için ilk kontrollü teknik yayın
- Mevcut MDX içeriklerinin proses alanı ve doküman türü açısından envanteri
- Saha fotoğrafı standardının uygulanması
