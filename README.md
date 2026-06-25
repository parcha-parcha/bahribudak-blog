# Bahri Budak — Örgü, Boya ve Apre Teknik Yayın Platformu

**Canlı site:** bahribudak.com  
**Yapısal sürüm:** v1.0.0  
**Kurumsal kimlik:** Bahri Budak Kurumsal Kimlik v1.1  
**Ana uzmanlık omurgası:** Örgü / Knitting, Boya / Dyeing, Apre / Finishing

## Kurulum

```bash
npm ci
npm run dev
```

## Zorunlu kalite kontrolü

```bash
npm run quality
```

Bu komut sırasıyla:

1. Site içi kaynak ve yayın tutarlılığını doğrular.
2. TypeScript kontrolünü çalıştırır.
3. Next.js üretim derlemesini tamamlar.

Ayrı komutlar:

```bash
npm run verify:site
npm run typecheck
npm run build
```

## Yayın yöntemi

Canlı `main` dalında doğrudan değişiklik yapılmaz. Her çalışma ayrı dal, Pull Request, GitHub Actions ve Vercel Preview üzerinden doğrulanır.

Ayrıntılı dokümanlar:

- `docs/YAYIN_PROSEDURU.md`
- `docs/YAYIN_ONCESI_KONTROL_LISTESI.md`
- `docs/DOSYA_ADLANDIRMA_STANDARDI.md`
- `docs/GERI_DONUS_PLANI.md`
- `docs/BAKIM_PLANI.md`
- `docs/ARSIV_VE_SURUMLEME_PLANI.md`

## Kurumsal kurallar

- Resmî logo dosyaları yalnızca `public/brand` içindeki onaylı kurumsal varyantlardan seçilir.
- Ana yazı ailesi Poppins’tir.
- Ana renk paleti kurumsal kimlik v1.1 ile sınırlıdır.
- Teknik terminoloji Türkçe ve İngilizce birlikte ve tutarlı kullanılır.
- Evrensel reçete veya sabit makine ayarı yayımlanmaz.
- Formül, standart ve hesaplamalar yayın öncesinde iki kez doğrulanır.

## İçerik sistemi

Teknik yayınlar:

```text
src/content/tr
src/content/en
```

Kaynak Merkezi kataloğu:

```text
src/lib/resources.ts
```

TR / EN yayın eşleştirmeleri:

```text
src/lib/translatedRoutes.ts
```

Sürüm bilgisi:

```text
VERSION
public/release-manifest.json
```
