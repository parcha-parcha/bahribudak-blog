# Revizyon 30 - Logo Boyut Okunabilirlik Düzeltmesi

Bu paket, yeni kurumsal logo siteye yerleştirildikten sonra görülen küçük boyut/okunabilirlik sorununu düzeltmek için hazırlanmıştır.

Yapılan düzeltme:

- `src/components/BrandLogo.tsx` güncellendi.
- Yatay logo varsayılan olarak büyütüldü.
- Dikey logo varsayılan olarak büyütüldü.
- Sadece amblem kullanımlarında minimum görünür boyut artırıldı.
- Logo sınıflarındaki küçük `h-*` değerlerinin logoyu okunmaz hale getirmemesi için bileşene güvenli genişlik sistemi eklendi.
- Logo dosyalarının kendisi değiştirilmedi; sadece sitedeki görünür kullanım boyutu büyütüldü.

Commit mesajı:

Logo boyutları okunabilir hale getirildi
