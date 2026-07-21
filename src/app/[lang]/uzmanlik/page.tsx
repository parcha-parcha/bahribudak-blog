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

export async function generateMetadata({ params }: ExpertiseOverviewProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) return {}

  const lang = rawLang as Lang
  const title = lang === 'tr'
    ? 'Örgü Kumaş, Boya ve Apre Uzmanlık Alanları'
    : 'Knitted Fabric, Dyeing and Finishing Expertise'
  const description = lang === 'tr'
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

export default async function ExpertiseOverviewPage({ params }: ExpertiseOverviewProps) {
  const { lang: rawLang } = await params
  if (!isLang(rawLang)) notFound()
  const lang = rawLang as Lang

  const copy = lang === 'tr'
    ? {
        eyebrow: 'UZMANLIK OMURGASI',
        title: 'Örgü kumaş, boya ve apreyi tek üretim zinciri olarak yönetmek.',
        summary: 'Her uzmanlık sayfası; proses amacı, makine ve ekipmanlar, kritik parametreler, ölçüm noktaları, yaygın hatalar, kök neden ve düzeltici faaliyet yapısını aynı teknik standartta sunar.',
        open: 'Uzmanlık Sayfasını Aç',
        chain: 'Üretim Zinciri Yaklaşımı',
        chainText: 'Örgüde oluşan yapı, boyamada gördüğümüz davranışı; boya ve yıkamada verilen gerilim ile kimyasal yük ise apre sonucunu doğrudan etkiler. Bu nedenle üç proses ayrı bölümler değil, aynı kalite sisteminin ardışık halkalarıdır.',
      }
    : {
        eyebrow: 'EXPERTISE FRAMEWORK',
        title: 'Managing knitted fabric, dyeing and finishing as one production chain.',
        summary: 'Each expertise page follows one technical structure: process objective, machinery, critical parameters, control points, common defects, root cause and corrective action.',
        open: 'Open Expertise Page',
        chain: 'Production Chain Approach',
        chainText: 'The structure created in knitting affects behaviour in dyeing; tension and chemical load introduced during dyeing and washing directly influence finishing. The three processes are therefore consecutive links in one quality system.',
      }

  return (
    <main className="bg-white text-[#0B2343]">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <Image
          src="/images/hero-su-damlasi.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A33] via-[#061A33]/90 to-[#12365E]/55" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#5BBBE6]">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-white md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/82 md:text-lg">
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
                className="group flex min-h-[460px] flex-col overflow-hidden rounded-[30px] border border-[#D8DDE5] bg-white shadow-[0_18px_50px_rgba(11,35,67,0.06)]"
              >
                <div className="relative h-48 overflow-hidden bg-[#F5F7FA]">
                  <Image
                    src={area.heroImage}
                    alt={localized(area.heroImageAlt, lang)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061A33]/70 to-transparent" />
                  <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-[#0B2343]">
                    {area.no}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2EA6D9]">
                    {localized(area.eyebrow, lang)}
                  </p>
                  <h2 className="mb-4 text-2xl font-bold tracking-[-0.03em] text-[#0B2343]">
                    {localized(area.label, lang)}
                  </h2>
                  <p className="mb-7 text-sm leading-7 text-[#4C5561]">
                    {localized(area.summary, lang)}
                  </p>
                  <Link
                    href={`/${lang}/uzmanlik/${slug}`}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-[#0B2343] transition-colors hover:text-[#2EA6D9]"
                  >
                    {copy.open} →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-[#EAF6FC]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="rounded-[30px] border border-white bg-white p-8 shadow-[0_18px_50px_rgba(11,35,67,0.06)] md:p-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2EA6D9]">
              {copy.chain}
            </p>
            <p className="max-w-5xl text-lg font-semibold leading-8 text-[#0B2343] md:text-2xl md:leading-10">
              {copy.chainText}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
