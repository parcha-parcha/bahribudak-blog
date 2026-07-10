import type { Metadata } from 'next'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import type { ResourceItem } from '@/lib/resources'
import { resources } from '@/lib/resources'

interface TrainingNotesPageProps {
  params: Promise<{ lang: string }>
}

type LocalizedText = Record<Lang, string>

type TrainingNoteMeta = {
  id: string
  no: string
  pages: number
  sections: number
  category: LocalizedText
  extra: LocalizedText
  tags: Record<Lang, string[]>
}

const noteMeta: TrainingNoteMeta[] = [
  {
    id: 'kasar-egitim',
    no: '01',
    pages: 8,
    sections: 13,
    category: {
      tr: 'Ön terbiye ve boyamaya hazırlık',
      en: 'Pretreatment and preparation for dyeing',
    },
    extra: {
      tr: 'Örnek proses şablonu',
      en: 'Sample process template',
    },
    tags: {
      tr: ['Kasar', 'Pamuk', 'Elastan', 'Hidrofilite', 'Peroksit', 'HT jet'],
      en: ['Pretreatment', 'Cotton', 'Elastane', 'Absorbency', 'Peroxide', 'HT jet'],
    },
  },
  {
    id: 'reaktif-egitim',
    no: '02',
    pages: 9,
    sections: 14,
    category: {
      tr: 'Pamuk boyama ve proses yönetimi',
      en: 'Cotton dyeing and process management',
    },
    extra: {
      tr: 'Proses ve hesaplama tabloları',
      en: 'Process and calculation tables',
    },
    tags: {
      tr: ['Reaktif boyama', 'Pamuk', 'HT jet', 'Fiksaj', 'Hidroliz', 'Art yıkama'],
      en: ['Reactive dyeing', 'Cotton', 'HT jet', 'Fixation', 'Hydrolysis', 'After-washing'],
    },
  },
  {
    id: 'dispers',
    no: '03',
    pages: 11,
    sections: 16,
    category: {
      tr: 'Polyester ve polyester-elastan boyama',
      en: 'Polyester and polyester-elastane dyeing',
    },
    extra: {
      tr: 'Proses ve hata analiz tabloları',
      en: 'Process and defect-analysis tables',
    },
    tags: {
      tr: ['Dispers boyama', 'Polyester', 'Elastan', 'İndirgen temizleme', 'Oligomer', 'Isıl boya göçü'],
      en: ['Disperse dyeing', 'Polyester', 'Elastane', 'Reduction clearing', 'Oligomer', 'Thermomigration'],
    },
  },
  {
    id: 'poliamid-asit',
    no: '04',
    pages: 9,
    sections: 16,
    category: {
      tr: 'Poliamid ve poliamid-elastan boyama',
      en: 'Polyamide and polyamide-elastane dyeing',
    },
    extra: {
      tr: 'Proses ve hata analiz tabloları',
      en: 'Process and defect-analysis tables',
    },
    tags: {
      tr: ['Naylon', 'Poliamid', 'Asit boyama', 'pH', 'Düzgünlük', 'Haslık'],
      en: ['Nylon', 'Polyamide', 'Acid dyeing', 'pH', 'Levelness', 'Fastness'],
    },
  },
  {
    id: 'pes-co',
    no: '05',
    pages: 10,
    sections: 18,
    category: {
      tr: 'Karışım kumaşlarda dispers ve reaktif proses yönetimi',
      en: 'Disperse and reactive process management for blends',
    },
    extra: {
      tr: 'Tek ve çift banyo karşılaştırması',
      en: 'One-bath and two-bath comparison',
    },
    tags: {
      tr: ['PES/CO', 'Karışım kumaş', 'Dispers boyama', 'Reaktif boyama', 'İndirgen temizleme', 'Ton eşleştirme'],
      en: ['PES/CO', 'Blended fabric', 'Disperse dyeing', 'Reactive dyeing', 'Reduction clearing', 'Shade matching'],
    },
  },
  {
    id: 'yikama-indirgen',
    no: '06',
    pages: 10,
    sections: 19,
    category: {
      tr: 'Yaş haslık, yüzey boyası ve final kalite yönetimi',
      en: 'Wet fastness, surface dye and final-quality management',
    },
    extra: {
      tr: 'Örnek proses ve hata tabloları',
      en: 'Sample process and defect tables',
    },
    tags: {
      tr: ['Art yıkama', 'Sıcak yıkama', 'İndirgen temizleme', 'Final pH', 'Yaş haslık', 'Makine temizliği'],
      en: ['After-washing', 'Hot washing', 'Reduction clearing', 'Final pH', 'Wet fastness', 'Machine cleaning'],
    },
  },
  {
    id: 'ht-jet-yonetim',
    no: '07',
    pages: 8,
    sections: 20,
    category: {
      tr: 'Boyahane proses yönetimi ve tekrar üretilebilirlik',
      en: 'Dyehouse process management and repeatability',
    },
    extra: {
      tr: 'Kontrol planı ve KPI tabloları',
      en: 'Control-plan and KPI tables',
    },
    tags: {
      tr: ['Proses yönetimi', 'Kritik kontrol', 'İlk seferde doğru üretim', 'Sapma yönetimi', 'KPI', 'İzlenebilirlik'],
      en: ['Process management', 'Critical control', 'Right first time', 'Deviation management', 'KPI', 'Traceability'],
    },
  },
  {
    id: 'renk-duzeltme',
    no: '08',
    pages: 13,
    sections: 18,
    category: {
      tr: 'Renk düzeltme, yeniden işlem ve maliyet yönetimi',
      en: 'Shade correction, reprocessing and cost management',
    },
    extra: {
      tr: 'Maliyet ve KPI tabloları',
      en: 'Cost and KPI tables',
    },
    tags: {
      tr: ['Renk ilavesi', 'Renk düzeltme', 'Yarım banyo', 'Kök neden', 'İlk seferde doğru üretim', 'Maliyet'],
      en: ['Shade addition', 'Color correction', 'Half bath', 'Root cause', 'Right first time', 'Cost'],
    },
  },
  {
    id: 'lab-isletme',
    no: '09',
    pages: 12,
    sections: 18,
    category: {
      tr: 'Ölçek büyütme, reçete aktarımı ve ilk parti yönetimi',
      en: 'Scale-up, recipe transfer and first-batch management',
    },
    extra: {
      tr: 'Hesap, aktarım ve KPI tabloları',
      en: 'Calculation, transfer and KPI tables',
    },
    tags: {
      tr: ['Laboratuvar reçetesi', 'İşletme reçetesi', 'Ölçek büyütme', 'Gerçek flotte', 'İlk parti', 'RFT'],
      en: ['Laboratory recipe', 'Bulk recipe', 'Scale-up', 'Actual liquor ratio', 'First batch', 'RFT'],
    },
  },
  {
    id: 'ht-jet-kontrol',
    no: '10',
    pages: 14,
    sections: 18,
    category: {
      tr: 'Makine ayarları, çevrim kontrolü ve proses güvenliği',
      en: 'Machine settings, circulation control and process safety',
    },
    extra: {
      tr: 'Hesap, kontrol ve KPI tabloları',
      en: 'Calculation, control and KPI tables',
    },
    tags: {
      tr: ['HT jet', 'Kumaş tur süresi', 'Gerçek flotte', 'Nozul ve pompa', 'Dozaj kontrolü', 'Proses güvenliği'],
      en: ['HT jet', 'Fabric cycle time', 'Actual liquor ratio', 'Nozzle and pump', 'Dosing control', 'Process safety'],
    },
  },
  {
    id: 'haslik-final',
    no: '11',
    pages: 13,
    sections: 18,
    category: {
      tr: 'Renk ölçümü, haslık ve sevk onay yönetimi',
      en: 'Color measurement, fastness and release management',
    },
    extra: {
      tr: 'Test, karar ve KPI tabloları',
      en: 'Test, decision and KPI tables',
    },
    tags: {
      tr: ['Renk kontrolü', 'Spektrofotometre', 'Haslık', 'Çekmezlik', 'Final kalite', 'Serbest bırakma'],
      en: ['Color control', 'Spectrophotometer', 'Fastness', 'Shrinkage', 'Final quality', 'Release'],
    },
  },
  {
    id: 'ramoz-egitim',
    no: '12',
    pages: 14,
    sections: 18,
    category: {
      tr: 'Kurutma, fikse, boyut ve apre yönetimi',
      en: 'Drying, heat-setting, dimensional and finishing management',
    },
    extra: {
      tr: 'Formül, kontrol ve KPI tabloları',
      en: 'Formula, control and KPI tables',
    },
    tags: {
      tr: ['Ramöz', 'Apre', 'Flotte alımı', 'Pozitif besleme', 'Fikse', 'Enerji yönetimi'],
      en: ['Stenter', 'Finishing', 'Pick-up', 'Overfeed', 'Heat-setting', 'Energy management'],
    },
  },
  {
    id: 'sanfor-kompaktor',
    no: '13',
    pages: 14,
    sections: 18,
    category: {
      tr: 'Kompaktlama, çekmezlik ve boyutsal stabilite yönetimi',
      en: 'Compaction, shrinkage and dimensional-stability management',
    },
    extra: {
      tr: 'Hesap, kontrol ve KPI tabloları',
      en: 'Calculation, control and KPI tables',
    },
    tags: {
      tr: ['Sanfor', 'Kompaktör', 'Boyutsal stabilite', 'Çekmezlik', 'Spiralite', 'En-gramaj dengesi'],
      en: ['Sanforizing', 'Compactor', 'Dimensional stability', 'Shrinkage', 'Spirality', 'Width-GSM balance'],
    },
  },
  {
    id: 'sardon-tras',
    no: '14',
    pages: 14,
    sections: 18,
    category: {
      tr: 'Şardon, tıraş ve fırça yüzey işlemleri',
      en: 'Raising, shearing and brushing surface processes',
    },
    extra: {
      tr: 'Makine seçimi ve karar tabloları',
      en: 'Machine-selection and decision tables',
    },
    tags: {
      tr: ['Şardon', 'Tıraş', 'Kadife tıraşı', 'Fırça', 'Pasaj yönetimi', 'Yüzey kalitesi'],
      en: ['Raising', 'Shearing', 'Velvet shearing', 'Brushing', 'Pass management', 'Surface quality'],
    },
  },
  {
    id: 'kimyasal-mutfak',
    no: '15',
    pages: 14,
    sections: 18,
    category: {
      tr: 'Su kalitesi, hazırlama, dozaj ve izlenebilirlik',
      en: 'Water quality, preparation, dosing and traceability',
    },
    extra: {
      tr: 'Su kabul, hesap ve KPI tabloları',
      en: 'Water-acceptance, calculation and KPI tables',
    },
    tags: {
      tr: ['Boyahane suyu', 'Su sertliği', 'Boya mutfağı', 'Kimyasal mutfak', 'Otomatik dozaj', 'Kalibrasyon'],
      en: ['Dyehouse water', 'Water hardness', 'Color kitchen', 'Chemical kitchen', 'Automatic dosing', 'Calibration'],
    },
  },
]

