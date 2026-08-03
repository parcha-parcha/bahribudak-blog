# BB-OS Faz 5 R03 — Hesap, Schema ve Legacy Logo Kapanış Kaydı

## Amaç

Hesabım ana sayfasındaki kalan eski lacivert–mavi arayüz kodlarını temizlemek, profil formunu BB-OS v3.3 kurumsal arayüz standardına bağlamak ve yapılandırılmış verideki legacy logo referansını kaldırmak.

## Kapsam

- `src/components/auth/AccountPage.tsx`
- `src/components/auth/ProfileForm.tsx`
- `src/components/ArticleSchema.tsx`
- `public/brand/README.md`

## Uygulanan düzenlemeler

- Hesabım ana sayfası Graphite Black, Warm White, Slate Gray, Signal Orange ve Soft Gray paletine geçirildi.
- Dekoratif daire, ağır gölge, iki rem kart köşeleri ve pill CTA kullanımı kaldırıldı.
- Kartlar 14 px ana köşe ve 8 px alt bileşen standardına bağlandı.
- Profil formu alanları, odak durumu ve kayıt düğmesi ortak kurumsal arayüz standardına uyarlandı.
- Profil güncelleme, Supabase, indirme geçmişi, yönlendirme ve yönetici yetki mantığı değiştirilmedi.
- `ArticleSchema` yayıncı adı `Bahri Budak` olarak sadeleştirildi.
- Legacy `bb-logo-yatay.png` yapılandırılmış veri referansı kaldırıldı.
- `public/brand` dosyalarının legacy/arşiv statüsü kesinleştirildi.

## Kapsam Dışı

- Genel site sayfalarındaki kalan eski renk kodları ve ağır efektler.
- Yönetim panelleri.
- MDX içeriklerine gömülü eski CTA renkleri.
- Yeni bir resmî master logo dosyası üretimi.

Bu alanlar Faz 5 final taraması ve sonraki kontrollü düzeltme paketlerinde ele alınacaktır.

## Doğrulama

Uygulama sonrası aşağıdaki kontroller çalıştırılacaktır:

```text
git diff --check
npm run quality
```

Ayrıca R03 hedef dosyalarında eski palet, ağır efekt ve legacy logo referansı taranacaktır.
