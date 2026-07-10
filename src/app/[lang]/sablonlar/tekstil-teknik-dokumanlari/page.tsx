import type { Metadata } from 'next'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import type {
  ResourceGroup,
  ResourceItem,
} from '@/lib/resources'
import {
  resourceCatalogDate,
  resources,
} from '@/lib/resources'

interface TechnicalDocumentsPageProps {
  params: Promise<{ lang: string }>
}

type CollectionDefinition = {
  href: string
  group: ResourceGroup
  code: string
}

type FeaturedDocumentDefinition = {
  id: string
  category: {
    tr: string
    en: string
  }
  details: {
    tr: string[]
    en: string[]
  }
  tags: {
    tr: string[]
    en: string[]
  }
}

const collectionDefinitions: CollectionDefinition[] = [
  {
    href: '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
    group: 'training',
    code: '01',
  },
  {
    href: '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
    group: 'checklist',
    code: '02',
  },
  {
    href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
    group: 'form',
    code: '03',
  },
]

const featuredDocumentDefinitions: FeaturedDocumentDefinition[] = [
  {
    id: 'muhendislik-formulleri',
    category: {
      tr: 'Makine, enerji ve yardımcı işletmeler',
      en: 'Machinery, energy and utilities',
    },
    details: {
      tr: ['Teknik başvuru kaynağı', 'Formül ve örnek hesaplar', 'PDF'],
      en: ['Technical reference', 'Formulas and examples', 'PDF'],
    },
    tags: {
      tr: ['Akışkanlar mekaniği', 'Termodinamik', 'Enerji', 'Pompa ve fan'],
      en: ['Fluid mechanics', 'Thermodynamics', 'Energy', 'Pump and fan'],
    },
  },
  {
    id: 'ht-jet-diyagram',
    category: {
      tr: 'Boyama ve proses teknolojisi',
      en: 'Dyeing and process technology',
    },
    details: {
      tr: ['Proses diyagramları', 'Zaman–sıcaklık akışları', 'PDF'],
      en: ['Process diagrams', 'Time–temperature profiles', 'PDF'],
    },
    tags: {
      tr: ['HT jet', 'Reaktif boyama', 'Dispers boyama', 'Naylon boyama'],
      en: ['HT jet', 'Reactive dyeing', 'Disperse dyeing', 'Nylon dyeing'],
    },
  },
  {
    id: 'norm-kadro-pdf',
    category: {
      tr: 'Üretim, organizasyon ve yönetim',
      en: 'Production, organization and management',
    },
    details: {
      tr: ['30 ton/gün', '19 HT jet', 'Üç vardiya'],
      en: ['30 tons/day', '19 HT jets', 'Three shifts'],
    },
    tags: {
      tr: ['Norm kadro', 'Vardiya', 'Organizasyon', 'Kapasite'],
      en: ['Staffing', 'Shift', 'Organization', 'Capacity'],
    },
  },
]

function requireResource(id: string): ResourceItem {
  const item = resources.find((resource) => resource.id === id)

  if (!item) {
    throw new Error(`Technical document resource not found: ${id}`)
  }

  return item
}

const featuredDocuments = featuredDocumentDefinitions.map((definition) => ({
  ...definition,
  resource: requireResource(definition.id),
}))

const collectionCounts = Object.fromEntries(
  collectionDefinitions.map((collection) => [
    collection.group,
    resources.filter((resource) => resource.group === collection.group).length,
  ]),
) as Record<ResourceGroup, number>

