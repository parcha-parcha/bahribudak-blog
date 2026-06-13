import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const tr = params.lang === 'tr'
  return {
    title: tr ? 'Şablonlar ve Teknik Kaynaklar | Bahri Budak' : 'Templates and Technical Resources | Bahri Budak',
    description: tr
      ? 'Tekstil teknik dokümanları, proses formları, eğitim notları, kurumsal evrak ve dijital yayın şablonları.'
      : 'Textile technical documents, process forms, training notes, corporate documents and digital publishing templates.',
  }
}

type Collection = {
  no: string
  title: string
  desc: string
  files: string[]
  status: string
}

const collections: Collection[] = [
  {
    no: '01',
    title: 'Tekstil Teknik Dokümanları',
    desc: 'Boyahane, kasar, reaktif boyama, yıkama, laboratuvar, proses reçetesi, maliyet hesabı ve kalite kontrol için kullanılacak teknik dosya sistemi.',
    files: ['Eğitim notları', 'Proses formları', 'Kontrol listeleri', 'Reçete tabloları', 'Maliyet hesapları', 'Teklif dosyaları'],
    status: 'Ana kaynak',
  },
  {
    no: '02',
    title: 'Proses Kontrol ve Üretim Formları',
    desc: 'Üretimde karar almayı kolaylaştıran günlük takip, kontrol, ölçüm ve raporlama şablonları.',
    files: ['Parti takip', 'pH kontrol', 'Tuz kontrol', 'Su sertliği', 'Haslık takip', 'Tekrar işlem formu'],
    status: 'Saha kullanımı',
  },
  {
    no: '03',
    title: 'Eğitim Dosyaları',
    desc: 'Operatör, vardiya amiri, laboratuvar, kalite ve yönetim ekipleri için bölüm bazlı eğitim dokümanları.',
    files: ['Kasar eğitimi', 'Boyama eğitimi', 'Yıkama eğitimi', 'Laboratuvar', 'Kalite kontrol', 'Maliyet bilinci'],
    status: 'Eğitim seti',
  },
  {
    no: '04',
    title: 'Teklif ve Sunum Şablonları',
    desc: 'Makine, yatırım, proses, eğitim ve danışmanlık dosyalarının profesyonel biçimde sunulması için şablon yapısı.',
    files: ['Teklif kapağı', 'Makine listesi', 'Yerleşim planı', 'Sunum kapağı', 'Teknik rapor', 'Özet sayfa'],
    status: 'Müşteri sunumu',
  },
  {
    no: '05',
    title: 'Kurumsal Evrak Şablonları',
    desc: 'Kurumsal görünümü standartlaştırmak için kullanılan temel evrak ve ofis dokümanları.',
    files: ['Kartvizit', 'Antetli kağıt', 'Devam kağıdı', 'Zarf', 'Cepli dosya', 'Bloknot'],
    status: 'Kurumsal evrak',
  },
  {
    no: '06',
    title: 'Dijital Kimlik Şablonları',
    desc: 'Web, LinkedIn, e-posta, sosyal medya ve sunumlarda aynı kimlik çizgisini koruyan dijital şablonlar.',
    files: ['E-posta imzası', 'LinkedIn banner', 'Sosyal medya postu', 'Story şablonu', 'Sunum kapağı', 'Blog görseli'],
    status: 'Dijital yayın',
  },
  {
    no: '07',
    title: 'Kurumsal Kimlik Seti',
    desc: 'Logo, renk, tipografi, desen, ikon ve kullanım kurallarını tek standarda bağlayan temel kimlik dosyası.',
    files: ['Logo sistemi', 'Renk paleti', 'Tipografi', 'Desen / doku', 'İkon seti', 'Kullanım kuralı'],
    status: 'Kimlik standardı',
  },
]

export default function MagazamPage({ params }: { params: { lang: string } }) {
  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="bg-[#061A33] text-white bb-pattern">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="section-label text-white/55">ŞABLONLAR VE TEKNİK KAYNAKLAR</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Tekstil teknik dokümanlarını merkez alan şablon sistemi
          </h1>
          <p className="text-white/76 leading-relaxed max-w-3xl text-lg">
            Öncelik tekstil teknik dokümanlarıdır. Kurumsal kimlik, kırtasiye ve dijital yayın şablonları ise bu teknik içeriği daha profesyonel sunmak için destekleyici yapıdadır.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((item) => (
            <article key={item.no} className="rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card transition-all">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 text-accent-blue font-black tracking-wider">
                    {item.no}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy">{item.title}</h2>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-navy/55">{item.status}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-navy/82 leading-relaxed mb-5">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.files.map((file) => (
                  <span key={file} className="rounded-full bg-[#F3F6FA] border border-gray-border px-3 py-1 text-xs font-semibold text-navy/82">
                    {file}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
