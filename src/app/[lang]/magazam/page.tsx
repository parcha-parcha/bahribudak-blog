import type { Metadata } from 'next'
import Link from 'next/link'
import ResourceCenter from '@/components/ResourceCenter'
import type { Lang } from '@/lib/i18n'
import { resourceCatalogDate, resources } from '@/lib/resources'

interface ResourceCenterPageProps {
  params: Promise<{ lang: string }>
}

type CollectionKey = 'training' | 'checklist' | 'form' | 'catalog'

type CollectionDefinition = {
  key: CollectionKey
  href: string
  group?: 'training' | 'checklist' | 'form'
}

const siteUrl = 'https://bahribudak.com'

const collectionDefinitions: CollectionDefinition[] = [
  {
    key: 'training',
    href: '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
    group: 'training',
  },
  {
    key: 'checklist',
    href: '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
    group: 'checklist',
  },
  {
    key: 'form',
    href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
    group: 'form',
  },
  {
    key: 'catalog',
    href: '#resource-catalog',
  },
]

export async function generateMetadata({
  params,
}: ResourceCenterPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const title =
    lang === 'tr'
      ? 'Teknik Dokümanlar Merkezi'
      : 'Technical Documents Center'

  const description =
    lang === 'tr'
      ? 'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi alanlarında doğrulanmış PDF, DOCX, XLSX, SOP, proses formu ve kontrol listeleri.'
      : 'Verified PDF, DOCX, XLSX, SOP, process forms and checklists for knitting, dyeing, finishing, laboratory, quality and production management.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/magazam`,
      languages: {
        tr: `${siteUrl}/tr/magazam`,
        en: `${siteUrl}/en/magazam`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/magazam`,
      title,
      description,
      siteName: 'Bahri Budak',
    },
  }
}

export default async function ResourceCenterPage({
  params,
}: ResourceCenterPageProps) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const withLang = (path: string) => `/${lang}${path}`

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'BB-DMS • PROFESYONEL TEKNİK KÜTÜPHANE',
          title: 'Teknik Dokümanlar Merkezi',
          intro:
            'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi için doğrulanmış teknik dokümanlar, eğitim notları, proses formları, kontrol listeleri ve hesaplama araçları.',
          primaryCta: 'Dosya kataloğunu incele',
          secondaryCta: 'Teknik talep oluştur',
          verified: 'doğrulanmış kaynak',
          formats: 'dosya biçimi',
          areas: 'teknik alan',
          collectionLabel: 'DOKÜMAN KOLEKSİYONLARI',
          collectionTitle: 'İhtiyacınıza göre doğru teknik dosya grubuna ulaşın',
          collectionText:
            'Her koleksiyon aynı katalog verisiyle çalışır; dosya sayıları, formatlar, sürüm ve indirme bilgileri otomatik olarak güncellenir.',
          fileUnit: 'dosya',
          documentCards: {
            training: {
              title: 'Eğitim Notları',
              description:
                'Kasar, boyama, yıkama, HT jet, laboratuvar, kalite, ramöz ve mekanik apre konularında sistematik teknik eğitim dosyaları.',
              linkLabel: 'Eğitim koleksiyonunu aç',
            },
            checklist: {
              title: 'Kontrol Listeleri',
              description:
                'Proses öncesi, proses içi ve final kontrolde kritik noktaları doğrulayan karar ve kayıt araçları.',
              linkLabel: 'Kontrol listelerini aç',
            },
            form: {
              title: 'Proses Formları',
              description:
                'Parti, reçete, makine, proses parametresi, sapma, kalite ve düzeltici faaliyet kayıt sistemleri.',
              linkLabel: 'Proses formlarını aç',
            },
            catalog: {
              title: 'Teknik Doküman Kataloğu',
              description:
                'PDF, DOCX ve XLSX biçimindeki tüm doğrulanmış teknik kaynakları proses ve dosya türüne göre inceleyin.',
              linkLabel: 'Ana kataloğa git',
            },
          },
          workflowLabel: 'BB-DMS KULLANIM AKIŞI',
          workflowTitle: 'Doğru dosyayı üç adımda bulun ve kullanın',
          workflowSteps: [
            {
              no: '01',
              title: 'İhtiyacı tanımlayın',
              text: 'Eğitim, kontrol, kayıt, hesaplama veya proses standardı ihtiyacını netleştirin.',
            },
            {
              no: '02',
              title: 'Kaynağı doğrulayın',
              text: 'Dosya türünü, sürümü, kapsamı, proses alanını ve kullanım notlarını kontrol edin.',
            },
            {
              no: '03',
              title: 'İşletmeye uyarlayın',
              text: 'Reçete, makine, flotte, kimyasal konsantrasyonu ve müşteri şartlarına göre teknik onay verin.',
            },
          ],
          catalogLabel: 'DOĞRULANMIŞ DOSYA KATALOĞU',
          catalogTitle: 'Kaynağı proses ve dosya türüne göre bulun',
          catalogText:
            'Filtreleri kullanarak dokümanları proses alanı, koleksiyon ve dosya biçimine göre daraltın.',
          catalogDate: 'Katalog tarihi',
          noteLabel: 'KULLANIM VE REVİZYON NOTU',
          noteTitle:
            'Dosyalar işletme şartlarına göre teknik onaydan geçirilmelidir',
          noteText:
            'Reçete, doz, sıcaklık, süre, makine ayarı ve kabul limitleri; elyaf, kumaş konstrüksiyonu, makine, flotte, ürün konsantrasyonu ve müşteri şartnamesi dikkate alınarak doğrulanmalıdır. İndirilebilir form ve eğitim dosyaları tek başına proses talimatı yerine geçmez.',
          backToTop: 'Katalog başına dön',
          requestCta: 'Özel doküman talebi oluştur',
        }
      : {
          eyebrow: 'BB-DMS • PROFESSIONAL TECHNICAL LIBRARY',
          title: 'Technical Documents Center',
          intro:
            'Verified technical documents, training notes, process forms, checklists and calculation tools for knitting, dyeing, finishing, laboratory, quality and production management.',
          primaryCta: 'Browse document catalog',
          secondaryCta: 'Create a technical request',
          verified: 'verified resources',
          formats: 'file formats',
          areas: 'technical areas',
          collectionLabel: 'DOCUMENT COLLECTIONS',
          collectionTitle: 'Access the right technical file group for your need',
          collectionText:
            'Each collection uses the same catalog data; file counts, formats, revisions and download information update automatically.',
          fileUnit: 'files',
          documentCards: {
            training: {
              title: 'Training Notes',
              description:
                'Systematic technical training files on pretreatment, dyeing, washing, HT jet, laboratory, quality, stenter and mechanical finishing.',
              linkLabel: 'Open training collection',
            },
            checklist: {
              title: 'Checklists',
              description:
                'Decision and record tools that verify critical points before, during and after processing.',
              linkLabel: 'Open checklists',
            },
            form: {
              title: 'Process Forms',
              description:
                'Record systems for batches, recipes, machinery, process parameters, deviations, quality and corrective actions.',
              linkLabel: 'Open process forms',
            },
            catalog: {
              title: 'Technical Document Catalog',
              description:
                'Browse all verified PDF, DOCX and XLSX technical resources by process area and file type.',
              linkLabel: 'Go to main catalog',
            },
          },
          workflowLabel: 'BB-DMS WORKFLOW',
          workflowTitle: 'Find and use the correct file in three steps',
          workflowSteps: [
            {
              no: '01',
              title: 'Define the need',
              text: 'Clarify whether you need training, control, recording, calculation or a process standard.',
            },
            {
              no: '02',
              title: 'Verify the resource',
              text: 'Check file type, revision, scope, process area and technical usage notes.',
            },
            {
              no: '03',
              title: 'Adapt to the plant',
              text: 'Approve against recipe, machinery, liquor ratio, chemical concentration and customer requirements.',
            },
          ],
          catalogLabel: 'VERIFIED FILE CATALOG',
          catalogTitle: 'Find resources by process and file type',
          catalogText:
            'Use the filters to narrow resources by process area, collection and file format.',
          catalogDate: 'Catalog date',
          noteLabel: 'USE AND REVISION NOTE',
          noteTitle:
            'Files must be technically approved for actual plant conditions',
          noteText:
            'Recipes, dosage, temperature, time, machine settings and acceptance limits must be verified against fiber, fabric construction, machine, liquor ratio, product concentration and customer specification. Downloadable forms and training files do not replace approved process instructions.',
          backToTop: 'Back to catalog heading',
          requestCta: 'Create a custom document request',
        }

  const stats = [
    {
      value: resources.length.toString().padStart(2, '0'),
      label: copy.verified,
    },
    {
      value: new Set(resources.map((item) => item.format))
        .size.toString()
        .padStart(2, '0'),
      label: copy.formats,
    },
    {
      value: new Set(resources.flatMap((item) => item.areas))
        .size.toString()
        .padStart(2, '0'),
      label: copy.areas,
    },
  ]

  const collectionCards = collectionDefinitions.map((collection) => {
    const matchingResources = collection.group
      ? resources.filter((resource) => resource.group === collection.group)
      : resources

    return {
      ...collection,
      count: matchingResources.length,
      formats: Array.from(
        new Set(matchingResources.map((resource) => resource.format)),
      ),
    }
  })

  return (
    <main
      id="page-top"
      className="min-h-screen bg-[#F5F7FA] text-[#0B2343]"
    >
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-35" />
        <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#2EA6D9]/15 blur-3xl" />
        <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#5BBBE6]">
              {copy.eyebrow}
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-white md:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/78 md:text-lg">
              {copy.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#resource-catalog"
                className="inline-flex items-center justify-center rounded-full bg-[#2EA6D9] px-6 py-3 text-sm font-bold text-[#061A33] transition hover:bg-[#5BBBE6]"
              >
                {copy.primaryCta} →
              </Link>

              <Link
                href={withLang('/contact')}
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#061A33]"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/12 bg-white/[0.07] px-4 py-5 text-center backdrop-blur"
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

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="mb-9 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {copy.collectionLabel}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.collectionTitle}
            </h2>
          </div>

          <p className="text-sm leading-7 text-[#0B2343]/62">
            {copy.collectionText}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collectionCards.map((collection) => {
            const cardCopy = copy.documentCards[collection.key]
            const href =
              collection.key === 'catalog'
                ? collection.href
                : withLang(collection.href)

            return (
              <Link
                key={collection.key}
                href={href}
                className="group flex min-h-[325px] flex-col justify-between rounded-[1.75rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2EA6D9]/60 hover:shadow-[0_18px_45px_rgba(11,35,67,0.12)]"
              >
                <div>
                  <div className="mb-6 inline-flex min-w-[82px] flex-col rounded-2xl bg-[#061A33] px-4 py-3 text-white">
                    <span className="text-2xl font-black leading-none">
                      {collection.count.toString().padStart(2, '0')}
                    </span>
                    <span className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-white/60">
                      {copy.fileUnit}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight text-[#0B2343]">
                    {cardCopy.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#0B2343]/65">
                    {cardCopy.description}
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {collection.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded-full border border-[#B7DFF0] bg-[#F3FBFE] px-3 py-1 text-xs font-bold text-[#0B2343]"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex text-sm font-bold text-[#2EA6D9] transition group-hover:translate-x-1">
                    {cardCopy.linkLabel} →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-y border-[#D8DDE5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="mb-9 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {copy.workflowLabel}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.workflowTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.workflowSteps.map((step) => (
              <article
                key={step.no}
                className="rounded-[1.75rem] border border-[#D8DDE5] bg-[#F7FAFC] p-6"
              >
                <span className="text-sm font-black tracking-[0.18em] text-[#2EA6D9]">
                  {step.no}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#0B2343]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#0B2343]/65">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div
          id="resource-catalog"
          className="scroll-mt-28 border-b border-[#D8DDE5] pb-7"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
                {copy.catalogLabel}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {copy.catalogTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0B2343]/62">
                {copy.catalogText}
              </p>
            </div>

            <p className="text-xs font-semibold text-[#0B2343]/50">
              {copy.catalogDate}: {resourceCatalogDate}
            </p>
          </div>
        </div>

        <div className="pt-7">
          <ResourceCenter lang={lang} resources={resources} />
        </div>
      </section>

      <section className="border-t border-[#D8DDE5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] bg-[#0B2343] px-6 py-8 text-white md:px-10 md:py-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5BBBE6]">
              {copy.noteLabel}
            </p>

            <h2 className="mt-3 max-w-4xl text-2xl font-bold text-white md:text-3xl">
              {copy.noteTitle}
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/72">
              {copy.noteText}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#resource-catalog"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0B2343] transition hover:bg-[#EAF6FC]"
              >
                {copy.backToTop}
              </Link>

              <Link
                href={withLang('/contact')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#0B2343]"
              >
                {copy.requestCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
