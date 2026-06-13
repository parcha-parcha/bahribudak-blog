import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BrandLogo from '@/components/BrandLogo'
import { getAllPosts } from '@/lib/posts'
import { useTranslations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface HomeProps {
  params: Promise<{ lang: Lang }>
}

const mainAreas = [
  {
    icon: '🧵',
    title: 'Tekstil Danışmanlığı',
    text: 'Boyahane, terbiye, proses kontrol, maliyet ve verimlilik için saha temelli destek.',
    href: '/hizmetler',
  },
  {
    icon: '📘',
    title: 'Eğitim Notları',
    text: 'Kasar, enzim, reaktif boyama, yıkama, laboratuvar ve reçete hesapları için teknik kaynaklar.',
    href: '/blog?category=tekstil',
  },
  {
    icon: '📂',
    title: 'Kurumsal Şablonlar',
    text: 'Teklif, sunum, eğitim dosyası, sosyal medya ve kurumsal doküman şablonları.',
    href: '/magazam',
  },
]

const templateBlocks = [
  { title: 'Kırtasiye Seti', desc: 'Kartvizit, antetli kağıt, devam kağıdı, zarf, cepli dosya ve bloknot.' },
  { title: 'Dijital Kimlik', desc: 'E-posta imzası, LinkedIn banner, sosyal medya post/story ve sunum kapakları.' },
  { title: 'Tanıtım & Pazarlama', desc: 'Katalog, broşür, sertifika, teşekkür belgesi, roll-up, poster ve promosyon yüzeyleri.' },
  { title: 'Kurumsal Çevre', desc: 'Tabela, yönlendirme, kapı isimliği, yaka kartı, araç giydirme ve iç mekân uygulamaları.' },
  { title: 'İş Kıyafetleri', desc: 'T-shirt, polo yaka, iş önlüğü, polar mont, yelek, şapka ve kask logo yerleşimi.' },
  { title: 'Teknik Dokümanlar', desc: 'Boyahane eğitim notları, proses formları, kontrol listeleri ve sunum dosyaları.' },
]

export default async function HomePage({ params }: HomeProps) {
  const { lang } = await params
  const t = useTranslations(lang)
  const recentPosts = getAllPosts(lang).slice(0, 4)
  const withLang = (path: string) => `/${lang}${path}`

  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: '#061A33' }}>
        <div className="absolute inset-0 pointer-events-none bb-pattern opacity-45" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-blue" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative z-10">
          <div>
            <p className="section-label text-white/70 mb-4">BAHRİ BUDAK · TEKSTİL · EĞİTİM · DANIŞMANLIK</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.06] text-white max-w-3xl">
              Tekstil danışmanlığı ve teknik eğitim dokümanları
            </h1>
            <p className="text-lg md:text-xl text-white/86 leading-relaxed mb-8 max-w-2xl">
              35 yıllık boyahane, terbiye ve fabrika yönetimi deneyimini; uygulanabilir eğitim notları,
              kurumsal şablonlar ve teknik danışmanlık dosyalarıyla paylaşıyorum.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={withLang('/hizmetler')} className="btn-primary">Hizmetleri İncele →</Link>
              <Link href={withLang('/magazam')} className="inline-flex items-center gap-2 border-2 border-white/35 text-white font-bold px-6 py-3 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all">
                Şablonları Gör
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-white p-7 shadow-2xl border border-white/20">
              <BrandLogo className="h-24 w-full text-navy" />
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['35 yıl saha deneyimi', 'Teknik eğitim', 'Kurumsal dosya sistemi'].map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy">İlk bakışta üç net alan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainAreas.map((area) => (
              <Link key={area.title} href={withLang(area.href)} className="group rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card hover:border-accent-blue transition-all">
                <div className="text-3xl mb-5">{area.icon}</div>
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
              <p className="section-label">KURUMSAL SİSTEM</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Logo, renk ve şablonlar tek sistemde</h2>
              <p className="text-navy/82 leading-relaxed mb-6">
                Kurumsal kimlik, kırtasiye, dijital yayın, tanıtım materyali, saha uygulaması ve teknik dokümanlar aynı görsel dil altında toplandı.
              </p>
              <Link href={withLang('/magazam')} className="btn-primary inline-flex">Şablon sistemini incele →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templateBlocks.slice(0, 4).map((block) => (
                <div key={block.title} className="rounded-2xl bg-[#F3F6FA] border border-gray-border p-5">
                  <h3 className="font-bold text-navy mb-2">{block.title}</h3>
                  <p className="text-sm text-navy/80 leading-relaxed">{block.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F6FA] text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p className="section-label">ŞABLON VE DOKÜMAN SETLERİ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Kullanılabilir doküman omurgası</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {templateBlocks.map((block) => (
              <div key={block.title} className="rounded-2xl bg-white border border-gray-border p-6 shadow-sm">
                <h3 className="font-bold text-navy mb-2">{block.title}</h3>
                <p className="text-sm text-navy/82 leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">{t('blog.latestPosts')}</p>
            <h2 className="text-3xl font-bold text-navy">Teknik yayınlar ve notlar</h2>
          </div>
          <Link href={withLang('/blog')} className="btn-outline text-sm">
            {lang === 'tr' ? 'Tümünü Gör' : 'View All'}
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map(post => <PostCard key={post.slug} post={post} lang={lang} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-text">
            <div className="text-5xl mb-4">✍️</div>
            <p className="font-medium">Yakında ilk yazı gelecek.</p>
          </div>
        )}
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
