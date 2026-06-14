import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const tr = params.lang === 'tr'
  return {
    title: tr ? 'Tekstil Teknik Kaynaklar | Bahri Budak' : 'Textile Technical Resources | Bahri Budak',
    description: tr
      ? 'Boyahane, proses, kalite kontrol ve teknik dokümantasyon için indirilebilir tekstil kaynakları.'
      : 'Downloadable textile resources for dyehouse, process, quality control and technical documentation.',
  }
}

type Resource = {
  no: string
  title: string
  desc: string
  who: string
  includes: string[]
  action: string
  featured?: boolean
}

const textileResources: Resource[] = [
  {
    no: '01',
    title: 'Tekstil Teknik Dokümanları',
    desc: 'Boyahane, kasar, reaktif boyama, yıkama, laboratuvar ve kalite kontrol süreçleri için hazırlanmış temel teknik bilgi dosyaları.',
    who: 'Boyahane yöneticisi, proses sorumlusu, kalite ve laboratuvar ekipleri kullanır.',
    includes: ['Kasar notları', 'Boyama reçete mantığı', 'Yıkama adımları', 'Laboratuvar kontrolleri', 'Kabul kriterleri'],
    action: 'İndirilebilir teknik kaynak',
    featured: true,
  },
  {
    no: '02',
    title: 'Proses Formları',
    desc: 'Üretimde aynı dilin konuşulması için parti, reçete, ölçüm ve proses takip formlarının standart yapısı.',
    who: 'Vardiya amiri, proses kontrol, laboratuvar ve üretim planlama kullanır.',
    includes: ['Parti takip', 'pH kontrol', 'Tuz kontrol', 'Su sertliği', 'Sıcaklık-süre takip'],
    action: 'Form seti',
  },
  {
    no: '03',
    title: 'Kontrol Listeleri',
    desc: 'Hata oluşmadan önce kontrol etmeyi sağlayan, kısa ve uygulanabilir saha kontrol listeleri.',
    who: 'Operatör, vardiya amiri, kalite kontrol ve işletme yönetimi kullanır.',
    includes: ['Makine hazırlık', 'Kimyasal kontrol', 'Numune kontrol', 'Yıkama kontrol', 'Final kontrol'],
    action: 'Kontrol listesi',
  },
  {
    no: '04',
    title: 'Eğitim Notları',
    desc: 'Operatör, laboratuvar, kalite ve yönetim ekipleri için sadeleştirilmiş tekstil proses eğitim içerikleri.',
    who: 'Yeni personel, vardiya ekipleri, laboratuvar ve kalite ekipleri kullanır.',
    includes: ['Kasar eğitimi', 'Boyama eğitimi', 'Yıkama eğitimi', 'pH ve tuz mantığı', 'Hata analizi'],
    action: 'Eğitim dosyası',
  },
  {
    no: '05',
    title: 'Teklif ve Teknik Sunum Dosyaları',
    desc: 'Makine, yatırım, proses ve eğitim çalışmalarını karşı tarafa anlaşılır ve profesyonel göstermek için kullanılan teknik sunum yapıları.',
    who: 'Yönetim, satın alma, teknik ekip ve danışmanlık sunumu hazırlayanlar kullanır.',
    includes: ['Teklif kapağı', 'Makine listesi', 'Teknik özet', 'Maliyet sayfası', 'Sunum akışı'],
    action: 'Talebe göre hazırlanır',
  },
]

const supportResources: Resource[] = [
  {
    no: '06',
    title: 'Kurumsal Evrak Şablonları',
    desc: 'Teknik dosyaların düzenli ve kurumsal görünmesi için kullanılan destekleyici evrak yapısıdır.',
    who: 'Teknik içeriklerin müşteri, yönetim veya eğitim sunumunda daha düzgün görünmesi için kullanılır.',
    includes: ['Antetli sayfa', 'Kapak', 'Devam sayfası', 'Dosya düzeni'],
    action: 'İsteğe göre düzenlenir',
  },
  {
    no: '07',
    title: 'Dijital Yayın Şablonları',
    desc: 'LinkedIn, blog ve sunumlarda teknik bilginin aynı kurumsal çizgide paylaşılması için destekleyici dijital şablonlardır.',
    who: 'Teknik yayın, eğitim ve danışmanlık içeriklerinin dijital sunumu için kullanılır.',
    includes: ['LinkedIn post', 'Blog görseli', 'Sunum kapağı', 'E-posta imzası'],
    action: 'İsteğe göre hazırlanır',
  },
]

function ResourceCard({ item }: { item: Resource }) {
  return (
    <article className={`rounded-3xl border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card ${item.featured ? 'border-accent-blue/45 ring-1 ring-accent-blue/15' : 'border-gray-border'}`}>
      <div className="mb-6 flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3F6FA] border border-gray-border text-accent-blue font-black tracking-wider">
            {item.no}
          </div>
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-accent-blue">{item.action}</p>
            <h2 className="text-2xl font-bold text-navy leading-tight">{item.title}</h2>
          </div>
        </div>
      </div>

      <p className="mb-4 text-[15px] leading-relaxed text-navy/82">{item.desc}</p>
      <p className="mb-5 rounded-2xl bg-[#F3F6FA] px-4 py-3 text-sm leading-relaxed text-navy/74 border border-gray-border">
        <strong className="text-navy">Kullanım:</strong> {item.who}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.includes.map((file) => (
          <span key={file} className="rounded-full border border-gray-border bg-white px-3 py-1 text-xs font-semibold text-navy/78">
            {file}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function MagazamPage({ params }: { params: { lang: string } }) {
  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="section-label text-accent-blue">TEKSTİL KAYNAK MERKEZİ</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            İndirilebilir teknik bilgi dosyaları ve saha dokümanları
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/78">
            Bu bölümün ana amacı kurumsal kimlik dosyalarını indirmek değildir. Öncelik; boyahane, proses, kalite kontrol, eğitim ve teknik dokümantasyon için hazırlanmış tekstil dosyalarının düzenli ve kullanılabilir hale getirilmesidir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">ÖNCELİKLİ ALAN</p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">Tekstil için hazırlanmış indirilebilir içerikler</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-navy/65">
            Kartlar ürün satışı gibi değil; kullanılacak bilgi, form, kontrol ve eğitim dosyalarının net bir haritası olarak düzenlenmiştir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {textileResources.map((item) => (
            <ResourceCard key={item.no} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-white p-7 md:p-9 border border-gray-border shadow-sm">
          <div className="mb-7 max-w-3xl">
            <p className="section-label">DESTEKLEYİCİ DİJİTAL ALAN</p>
            <h2 className="text-3xl font-bold text-navy">Kurumsal ve dijital şablonlar ikinci planda kalır</h2>
            <p className="mt-3 text-navy/72 leading-relaxed">
              Kurumsal kimlik ve dijital şablonlar indirilebilir ana ürün olarak değil, tekstil teknik dosyalarının daha profesyonel sunulması için isteğe göre düzenlenen destekleyici yapılardır.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {supportResources.map((item) => (
              <ResourceCard key={item.no} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