const copy = {
  tr: {
    metadataTitle: 'Tekstil Eğitim Notları',
    metadataDescription:
      'Kasar, reaktif, dispers ve asit boyama, HT jet, laboratuvar, kalite, ramöz, kompaktör ve mekanik apre prosesleri için doğrulanmış teknik eğitim notları.',
    eyebrow: 'BB-DMS • TEKSTİL KAYNAK MERKEZİ',
    title: 'Tekstil Eğitim Notları',
    intro:
      'Saha bilgisini; operatör, vardiya mühendisi, laboratuvar, proses ve kalite ekiplerinin aynı teknik dilde kullanabileceği sistematik eğitim dosyalarına dönüştüren profesyonel kaynak koleksiyonu.',
    notes: 'eğitim notu',
    pages: 'toplam sayfa',
    sections: 'teknik bölüm',
    approachLabel: 'EĞİTİM YAKLAŞIMI',
    approachTitle: 'Bilgiyi anlatmanın ötesinde, sahada uygulanabilir hale getirmek',
    approachText:
      'Her eğitim notu; proses mantığını, kritik kontrol noktalarını, ölçüm yöntemlerini, hesaplamaları, örnek uygulamaları ve sık görülen hata risklerini aynı yapı içinde toplar. Reçete ve proses değerleri sabit kural olarak değil, işletme şartlarına göre doğrulanması gereken teknik başlangıç noktaları olarak sunulur.',
    audienceLabel: 'KİM KULLANIR?',
    audience: [
      'Operatör ve yardımcı personel',
      'Vardiya amiri ve vardiya mühendisi',
      'Laboratuvar ve reçete hazırlama ekibi',
      'Proses kontrol ve kalite ekipleri',
      'Boyahane ve işletme yönetimi',
      'Teknik eğitim ve danışmanlık çalışmaları',
    ],
    catalogLabel: 'DOĞRULANMIŞ EĞİTİM KATALOĞU',
    catalogTitle: 'Proses zincirini adım adım açıklayan teknik eğitim dosyaları',
    catalogText:
      'Dosya başlıkları, sürüm bilgileri, boyutlar ve indirme bağlantıları ana kaynak kataloğuyla eş zamanlı tutulur.',
    downloadable: 'İndirilebilir',
    pageWord: 'sayfa',
    sectionWord: 'bölüm',
    contentTags: 'İçerik etiketleri',
    version: 'Sürüm',
    fileSize: 'Dosya boyutu',
    fileLanguage: 'Dosya dili',
    turkish: 'Türkçe',
    english: 'İngilizce',
    bilingual: 'Türkçe / İngilizce',
    download: 'PDF dosyasını indir',
    usageLabel: 'KULLANIM VE TEKNİK ONAY NOTU',
    usageTitle: 'Eğitim notları işletme şartlarıyla birlikte değerlendirilmelidir',
    usageText:
      'Örnek reçete, doz, sıcaklık, süre, makine ayarı ve kabul kriterleri; kumaş tipi, konstrüksiyon, makine, gerçek flotte, renk grubu, ürün konsantrasyonu, müşteri şartnamesi ve laboratuvar denemesi dikkate alınarak teknik onaydan geçirilmelidir.',
    back: 'Kaynak merkezine dön',
    contact: 'Teknik talep oluştur',
  },
  en: {
    metadataTitle: 'Textile Training Notes',
    metadataDescription:
      'Verified technical training notes for pretreatment, reactive, disperse and acid dyeing, HT jet, laboratory, quality, stenter, compactor and mechanical-finishing processes.',
    eyebrow: 'BB-DMS • TEXTILE RESOURCE CENTER',
    title: 'Textile Training Notes',
    intro:
      'A professional resource collection that converts field knowledge into structured training files used through a common technical language by operators, shift engineers, laboratory, process and quality teams.',
    notes: 'training notes',
    pages: 'total pages',
    sections: 'technical sections',
    approachLabel: 'TRAINING APPROACH',
    approachTitle: 'Moving beyond explanation to practical application on the production floor',
    approachText:
      'Each training note combines process logic, critical control points, measurement methods, calculations, sample applications and common defect risks in one structure. Recipe and process values are presented as technical starting points that must be verified against actual plant conditions, not as fixed rules.',
    audienceLabel: 'WHO USES THEM?',
    audience: [
      'Operators and production assistants',
      'Shift supervisors and shift engineers',
      'Laboratory and recipe-preparation teams',
      'Process-control and quality teams',
      'Dyehouse and plant management',
      'Technical training and consulting projects',
    ],
    catalogLabel: 'VERIFIED TRAINING CATALOG',
    catalogTitle: 'Technical training files explaining the process chain step by step',
    catalogText:
      'File titles, versions, sizes and download links are synchronized with the main resource catalog.',
    downloadable: 'Downloadable',
    pageWord: 'pages',
    sectionWord: 'sections',
    contentTags: 'Content tags',
    version: 'Version',
    fileSize: 'File size',
    fileLanguage: 'File language',
    turkish: 'Turkish',
    english: 'English',
    bilingual: 'Turkish / English',
    download: 'Download PDF',
    usageLabel: 'USE AND TECHNICAL-APPROVAL NOTE',
    usageTitle: 'Training notes must be evaluated against actual plant conditions',
    usageText:
      'Sample recipes, dosages, temperatures, times, machine settings and acceptance criteria must be technically approved with reference to fabric type, construction, machine, actual liquor ratio, shade group, product concentration, customer specification and laboratory trials.',
    back: 'Return to resource center',
    contact: 'Create a technical request',
  },
} as const