const pageCopy = {
  tr: {
    metaTitle: 'Tekstil Teknik Dokümanları',
    metaDescription:
      'Boyahane, laboratuvar, kalite, apre ve üretim yönetimi için doğrulanmış eğitim notları, proses formları, kontrol listeleri ve teknik başvuru dokümanları.',
    eyebrow: 'BB-DMS • TEKSTİL KAYNAK MERKEZİ',
    title: 'Tekstil Teknik Dokümanları',
    intro:
      'Boyahane, laboratuvar, kalite, apre ve üretim yönetiminde kullanılmak üzere hazırlanmış doğrulanmış eğitim notlarını, proses formlarını, kontrol listelerini ve teknik başvuru dosyalarını tek sistemde bir araya getirir.',
    stats: [
      {
        value: resources.length.toString().padStart(2, '0'),
        label: 'doğrulanmış kaynak',
      },
      {
        value: collectionDefinitions.length.toString().padStart(2, '0'),
        label: 'ana koleksiyon',
      },
      {
        value: new Set(resources.map((resource) => resource.format))
          .size.toString()
          .padStart(2, '0'),
        label: 'dosya biçimi',
      },
    ],
    structureLabel: 'KAYNAK YAPISI',
    structureTitle: 'Teknik bilgiyi uygulama, kayıt ve kontrol sistemine dönüştüren yayın yapısı',
    structureText:
      'Kaynak merkezi; saha bilgisini yalnızca anlatmakla kalmaz. Bilgiyi eğitim dosyasına, ölçülebilir kontrol listesine, izlenebilir proses formuna ve teknik başvuru dokümanına dönüştürür.',
    fileTypes: [
      {
        title: 'PDF teknik yayınlar',
        text: 'Proses mantığı, uygulama yöntemi, kritik kontrol noktaları ve teknik açıklamaları kapsayan yayın dosyaları.',
      },
      {
        title: 'XLSX kayıt sistemleri',
        text: 'Ölçüm, reçete, takip, analiz, uygunluk ve karar süreçlerini standartlaştıran çalışma dosyaları.',
      },
      {
        title: 'DOCX düzenlenebilir dosyalar',
        text: 'İşletme koşullarına göre uyarlanabilen teknik talimat, rapor ve uygulama dokümanları.',
      },
    ],
    usersLabel: 'KİMLER KULLANIR?',
    users: [
      'Boyahane ve işletme yönetimi',
      'Vardiya amiri ve vardiya mühendisi',
      'Laboratuvar ve reçete hazırlama ekibi',
      'Proses kontrol ve kalite ekipleri',
      'Apre, ramöz ve mekanik terbiye ekipleri',
      'Teknik eğitim ve dokümantasyon sorumluları',
    ],
    request: 'Teknik kaynak talebi oluştur',
    collectionsLabel: 'ANA DOKÜMAN KOLEKSİYONLARI',
    collectionsTitle: 'İhtiyacınız olan dosya grubuna doğrudan ulaşın',
    collectionsText:
      'Her koleksiyon kendi içinde aynı görsel sistem, sürüm mantığı ve ana kaynak kataloğuyla eş zamanlı veri yapısı kullanır.',
    collections: {
      training: {
        title: 'Eğitim Notları',
        text: 'Kasar, boyama, yıkama, HT jet, laboratuvar, kalite, ramöz, kompaktör ve mekanik apre konularında sistematik teknik eğitimler.',
      },
      checklist: {
        title: 'Kontrol Listeleri',
        text: 'Proses başlamadan önce, proses sırasında ve final kontrolde kritik noktaları doğrulayan karar ve kayıt araçları.',
      },
      form: {
        title: 'Proses Formları',
        text: 'Parti, reçete, makine, proses parametreleri, sapmalar, kalite ve düzeltici faaliyet kayıt sistemleri.',
      },
    },
    openCollection: 'Koleksiyonu aç',
    featuredLabel: 'SEÇİLMİŞ TEKNİK DOKÜMANLAR',
    featuredTitle: 'Sahada doğrudan başvuru kaynağı olarak kullanılabilecek dosyalar',
    featuredText:
      'Sürüm, dosya boyutu ve indirme bağlantıları ana kaynak kataloğuyla eş zamanlı tutulur.',
    status: 'İNDİRİLEBİLİR',
    contentTags: 'İÇERİK ETİKETLERİ',
    version: 'Sürüm',
    size: 'Dosya boyutu',
    language: 'Dosya dili',
    download: 'Dosyayı indir',
    modulesLabel: 'TEKNİK İÇERİK MODÜLLERİ',
    modulesTitle: 'İşletme ihtiyacına göre ayrı yayın, form veya kontrol sistemi olarak yapılandırılabilecek alanlar',
    modulesText:
      'Aşağıdaki modüller bağımsız doküman, eğitim paketi, kontrol tablosu veya işletmeye özel teknik yayın olarak geliştirilebilir.',
    moduleTag: 'Teknik modül',
    purpose: 'Amaç',
    usage: 'Kullanım alanı',
    examples: 'İçerik örnekleri',
    output: 'Çıktı formatı',
    modules: [
      {
        no: '01',
        title: 'Laboratuvar ve kalite kontrol',
        summary:
          'Analiz, ölçüm, cihaz doğrulama, numune yönetimi ve üretim-laboratuvar uyumunu tek teknik standartta toplar.',
        purpose:
          'Çözelti hazırlama, titrasyon, pH, su sertliği, iletkenlik, hidrofilite, renk ve haslık kontrollerini kayıt altına alan sistematik doküman yapısı oluşturmak.',
        usage:
          'Laboratuvar sorumluları, kalite kontrol ekipleri, proses sorumluları ve vardiya mühendisleri.',
        examples: [
          'Çözelti hazırlama ve etiketleme sistemi',
          'Su, tuz, alkalinite, peroksit ve kostik analiz kayıtları',
          'Hidrofilite, emicilik ve numune onay formları',
          'Cihaz doğrulama, kalibrasyon ve haftalık analiz çizelgeleri',
        ],
        output:
          'PDF eğitim notu, DOCX analiz talimatı, XLSX analiz kayıt formu ve proses-laboratuvar karşılaştırma tablosu.',
      },
      {
        no: '02',
        title: 'Boyama prosesleri ve kimya',
        summary:
          'Reçete mantığı, kimyasal besleme, sıcaklık-zaman akışı, yıkama ve düzeltme süreçlerini ortak proses diline bağlar.',
        purpose:
          'Reaktif, dispers ve asit boyama süreçlerini; boya sınıfı, pH, sıcaklık, süre, dozaj ve yıkama adımlarıyla birlikte açıklamak.',
        usage:
          'Boyahane müdürü, proses sorumlusu, laboratuvar ekibi, reçete hazırlama ekibi ve vardiya amirleri.',
        examples: [
          'HT jet reçete ve proses akışları',
          'Tuz, alkali, asit ve yardımcı kimyasal besleme planları',
          'Renk gruplarına göre yıkama ve nötralizasyon sistemleri',
          'Renk düzeltme, ilave, söküm ve tekrar işlem değerlendirmeleri',
        ],
        output:
          'PDF proses eğitim notu, DOCX reçete açıklama dosyası, XLSX reçete kontrol tablosu ve proses sapma değerlendirme formu.',
      },
      {
        no: '03',
        title: 'Apre, ramöz ve mekanik terbiye',
        summary:
          'En, gramaj, çekmezlik, tutum, yüzey görünümü, nem, pick-up ve fikse kontrolünü ölçülebilir hale getirir.',
        purpose:
          'Ramöz, sanfor, kompaktör, şardon, tıraş ve fırça süreçlerinde kritik ayarları ve final kalite sonuçlarını standartlaştırmak.',
        usage:
          'Apre şefi, ramöz operatörü, mekanik terbiye ekipleri, kalite kontrol, proses ve üretim yönetimi.',
        examples: [
          'Ramöz sıcaklık, hız ve kalış süresi değerlendirmeleri',
          'Fular pick-up, en, gramaj ve nem kontrol formları',
          'Şardon, tıraş ve fırça proses kontrol sistemleri',
          'Elastanlı kumaşlarda fikse ve boyutsal stabilite kayıtları',
        ],
        output:
          'PDF apre eğitim notu, DOCX proses talimatı, XLSX ramöz/apre takip tablosu ve final kalite onay formu.',
      },
      {
        no: '04',
        title: 'Üretim, maliyet ve yönetim',
        summary:
          'Kapasite, kadro, KPI, RFT, tekrar işlem, enerji, kimyasal ve işçilik etkilerini yönetilebilir veri sistemine dönüştürür.',
        purpose:
          'Üretim performansını kapasite, süre, kalite, maliyet, tekrar işlem ve kaynak kullanımı üzerinden ölçülebilir hale getirmek.',
        usage:
          'İşletme müdürü, planlama, üretim, kalite, maliyet, bakım ve enerji ekipleri.',
        examples: [
          'Norm kadro ve vardiya organizasyonu',
          'RFT, tekrar işlem, verimlilik ve kapasite KPI sistemleri',
          'Enerji, kimyasal, işçilik ve proses maliyet hesapları',
          'Üretim sonrası gerçekleşen değerlerle plan karşılaştırmaları',
        ],
        output:
          'PDF yönetim raporu, DOCX teknik değerlendirme dosyası, XLSX KPI/maliyet tablosu ve yönetim takip panosu.',
      },
    ],
    usageLabel: 'KULLANIM VE TEKNİK ONAY NOTU',
    usageTitle: 'Teknik kaynaklar işletmenin gerçek şartlarına göre uyarlanmalıdır',
    usageText:
      'Reçete, doz, sıcaklık, süre, kabul limiti, makine ayarı ve kalite kriterleri; kumaş yapısı, elyaf karışımı, gerçek flotte, ürün konsantrasyonu, makine özellikleri ve müşteri şartnamesi dikkate alınarak yetkili teknik ekip tarafından doğrulanmalıdır.',
    back: 'Kaynak merkezine dön',
    contact: 'Talep oluştur',
    catalogDate: 'Katalog tarihi',
  },
  en: {
    metaTitle: 'Textile Technical Documents',
    metaDescription:
      'Verified training notes, process forms, checklists and technical reference documents for dyehouse, laboratory, quality, finishing and production management.',
    eyebrow: 'BB-DMS • TEXTILE RESOURCE CENTER',
    title: 'Textile Technical Documents',
    intro:
      'A structured technical resource system bringing together verified training notes, process forms, checklists and reference documents for dyehouse, laboratory, quality, finishing and production management.',
    stats: [
      {
        value: resources.length.toString().padStart(2, '0'),
        label: 'verified resources',
      },
      {
        value: collectionDefinitions.length.toString().padStart(2, '0'),
        label: 'main collections',
      },
      {
        value: new Set(resources.map((resource) => resource.format))
          .size.toString()
          .padStart(2, '0'),
        label: 'file formats',
      },
    ],
    structureLabel: 'RESOURCE STRUCTURE',
    structureTitle: 'A publication structure converting technical knowledge into application, records and control systems',
    structureText:
      'The resource center does more than explain field knowledge. It converts that knowledge into training files, measurable checklists, traceable process forms and technical reference documents.',
    fileTypes: [
      {
        title: 'PDF technical publications',
        text: 'Publication files covering process logic, application methods, critical control points and technical explanations.',
      },
      {
        title: 'XLSX record systems',
        text: 'Workbooks standardizing measurements, recipes, tracking, analysis, conformity and decision processes.',
      },
      {
        title: 'Editable DOCX files',
        text: 'Technical instructions, reports and application documents adaptable to operating conditions.',
      },
    ],
    usersLabel: 'WHO USES THEM?',
    users: [
      'Dyehouse and plant management',
      'Shift supervisors and shift engineers',
      'Laboratory and recipe-preparation teams',
      'Process-control and quality teams',
      'Finishing, stenter and mechanical-finishing teams',
      'Technical training and documentation staff',
    ],
    request: 'Request a technical resource',
    collectionsLabel: 'MAIN DOCUMENT COLLECTIONS',
    collectionsTitle: 'Go directly to the document group you need',
    collectionsText:
      'Each collection uses the same visual system, revision logic and synchronized data structure as the main resource catalog.',
    collections: {
      training: {
        title: 'Training Notes',
        text: 'Systematic technical training on pretreatment, dyeing, washing, HT jet, laboratory, quality, stenter, compaction and mechanical finishing.',
      },
      checklist: {
        title: 'Checklists',
        text: 'Decision and record tools verifying critical points before process start, during processing and at final inspection.',
      },
      form: {
        title: 'Process Forms',
        text: 'Record systems for batches, recipes, machinery, process parameters, deviations, quality and corrective actions.',
      },
    },
    openCollection: 'Open collection',
    featuredLabel: 'FEATURED TECHNICAL DOCUMENTS',
    featuredTitle: 'Files that can be used directly as field reference resources',
    featuredText:
      'Revision data, file sizes and download links are synchronized with the main resource catalog.',
    status: 'DOWNLOADABLE',
    contentTags: 'CONTENT TAGS',
    version: 'Version',
    size: 'File size',
    language: 'File language',
    download: 'Download file',
    modulesLabel: 'TECHNICAL CONTENT MODULES',
    modulesTitle: 'Areas that can be structured as separate publications, forms or control systems',
    modulesText:
      'The modules below can be developed as stand-alone documents, training packages, control tables or plant-specific technical publications.',
    moduleTag: 'Technical module',
    purpose: 'Purpose',
    usage: 'Use case',
    examples: 'Content examples',
    output: 'Output format',
    modules: [
      {
        no: '01',
        title: 'Laboratory and quality control',
        summary:
          'Combines analysis, measurement, instrument verification, sample management and production-laboratory alignment under one technical standard.',
        purpose:
          'Create a systematic documentation structure recording solution preparation, titration, pH, water hardness, conductivity, absorbency, color and fastness controls.',
        usage:
          'Laboratory managers, quality-control teams, process specialists and shift engineers.',
        examples: [
          'Solution preparation and labeling systems',
          'Water, salt, alkalinity, peroxide and caustic analysis records',
          'Absorbency, wetting and sample approval forms',
          'Instrument verification, calibration and weekly analysis schedules',
        ],
        output:
          'PDF training note, DOCX analysis instruction, XLSX analysis record form and process-laboratory comparison table.',
      },
      {
        no: '02',
        title: 'Dyeing processes and chemistry',
        summary:
          'Connects recipe logic, chemical dosing, time-temperature profiles, washing and correction processes through one process language.',
        purpose:
          'Explain reactive, disperse and acid dyeing together with dye class, pH, temperature, time, dosing and washing stages.',
        usage:
          'Dyehouse managers, process specialists, laboratory teams, recipe-preparation teams and shift supervisors.',
        examples: [
          'HT jet recipe and process flows',
          'Salt, alkali, acid and auxiliary-chemical dosing plans',
          'Washing and neutralization systems by shade group',
          'Shade correction, additions, stripping and reprocessing evaluations',
        ],
        output:
          'PDF process training note, DOCX recipe explanation file, XLSX recipe control table and process-deviation form.',
      },
      {
        no: '03',
        title: 'Finishing, stenter and mechanical finishing',
        summary:
          'Makes width, GSM, shrinkage, handle, appearance, moisture, pick-up and heat-setting control measurable.',
        purpose:
          'Standardize critical settings and final-quality results for stenter, sanfor, compactor, raising, shearing and brushing operations.',
        usage:
          'Finishing managers, stenter operators, mechanical-finishing teams, quality control, process and production management.',
        examples: [
          'Stenter temperature, speed and dwell-time evaluations',
          'Pad pick-up, width, GSM and moisture-control forms',
          'Raising, shearing and brushing process-control systems',
          'Heat-setting and dimensional-stability records for elastane fabrics',
        ],
        output:
          'PDF finishing training note, DOCX process instruction, XLSX stenter/finishing tracking table and final-quality approval form.',
      },
      {
        no: '04',
        title: 'Production, cost and management',
        summary:
          'Converts capacity, staffing, KPI, RFT, reprocessing, energy, chemical and labor effects into manageable data systems.',
        purpose:
          'Make production performance measurable through capacity, time, quality, cost, reprocessing and resource utilization.',
        usage:
          'Plant managers, planning, production, quality, cost, maintenance and energy teams.',
        examples: [
          'Staffing and shift organization',
          'RFT, reprocessing, efficiency and capacity KPI systems',
          'Energy, chemical, labor and process-cost calculations',
          'Plan-versus-actual production comparisons',
        ],
        output:
          'PDF management report, DOCX technical evaluation file, XLSX KPI/cost table and management dashboard.',
      },
    ],
    usageLabel: 'USE AND TECHNICAL APPROVAL NOTE',
    usageTitle: 'Technical resources must be adapted to actual operating conditions',
    usageText:
      'Recipes, dosage, temperature, time, acceptance limits, machine settings and quality criteria must be verified by authorized technical staff against fabric construction, fiber blend, actual liquor ratio, product concentration, machine characteristics and customer specifications.',
    back: 'Back to resource center',
    contact: 'Submit a request',
    catalogDate: 'Catalog date',
  },
} as const

