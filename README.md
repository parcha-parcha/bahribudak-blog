# Revizyon 18 - Dil ve blog.latestPosts Hata Düzeltmesi

Bu paket Vercel hata kaydındaki şu problemi düzeltmek için hazırlanmıştır:

`TypeError: Cannot read properties of undefined (reading 'blog.latestPosts')`

Yapılan düzeltme:
- `src/lib/i18n.ts` dosyası güvenli hale getirildi.
- Dil değeri boş, hatalı veya beklenmeyen bir değer geldiğinde sistem otomatik olarak `tr` diline düşer.
- `blog.latestPosts`, `blog.readMore`, kategori adları ve menü metinleri artık veri eksikliği yüzünden siteyi çökertmez.
- Felsefe görünür kategori olarak tekrar eklenmedi.
- Kategori renkleri kurumsal lacivert/gri sisteminde tutuldu.

Commit mesajı:
`Dil sistemi ve blog.latestPosts hata düzeltmesi`
