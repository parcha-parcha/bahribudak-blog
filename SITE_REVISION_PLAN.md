# BAHRİ BUDAK WEB SİTESİ REVİZYON PLANI

**Proje:** bahribudak.com  
**Ana uzmanlık omurgası:** Örgü / Knitting - Boya / Dyeing - Apre / Finishing  
**Kurumsal referans:** Bahri Budak Kurumsal Kimlik ve Yayın Standardı v1.1  
**Teknik altyapı:** Next.js 16, React, TypeScript, Tailwind CSS

---

## 1. Temel İlke

Sitenin ana bilgi mimarisi yalnızca üç üretim odağı üzerine kurulacaktır:

1. **Örgü / Knitting**
2. **Boya / Dyeing**
3. **Apre / Finishing**

Kurumsal kimlik kılavuzundaki dört yayın kategorisi, ana uzmanlık mimarisi değil; içerikleri sınıflandıran ikincil yayın taksonomisidir:

- Tekstil ve Teknik Yayınlar
- Üretim ve Yönetim Sistemleri
- Kişisel Gelişim
- Sektörel ve Güncel Analizler

Ana navigasyon ve ana sayfa üç teknik odağı öne çıkaracak; yayın kategorileri blog ve alt bilgi alanında kullanılacaktır.

---

## 2. Fazlandırılmış Uygulama Planı

### Faz 1 - Kurumsal Temel ve Teknik Temizlik

**Durum: TAMAMLANDI**

- Yalnızca onaylı iki resmî logo dosyası sisteme alındı.
- Tek başına amblem/monogram kullanımı header alanından kaldırıldı.
- Koyu zemin üzerindeki logo açık kurumsal panel içine alındı.
- Site tipografisi Poppins ana yazı ailesine geçirildi.
- Kurumsal renk değişkenleri v1.1 paletine bağlandı.
- Ana navigasyon sadeleştirildi.
- Ana sayfa Örgü / Boya / Apre uzmanlık omurgasına dönüştürüldü.
- Kategori adlarındaki büyük-küçük harf ve Türkçe karakter dağınıklığı normalize edildi.
- Felsefe içerikleri silinmeden kamusal yayın akışından çıkarıldı.
- Next.js görsel alanı `remotePatterns` yapısına geçirildi.
- Upstash değişkenleri bulunmadığında oluşan derleme uyarıları giderildi.
- Üretim derlemesi başarıyla doğrulandı.

**Kabul ölçütü:** `npm run build` hatasız tamamlanmalıdır.

---

### Faz 2 - Bilgi Mimarisi ve Sayfa Omurgası

**Durum: TAMAMLANDI**

Hazırlanan kalıcı ve SEO uyumlu sayfalar:

- `/tr/uzmanlik`
- `/tr/uzmanlik/orgu`
- `/tr/uzmanlik/boya`
- `/tr/uzmanlik/apre`
- `/en/uzmanlik`
- İngilizce uzmanlık detay sayfaları

Her sayfada ortak teknik şablon uygulanmıştır:

1. Prosesin amacı
2. Makine ve ekipmanlar
3. Kritik proses parametreleri
4. Ölçüm ve kontrol noktaları
5. Yaygın hata türleri
6. Kök neden / Root Cause yaklaşımı
7. Düzeltici faaliyet / Corrective Action
8. İlgili yayınlar
9. İndirilebilir teknik kaynaklar
10. Teknik referans çerçevesi
11. Saha görseli çekim standardı

Ek uygulamalar:

- Ana sayfadaki üç uzmanlık kartı detay sayfalarına bağlandı.
- Header navigasyonu kalıcı uzmanlık merkezine yönlendirildi.
- Canonical, hreflang, Open Graph ve TechArticle yapılandırılmış verisi eklendi.
- Sitemap uzmanlık rotalarını kapsayacak şekilde genişletildi.
- Türkçe ve İngilizce içerik yapısı aynı veri modeline bağlandı.
- Sabit reçete veya evrensel makine set değeri verilmedi; ürün ve makine bazlı doğrulama notu eklendi.

**Kabul ölçütü:** Üretim derlemesi, TypeScript kontrolü ve Türkçe-İngilizce uzmanlık rotaları HTTP 200 sonucuyla tamamlandı.

---

### Faz 3 - Teknik Yayın Sistemi ve İçerik Taksonomisi

**Durum: KISMEN TAMAMLANDI — Revizyon 03 ve Revizyon 04**

Tamamlanan altyapı:

- Blog alanı Teknik Yayınlar / Technical Publications olarak yeniden yapılandırıldı.
- Örgü / Knitting, Boya / Dyeing ve Apre / Finishing proses filtreleri eklendi.
- Belge kodu, revizyon, revizyon tarihi, yayın durumu ve referans standart alanları veri modeline eklendi.
- Teknik yayın detay sayfasına Doküman Kontrolü / Document Control paneli eklendi.
- Teknik tablolar, formüller ve mobil görünüm için ortak yayın stili oluşturuldu.
- İlk Türkçe ve İngilizce Örgü / Knitting teknik yayını hazırlandı:
  - İlmek Boyu / Stitch Length, Gramaj / GSM ve Kumaş Eni Arasındaki Proses İlişkisi
  - Belge kodu: `BB-ORG-TP-001`
