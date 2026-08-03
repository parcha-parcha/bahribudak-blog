# BB-OS Faz 5 — Ortak Bileşen ve Legacy Temizlik Kaydı

## Kapsam

Bu kayıt, FAZ 5 R01 kapsamında site genelinde kullanılan küçük ortak bileşenlerde kalan eski lacivert–mavi marka kodlarının ve gereksiz görsel efektlerin temizlenmesini belgeler.

## Uygulanan işlemler

- 404 sayfası BB-OS kurumsal renklerine geçirildi.
- Mini takvim Graphite Black, Signal Orange, Warm White ve Soft Gray sistemine uyarlandı.
- Haber bandındaki eski lacivert–mavi renkler kaldırıldı.
- Günün sözü bileşenindeki gradient ve metin gölgesi kaldırıldı.
- İndirme kartı ve indirme butonu yeni marka paletine ve daha sade köşe sistemine geçirildi.
- Çıkış butonundaki eski marka renkleri temizlendi.
- Kategori renk eşlemeleri onaylı kurumsal palete bağlandı.
- Kullanılmayan `BBHomeLogoCard` bileşeni kaldırıldı.

## Kapsam dışında bırakılanlar

- Büyük üyelik ve hesap sayfalarının yerleşim dönüşümü
- Profil formunun marka uyumu
- Günün sözü dekoratif dairelerinin kaldırılması
- Kaynak merkezi kart mimarisinin tam sadeleştirilmesi
- Yönetim ekranları
- Uzmanlık sayfaları
- Legacy logo dosyalarının fiziksel olarak silinmesi

Bu alanlar FAZ 5’in sonraki patch adımlarında ayrı kontrol ve doğrulama ile ele alınacaktır.

## Doğrulama kriterleri

- `git diff --check`
- `npm run quality`
- Değişen dosyalarda eski lacivert–mavi kod taraması
- `BBHomeLogoCard` kullanım ve dosya kontrolü
