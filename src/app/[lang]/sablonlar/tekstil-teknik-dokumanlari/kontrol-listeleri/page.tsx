import type { Metadata } from 'next'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import type { ResourceItem } from '@/lib/resources'
import { resources } from '@/lib/resources'

interface ChecklistsPageProps {
  params: Promise<{ lang: string }>
}

type LocalizedText = Record<Lang, string>

type ChecklistMeta = {
  id: string
  no: string
  sheets: number
  category: LocalizedText
  fieldInfo: LocalizedText
  decision: LocalizedText
  tags: Record<Lang, string[]>
}

const checklistMeta: ChecklistMeta[] = [
  {
    id: 'kasar-kontrol',
    no: '01',
    sheets: 4,
    category: {
      tr: 'Pamuk ve pamuk-elastan kasar hazırlığı',
      en: 'Cotton and cotton-elastane pretreatment preparation',
    },
    fieldInfo: {
      tr: '200 kayıt kapasitesi',
      en: '200-record capacity',
    },
    decision: {
      tr: 'Otomatik başlatma kararı',
      en: 'Automatic start decision',
    },
    tags: {
      tr: ['Kasar', 'Su kalitesi', 'Makine kontrolü', 'Kimyasal hazırlık', 'Başlatma onayı'],
      en: ['Pretreatment', 'Water quality', 'Machine control', 'Chemical preparation', 'Start approval'],
    },
  },
  {
    id: 'boyama-baslangic',
    no: '02',
    sheets: 4,
    category: {
      tr: 'HT jet boyama hazırlığı',
      en: 'HT jet dyeing preparation',
    },
    fieldInfo: {
      tr: '40 kontrol maddesi',
      en: '40 control items',
    },
    decision: {
      tr: 'Otomatik başlatma kararı',
      en: 'Automatic start decision',
    },
    tags: {
      tr: ['HT jet', 'Boyama', 'Reçete', 'Dozaj', 'Makine', 'Su kalitesi'],
      en: ['HT jet', 'Dyeing', 'Recipe', 'Dosing', 'Machine', 'Water quality'],
    },
  },
  {
    id: 'final-kontrol',
    no: '03',
    sheets: 4,
    category: {
      tr: 'Boyama sonrası kalite doğrulaması',
      en: 'Post-dyeing quality verification',
    },
    fieldInfo: {
      tr: '34 kontrol alanı',
      en: '34 control fields',
    },
    decision: {
      tr: 'Otomatik final kararı',
      en: 'Automatic final decision',
    },
    tags: {
      tr: ['Yıkama', 'Final pH', 'Haslık', 'Numune onayı', 'Serbest bırakma'],
      en: ['Washing', 'Final pH', 'Fastness', 'Sample approval', 'Release'],
    },
  },
  {
    id: 'laboratuvar-haftalik',
    no: '04',
    sheets: 5,
    category: {
      tr: 'Laboratuvar, cihaz ve analiz yönetimi',
      en: 'Laboratory, instrument and analysis management',
    },
    fieldInfo: {
      tr: '200 analiz kaydı',
      en: '200 analysis records',
    },
    decision: {
      tr: 'Kalibrasyon uyarı sistemi',
      en: 'Calibration warning system',
    },
    tags: {
      tr: ['Laboratuvar', 'Kalibrasyon', 'Çözelti', 'Su analizi', 'Numune', 'Güvenlik'],
      en: ['Laboratory', 'Calibration', 'Solution', 'Water analysis', 'Sample', 'Safety'],
    },
  },
]

