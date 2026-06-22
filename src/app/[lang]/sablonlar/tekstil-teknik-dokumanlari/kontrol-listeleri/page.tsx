import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return {
    title: 'Kontrol Listeleri | Bahri Budak',
    description:
      'Boyahane, laboratuvar, kalite ve terbiye süreçlerinde kritik noktaların vardiya ve parti bazında kontrol edilmesini sağlayan tekstil kontrol listeleri.',
  }
}

const checklists = [
  {
    no: '01',
    status: 'İNDİRİLEBİLİR',
    title: 'Kasar Ön Kontrol ve Başlatma Onay Listesi',
    category: 'Pamuk ve pamuk–elastan kasar hazırlığı',
    description:
      'Kumaş, makine, su, reçete, kimyasal, dozaj ve proses hedeflerinin kasar başlamadan önce eksiksiz doğrulanmasını; eksik ve uygunsuz maddelere göre otomatik başlatma kararı verilmesini sağlar.',
    details: ['XLSX', '4 çalışma sayfası', '200 kayıt', 'Otomatik başlatma kararı'],
    tags: ['Kasar', 'Su kalitesi', 'Makine kontrolü', 'Kimyasal hazırlık', 'Başlatma onayı'],
    button: 'XLSX dosyasını indir',
    href: '/downloads/kasar-on-kontrol-ve-baslatma-listesi-kurumsal-r2.xlsx',
  },
  {
    no: '02',
    status: 'İNDİRİLEBİLİR',
    title: 'Boyama Başlangıç Kontrol Listesi',
    category: 'HT jet boyama hazırlığı',
    description:
      'Parti, onaylı reçete, makine, flotte, su kalitesi, boyarmadde, kimyasal, dozaj sırası, kumaş çevrimi ve proses hedeflerini boyama başlamadan önce doğrulayan kapsamlı Excel kontrol sistemidir.',
    details: ['XLSX', '4 çalışma sayfası', '40 kontrol maddesi', 'Otomatik başlatma kararı'],
    tags: ['HT jet', 'Boyama', 'Reçete', 'Dozaj', 'Makine', 'Su kalitesi'],
    button: 'XLSX dosyasını indir',
    href: '/downloads/boyama-baslangic-kontrol-listesi-kurumsal-r2.xlsx',
  },
  {
    no: '03',
    status: 'SIRADA',
    title: 'Yıkama ve Final Kontrol Listesi',
    category: 'Boyama sonrası kalite doğrulaması',
    description:
      'Nötralizasyon, sabunlama, durulama, final pH, renk, haslık, peroksit veya kimyasal kalıntı ve numune onayı kontrollerini tek listede toplar.',
    details: ['XLSX', 'Final pH', 'Yıkama', 'Numune onayı'],
    tags: ['Yıkama', 'Final kontrol', 'Haslık', 'Kalite'],
    button: 'Sırada',
    href: null,
  },
  {
    no: '04',
    status: 'SIRADA',
    title: 'Laboratuvar Haftalık Kontrol Listesi',
    category: 'Laboratuvar ve cihaz kontrolü',
    description:
      'Çözeltiler, cihazlar, kalibrasyon, su analizleri, standart numuneler, kimyasal stokları ve haftalık laboratuvar düzeninin kontrolü için hazırlanır.',
    details: ['XLSX', 'Haftalık takip', 'Kalibrasyon', 'Analiz kontrolü'],
    tags: ['Laboratuvar', 'Kalibrasyon', 'Su analizi', 'Cihaz'],
    button: 'Sırada',
    href: null,
  },
]

const benefits = [
  {
    title: 'Başlamadan önce doğrulama',
    desc: 'Makine, reçete, kumaş ve kimyasal hazırlığındaki eksikler proses başlamadan görülür.',
  },
  {
    title: 'Vardiyalar arası ortak dil',
    desc: 'Kontrol maddeleri kişiye göre değişmez; aynı kriterler her vardiyada uygulanır.',
  },
  {
    title: 'Kayıt ve karşılaştırma',
    desc: 'Uygunsuzluklar, eksikler ve başlatma kararları daha sonra karşılaştırılabilir.',
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
            Kontrol Listeleri
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84">
            Kritik üretim adımlarının başlamadan önce, proses sırasında ve final kontrolde aynı teknik düzenle
            doğrulanmasını sağlayan uygulanabilir kontrol listeleridir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">KONTROL SİSTEMİ</p>
            <h2 className="mb-4 text-3xl font-bold text-navy">
              Kontrol listesi yalnızca işaretleme formu değildir
            </h2>
            <p className="leading-relaxed text-navy/76">
              Her liste, proses başlamadan önce eksikleri görünür hale getirmek, kritik değerleri kaydetmek,
              sorumluluğu belirlemek ve başlatma kararını ölçülebilir bir yapıya bağlamak için hazırlanır.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {benefits.map((item) => (
                <div key={item.title} className="rounded-2xl border border-accent-blue/20 bg-[#F3F6FA] p-4">
                  <p className="mb-2 text-sm font-bold text-navy">{item.title}</p>
                  <p className="text-xs leading-relaxed text-navy/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">KULLANIM ALANLARI</p>
            <div className="grid gap-3">
              {[
                'Boyahane vardiya başlangıçları',
                'Laboratuvar ve reçete hazırlığı',
                'Makine ve su kalitesi kontrolleri',
                'Yıkama ve final kalite doğrulaması',
                'Apre ve terbiye proses hazırlığı',
                'Haftalık cihaz ve analiz kontrolleri',
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
            <p className="section-label">İNDİRİLEBİLİR LİSTELER</p>
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Üretimde doğrudan kullanılabilecek kontrol listeleri
            </h2>
            <p className="leading-relaxed text-navy/72">
              Tamamlanan dosyalar doğrudan indirilebilir. Hazırlık aşamasındaki listelerin durumu kartların üzerinde
              gösterilir.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {checklists.map((item) => (
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

                <div className="mt-auto pt-6">
                  {item.href ? (
                    <a
                      href={item.href}
                      download
                      className="inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-blue"
                    >
                      {item.button}
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed rounded-full bg-navy/10 px-5 py-3 text-sm font-bold text-navy/55">
                      {item.button}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-accent-blue/20 bg-[#061A33] p-7 text-white shadow-sm md:p-9">
          <p className="section-label text-accent-blue">KULLANIM NOTU</p>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Kontrol limitleri işletmenin gerçek şartlarına göre tanımlanmalıdır
          </h2>
          <p className="max-w-4xl leading-relaxed text-white/78">
            Su sertliği, pH, iletkenlik, sıcaklık, süre, hidrofilite, beyazlık ve diğer kabul kriterleri; makine,
            kumaş tipi, reçete, müşteri şartnamesi ve işletme kalite hedeflerine göre doldurulmalıdır.
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
