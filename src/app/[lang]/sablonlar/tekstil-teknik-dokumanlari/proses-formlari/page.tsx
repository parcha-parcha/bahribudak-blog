import type { Metadata } from 'next'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import type { ResourceItem } from '@/lib/resources'
import { resourceCatalogDate, resources } from '@/lib/resources'

interface ProcessFormsPageProps {
  params: Promise<{ lang: string }>
}

type FormDefinition = {
  id: string
  sheets: number
  details: {
    tr: string[]
    en: string[]
  }
  tags: {
    tr: string[]
    en: string[]
  }
}

const formDefinitions: FormDefinition[] = [
  {
    id: 'parti-takip',
    sheets: 3,
    details: {
      tr: ['3 çalışma sayfası', '200 parti kaydı', 'Otomatik hesaplama'],
      en: ['3 worksheets', '200 batch records', 'Automatic calculations'],
    },
    tags: {
      tr: ['Parti takibi', 'Reçete', 'Makine', 'Kalite', 'Sapma analizi'],
      en: ['Batch tracking', 'Recipe', 'Machine', 'Quality', 'Deviation analysis'],
    },
  },
  {
    id: 'recete-form',
    sheets: 3,
    details: {
      tr: ['3 çalışma sayfası', '20 malzeme satırı', 'Otomatik doz hesabı'],
      en: ['3 worksheets', '20 material rows', 'Automatic dosage calculation'],
    },
    tags: {
      tr: ['Laboratuvar', 'Reçete', 'Dozaj', 'Revizyon', 'Onay'],
      en: ['Laboratory', 'Recipe', 'Dosing', 'Revision', 'Approval'],
    },
  },
  {
    id: 'ramoz-form',
    sheets: 3,
    details: {
      tr: ['3 çalışma sayfası', '12 kamara takibi', 'Otomatik hesaplama'],
      en: ['3 worksheets', '12-chamber tracking', 'Automatic calculations'],
    },
    tags: {
      tr: ['Ramöz', 'Apre', 'Fikse', 'Pick-up', 'Kalite'],
      en: ['Stenter', 'Finishing', 'Heat setting', 'Pick-up', 'Quality'],
    },
  },
  {
    id: 'kok-neden',
    sheets: 4,
    details: {
      tr: ['4 çalışma sayfası', '200 kayıt', 'Risk ve aksiyon takibi'],
      en: ['4 worksheets', '200 records', 'Risk and action tracking'],
    },
    tags: {
      tr: ['Hata analizi', 'Kök neden', 'DÖF', 'Aksiyon', 'Etkinlik'],
      en: ['Defect analysis', 'Root cause', 'CAPA', 'Action', 'Effectiveness'],
    },
  },
]

function requireResource(id: string): ResourceItem {
  const item = resources.find((resource) => resource.id === id)

  if (!item) {
    throw new Error(`Process form resource not found: ${id}`)
  }

  return item
}

const processForms = formDefinitions.map((definition) => ({
  ...definition,
  resource: requireResource(definition.id),
}))

const totalSheets = processForms.reduce((sum, item) => sum + item.sheets, 0)

