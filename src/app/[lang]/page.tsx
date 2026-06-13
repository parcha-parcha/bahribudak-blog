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
    code: '01',
    title: 'Tekstil Proses Danışmanlığı',
    text: 'Boyahane, kasar, enzim, yıkama, reaktif boyama, laboratuvar ve proses kontrol alanlarında saha temelli destek.',
    href: '/hizmetler',
  },
  {
    code: '02',
    title: 'Teknik Eğitim Notları',
    text: 'Üretim ekipleri için uygulanabilir eğitim notları, proses açıklamaları ve kontrol mantığı.',
    href: '/blog?category=tekstil',
  },
  {
    code: '03',
    title: 'Teknik Doküman Sistemi',
    text: 'Proses formları, kontrol listeleri, teklif dosyaları, hesap tabloları ve sunum şablonları.',
    href: '/magazam',
  },
]

const documentBlocks = [
  { title: 'Tekstil Teknik Dokümanları', desc: 'Boyahane eğitim notları, proses formları, kontrol listeleri ve hesap tabloları.' },
  { title: 'Eğitim Dosyaları', desc: 'Kasar, boyama, yıkama, laboratuvar ve kalite kontrol için uygulanabilir eğitim içerikleri.' },
  { title: 'Proses Kontrol Formları', desc: 'Saha takibi, reçete kontrolü, analiz ve vardiya yönetimi için standart formlar.' },
  { title: 'Kurumsal Şablonlar', desc: 'Teklif, rapor, sunum, antetli evrak ve müşteri teslim dosyaları için standart yapı.' },
]

function NumberIcon({ value }: { value: string }) {
  return (
    <span className="bb-simple-icon inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-border bg-gray-soft text-sm font-black text-navy">
      {value}
    </span>
  )
}

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const allPosts = getAllPosts(lang)
  const textilePosts = allPosts.filter(post => post.category === 'tekstil')
  const otherPosts = allPosts.filter(post => post.category !== 'tekstil')
  const recentPosts = [...textilePosts, ...otherPosts].slice(0, 4)
  const withLang = (path: string) => `/${lang}${path}`

  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: '#061A33' }}>
        <div className="absolute inset-0 pointer-events-none bb-pattern opacity-35" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-blue" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative z-10">
          <div>
            <p className="section-label text-white/72 mb-4">BAHRİ BUDAK · TEKSTİL PROSES · EĞİTİM · DANIŞMANLIK</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.06] text-white max-w-3xl">
              Tekstil bilgisini uygulanabilir sisteme dönüştüren yapı
            </h1>
            <p className="text-lg md:text-xl text-white/86 leading-relaxed mb-8 max-w-2xl">
              35 yıllık boyahane, terbiye ve fabrika yönetimi deneyimini; proses danışmanlığı,
              teknik eğitim notları ve standart doküman sistemiyle paylaşıyorum.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={withLang('/hizmetler')} className="btn-primary">Hizmetleri İncele →</Link>
              <Link href={withLang('/blog?category=tekstil')} className="inline-flex items-center gap-2 border-2 border-white/35 text-white font-bold px-6 py-3 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all">
                Teknik Yazıları Gör
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-white p-7 shadow-2xl border border-white/20">
              <BrandLogo className="h-24 w-full text-navy" />
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Boyahane', 'Proses kontrol', 'Teknik eğitim'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/12 border border-white/18 p-4 text-sm font-bold text-white text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F6FA] text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p className="section-label">ANA YAPI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Tekstil merkezli üç net alan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <Link key={area.title} href={withLang(area.href)} className="group rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card hover:border-accent-blue transition-all">
                <div className="mb-5"><NumberIcon value={area.code} /></div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-blue transition-colors">{area.title}</h3>
                <p className="text-sm leading-relaxed text-navy/84">{area.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="section-label">TEKNİK YAYINLAR VE NOTLAR</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Öne çıkan tekstil teknik notları</h2>
            <p className="text-navy/75 mt-3 max-w-2xl">Boyahane, reaktif boyama, laboratuvar, kalite kontrol ve proses yönetimi üzerine saha temelli yazılar.</p>
          </div>
          <Link href={withLang('/blog?category=tekstil')} className="btn-outline text-sm self-start md:self-auto">
            Tüm Tekstil Yazıları
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-text">
            <p className="font-medium">Yakında ilk yazı gelecek.</p>
          </div>
        )}
      </section>

      <section className="bg-white text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <p className="section-label">KULLANILABİLİR DOKÜMAN OMURGASI</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Teknik bilgi aynı standartta toplanır</h2>
              <p className="text-navy/82 leading-relaxed mb-6">
                Eğitim notları, proses formları, kontrol listeleri ve kurumsal şablonlar aynı sade kimlik diliyle hazırlanır.
              </p>
              <Link href={withLang('/magazam')} className="btn-primary inline-flex">Doküman sistemini incele →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documentBlocks.map((block, index) => (
                <div key={block.title} className="rounded-2xl bg-[#F3F6FA] border border-gray-border p-5">
                  <div className="text-xs font-black text-accent-blue tracking-[.16em] mb-3">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-navy mb-2">{block.title}</h3>
                  <p className="text-sm text-navy/80 leading-relaxed">{block.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #061A33 0%, #0B2343 100%)' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="section-label text-white/60">İLETİŞİM</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Teknik dosya, eğitim veya danışmanlık için görüşelim.</h2>
            <p className="text-white/78 leading-relaxed max-w-2xl">Boyahane, tekstil prosesleri, kurumsal eğitim notları veya şablon sistemleri için ihtiyacınızı netleştirelim.</p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </>
  )
}
