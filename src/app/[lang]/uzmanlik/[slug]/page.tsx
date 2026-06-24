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
  const title = `${localized(data.label, lang)} | Bahri Budak`
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
      return data.relatedKeywords.some(keyword =>
        haystack.includes(normaliseSearchText(keyword))
      )
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
        symptom: 'Belirti / Symptom',
        rootCause: 'Kök Neden / Root Cause',
        corrective: 'Düzeltici Faaliyet / Corrective Action',
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
        symptom: 'Symptom / Belirti',
        rootCause: 'Root Cause / Kök Neden',
        corrective: 'Corrective Action / Düzeltici Faaliyet',
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
    <main className="bg-white text-[#0B2343]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-su-damlasi.jpg"
            alt=""
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061A33] via-[#061A33]/92 to-[#12365E]/65" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.15fr_0.55fr]">
          <div>
            <Link
              href={`/${lang}/uzmanlik`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5BBBE6] hover:text-white"
            >
              ← {copy.back}
            </Link>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-white/70">
              {data.no} · {localized(data.eyebrow, lang)}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.045em] text-white md:text-6xl">
              {localized(data.title, lang)}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/84 md:text-lg">
              {localized(data.summary, lang)}
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <Image
              src={data.heroImage}
              alt={localized(data.heroImageAlt, lang)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 300px, 25vw"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#D8DDE5] bg-[#F5F7FA]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
            {copy.processPurpose}
          </p>
          <p className="max-w-5xl text-xl font-semibold leading-9 text-[#0B2343] md:text-2xl">
            {localized(data.purpose, lang)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="rounded-[30px] border border-[#D8DDE5] bg-white p-7 shadow-[0_18px_50px_rgba(11,35,67,0.06)] md:p-9">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
              01 · {copy.machinery}
            </p>
            <ul className="space-y-4">
              {data.machines.map(item => (
                <li key={localized(item, lang)} className="flex gap-3 text-sm leading-7 text-[#263B57] md:text-base">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#2EA6D9]" />
                  <span>{localized(item, lang)}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[30px] bg-[#0B2343] p-7 text-white shadow-[0_18px_50px_rgba(11,35,67,0.16)] md:p-9">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#5BBBE6]">
              02 · {copy.parameters}
            </p>
            <ul className="space-y-4">
              {data.criticalParameters.map(item => (
                <li key={localized(item, lang)} className="flex gap-3 text-sm leading-7 text-white/86 md:text-base">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#5BBBE6]" />
                  <span>{localized(item, lang)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-[#EAF6FC]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
            03 · {copy.controls}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.controlPoints.map((item, index) => (
              <div
                key={localized(item, lang)}
                className="rounded-[24px] border border-white bg-white p-6 shadow-[0_12px_35px_rgba(11,35,67,0.06)]"
              >
                <p className="mb-3 text-xs font-black tracking-[0.2em] text-[#2EA6D9]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="font-semibold leading-7 text-[#0B2343]">
                  {localized(item, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
            04 · ROOT CAUSE
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-5xl">
            {copy.defects}
          </h2>
        </div>

        <div className="space-y-5">
          {data.defects.map((defect, index) => (
            <article
              key={localized(defect.name, lang)}
              className="overflow-hidden rounded-[28px] border border-[#D8DDE5] bg-white"
            >
              <div className="flex items-center gap-4 border-b border-[#D8DDE5] bg-[#F5F7FA] px-6 py-5 md:px-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2343] text-sm font-bold text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-[#0B2343] md:text-xl">
                  {localized(defect.name, lang)}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="border-b border-[#D8DDE5] p-6 md:border-b-0 md:border-r md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#4C5561]">
                    {copy.symptom}
                  </p>
                  <p className="text-sm leading-7 text-[#263B57]">
                    {localized(defect.symptom, lang)}
                  </p>
                </div>
                <div className="border-b border-[#D8DDE5] p-6 md:border-b-0 md:border-r md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#B7832F]">
                    {copy.rootCause}
                  </p>
                  <p className="text-sm leading-7 text-[#263B57]">
                    {localized(defect.rootCause, lang)}
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#2EA6D9]">
                    {copy.corrective}
                  </p>
                  <p className="text-sm leading-7 text-[#263B57]">
                    {localized(defect.correctiveAction, lang)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
              05 · DOCUMENTATION
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-5xl">
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
                  className="flex min-h-[250px] flex-col rounded-[28px] border border-[#D8DDE5] bg-white p-7"
                >
                  <div className="mb-6 inline-flex w-fit rounded-full bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#0B2343]">
                    {resource.type}
                  </div>
                  <h3 className="mb-3 text-xl font-bold leading-7 text-[#0B2343]">
                    {localized(resource.title, lang)}
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-[#4C5561]">
                    {localized(resource.description, lang)}
                  </p>
                  <a
                    href={href}
                    target={isDownload ? '_blank' : undefined}
                    rel={isDownload ? 'noopener noreferrer' : undefined}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-[#0B2343] hover:text-[#2EA6D9]"
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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2EA6D9]">
                06 · PUBLICATIONS
              </p>
              <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-5xl">
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

      <section className="bg-[#0B2343] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5BBBE6]">
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
                  className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#5BBBE6] hover:text-[#5BBBE6]"
                >
                  {reference.organization}: {reference.title}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/15 bg-white/5 p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#5BBBE6]">
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
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#4C5561]">
            {copy.next}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherAreas.map(areaSlug => {
              const area = expertiseData[areaSlug]
              return (
                <Link
                  key={areaSlug}
                  href={`/${lang}/uzmanlik/${areaSlug}`}
                  className="group rounded-[24px] border border-[#D8DDE5] p-6 transition-all hover:-translate-y-1 hover:border-[#2EA6D9] hover:shadow-[0_16px_42px_rgba(11,35,67,0.08)]"
                >
                  <p className="mb-3 text-xs font-black tracking-[0.2em] text-[#2EA6D9]">
                    {area.no}
                  </p>
                  <h3 className="text-xl font-bold text-[#0B2343] group-hover:text-[#2EA6D9]">
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
