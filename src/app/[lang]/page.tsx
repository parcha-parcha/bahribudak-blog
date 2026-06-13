import Link from 'next/link'
import Image from 'next/image'
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
    text: 'Boyahane, terbiye, apre, proses kontrol, maliyet ve verimlilik konularında saha temelli danışmanlık.',
    href: '/hizmetler',
  },
  {
    icon: '📘',
    title: 'Eğitim Notları',
    text: 'Pamuk, polyester, reaktif boyama, kasar, yıkama, laboratuvar ve proses reçeteleri için teknik içerik sistemi.',
    href: '/blog?category=tekstil',
  },
  {
    icon: '📂',
    title: 'Kurumsal Şablonlar',
    text: 'Teknik doküman, sunum, katalog, antetli evrak, sosyal medya ve kurumsal kimlik şablonları.',
    href: '/magazam',
  },
]

const identityBlocks = [
  { title: 'Logo Sistemi', desc: 'Amblem, yatay logo, dikey logo, negatif kullanım ve güvenli alan mantığı.' },
  { title: 'Renk Paleti', desc: 'Lacivert, füme gri, gümüş gri, açık zemin ve vurgu mavisi ile kurumsal görünüm.' },
  { title: 'Tipografi', desc: 'Başlık, gövde, tablo, teknik not ve sunumlarda tek tip okunabilir yazı sistemi.' },
  { title: 'Desen / Doku', desc: 'Tekstil lifini çağrıştıran sade arka plan, grid ve teknik yüzey dokuları.' },
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
        <div className="absolute inset-0 pointer-events-none bb-pattern opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-blue" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-12 items-center relative z-10">
          <div>
            <p className="section-label text-white/55 mb-4">BAHRİ BUDAK · TEKSTİL · EĞİTİM · DANIŞMANLIK</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Tekstil deneyimini kurumsal bilgiye dönüştüren yapı
            </h1>
            <p className="text-lg text-white/78 leading-relaxed mb-8 max-w-2xl">
              35 yıllık boyahane, terbiye ve fabrika yönetimi deneyimini; eğitim notları,
              teknik dokümanlar, kurumsal şablonlar ve uygulanabilir danışmanlık modeliyle paylaşıyorum.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={withLang('/hizmetler')} className="btn-primary">Hizmetleri İncele →</Link>
              <Link href={withLang('/magazam')} className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-full hover:border-accent-blue hover:text-accent-blue transition-all">
                Şablonları Gör
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl bg-white/95 p-6 shadow-2xl border border-white/20 mb-5">
              <BrandLogo className="h-20 w-full text-navy" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['35 yıl saha', 'Teknik eğitim', 'Kurumsal dosya', 'Uygulamalı danışmanlık'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 border border-white/15 p-4 text-sm font-semibold text-white/88">
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy">Üç ana çalışma alanı</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainAreas.map((area) => (
              <Link key={area.title} href={withLang(area.href)} className="group rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card hover:border-accent-blue transition-all">
                <div className="text-3xl mb-5">{area.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-blue transition-colors">{area.title}</h3>
                <p className="text-sm leading-relaxed text-navy/82">{area.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="section-label">KURUMSAL KİMLİK</p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5">Verdiğiniz kurumsal dosyaların site karşılığı</h2>
              <p className="text-navy/82 leading-relaxed mb-6">
                Logo, renk, tipografi, desen, ikon, kırtasiye, dijital kimlik, tanıtım materyali,
                kurumsal çevre ve iş kıyafeti dosyaları tek bir sistemin parçaları olarak ele alındı.
              </p>
              <Link href={withLang('/magazam')} className="btn-primary inline-flex">Şablon sistemini incele →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {identityBlocks.map((block) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy">49 dosyalık yapıya göre düzenlenen içerik omurgası</h2>
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

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-label">{t('blog.latestPosts')}</p>
            <h2 className="text-3xl font-bold text-navy dark:text-white">Teknik yayınlar ve notlar</h2>
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
          <div className="text-center py-20 text-gray-text dark:text-slate-400">
            <div className="text-5xl mb-4">✍️</div>
            <p className="font-medium">Yakında ilk yazı gelecek.</p>
          </div>
        )}
      </section>

      <section style={{ background: 'linear-gradient(135deg, #061A33 0%, #0B2343 100%)' }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="section-label text-white/50">İLETİŞİM</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Teknik dosya, eğitim veya danışmanlık için görüşelim.</h2>
            <p className="text-white/75 leading-relaxed max-w-2xl">Boyahane, tekstil prosesleri, kurumsal eğitim notları veya şablon sistemleri için ihtiyacınızı netleştirelim.</p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </>
  )
}
