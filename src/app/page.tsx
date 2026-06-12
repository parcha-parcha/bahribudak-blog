import Link from 'next/link'
import Image from 'next/image'
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
  const recentPosts = getAllPosts(lang).slice(0, 4)

  const services = [
    {
      category: lang === 'tr' ? 'Tekstil Danışmanlığı' : 'Textile Consulting',
      emoji: '🧵',
      items: lang === 'tr'
        ? [
            'Boyahane & terbiye proses yönetimi',
            'Fabrika & işletme yönetimi',
            'Proses optimizasyonu & verimlilik analizi',
            'Maliyet kontrolü & kriz yönetimi',
            'Vardiya organizasyonu',
          ]
        : [
            'Dyehouse & finishing process management',
            'Factory & plant management',
            'Process optimization & efficiency analysis',
            'Cost control & crisis management',
            'Shift organization',
          ],
    },
    {
      category: lang === 'tr' ? 'Görsel İçerik Tasarımı' : 'Visual Content Design',
      emoji: '🎨',
      items: lang === 'tr'
        ? [
            'Tekstil katalog tasarımı (InDesign)',
            'Marka kimliği & logo (Illustrator)',
            'Ürün görseli düzenleme (Photoshop)',
            'Dergi & broşür tasarımı',
          ]
        : [
            'Textile catalog design (InDesign)',
            'Brand identity & logo (Illustrator)',
            'Product image editing (Photoshop)',
            'Magazine & brochure design',
          ],
    },
    {
      category: lang === 'tr' ? 'İçerik & Blog' : 'Content & Blog',
      emoji: '✍️',
      items: lang === 'tr'
        ? [
            'LinkedIn içerik yönetimi',
            'Sektörel blog yazarlığı',
            'Tekstil teknik içerik üretimi',
            'Kişisel marka danışmanlığı',
          ]
        : [
            'LinkedIn content management',
            'Sectoral blog writing',
            'Textile technical content production',
            'Personal brand consulting',
          ],
    },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO  (her zaman koyu — dokunulmadı)
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white" style={{background: '#08080c', minHeight: '380px'}}>
        <div className="absolute inset-0 pointer-events-none">
          {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${i * 6}%`,
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04), transparent)',
                transform: `skewX(-15deg)`,
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-bb" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-bb" />

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <p className="section-label text-white/40 mb-4">{t('hero.greeting')}</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight text-white">{t('hero.name')}</h1>
            <div className="flex items-center gap-4 my-6">
              <div className="h-0.5 w-12 bg-yellow-bb" />
              <span className="text-sm font-medium text-white/60">
                {lang === 'tr'
                  ? 'Tekstil, boyahane ve üretim yönetimi üzerine uygulamalı bilgiler'
                  : 'Practical knowledge on textile, dyehouse and production management'}
              </span>
            </div>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">{t('hero.description')}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/blog`} className="btn-primary">
                {t('hero.cta')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-full hover:border-yellow-bb hover:text-yellow-bb transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="relative flex-shrink-0 hidden md:block">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-yellow-bb/40 rounded-2xl" />
              <Image
                src="/images/bahri-budak.jpeg"
                alt="Bahri Budak"
                fill
                className="object-cover object-top rounded-2xl"
                priority
              />
              <div className="absolute inset-0 rounded-2xl" style={{background: 'linear-gradient(to top, rgba(8,8,12,0.4) 0%, transparent 50%)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. SON YAZILAR
      ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">{t('blog.latestPosts')}</p>
            <h2 className="text-3xl font-bold text-navy dark:text-white">{t('blog.allPosts')}</h2>
          </div>
          <Link href={`/${lang}/blog`} className="btn-outline text-sm">
            {lang === 'tr' ? 'Tümünü Gör' : 'View All'}
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-text dark:text-slate-400">
            <div className="text-5xl mb-4">✍️</div>
            <p className="font-medium">{lang === 'tr' ? 'Yakında ilk yazı gelecek.' : 'First post coming soon.'}</p>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          3. KATEGORİLER  (her zaman koyu — dokunulmadı)
      ═══════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #08080c 0%, #0f1a3a 100%)", borderBottom: "1px solid rgba(245,197,24,0.1)" }}>
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

      {/* ═══════════════════════════════════════════
          4. HİZMETLER
      ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-border dark:bg-surface-dark dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="section-label mb-2">{lang === 'tr' ? 'Ne Yapabilirim?' : 'What I Can Do'}</p>
            <h2 className="text-3xl font-bold text-navy mb-4 dark:text-white">
              {lang === 'tr' ? '35 Yıllık Saha Deneyimi + Dijital Yetkinlik' : '35 Years Field Experience + Digital Skills'}
            </h2>
            <p className="text-gray-text max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
              {lang === 'tr'
                ? 'Boyahane ve terbiye proseslerinden fabrika yönetimine, dijital tasarımdan içerik üretimine uzanan geniş bir hizmet yelpazesi.'
                : 'A wide range of services from dyehouse processes to factory management, digital design to content production.'}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-8 h-0.5 bg-yellow-bb" />
              <div className="w-2 h-0.5 bg-navy/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.category} className="bg-white rounded-2xl border border-gray-border p-8 hover:border-navy hover:shadow-card transition-all group dark:bg-surface-dark-2 dark:border-white/10 dark:hover:border-yellow-bb/40">
                <div className="text-4xl mb-4">{service.emoji}</div>
                <div className="w-8 h-1 bg-yellow-bb mb-4 group-hover:w-12 transition-all" />
                <h3 className="text-lg font-bold text-navy mb-5 dark:text-white">{service.category}</h3>
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-text leading-relaxed dark:text-slate-300">
                      <span className="text-yellow-bb mt-0.5 flex-shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${lang}/contact`} className="btn-primary">
              {lang === 'tr' ? 'İletişime Geç' : 'Get In Touch'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. HAKKIMDA  (her zaman koyu — dokunulmadı)
      ═══════════════════════════════════════════ */}
      <section style={{ background: '#08080c' }} className="border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="flex flex-col md:flex-row items-center gap-10 mb-14">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#1a3a5c', border: '2px solid rgba(245,197,24,0.3)' }}>
              <span className="text-white text-xl font-bold tracking-wide">BB</span>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f5c518' }}>
                {lang === 'tr' ? 'Hakkımda' : 'About Me'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {lang === 'tr'
                  ? 'Tekstil yöneticisinden içerik üreticisine'
                  : 'From textile manager to content creator'}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                {lang === 'tr'
                  ? 'Ergene/Tekirdağ tekstil havzasında boyahane, terbiye ve fabrika yönetimi alanlarında edindiğim 35 yıllık birikimi; felsefe, gündem ve kişisel gelişim yazılarıyla harmanlıyorum.'
                  : 'I blend 35 years of dyehouse, finishing and factory management experience in the Ergene/Tekirdağ textile region with writing on philosophy, current affairs and self-development.'}
              </p>
              <Link href={`/${lang}/about`}
                className="inline-flex items-center gap-1.5 text-sm font-bold mt-4 hover:underline underline-offset-4"
                style={{ color: '#f5c518' }}>
                {lang === 'tr' ? 'Daha fazlası →' : 'Learn more →'}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '35', unit: lang === 'tr' ? 'Yıl' : 'Years', label: lang === 'tr' ? 'Tekstil Deneyimi' : 'Textile Experience' },
              { number: '10+', unit: lang === 'tr' ? 'Şirket' : 'Companies', label: lang === 'tr' ? 'Yönetici Rolü' : 'Management Role' },
              { number: '4', unit: lang === 'tr' ? 'Kategori' : 'Categories', label: lang === 'tr' ? 'İçerik Alanı' : 'Content Area' },
              { number: 'GMY', unit: '', label: lang === 'tr' ? 'Genel Müdür Yardımcılığı' : 'Deputy General Manager' },
            ].map((stat) => (
              <div key={stat.label}
                className="rounded-xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold" style={{ color: '#f5c518' }}>{stat.number}</span>
                  {stat.unit && <span className="text-lg font-semibold text-white/60 mb-1">{stat.unit}</span>}
                </div>
                <p className="text-xs text-white/40 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
