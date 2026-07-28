import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { expertiseData, expertiseSlugs, localized } from '@/lib/expertise'
import { isLang, type Lang } from '@/lib/i18n'

interface ExpertiseOverviewProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({
  params,
}: ExpertiseOverviewProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) return {}

  const lang = rawLang as Lang
  const title =
    lang === 'tr'
      ? 'Örgü Kumaş, Boya ve Apre Uzmanlık Alanları'
      : 'Knitted Fabric, Dyeing and Finishing Expertise'
  const description =
    lang === 'tr'
      ? 'Endüstriyel örgü kumaş, boya ve apre proseslerinde amaç, makine, kritik parametre, kontrol noktası, kök neden ve düzeltici faaliyet yaklaşımı.'
      : 'Process objectives, machinery, critical parameters, controls, root cause and corrective action across knitted fabric, dyeing and finishing.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/uzmanlik`,
      languages: {
        tr: `${siteUrl}/tr/uzmanlik`,
        en: `${siteUrl}/en/uzmanlik`,
      },
    },
  }
}

export default async function ExpertiseOverviewPage({
  params,
}: ExpertiseOverviewProps) {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) notFound()

  const lang = rawLang as Lang

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'UZMANLIK OMURGASI',
          title:
            'Örgü kumaş, boya ve apreyi tek üretim zinciri olarak yönetmek.',
          summary:
            'Her uzmanlık sayfası; proses amacı, makine ve ekipmanlar, kritik parametreler, ölçüm noktaları, yaygın hatalar, kök neden ve düzeltici faaliyet yapısını aynı teknik standartta sunar.',
          open: 'Uzmanlık Sayfasını Aç',
          chain: 'Üretim Zinciri Yaklaşımı',
          chainText:
            'Örgüde oluşan yapı, boyamada gördüğümüz davranışı; boya ve yıkamada verilen gerilim ile kimyasal yük ise apre sonucunu doğrudan etkiler. Bu nedenle üç proses ayrı bölümler değil, aynı kalite sisteminin ardışık halkalarıdır.',
        }
      : {
          eyebrow: 'EXPERTISE FRAMEWORK',
          title:
            'Managing knitted fabric, dyeing and finishing as one production chain.',
          summary:
            'Each expertise page follows one technical structure: process objective, machinery, critical parameters, control points, common defects, root cause and corrective action.',
          open: 'Open Expertise Page',
          chain: 'Production Chain Approach',
          chainText:
            'The structure created in knitting affects behaviour in dyeing; tension and chemical load introduced during dyeing and washing directly influence finishing. The three processes are therefore consecutive links in one quality system.',
        }

  const areaLabels = {
    orgu: {
      tr: 'Örgü Kumaş',
      en: 'Knitted Fabric',
    },
    boya: {
      tr: 'Boya',
      en: 'Dyeing',
    },
    apre: {
      tr: 'Apre',
      en: 'Finishing',
    },
  } as const

  return (
    <main className="bg-[#F6F4EF] text-[#111315]">
      <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#111315] text-[#F6F4EF]">
        <Image
          src="/images/uzmanlik-hero-uretim-zinciri.png"
          alt=""
          fill
          className="object-cover opacity-65"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/96 via-[#111315]/82 to-[#111315]/38" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#E45A2B]">
            {copy.eyebrow}
          </p>

          <div className="mb-5 h-[3px] w-16 bg-[#E45A2B]" aria-hidden="true" />

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#F6F4EF] md:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#E5E2DA] md:text-lg">
            {copy.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {expertiseSlugs.map(slug => {
            const area = expertiseData[slug]

            return (
              <article
                key={slug}
                className="group flex min-h-[460px] flex-col overflow-hidden rounded-[30px] border border-[#E5E2DA] bg-white shadow-[0_18px_50px_rgba(17,19,21,0.06)]"
              >
                <div className="relative h-48 overflow-hidden bg-[#F6F4EF]">
                  <Image
                    src={area.heroImage}
                    alt={localized(area.heroImageAlt, lang)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/35 to-transparent" />

                  <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F6F4EF] text-sm font-black text-[#111315]">
                    {area.no}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#E45A2B]">
                    {localized(area.eyebrow, lang)}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold tracking-[-0.03em] text-[#111315]">
                    {areaLabels[slug][lang]}
                  </h2>

                  <p className="mb-7 text-sm leading-7 text-[#6F7782]">
                    {localized(area.summary, lang)}
                  </p>

                  <Link
                    href={`/${lang}/uzmanlik/${slug}`}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-[#111315] transition-colors hover:text-[#E45A2B]"
                  >
                    {copy.open} →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-[#E5E2DA] bg-[#E5E2DA]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="rounded-[30px] border border-[#E5E2DA] bg-white p-8 shadow-[0_18px_50px_rgba(17,19,21,0.06)] md:p-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#E45A2B]">
              {copy.chain}
            </p>

            <div
              className="mb-7 flex flex-wrap items-center gap-3 md:gap-5"
              aria-label={
                lang === 'tr'
                  ? 'Örgü, boya ve apre üretim zinciri'
                  : 'Knitting, dyeing and finishing production chain'
              }
            >
              {[
                lang === 'tr' ? 'ÖRGÜ' : 'KNITTING',
                lang === 'tr' ? 'BOYA' : 'DYEING',
                lang === 'tr' ? 'APRE' : 'FINISHING',
              ].map((item, index, items) => (
                <div
                  key={item}
                  className="flex items-center gap-3 md:gap-5"
                >
                  <span className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#111315] bg-[#111315] px-5 text-sm font-black tracking-[0.12em] text-[#F6F4EF]">
                    {item}
                  </span>

                  {index < items.length - 1 && (
                    <span
                      className="text-2xl font-black text-[#E45A2B]"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="max-w-5xl text-lg font-semibold leading-8 text-[#111315] md:text-2xl md:leading-10">
              {copy.chainText}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
