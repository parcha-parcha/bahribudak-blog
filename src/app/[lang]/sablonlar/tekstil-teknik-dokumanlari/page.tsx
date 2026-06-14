import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Tekstil Teknik Dokümanları | Bahri Budak',
    description:
      'Boyahane, laboratuvar, terbiye ve proses kontrol süreçleri için hazırlanacak teknik eğitim notları, uygulama dokümanları ve kontrol tabloları.',
  }
}

const modules = [
  {
    no: '01',
    title: 'Laboratuvar ve kalite kontrol',
    summary:
      'Laboratuvar süreçlerinde analiz, ölçüm, kayıt ve yorumlama düzeninin aynı teknik standartla yürütülmesi için hazırlanır.',
    purpose:
      'Çözelti hazırlama, titrasyon, pH kontrolü, su sertliği, tuz/iletkenlik takibi, hidrofilite, renk kontrolü ve üretim-laboratuvar uyumunu kayıt altına alan doküman yapısıdır.',
    usage:
      'Laboratuvar sorumluları, kalite kontrol ekipleri, proses sorumluları ve vardiya amirleri tarafından kullanılabilir.',
    examples: [
      'Çözelti hazırlama, etiketleme ve kontrol düzeni',
      'Tuz, sertlik, alkalinite, hidrojen peroksit ve kostik analiz kayıtları',
      'Hidrofilite, emicilik, numune onayı ve üretim sonrası kontrol formları',
      'Cihaz kontrolü, kalibrasyon takibi ve haftalık analiz çizelgesi',
    ],
    output:
      'PDF laboratuvar eğitim notu, DOCX analiz talimatı, XLSX analiz kayıt formu ve proses-laboratuvar karşılaştırma tablosu.',
  },
  {
    no: '02',
    title: 'Boyama prosesleri ve kimya',
    summary:
      'HT jet boyama süreçlerinde reçete mantığı, kimyasal besleme, proses akışı ve yıkama adımlarının anlaşılır hale getirilmesi için hazırlanır.',
    purpose:
      'Reaktif ve dispers boyama süreçlerinde sıcaklık-zaman akışı, tuz-soda besleme düzeni, renk derinliği, boyarmadde sınıfı, yıkama ve düzeltme adımlarını ortak proses diliyle açıklar.',
    usage:
      'Boyahane müdürü, proses sorumlusu, laboratuvar ekibi, reçete hazırlama sorumluları ve vardiya amirleri tarafından kullanılabilir.',
    examples: [
      'HT jet reçete ve proses akış dokümanı',
      'Reaktif boyamada tuz-soda besleme ve fiksaj kontrol notları',
      'Renk gruplarına göre yıkama, sabunlama ve nötralizasyon açıklamaları',
      'Renk düzeltme, gezdirme, söküm ve tekrar işlem değerlendirme formları',
    ],
    output:
      'PDF proses eğitim notu, DOCX reçete açıklama dosyası, XLSX reçete kontrol tablosu ve proses sapma değerlendirme formu.',
  },
  {
    no: '03',
    title: 'Apre, ramöz, şardon ve fikse',
    summary:
      'Terbiye işlemlerinde en, gramaj, çekmezlik, tutum, yüzey görünümü ve fikse kontrolünün sistemli takip edilmesi için hazırlanır.',
    purpose:
      'Apre, ramöz, şardon ve fikse süreçlerinde kumaşın son kalite özelliklerini etkileyen sıcaklık, hız, nem, hava akışı, fular pick-up ve mekanik işlem parametrelerini düzenler.',
    usage:
      'Apre şefi, ramöz operatörü, kalite kontrol ekibi, planlama, proses ve üretim sorumluları tarafından kullanılabilir.',
    examples: [
      'Ramöz fikse sıcaklık-süre-hız değerlendirme notları',
      'Fular pick-up ölçüm ve kontrol formu',
      'Şardon proses kontrolü ve yüzey riski değerlendirmesi',
      'Elastanlı kumaşlarda fikse sonrası çekmezlik kontrol çizelgesi',
    ],
    output:
      'PDF terbiye eğitim notu, DOCX proses talimatı, XLSX ramöz/fikse takip tablosu ve kalite onay formu.',
  },
  {
    no: '04',
    title: 'Kumaş ölçüm, maliyet ve sıfırlama',
    summary:
      'Ham kumaştan mamul kumaşa geçişte ölçüm, fire, maliyet ve proses etkilerinin izlenebilir hale getirilmesi için hazırlanır.',
    purpose:
      'Kumaş sınıflandırması, sıfırlama testi, gramaj/en değişimi, çekmezlik, tekrar işlem, enerji, kimyasal ve işçilik etkilerini ölçülebilir bir değerlendirme yapısına bağlar.',
    usage:
      'İşletme müdürü, planlama, kalite kontrol, proses, maliyet ve üretim ekipleri tarafından kullanılabilir.',
    examples: [
      'Sıfırlama testi uygulama ve sonuç yorumlama dokümanı',
      'Ham en-bitmiş en ve ham gramaj-bitmiş gramaj karşılaştırma tablosu',
      'Tekrar işlem, ikinci kalite ve proses fire hesabı',
      'Üretim sonrası gerçekleşen değerlerle tahmin değerlerini karşılaştırma çizelgesi',
    ],
    output:
      'PDF ölçüm eğitim notu, DOCX değerlendirme talimatı, XLSX maliyet/sıfırlama tablosu ve üretim sonrası karşılaştırma raporu.',
  },
]

