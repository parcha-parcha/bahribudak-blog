import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { getAllPosts, normalizeProcessArea, type ProcessArea } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'


const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const title = lang === 'tr' ? 'Teknik Yayınlar' : 'Technical Publications'
  const description =
    lang === 'tr'
      ? 'Örgü, boya ve apre proseslerini parametre, ölçüm, formül, kök neden ve düzeltici faaliyet yapısıyla ele alan teknik yayınlar.'
      : 'Technical publications covering knitting, dyeing and finishing through parameters, measurements, calculations, root causes and corrective actions.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        tr: `${siteUrl}/tr/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
  }
}

interface BlogPageProps {
  params: Promise<{ lang: Lang }>
  searchParams: Promise<{ area?: string }>
}

const processAreas: { slug: ProcessArea; tr: string; en: string }[] = [
  { slug: 'orgu', tr: 'Örgü / Knitting', en: 'Knitting / Örgü' },
  { slug: 'boya', tr: 'Boya / Dyeing', en: 'Dyeing / Boya' },
  { slug: 'apre', tr: 'Apre / Finishing', en: 'Finishing / Apre' },
]

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = await params
  const { area } = await searchParams
  const activeArea = normalizeProcessArea(area)
  const technicalPosts = getAllPosts(lang).filter(
    post => post.category === 'tekstil' || post.technicalPublication
  )
  const filtered = activeArea
    ? technicalPosts.filter(post => post.processArea === activeArea)
    : technicalPosts

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="border-b border-[#D8DEE8] bg-[#F3F6FA]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="section-label text-[#4C5561]">
                {lang === 'tr' ? 'ÖRGÜ · BOYA · APRE' : 'KNITTING · DYEING · FINISHING'}
              </p>
              <h1 className="mb-5 mt-3 text-5xl font-bold tracking-tight text-[#0B2343] md:text-6xl">
                {lang === 'tr' ? 'Teknik Yayınlar' : 'Technical Publications'}
              </h1>
              <div className="mb-7 h-1 w-16 bg-[#2EA6D9]" />
              <p className="max-w-xl text-lg leading-relaxed text-[#4C5561]">
                {lang === 'tr'
                  ? 'Örgü / Knitting, Boya / Dyeing ve Apre / Finishing süreçlerini; proses parametreleri, ölçüm noktaları, formüller ve düzeltici faaliyetlerle birlikte ele alan saha yayınları.'
                  : 'Field publications covering Knitting, Dyeing and Finishing through process parameters, measurement points, calculations and corrective actions.'}
              </p>
            </div>

            <div className="bb-publication-panel relative min-h-[310px] overflow-hidden rounded-[34px] border border-[#D8DEE8] bg-[#061A33] shadow-[0_24px_70px_rgba(11,35,67,0.18)]">
              <img
                src="/images/blog-endustriyel-proses.jpg"
                alt={lang === 'tr' ? 'Tekstil proses ve endüstriyel altyapı' : 'Textile process and industrial infrastructure'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061A33]/96 via-[#061A33]/78 to-[#061A33]/48" />
              <div className="relative z-10 flex min-h-[310px] items-end p-6 md:p-8">
                <div className="bb-publication-card max-w-[620px] rounded-[26px] border border-white/30 bg-[#061A33] px-6 py-5 shadow-2xl">
                  <p className="bb-publication-kicker text-xs font-black tracking-[0.28em] text-white">BAHRİ BUDAK</p>
                  <h2 className="bb-publication-title mt-2 text-2xl font-black leading-tight text-white md:text-3xl">
                    {lang === 'tr' ? 'Teknik Yayın Sistemi' : 'Technical Publication System'}
                  </h2>
                  <p className="bb-publication-copy mt-3 max-w-lg text-sm leading-relaxed text-[#EAF3FF] md:text-base">
                    {lang === 'tr'
                      ? 'Her yayın; amaç, kapsam, proses ilişkisi, kontrol planı, kök neden, düzeltici faaliyet ve kaynak yapısıyla sunulur.'
                      : 'Each publication follows a controlled structure: purpose, scope, process relationship, control plan, root cause, corrective action and references.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#4C5561]">
              {lang === 'tr' ? 'Proses Alanı / Process Area' : 'Process Area / Proses Alanı'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/blog`}
                aria-current={!activeArea ? 'page' : undefined}
                className={`cat-badge border transition-all ${
                  !activeArea
                    ? 'bb-filter-active border-[#0B2343] bg-[#0B2343] text-white'
                    : 'bb-filter-inactive border-[#D8DEE8] bg-white text-[#4C5561] hover:border-[#0B2343]'
                }`}
              >
                {lang === 'tr' ? 'Tüm Teknik Yayınlar' : 'All Technical Publications'}
              </Link>
              {processAreas.map(item => (
                <Link
                  key={item.slug}
                  href={`/${lang}/blog?area=${item.slug}`}
                  aria-current={activeArea === item.slug ? 'page' : undefined}
                  className={`cat-badge border transition-all ${
                    activeArea === item.slug
                      ? 'bb-filter-active border-[#0B2343] bg-[#0B2343] text-white'
                      : 'bb-filter-inactive border-[#D8DEE8] bg-white text-[#4C5561] hover:border-[#0B2343]'
                  }`}
                >
                  {lang === 'tr' ? item.tr : item.en}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(post => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#D8DDE5] bg-white py-24 text-center text-[#4C5561]">
            <p className="text-lg font-medium">
              {lang === 'tr'
                ? 'Bu proses alanında henüz teknik yayın yok.'
                : 'No technical publication is available in this process area yet.'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
