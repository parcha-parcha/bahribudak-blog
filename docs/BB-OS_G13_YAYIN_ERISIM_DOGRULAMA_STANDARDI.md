# BB-OS G13-YED — Yayın Erişim Doğrulama Standardı

**Durum:** Aktif  
**Yürürlük:** 15 Ağustos 2026  
**Bağlı katman:** BB-OS-00 / BB-OS G13 Kapanış  
**Ana mimari:** 01–13 korunur; yeni ana aşama oluşturulmaz.

## Amaç

Teknik bir yayın, makale sayfası canlıya çıkmış olsa bile yayın dosyaları erişilebilir ve güvenli biçimde doğrulanmadan FINAL PASS alamaz.

## Zorunlu gate

İndirilebilir teknik dosyası bulunan her yayın için G13 kapanışından önce aşağıdaki kanıtlar tamamlanır:

1. Master ve türev dosyalar onaylı sürüm/adlandırma ile hazırlanmış olmalıdır.
2. TR ve EN teknik yayın frontmatter kayıtları `hasDownloads: true` ve doğru `accessLevel` taşımalıdır.
3. Yayın `config/bb-os-publication-gates.json` registry dosyasına kaydedilmiş olmalıdır.
4. Registry içindeki her download path, resource catalog içindeki tekil bir resource id/href ile eşleşmelidir.
5. `npm run verify:publication-gates` PASS olmalıdır.
6. Production sayfasında beklenen tüm indirme kartları görünmelidir.
7. Private Storage üzerinde tüm beklenen objeler bulunmalı; yol ve dosya boyutu kaynak dosyayla doğrulanmalıdır.
8. Veritabanındaki resource kayıtları aktif ve beklenen erişim seviyesinde olmalıdır.
9. Anonim kullanıcı private/member dosyayı alamamalı; giriş akışına yönlenmelidir.
10. Gerçek bir üye hesabıyla tüm yayın dosyaları fiziksel olarak indirilmeli ve açılabilir olmalıdır.

## PASS kuralı

- **CI PASS tek başına FINAL PASS değildir.**
- **Storage kaydı tek başına FINAL PASS değildir.**
- **Sayfada kart görünmesi tek başına FINAL PASS değildir.**
- FINAL PASS için kod/katalog doğrulaması + production doğrulaması + gerçek üye indirme kanıtı birlikte gerekir.
- Kanıtlardan biri eksikse durum `HOLD` veya `FAIL` olarak kalır.

## Güvenlik sınırı

GitHub Actions içine Supabase service role/secret key eklenmez. CI yalnız repository içi tutarlılığı kontrol eder. Production Storage, DB, anonim erişim ve gerçek üye indirme kontrolleri kontrollü kapanış doğrulamasıdır.

## Değişiklik yönetimi

Master dosya adı, sürümü, download path, resource id, erişim seviyesi veya yayın slug'ı değişirse G13-YED yeniden açılır. Önceki PASS geçersiz olur ve ilgili kanıtlar yeniden üretilir.

## Kapanış kaydı

Her yayın için ayrı kapanış kaydı tutulabilir. Kayıtta en az belge kodu, revizyon, doğrulanan dosyalar, Storage/DB sonucu, anonim erişim sonucu, gerçek üye indirme sonucu ve FINAL PASS tarihi bulunur.
