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
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-10 items-center">
            <div>
              <p className="section-label text-[#5D5F63]">{t('blog.allPosts')}</p>
              <h1 className="mt-3 mb-5 text-5xl md:text-6xl font-bold tracking-tight text-[#0B2343]">
                {t('nav.blog')}
              </h1>
              <div className="w-16 h-1 bg-[#2EA6D9] mb-7" />
              <p className="max-w-xl text-lg leading-relaxed text-[#5D5F63]">
                {lang === 'tr'
                  ? 'Boyahane, terbiye, kalite kontrol, üretim yönetimi ve teknik dokümantasyon üzerine saha deneyimine dayalı yayınlar.'
                  : 'Field-based publications on dyehouse, finishing, quality control, production management and technical documentation.'}
              </p>
            </div>

            <div className="relative min-h-[310px] overflow-hidden rounded-[34px] border border-[#D8DEE8] bg-[#061A33] shadow-[0_24px_70px_rgba(11,35,67,0.18)]">
              <img
                src="/images/blog-endustriyel-proses.jpg"
                alt={lang === 'tr' ? 'Tekstil proses ve endüstriyel altyapı görseli' : 'Textile process and industrial infrastructure visual'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061A33]/92 via-[#061A33]/68 to-[#061A33]/35" />
              <div className="absolute inset-0 bg-[#061A33]/18" />
              <div className="relative z-10 flex min-h-[310px] items-end p-6 md:p-8">
                <div className="max-w-[620px] rounded-[26px] border border-white/24 bg-[#061A33]/88 px-6 py-5 shadow-2xl backdrop-blur-md">
                  <p className="text-xs font-black tracking-[0.28em] text-white/86">
                    BAHRİ BUDAK
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-black leading-tight text-white">
                    Tekstil Teknik Yayınları
                  </h2>
                  <p className="mt-3 max-w-lg text-sm md:text-base leading-relaxed text-white/90">
                    Boyahane prosesleri, kalite kontrol, reçete standardizasyonu ve teknik doküman sistemi üzerine uygulanabilir saha notları.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/blog`}
              className={`cat-badge border transition-all ${activeCategory === 'all' ? 'bg-[#0B2343] text-white border-[#0B2343]' : 'bg-white text-[#5D5F63] border-[#D8DEE8] hover:border-[#0B2343]'}`}
            >
              {t('cat.all')}
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/${lang}/blog?category=${cat.slug}`}
                className={`cat-badge border transition-all ${activeCategory === cat.slug ? 'bg-[#0B2343] text-white border-[#0B2343]' : 'bg-white text-[#5D5F63] border-[#D8DEE8] hover:border-[#0B2343]'}`}
              >
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
