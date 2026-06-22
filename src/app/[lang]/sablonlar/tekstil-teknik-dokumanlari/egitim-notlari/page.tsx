import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return {
    title: 'Eğitim Notları | Bahri Budak',
    description:
      'Kasar, reaktif boyama, dispers boyama ve boyahane proses yönetimi konularında hazırlanmış tekstil eğitim notları.',
  }
}

type TrainingNote = {
  no: string
  status: string
  title: string
  category: string
  description: string
  details: string[]
  tags: string[]
  pdf?: string | null
  docx?: string | null
}

const notes: TrainingNote[] = [
  {
    no: '01',
    status: 'İNDİRİLEBİLİR',
    title: 'Pamuk ve Pamuk-Elastan Örme Kumaşlarda Kasar Eğitimi',
    category: 'Ön terbiye ve boyamaya hazırlık',
    description:
      'İyi kasarın ölçülebilir tanımını; pamuk safsızlıklarını, alkali ve peroksit mantığını, yardımcı kimyasalların görevlerini, HT jet proses akışını, elastan risklerini, test yöntemlerini ve saha hatalarını aynı eğitim düzeninde açıklar.',
    details: ['8 sayfa', 'PDF / DOCX', '13 bölüm', 'Örnek proses şablonu'],
    tags: ['Kasar', 'Pamuk', 'Elastan', 'Hidrofilite', 'Peroksit', 'HT jet'],
    pdf: '/downloads/pamuk-pamuk-elastan-kasar-egitimi-r1.pdf',
    docx: '/downloads/pamuk-pamuk-elastan-kasar-egitimi-r1.docx',
  },
  {
    no: '02',
    status: 'İNDİRİLEBİLİR',
    title: 'Reaktif Boyama Eğitimi',
    category: 'Pamuk boyama ve proses yönetimi',
    description:
      'Reaktif boyarmadde-lif ilişkisini; adsorpsiyon, difüzyon, migrasyon, elektrolit, alkali, pH, fiksaj, hidroliz, HT jet proses seçenekleri, yıkama ve kalite kontrolüyle birlikte açıklar.',
    details: ['9 sayfa', 'PDF / DOCX', '14 bölüm', 'Proses ve hesaplama tabloları'],
    tags: ['Reaktif boyama', 'Pamuk', 'HT jet', 'Fiksaj', 'Hidroliz', 'Wash-off'],
    pdf: '/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.pdf',
    docx: '/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.docx',
  },
  {
    no: '03',
    status: 'İNDİRİLEBİLİR',
    title: 'Polyester Örme Kumaşlarda Dispers Boyama Eğitimi',
    category: 'Polyester ve polyester-elastan boyama',
    description:
      'Dispers boyarmaddenin banyoda homojen dağılımını, boya çekimini, lif içine ilerlemesini, boyarmadde enerji sınıflarını, HT jet prosesini, pH ve yardımcı kimyasal yönetimini, indirgen temizlemeyi, oligomer ve termomigrasyon risklerini sade Türkçe terminolojiyle açıklar.',
    details: ['11 sayfa', 'PDF / DOCX', '16 bölüm', 'Proses ve hata analiz tabloları'],
    tags: ['Dispers boyama', 'Polyester', 'Elastan', 'İndirgen temizleme', 'Oligomer', 'Termomigrasyon'],
    pdf: '/downloads/polyester-orme-kumaslarda-dispers-boyama-egitimi-r1.pdf',
    docx: '/downloads/polyester-orme-kumaslarda-dispers-boyama-egitimi-r1.docx',
  },
  {
    no: '04',
    status: 'SIRADA',
    title: 'Naylon / Poliamid Kumaşlarda Asit Boyama Eğitimi',
    category: 'Poliamid boyama ve pH yönetimi',
    description:
      'Asit boyarmadde-poliamid ilişkisini, pH kontrollü boya çekimini, sıcaklık ve dozaj yönetimini, düzgünlük, haslık, elastan riski ve final kalite kontrollerini açıklayacak.',
    details: ['PDF / DOCX', 'Asit boyama', 'pH profili', 'Düzgünlük ve haslık'],
    tags: ['Naylon', 'Poliamid', 'Asit boyarmadde', 'pH', 'Haslık'],
    pdf: null,
    docx: null,
  },
]

