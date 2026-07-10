import type { Metadata } from 'next'
import Link from 'next/link'
import ResourceCenter from '@/components/ResourceCenter'
import type { Lang } from '@/lib/i18n'
import { resourceCatalogDate, resources } from '@/lib/resources'

interface ResourceCenterPageProps {
  params: Promise<{ lang: string }>
}

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
      canonical: `https://bahribudak.com/${lang}/magazam`,
      languages: {
        tr: 'https://bahribudak.com/tr/magazam',
        en: 'https://bahribudak.com/en/magazam',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://bahribudak.com/${lang}/magazam`,
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

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'BB-DMS • PROFESYONEL TEKNİK KÜTÜPHANE',
          title: 'Teknik Dokümanlar Merkezi',
          intro:
            'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi için doğrulanmış teknik dokümanlar, eğitim notları, proses formları, kontrol listeleri ve hesaplama araçları.',
          verified: 'doğrulanmış kaynak',
          formats: 'dosya biçimi',
          areas: 'teknik alan',
          collectionLabel: 'DOKÜMAN KOLEKSİYONLARI',
          collectionTitle: 'İhtiyacınız olan dosya grubuna doğrudan ulaşın',
          openCollection: 'Koleksiyonu aç →',
          catalogLabel: 'DOĞRULANMIŞ DOSYA KATALOĞU',
          catalogTitle: 'Kaynağı proses ve dosya türüne göre bulun',
          catalogDate: 'Katalog tarihi',
          noteLabel: 'KULLANIM VE REVİZYON NOTU',
          noteTitle: 'Dosyalar işletme şartlarına göre teknik onaydan geçirilmelidir',
          noteText:
            'Reçete, doz, sıcaklık, süre, makine ayarı ve kabul limitleri; elyaf, kumaş konstrüksiyonu, makine, flotte, ürün konsantrasyonu ve müşteri şartnamesi dikkate alınarak doğrulanmalıdır. İndirilebilir form ve eğitim dosyaları tek başına proses talimatı yerine geçmez.',
          collections: [
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
              title: 'Eğitim Notları',
              description:
                'Kasar, boyama, yıkama, ramöz, kompaktör ve final kalite eğitim dosyaları.',
              code: '01',
            },
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
              title: 'Proses Formları',
              description:
                'Parti, reçete, ramöz, kök neden ve düzeltici faaliyet kayıt sistemleri.',
              code: '02',
            },
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
              title: 'Kontrol Listeleri',
              description:
                'Kasar, boyama başlangıcı, laboratuvar ve final kalite doğrulama listeleri.',
              code: '03',
            },
          ],
        }
      : {
          eyebrow: 'BB-DMS • PROFESSIONAL TECHNICAL LIBRARY',
          title: 'Technical Documents Center',
          intro:
            'Verified technical documents, training notes, process forms, checklists and calculation tools for knitting, dyeing, finishing, laboratory, quality and production management.',
          verified: 'verified resources',
          formats: 'file formats',
          areas: 'technical areas',
          collectionLabel: 'DOCUMENT COLLECTIONS',
          collectionTitle: 'Go directly to the document group you need',
          openCollection: 'Open collection →',
          catalogLabel: 'VERIFIED FILE CATALOG',
          catalogTitle: 'Find resources by process and file type',
          catalogDate: 'Catalog date',
          noteLabel: 'USE AND REVISION NOTE',
          noteTitle: 'Files must be technically approved for actual plant conditions',
          noteText:
            'Recipes, dosage, temperature, time, machine settings and acceptance limits must be verified against fiber, fabric construction, machine, liquor ratio, product concentration and customer specification. Downloadable forms and training files do not replace approved process instructions.',
          collections: [
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
              title: 'Training Notes',
              description:
                'Training files for pretreatment, dyeing, washing, stenter, compactor and final quality.',
              code: '01',
            },
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
              title: 'Process Forms',
              description:
                'Batch, recipe, stenter, root-cause and corrective-action recording systems.',
              code: '02',
            },
            {
              href: '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
              title: 'Checklists',
              description:
                'Pretreatment, dyeing start-up, laboratory and final-quality verification lists.',
              code: '03',
            },
          ],
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

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0B2343]">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-35" />
        <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#2EA6D9]/15 blur-3xl" />
        <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
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

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
            {copy.collectionLabel}
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
            {copy.collectionTitle}
          </h2>
        </div>

        <div className="mb-14 grid gap-5 md:grid-cols-3">
          {copy.collections.map((collection) => (
            <Link
              key={collection.href}
              href={`/${lang}${collection.href}`}
              className="group flex min-h-[245px] flex-col justify-between rounded-[1.75rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2EA6D9]/60 hover:shadow-lg"
            >
              <div>
                <div className="mb-6 inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-[#061A33] px-3 text-sm font-black text-white">
                  {collection.code}
                </div>
                <h3 className="text-xl font-bold text-[#0B2343]">
                  {collection.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#0B2343]/65">
                  {collection.description}
                </p>
              </div>

              <span className="mt-6 inline-flex text-sm font-bold text-[#2EA6D9]">
                {copy.openCollection}
              </span>
            </Link>
          ))}
        </div>

        <div
          id="resource-catalog"
          className="mb-7 flex flex-col justify-between gap-3 border-b border-[#D8DDE5] pb-7 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {copy.catalogLabel}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.catalogTitle}
            </h2>
          </div>

          <p className="text-xs font-semibold text-[#0B2343]/50">
            {copy.catalogDate}: {resourceCatalogDate}
          </p>
        </div>

        <ResourceCenter lang={lang} resources={resources} />
      </section>

      <section className="border-t border-[#D8DDE5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] bg-[#0B2343] px-6 py-8 text-white md:px-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5BBBE6]">
              {copy.noteLabel}
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              {copy.noteTitle}
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/72">
              {copy.noteText}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