- İlk Türkçe ve İngilizce Boya / Dyeing teknik yayını hazırlandı:
  - Reaktif Boyamada / Reactive Dyeing pH, Sıcaklık, Tuz ve Alkali Yönetimi
  - Belge kodu: `BB-BOY-TP-001`
- TechArticle yapılandırılmış verisi ve revizyon tarihine bağlı sitemap güncellemesi uygulandı.

Devam edecek envanter ve taksonomi çalışması:

- Mevcut MDX içeriklerinin tek tek incelenmesi
- Ön Terbiye / Pretreatment
- Yıkama / Washing-off
- Ramöz / Stenter
- Kompaktör / Compactor
- Laboratuvar / Laboratory
- Kalite Kontrol / Quality Control
- Enerji ve Maliyet / Energy and Cost
- Üretim Yönetimi / Production Management
- İçerik türü ve hedef kullanıcı etiketleri
- Görsel, kaynak, revizyon ve indirme bağlantısı kontrolü
- Mükerrer içerik ve eski revizyon temizliği

**Kabul ölçütü:** Yeni teknik yayınlar ortak şablonu kullanmalı; mevcut yayınların tamamı en az bir proses alanı, bir içerik türü ve bir hedef kullanıcı etiketi taşımalıdır.

---

### Faz 4 - Teknik Kaynak Merkezi

**Öncelik: Orta-Yüksek**

Mevcut PDF, DOCX ve XLSX dosyaları düzenli bir kaynak veri yapısına aktarılacaktır.

Her kaynak kartında:

- Doküman adı
- Proses alanı
- Dosya türü
- Revizyon numarası
- Yayın tarihi
- Hedef kullanıcı
- Kısa teknik açıklama
- Dosya boyutu
- İndirme düğmesi
- İlgili blog yazısı

Dosya adları kurumsal standarda göre düzenlenecektir:

`XX_YY_Konu_Adi_Bahri_Budak.ext`

**Kabul ölçütü:** Kırık bağlantı, mükerrer dosya ve açıklamasız indirme kalmamalıdır.

---

### Faz 5 - Teknik Görseller ve Yayın Şablonu

**Öncelik: Orta**

- Blog kapakları 1600 x 900 px standardına getirilecek.
- Gerçek makine, kumaş, laboratuvar ve proses görselleri kullanılacak.
- Her teknik makalede gerekli görsel çekim listesi belirlenecek.
- Kapak hiyerarşisi standartlaştırılacak:
  - Seri/kategori etiketi
  - Ana başlık
  - Teknik açıklama
  - Resmî logo
  - bahribudak.com
  - Teknik Not / Ücretsiz PDF etiketi
- Makale sonuna kaynak, doküman özeti ve indirme bilgisi eklenecek.

**Kabul ölçütü:** Stok görsel hissi veren, prosesi yanlış temsil eden veya logosuz teknik kapak kullanılmamalıdır.

---

### Faz 6 - SEO, Performans, Erişilebilirlik ve Yayın Kontrolü

**Öncelik: Orta**

- Sayfa bazlı metadata
- Canonical ve hreflang kontrolü
- Yapılandırılmış veri / Schema.org
- Sitemap kapsamının genişletilmesi
- Görsel optimizasyonu ve `next/image`
- Mobil menü ve dokunma alanları
- Klavye erişilebilirliği
- Renk kontrastı
- 404 ve yönlendirme kontrolü
- Form güvenliği ve spam önleme
- Bağımlılık güvenlik taraması
- Masaüstü ve mobil görsel regresyon testi

**Kabul ölçütü:** Üretim derlemesi, bağlantı kontrolü, mobil görünüm ve temel erişilebilirlik testleri birlikte geçmelidir.

---

## 3. Uygulama Sırası

1. Faz 1 - Kurumsal temel ve teknik temizlik
2. Faz 2 - Örgü, Boya ve Apre uzmanlık sayfaları
3. Faz 3 - Teknik yayın sistemi ve mevcut içeriklerin sınıflandırılması
4. Faz 4 - Kaynak merkezi veri yapısı
5. Faz 5 - Teknik görsel ve yayın şablonları
6. Faz 6 - SEO, performans ve son kalite kontrol

---

## 4. İlk Sonraki Uygulama

Bir sonraki revizyonda Revizyon 03 altyapısı genişletilecektir.

Öncelik sırası:

1. Boya / Dyeing için ilk kontrollü teknik yayın
2. Apre / Finishing için ilk kontrollü teknik yayın
3. Mevcut MDX içeriklerinin proses alanına göre sınıflandırılması
4. Türkçe-İngilizce teknik terim sözlüğünün sabitlenmesi
5. Her yayına içerik türü ve hedef kullanıcı etiketi eklenmesi
6. Mükerrer dosya, eski revizyon ve kırık bağlantı kontrolü
7. Kaynak merkezi ile uzmanlık sayfaları arasındaki ilişkilerin veri modeline bağlanması
