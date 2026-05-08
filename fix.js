const fs = require('fs')
const path = require('path')

// ── Fix 1: [lang]/layout.tsx ──────────────────────────────────────────
const layoutPath = path.join(__dirname, 'src', 'app', '[lang]', 'layout.tsx')
fs.writeFileSync(layoutPath, `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n'
import { langs } from '@/lib/i18n'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: Lang }>
}

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params
  if (!langs.includes(lang)) return {}
  return {
    alternates: {
      canonical: \`https://bahribudak.com/\${lang}\`,
      languages: {
        'tr': 'https://bahribudak.com/tr',
        'en': 'https://bahribudak.com/en',
      }
    }
  }
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  if (!langs.includes(lang)) notFound()

  return (
    <div lang={lang} className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
`)
console.log('✓ layout.tsx fixed')

// ── Fix 2: [lang]/page.tsx ────────────────────────────────────────────
const homePath = path.join(__dirname, 'src', 'app', '[lang]', 'page.tsx')
fs.writeFileSync(homePath, `import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import { useTranslations, categories } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface HomeProps {
  params: Promise<{ lang: Lang }>
}

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const t = useTranslations(lang)
  const recentPosts = getAllPosts(lang).slice(0, 6)

  return (
    <>
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
              <Link href={\`/\${lang}/blog\`} className="btn-primary">
                {t('hero.cta')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a href="https://linkedin.com/in/bahribudak" target="_blank" rel="noopener noreferrer"
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
              <Link key={cat.slug} href={\`/\${lang}/blog?category=\${cat.slug}\`}
                className="bg-white rounded-xl border border-gray-border p-6 text-center hover:border-navy hover:shadow-card transition-all group">
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-navy text-sm leading-snug group-hover:text-navy-light">
                  {t(\`cat.\${cat.slug}\` as any)}
                </h3>
                <p className="text-xs text-gray-text mt-2 leading-relaxed hidden md:block">
                  {t(\`cat.\${cat.slug}.desc\` as any)}
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
          <Link href={\`/\${lang}/blog\`} className="btn-outline text-sm">
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
            <Link href={\`/\${lang}/about\`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy mt-4 hover:underline decoration-yellow-bb underline-offset-4">
              {lang === 'tr' ? 'Daha fazlası →' : 'Learn more →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
`)
console.log('✓ page.tsx fixed')

// ── Fix 3: [lang]/blog/page.tsx ───────────────────────────────────────
const blogPath = path.join(__dirname, 'src', 'app', '[lang]', 'blog', 'page.tsx')
fs.writeFileSync(blogPath, `import PostCard from '@/components/PostCard'
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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="section-label">{t('blog.allPosts')}</p>
        <h1 className="text-4xl font-bold text-navy mb-2">{t('nav.blog')}</h1>
        <div className="w-12 h-1 bg-yellow-bb mt-4" />
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link href={\`/\${lang}/blog\`}
          className={\`cat-badge border transition-all \${activeCategory === 'all' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-text border-gray-border hover:border-navy'}\`}>
          {t('cat.all')}
        </Link>
        {categories.map(cat => (
          <Link key={cat.slug} href={\`/\${lang}/blog?category=\${cat.slug}\`}
            className={\`cat-badge border transition-all \${activeCategory === cat.slug ? 'text-white border-transparent' : 'bg-white text-gray-text border-gray-border hover:border-navy'}\`}
            style={activeCategory === cat.slug ? { backgroundColor: cat.color, borderColor: cat.color } : {}}>
            {cat.emoji} {t(\`cat.\${cat.slug}\` as any)}
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
  )
}
`)
console.log('✓ blog/page.tsx fixed')

// ── Fix 4: [lang]/blog/[slug]/page.tsx ───────────────────────────────
const slugPath = path.join(__dirname, 'src', 'app', '[lang]', 'blog', '[slug]', 'page.tsx')
fs.writeFileSync(slugPath, `import { notFound } from 'next/navigation'
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
        <Link href={\`/\${lang}\`} className="hover:text-navy transition-colors">{t('nav.home')}</Link>
        <span>/</span>
        <Link href={\`/\${lang}/blog\`} className="hover:text-navy transition-colors">{t('nav.blog')}</Link>
        <span>/</span>
        <span className="text-navy truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="mb-6">
        <span className="cat-badge text-white text-xs" style={{ backgroundColor: cat?.color || '#0f1a3a' }}>
          {cat?.emoji} {t(\`cat.\${post.category}\` as any)}
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
        <Link href={\`/\${lang}/blog\`} className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-navy-light transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {lang === 'tr' ? 'Tüm yazılara dön' : 'Back to all posts'}
        </Link>
      </div>
    </article>
  )
}
`)
console.log('✓ blog/[slug]/page.tsx fixed')
console.log('')
console.log('✅ Tüm dosyalar düzeltildi! Şimdi: npm run dev')