function getFileLanguageLabel(
  fileLanguage: ResourceItem['fileLanguage'],
  lang: Lang,
): string {
  if (fileLanguage === 'tr-en') {
    return lang === 'tr' ? 'Türkçe / İngilizce' : 'Turkish / English'
  }

  if (fileLanguage === 'en') {
    return lang === 'tr' ? 'İngilizce' : 'English'
  }

  return lang === 'tr' ? 'Türkçe' : 'Turkish'
}

export async function generateMetadata({
  params,
}: TechnicalDocumentsPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = pageCopy[lang]
  const canonical = `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari`

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords:
      lang === 'tr'
        ? [
            'tekstil teknik dokümanları',
            'tekstil eğitim notları',
            'boyahane proses formları',
            'tekstil kontrol listeleri',
            'tekstil PDF',
            'tekstil XLSX',
          ]
        : [
            'textile technical documents',
            'textile training notes',
            'dyehouse process forms',
            'textile checklists',
            'textile PDF',
            'textile XLSX',
          ],
    alternates: {
      canonical,
      languages: {
        tr: 'https://bahribudak.com/tr/sablonlar/tekstil-teknik-dokumanlari',
        en: 'https://bahribudak.com/en/sablonlar/tekstil-teknik-dokumanlari',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: t.metaTitle,
      description: t.metaDescription,
      siteName: 'Bahri Budak',
    },
  }
}

