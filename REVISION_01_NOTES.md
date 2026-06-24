# REVİZYON 01 - KURUMSAL TEMEL

## Yapılan Değişiklikler

- Resmî kısa ve tanımlı logo dosyaları eklendi.
- Header alanındaki tek başına amblem kullanımı kaldırıldı.
- Hero ve footer logo kullanımı açık kurumsal panel standardına getirildi.
- Montserrat ve Inter yerine Poppins ana font sistemi uygulandı.
- Ana navigasyon Örgü / Boya / Apre odağına göre sadeleştirildi.
- Ana sayfa metinleri üç teknik uzmanlık alanına göre yeniden düzenlendi.
- Yayın kategorileri kurumsal kimlik v1.1 ile uyumlu hâle getirildi.
- Farklı yazılmış kategori değerleri normalize edildi.
- Felsefe kategorisi kamusal yayın akışından çıkarıldı.
- Next.js uzak görsel yapılandırması güncellendi.
- Ziyaretçi sayacı, Upstash ortam değişkenleri yokken güvenli şekilde devre dışı kalacak biçimde düzenlendi.

## Doğrulama

- `npm ci`: başarılı
- `npm run build`: başarılı
- TypeScript kontrolü: başarılı
- Statik sayfa üretimi: başarılı

## Bağımlılık Güvenlik Notu

- Kırıcı olmayan `npm audit fix` uygulandı.
- Next.js 16.2.9 ve PostCSS 8.5.14 sürümlerine güncellendi.
- NPM taramasında dört orta seviye uyarı devam etmektedir.
- `npm audit fix --force` uygulanmadı; önerilen işlem Next.js ve gray-matter için kırıcı sürüm düşürmeleri yapmaktadır.
- Kritik veya yüksek seviye uyarı bulunmamaktadır.
