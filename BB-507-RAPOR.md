# BB-507 — ZIP → GitHub Yayın Kontrol Raporu

## Sonuç

**Durum:** Repository’ye aktarılmaya hazır paket oluşturuldu. Doğrudan GitHub push yapılmadı; kaynak ZIP içinde repository sahibi/adı ve kesin hedef branch bilgisi bulunmuyor.

## Yapılan işlemler

- ZIP açıldı ve arşiv bütünlüğü doğrulandı.
- 8 kaynak dosya kontrol edildi; bozuk, boş, yinelenen veya gizli sistem dosyası bulunmadı.
- Dosya ve klasör adları küçük harf, ASCII ve kebab-case biçimine dönüştürüldü.
- MDX, indirilebilir PDF, DOCX ve PPTX dosyaları repository mantığına göre ayrıldı.
- MDX yayınına üç doğrulanmış indirme bağlantısı eklendi.
- SHA-256 dosya manifestosu üretildi.
- Kaynak sosyal medya, SEO ve kalite kontrol dosyaları yayın destek klasörlerine ayrıldı.

## Önerilen hedef yapı

```text
content/tr/yayinlar/
public/downloads/
publishing/social/
publishing/seo/
publishing/qa/
```

## Ad dönüşümleri

- `01_SITE_MDX_boyahane-isletme-suyunda-bikarbonat.mdx` → `content/tr/yayinlar/boyahane-isletme-suyunda-bikarbonat.mdx`
- `05_BB-KSS_TEKNIK_MASTER_Bikarbonat.docx` → `public/downloads/bb-kss-bikarbonat-teknik-master.docx`
- `06_BB-KSS_TEKNIK_MASTER_Bikarbonat.pdf` → `public/downloads/bb-kss-bikarbonat-teknik-master.pdf`
- `BB-CVS-TSU-BIK-001_Bikarbonat_Carousel.pptx` → `public/downloads/bb-cvs-tsu-bik-001-bikarbonat-carousel.pptx`
- `02_SOSYAL_MEDYA_METINLERI.md` → `publishing/social/sosyal-medya-metinleri.md`
- `03_SEO_META_YAYIN_BILGILERI.md` → `publishing/seo/seo-meta-yayin-bilgileri.md`
- `04_SON_YAYIN_KONTROL_LISTESI.md` → `publishing/qa/son-yayin-kontrol-listesi.md`
- `00_OKU_BENI.md` → `README.md`

## Font referans denetimi

- DOCX: Angsana New, Aptos, Aptos Display, Arial, Calibri, Cambria, Cordia New, Courier, DaunPenh, DokChampa, Estrangelo Edessa, Euphemia, Gautami, Iskoola Pota, Kalinga, Kartika, Latha, MV Boli, Mangal, Microsoft Himalaya, Microsoft Uighur, Microsoft Yi Baiti, Mongolian Baiti, MoolBoran, Nyala, Plantagenet Cherokee, Raavi, Shruti, Sylfaen, Symbol, Times New Roman, Tunga, Vrinda, en-US, ja-JP, 宋体, 新細明體, 맑은 고딕, ＭＳ ゴシック, ＭＳ 明朝
- PPTX: Angsana New, Arial, Cordia New, DaunPenh, DokChampa, Ebrima, Estrangelo Edessa, Euphemia, Gautami, Iskoola Pota, Javanese Text, Kalinga, Kartika, Latha, Leelawadee UI, MV Boli, Mangal, Microsoft Himalaya, Microsoft JhengHei, Microsoft New Tai Lue, Microsoft Tai Le, Microsoft Uighur, Microsoft Yi Baiti, Mongolian Baiti, MoolBoran, Myanmar Text, Nirmala UI, Nyala, Phagspa, Plantagenet Cherokee, Raavi, Segoe UI, Shruti, Sylfaen, Times New Roman, Tunga, Vrinda, 新細明體, 游ゴシック, 游ゴシック Light, 等线, 等线 Light, 맑은 고딕

Bu denetim dosya içindeki font adlarını gösterir; hedef bilgisayarda fontların kurulu olduğunu garanti etmez. Türkçe karakter sorunu yaşanmaması için yayında sistem fontlarına veya Türkçe Latin karakter seti doğrulanmış gömülebilir fontlara bağlı kalınmalıdır.

## Açık yayın kapıları

- OG görseli kaynak pakette yok; `1200 × 630 px` dosya ayrıca eklenmeli.
- MDX hedef dizini gerçek Next.js repository yapısıyla karşılaştırılmalı.
- İç bağlantılar ve kaynak URL’leri canlı ortamda test edilmeli.
- PPTX’in web carousel çıktıları PNG/JPG olarak ayrıca dışa aktarılmamış.

## GitHub aktarım sırası

1. Paket içeriğini repository köküne kopyalayın.
2. MDX içerik dizinini mevcut proje yapısına göre gerekirse taşıyın.
3. `public/downloads` yollarının canlı URL’de çalıştığını doğrulayın.
4. Build ve lint testini çalıştırın.
5. Ayrı branch üzerinde commit/push ve pull request oluşturun.
