import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BrandLogo from '@/components/BrandLogo'
import { getAllPosts } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'

interface HomeProps {
  params: Promise<{ lang: Lang }>
}

const focusAreas = [
  {
    no: '01',
    title: 'Boyahane proses danışmanlığı',
    text: 'Kasar, reaktif boyama, yıkama, reçete standardı ve makine verimini sahadaki gerçek akışa göre düzenler.',
    href: '/hizmetler',
  },
  {
    no: '02',
    title: 'Teknik eğitim notları',
    text: 'Operatör, vardiya amiri, laboratuvar ve yönetim ekipleri için uygulanabilir, sade ve ölçülebilir eğitim içerikleri üretir.',
    href: '/blog?category=tekstil',
  },
  {
    no: '03',
    title: 'Doküman ve kontrol sistemi',
    text: 'Proses formları, kontrol listeleri, teknik raporlar, teklif dosyaları ve müşteri teslim dokümanlarını tek standarda bağlar.',
    href: '/magazam',
  },
]

const processSteps = [
  {
    no: '01',
    title: 'Mevcut süreci okuma',
    text: 'Kasar, boya, yıkama, laboratuvar, kalite ve maliyet akışı birlikte değerlendirilir.',
  },
  {
    no: '02',
    title: 'Standart reçete ve kontrol dili',
    text: 'Saha bilgisi; pH, sıcaklık, süre, kimyasal, tekrar işlem ve kontrol formlarına bağlanır.',
  },
  {
    no: '03',
    title: 'Eğitim ve uygulanabilir doküman',
    text: 'Bilgi; operatör, laboratuvar ve yönetim ekiplerinin kullanacağı sade dosyalara dönüştürülür.',
  },
]

const metricCards = [
  { value: '35+', label: 'yıl saha deneyimi', text: 'Boyahane, terbiye ve fabrika yönetimi.' },
  { value: '3', label: 'ana odak', text: 'Proses, eğitim ve teknik dokümantasyon.' },
  { value: '01', label: 'öncelik', text: 'Tekstil teknik içerikleri ve uygulanabilir bilgi.' },
]

