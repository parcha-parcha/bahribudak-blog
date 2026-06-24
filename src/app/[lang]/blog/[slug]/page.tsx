import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getPost, getAllSlugs, processAreaLabel } from '@/lib/posts'
import { useTranslations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

interface PostPageProps {
  params: Promise<{ lang: string; slug: string }>
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
    : `${siteUrl}/images/og-default.jpg`

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
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params
  const safeLang = lang as Lang
  const post = getPost(safeLang, slug)
  if (!post) notFound()

  const t = useTranslations(safeLang)
  const htmlContent = await marked(post.content)
  const processLabel = processAreaLabel(post.processArea, safeLang)

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

        <header className="max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="cat-badge post-card-category text-xs">
              {post.technicalPublication
                ? safeLang === 'tr' ? 'Teknik Yayın' : 'Technical Publication'
                : t(`cat.${post.category}` as any)}
            </span>
            {processLabel && (
              <span className="rounded-full border border-[#2EA6D9]/40 bg-[#EAF6FC] px-3 py-1 text-xs font-bold text-[#0B2343]">
                {processLabel}
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
                <strong>{post.documentStatus || (safeLang === 'tr' ? 'Yayında' : 'Published')}</strong>
              </div>
            </div>
          </section>
        )}

        {post.coverImage && (
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
