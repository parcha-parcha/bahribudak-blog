import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/posts'
import { useTranslations, categories } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ lang: Lang; slug: string }>
}

export async function generateStaticParams() {
  const langs: Lang[] = ['tr', 'en']
  const result = []
  for (const lang of langs) {
    const slugs = getAllSlugs(lang)
    for (const slug of slugs) result.push({ lang, slug })
  }
  return result
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPost(lang, slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params
  const post = getPost(lang, slug)
  if (!post) notFound()

  const t = useTranslations(lang)
  const cat = categories.find(c => c.slug === post.category)

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-gray-text mb-10 font-medium">
        <Link href={`/${lang}`} className="hover:text-navy transition-colors">{t('nav.home')}</Link>
        <span>/</span>
        <Link href={`/${lang}/blog`} className="hover:text-navy transition-colors">{t('nav.blog')}</Link>
        <span>/</span>
        <span className="text-navy truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="mb-6">
        <span className="cat-badge text-white text-xs" style={{ backgroundColor: cat?.color || '#0f1a3a' }}>
          {cat?.emoji} {t(`cat.${post.category}` as any)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">{post.title}</h1>
      <div className="w-16 h-1 bg-yellow-bb mb-8" />

      <div className="flex items-center gap-6 text-sm text-gray-text mb-12 pb-8 border-b border-gray-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
            <span className="font-['Great_Vibes'] text-white text-sm leading-none">BB</span>
          </div>
          <span className="font-semibold text-navy">Bahri Budak</span>
        </div>
        <span>·</span>
        <time>{new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        <span>·</span>
        <span>{post.readingTime} {t('blog.readingTime')}</span>
      </div>

      <div className="prose-bb"><MDXRemote source={post.content} /></div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-border">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-gray-text bg-gray-soft px-3 py-1 rounded-full border border-gray-border">#{tag}</span>
          ))}
        </div>
      )}

      <div className="mt-16 bg-navy text-white rounded-xl2 p-8 flex items-start gap-6">
        <div className="w-16 h-16 rounded-full border-2 border-yellow-bb flex items-center justify-center flex-shrink-0">
          <span className="font-['Great_Vibes'] text-yellow-bb text-2xl leading-none">BB</span>
        </div>
        <div>
          <p className="font-bold text-lg mb-1">Bahri Budak</p>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {lang === 'tr' ? 'Tekstil fabrikası yöneticisi. Kişisel gelişim, felsefe ve sektör yazıları üzerine içerik üretici.' : 'Textile factory manager. Content creator on personal growth, philosophy and industry.'}
          </p>
          <a href="https://linkedin.com/in/bahribudak" target="_blank" rel="noopener noreferrer" className="text-yellow-bb text-sm font-bold hover:underline">
            linkedin.com/in/bahribudak →
          </a>
        </div>
      </div>

      <div className="mt-10">
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-navy-light transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {lang === 'tr' ? 'Tüm yazılara dön' : 'Back to all posts'}
        </Link>
      </div>
    </article>
  )
}
