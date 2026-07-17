# REVİZYON 08 — NİHAİ YAYIN SİSTEMİ VE ARŞİV

**Dal:** `revizyon-08-nihai-yayin-ve-arsiv`  
**Belge tarihi:** 25 Haziran 2026  
**Yapısal sürüm:** `v1.0.0`

## 1. Amaç

Revizyon 08 ile sitenin yapısal geliştirme dönemi kapatılmış; yayın, kalite kontrol, bakım, sürümleme, arşivleme ve geri dönüş süreçleri kalıcı bir sisteme bağlanmıştır.

## 2. Eklenen sistemler

- `VERSION` ve `public/release-manifest.json`
- Otomatik site doğrulama komutu: `npm run verify:site`
- Birleşik kalite komutu: `npm run quality`
- GitHub Actions üretim kontrolü
- Pull Request zorunlu kontrol şablonu
- Yayın prosedürü
- Yayın öncesi kontrol listesi
- Dosya ve belge adlandırma standardı
- Bakım planı
- Geri dönüş / Rollback planı
- Arşiv ve sürümleme planı
- v1.0.0 değişiklik günlüğü

## 3. Otomatik doğrulama kapsamı

Doğrulama betiği aşağıdaki alanları kontrol eder:

- Zorunlu kurumsal ve teknik dosyalar
- `VERSION` ile release manifest sürüm eşleşmesi
- Üretim dışı özel NPM paket kaynakları
- Kaynak kodundaki `/downloads/` bağlantıları
- Türkçe–İngilizce teknik yayın eşleştirmeleri
- Teknik yayın zorunlu frontmatter alanları
- Mükerrer belge kodları
- Temel uzmanlık, yayın ve Kaynak Merkezi rota dosyaları

## 4. Revizyon sonrası çalışma şekli

Revizyon 08 son yapısal revizyondur. Bundan sonra çalışmalar:

- Teknik Yayın 004, 005, ...
- Kaynak güncellemesi
- Bakım düzeltmesi
- Küçük altyapı geliştirmesi

olarak adlandırılır; “Revizyon 09” şeklinde devam edilmez.

## 5. Yayın sonrası işlem

Revizyon 08 `main` dalına alınıp Vercel Production doğrulandıktan sonra GitHub üzerinde `v1.0.0` etiketi ve Release oluşturulacaktır.
