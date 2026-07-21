# GERİ DÖNÜŞ / ROLLBACK PLANI

**Belge kodu:** BB-SYS-PRO-002  
**Revizyon:** R00

## 1. Yayın öncesi koruma

- Canlı `main` dalı doğrudan değiştirilmez.
- Her çalışma ayrı dal ve Pull Request üzerinden yürütülür.
- Merge öncesinde Vercel Preview `Ready` olmalıdır.
- Ana sürüm etiketleri silinmez veya yeniden yazılmaz.

## 2. Hata canlıya çıktıysa

### Seçenek A — Vercel geri dönüşü

1. Vercel projesinde **Deployments** açılır.
2. Son sağlıklı Production dağıtımı bulunur.
3. Dağıtım ayrıntısında **Promote to Production** veya eşdeğer geri yükleme işlemi uygulanır.
4. Canlı rota ve kritik indirmeler kontrol edilir.

### Seçenek B — GitHub revert

1. Hatalı Pull Request veya merge commit açılır.
2. GitHub üzerindeki **Revert** işlemi kullanılır.
3. Oluşan geri dönüş Pull Request’i kalite kontrollerinden geçirilir.
4. Pull Request `main` dalına alınır.
5. Vercel Production `Ready` olduktan sonra doğrulama yapılır.

## 3. Kritik kontrol rotaları

```text
/tr
/en
/tr/uzmanlik
/en/uzmanlik
/tr/blog
/en/blog
/tr/magazam
/en/magazam
/robots.txt
/sitemap.xml
```

## 4. Olay kaydı

Her geri dönüşte şu bilgiler kaydedilir:

- Tarih ve saat
- Hatalı commit veya Pull Request
- Etkilenen sayfalar
- Kullanıcı etkisi
- Uygulanan geri dönüş yöntemi
- Kök neden
- Tekrarı önleyici faaliyet
