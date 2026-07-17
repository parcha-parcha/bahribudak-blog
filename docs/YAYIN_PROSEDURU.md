# YAYIN PROSEDÜRÜ / PUBLICATION WORKFLOW

**Belge kodu:** BB-SYS-PRO-001  
**Revizyon:** R00  
**Yürürlük tarihi:** 25 Haziran 2026  
**Kapsam:** bahribudak.com teknik yayın ve site değişiklikleri

## 1. Temel ilke

Canlı siteyi taşıyan `main` dalında doğrudan çalışma yapılmaz. Her teknik yayın, kaynak güncellemesi veya altyapı düzeltmesi ayrı bir dalda hazırlanır; Vercel Preview ve GitHub kalite kontrolleri başarıyla tamamlandıktan sonra Pull Request üzerinden `main` dalına alınır.

## 2. Çalışma sırası

1. GitHub Desktop’ta `main` dalına geçilir.
2. `Fetch origin` ve gerekiyorsa `Pull origin` uygulanır.
3. Sol panelde `0 changed files` doğrulanır.
4. Yeni çalışma dalı oluşturulur.
5. Dosyalar çalışma dalına kopyalanır veya düzenlenir.
6. `npm run quality` çalıştırılır.
7. Commit ve `Push origin` uygulanır.
8. Pull Request açılır.
9. GitHub Actions ve Vercel Preview sonucu beklenir.
10. Türkçe, İngilizce ve mobil görünüm kontrol edilir.
11. Kontrol tamamlanınca `Merge pull request` uygulanır.
12. Vercel Production durumu `Ready` olduktan sonra canlı sayfa yeniden doğrulanır.

## 3. Dal adlandırma standardı

Yapısal çalışmalar tamamlandığı için yeni işler aşağıdaki biçimde ilerler:

- Teknik yayın: `teknik-yayin-<no>-<kisa-konu>`
- Hata düzeltmesi: `duzeltme-<kisa-konu>`
- Kaynak güncellemesi: `kaynak-<no>-<kisa-konu>`
- Teknik altyapı: `altyapi-<kisa-konu>`

Örnek:

```text
teknik-yayin-004-kasar-proses-kontrolu
duzeltme-ingilizce-yayin-yonlendirmesi
kaynak-035-ramoz-kontrol-formu
```

## 4. Teknik yayın minimum içeriği

Her Teknik Yayın / Technical Publication aşağıdaki alanları taşımalıdır:

- Amaç ve teknik sınır
- Proses akışı
- Kritik Proses Parametreleri / Critical Process Parameters
- Ölçüm ve Kontrol Noktaları / Measurement and Control Points
- Hata–Kök Neden–Düzeltici Faaliyet / Defect–Root Cause–Corrective Action
- Formül ve hesaplama açıklamaları
- Referans standartlar
- Belge kodu, revizyon ve revizyon tarihi
- Türkçe ve İngilizce karşılık
- Makine/ürün bazlı doğrulama uyarısı

## 5. Yayın onayı

Bir yayın yalnızca aşağıdaki koşullarda canlıya alınır:

- Teknik içerik saha terminolojisine uygundur.
- Evrensel reçete veya sabit makine set değeri verilmemiştir.
- Kaynaklar resmî standart kuruluşu, üretici teknik föyü veya güvenilir birincil teknik kaynaktır.
- Türkçe ve İngilizce sayfalar karşılıklı yönlendirilmiştir.
- Formüller ve birimler iki kez kontrol edilmiştir.
- Preview ve Production doğrulaması tamamlanmıştır.
