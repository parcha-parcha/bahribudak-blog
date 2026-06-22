import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const tr = params.lang === 'tr'

  return {
    title: tr
      ? 'Tekstil Kaynak Merkezi | Bahri Budak'
      : 'Textile Resource Center | Bahri Budak',
    description: tr
      ? 'Boyahane, proses, kalite kontrol, eğitim ve teknik dokümantasyon için hazırlanmış tekstil kaynak merkezi.'
      : 'Textile resource center for dyehouse, process, quality control, training and technical documentation.',
  }
}

type TextileResource = {
  no: string
  title: string
  purpose: string
  users: string
  examples: string[]
  status: string
  button: string
  featured?: boolean
  href?: string
}

const primaryResources: TextileResource[] = [
  {
    no: '01',
    title: 'Tekstil Teknik Dokümanları',
    purpose:
      'Kasar, boyama, yıkama, ramöz, fikse, laboratuvar ve proses kontrol başlıklarını aynı teknik dil altında toplar.',
    users:
      'Boyahane müdürü, proses sorumlusu, kalite ekibi, laboratuvar ve eğitim sorumluları.',
    examples: [
      'Mühendislik formülleri',
      'HT jet proses diyagramları',
      'Boyahane norm kadro',
      'Teknik yayın dosyaları',
    ],
    status: '3 dosya indirilebilir',
    button: 'Sayfayı İncele',
    featured: true,
    href: '/sablonlar/tekstil-teknik-dokumanlari',
  },
  {
    no: '02',
    title: 'Proses Formları',
    purpose:
      'Üretim sırasında reçete, ölçüm, parti, makine ve işlem takibini standart hale getiren uygulanabilir form yapılarıdır.',
    users:
      'Vardiya amiri, operatör, proses kontrol, laboratuvar ve üretim planlama ekipleri.',
    examples: [
      'Boyama parti takip formu',
      'Reçete kayıt formu',
      'pH-sıcaklık-süre takibi',
      'Makine proses kaydı',
    ],
    status: 'İndirilebilir • Yeni form eklendi',
    button: 'Sayfayı İncele',
    href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
  },
  {
    no: '03',
    title: 'Kontrol Listeleri',
    purpose:
      'Hatanın oluşmasını beklemeden, kritik üretim noktalarını vardiya içinde kısa ve net şekilde kontrol etmeye yarar.',
    users:
      'Operatör, vardiya amiri, kalite kontrol, laboratuvar ve işletme yönetimi.',
    examples: [
      'Kasar ön kontrol',
      'Boyama başlangıç kontrolü',
      'Yıkama final kontrolü',
      'Laboratuvar haftalık kontrolü',
    ],
    status: 'Yakında indirilebilir',
    button: 'Yakında indirilebilir',
  },
  {
    no: '04',
    title: 'Eğitim Notları',
    purpose:
      'Saha bilgisini operatör, vardiya amiri, laboratuvar ve yönetim ekiplerinin anlayacağı sade bir eğitim sistemine dönüştürür.',
    users:
      'Yeni personel, vardiya ekipleri, proses sorumluları, kalite ve laboratuvar ekipleri.',
    examples: [
      'Kasar eğitimi',
      'Reaktif boyama eğitimi',
      'Tuz-soda-pH mantığı',
      'Hata analizi notları',
    ],
    status: 'Hazırlanıyor',
    button: 'Hazırlanıyor',
  },
  {
    no: '05',
    title: 'Teklif ve Teknik Sunum Dosyaları',
    purpose:
      'Makine, yatırım, proses iyileştirme ve eğitim çalışmalarını yönetim veya müşteri tarafına düzenli şekilde sunar.',
    users:
      'Yönetim, satın alma, teknik ekipler, danışmanlık ve yatırım değerlendirme süreçleri.',
    examples: [
      'Makine teklif dosyası',
      'Yatırım karşılaştırması',
      'Teknik sunum kapağı',
      'Maliyet özet sayfası',
    ],
    status: 'Talep üzerine düzenlenir',
    button: 'Talep üzerine hazırlanır',
  },
]

