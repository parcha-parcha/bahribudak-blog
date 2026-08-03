# BB-OS — Logo, Header ve Footer Kontrol Kaydı

**Faz:** 3
**Sürüm:** v3.3
**Durum:** Uygulama adımı 1

## Onaylı web kimliği

- Sembol: üç yatay çizgi ve alt sağ Signal Orange vurgu segmenti.
- Wordmark: BAHRİ BUDAK.
- Tanımlayıcı satır: Teknik Yayınlar · Danışmanlık · Tekstil Sistemleri.
- Renkler: #111315, #F6F4EF, #6F7782, #E45A2B, #E5E2DA.
- Tipografi: Acumin Pro; dijital fallback Inter; teknik veri IBM Plex Mono.

## Repository bulgusu

`public/brand` altında bulunan mevcut `bb-logo-*` SVG ve PNG dosyaları eski yonca/lacivert-mavi kimliğe aittir. Bu varlıklar bu fazda silinmemiştir; referans taraması tamamlanana kadar arşiv/legacy statüsünde tutulur ve yeni arayüzlerde kullanılmaz.

Web arayüzünün geçici kanonik logo uygulaması `src/components/BrandLogo.tsx` bileşenidir. Bağımsız onaylı master SVG teslim edildiğinde bileşen bu dosyaya bağlanacaktır.

## Bu adımda yapılanlar

- Header logosu kompakt yatay varyasyona geçirildi.
- Ana navigasyonda ağır siyah aktif kutu yerine Signal Orange alt çizgi sistemi uygulandı.
- Header arama ve sosyal bağlantı bileşenlerindeki eski mavi renkler kaldırıldı.
- Footer içindeki glow/blur dekorasyonları kaldırıldı.
- Onaysız slogan yerine resmî tanımlayıcı satır kullanıldı.
- Signal Orange CTA üzerinde Graphite Black metin kullanılarak kontrast iyileştirildi.
- Eski mavi focus, hover ve ok renkleri onaylı palete geçirildi.

## Kapsam dışı

- Legacy logo dosyalarının fiziksel olarak silinmesi.
- Resmî master SVG geometrisinin yeniden çizilmesi.
- Sayfa gövdesi ve içerik kartlarının görsel revizyonu.
