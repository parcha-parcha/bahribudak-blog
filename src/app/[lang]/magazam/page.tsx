import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const tr = params.lang === 'tr'
  return {
    title: tr ? 'Şablonlar ve Kaynaklar | Bahri Budak' : 'Templates and Resources | Bahri Budak',
    description: tr
      ? 'Kurumsal kimlik, teknik doküman, eğitim notu, kırtasiye ve dijital yayın şablonları.'
      : 'Brand identity, technical document, training note, stationery and digital publishing templates.',
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
    title: 'Kurumsal Kimlik Seti',
    desc: 'Logo, renk, tipografi, desen, ikon ve kullanım kurallarını tek standarda bağlayan temel kimlik dosyası.',
    files: ['Logo sistemi', 'Renk paleti', 'Tipografi', 'Desen / doku', 'İkon seti'],
    status: 'Sistem temeli',
  },
  {
    no: '02',
    title: 'Kırtasiye ve Evrak Şablonları',
    desc: 'Resmi yazışma, teklif, rapor, müşteri teslim dosyası ve kurumsal evraklar için kullanılacak şablon ailesi.',
    files: ['Kartvizit', 'Antetli kağıt', 'Devam kağıdı', 'Diplomat zarf', 'Cepli dosya', 'Bloknot'],
    status: 'Kurumsal evrak',
  },
  {
    no: '03',
    title: 'Dijital Kimlik Şablonları',
    desc: 'Web, LinkedIn, e-posta, sosyal medya ve sunumlarda markanın aynı görünmesi için dijital yüzeyler.',
    files: ['E-posta imzası', 'LinkedIn banner', 'Sosyal medya postu', 'Story şablonu', 'Sunum kapağı'],
    status: 'Dijital yayın',
  },
  {
    no: '04',
    title: 'Tanıtım ve Pazarlama Dosyaları',
    desc: 'Katalog, broşür, sertifika, teşekkür belgesi, roll-up ve promosyon yüzeyleri için kurumsal tasarım mantığı.',
    files: ['Katalog kapağı', 'Broşür / föy', 'Sertifika', 'Roll-up', 'Poster', 'Promosyon ürünleri'],
    status: 'Tanıtım seti',
  },
  {
    no: '05',
    title: 'Kurumsal Çevre ve Uygulama Alanları',
    desc: 'Tabela, yönlendirme, kapı isimliği, ziyaretçi kartı, personel kartı ve araç giydirme alanları.',
    files: ['Dış cephe tabela', 'Totem tabela', 'İç yönlendirme', 'Kapı isimliği', 'Yaka kartı', 'Araç giydirme'],
    status: 'Fiziksel alan',
  },
  {
    no: '06',
    title: 'İş Kıyafetleri ve Üretim Kimliği',
    desc: 'Üretim personeli, saha ekibi ve ziyaretçi kullanımı için logo yerleşimi ve kıyafet standartları.',
    files: ['T-shirt', 'Polo yaka', 'İş önlüğü', 'Polar mont', 'İkaz yeleği', 'Şapka / kask'],
    status: 'Saha uygulaması',
  },
  {
    no: '07',
    title: 'Tekstil Teknik Dokümanları',
    desc: 'Boyahane, kasar, enzim, yıkama, laboratuvar, proses reçetesi ve maliyet hesabı için teknik dosya yapısı.',
    files: ['Eğitim notları', 'Proses formları', 'Kontrol listeleri', 'Teklif dosyaları', 'Hesap tabloları'],
    status: 'Teknik kaynak',
  },
]

export default function MagazamPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === 'en' ? 'en' : 'tr'
  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="bg-[#061A33] text-white bb-pattern">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="section-label text-white/55">ŞABLONLAR VE KAYNAKLAR</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Kurumsal kimlikten teknik dokümana uzanan dosya sistemi
          </h1>
          <p className="text-white/76 leading-relaxed max-w-3xl text-lg">
            Bu bölüm; kurumsal kimlik, kırtasiye, dijital yayın, tanıtım materyali, saha uygulaması ve teknik doküman şablonlarını tek bir kaynak yapısı altında toplar.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((item) => (
            <article key={item.no} className="rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card transition-all">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-black text-accent-blue tracking-[0.18em] mb-2">{item.no}</p>
                  <h2 className="text-2xl font-bold text-navy">{item.title}</h2>
                </div>
                <span className="rounded-full bg-[#E8F6FC] text-navy text-xs font-bold px-3 py-1 border border-[#BCE8F7] whitespace-nowrap">
                  {item.status}
                </span>
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
