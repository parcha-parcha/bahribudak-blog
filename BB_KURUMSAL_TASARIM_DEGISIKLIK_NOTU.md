# BB Kurumsal Tasarım Uygulaması

Bu paket, bahribudak.com/tr için kurumsal kimlik renklerine göre hazırlanmış ilk tasarım revizyonudur.

## Yapılan ana değişiklikler
- Eski sarı vurgu sistemi görsel olarak mavi vurgu sistemine eşlendi.
- Ana lacivert #0B2343, derin lacivert #061A33, gri #5D5F63, açık gri #F3F6FA, vurgu mavi #2EA6D9 olarak güncellendi.
- Header ve footer içine BB kurumsal logo bileşeni eklendi.
- .env.local paket dışı bırakıldı.
- .gitignore güvenli hale getirildi.
- Hizmetler sayfasının metin/içerik yapısı korunarak renk sistemi kurumsal kimliğe uyarlandı.

## Yeni dosya
- src/components/BrandLogo.tsx

## Güvenlik notu
Orijinal ZIP içinde .env.local dosyasında API anahtarları vardı. Bu dosya yeni pakete alınmadı. GitHub public repo içinde duruyorsa silinmeli ve anahtarlar yenilenmelidir.