const pageCopy = {
  tr: {
    metaTitle: 'Tekstil Proses Formları',
    metaDescription:
      'Boyahane, laboratuvar, kalite ve terbiye süreçlerinde parti, reçete, makine, ölçüm, sapma ve onay kayıtlarını standartlaştıran profesyonel Excel proses formları.',
    eyebrow: 'BB-DMS • TEKSTİL KAYNAK MERKEZİ',
    title: 'Tekstil Proses Formları',
    intro:
      'Boyahane, laboratuvar, kalite ve terbiye süreçlerinde reçete, parti, makine, ölçüm, sapma ve onay bilgilerinin aynı kayıt sistemi içinde izlenmesini sağlayan profesyonel Excel araçları.',
    stats: [
      { value: processForms.length.toString().padStart(2, '0'), label: 'proses formu' },
      { value: totalSheets.toString().padStart(2, '0'), label: 'çalışma sayfası' },
      { value: processForms.length.toString().padStart(2, '0'), label: 'izleme sistemi' },
    ],
    systemLabel: 'FORM SİSTEMİ',
    systemTitle: 'Kayıttan yönetime uzanan izlenebilir proses yapısı',
    systemText:
      'Bu formlar yalnızca bilgi girişi için değil; planlanan ve gerçekleşen değerleri karşılaştırmak, sapmaları görünür hale getirmek, sorumlulukları tanımlamak ve üretim sonuçlarını aynı veri düzeninde değerlendirmek için hazırlanır.',
    benefits: [
      {
        title: 'Ortak kayıt düzeni',
        text: 'Vardiyalar ve bölümler aynı veri alanlarını kullanır; eksik veya farklı kayıt biçimleri azaltılır.',
      },
      {
        title: 'İzlenebilir proses',
        text: 'Reçete, makine, sıcaklık, süre, pH, kalite ve sapma kayıtları aynı iş veya parti numarası altında izlenir.',
      },
      {
        title: 'Ölçülebilir performans',
        text: 'Planlanan ve gerçekleşen süreler, uygunluk durumu, tekrar işlem ve aksiyon sonuçları karşılaştırılabilir.',
      },
    ],
    usersLabel: 'KİMLER KULLANIR?',
    users: [
      'Boyahane müdürü ve işletme yönetimi',
      'Vardiya amiri ve vardiya mühendisi',
      'Proses kontrol ve kalite ekipleri',
      'Laboratuvar ve reçete hazırlama ekibi',
      'Operatör ve makine sorumluları',
      'Planlama ve üretim yönetimi',
    ],
    customRequest: 'Özel form talebi oluştur',
    catalogLabel: 'DOĞRULANMIŞ PROSES FORMU KATALOĞU',
    catalogTitle: 'Üretim kayıtlarını standartlaştıran indirilebilir form seti',
    catalogText:
      'Dosya adları, sürüm bilgileri, boyutlar ve indirme bağlantıları ana kaynak kataloğuyla eş zamanlı tutulur.',
    status: 'İNDİRİLEBİLİR',
    contentTags: 'İÇERİK ETİKETLERİ',
    version: 'Sürüm',
    size: 'Dosya boyutu',
    language: 'Dosya dili',
    download: 'Dosyayı indir',
    usageLabel: 'KULLANIM VE TEKNİK ONAY NOTU',
    usageTitle: 'Formlar işletmenin makine ve organizasyon yapısına göre uyarlanmalıdır',
    usageText:
      'Makine numaraları, proses adları, yetki ve onay kademeleri, kabul limitleri, raporlama alanları ve kayıt sorumlulukları işletmenin gerçek çalışma düzenine göre tanımlanmalı ve revizyon altında tutulmalıdır. Formlar tek başına onaylı proses talimatı yerine geçmez.',
    back: 'Kaynak merkezine dön',
    contact: 'Talep oluştur',
    catalogDate: 'Katalog tarihi',
  },
  en: {
    metaTitle: 'Textile Process Forms',
    metaDescription:
      'Professional Excel process forms standardizing batch, recipe, machine, measurement, deviation and approval records across dyehouse, laboratory, quality and finishing operations.',
    eyebrow: 'BB-DMS • TEXTILE RESOURCE CENTER',
    title: 'Textile Process Forms',
    intro:
      'Professional Excel tools that keep recipe, batch, machine, measurement, deviation and approval data within one traceable record system across dyehouse, laboratory, quality and finishing operations.',
    stats: [
      { value: processForms.length.toString().padStart(2, '0'), label: 'process forms' },
      { value: totalSheets.toString().padStart(2, '0'), label: 'worksheets' },
      { value: processForms.length.toString().padStart(2, '0'), label: 'tracking systems' },
    ],
    systemLabel: 'FORM SYSTEM',
    systemTitle: 'A traceable process structure extending from records to management',
    systemText:
      'These forms are designed not merely for data entry, but to compare planned and actual values, expose deviations, define responsibilities and evaluate production results within one consistent data structure.',
    benefits: [
      {
        title: 'Common record structure',
        text: 'Shifts and departments use the same data fields, reducing incomplete and inconsistent records.',
      },
      {
        title: 'Traceable process',
        text: 'Recipe, machine, temperature, time, pH, quality and deviation records remain linked to the same job or batch number.',
      },
      {
        title: 'Measurable performance',
        text: 'Planned and actual times, conformity status, reprocessing and action results can be compared.',
      },
    ],
    usersLabel: 'WHO USES THEM?',
    users: [
      'Dyehouse managers and plant management',
      'Shift supervisors and shift engineers',
      'Process-control and quality teams',
      'Laboratory and recipe-preparation teams',
      'Operators and machine supervisors',
      'Planning and production management',
    ],
    customRequest: 'Request a custom form',
    catalogLabel: 'VERIFIED PROCESS FORM CATALOG',
    catalogTitle: 'Downloadable forms standardizing production records',
    catalogText:
      'File names, revision data, sizes and download links are synchronized with the main resource catalog.',
    status: 'DOWNLOADABLE',
    contentTags: 'CONTENT TAGS',
    version: 'Version',
    size: 'File size',
    language: 'File language',
    download: 'Download file',
    usageLabel: 'USE AND TECHNICAL APPROVAL NOTE',
    usageTitle: 'Forms must be adapted to the plant’s machine and organizational structure',
    usageText:
      'Machine numbers, process names, authority and approval levels, acceptance limits, reporting fields and record responsibilities must be defined for actual operating conditions and maintained under revision control. Forms do not replace approved process instructions.',
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
}: ProcessFormsPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = pageCopy[lang]
  const canonical = `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/proses-formlari`

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords:
      lang === 'tr'
        ? [
            'tekstil proses formları',
            'boyama parti takip formu',
            'reçete onay formu',
            'ramöz takip formu',
            'kök neden formu',
            'Excel tekstil formları',
          ]
        : [
            'textile process forms',
            'dye batch tracking form',
            'recipe approval form',
            'stenter tracking form',
            'root cause form',
            'textile Excel forms',
          ],
    alternates: {
      canonical,
      languages: {
        tr: 'https://bahribudak.com/tr/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
        en: 'https://bahribudak.com/en/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
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

export default async function ProcessFormsPage({
  params,
}: ProcessFormsPageProps) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const t = pageCopy[lang]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.metaTitle,
    description: t.metaDescription,
    url: `https://bahribudak.com/${lang}/sablonlar/tekstil-teknik-dokumanlari/proses-formlari`,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    dateModified: resourceCatalogDate,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: processForms.length,
      itemListElement: processForms.map((form, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: form.resource.title[lang],
          description: form.resource.description[lang],
          encodingFormat:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          contentUrl: `https://bahribudak.com${form.resource.href}`,
          inLanguage:
            form.resource.fileLanguage === 'en'
              ? 'en'
              : form.resource.fileLanguage === 'tr-en'
                ? ['tr', 'en']
                : 'tr',
          version: form.resource.version,
          dateModified: form.resource.catalogDate,
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
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#2EA6D9]/15 blur-3xl" />
          <div className="absolute -bottom-44 -left-28 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />

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
                {t.systemLabel}
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {t.systemTitle}
              </h2>
              <p className="mt-5 max-w-4xl text-sm leading-7 text-[#0B2343]/75 md:text-base">
                {t.systemText}
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {t.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-[#2EA6D9]/20 bg-[#F3F6FA] p-4"
                  >
                    <h3 className="text-sm font-bold text-[#0B2343]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-[#0B2343]/65">
                      {benefit.text}
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
                {t.customRequest}
              </Link>
            </aside>
          </div>

          <div className="mt-14 border-b border-[#D8DDE5] pb-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                  {t.catalogLabel}
                </p>
                <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                  {t.catalogTitle}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#0B2343]/60">
                  {t.catalogText}
                </p>
              </div>

              <p className="shrink-0 text-xs font-semibold text-[#0B2343]/50">
                {t.catalogDate}: {resourceCatalogDate}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {processForms.map((form, index) => {
              const item = form.resource
              const details = form.details[lang]
              const tags = form.tags[lang]

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
                    {lang === 'tr'
                      ? [
                          'Boyahane üretim ve proses takibi',
                          'Laboratuvar ve işletme reçete yönetimi',
                          'Apre ve terbiye prosesleri',
                          'Kalite ve proses iyileştirme',
                        ][index]
                      : [
                          'Dyehouse production and process tracking',
                          'Laboratory and bulk recipe management',
                          'Finishing and stenter processes',
                          'Quality and process improvement',
                        ][index]}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.025em] text-[#0B2343]">
                    {item.title[lang]}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#0B2343]/70">
                    {item.description[lang]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#D8DDE5] bg-[#F3F6FA] px-3 py-1.5 text-xs font-semibold text-[#0B2343]/75">
                      {item.format}
                    </span>
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
                      {t.download}
                    </a>
                  </div>
                </article>
              )
            })}
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
