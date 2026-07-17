# BAHRİ BUDAK WEB SİTESİ — TAMAMLANAN YAPISAL PLAN

**Proje:** bahribudak.com  
**Yapısal sürüm:** v1.0.0  
**Ana uzmanlık:** Örgü / Knitting, Boya / Dyeing, Apre / Finishing  
**Kurumsal referans:** Bahri Budak Kurumsal Kimlik v1.1

## Revizyon durumu

### Revizyon 01 — TAMAMLANDI
Kurumsal kimlik, onaylı logo sistemi, Poppins tipografisi, kurumsal renkler ve ana sayfa mimarisi.

### Revizyon 02 — TAMAMLANDI
Örgü, Boya ve Apre uzmanlık sayfaları; Türkçe ve İngilizce ortak teknik şablon.

### Revizyon 03 — TAMAMLANDI
Teknik Yayın sistemi ve ilk Örgü / Knitting yayını.

### Revizyon 04 — TAMAMLANDI
Reaktif Boyamada / Reactive Dyeing pH, Sıcaklık, Tuz ve Alkali Yönetimi.

### Revizyon 05 — TAMAMLANDI
Ramöz / Stenter ve Kompaktör / Compactor Sonrası Boyutsal Stabilite Yönetimi.

### Revizyon 06 — TAMAMLANDI
Kaynak Merkezi, dosya türü ve proses filtreleri, kırık indirme bağlantılarının temizlenmesi.

### Revizyon 07 — TAMAMLANDI
Türkçe–İngilizce tutarlılık, SEO, erişilebilirlik, mobil görünüm, yönlendirme, 404, sitemap ve robots kalite kontrolü.

### Revizyon 08 — TAMAMLANDI
Nihai yayın sistemi, GitHub Actions, kalite doğrulama betiği, bakım, arşiv, sürümleme ve geri dönüş prosedürleri.

## Yapısal geliştirme sonrası dönem

Yeni çalışmalar revizyon numarasıyla değil, yayın veya bakım türüyle adlandırılır:

```text
Teknik Yayın 004
Teknik Yayın 005
Saha Notu 001
Hesaplama Formu 001
Bakım Düzeltmesi 001
```

## Zorunlu kalite kapısı

Her çalışma aşağıdaki komutla doğrulanır:

```bash
npm run quality
```

Her Pull Request, GitHub Actions ve Vercel Preview kontrolleri başarıyla tamamlanmadan `main` dalına alınmaz.

## Bakım periyodu

- Aylık: bağlantı, indirme, yönlendirme ve Production kontrolü
- Üç aylık: mobil, SEO, erişilebilirlik ve teknik yayın revizyonları
- Yıllık: standart sürümleri, bağımlılıklar, tam yedek ve kurumsal kimlik denetimi