function resolveFileLanguage(item: ResourceItem, lang: Lang) {
  const t = copy[lang]

  if (item.fileLanguage === 'tr-en') return t.bilingual
  if (item.fileLanguage === 'en') return t.english
  return t.turkish
}

export async function generateMetadata({
  params,
}: TrainingNotesPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]
  const canonical = `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari`

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    keywords:
      lang === 'tr'
        ? [
            'tekstil eğitim notları',
            'boyahane eğitimi',
            'HT jet',
            'reaktif boyama',
            'dispers boyama',
            'ramöz',
            'apre',
          ]
        : [
            'textile training notes',
            'dyehouse training',
            'HT jet',
            'reactive dyeing',
            'disperse dyeing',
            'stenter',
            'finishing',
          ],
    alternates: {
      canonical,
      languages: {
        tr: 'https://bahribudak.com/tr/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
        en: 'https://bahribudak.com/en/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: t.metadataTitle,
      description: t.metadataDescription,
      siteName: 'Bahri Budak',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
    },
  }
}

export default async function TrainingNotesPage({
  params,
}: TrainingNotesPageProps) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]

  const trainingNotes = noteMeta.flatMap((meta) => {
    const resource = resources.find((item) => item.id === meta.id)
    return resource ? [{ meta, resource }] : []
  })

  const totalPages = noteMeta.reduce((sum, item) => sum + item.pages, 0)
  const totalSections = noteMeta.reduce((sum, item) => sum + item.sections, 0)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.metadataTitle,
    description: t.metadataDescription,
    url: `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari`,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: trainingNotes.length,
      itemListElement: trainingNotes.map(({ resource }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: resource.title[lang],
          description: resource.description[lang],
          encodingFormat: 'application/pdf',
          contentUrl: `https://bahribudak.com${resource.href}`,
        },
      })),
    },
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0B2343]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
            {[
              { value: trainingNotes.length.toString().padStart(2, '0'), label: t.notes },
              { value: totalPages.toString(), label: t.pages },
              { value: totalSections.toString(), label: t.sections },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-black text-[#5BBBE6] md:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-[0.10em] text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {t.approachLabel}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {t.approachTitle}
            </h2>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#0B2343]/72 md:text-base">
              {t.approachText}
            </p>
          </article>

          <aside className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {t.audienceLabel}
            </p>
            <div className="mt-5 grid gap-3">
              {t.audience.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-[#F5F7FA] px-4 py-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#2EA6D9]" />
                  <span className="text-sm font-semibold text-[#0B2343]/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 border-b border-[#D8DDE5] pb-7">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
            {t.catalogLabel}
          </p>
          <h2 className="mt-2 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
            {t.catalogTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#0B2343]/65">
            {t.catalogText}
          </p>
        </div>

        <section className="mt-7 grid gap-6 md:grid-cols-2">
          {trainingNotes.map(({ meta, resource }) => {
            const detailItems = [
              `${meta.pages} ${t.pageWord}`,
              'PDF',
              `${meta.sections} ${t.sectionWord}`,
              meta.extra[lang],
            ]

            return (
              <article
                key={resource.id}
                className="group flex h-full flex-col rounded-[2rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2EA6D9]/50 hover:shadow-[0_16px_45px_rgba(11,35,67,0.10)] md:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="flex h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl bg-[#061A33] px-3 text-base font-black text-white">
                    {meta.no}
                  </span>

                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full bg-[#EAF6FC] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.11em] text-[#0B2343]">
                      {t.downloadable}
                    </span>
                    <span className="rounded-full border border-[#2EA6D9]/30 px-3 py-1.5 text-[10px] font-black tracking-[0.12em] text-[#2EA6D9]">
                      {resource.version}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#2EA6D9]">
                  {meta.category[lang]}
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight text-[#0B2343]">
                  {resource.title[lang]}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#0B2343]/70">
                  {resource.description[lang]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {detailItems.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-[#D8DDE5] bg-[#F5F7FA] px-3 py-1.5 text-xs font-semibold text-[#0B2343]/68"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-[#D8DDE5] pt-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/45">
                    {t.contentTags}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {meta.tags[lang].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-[#0B2343]/62"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <dl className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-[#F5F7FA] p-4 text-xs">
                  <div>
                    <dt className="font-semibold text-[#0B2343]/45">{t.version}</dt>
                    <dd className="mt-1 font-bold text-[#0B2343]">{resource.version}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0B2343]/45">{t.fileSize}</dt>
                    <dd className="mt-1 font-bold text-[#0B2343]">{resource.size}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0B2343]/45">{t.fileLanguage}</dt>
                    <dd className="mt-1 font-bold text-[#0B2343]">
                      {resolveFileLanguage(resource, lang)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto pt-6">
                  <a
                    href={resource.href}
                    download
                    aria-label={`${t.download}: ${resource.title[lang]}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2EA6D9] focus:outline-none focus:ring-2 focus:ring-[#2EA6D9] focus:ring-offset-2"
                  >
                    {t.download} · PDF
                  </a>
                </div>
              </article>
            )
          })}
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#0B2343] px-6 py-8 text-white md:px-10 md:py-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5BBBE6]">
            {t.usageLabel}
          </p>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold md:text-3xl">
            {t.usageTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/75">
            {t.usageText}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/magazam`}
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B2343] transition hover:bg-[#5BBBE6] hover:text-white"
            >
              {t.back}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#0B2343]"
            >
              {t.contact}
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
