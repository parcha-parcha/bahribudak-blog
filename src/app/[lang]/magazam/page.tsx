import ResourceCenter from '@/components/ResourceCenter'
import type { Lang } from '@/lib/i18n'
import { resourceCatalogDate, resources } from '@/lib/resources'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  return {
    title:
      lang === 'tr'
        ? 'Tekstil Kaynak Merkezi'
        : 'Textile Resource Center',
    description:
      lang === 'tr'
        ? 'Örgü, boya ve apre alanlarında doğrulanmış PDF, XLSX ve DOCX teknik dokümanları; eğitim notları, proses formları ve kontrol listeleri.'
        : 'Verified PDF, XLSX and DOCX resources for knitting, dyeing and finishing: technical documents, training notes, process forms and checklists.',
    alternates: {
      canonical: `https://bahribudak.com/${lang}/magazam`,
      languages: {
        tr: 'https://bahribudak.com/tr/magazam',
        en: 'https://bahribudak.com/en/magazam',
      },
    },
  }
}

export default async function ResourceCenterPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const stats = [
    {
      value: resources.length.toString().padStart(2, '0'),
      label: lang === 'tr' ? 'doğrulanmış kaynak' : 'verified resources',
    },
    {
      value: new Set(resources.map((item) => item.format)).size.toString().padStart(2, '0'),
      label: lang === 'tr' ? 'dosya biçimi' : 'file formats',
    },
    {
      value: new Set(resources.flatMap((item) => item.areas)).size.toString().padStart(2, '0'),
      label: lang === 'tr' ? 'teknik alan' : 'technical areas',
    },
  ]

  const collections = [
    {
      href: `/${lang}/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari`,
      title: lang === 'tr' ? 'Eğitim Notları' : 'Training Notes',
      description:
        lang === 'tr'
          ? 'Kasar, boyama, yıkama, ramöz, kompaktör ve final kalite eğitim dosyaları.'
          : 'Training files for pretreatment, dyeing, washing, stenter, compactor and final quality.',
    },
    {
      href: `/${lang}/sablonlar/tekstil-teknik-dokumanlari/proses-formlari`,
      title: lang === 'tr' ? 'Proses Formları' : 'Process Forms',
      description:
        lang === 'tr'
          ? 'Parti, reçete, ramöz, kök neden ve düzeltici faaliyet kayıt sistemleri.'
          : 'Batch, recipe, stenter, root-cause and corrective-action recording systems.',
    },
    {
      href: `/${lang}/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri`,
      title: lang === 'tr' ? 'Kontrol Listeleri' : 'Checklists',
      description:
        lang === 'tr'
          ? 'Kasar, boyama başlangıcı, laboratuvar ve final kalite doğrulama listeleri.'
          : 'Pretreatment, dyeing start-up, laboratory and final-quality verification lists.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0B2343]">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-35" />
        <div className="absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#2EA6D9]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#5BBBE6]">
              {lang === 'tr' ? 'ÖRGÜ · BOYA · APRE' : 'KNITTING · DYEING · FINISHING'}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
              {lang === 'tr' ? 'Tekstil Kaynak Merkezi' : 'Textile Resource Center'}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/78 md:text-lg">
              {lang === 'tr'
                ? 'Saha kullanımına göre sınıflandırılmış teknik doküman, eğitim notu, proses formu, kontrol listesi ve hesaplama araçları. Her kartta dosya biçimi, sürüm, boyut ve katalog tarihi açıkça gösterilir.'
                : 'Technical documents, training notes, process forms, checklists and calculation tools classified for field use. Each card clearly shows file format, version, size and catalog date.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/12 bg-white/[0.07] px-4 py-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-black text-[#5BBBE6] md:text-3xl">{item.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-[0.10em] text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {lang === 'tr' && (
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {collections.map((collection) => (
            <Link
              key={collection.href}
              href={collection.href}
              className="rounded-[1.75rem] border border-[#D8DDE5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2EA6D9]/50"
            >
              <p className="text-lg font-bold text-[#0B2343]">{collection.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#0B2343]/65">{collection.description}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-[#2EA6D9]">
                {lang === 'tr' ? 'Koleksiyonu aç →' : 'Open collection →'}
              </span>
            </Link>
            ))}
          </div>
        )}

        <div id="resource-catalog" className="mb-7 flex flex-col justify-between gap-3 border-b border-[#D8DDE5] pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2EA6D9]">
              {lang === 'tr' ? 'DOĞRULANMIŞ DOSYA KATALOĞU' : 'VERIFIED FILE CATALOG'}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0B2343] md:text-4xl">
              {lang === 'tr' ? 'Kaynağı proses ve dosya türüne göre bulun' : 'Find resources by process and file type'}
            </h2>
          </div>
          <p className="text-xs font-semibold text-[#0B2343]/50">
            {lang === 'tr' ? 'Katalog tarihi' : 'Catalog date'}: {resourceCatalogDate}
          </p>
        </div>

        <ResourceCenter lang={lang} resources={resources} />
      </section>

      <section className="border-t border-[#D8DDE5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[2rem] bg-[#0B2343] px-6 py-8 text-white md:px-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5BBBE6]">
              {lang === 'tr' ? 'KULLANIM VE REVİZYON NOTU' : 'USE AND REVISION NOTE'}
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              {lang === 'tr'
                ? 'Dosyalar işletme şartlarına göre teknik onaydan geçirilmelidir'
                : 'Files must be technically approved for actual plant conditions'}
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/72">
              {lang === 'tr'
                ? 'Reçete, doz, sıcaklık, süre, makine ayarı ve kabul limitleri; elyaf, kumaş konstrüksiyonu, makine, flotte, ürün konsantrasyonu ve müşteri şartnamesi dikkate alınarak doğrulanmalıdır. İndirilebilir form ve eğitim dosyaları tek başına proses talimatı yerine geçmez.'
                : 'Recipes, dosage, temperature, time, machine settings and acceptance limits must be verified against fiber, fabric construction, machine, liquor ratio, product concentration and customer specification. Downloadable forms and training files do not replace approved process instructions.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
