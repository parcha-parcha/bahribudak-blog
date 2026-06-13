import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BrandLogo from '@/components/BrandLogo'
import { getAllPosts } from '@/lib/posts'
import { useTranslations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface HomeProps {
  params: Promise<{ lang: Lang }>
}

const serviceCards = [
  {
    no: '01',
    title: 'Boyahane Proses Danışmanlığı',
    text: 'Kasar, reaktif boyama, yıkama, reçete standardı, makine verimi ve proses kontrol adımlarının sahaya uygun hale getirilmesi.',
    href: '/hizmetler',
  },
  {
    no: '02',
    title: 'Teknik Eğitim Notları',
    text: 'Operatör, vardiya amiri, laboratuvar ve yönetim ekipleri için sade, ölçülebilir ve uygulanabilir eğitim içerikleri.',
    href: '/blog?category=tekstil',
  },
  {
    no: '03',
    title: 'Doküman ve Kontrol Sistemi',
    text: 'Proses formları, kontrol listeleri, teknik raporlar, teklif dosyaları ve müşteri teslim dokümanları için standart yapı.',
    href: '/magazam',
  },
]

const documentBlocks = [
  { no: '01', title: 'Tekstil Teknik Dokümanları', desc: 'Boyahane eğitim notları, proses formları, reçete kontrolleri, maliyet ve kalite tabloları.' },
  { no: '02', title: 'Proses Kontrol Formları', desc: 'Kasar, boya, yıkama, laboratuvar, su, tuz, pH, haslık ve tekrar işlem takip formları.' },
  { no: '03', title: 'Eğitim Dosyaları', desc: 'Operatör, vardiya, laboratuvar, kalite ve yönetim ekipleri için bölüm bazlı eğitim notları.' },
  { no: '04', title: 'Teklif ve Sunum Dosyaları', desc: 'Makine, proses, proje, yatırım ve müşteri sunumu için okunabilir teknik dosya yapısı.' },
  { no: '05', title: 'Kurumsal Evrak Şablonları', desc: 'Kartvizit, antetli kağıt, zarf, cepli dosya, bloknot ve müşteri teslim evrakları.' },
  { no: '06', title: 'Dijital Yayın Şablonları', desc: 'LinkedIn, blog, e-posta imzası, sunum kapağı ve teknik not görsel standartları.' },
]

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const t = useTranslations(lang)
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
            <p className="section-label text-white/70 mb-4">TEKSTİL PROSES DANIŞMANLIĞI</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.06] text-white max-w-3xl">
              Boyahane deneyimini ölçülebilir teknik sisteme dönüştürüyorum.
            </h1>
            <p className="text-lg md:text-xl text-white/86 leading-relaxed mb-8 max-w-2xl">
              Kasar, reaktif boyama, yıkama, laboratuvar, kalite kontrol, maliyet ve proses verimliliği için saha deneyimine dayalı danışmanlık, eğitim ve dokümantasyon yapısı.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={withLang('/hizmetler')} className="btn-primary">Hizmetleri İncele →</Link>
              <Link href={withLang('/blog?category=tekstil')} className="inline-flex items-center gap-2 border-2 border-white/35 text-white font-bold px-6 py-3 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all">
                Teknik Notları Gör
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-white p-7 shadow-2xl border border-white/20">
              <BrandLogo className="h-24 w-full text-navy" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {['Proses', 'Eğitim', 'Doküman'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 border border-white/18 p-4 text-sm font-bold text-white text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="section-label">TEKNİK YAYINLAR VE NOTLAR</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Öne çıkan tekstil teknik içerikleri</h2>
            <p className="mt-4 text-navy/78 max-w-2xl leading-relaxed">
              Site girişinde öncelik tekstil içeriklerinde. Teknik notlar; sahada uygulanabilir bilgi, proses kontrolü ve işletme deneyimi üzerine kuruludur.
            </p>
          </div>
          <Link href={withLang('/blog?category=tekstil')} className="btn-outline text-sm self-start md:self-auto">
            Tüm Teknik Notlar →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-text">
            <p className="font-medium">Yakında ilk teknik not yayınlanacak.</p>
          </div>
        )}
      </section>

      <section className="bg-[#F3F6FA] text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p className="section-label">HİZMET ODAĞI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Tekstil merkezli üç ana çalışma alanı</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceCards.map((area) => (
              <Link key={area.no} href={withLang(area.href)} className="group rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card hover:border-accent-blue transition-all">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent-blue/40 text-accent-blue font-black tracking-wider">
                  {area.no}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-blue transition-colors">{area.title}</h3>
                <p className="text-sm leading-relaxed text-navy/84">{area.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <p className="section-label">KULLANILABİLİR DOKÜMAN OMURGASI</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Teknik bilgiyi dosya standardına bağlayan yapı</h2>
              <p className="text-navy/82 leading-relaxed mb-6">
                Amaç; tekstil bilgisini dağınık notlardan çıkarıp eğitim, kontrol, teklif, rapor ve müşteri teslim dokümanı olarak aynı standartta yönetmektir.
              </p>
              <Link href={withLang('/magazam')} className="btn-primary inline-flex">Şablonları İncele →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documentBlocks.slice(0, 4).map((block) => (
                <div key={block.title} className="rounded-2xl bg-[#F3F6FA] border border-gray-border p-5">
                  <p className="text-xs font-black text-accent-blue tracking-[0.18em] mb-2">{block.no}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Tekstil prosesleri ve teknik dokümanlar için görüşelim.</h2>
            <p className="text-white/78 leading-relaxed max-w-2xl">Boyahane, kalite kontrol, eğitim notları veya doküman standardı ihtiyacınızı birlikte netleştirelim.</p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </>
  )
}