const documentBlocks = [
  { no: '01', title: 'Tekstil teknik dokümanları', desc: 'Boyahane eğitim notları, proses formları, reçete kontrolleri, maliyet ve kalite tabloları.' },
  { no: '02', title: 'Proses kontrol formları', desc: 'Kasar, boya, yıkama, laboratuvar, su, tuz, pH, haslık ve tekrar işlem takip formları.' },
  { no: '03', title: 'Eğitim dosyaları', desc: 'Operatör, vardiya, laboratuvar, kalite ve yönetim ekipleri için bölüm bazlı eğitim notları.' },
  { no: '04', title: 'Teklif ve sunum dosyaları', desc: 'Makine, proses, proje, yatırım ve müşteri sunumu için okunabilir teknik dosya yapısı.' },
]

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const allPosts = getAllPosts(lang)
  const textilePosts = allPosts.filter(post => post.category === 'tekstil')
  const otherPosts = allPosts.filter(post => post.category !== 'tekstil')
  const recentPosts = [...textilePosts, ...otherPosts].slice(0, 3)
  const withLang = (path: string) => `/${lang}${path}`

  return (
    <>
      <section className="relative overflow-hidden bg-[#F4F1EE] text-navy">
        <div className="absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-accent-blue/12 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="relative z-10">
            <p className="section-label mb-5">BAHRİ BUDAK • TEKSTİL PROSES DANIŞMANLIĞI</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] md:leading-[0.98] tracking-[-0.05em] md:tracking-[-0.055em] text-navy max-w-4xl">
              Tekstil proses bilgisini ölçülebilir sisteme dönüştürüyorum.
            </h1>
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-navy/78 max-w-2xl">
              Boyahane, terbiye, kalite kontrol ve teknik dokümantasyon alanlarında 35 yıllık saha deneyimine dayalı uygulanabilir çözümler.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={withLang('/hizmetler')} className="btn-primary">Hizmetleri İncele →</Link>
              <Link href={withLang('/blog?category=tekstil')} className="btn-outline">Teknik Notları Gör</Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[34px] bg-white border border-gray-border shadow-xl overflow-hidden">
              <div className="relative h-[300px] sm:h-[380px] lg:h-[520px] bg-[#F8FAFC]">
                <img
                  src="/images/hero-su-damlasi.jpg"
                  alt="Tekstil proseslerinde su, kimya ve kontrollü üretim dengesi"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/15 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 rounded-3xl bg-white/94 backdrop-blur border border-white shadow-xl p-4 md:left-5 md:right-5 md:bottom-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                    <BrandLogo className="h-10 md:h-14 w-40 md:w-44 text-navy" />
                    <span className="inline-flex w-fit rounded-full bg-[#F3F6FA] px-4 py-2 text-[11px] md:text-xs font-bold text-navy/70 tracking-[0.18em] uppercase">Tekstil Proses</span>
                  </div>
                  <div className="hidden md:grid grid-cols-3 gap-3 mt-4">
                    {['Boyahane', 'Terbiye', 'Kalite'].map((item, index) => (
                      <div key={item} className="rounded-2xl border border-gray-border bg-white p-4">
                        <p className="text-xs text-accent-blue font-black mb-1">0{index + 1}</p>
                        <p className="text-sm font-bold text-navy leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div className="rounded-[34px] bg-[#061A33] text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bb-pattern opacity-30" />
            <div className="relative">
              <p className="section-label text-white/55 mb-5">SAHA DENEYİMİ</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                Teori değil, üretim sahasında karşılığı olan bilgi.
              </h2>
              <p className="text-white/75 leading-relaxed">
                Amaç; dağınık saha bilgisini reçete, kontrol formu, eğitim notu ve yönetilebilir teknik dosya sistemine dönüştürmektir.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metricCards.map((card) => (
              <div key={card.label} className="rounded-[28px] border border-gray-border bg-[#F3F6FA] p-6 min-h-[210px] flex flex-col justify-between">
                <div className="text-5xl font-bold text-accent-blue tracking-[-0.04em]">{card.value}</div>
                <div>
                  <h3 className="font-bold text-navy mb-2">{card.label}</h3>
                  <p className="text-sm text-navy/70 leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F1EE] text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="section-label">TEKNİK YAYINLAR VE NOTLAR</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-navy max-w-3xl">
                Sahadan gelen tekstil teknik içerikleri.
              </h2>
            </div>
            <Link href={withLang('/blog?category=tekstil')} className="btn-outline self-start md:self-auto">
              Tüm Teknik Notlar →
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-text bg-white rounded-[28px] border border-gray-border">
              <p className="font-medium">Yakında ilk teknik not yayınlanacak.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24">
          <div className="mb-12">
            <p className="section-label">ÇALIŞMA ALANLARI</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-navy max-w-3xl">
              Danışmanlık, eğitim ve teknik doküman aynı sistemde birleşir.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <Link key={area.no} href={withLang(area.href)} className="group rounded-[30px] bg-[#F3F6FA] border border-gray-border p-7 hover:border-accent-blue transition-all">
                <div className="h-16 w-16 rounded-full bg-navy text-white flex items-center justify-center text-lg font-bold mb-8 group-hover:bg-accent-blue transition-colors">
                  {area.no}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4 tracking-[-0.03em]">{area.title}</h3>
                <p className="leading-relaxed text-navy/74">{area.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F1EE] text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <p className="section-label">DOKÜMAN SİSTEMİ</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-navy mb-6">
              Kullanılabilir teknik dosya omurgası.
            </h2>
            <p className="text-navy/76 leading-relaxed mb-8">
              Teknik bilgi; eğitim, kontrol, teklif, rapor ve müşteri teslim dokümanı olarak aynı standartta yönetilebilir hale gelir.
            </p>
            <Link href={withLang('/magazam')} className="btn-primary inline-flex">Şablonları İncele →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {documentBlocks.map((block) => (
              <div key={block.title} className="rounded-[28px] bg-white border border-gray-border p-6 min-h-[190px]">
                <p className="text-xs font-black text-accent-blue tracking-[0.24em] mb-4">{block.no}</p>
                <h3 className="text-xl font-bold text-navy mb-3 tracking-[-0.02em]">{block.title}</h3>
                <p className="text-sm text-navy/72 leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="section-label text-white/45">İLETİŞİM</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-5 text-white">
              Tekstil prosesleri için uygulanabilir bir sistem kuralım.
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl">
              Boyahane, kalite kontrol, eğitim notları veya teknik doküman standardı ihtiyacınızı birlikte netleştirelim.
            </p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </>
  )
}
