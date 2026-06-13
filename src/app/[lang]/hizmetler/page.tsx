import type { Lang } from '@/lib/i18n'
import Link from 'next/link'

interface HizmetlerProps {
  params: Promise<{ lang: Lang }>
}

const services = [
  {
    number: '01',
    title: 'Tekstil Danışmanlığı',
    subtitle: 'Boyahane · Terbiye · Apre · Fabrika yönetimi',
    desc: 'Saha tecrübesine dayalı proses kontrolü, kapasite kullanımı, vardiya düzeni, maliyet analizi ve verimlilik iyileştirme çalışmaları.',
    items: ['Boyahane proses akışı ve reçete disiplini', 'Kasar, boyama, yıkama ve apre kontrol noktaları', 'Enerji, su, kimyasal ve işçilik verimliliği', 'Hata, tekrar işlem ve fire analizi'],
  },
  {
    number: '02',
    title: 'Eğitim Notları ve Teknik İçerik',
    subtitle: 'Uygulamalı, okunabilir, sahaya indirgenmiş bilgi',
    desc: 'Tekstil personeli, vardiya amiri, proses sorumlusu ve yönetici adayları için teknik eğitim notları ve prosedür içerikleri hazırlanır.',
    items: ['Pamuk, polyester, karışım kumaş prosesleri', 'Kasar, enzim, reaktif boya, dispers boya ve yıkama notları', 'Laboratuvar analizleri ve kabul kriterleri', 'Şemalı proses, dozaj ve zaman-sıcaklık anlatımları'],
  },
  {
    number: '03',
    title: 'Kurumsal Dokümantasyon',
    subtitle: 'Form, talimat, prosedür ve yönetim dosyası',
    desc: 'Sizin verdiğiniz şablon mantığına bağlı kalarak kurumsal doküman yapısı oluşturulur. Dosyalar sadece görsel değil, işletmede kullanılabilir formatta düşünülür.',
    items: ['Teknik rapor ve eğitim dosyası düzeni', 'Kontrol listesi, form ve takip çizelgesi', 'Makine teklif / şartname / kıyaslama dosyaları', 'Yönetim sunumu ve müşteri teslim dokümanı'],
  },
  {
    number: '04',
    title: 'Kurumsal Kimlik ve Şablon Sistemi',
    subtitle: 'Logo · renk · tipografi · kırtasiye · dijital kimlik',
    desc: 'Kurumsal kimlik dosyalarındaki logo, renk, tipografi, desen, ikon, kırtasiye, dijital kimlik ve tanıtım materyalleri bütünlüklü bir sisteme bağlanır.',
    items: ['Logo kullanım sistemi ve kurumsal renk standardı', 'Antetli kağıt, kartvizit, zarf ve dosya şablonları', 'LinkedIn, e-posta imzası, sunum ve sosyal medya şablonları', 'Katalog, broşür, sertifika, roll-up ve promosyon yüzeyleri'],
  },
  {
    number: '05',
    title: 'İçerik ve Yayın Sistemi',
    subtitle: 'Blog · LinkedIn · teknik yayın · haber yorumu',
    desc: 'Tekstil bilgisi, sektör gündemi ve kişisel gelişim içerikleri daha düzenli bir yayın yapısına alınır. Yayın akışı teknik bilgi, saha deneyimi ve uygulanabilir içerik üzerine kurulur.',
    items: ['Teknik blog yazısı planı', 'LinkedIn gönderi serileri', 'Sektör haberi çeviri ve yorumlama', 'Kısa not, görsel ve eğitim içerik paketleri'],
  },
  {
    number: '06',
    title: 'Dijital Yetenek ve Dosya Tasarımı',
    subtitle: 'InDesign · Illustrator · Photoshop · Excel',
    desc: 'Teknik bilgiyi okunabilir belge, sunum, tablo ve görsel dosyaya dönüştüren pratik tasarım ve dosya üretim desteği.',
    items: ['InDesign eğitim notu ve katalog düzeni', 'Illustrator tabanlı SVG şablonlar', 'Photoshop görsel düzenleme ve kapak sistemi', 'Excel hesap, takip ve analiz tabloları'],
  },
]

const systemBlocks = [
  'Logo sistemi',
  'Renk paleti',
  'Tipografi sistemi',
  'Desen ve doku',
  'İkon seti',
  'Kırtasiye şablonları',
  'Dijital kimlik',
  'Tanıtım materyalleri',
  'Kurumsal çevre',
  'İş kıyafetleri',
  'Teknik dokümanlar',
  'Eğitim dosyaları',
]

export default async function HizmetlerPage({ params }: HizmetlerProps) {
  const { lang } = await params
  const withLang = (path: string) => `/${lang}${path}`

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="bg-white border-b border-gray-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="section-label">HİZMETLER</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-5">
            Tekstil bilgisi, kurumsal dosya ve şablon sistemi
          </h1>
          <p className="text-lg leading-relaxed text-navy/82 max-w-3xl">
            Bu sayfa; tekstil danışmanlığı, teknik eğitim içerikleri, kurumsal dokümantasyon ve şablon üretimini aynı sistem altında toplayan profesyonel hizmet yapısı olarak düzenlendi.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <article key={service.number} className="rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card transition-all">
              <div className="flex items-start gap-4 mb-5">
                <span className="text-sm font-black text-accent-blue tracking-widest">{service.number}</span>
                <div>
                  <h2 className="text-xl font-bold text-navy">{service.title}</h2>
                  <p className="text-xs font-semibold tracking-wide text-navy/62 mt-1">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-navy/84 leading-relaxed mb-5">{service.desc}</p>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-navy/88 leading-relaxed">
                    <span className="text-accent-blue font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#061A33] text-white bb-dark-readable-panel">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div>
              <p className="section-label text-white/70">KURUMSAL DOKÜMAN SİSTEMİ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Tekstil, eğitim ve kurumsal şablonları aynı düzende toplar</h2>
              <p className="text-white/75 leading-relaxed">
                Bu yapı; teknik eğitim notları, proses formları, kurumsal kimlik öğeleri ve şablon dosyalarını sahada kullanılabilir, okunabilir ve sürdürülebilir bir doküman düzenine bağlar.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {systemBlocks.map((item) => (
                <div key={item} className="rounded-xl bg-white/10 border border-white/15 p-4 text-sm font-semibold text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-navy/80 mb-6">Teknik dosya, eğitim notu veya kurumsal şablon yapısı için çalışma başlatabiliriz.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={withLang('/contact')} className="btn-primary">İletişime Geç →</Link>
          <Link href={withLang('/magazam')} className="btn-outline">Şablonları İncele</Link>
        </div>
      </section>
    </main>
  )
}
