# BB-OS Marka Kaynak Manifestosu

**Durum:** Aktif
**Yürürlük:** 3 Ağustos 2026
**Kapsam:** bahribudak.com ve repository içindeki tüm marka uygulamaları

## 1. Kaynak önceliği

Çelişki halinde aşağıdaki sıra uygulanır:

1. `docs/BB-OS_KURUMSAL_KIMLIK_STANDARDI.md`
2. `config/brand/bb-brand-tokens.json`
3. `src/styles/bb-brand-tokens.css`
4. `public/brand/README.md`
5. `README.md`

## 2. Tek kaynak kuralı

- Normatif marka kararları Markdown standartta tutulur.
- Makine tarafından okunabilir renk ve font değerlerinin kanonik kaynağı JSON dosyasıdır.
- CSS dosyası JSON kaynağının web çalışma kopyasıdır; değerler farklılaştırılamaz.
- `globals.css`, Tailwind, React bileşenleri ve diğer stil dosyalarında yeni marka rengi veya font kararı üretilemez.
- Yeni token yalnız kurumsal kimlik revizyonuyla JSON ve CSS kaynaklarına birlikte eklenir.

## 3. Geçersiz eski sistem

Aşağıdaki tanımlar aktif kurumsal kimlik değildir:

- Bahri Budak Kurumsal Kimlik v1.1 referansı
- Poppins ana font sistemi
- Lacivert–mavi ana palet
- Proses mavisinin marka vurgu rengi olarak kullanılması
- BB monogramı
- Kod içinde yeniden tasarlanmış veya oranı değiştirilmiş logo

Eski isimler yalnız geçiş sürecinde teknik uyumluluk amacıyla bulunabilir; yeni tasarım kararı olarak kullanılamaz.

## 4. Logo kaynak durumu

`public/brand` içindeki mevcut dosyalar Faz 3 logo doğrulamasına kadar korunur. Bu dosyalar:

- Silinmez.
- Yeniden adlandırılmaz.
- Yeni onaylı master olarak kabul edilmez.
- Kurumsal kimlik panosu ve resmî SVG master ile geometrik karşılaştırma yapılmadan çoğaltılmaz.

## 5. Uygulama fazları

- Faz 1: kaynakları sabitleme ve eski referansları geçersiz kılma
- Faz 2: font, Tailwind ve global token uygulaması
- Faz 3: logo master doğrulaması ve logo bileşenleri
- Faz 4: ortak arayüz bileşenleri
- Faz 5: sayfa bazlı görsel denetim
- Faz 6: doküman ve şablon uyumu
- Faz 7: kalite, Preview ve Production doğrulaması
