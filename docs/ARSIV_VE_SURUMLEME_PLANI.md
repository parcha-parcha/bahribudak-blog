# ARŞİV VE SÜRÜMLEME PLANI

**Belge kodu:** BB-SYS-PLN-002  
**Revizyon:** R00

## 1. Ana sürüm

Revizyon 08 tamamlandığında yapısal site sürümü:

```text
v1.0.0
```

olarak etiketlenir.

## 2. Sürüm artırma

- `v1.0.x`: hata düzeltmesi, küçük SEO veya erişilebilirlik düzeltmesi
- `v1.x.0`: yeni teknik yayın sistemi özelliği, yeni kaynak modülü veya önemli işlev
- `v2.0.0`: bilgi mimarisi veya teknik altyapıda geriye uyumsuz büyük değişiklik

Teknik yayınların içerik revizyonu ayrıca belge üzerindeki `R00`, `R01` sistemiyle yönetilir.

## 3. Saklanacak arşiv

Her ana sürümde:

- GitHub tag
- GitHub Release açıklaması
- GitHub tarafından oluşturulan Source code ZIP
- `VERSION`
- `public/release-manifest.json`
- Revizyon notları
- Canlı Production kontrol kaydı

saklanır.

## 4. Haricî yedek

GitHub tek yedek olarak kullanılmaz. Ana sürüm ZIP dosyası en az iki ayrı ortamda saklanır:

1. Kurumsal bulut depolama
2. Yerel veya haricî disk

Dosya adı:

```text
bahribudak-site-v1.0.0_2026-06-25.zip
```

## 5. Sohbet bağlantıları

Sohbet içinde oluşturulan indirme bağlantıları kalıcı arşiv olarak kabul edilmez. Nihai kaynak GitHub Release ve haricî yedektir.
