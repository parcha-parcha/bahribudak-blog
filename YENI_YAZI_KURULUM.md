# Yeni Blog Yazısı Kurulum Notu

Eklenen yazı:
- `src/content/tr/asetik-asit-sabun-ayni-banyoda-kullanilir-mi.mdx`

Eklenen kapak görseli:
- `public/images/asetik-asit-sabun-ayni-banyo.png`

Yazının yayın adresi:
- `/tr/blog/asetik-asit-sabun-ayni-banyoda-kullanilir-mi`

## Mevcut siteye yalnızca bu içeriği eklemek için

1. MDX dosyasını sitenizdeki `src/content/tr/` klasörüne kopyalayın.
2. PNG görselini `public/images/` klasörüne kopyalayın.
3. Değişiklikleri Git deposuna gönderin ve sitenizi yeniden deploy edin.

MDX ön bilgisindeki `coverImage` değeri görseli otomatik çağırır:

`coverImage: "/images/asetik-asit-sabun-ayni-banyo.png"`

Ek bir sayfa veya yönlendirme dosyası oluşturmanız gerekmez. Blog sistemi MDX dosya adını slug olarak kullanır.
