# REVİZYON 05 — APRE / FINISHING TEKNİK YAYINI

**Dal:** `revizyon-05-apre-boyutsal-stabilite`  
**Kapsam:** Ramöz / Stenter ve Kompaktör / Compactor sonrası boyutsal stabilite yönetimi  
**Belge tarihi:** 2026-06-25

---

## 1. Yayınlanan Teknik Dosya

**Türkçe başlık:**  
Ramöz / Stenter ve Kompaktör / Compactor Sonrası Boyutsal Stabilite Yönetimi

**İngilizce başlık:**  
Dimensional Stability Management after Stenter and Compactor

**Belge kodları:**

- Türkçe: `BB-APR-TP-001`
- İngilizce: `BB-FIN-TP-001`

**Revizyon:** `R00`  
**Proses alanı:** Apre / Finishing

## 2. Teknik İçerik Yapısı

Yayında aşağıdaki bölümler hazırlanmıştır:

1. Amaç ve teknik sınır
2. Boyutsal kararsızlığın lif–iplik–örgü–yaş proses kaynakları
3. Ramözün kurutma, en ayarı, fiksaj ve gerilim yönetimi
4. Giriş rutubeti, giriş gerilimi ve overfeed
5. En ayarı, gerçek kumaş sıcaklığı ve bekleme süresi
6. Relaksasyon kurutma
7. Kompaktör giriş durumu ve mekanik kompaksiyon
8. Keçe, bant, silindir ve basınç sistemi
9. En–GSM–lineer metre ağırlığı ilişkisi
10. Boyutsal değişim hesapları
11. Ölçüm ve numune alma disiplini
12. Ramöz–kompaktör proses penceresinin kurulması
13. Hata–Kök Neden–Düzeltici Faaliyet
14. Spiralite yönetimi
15. Zorunlu proses kayıt alanları
16. Kabul kriterleri ve çoklu yıkama ikazı
17. Sürdürülebilirlik ve İlk Seferde Doğru üretim
18. Saha kontrol özeti
19. Kaynaklar

## 3. Teknik Sağlama

- Boyutsal stabilitenin yalnız kompaktör ayarı olmadığı açıklandı.
- Ramöz ekran sıcaklığı ile gerçek kumaş sıcaklığı ayrıştırıldı.
- Overfeed formülünün makine PLC tanımına bağlı olduğu belirtildi.
- `24 m / 30 m/dk = 0.80 dk = 48 s` geometrik bekleme hesabı doğrulandı.
- Boyutsal değişim formülü iki yön için kontrol edildi:
  - `500 mm → 485 mm = -3.0%`
  - `500 mm → 495 mm = -1.0%`
- `220 g/m² × 1.80 m = 396 g/m` lineer metre ağırlığı hesabı doğrulandı.
- Negatif işaretin çekme, pozitif işaretin uzama anlamına geldiği açıklandı.
- Bazı müşteri raporlarının çekmeyi pozitif büyüklükle verdiği için işaret konvansiyonu uyarısı eklendi.
- Evrensel ramöz sıcaklığı, overfeed, en, kompaktör basıncı veya çekme limiti verilmedi.
- Spiralitenin yalnız ramözde kalıcı olarak düzeltilemeyeceği belirtildi.
- Çoklu yıkama davranışının tek çevrim sonucundan farklı olabileceği açıklandı.

## 4. Standart Çerçevesi

- ISO 3759:2011
- ISO 6330:2021
- ISO 5077:2007
- ISO 16322-2:2021
- ISO 16322-3:2021

Standartların tam metinleri siteye kopyalanmamış; yalnız kapsam ve referans bilgileri kullanılmıştır.

## 5. Görsel Standardı

Mevcut temsili görsel:

- `blog-endustriyel-proses.jpg`

Talep edilen gerçek saha fotoğrafları:

1. Ramöz zincir girişinde overfeed ve iğneleme/klipsleme, yaklaşık 45° açı.
2. Ramöz çıkışında en ölçümü, operatör hizasından.
3. Kompaktör keçesi, silindir ve kumaş geçişi, yan açı.
4. ISO 3759 mantığıyla işaretlenmiş çekmezlik numunesi, üstten dik açı.
5. Baş–orta–son numune seti ve ölçüm cihazları.
6. Firma ve operatör kimliği görünmeyecek kadraj.
7. Yatay 16:9, en az 1600 × 900 px.

## 6. Dil Yönlendirmesi

Türkçe ve İngilizce yayın slugları `translatedRoutes.ts` içinde eşleştirilmiştir:

- `/tr/blog/ramoz-kompaktor-sonrasi-boyutsal-stabilite-yonetimi`
- `/en/blog/dimensional-stability-management-after-stenter-and-compactor`

EN/TR düğmesi iki yönde kanonik yayına geçmelidir.

## 7. Değişen Dosyalar

- `src/content/tr/ramoz-kompaktor-sonrasi-boyutsal-stabilite-yonetimi.mdx`
- `src/content/en/dimensional-stability-management-after-stenter-and-compactor.mdx`
- `src/lib/translatedRoutes.ts`
- `SITE_REVISION_PLAN.md`
- `REVISION_05_NOTES.md`

## 8. Sonraki Aşama

- Revizyon 06 — Teknik Kaynak Merkezi
- PDF, DOCX ve XLSX envanteri
- Doküman kodu, revizyon, tarih, dosya boyutu ve kırık bağlantı kontrolü