export default function Page({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'tr'

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="section-label text-accent-blue">TEKSTİL KAYNAK MERKEZİ</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Eğitim Notları
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84">
            Saha bilgisini operatör, vardiya amiri, laboratuvar, proses ve kalite ekiplerinin aynı teknik dilde kullanabileceği eğitim dosyalarına dönüştürür.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">EĞİTİM YAKLAŞIMI</p>
            <h2 className="mb-4 text-3xl font-bold text-navy">
              Bilgiyi yalnızca anlatmak değil, sahada uygulanabilir hale getirmek
            </h2>
            <p className="leading-relaxed text-navy/76">
              Eğitim notları; proses mantığını, kritik kontrol noktalarını, ölçüm yöntemlerini, örnek uygulamaları ve sık yapılan hataları aynı dosyada birleştirir. Reçete değerleri sabit kural olarak değil, işletme şartlarına göre doğrulanması gereken teknik başlangıç noktaları olarak sunulur.
            </p>
          </article>

          <aside className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">KİM KULLANIR?</p>
            <div className="grid gap-3">
              {[
                'Yeni operatör ve yardımcı personel',
                'Vardiya amiri ve vardiya mühendisi',
                'Laboratuvar ve reçete hazırlama ekibi',
                'Proses kontrol ve kalite ekipleri',
                'Boyahane ve işletme yönetimi',
                'Teknik eğitim ve danışmanlık çalışmaları',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#F3F6FA] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-accent-blue" />
                  <span className="text-sm font-semibold text-navy/82">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <div className="mb-7 max-w-3xl">
            <p className="section-label">İNDİRİLEBİLİR EĞİTİMLER</p>
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Teknik konuları adım adım açıklayan eğitim dosyaları
            </h2>
            <p className="leading-relaxed text-navy/72">
              Tamamlanan eğitim notları PDF ve DOCX biçiminde indirilebilir. Hazırlık aşamasındaki dosyaların durumu kartların üzerinde gösterilir.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {notes.map((item) => (
              <article
                key={item.no}
                className="flex h-full flex-col rounded-[2rem] border border-gray-border bg-white p-6 shadow-sm md:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-blue/20 bg-[#F3F6FA] text-lg font-black text-accent-blue">
                    {item.no}
                  </span>
                  <span className="rounded-full border border-accent-blue/25 bg-[#F3F6FA] px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-navy/65">
                    {item.status}
                  </span>
                </div>

                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-accent-blue">
                  {item.category}
                </p>
                <h3 className="text-2xl font-bold leading-tight text-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-navy/72">{item.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-gray-border bg-[#F3F6FA] px-3 py-1.5 text-xs font-semibold text-navy/68"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-gray-border pt-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/50">
                    İçerik etiketleri
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-navy/65">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {item.pdf ? (
                    <a
                      href={item.pdf}
                      download
                      className="inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-blue"
                    >
                      PDF dosyasını indir
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed rounded-full bg-navy/10 px-5 py-3 text-sm font-bold text-navy/55">
                      {item.status === 'SIRADA' ? 'Sırada' : 'Hazırlanıyor'}
                    </span>
                  )}

                  {item.docx && (
                    <a
                      href={item.docx}
                      download
                      className="inline-flex rounded-full border border-navy/25 bg-white px-5 py-3 text-sm font-bold text-navy transition hover:border-accent-blue hover:text-accent-blue"
                    >
                      DOCX dosyasını indir
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-accent-blue/20 bg-[#061A33] p-7 text-white shadow-sm md:p-9">
          <p className="section-label text-accent-blue">KULLANIM NOTU</p>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Eğitim notları işletme şartlarıyla birlikte değerlendirilmelidir
          </h2>
          <p className="max-w-4xl leading-relaxed text-white/78">
            Örnek reçete, doz, sıcaklık, süre ve kabul kriterleri; kumaş tipi, makine, flotte, renk grubu, kimyasal ürün konsantrasyonu, müşteri şartnamesi ve laboratuvar denemesi dikkate alınarak onaylanmalıdır.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/magazam`}
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-accent-blue hover:text-white"
            >
              Kaynak merkezine dön
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-navy"
            >
              Talep oluştur
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
