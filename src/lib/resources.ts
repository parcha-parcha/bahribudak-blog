export type ResourceArea = 'orgu' | 'boya' | 'apre' | 'ortak'
export type ResourceGroup =
  | 'training'
  | 'technical'
  | 'form'
  | 'checklist'
  | 'calculation'
  | 'management'
export type ResourceFormat = 'PDF' | 'XLSX' | 'DOCX' | 'PPTX'
export type ResourceAccessLevel = 'free' | 'member' | 'premiumSoon'

export type ResourceItem = {
  id: string
  href: string
  areas: ResourceArea[]
  group: ResourceGroup
  format: ResourceFormat
  version: string
  catalogDate: string
  size: string
  fileLanguage: 'tr' | 'en' | 'tr-en'
  accessLevel?: ResourceAccessLevel
  title: { tr: string; en: string }
  description: { tr: string; en: string }
}

export const resourceCatalogDate = '2026-07-18'

export function resolveResourceAccessLevel(item: ResourceItem): ResourceAccessLevel {
  if (item.accessLevel) return item.accessLevel
  if (item.format === 'DOCX' || item.format === 'PPTX') return 'member'
  return 'free'
}

export function getDownloadPathAccessLevel(pathname: string): ResourceAccessLevel | null {
  const resource = resources.find(
    (item) => item.href === pathname && resolveResourceAccessLevel(item) !== 'free',
  )

  return resource ? resolveResourceAccessLevel(resource) : null
}

export function findResourceByDownloadPath(pathname: string) {
  return resources.find((item) => item.href === pathname) ?? null
}

