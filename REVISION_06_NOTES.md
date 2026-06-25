# REVİZYON 06 — TEKNİK KAYNAK MERKEZİ

**Dal:** `revizyon-06-kaynak-merkezi`  
**Kapsam:** PDF, XLSX ve DOCX kaynak envanteri; filtreleme, sürüm, dosya boyutu ve kırık bağlantı kontrolü  
**Belge tarihi:** 2026-06-25

---

## 1. Uygulanan Kaynak Merkezi Yapısı

Kaynak Merkezi tek bir doğrulanmış veri kataloğuna bağlanmıştır.

Katalog alanları:

- Türkçe ve İngilizce kaynak adı
- Türkçe ve İngilizce teknik açıklama
- Proses alanı
- Kaynak türü
- Dosya biçimi
- Sürüm / revizyon
- Katalog kayıt tarihi
- Dosya boyutu
- Dosya dili
- Doğrudan indirme bağlantısı

## 2. Proses Sınıflandırması

Kaynaklar aşağıdaki teknik alanlarda filtrelenebilir:

- Örgü / Knitting
- Boya / Dyeing
- Apre / Finishing
- Ortak Teknik Yönetim / Cross-process Management

Birden fazla prosesi ilgilendiren dosyalar birden fazla filtre altında gösterilebilir.

## 3. Kaynak Türleri

- Eğitim Notu / Training Note
- Teknik Doküman / Technical Document
- Proses Formu / Process Form
- Kontrol Listesi / Checklist
- Hesaplama Aracı / Calculation Tool
- Yönetim Dokümanı / Management Document

## 4. Dosya Biçimleri

- PDF
- XLSX
- DOCX

## 5. Envanter Sonucu

- Doğrulanmış ve katalogda gösterilen güncel kaynak: **34**
- Fiziksel indirme dosyası: **47**
- Katalog dışında tutulan eski veya mükerrer kopyalar: arşivde korunmuştur
- Kaynak kodunda kalan kırık indirme bağlantısı: **0**
- Önceki yapıda tespit edilen var olmayan DOCX bağlantısı: **15**
- Bu 15 bağlantı indirme arayüzünden kaldırılmıştır

Eski dosyalar fiziksel olarak silinmemiştir. Böylece daha önce paylaşılmış bağlantılar korunurken Kaynak Merkezi yalnız güncel sürümü gösterir.

## 6. Kullanıcı Arayüzü

Yeni Kaynak Merkezi:

- Serbest metin araması
- Proses filtresi
- Kaynak türü filtresi
- Dosya biçimi filtresi
- Sonuç sayacı
- Sıfır sonuç durumu
- Mobil ve masaüstü uyumlu kart sistemi
- Dosya sürümü, boyutu, katalog tarihi ve dili
- Kurumsal lacivert, proses mavisi, açık mavi ve beyaz renk sistemi

## 7. Türkçe–İngilizce Yapı

- `/tr/magazam`
- `/en/magazam`

Arayüz iki dilde çalışır. İndirme dosyalarının mevcut dili kartta ayrıca belirtilir. İngilizce arayüzde Türkçe dosyalar yanlış biçimde İngilizce içerikmiş gibi gösterilmez.

## 8. Sitemap

Aşağıdaki rotalar sitemap kapsamına alınmıştır:

- Kaynak Merkezi
- Tekstil Teknik Dokümanları
- Eğitim Notları
- Proses Formları
- Kontrol Listeleri

## 9. Değişen Dosyalar

- `REVISION_06_NOTES.md`
- `SITE_REVISION_PLAN.md`
- `src/lib/resources.ts`
- `src/components/ResourceCenter.tsx`
- `src/app/[lang]/magazam/page.tsx`
- `src/app/[lang]/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari/page.tsx`
- `src/app/sitemap.ts`

## 10. Kabul Ölçütleri

- Üretim derlemesi başarılı olmalı
- TypeScript hatası bulunmamalı
- Kaynak Merkezi Türkçe ve İngilizce açılmalı
- Mobilde yatay taşma olmamalı
- Katalogdaki tüm indirme bağlantıları fiziksel dosyayla eşleşmeli
- Kaynak kodunda var olmayan `/downloads/` bağlantısı kalmamalı
- Eski dosyalar silinmemeli
