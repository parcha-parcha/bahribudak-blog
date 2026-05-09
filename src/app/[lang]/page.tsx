import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import { useTranslations, categories } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import QuoteOfDay from '@/components/QuoteOfDay'
import VisitorCounter from '@/components/VisitorCounter'
interface HomeProps {
  params: Promise<{ lang: Lang }>
}

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const t = useTranslations(lang)
  const recentPosts = getAllPosts(lang).slice(0, 6)

  return (
    <>
<QuoteOfDay />
<div className="flex justify-center my-4">
  <VisitorCounter />
</div>
      {/* ── HERO ── */}
      <section className="bg-navy text-white overflow-hidden relative">
        <div className="absolute top-12 right-12 w-3 h-3 rounded-full bg-yellow-bb opacity-80" />
        <div className="absolute top-24 right-20 w-1.5 h-1.5 rounded-full bg-yellow-bb opacity-50" />
        <div className="absolute bottom-16 left-16 w-2 h-2 rounded-full bg-yellow-bb opacity-60" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-bb" />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl animate-fade-up">
            <p className="section-label text-white/50 mb-4">{t('hero.greeting')}</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight">{t('hero.name')}</h1>
            <div className="flex items-center gap-4 my-6">
              <div className="h-0.5 w-12 bg-yellow-bb" />
              <span className="text-sm font-medium text-white/60">{t('hero.tagline')}</span>
            </div>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">{t('hero.description')}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/blog`} className="btn-primary">
                {t('hero.cta')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
             href="https://www.linkedin.com/in/bahri-budak-052ab5b8" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-full hover:border-yellow-bb hover:text-yellow-bb transition-all">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-gray-soft border-b border-gray-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="section-label text-center mb-10">{lang === 'tr' ? 'İçerik Kategorileri' : 'Content Categories'}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/${lang}/blog?category=${cat.slug}`}
                className="bg-white rounded-xl border border-gray-border p-6 text-center hover:border-navy hover:shadow-card transition-all group">
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-navy text-sm leading-snug group-hover:text-navy-light">
                  {t(`cat.${cat.slug}` as any)}
                </h3>
                <p className="text-xs text-gray-text mt-2 leading-relaxed hidden md:block">
                  {t(`cat.${cat.slug}.desc` as any)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT POSTS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">{t('blog.latestPosts')}</p>
            <h2 className="text-3xl font-bold text-navy">{t('blog.allPosts')}</h2>
          </div>
          <Link href={`/${lang}/blog`} className="btn-outline text-sm">
            {lang === 'tr' ? 'Tümünü Gör' : 'View All'}
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-text">
            <div className="text-5xl mb-4">✍️</div>
            <p className="font-medium">{lang === 'tr' ? 'Yakında ilk yazı gelecek.' : 'First post coming soon.'}</p>
          </div>
        )}
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-yellow-pale border-y border-yellow-bb/20">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="font-['Great_Vibes'] text-white text-4xl leading-none">BB</span>
          </div>
          <div className="yellow-strip">
            <p className="section-label mb-2">{t('about.title')}</p>
            <p className="text-navy/80 leading-relaxed max-w-2xl">{t('about.text')}</p>
            <Link href={`/${lang}/about`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy mt-4 hover:underline decoration-yellow-bb underline-offset-4">
              {lang === 'tr' ? 'Daha fazlası →' : 'Learn more →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