export const resources: ResourceItem[] = [
  {
    id: 'hidrofil-silikon-pamuk-polyester-pdf',
    href: '/downloads/BB-KSS_Hidrofil_Silikon_Pamuk_Polyester_v1.0.pdf',
    areas: ['apre'],
    group: 'technical',
    format: 'PDF',
    version: 'V1.0',
    catalogDate: resourceCatalogDate,
    size: '302 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Pamuk ve Polyesterde Hidrofil Silikon Kullanımı',
      en: 'Hydrophilic Silicone Use on Cotton and Polyester',
    },
    description: {
      tr: 'Pamuk, polyester ve PES/CO karışımlarında ürün seçimi, proses koşulları, başlangıç reçeteleri, riskler ve kalite kontrol yöntemlerini kapsayan teknik rehber.',
      en: 'Technical guide covering product selection, process conditions, starting recipes, risks and quality-control methods for cotton, polyester and PES/CO blends.',
    },
  },
  {
    id: 'hidrofil-silikon-pamuk-polyester-docx',
    href: '/downloads/BB-KSS_Hidrofil_Silikon_Pamuk_Polyester_v1.0.docx',
    areas: ['apre'],
    group: 'technical',
    format: 'DOCX',
    version: 'V1.0',
    catalogDate: resourceCatalogDate,
    size: '56 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Hidrofil Silikon Teknik Rehberi — Düzenlenebilir Dosya',
      en: 'Hydrophilic Silicone Technical Guide — Editable File',
    },
    description: {
      tr: 'Teknik rehberin işletme şartlarına göre uyarlanabilen düzenlenebilir DOCX sürümü.',
      en: 'Editable DOCX version of the technical guide for adaptation to plant conditions.',
    },
  },

  {
    id: "buildup-haslik",
    href: "/downloads/BuildUp_Haslik_Teknik_Not_Revize_3.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "R03",
    catalogDate: resourceCatalogDate,
    size: "55 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Build-up Eğrisi ve Haslık Teknik Notu",
      en: "Build-up Curve and Fastness Technical Note",
    },
    description: {
      tr: "Boyarmadde konsantrasyonu, renk verimi ve haslık performansının birlikte değerlendirilmesine yönelik teknik not.",
      en: "Technical note for evaluating dyestuff concentration, color yield and fastness performance together.",
    },
  },
  {
    id: "banyo-enerji",
    href: "/downloads/banyo-enerji-hesabi.xlsx",
    areas: ["boya"],
    group: "calculation",
    format: "XLSX",
    version: "Arşiv",
    catalogDate: resourceCatalogDate,
    size: "10 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Banyo Enerji Hesabı",
      en: "Dye Bath Energy Calculation",
    },
    description: {
      tr: "Flotte hacmi ve sıcaklık değişimine göre teorik enerji ihtiyacını hesaplamaya yardımcı Excel aracı.",
      en: "Excel tool supporting theoretical energy calculation from liquor volume and temperature change.",
    },
  },
  {
    id: "norm-kadro-pdf",
    href: "/downloads/boyahane-norm-kadro-30-ton-19-makine.pdf",
    areas: ["ortak"],
    group: "management",
    format: "PDF",
    version: "Arşiv",
    catalogDate: resourceCatalogDate,
    size: "450 KB",
    fileLanguage: 'tr',
    title: {
      tr: "30 Ton / 19 Makine Boyahane Norm Kadro Çalışması",
      en: "30-Ton / 19-Machine Dyehouse Staffing Study",
    },
    description: {
      tr: "Üç vardiyalı boyahane organizasyonunda görev dağılımı ve kadro planlaması için hazırlanmış teknik çalışma.",
      en: "Technical staffing and responsibility study for a three-shift dyehouse organization.",
    },
  },
  {
    id: "norm-kadro-docx",
    href: "/downloads/Norm_Kadro_30_Ton_3_Vardiya_Boyahane_v7.docx",
    areas: ["ortak"],
    group: "management",
    format: "DOCX",
    version: "V07",
    catalogDate: resourceCatalogDate,
    size: "49 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyahane Norm Kadro Düzenlenebilir Dosyası",
      en: "Editable Dyehouse Staffing File",
    },
    description: {
      tr: "Norm kadro çalışmasının işletme şartlarına göre uyarlanabilen düzenlenebilir DOCX sürümü.",
      en: "Editable DOCX version of the staffing study for adaptation to plant conditions.",
    },
  },
  {
    id: "boyahane-org",
    href: "/downloads/boyahane-org-semasi.pdf",
    areas: ["ortak"],
    group: "management",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "377 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyahane Organizasyon Şeması",
      en: "Dyehouse Organization Chart",
    },
    description: {
      tr: "Boyahane, laboratuvar, kalite ve yardımcı birimler arasındaki sorumluluk ilişkisini gösteren organizasyon şeması.",
      en: "Organization chart showing responsibility links among dyehouse, laboratory, quality and support units.",
    },
  },
  {
    id: "kimyasal-mutfak",
    href: "/downloads/boyahane-suyu-boya-kimyasal-mutfagi-ve-dozaj-yonetimi-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "274 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyahane Suyu, Boya-Kimyasal Mutfağı ve Dozaj Yönetimi",
      en: "Dyehouse Water, Color Kitchen and Dosing Management",
    },
    description: {
      tr: "Su kalitesi, stok hazırlama, boya-kimyasal mutfağı ve dozaj sistemlerinin proses tekrar edilebilirliğine etkisi.",
      en: "Effect of water quality, stock preparation, color kitchen and dosing systems on process repeatability.",
    },
  },
  {
    id: "bes-kritik-analiz",
    href: "/downloads/boyahanede-5-kritik-analiz.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "681 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyahanede 5 Kritik Analiz",
      en: "Five Critical Analyses in the Dyehouse",
    },
    description: {
      tr: "Boyahane proses kararlarında kullanılan temel laboratuvar ve kalite analizlerine yönelik saha özeti.",
      en: "Field summary of core laboratory and quality analyses used in dyehouse process decisions.",
    },
  },
  {
    id: "renk-duzeltme",
    href: "/downloads/boyahanelerde-renk-ilavesi-ve-renk-duzeltme-yonetimi-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "397 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Renk İlavesi ve Renk Düzeltme Yönetimi",
      en: "Shade Addition and Color Correction Management",
    },
    description: {
      tr: "Renk farkı, ilave kararı, yeniden işlem, kök neden, maliyet ve performans göstergelerini birlikte ele alır.",
      en: "Covers color difference, addition decisions, reprocessing, root cause, cost and performance indicators.",
    },
  },
  {
    id: "boyama-baslangic",
    href: "/downloads/boyama-baslangic-kontrol-listesi-kurumsal-r2.xlsx",
    areas: ["boya"],
    group: "checklist",
    format: "XLSX",
    version: "R02",
    catalogDate: resourceCatalogDate,
    size: "31 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyama Başlangıç Kontrol Listesi",
      en: "Dyeing Start-up Checklist",
    },
    description: {
      tr: "Reçete, makine, flotte, su, boya, kimyasal ve dozaj hazırlığını proses başlamadan doğrulayan Excel listesi.",
      en: "Excel checklist verifying recipe, machine, liquor, water, dyes, chemicals and dosing before dyeing.",
    },
  },
  {
    id: "parti-takip",
    href: "/downloads/boyama-parti-takip-formu-kurumsal-r3.xlsx",
    areas: ["boya"],
    group: "form",
    format: "XLSX",
    version: "R03",
    catalogDate: resourceCatalogDate,
    size: "23 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyama Parti Takip Formu",
      en: "Dye Batch Tracking Form",
    },
    description: {
      tr: "Parti, reçete, makine, proses parametreleri, sapmalar ve final kalite sonuçlarını ortak kayıt altında toplar.",
      en: "Combines batch, recipe, machine, process parameters, deviations and final quality results in one record.",
    },
  },
  {
    id: "yikama-indirgen",
    href: "/downloads/boyama-sonrasi-yikama-ve-indirgen-temizleme-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "267 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyama Sonrası Yıkama ve İndirgen Temizleme",
      en: "Post-dye Washing and Reduction Clearing",
    },
    description: {
      tr: "Reaktif art yıkama, polyester indirgen temizleme, final pH, iletkenlik ve haslık kontrolünü açıklar.",
      en: "Explains reactive after-washing, polyester reduction clearing, final pH, conductivity and fastness control.",
    },
  },
  {
    id: "ro-kapasite-master-pdf",
    href: "/downloads/20-000-kg-boyahane-ro-kapasite-secimi-v1.0.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "539 KB",
    fileLanguage: 'tr',
    title: {
      tr: "20.000 kg/gün Boyahane RO Kapasite Seçimi",
      en: "RO Capacity Selection for a 20,000 kg/day Dyehouse",
    },
    description: {
      tr: "Ana boyama banyosu için RO permeat ihtiyacı, tank kapasitesi ve teknik seçim kararını özetleyen master doküman.",
      en: "Master document summarizing RO permeate demand, tank capacity and technical selection for main dye baths.",
    },
  },
  {
    id: "ro-kapasite-master-docx",
    href: "/downloads/20-000-kg-boyahane-ro-kapasite-secimi-v1.0.docx",
    areas: ["boya"],
    group: "technical",
    format: "DOCX",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "2.5 MB",
    fileLanguage: 'tr',
    title: {
      tr: "RO Kapasite Seçimi — Düzenlenebilir Master",
      en: "RO Capacity Selection — Editable Master",
    },
    description: {
      tr: "RO kapasite hesabı ve teknik seçim notunun işletmeye uyarlanabilen düzenlenebilir DOCX sürümü.",
      en: "Editable DOCX version of the RO capacity calculation and technical selection note.",
    },
  },
  {
    id: "ro-kapasite-carousel-pptx",
    href: "/downloads/20-000-kg-boyahane-ro-kapasite-secimi-carousel-v1.0.pptx",
    areas: ["boya"],
    group: "technical",
    format: "PPTX",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "2.7 MB",
    fileLanguage: 'tr',
    title: {
      tr: "RO Kapasite Seçimi Carousel Sunumu",
      en: "RO Capacity Selection Carousel Deck",
    },
    description: {
      tr: "RO kapasite seçimi kararını sosyal medya ve sunum kullanımı için özetleyen düzenlenebilir PPTX dosyası.",
      en: "Editable PPTX deck summarizing the RO capacity selection decision for presentation and social media use.",
    },
  },
  {
    id: "ro-geri-odeme-master-pdf",
    href: "/downloads/200m3-gun-ro-sistemi-maliyet-geri-odeme-v1.0.pdf",
    areas: ["boya"],
    group: "calculation",
    format: "PDF",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "736 KB",
    fileLanguage: 'tr',
    title: {
      tr: "200 m3/gün RO Sistemi Maliyet ve Geri Ödeme",
      en: "200 m3/day RO System Cost and Payback",
    },
    description: {
      tr: "RO sistemi yatırım, işletme maliyeti, su kullanım etkisi ve geri ödeme hesabını teknik özet halinde sunar.",
      en: "Technical summary of RO investment, operating cost, water-use impact and payback calculation.",
    },
  },
  {
    id: "ro-geri-odeme-master-docx",
    href: "/downloads/200m3-gun-ro-sistemi-maliyet-geri-odeme-v1.0.docx",
    areas: ["boya"],
    group: "calculation",
    format: "DOCX",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "3.7 MB",
    fileLanguage: 'tr',
    title: {
      tr: "RO Maliyet ve Geri Ödeme — Düzenlenebilir Master",
      en: "RO Cost and Payback — Editable Master",
    },
    description: {
      tr: "200 m3/gün RO geri ödeme çalışmasının işletme verileriyle uyarlanabilen DOCX sürümü.",
      en: "Editable DOCX version of the 200 m3/day RO payback study for plant-specific adaptation.",
    },
  },
  {
    id: "ro-geri-odeme-carousel-pptx",
    href: "/downloads/200m3-gun-ro-sistemi-maliyet-geri-odeme-carousel-v1.0.pptx",
    areas: ["boya"],
    group: "calculation",
    format: "PPTX",
    version: "V1.0",
    catalogDate: "2026-07-20",
    size: "14 MB",
    fileLanguage: 'tr',
    accessLevel: 'premiumSoon',
    title: {
      tr: "RO Maliyet ve Geri Ödeme Carousel Sunumu",
      en: "RO Cost and Payback Carousel Deck",
    },
    description: {
      tr: "RO yatırım geri ödeme mantığını karar vericilere kısa ve görsel akışla anlatan PPTX sunumu.",
      en: "PPTX deck explaining RO investment payback for decision makers in a concise visual flow.",
    },
  },
  {
    id: "ram-bacasi-master-pdf",
    href: "/downloads/BB-KSS-Tekstilde-Ram-Bacalarinin-Temizligi-Master-v1.0.pdf",
    areas: ["apre"],
    group: "technical",
    format: "PDF",
    version: "V1.0",
    catalogDate: "2026-07-22",
    size: "6.2 MB",
    fileLanguage: 'tr',
    title: {
      tr: "Tekstilde Ram Bacalarının Temizliği Master",
      en: "Textile Stenter Exhaust Cleaning Master",
    },
    description: {
      tr: "Ram bacalarında yangın riskini azaltmak için temizlik, kontrol ve kayıt sistemini açıklayan teknik master dosya.",
      en: "Technical master file on cleaning, inspection and recording to reduce stenter exhaust fire risk.",
    },
  },
  {
    id: "ram-bacasi-master-docx",
    href: "/downloads/BB-KSS-Tekstilde-Ram-Bacalarinin-Temizligi-Master-v1.0.docx",
    areas: ["apre"],
    group: "technical",
    format: "DOCX",
    version: "V1.0",
    catalogDate: "2026-07-22",
    size: "41 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Ram Bacası Temizliği — Düzenlenebilir Master",
      en: "Stenter Exhaust Cleaning — Editable Master",
    },
    description: {
      tr: "Ram bacası temizlik ve kontrol sisteminin işletmeye uyarlanabilen düzenlenebilir DOCX sürümü.",
      en: "Editable DOCX version of the stenter exhaust cleaning and inspection system.",
    },
  },
  {
    id: "bikarbonat-carousel-pptx",
    href: "/downloads/bb-cvs-tsu-bik-001-bikarbonat-carousel.pptx",
    areas: ["boya"],
    group: "technical",
    format: "PPTX",
    version: "R00",
    catalogDate: "2026-07-20",
    size: "18 MB",
    fileLanguage: 'tr',
    accessLevel: 'premiumSoon',
    title: {
      tr: "Bikarbonat ve Reaktif Boyama Carousel Sunumu",
      en: "Bicarbonate and Reactive Dyeing Carousel Deck",
    },
    description: {
      tr: "Bikarbonat, alkalinite ve proses seçimi kararını görsel akışla özetleyen düzenlenebilir PPTX sunumu.",
      en: "Editable PPTX deck summarizing bicarbonate, alkalinity and process selection in a visual flow.",
    },
  },
  {
    id: "boyahane-suyu-carousel-pptx",
    href: "/downloads/bb-cvs-boyahane-suyu-statik-karusel-r02.pptx",
    areas: ["boya"],
    group: "technical",
    format: "PPTX",
    version: "R02",
    catalogDate: resourceCatalogDate,
    size: "1.2 MB",
    fileLanguage: 'tr',
    title: {
      tr: "Boyahane Suyu Statik Carousel Sunumu",
      en: "Dyehouse Water Static Carousel Deck",
    },
    description: {
      tr: "İşletme suyu, iletkenlik, TDS ve ısı geri kazanımı konularını kısa görsel akışla özetleyen PPTX dosyası.",
      en: "PPTX file summarizing plant water, conductivity, TDS and heat recovery in a concise visual flow.",
    },
  },
  {
    id: "makineye-mal-giris-carousel-pptx",
    href: "/downloads/makineye-mal-giris-carousel-v1.1.pptx",
    areas: ["orgu", "boya"],
    group: "technical",
    format: "PPTX",
    version: "V1.1",
    catalogDate: "2026-07-21",
    size: "8 MB",
    fileLanguage: 'tr',
    title: {
      tr: "Makineye Mal Giriş Carousel Sunumu",
      en: "Fabric Loading into Dyeing Machine Carousel Deck",
    },
    description: {
      tr: "Makineye mal girişte parti kimliği, burulma, yükleme ve proses risklerini görsel sunum formatında özetler.",
      en: "Visual deck summarizing batch identity, twisting, loading and process risks during machine loading.",
    },
  },
  {
    id: "cozemli",
    href: "/downloads/cozemli_hazirlama.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "69 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Laboratuvarda Çözelti Hazırlama",
      en: "Laboratory Solution Preparation",
    },
    description: {
      tr: "Konsantrasyon, stok çözelti ve kontrollü laboratuvar hazırlığına yönelik teknik not.",
      en: "Technical note on concentration, stock solutions and controlled laboratory preparation.",
    },
  },
  {
    id: "kok-neden",
    href: "/downloads/hata-kok-neden-duzeltici-faaliyet-formu-kurumsal-r1.xlsx",
    areas: ["ortak"],
    group: "form",
    format: "XLSX",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "43 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Hata–Kök Neden–Düzeltici Faaliyet Formu",
      en: "Defect–Root Cause–Corrective Action Form",
    },
    description: {
      tr: "Hata kaydı, risk, beş neden, doğrulanmış kök neden, aksiyon, etkinlik kontrolü ve kapanışı izler.",
      en: "Tracks defect records, risk, five-why analysis, verified root cause, actions, effectiveness and closure.",
    },
  },
  {
    id: "ht-jet-yonetim",
    href: "/downloads/ht-jet-boyahanede-proses-yonetimi-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "314 KB",
    fileLanguage: 'tr',
    title: {
      tr: "HT Jet Boyahanede Proses Yönetimi",
      en: "Process Management in HT Jet Dyeing",
    },
    description: {
      tr: "Siparişten final kaliteye kadar HT jet proses zincirinin kritik kontrol noktalarını ve KPI yapısını açıklar.",
      en: "Explains critical control points and KPI structure of the HT jet process chain from order to final quality.",
    },
  },
  {
    id: "ht-jet-diyagram",
    href: "/downloads/ht-jet-boyama-proses-diyagramlari-teknik-revizyon-2026.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "2026",
    catalogDate: resourceCatalogDate,
    size: "2.9 MB",
    fileLanguage: 'tr',
    title: {
      tr: "HT Jet Boyama Proses Diyagramları",
      en: "HT Jet Dyeing Process Diagrams",
    },
    description: {
      tr: "HT jet proses akışlarını ve teknik kontrol noktalarını diyagram düzeninde sunan kapsamlı dosya.",
      en: "Comprehensive file presenting HT jet process flows and technical control points in diagram form.",
    },
  },
  {
    id: "ht-jet-kontrol",
    href: "/downloads/ht-jet-makinesinde-proses-kontrolu-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "333 KB",
    fileLanguage: 'tr',
    title: {
      tr: "HT Jet Makinesinde Proses Kontrolü",
      en: "Process Control on HT Jet Machines",
    },
    description: {
      tr: "Nozul, pompa, debi, tur süresi, flotte, sıcaklık ve dozajın kumaş hareketiyle birlikte yönetimini ele alır.",
      en: "Covers nozzle, pump, flow, cycle time, liquor, temperature and dosing together with fabric movement.",
    },
  },
  {
    id: "kasar-kontrol",
    href: "/downloads/kasar-on-kontrol-ve-baslatma-listesi-kurumsal-r2.xlsx",
    areas: ["boya"],
    group: "checklist",
    format: "XLSX",
    version: "R02",
    catalogDate: resourceCatalogDate,
    size: "29 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Kasar Ön Kontrol ve Başlatma Listesi",
      en: "Pretreatment Pre-check and Start-up List",
    },
    description: {
      tr: "Kumaş, makine, su, reçete ve kimyasal hazırlığını kasar başlamadan doğrulayan Excel kontrol sistemi.",
      en: "Excel control system verifying fabric, machine, water, recipe and chemical preparation before pretreatment.",
    },
  },
  {
    id: "laboratuvar-haftalik",
    href: "/downloads/laboratuvar-haftalik-kontrol-listesi-kurumsal-r1.xlsx",
    areas: ["boya"],
    group: "checklist",
    format: "XLSX",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "54 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Laboratuvar Haftalık Kontrol Listesi",
      en: "Weekly Laboratory Checklist",
    },
    description: {
      tr: "Cihaz, kalibrasyon, çözelti, su analizi, numune, güvenlik ve aksiyon kayıtlarını haftalık olarak yönetir.",
      en: "Manages instruments, calibration, solutions, water analysis, samples, safety and actions weekly.",
    },
  },
  {
    id: "lab-isletme",
    href: "/downloads/laboratuvar-recetesinden-isletme-recetesine-gecis-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "330 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Laboratuvar Reçetesinden İşletme Reçetesine Geçiş",
      en: "Laboratory-to-Bulk Recipe Transfer",
    },
    description: {
      tr: "Flotte, makine, stok çözelti, pH, sıcaklık, dozaj ve ilk parti onayını ölçek büyütme mantığıyla açıklar.",
      en: "Explains liquor, machine, stock solution, pH, temperature, dosing and first-batch approval during scale-up.",
    },
  },
  {
    id: "poliamid-asit",
    href: "/downloads/naylon-poliamid-kumaslarda-asit-boyama-egitimi-r3.pdf",
    areas: ["orgu", "boya"],
    group: "training",
    format: "PDF",
    version: "R03",
    catalogDate: resourceCatalogDate,
    size: "247 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Naylon / Poliamid Kumaşlarda Asit Boyama",
      en: "Acid Dyeing of Nylon / Polyamide Fabrics",
    },
    description: {
      tr: "Asit boyarmadde–poliamid ilişkisi, pH profili, boya alımı, düzgünlük, haslık ve elastan risklerini açıklar.",
      en: "Explains acid dye–polyamide interaction, pH profile, exhaustion, levelness, fastness and elastane risks.",
    },
  },
  {
    id: "sanfor-kompaktor",
    href: "/downloads/orme-kumaslarda-sanfor-kompaktor-ve-boyutsal-stabilite-egitimi-r1.pdf",
    areas: ["orgu", "apre"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "272 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Örme Kumaşlarda Sanfor, Kompaktör ve Boyutsal Stabilite",
      en: "Sanforizing, Compaction and Dimensional Stability in Knits",
    },
    description: {
      tr: "Örme kumaşlarda relaksasyon, kompaksiyon, çekme, spiralite, en ve gramaj ilişkisinin proses yönetimini açıklar.",
      en: "Explains process management of relaxation, compaction, shrinkage, spirality, width and GSM in knitted fabrics.",
    },
  },
  {
    id: "reaktif-egitim",
    href: "/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.pdf",
    areas: ["orgu", "boya"],
    group: "training",
    format: "PDF",
    version: "R02",
    catalogDate: resourceCatalogDate,
    size: "255 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Pamuk Örme Kumaşlarda Reaktif Boyama",
      en: "Reactive Dyeing of Cotton Knitted Fabrics",
    },
    description: {
      tr: "Reaktif boya–lif ilişkisi, tuz, alkali, pH, sıcaklık, fiksaj, hidroliz ve art yıkamayı bütüncül ele alır.",
      en: "Covers reactive dye–fiber interaction, salt, alkali, pH, temperature, fixation, hydrolysis and after-washing.",
    },
  },
  {
    id: "kasar-egitim",
    href: "/downloads/pamuk-pamuk-elastan-kasar-egitimi-r1.pdf",
    areas: ["orgu", "boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "241 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Pamuk ve Pamuk-Elastan Örme Kumaşlarda Kasar",
      en: "Pretreatment of Cotton and Cotton-Elastane Knits",
    },
    description: {
      tr: "Pamuk safsızlıkları, alkali–peroksit sistemi, ıslanma, elastan riski ve HT jet kasar prosesini açıklar.",
      en: "Explains cotton impurities, alkali–peroxide system, wetting, elastane risk and HT jet pretreatment.",
    },
  },
  {
    id: "pes-co",
    href: "/downloads/pamuk-polyester-karisimlarda-boyama-egitimi-r1.pdf",
    areas: ["orgu", "boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "247 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Polyester / Pamuk Karışımlarda Boyama",
      en: "Dyeing Polyester / Cotton Blends",
    },
    description: {
      tr: "PES/CO ve elastanlı karışımlarda boya sınıfı, proses rotası, pH–sıcaklık geçişi ve ton eşleştirmeyi ele alır.",
      en: "Covers dye class, process route, pH–temperature transition and shade matching in PES/CO and elastane blends.",
    },
  },
  {
    id: "dispers",
    href: "/downloads/polyester-orme-kumaslarda-dispers-boyama-egitimi-r1.pdf",
    areas: ["orgu", "boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "302 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Polyester Örme Kumaşlarda Dispers Boyama",
      en: "Disperse Dyeing of Polyester Knits",
    },
    description: {
      tr: "Dispers boya dağılımı, migrasyon, enerji sınıfı, HT proses, indirgen temizleme, oligomer ve ısıl boya göçünü açıklar.",
      en: "Explains disperse dye dispersion, migration, energy class, HT process, reduction clearing, oligomer and thermomigration.",
    },
  },
  {
    id: "ramoz-form",
    href: "/downloads/ramoz-apre-proses-takip-formu-kurumsal-r3.xlsx",
    areas: ["orgu", "apre"],
    group: "form",
    format: "XLSX",
    version: "R03",
    catalogDate: resourceCatalogDate,
    size: "27 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Ramöz ve Apre Proses Takip Formu",
      en: "Stenter and Finishing Process Tracking Form",
    },
    description: {
      tr: "Apre banyosu, kamara sıcaklığı, hız, kalış süresi, overfeed, en, pick-up ve final kaliteyi izleyen Excel formu.",
      en: "Excel form tracking finish bath, chamber temperature, speed, dwell time, overfeed, width, pick-up and final quality.",
    },
  },
  {
    id: "ramoz-egitim",
    href: "/downloads/ramoz-ve-apre-proses-kontrolu-egitimi-r1.pdf",
    areas: ["orgu", "apre"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "284 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Ramöz ve Apre Proses Kontrolü",
      en: "Stenter and Finishing Process Control",
    },
    description: {
      tr: "Ramöz girişinden çıkışına en, gramaj, rutubet, overfeed, sıcaklık, hız, pick-up ve fikse kontrolünü ele alır.",
      en: "Covers width, GSM, moisture, overfeed, temperature, speed, pick-up and heat-setting from stenter entry to exit.",
    },
  },
  {
    id: "recete-form",
    href: "/downloads/recete-hazirlama-ve-onay-formu-kurumsal-r2.xlsx",
    areas: ["boya"],
    group: "form",
    format: "XLSX",
    version: "R02",
    catalogDate: resourceCatalogDate,
    size: "21 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Reçete Hazırlama ve Onay Formu",
      en: "Recipe Preparation and Approval Form",
    },
    description: {
      tr: "Laboratuvar reçetesinin işletmeye aktarımı, miktar hesabı, tartım farkı, revizyon ve onay sürecini yönetir.",
      en: "Manages laboratory-to-bulk recipe transfer, quantity calculation, weighing variance, revisions and approvals.",
    },
  },
  {
    id: "haslik-final",
    href: "/downloads/renk-haslik-ve-final-kalite-kontrolleri-egitimi-r1.pdf",
    areas: ["boya"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "312 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Renk Haslığı ve Final Kalite Kontrolleri",
      en: "Color Fastness and Final Quality Controls",
    },
    description: {
      tr: "Renk, haslık, pH, en, gramaj, çekme ve serbest bırakma kriterlerini final kalite sistemi içinde açıklar.",
      en: "Explains color, fastness, pH, width, GSM, shrinkage and release criteria within final quality control.",
    },
  },
  {
    id: "sardon-tras",
    href: "/downloads/sardon-tras-ve-firca-proses-kontrolu-egitimi-r1.pdf",
    areas: ["orgu", "apre"],
    group: "training",
    format: "PDF",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "265 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Şardon, Tıraş ve Fırça Proses Kontrolü",
      en: "Raising, Shearing and Brushing Process Control",
    },
    description: {
      tr: "Mekanik aprede yüzey oluşumu, hız, baskı, tekrar geçişi, gramaj kaybı ve görünüm kontrolünü ele alır.",
      en: "Covers surface formation, speed, pressure, repeat passes, mass loss and appearance control in mechanical finishing.",
    },
  },
  {
    id: "fabrika-yonetim",
    href: "/downloads/tekstil-fabrikasi-teknik-yonetim-ve-proses-sistemi.pdf",
    areas: ["ortak"],
    group: "management",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "6.8 MB",
    fileLanguage: 'tr',
    accessLevel: 'premiumSoon',
    title: {
      tr: "Tekstil Fabrikası Teknik Yönetim ve Proses Sistemi",
      en: "Textile Mill Technical Management and Process System",
    },
    description: {
      tr: "Teknik organizasyon, proses kontrolü, kayıt, kalite, bakım ve iyileştirme sistemini bütüncül ele alan kapsamlı dosya.",
      en: "Comprehensive file covering technical organization, process control, records, quality, maintenance and improvement.",
    },
  },
  {
    id: "muhendislik-formulleri",
    href: "/downloads/tekstil-isletmelerinde-muhendislik-formulleri.pdf",
    areas: ["ortak"],
    group: "calculation",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "513 KB",
    fileLanguage: 'tr',
    accessLevel: 'premiumSoon',
    title: {
      tr: "Tekstil İşletmelerinde Mühendislik Formülleri",
      en: "Engineering Formulas for Textile Operations",
    },
    description: {
      tr: "Üretim, makine, enerji, flotte, dozaj ve performans hesaplarında kullanılan temel formüllerin teknik özeti.",
      en: "Technical summary of core formulas used in production, machinery, energy, liquor, dosing and performance calculations.",
    },
  },
  {
    id: "turkuaz",
    href: "/downloads/turkuaz-reaktif-boyama-proses.pdf",
    areas: ["boya"],
    group: "technical",
    format: "PDF",
    version: "Ar\u015fiv",
    catalogDate: resourceCatalogDate,
    size: "60 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Turkuaz Reaktif Boyama Proses Notu",
      en: "Turquoise Reactive Dyeing Process Note",
    },
    description: {
      tr: "Turkuaz reaktif boyamada proses sırası, kontrol noktaları ve saha risklerine yönelik teknik not.",
      en: "Technical note on sequence, control points and field risks in turquoise reactive dyeing.",
    },
  },
  {
    id: "final-kontrol",
    href: "/downloads/yikama-ve-final-kontrol-listesi-kurumsal-r1.xlsx",
    areas: ["boya"],
    group: "checklist",
    format: "XLSX",
    version: "R01",
    catalogDate: resourceCatalogDate,
    size: "31 KB",
    fileLanguage: 'tr',
    title: {
      tr: "Yıkama ve Final Kontrol Listesi",
      en: "Washing and Final Control Checklist",
    },
    description: {
      tr: "Yıkama rotası, nötralizasyon, durulama, final pH, renk, haslık, en, gramaj ve çekmezliği doğrular.",
      en: "Verifies washing route, neutralization, rinsing, final pH, shade, fastness, width, GSM and shrinkage.",
    },
  },
]