export default async function TechnicalDocumentsPage({
  params,
}: TechnicalDocumentsPageProps) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = pageCopy[lang]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.metaTitle,
    description: t.metaDescription,
    url: `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari`,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    dateModified: resourceCatalogDate,
    hasPart: collectionDefinitions.map((collection) => ({
      '@type': 'CollectionPage',
      name: t.collections[collection.group as 'training' | 'checklist' | 'form'].title,
      url: `https://bahribudak.com/${lang}${collection.href}`,
    })),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: featuredDocuments.length,
      itemListElement: featuredDocuments.map((document, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: document.resource.title[lang],
          description: document.resource.description[lang],
          encodingFormat:
            document.resource.format === 'PDF'
              ? 'application/pdf'
              : document.resource.format === 'DOCX'
                ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          contentUrl: `https://bahribudak.com${document.resource.href}`,
          inLanguage:
            document.resource.fileLanguage === 'en'
              ? 'en'
              : document.resource.fileLanguage === 'tr-en'
                ? ['tr', 'en']
                : 'tr',
          version: document.resource.version,
          dateModified: document.resource.catalogDate,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#F3F6FA] text-[#0B2343]">
        <section className="relative overflow-hidden bg-[#061A33] text-white">
          <div className="absolute inset-0 bb-pattern opacity-35" />
          <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#2EA6D9]/15 blur-3xl" />
          <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#5BBBE6]">
                {t.eyebrow}
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-white md:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
                {t.intro}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-5 text-center backdrop-blur"
                >
                  <p className="text-2xl font-black text-[#5BBBE6] md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase leading-4 tracking-[0.1em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                {t.structureLabel}
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {t.structureTitle}
              </h2>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-[#0B2343]/75 md:text-base">
                {t.structureText}
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {t.fileTypes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#2EA6D9]/20 bg-[#F3F6FA] p-4"
                  >
                    <h3 className="text-sm font-bold text-[#0B2343]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-[#0B2343]/65">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                {t.usersLabel}
              </p>

              <div className="mt-5 grid gap-3">
                {t.users.map((user) => (
                  <div
                    key={user}
                    className="flex items-center gap-3 rounded-2xl bg-[#F3F6FA] px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-[#2EA6D9]"
                    />
                    <span className="text-sm font-semibold text-[#0B2343]/80">
                      {user}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/${lang}/contact`}
                className="mt-7 inline-flex rounded-full bg-[#0B2343] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2EA6D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EA6D9]"
              >
                {t.request}
              </Link>
            </aside>
          </div>

          <div className="mt-14">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                {t.collectionsLabel}
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {t.collectionsTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#0B2343]/60">
                {t.collectionsText}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {collectionDefinitions.map((collection) => {
                const collectionCopy =
                  t.collections[
                    collection.group as 'training' | 'checklist' | 'form'
                  ]

                return (
                  <Link
                    key={collection.href}
                    href={`/${lang}${collection.href}`}
                    className="group flex min-h-[270px] flex-col justify-between rounded-[2rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2EA6D9]/60 hover:shadow-[0_16px_45px_rgba(11,35,67,0.10)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#061A33] text-base font-black text-white">
                          {collection.code}
                        </span>
                        <span className="rounded-full bg-[#EAF6FC] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0B2343]">
                          {collectionCounts[collection.group]
                            .toString()
                            .padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-bold tracking-[-0.025em] text-[#0B2343]">
                        {collectionCopy.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-[#0B2343]/68">
                        {collectionCopy.text}
                      </p>
                    </div>

                    <span className="mt-7 text-sm font-bold text-[#2EA6D9]">
                      {t.openCollection} →
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-14 border-b border-[#D8DDE5] pb-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                  {t.featuredLabel}
                </p>
                <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                  {t.featuredTitle}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#0B2343]/60">
                  {t.featuredText}
                </p>
              </div>

              <p className="shrink-0 text-xs font-semibold text-[#0B2343]/50">
                {t.catalogDate}: {resourceCatalogDate}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredDocuments.map((document, index) => {
              const item = document.resource
              const details = document.details[lang]
              const tags = document.tags[lang]

              return (
                <article
                  key={item.id}
                  className="group flex h-full flex-col rounded-[2rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2EA6D9]/60 hover:shadow-[0_16px_45px_rgba(11,35,67,0.10)] md:p-7"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#061A33] text-base font-black text-white">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>

                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-full bg-[#EAF6FC] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0B2343]">
                        {t.status}
                      </span>
                      <span className="rounded-full border border-[#2EA6D9]/35 px-3 py-2 text-[10px] font-black tracking-[0.12em] text-[#2EA6D9]">
                        {item.version}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#2EA6D9]">
                    {document.category[lang]}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em] text-[#0B2343]">
                    {item.title[lang]}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#0B2343]/70">
                    {item.description[lang]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full border border-[#D8DDE5] bg-[#F3F6FA] px-3 py-1.5 text-xs font-semibold text-[#0B2343]/75"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#D8DDE5] pt-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/45">
                      {t.contentTags}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-[#0B2343]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-[#F3F6FA] px-4 py-4 text-xs">
                    <div>
                      <dt className="font-semibold text-[#0B2343]/45">
                        {t.version}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {item.version}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0B2343]/45">
                        {t.size}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {item.size}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0B2343]/45">
                        {t.language}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {getFileLanguageLabel(item.fileLanguage, lang)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-7">
                    <a
                      href={item.href}
                      download
                      aria-label={`${t.download}: ${item.title[lang]}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2EA6D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EA6D9]"
                    >
                      {t.download} · {item.format}
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-16">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                {t.modulesLabel}
              </p>
              <h2 className="mt-3 max-w-5xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {t.modulesTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#0B2343]/60">
                {t.modulesText}
              </p>
            </div>

            <div className="grid gap-6">
              {t.modules.map((module) => (
                <article
                  key={module.no}
                  className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9"
                >
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-black tracking-[0.18em] text-[#2EA6D9]">
                        {module.no}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#0B2343] md:text-3xl">
                        {module.title}
                      </h3>
                      <p className="mt-3 max-w-4xl text-sm leading-7 text-[#0B2343]/65">
                        {module.summary}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-[#2EA6D9]/25 bg-[#F3F6FA] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/70">
                      {t.moduleTag}
                    </span>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-2xl border border-[#D8DDE5] bg-white p-5">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/50">
                        {t.purpose}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#0B2343]/75">
                        {module.purpose}
                      </p>

                      <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/50">
                        {t.usage}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#0B2343]/75">
                        {module.usage}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F3F6FA] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/50">
                        {t.examples}
                      </p>
                      <ul className="mt-4 grid gap-3">
                        {module.examples.map((example) => (
                          <li
                            key={example}
                            className="flex gap-3 text-sm leading-7 text-[#0B2343]/75"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2EA6D9]"
                            />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#2EA6D9]/20 bg-[#F3F6FA] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/50">
                      {t.output}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#0B2343]/75">
                      {module.output}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <section className="mt-10 rounded-[2rem] border border-[#2EA6D9]/20 bg-[#061A33] px-7 py-9 text-white shadow-sm md:px-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5BBBE6]">
              {t.usageLabel}
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-bold text-white md:text-3xl">
              {t.usageTitle}
            </h2>

            <p className="mt-4 max-w-5xl text-sm leading-7 text-white/75">
              {t.usageText}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/magazam`}
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B2343] transition hover:bg-[#2EA6D9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.back}
              </Link>

              <Link
                href={`/${lang}/contact`}
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0B2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.contact}
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
