import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'
import BBHomeLogoCard from '@/components/BBHomeLogoCard'

interface HomeProps {
  params: Promise<{ lang: Lang }>
}

const focusAreas = [
  {
    no: '01',
    id: 'orgu',
    title: 'Örgü / Knitting',
    text: 'İplik-kumaş ilişkisi, makine inceliği / gauge, gramaj, ilmek boyu, elastan besleme ve örme kaynaklı kalite risklerini birlikte değerlendirir.',
  },
  {
    no: '02',
    id: 'boya',
    title: 'Boya / Dyeing',
    text: 'Ön terbiye / pretreatment, boyama / dyeing, yıkama / washing, reçete standardı ve HT jet proses kontrolünü ölçülebilir hâle getirir.',
  },
  {
    no: '03',
    id: 'apre',
    title: 'Apre / Finishing',
    text: 'Ramöz / stenter, kompaktör / compactor, fikse / heat setting ve kimyasal apre adımlarında en-boy, gramaj, tuşe ve stabiliteyi yönetir.',
  },
]

const processSteps = [
  {
    no: '01',
    title: 'Üretim zincirini okuma',
    text: 'Örgü, ön terbiye, boya, yıkama, apre, laboratuvar ve kalite akışı birlikte değerlendirilir.',
  },
  {
    no: '02',
    title: 'Standart proses ve kontrol dili',
    text: 'Saha bilgisi; ilmek boyu, gramaj, pH, sıcaklık, süre, kimyasal, en-boy ve kontrol formlarına bağlanır.',
  },
  {
    no: '03',
    title: 'Eğitim ve uygulanabilir doküman',
    text: 'Bilgi; örme, boyahane, apre, laboratuvar ve yönetim ekiplerinin kullanacağı sade dosyalara dönüştürülür.',
  },
]

const metricCards = [
  { value: '35+', label: 'yıl saha deneyimi', text: 'Örgü, boya, apre ve fabrika yönetimi.' },
  { value: '3', label: 'ana odak', text: 'Örgü / Knitting, Boya / Dyeing, Apre / Finishing.' },
  { value: '01', label: 'öncelik', text: 'Kanıtlanabilir, ölçülebilir ve uygulanabilir teknik bilgi.' },
]

const documentBlocks = [
  { no: '01', title: 'Tekstil teknik dokümanları', desc: 'Örgü, boya ve apre eğitim notları; proses formları, reçete kontrolleri, maliyet ve kalite tabloları.' },
  { no: '02', title: 'Proses kontrol formları', desc: 'Örgü ayarları, boya-yıkama, laboratuvar, ramöz, kompaktör, pH, haslık ve ölçü stabilitesi takip formları.' },
  { no: '03', title: 'Eğitim dosyaları', desc: 'Örme, boyahane, apre, laboratuvar, kalite ve yönetim ekipleri için bölüm bazlı eğitim notları.' },
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
      <section className="relative overflow-hidden bg-[#061A33] text-white min-h-[500px] md:min-h-[520px] flex items-start">
        <img
          src="/images/hero-su-damlasi.jpg"
          alt="Tekstil proseslerinde su, kimya ve kontrollü üretim dengesi"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A33] via-[#061A33]/82 to-[#061A33]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A33]/70 via-transparent to-[#061A33]/30" />
        <div className="absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-accent-blue/20 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-8 md:py-10 lg:grid-cols-[minmax(0,1.42fr)_minmax(250px,0.48fr)] lg:py-9">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/16 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/95 shadow-sm">BAHRİ BUDAK • ÖRGÜ / BOYA / APRE</p>
            <h1 className="max-w-[820px] text-4xl font-bold leading-[1.01] tracking-[-0.045em] text-white sm:text-5xl md:text-[52px] lg:text-[54px] xl:text-[56px] 2xl:text-[64px]">
              Örgü, boya ve apre bilgisini ölçülebilir üretim sistemine dönüştürüyorum.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-[16px]">
              Örgü / Knitting, Boya / Dyeing ve Apre / Finishing süreçlerinde 35 yılı aşkın saha deneyimine dayalı teknik yayın, eğitim ve uygulanabilir proses çözümleri.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${lang}#uzmanlik`} className="btn-primary">Uzmanlık Alanlarını İncele →</Link>
              <Link href={withLang('/blog?category=tekstil')} className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 font-bold text-white hover:bg-white hover:text-navy transition-colors">Teknik Notları Gör</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[250px] sm:max-w-[270px] lg:mx-0 lg:justify-self-end">
            <BBHomeLogoCard />
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
                Üretim zincirinin tamamında karşılığı olan teknik bilgi.
              </h2>
              <p className="text-white/75 leading-relaxed">
                Amaç; örgüden başlayıp boya ve apre ile tamamlanan saha bilgisini ölçüm, reçete, kontrol formu, eğitim notu ve yönetilebilir teknik dosya sistemine dönüştürmektir.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metricCards.map((card) => (
              <div key={card.label} className="rounded-[28px] border border-gray-border p-6 min-h-[210px] flex flex-col justify-between">
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

      <section id="uzmanlik" className="scroll-mt-24 bg-white text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24">
          <div className="mb-12">
            <p className="section-label">UZMANLIK OMURGASI</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-navy max-w-3xl">
              Örgü, boya ve apre aynı üretim zincirinde yönetilir.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <article
                id={area.id}
                key={area.no}
                className="scroll-mt-28 rounded-[30px] border border-gray-border p-7 transition-all hover:border-accent-blue"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                  {area.no}
                </div>
                <h3 className="mb-4 text-2xl font-bold tracking-[-0.03em] text-navy">{area.title}</h3>
                <p className="leading-relaxed text-navy/74">{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F1EE] text-navy">
        <div className="max-w-7xl mx-auto px-6 py-18 md:py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <p className="section-label">DOKÜMAN SİSTEMİ</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-navy mb-6">
              Örgü, boya ve apre için teknik dosya omurgası.
            </h2>
            <p className="text-navy/76 leading-relaxed mb-8">
              Teknik bilgi; örgü, boya ve apre süreçlerinde eğitim, kontrol, rapor ve müşteri teslim dokümanı olarak aynı standartta yönetilebilir hâle gelir.
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
              Örgü, boya ve apre prosesleri için uygulanabilir bir sistem kuralım.
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl">
              Örgü, boyahane, apre, kalite kontrol, eğitim veya teknik doküman ihtiyacınızı ölçülebilir kapsamla netleştirelim.
            </p>
          </div>
          <Link href={withLang('/contact')} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </>
  )
}
