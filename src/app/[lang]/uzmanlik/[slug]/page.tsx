import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { expertiseData, expertiseSlugs, isExpertiseSlug, localized } from '@/lib/expertise'
import { isLang, type Lang } from '@/lib/i18n'
import { getAllPosts } from '@/lib/posts'

interface ExpertisePageProps {
  params: Promise<{ lang: string; slug: string }>
}

const siteUrl = 'https://bahribudak.com'

export function generateStaticParams() {
  return expertiseSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: ExpertisePageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  if (!isLang(rawLang) || !isExpertiseSlug(slug)) return {}

  const lang = rawLang as Lang
  const data = expertiseData[slug]
  const title = localized(data.label, lang)
  const description = localized(data.summary, lang)

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/uzmanlik/${slug}`,
      languages: {
        tr: `${siteUrl}/tr/uzmanlik/${slug}`,
        en: `${siteUrl}/en/uzmanlik/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/uzmanlik/${slug}`,
      title,
      description,
      images: [{ url: data.heroImage }],
    },
  }
}

function normaliseSearchText(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
}

export default async function ExpertiseDetailPage({ params }: ExpertisePageProps) {
  const { lang: rawLang, slug } = await params
  if (!isLang(rawLang) || !isExpertiseSlug(slug)) notFound()

  const lang = rawLang as Lang
  const data = expertiseData[slug]
  const otherAreas = expertiseSlugs.filter(item => item !== slug)

  const relatedPosts = getAllPosts(lang)
    .filter(post => {
      const haystack = normaliseSearchText(
        `${post.title} ${post.excerpt} ${post.slug} ${(post.tags || []).join(' ')}`
      )

      return (
        post.processArea === slug ||
        data.relatedKeywords.some(keyword =>
          haystack.includes(normaliseSearchText(keyword))
        )
      )
    })
    .sort((first, second) => {
      const firstPriority = first.processArea === slug ? 0 : 1
      const secondPriority = second.processArea === slug ? 0 : 1
      return firstPriority - secondPriority
    })
    .slice(0, 3)

  const resources = data.resources.filter(resource =>
    lang === 'tr' ? true : resource.type !== 'ARTICLE'
  )

  const copy = lang === 'tr'
    ? {
        processPurpose: 'Prosesin Amacı',
        machinery: 'Makine ve Ekipmanlar',
        parameters: 'Kritik Proses Parametreleri',
        controls: 'Ölçüm ve Kontrol Noktaları',
        defects: 'Yaygın Hatalar, Kök Neden ve Düzeltici Faaliyet',
        symptom: 'Belirti',
        rootCause: 'Kök Neden',
        corrective: 'Düzeltici Faaliyet',
        resources: 'İndirilebilir Teknik Kaynaklar',
        related: 'İlgili Teknik Yayınlar',
        references: 'Teknik Referans Çerçevesi',
        referencesNote: 'Bu sayfa sabit reçete veya makine set değeri vermez. Nihai proses değerleri; elyaf, iplik, konstrüksiyon, makine, kimyasal sistemi ve müşteri spesifikasyonuna göre doğrulanmalıdır.',
        photo: 'Saha Görseli Standardı',
        next: 'Diğer uzmanlık alanları',
        download: 'Kaynağı Aç',
        read: 'Yayını Oku',
        back: 'Uzmanlık Alanları',
      }
    : {
        processPurpose: 'Process Objective',
        machinery: 'Machinery and Equipment',
        parameters: 'Critical Process Parameters',
        controls: 'Measurement and Control Points',
        defects: 'Common Defects, Root Cause and Corrective Action',
        symptom: 'Symptom',
        rootCause: 'Root Cause',
        corrective: 'Corrective Action',
        resources: 'Downloadable Technical Resources',
        related: 'Related Technical Publications',
        references: 'Technical Reference Framework',
        referencesNote: 'This page does not prescribe fixed recipes or machine setpoints. Final values must be validated against fibre, yarn, construction, machinery, chemical system and customer specification.',
        photo: 'Field Image Standard',
        next: 'Other expertise areas',
        download: 'Open Resource',
        read: 'Read Publication',
        back: 'Expertise Areas',
      }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: localized(data.title, lang),
    description: localized(data.summary, lang),
    author: {
      '@type': 'Person',
      name: 'Bahri Budak',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bahri Budak Tekstil Proses Danışmanlığı',
      url: siteUrl,
    },
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en',
    mainEntityOfPage: `${siteUrl}/${lang}/uzmanlik/${slug}`,
    about: localized(data.label, lang),
  }

  return (
    <main className="bg-white text-[#111315]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#111315] text-[#F6F4EF]">
        <Image
          src={data.heroImage}
          alt=""
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-[#111315]/82" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
          <Link
            href={`/${lang}/uzmanlik`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#E45A2B] transition-colors hover:text-[#F6F4EF]"
          >
            ← {copy.back}
          </Link>

          <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#E45A2B]">
            {data.no} · {localized(data.eyebrow, lang)}
          </p>

          <div className="mb-5 h-[3px] w-16 bg-[#E45A2B]" aria-hidden="true" />

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#F6F4EF] md:text-6xl">
            {localized(data.title, lang)}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#E5E2DA] md:text-lg">
            {localized(data.summary, lang)}
          </p>
        </div>
      </section>

      <section className="border-b border-[#E5E2DA] bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
            {copy.processPurpose}
          </p>
          <p className="max-w-5xl text-xl font-semibold leading-9 text-[#111315] md:text-2xl">
            {localized(data.purpose, lang)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="rounded-[14px] border border-[#E5E2DA] bg-white p-7 md:p-9">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
              01 · {copy.machinery}
            </p>
            <ul className="space-y-4">
              {data.machines.map(item => (
                <li key={localized(item, lang)} className="flex gap-3 text-sm leading-7 text-[#6F7782] md:text-base">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#E45A2B]" />
                  <span>{localized(item, lang)}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[14px] bg-[#111315] p-7 text-white md:p-9">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
              02 · {copy.parameters}
            </p>
            <ul className="space-y-4">
              {data.criticalParameters.map(item => (
                <li key={localized(item, lang)} className="flex gap-3 text-sm leading-7 text-white/86 md:text-base">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#E45A2B]" />
                  <span>{localized(item, lang)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
            03 · {copy.controls}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.controlPoints.map((item, index) => (
              <div
                key={localized(item, lang)}
                className="rounded-[12px] border border-[#E5E2DA] bg-white p-6"
              >
                <p className="mb-3 text-xs font-black tracking-[0.2em] text-[#E45A2B]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="font-semibold leading-7 text-[#111315]">
                  {localized(item, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
            04 · ROOT CAUSE
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#111315] md:text-5xl">
            {copy.defects}
          </h2>
        </div>

        <div className="space-y-5">
          {data.defects.map((defect, index) => (
            <article
              key={localized(defect.name, lang)}
              className="overflow-hidden rounded-[14px] border border-[#E5E2DA] bg-white"
            >
              <div className="flex items-center gap-4 border-b border-[#E5E2DA] bg-[#F6F4EF] px-6 py-5 md:px-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#111315] text-sm font-bold text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-[#111315] md:text-xl">
                  {localized(defect.name, lang)}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="border-b border-[#E5E2DA] p-6 md:border-b-0 md:border-r md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#6F7782]">
                    {copy.symptom}
                  </p>
                  <p className="text-sm leading-7 text-[#6F7782]">
                    {localized(defect.symptom, lang)}
                  </p>
                </div>
                <div className="border-b border-[#E5E2DA] p-6 md:border-b-0 md:border-r md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#6F7782]">
                    {copy.rootCause}
                  </p>
                  <p className="text-sm leading-7 text-[#6F7782]">
                    {localized(defect.rootCause, lang)}
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#E45A2B]">
                    {copy.corrective}
                  </p>
                  <p className="text-sm leading-7 text-[#6F7782]">
                    {localized(defect.correctiveAction, lang)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
              {lang === 'tr' ? '05 · DOKÜMANTASYON' : '05 · DOCUMENTATION'}
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#111315] md:text-5xl">
              {copy.resources}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {resources.map(resource => {
              const href = resource.href.startsWith('/tr/')
                ? resource.href.replace('/tr/', `/${lang}/`)
                : resource.href
              const isDownload = resource.type !== 'ARTICLE'

              return (
                <article
                  key={resource.href}
                  className="flex min-h-[250px] flex-col rounded-[14px] border border-[#E5E2DA] bg-white p-7"
                >
                  <div className="mb-6 inline-flex w-fit rounded-md bg-[#F6F4EF] px-3 py-1 text-xs font-bold text-[#111315]">
                    {resource.type === 'ARTICLE'
                      ? lang === 'tr'
                        ? 'MAKALE'
                        : 'ARTICLE'
                      : resource.type}
                  </div>
                  <h3 className="mb-3 text-xl font-bold leading-7 text-[#111315]">
                    {localized(resource.title, lang)}
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-[#6F7782]">
                    {localized(resource.description, lang)}
                  </p>
                  <a
                    href={href}
                    target={isDownload ? '_blank' : undefined}
                    rel={isDownload ? 'noopener noreferrer' : undefined}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-[#111315] hover:text-[#E45A2B]"
                  >
                    {isDownload ? copy.download : copy.read} →
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
                {lang === 'tr' ? '06 · YAYINLAR' : '06 · PUBLICATIONS'}
              </p>
              <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#111315] md:text-5xl">
                {copy.related}
              </h2>
            </div>
            <Link href={`/${lang}/blog?category=tekstil`} className="btn-outline self-start">
              {lang === 'tr' ? 'Tüm Teknik Yayınlar →' : 'All Technical Publications →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map(post => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#111315] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E45A2B]">
              {copy.references}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-white/78">
              {copy.referencesNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {data.references.map(reference => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#E45A2B] hover:text-[#E45A2B]"
                >
                  {reference.organization}: {reference.title}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[12px] border border-white/15 bg-white/5 p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#E45A2B]">
              {copy.photo}
            </p>
            <p className="text-sm leading-7 text-white/80">
              {localized(data.fieldPhotoBrief, lang)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#6F7782]">
            {copy.next}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherAreas.map(areaSlug => {
              const area = expertiseData[areaSlug]
              return (
                <Link
                  key={areaSlug}
                  href={`/${lang}/uzmanlik/${areaSlug}`}
                  className="group rounded-[12px] border border-[#E5E2DA] p-6 transition-colors hover:border-[#E45A2B]"
                >
                  <p className="mb-3 text-xs font-black tracking-[0.2em] text-[#E45A2B]">
                    {area.no}
                  </p>
                  <h3 className="text-xl font-bold text-[#111315] group-hover:text-[#E45A2B]">
                    {localized(area.label, lang)} →
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