const users = [
  'Boyahane müdürü',
  'Proses sorumlusu',
  'Laboratuvar ve kalite ekibi',
  'Apre / ramöz sorumlusu',
  'Vardiya amiri',
  'Eğitim ve dokümantasyon sorumlusu',
]

const fileTypes = [
  {
    title: 'PDF Eğitim Notları',
    desc: 'Operatör, vardiya amiri ve proses ekipleri için hazırlanmış teknik anlatım dosyaları.',
  },
  {
    title: 'DOCX Teknik Dokümanlar',
    desc: 'İşletme koşullarına göre düzenlenebilir proses açıklama, talimat ve uygulama dokümanları.',
  },
  {
    title: 'XLSX Kontrol Tabloları',
    desc: 'Ölçüm, takip, analiz, reçete kontrolü ve proses değerlendirme çizelgeleri.',
  },
]

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'tr'

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="section-label text-accent-blue">Tekstil kaynak merkezi</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Tekstil Teknik Dokümanları
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84">
            Boyahane, laboratuvar, terbiye ve proses kontrol süreçlerinde kullanılabilecek teknik eğitim notları,
            uygulama dokümanları ve kontrol tablolarını kapsayan ana kaynak grubudur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">KAYNAK YAPISI</p>
            <h2 className="mb-4 text-3xl font-bold text-navy">Tekstil işletmeleri için teknik doküman seti</h2>
            <p className="leading-relaxed text-navy/76">
              Bu bölüm; boyahane, laboratuvar, terbiye ve proses kontrol süreçlerinde kullanılabilecek teknik eğitim notları,
              uygulama dokümanları ve kontrol tablolarını kapsar. İçerikler; işletme içinde ortak proses dili oluşturmak,
              ölçüm-kayıt düzenini güçlendirmek ve saha ekiplerinin aynı teknik referansla çalışmasını sağlamak amacıyla hazırlanır.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {fileTypes.map((item) => (
                <div key={item.title} className="rounded-2xl border border-accent-blue/20 bg-[#F3F6FA] p-4">
                  <p className="mb-2 text-sm font-bold text-navy">{item.title}</p>
                  <p className="text-xs leading-relaxed text-navy/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">KİMLER KULLANIR?</p>
            <div className="grid gap-3">
              {users.map((user) => (
                <div key={user} className="flex items-center gap-3 rounded-2xl bg-[#F3F6FA] px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-accent-blue" />
                  <span className="text-sm font-semibold text-navy/82">{user}</span>
                </div>
              ))}
            </div>
            <Link
              href={`/${lang}/contact`}
              className="mt-7 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-blue"
            >
              Teknik kaynak talebi oluştur
            </Link>
          </aside>
        </div>

        <div className="mt-10 grid gap-6">
          {modules.map((module) => (
            <article key={module.no} className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-sm font-black tracking-[0.18em] text-accent-blue">{module.no}</p>
                  <h3 className="text-2xl font-bold text-navy md:text-3xl">{module.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/64">{module.summary}</p>
                </div>
                <span className="w-fit rounded-full border border-accent-blue/25 bg-[#F3F6FA] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-navy/70">
                  Kaynak grubu
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-gray-border bg-white p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/55">Amaç</p>
                  <p className="text-sm leading-relaxed text-navy/76">{module.purpose}</p>
                  <p className="mt-5 mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/55">Kullanım alanı</p>
                  <p className="text-sm leading-relaxed text-navy/76">{module.usage}</p>
                </div>

                <div className="rounded-2xl bg-[#F3F6FA] p-5">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-navy/55">İçerik örnekleri</p>
                  <ul className="grid gap-3">
                    {module.examples.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy/76">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-accent-blue/20 bg-[#F3F6FA] p-5">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/55">Çıktı formatı</p>
                <p className="text-sm leading-relaxed text-navy/76">{module.output}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-accent-blue/20 bg-[#061A33] p-7 text-white shadow-sm md:p-9">
          <p className="section-label text-accent-blue">KULLANIM NOTU</p>
          <h2 className="mb-4 text-3xl font-bold text-white">Teknik kaynaklar işletme şartlarına göre uyarlanır</h2>
          <p className="max-w-4xl leading-relaxed text-white/78">
            Bu kaynaklar eğitim, kontrol ve proses standardizasyonu amacıyla hazırlanır. Reçete, kabul limiti veya proses parametresi
            içeren uygulamalarda işletme makinesi, kumaş tipi, renk derinliği, flotte, müşteri şartnamesi ve kalite hedefleri ayrıca değerlendirilmelidir.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${lang}/magazam`} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-accent-blue hover:text-white">
              Kaynak merkezine dön
            </Link>
            <Link href={`/${lang}/contact`} className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-navy">
              Talep oluştur
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
