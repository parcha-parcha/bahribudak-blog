import { notFound, permanentRedirect } from 'next/navigation'
import { marked } from 'marked'
import { documentStatusLabel, getPost, getAllSlugs, getRelatedPosts, processAreaLabel } from '@/lib/posts'
import { useTranslations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

import { resolveBlogSlugForLang } from '@/lib/translatedRoutes'
import { isMemberDownloadPath } from '@/lib/resources'

interface PostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

function memberDownloadHref(href: string) {
  return `/api/member-download?path=${encodeURIComponent(href)}`
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fileTypeFromHref(href: string) {
  const cleanHref = href.split('?')[0].split('#')[0]
  return cleanHref.split('.').pop()?.toLocaleUpperCase('en-US') || 'DOSYA'
}

function enhanceMemberDownloadLinks(html: string, lang: Lang) {
  const memberFileLabel = lang === 'tr' ? 'Üyelikli dosya' : 'Member file'
  const actionLabel = lang === 'tr' ? 'Üyelikle indir' : 'Member download'

  return html.replace(
    /<a\b([^>]*?)href=(["'])(\/downloads\/[^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi,
    (match, _beforeHref: string, _quote: string, href: string, _afterHref: string, innerHtml: string) => {
      const cleanHref = href.split('?')[0].split('#')[0]

      if (!isMemberDownloadPath(cleanHref)) return match

      const fileType = fileTypeFromHref(cleanHref)
      const title = stripHtml(innerHtml) || `${fileType} ${actionLabel}`
      const safeTitle = escapeHtml(title)
      const safeFileType = escapeHtml(fileType)
      const safeMemberHref = escapeHtml(memberDownloadHref(cleanHref))
      const safeAriaLabel = escapeHtml(`${actionLabel}: ${title}`)

    
  return `<a href="${safeMemberHref}" class="bb-member-download-card" aria-label="${safeAriaLabel}"><span class="bb-member-download-card__meta"><span>${escapeHtml(memberFileLabel)}</span><span class="bb-member-download-card__type">${safeFileType}</span></span><span class="bb-member-download-card__title">${safeTitle}</span><span class="bb-member-download-card__action">${escapeHtml(actionLabel)} →</span></a>`
    },
  )
}

export async function generateStaticParams() {
  const langs: Lang[] = ['tr', 'en']
  const result: { lang: string; slug: string }[] = []
  for (const lang of langs) {
    const slugs = getAllSlugs(lang)
    for (const slug of slugs) result.push({ lang, slug })
  }
  return result
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPost(lang as Lang, slug)
  if (!post) return {}

  const siteUrl = 'https://bahribudak.com'
  const postUrl = `${siteUrl}/${lang}/blog/${slug}`
  const imageUrl = post.coverImage
    ? `${siteUrl}${post.coverImage}`
    : `${siteUrl}/images/hero-su-damlasi.jpg`

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Bahri Budak',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.revisionDate || post.date).toISOString(),
      authors: ['Bahri Budak'],
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
      languages: {
        ...(resolveBlogSlugForLang(slug, 'tr')
          ? { tr: `${siteUrl}/tr/blog/${resolveBlogSlugForLang(slug, 'tr')}` }
          : lang === 'tr'
            ? { tr: postUrl }
            : {}),
        ...(resolveBlogSlugForLang(slug, 'en')
          ? { en: `${siteUrl}/en/blog/${resolveBlogSlugForLang(slug, 'en')}` }
          : lang === 'en'
            ? { en: postUrl }
            : {}),
      },
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params
  const safeLang = lang as Lang
  const canonicalSlug = resolveBlogSlugForLang(slug, safeLang)

  // Accept the counterpart-language slug as an alias and redirect it to the
  // canonical URL. This prevents a 404 even when an old preview or cached
  // language link still points to the Turkish slug under /en (or vice versa).
  if (canonicalSlug && canonicalSlug !== slug) {
    permanentRedirect(`/${safeLang}/blog/${canonicalSlug}`)
  }

  const post = getPost(safeLang, slug)
  if (!post) notFound()

  const t = useTranslations(safeLang)
  const rawHtmlContent = await marked(post.content)
  const htmlContent = enhanceMemberDownloadLinks(String(rawHtmlContent), safeLang)
  const processLabel = processAreaLabel(post.processArea, safeLang)
  const relatedPosts = getRelatedPosts(safeLang, post.slug, 3)

  const dateLabel = new Date(post.date).toLocaleDateString(
    safeLang === 'tr' ? 'tr-TR' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
  const revisionDateLabel = post.revisionDate
    ? new Date(post.revisionDate).toLocaleDateString(
        safeLang === 'tr' ? 'tr-TR' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : dateLabel
  const statusLabel = documentStatusLabel(post.documentStatus, safeLang)
  const publicationTypeLabel = post.technicalPublication
    ? safeLang === 'tr' ? 'Teknik Yayın' : 'Technical Publication'
    : t(`cat.${post.category}` as any)

  return (
    <>
      <ArticleSchema
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        revisionDate={post.revisionDate}
        slug={slug}
        lang={lang}
        coverImage={post.coverImage}
        documentCode={post.documentCode}
        processArea={processLabel}
      />

      <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-text">
          <Link href={`/${lang}`} className="hover:text-navy">{t('nav.home')}</Link>
          <span>/</span>
          <Link href={`/${lang}/blog`} className="hover:text-navy">
            {safeLang === 'tr' ? 'Teknik Yayınlar' : 'Technical Publications'}
          </Link>
          {processLabel && (
            <>
              <span>/</span>
              <span className="text-navy">{processLabel}</span>
            </>
          )}
        </nav>

        <header
          className={
            post.technicalPublication
              ? 'mb-10 overflow-hidden rounded-[28px] border border-[#D8DDE5] bg-white shadow-sm'
              : 'max-w-4xl'
          }
        >
          {post.technicalPublication && post.coverImage && (
            <div className="relative bg-[#061A33]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="mx-auto max-h-[520px] w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061A33]/55 to-transparent" aria-hidden="true" />
            </div>
          )}

          <div className={post.technicalPublication ? 'p-6 md:p-8' : ''}>
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="cat-badge post-card-category text-xs">
              {publicationTypeLabel}
            </span>
            {processLabel && (
              <span className="rounded-full border border-[#2EA6D9]/40 bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#0B2343]">
                {processLabel}
              </span>
            )}
            {post.hasDownloads && (
              <span className="rounded-full border border-[#F2C94C]/60 bg-[#FFF8E1] px-3 py-1 text-xs font-bold text-[#0B2343]">
                {safeLang === 'tr' ? 'İndirilebilir Dosya' : 'Downloadable File'}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-navy md:text-5xl">
            {post.title}
          </h1>
          <div className="mb-8 h-1 w-16 bg-yellow-bb" />

          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#4C5561]">
            {post.excerpt}
          </p>
          </div>
        </header>

        {post.technicalPublication && (
          <section className="technical-document-control mb-10 rounded-[24px] border border-[#D8DDE5] bg-[#F5F7FA] p-5 md:p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4C5561]">
              {safeLang === 'tr' ? 'Doküman Kontrolü / Document Control' : 'Document Control / Doküman Kontrolü'}
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <span>{safeLang === 'tr' ? 'Belge Kodu' : 'Document Code'}</span>
                <strong>{post.documentCode || '—'}</strong>
              </div>
              <div>
                <span>{safeLang === 'tr' ? 'Revizyon' : 'Revision'}</span>
                <strong>{post.revision || 'R00'}</strong>
              </div>
              <div>
                <span>{safeLang === 'tr' ? 'Revizyon Tarihi' : 'Revision Date'}</span>
                <strong>{revisionDateLabel}</strong>
              </div>
              <div>
                <span>{safeLang === 'tr' ? 'Durum' : 'Status'}</span>
                <strong>{statusLabel}</strong>
              </div>
            </div>
          </section>
        )}

        {post.coverImage && !post.technicalPublication && (
          <figure className="mb-10 overflow-hidden rounded-[24px] border border-[#D8DDE5] bg-white">
            <img
              src={post.coverImage}
              alt={post.title}
              className="max-h-[620px] w-full object-contain"
            />
          </figure>
        )}

        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-border pb-7 text-sm text-gray-text">
          <span className="font-semibold text-navy">Bahri Budak</span>
          <span aria-hidden="true">·</span>
          <time dateTime={new Date(post.date).toISOString()}>{dateLabel}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} {t('blog.readingTime')}</span>
        </div>

        {post.downloadLinks.length > 0 && (
          <section className="mb-10 rounded-[24px] border border-[#D8DDE5] bg-[#F8FBFD] p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2EA6D9]">
                  {safeLang === 'tr' ? 'Yayın dosyaları' : 'Publication files'}
                </p>
                <h2 className="text-2xl font-bold text-navy">
                  {post.technicalPublication
                    ? safeLang === 'tr' ? 'İndirilebilir Teknik Dosyalar' : 'Downloadable Technical Files'
                    : safeLang === 'tr' ? 'İndirilebilir Dosyalar' : 'Downloadable Files'}
                </h2>
              </div>
              <span className="rounded-full border border-[#F2C94C]/60 bg-[#FFF8E1] px-3 py-1 text-xs font-bold text-[#0B2343]">
                {post.downloadLinks.length} {safeLang === 'tr' ? 'dosya' : 'files'}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {post.downloadLinks.map(download => {
                const isMemberDownload = isMemberDownloadPath(download.href)
                const href = isMemberDownload ? memberDownloadHref(download.href) : download.href
                const actionLabel = isMemberDownload
                  ? safeLang === 'tr' ? 'Üyelikle indir' : 'Member download'
                  : safeLang === 'tr' ? 'indir' : 'download'
                const accessLabel = isMemberDownload
                  ? safeLang === 'tr' ? 'Üyelikli dosya' : 'Member file'
                  : download.fileType

                return (
                <a
                  key={download.href}
                  href={href}
                  download={isMemberDownload ? undefined : true}
                  className="flex min-h-24 flex-col justify-between rounded-[18px] border border-[#D8DDE5] bg-white p-4 text-navy transition hover:-translate-y-0.5 hover:border-[#2EA6D9] hover:shadow-md"
                >
                  <span className="text-sm font-bold leading-snug">{download.label}</span>
                 {isMemberDownload ? (
  <span className="mt-4 flex flex-col items-start gap-2">
    <span className="inline-flex w-fit rounded-full border border-[#B9DFEE] bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#177DA8]">
      {accessLabel} · {download.fileType}
    </span>

    <span className="inline-flex w-fit rounded-full bg-[#0B2343] px-3 py-2 text-xs font-bold text-white">
      {actionLabel} →
    </span>
  </span>
) : (
  <span className="mt-4 inline-flex w-fit rounded-full bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#0B2343]">
    {download.fileType} {actionLabel} →
  </span>
)}
                </a>
                )
              })}
            </div>
          </section>
        )}

        <div className="prose-bb technical-prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {post.standards && post.standards.length > 0 && (
          <section className="mt-12 rounded-[24px] border border-[#D8DDE5] bg-[#F5F7FA] p-6">
            <h2 className="mb-4 text-xl font-bold text-[#0B2343]">
              {safeLang === 'tr' ? 'İlgili Standartlar / Referenced Standards' : 'Referenced Standards / İlgili Standartlar'}
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-[#4C5561]">
              {post.standards.map(standard => (
                <li key={standard} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2EA6D9]" />
                  <span>{standard}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-border pt-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-gray-border bg-gray-soft px-3 py-1 text-xs font-medium text-gray-text">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-14 border-t border-gray-border pt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2EA6D9]">
                  {safeLang === 'tr' ? 'Okumaya devam edin' : 'Continue reading'}
                </p>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">
                  {safeLang === 'tr' ? 'İlgili Yazılar' : 'Related Articles'}
                </h2>
              </div>
              <Link
                href={`/${lang}/blog`}
                className="hidden text-sm font-bold text-navy hover:text-[#2EA6D9] md:inline"
              >
                {safeLang === 'tr' ? 'Tüm yayınlar →' : 'All publications →'}
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map(related => (
                <article
                  key={related.slug}
                  className="overflow-hidden rounded-[20px] border border-[#D8DDE5] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {related.coverImage && (
                    <Link href={`/${lang}/blog/${related.slug}`} className="block">
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className="h-44 w-full object-cover"
                      />
                    </Link>
                  )}
                  <div className="p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2EA6D9]">
                      {processAreaLabel(related.processArea, safeLang) ||
                        (safeLang === 'tr' ? 'Teknik Yayın' : 'Technical Publication')}
                    </p>
                    <h3 className="mb-3 text-lg font-bold leading-snug text-navy">
                      <Link href={`/${lang}/blog/${related.slug}`} className="hover:text-[#2EA6D9]">
                        {related.title}
                      </Link>
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#4C5561]">
                      {related.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="bb-dark-readable-panel mt-14 flex items-start gap-6 rounded-[24px] bg-navy p-7 text-white md:p-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-yellow-bb">
            <span className="text-xl font-bold text-yellow-bb">BB</span>
          </div>
          <div>
            <p className="mb-1 text-lg font-bold text-white">Bahri Budak</p>
            <p className="mb-4 text-sm leading-relaxed text-white/85">
              {safeLang === 'tr'
                ? 'Örgü / Knitting, Boya / Dyeing ve Apre / Finishing süreçlerinde 35 yılı aşkın saha deneyimine dayalı teknik yayın, eğitim ve proses danışmanlığı.'
                : 'Technical publications, training and process consulting based on more than 35 years of field experience in Knitting, Dyeing and Finishing.'}
            </p>
            <a
              href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#5BBBE6]"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div className="mt-10">
          <Link href={`/${lang}/blog`} className="text-sm font-bold text-navy">
            ← {safeLang === 'tr' ? 'Tüm teknik yayınlara dön' : 'Back to all technical publications'}
          </Link>
        </div>
      </article>
    </>
  )
}
