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
      <section className="border-b border-[#D8DEE8] bg-[#F3F6FA]">
        <div className="max-w-6xl mx-auto px-6 py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center">
            <div>
              <p className="section-label text-[#5D5F63]">{t('blog.allPosts')}</p>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0B2343] tracking-tight mt-3 mb-5">
                {t('nav.blog')}
              </h1>
              <div className="w-14 h-1 bg-[#2EA6D9] mb-7" />
              <p className="max-w-xl text-lg leading-relaxed text-[#5D5F63]">
                {lang === 'tr'
                  ? 'Tekstil prosesi, boyahane, kalite kontrol ve üretim yönetimi üzerine saha deneyimine dayalı teknik yayınlar ve notlar.'
                  : 'Technical notes and publications on textile process, dyehouse, quality control and production management.'}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-[#D8DEE8] bg-white shadow-[0_24px_70px_rgba(11,35,67,0.14)]">
              <img
                src="/images/blog-endustriyel-proses.jpg"
                alt={lang === 'tr' ? 'Tekstil proses ve endüstriyel altyapı görseli' : 'Textile process and industrial infrastructure visual'}
                className="h-[260px] md:h-[340px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061A33]/82 via-[#061A33]/45 to-[#061A33]/10" />
              <div className="absolute left-6 bottom-6 max-w-[82%] rounded-2xl bg-[#061A33]/94 px-5 py-4 shadow-2xl backdrop-blur-md border border-white/30">
                <p className="text-xs font-black tracking-[0.24em] drop-shadow-sm" style={{ color: '#FFFFFF' }}>BAHRİ BUDAK</p>
                <p className="mt-1 text-xl font-black drop-shadow-sm" style={{ color: '#FFFFFF' }}>Tekstil Teknik Yayınları</p>
                <p className="mt-2 text-sm leading-relaxed drop-shadow-sm" style={{ color: 'rgba(255,255,255,0.86)' }}>
                  Boyahane, proses, kalite ve teknik dokümantasyon notları.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap gap-3">
            <Link href={`/${lang}/blog`}
              className={`cat-badge border transition-all ${activeCategory === 'all' ? 'bg-[#0B2343] text-white border-[#0B2343]' : 'bg-white text-[#5D5F63] border-[#D8DEE8] hover:border-[#0B2343]'}`}>
              {t('cat.all')}
            </Link>
            {categories.map(cat => (
              <Link key={cat.slug} href={`/${lang}/blog?category=${cat.slug}`}
                className={`cat-badge border transition-all ${activeCategory === cat.slug ? 'bg-[#0B2343] text-white border-[#0B2343]' : 'bg-white text-[#5D5F63] border-[#D8DEE8] hover:border-[#0B2343]'}`}>
                {t(`cat.${cat.slug}` as any)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-[#5D5F63]">
            <p className="font-medium text-lg">
              {lang === 'tr' ? 'Bu kategoride henüz yazı yok.' : 'No posts in this category yet.'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