const supportResources: TextileResource[] = [
  {
    no: '06',
    title: 'Kurumsal Evrak Desteği',
    purpose:
      'Tekstil teknik içeriklerinin müşteri, yönetim veya eğitim sunumunda daha düzgün görünmesi için kullanılan destekleyici evrak düzenidir.',
    users:
      'Teknik rapor, eğitim dosyası ve müşteri teslim dokümanı hazırlayan ekipler.',
    examples: [
      'Kapak sayfası',
      'Devam sayfası',
      'İçindekiler düzeni',
      'Teslim dosyası düzeni',
    ],
    status: 'İsteğe göre destek',
    button: 'İsteğe göre destek',
  },
  {
    no: '07',
    title: 'Dijital Yayın Desteği',
    purpose:
      'Blog, LinkedIn ve sunum içeriklerinde teknik bilginin aynı kurumsal çizgide paylaşılmasını destekler.',
    users:
      'Teknik yayın hazırlayanlar, eğitim sunumu yapanlar ve danışmanlık içeriklerini paylaşanlar.',
    examples: [
      'Blog görsel düzeni',
      'LinkedIn teknik not kartı',
      'Sunum kapağı',
      'E-posta imzası',
    ],
    status: 'İsteğe göre destek',
    button: 'İsteğe göre destek',
  },
]

function ResourceCard({
  item,
  lang,
}: {
  item: TextileResource
  lang: string
}) {
  const href = item.href ? `/${lang}${item.href}` : null

  return (
    <article
      className={`group rounded-[2rem] border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
        item.featured
          ? 'border-accent-blue/55 ring-1 ring-accent-blue/20'
          : 'border-gray-border'
      }`}
    >
      <div className="mb-6 flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-border bg-[#F3F6FA] text-lg font-black tracking-wider text-accent-blue">
            {item.no}
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-navy/55">
              {item.status}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-navy">
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-accent-blue">
            Dosya amacı
          </p>
          <p className="text-[15px] leading-relaxed text-navy/78">
            {item.purpose}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-border bg-[#F3F6FA] px-4 py-3">
          <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-navy/55">
            Kim kullanır?
          </p>
          <p className="text-sm leading-relaxed text-navy/76">
            {item.users}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-accent-blue">
            İçerik örnekleri
          </p>

          <div className="flex flex-wrap gap-2">
            {item.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-gray-border bg-white px-3 py-1 text-xs font-semibold text-navy/76"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-gray-border pt-5">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-navy/45">
          Dosya durumu
        </span>

        {href ? (
          <Link
            href={href}
            className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-blue"
          >
            {item.button}
          </Link>
        ) : (
          <span className="rounded-full border border-accent-blue/30 bg-[#F3F6FA] px-5 py-2 text-sm font-bold text-navy">
            {item.button}
          </span>
        )}
      </div>
    </article>
  )
}

export default function MagazamPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'tr'

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-50" />
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-accent-blue/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="section-label text-accent-blue">
            TEKSTİL KAYNAK MERKEZİ
          </p>

          <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Tekstil teknik dosyaları için kaynak ve talep sistemi
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-white/80">
            Bu sayfanın ana değeri kurumsal kimlik dosyaları değil;
            boyahane, proses, kalite kontrol, eğitim ve teknik
            dokümantasyon için hazırlanmış tekstil bilgilerinin düzenli ve
            kullanılabilir hale getirilmesidir.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Tekstil dokümanları
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Proses formları
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Kontrol listeleri
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Eğitim notları
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-9 grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="section-label">ÖNCELİKLİ İNDİRİLEBİLİR ALAN</p>
            <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">
              Tekstil işletmeleri için hazırlanmış teknik kaynak grupları
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-navy/66">
            Hazır PDF, DOCX ve XLSX dosyaları ilgili kartların ayrıntı
            sayfalarından indirilebilir. Hazırlık aşamasındaki kaynakların
            güncel durumu kartların üzerinde gösterilir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {primaryResources.map((item) => (
            <ResourceCard key={item.no} item={item} lang={lang} />
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-accent-blue/25 bg-white p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="section-label">DOSYA TALEBİ</p>
            <h3 className="text-2xl font-bold text-navy">
              Belirli bir tekstil dokümanına ihtiyacınız varsa talep
              oluşturabilirsiniz.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">
              Kartlar tek tek iletişim sayfasına yönlendirilmez. Genel talep
              için aşağıdaki tek buton kullanılır.
            </p>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="mt-5 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-blue md:mt-0"
          >
            Genel Talep Oluştur
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
          <div className="mb-7 max-w-3xl">
            <p className="section-label">İSTEĞE GÖRE DESTEKLEYİCİ ALAN</p>
            <h2 className="text-3xl font-bold text-navy">
              Kurumsal ve dijital şablonlar ana ürün değildir
            </h2>
            <p className="mt-3 leading-relaxed text-navy/72">
              Kurumsal evrak ve dijital yayın şablonları, tekstil teknik
              dosyalarının daha profesyonel sunulması için isteğe göre
              hazırlanır. Bu bölümün ana önceliği tekstil teknik bilgi
              dosyalarının indirilebilir hale getirilmesidir.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {supportResources.map((item) => (
              <ResourceCard key={item.no} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