const copy = {
  tr: {
    metadataTitle: 'Tekstil Kontrol Listeleri',
    metadataDescription:
      'Boyahane, laboratuvar, kalite ve terbiye süreçlerinde başlangıç, proses ve final doğrulaması sağlayan profesyonel XLSX kontrol listeleri.',
    eyebrow: 'BB-DMS • TEKSTİL KAYNAK MERKEZİ',
    title: 'Tekstil Kontrol Listeleri',
    intro:
      'Kritik üretim adımlarını başlamadan önce, proses sırasında ve final kontrolde aynı teknik sistemle doğrulayan; kayıt, sorumluluk ve karar mekanizmasını standartlaştıran profesyonel Excel araçları.',
    checklists: 'kontrol listesi',
    worksheets: 'çalışma sayfası',
    decisionSystems: 'karar sistemi',
    systemLabel: 'KONTROL SİSTEMİ',
    systemTitle: 'Kontrol listesi yalnızca işaretleme formu değildir',
    systemText:
      'Her liste; proses başlamadan önce eksikleri görünür hale getirmek, kritik değerleri kayıt altına almak, sorumluluğu belirlemek ve başlatma ya da serbest bırakma kararını ölçülebilir kriterlere bağlamak için hazırlanır.',
    benefits: [
      {
        title: 'Başlamadan önce doğrulama',
        text: 'Makine, reçete, kumaş, su ve kimyasal hazırlığındaki eksikler proses başlamadan görülür.',
      },
      {
        title: 'Vardiyalar arası ortak dil',
        text: 'Kontrol maddeleri kişiye göre değişmez; aynı kriterler her vardiyada uygulanır.',
      },
      {
        title: 'Kayıt ve karşılaştırma',
        text: 'Uygunsuzluklar, eksikler, kararlar ve aksiyonlar daha sonra karşılaştırılabilir.',
      },
    ],
    usageAreasLabel: 'KULLANIM ALANLARI',
    usageAreas: [
      'Boyahane vardiya ve parti başlangıçları',
      'Laboratuvar ve reçete hazırlığı',
      'Makine, flotte ve su kalitesi kontrolleri',
      'Yıkama ve final kalite doğrulaması',
      'Serbest bırakma ve uygunsuzluk kararları',
      'Haftalık cihaz, kalibrasyon ve analiz kontrolleri',
    ],
    catalogLabel: 'DOĞRULANMIŞ KONTROL KATALOĞU',
    catalogTitle: 'Üretimde doğrudan kullanılabilecek kontrol ve karar sistemleri',
    catalogText:
      'Dosya başlıkları, sürüm bilgileri, boyutlar ve indirme bağlantıları ana kaynak kataloğuyla eş zamanlı tutulur.',
    downloadable: 'İndirilebilir',
    sheetWord: 'çalışma sayfası',
    contentTags: 'İçerik etiketleri',
    version: 'Sürüm',
    fileSize: 'Dosya boyutu',
    fileLanguage: 'Dosya dili',
    turkish: 'Türkçe',
    english: 'İngilizce',
    bilingual: 'Türkçe / İngilizce',
    download: 'XLSX dosyasını indir',
    usageLabel: 'KULLANIM VE TEKNİK ONAY NOTU',
    usageTitle: 'Kontrol limitleri işletmenin gerçek şartlarına göre tanımlanmalıdır',
    usageText:
      'Su sertliği, pH, iletkenlik, sıcaklık, süre, hidrofilite, beyazlık, haslık ve diğer kabul kriterleri; makine, kumaş tipi, reçete, müşteri şartnamesi, kalite planı ve işletme hedefleri dikkate alınarak yetkili teknik ekip tarafından tanımlanmalı ve revizyon altında tutulmalıdır.',
    back: 'Kaynak merkezine dön',
    contact: 'Teknik talep oluştur',
  },
  en: {
    metadataTitle: 'Textile Checklists',
    metadataDescription:
      'Professional XLSX checklists for start-up, process and final verification across dyehouse, laboratory, quality and finishing operations.',
    eyebrow: 'BB-DMS • TEXTILE RESOURCE CENTER',
    title: 'Textile Checklists',
    intro:
      'Professional Excel tools that verify critical production steps before start-up, during processing and at final inspection while standardizing records, responsibilities and decision mechanisms.',
    checklists: 'checklists',
    worksheets: 'worksheets',
    decisionSystems: 'decision systems',
    systemLabel: 'CONTROL SYSTEM',
    systemTitle: 'A checklist is more than a tick-box form',
    systemText:
      'Each checklist is designed to reveal missing conditions before processing, record critical values, assign responsibility and link start-up or release decisions to measurable criteria.',
    benefits: [
      {
        title: 'Verification before start-up',
        text: 'Missing machine, recipe, fabric, water and chemical preparations are identified before processing.',
      },
      {
        title: 'Common language across shifts',
        text: 'Control criteria do not change by person; the same requirements are applied on every shift.',
      },
      {
        title: 'Records and comparison',
        text: 'Nonconformities, missing items, decisions and actions can be compared later.',
      },
    ],
    usageAreasLabel: 'APPLICATION AREAS',
    usageAreas: [
      'Dyehouse shift and batch start-ups',
      'Laboratory and recipe preparation',
      'Machine, liquor-ratio and water-quality controls',
      'Washing and final-quality verification',
      'Release and nonconformity decisions',
      'Weekly instrument, calibration and analysis controls',
    ],
    catalogLabel: 'VERIFIED CHECKLIST CATALOG',
    catalogTitle: 'Control and decision systems ready for direct production use',
    catalogText:
      'File titles, versions, sizes and download links are synchronized with the main resource catalog.',
    downloadable: 'Downloadable',
    sheetWord: 'worksheets',
    contentTags: 'Content tags',
    version: 'Version',
    fileSize: 'File size',
    fileLanguage: 'File language',
    turkish: 'Turkish',
    english: 'English',
    bilingual: 'Turkish / English',
    download: 'Download XLSX',
    usageLabel: 'USE AND TECHNICAL-APPROVAL NOTE',
    usageTitle: 'Control limits must be defined for actual plant conditions',
    usageText:
      'Water hardness, pH, conductivity, temperature, time, absorbency, whiteness, fastness and other acceptance criteria must be defined and revision-controlled by the authorized technical team with reference to machine, fabric type, recipe, customer specification, quality plan and plant targets.',
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
}: ChecklistsPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]
  const canonical = `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri`

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    keywords:
      lang === 'tr'
        ? [
            'tekstil kontrol listeleri',
            'boyahane kontrol listesi',
            'HT jet kontrol',
            'laboratuvar kontrol listesi',
            'final kalite kontrol',
            'XLSX proses formu',
          ]
        : [
            'textile checklists',
            'dyehouse checklist',
            'HT jet control',
            'laboratory checklist',
            'final quality control',
            'XLSX process form',
          ],
    alternates: {
      canonical,
      languages: {
        tr: 'https://bahribudak.com/tr/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
        en: 'https://bahribudak.com/en/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
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

export default async function ChecklistsPage({
  params,
}: ChecklistsPageProps) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]

  const checklists = checklistMeta.flatMap((meta) => {
    const resource = resources.find((item) => item.id === meta.id)
    return resource ? [{ meta, resource }] : []
  })

  const totalSheets = checklistMeta.reduce((sum, item) => sum + item.sheets, 0)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.metadataTitle,
    description: t.metadataDescription,
    url: `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri`,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: checklists.length,
      itemListElement: checklists.map(({ resource }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: resource.title[lang],
          description: resource.description[lang],
          encodingFormat:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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
              {
                value: checklists.length.toString().padStart(2, '0'),
                label: t.checklists,
              },
              { value: totalSheets.toString(), label: t.worksheets },
              {
                value: checklists.length.toString().padStart(2, '0'),
                label: t.decisionSystems,
              },
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
              {t.systemLabel}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {t.systemTitle}
            </h2>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#0B2343]/72 md:text-base">
              {t.systemText}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {t.benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#2EA6D9]/20 bg-[#F5F7FA] p-4"
                >
                  <h3 className="text-sm font-bold text-[#0B2343]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#0B2343]/65">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] border border-[#D8DDE5] bg-white p-7 shadow-sm md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {t.usageAreasLabel}
            </p>
            <div className="mt-5 grid gap-3">
              {t.usageAreas.map((item) => (
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
          {checklists.map(({ meta, resource }) => {
            const detailItems = [
              'XLSX',
              `${meta.sheets} ${t.sheetWord}`,
              meta.fieldInfo[lang],
              meta.decision[lang],
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
                    <dt className="font-semibold text-[#0B2343]/45">
                      {t.version}
                    </dt>
                    <dd className="mt-1 font-bold text-[#0B2343]">
                      {resource.version}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0B2343]/45">
                      {t.fileSize}
                    </dt>
                    <dd className="mt-1 font-bold text-[#0B2343]">
                      {resource.size}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0B2343]/45">
                      {t.fileLanguage}
                    </dt>
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
                    {t.download}
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
          <h2 className="mt-3 max-w-4xl text-2xl font-bold text-white md:text-3xl">
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
