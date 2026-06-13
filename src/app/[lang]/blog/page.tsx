import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import { useTranslations, categories } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import Link from 'next/link'

interface BlogPageProps {
  params: Promise<{ lang: Lang }>
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = await params
  const { category } = await searchParams
  const t = useTranslations(lang)
  const activeCategory = category || 'all'
  const allPosts = getAllPosts(lang)
  const filtered = activeCategory === 'all' ? allPosts : allPosts.filter(p => p.category === activeCategory)

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="section-label">{t('blog.allPosts')}</p>
        <h1 className="text-4xl font-bold text-navy mb-2">{t('nav.blog')}</h1>
        <div className="w-12 h-1 bg-yellow-bb mt-4" />
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link href={`/${lang}/blog`}
          className={`cat-badge border transition-all ${activeCategory === 'all' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-text border-gray-border hover:border-navy'}`}>
          {t('cat.all')}
        </Link>
        {categories.map(cat => (
          <Link key={cat.slug} href={`/${lang}/blog?category=${cat.slug}`}
            className={`cat-badge border transition-all ${activeCategory === cat.slug ? 'bg-navy text-white border-navy' : 'bg-white text-gray-text border-gray-border hover:border-navy'}`}>
            {t(`cat.${cat.slug}` as any)}
          </Link>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-text">
          <div className="text-5xl mb-4">📭</div>
          <p className="font-medium text-lg">
            {lang === 'tr' ? 'Bu kategoride henüz yazı yok.' : 'No posts in this category yet.'}
          </p>
        </div>
      )}
    </div>
    </main>
  )
}
