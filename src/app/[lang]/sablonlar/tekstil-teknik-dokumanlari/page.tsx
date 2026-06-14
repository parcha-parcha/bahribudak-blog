import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Tekstil Teknik Dokümanları | Bahri Budak',
    description:
      'Laboratuvar kalite kontrol, boyama prosesleri, apre/ramöz/fikse ve kumaş ölçüm-maliyet başlıklarını indirilebilir teknik kaynak mantığına dönüştüren doküman grubu.',
  }
}

const modules = [
  {
    no: '01',
    title: 'Laboratuvar ve kalite kontrol dokümanları',
    purpose:
      'Boyahane laboratuvarında çözelti hazırlama, titrasyon, hidrofilite, test standartları, renk kontrolü ve kritik proses kontrol noktalarını aynı kayıt düzeninde toplamak için hazırlanır.',
    scope: [
      'Tuz, soda, kostik ve yardımcı kimyasal çözeltileri için hazırlama, etiketleme ve hesaplama düzeni',
      'Kostik soda, hidrojen peroksit, tuz/klorür, alkalinite ve sertlik analizlerinde amaç, ekipman, işlem, hesap ve kabul yorumu',
      'Damla testi, emme süresi, kapiler yükselme ve proses sonrası hidrofilite karşılaştırması',
      'pH metre, iletkenlik, terazi, pipet ve renk ölçüm cihazları için kalibrasyon / kontrol planı',
    ],
    output: 'Analiz kayıt formu, haftalık kontrol çizelgesi, laboratuvar eğitim notu ve proses-laboratuvar karşılaştırma formu.',
  },
  {
    no: '02',
    title: 'Boyama prosesleri ve kimya dokümanları',
    purpose:
      'HT jet boyama süreçlerinde reçete, sıcaklık-zaman akışı, tuz-soda besleme mantığı, iletkenlik kontrolü, renk düzeltme ve yıkama adımlarını tek teknik dil altında toplamak için hazırlanır.',
    scope: [
      'HT jet reçete ve proses akışında sıcaklık, süre, dozaj noktası, bekleme ve yıkama adımları',
      'Reaktif boyamada tuz-soda miktarlarının renk derinliği, kumaş tipi ve boyarmadde sınıfına göre değerlendirilmesi',
      'İletkenlik ölçümünün yardımcı proses doğrulama parametresi olarak kullanılması',
      'Renk söküm, gezdirme reçeteleri, nötralizasyon, yıkama ve haslık bağlantısı',
    ],
    output: 'PDF proses notu, DOCX reçete açıklama dosyası, renk düzeltme karar notu ve proses sapma formu.',
  },
  {
    no: '03',
    title: 'Apre, ramöz, şardon ve fikse dokümanları',
    purpose:
      'Ramöz hava akışı, fular pick-up kontrolü, şardon tel seçimi, elastanlı kumaş fikse hesabı ve apre kalite kontrolünü tek proses ailesi içinde sınıflandırmak için hazırlanır.',
    scope: [
      'Ramöz egzost / klape ayarı, kabin nemi, hava akışı ve enerji kaybı kontrol mantığı',
      'Fular sıkma basıncı, banyo seviyesi, kumaş geçişi ve pick-up hesap düzeni',
      'Pamuk, pamuk-polyester ve polyester kumaşlarda şardon tel seçimi ve tüy riski',
      '20/30/40 denye elastan için sıcaklık, süre, hız ve çekmezlik doğrulama mantığı',
    ],
    output: 'Ramöz vardiya kontrol formu, pick-up ölçüm formu, fikse sonrası çekmezlik kayıt formu ve kalite onay kartı.',
  },
  {
    no: '04',
    title: 'Kumaş ölçüm, maliyet ve sıfırlama dokümanları',
    purpose:
      'Kumaş sınıflandırması, sıfırlama testi, ham enden bitmiş ene katsayı metodu, gramaj/en/çekmezlik ölçümü ve maliyet hesabını üretim ön değerlendirme dosyası haline getirmek için hazırlanır.',
    scope: [
      'Kumaşların elyaf, örgü tipi, lycra durumu, iplik numarası, pus/fein, en ve gramaj bilgileriyle sınıflandırılması',
      '90°C yıkama simülasyonu ile sıfırlama testi, kurutma, ölçüm ve sonuç yorumlama adımları',
      'Sıfırlama testi yoksa hızlı ön tahmin için katsayı metodu ve gerçek üretimle güncelleme mantığı',
      'Ham gramaj, bitmiş gramaj, proses fireleri, boya/kimyasal, enerji, işçilik ve genel gider ayrımı',
    ],
    output: 'Numune ölçüm şablonu, katsayı güncelleme çizelgesi, maliyet varsayım sayfası ve üretim sonrası karşılaştırma tablosu.',
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

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'tr'

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="section-label text-accent-blue">Ana indirilebilir kaynak alanı</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Tekstil Teknik Dokümanları
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84">
            Boyahane, laboratuvar, terbiye ve proses kontrol süreçlerinde kullanılabilecek eğitim, kontrol ve uygulama dokümanlarını bir araya getiren ana teknik kaynak grubudur.
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
              ölçüm-kayıt düzenini güçlendirmek ve saha ekiplerinin aynı teknik referansla çalışmasını sağlamak için hazırlanır.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                { title: 'PDF Eğitim Notları', desc: 'Operatör, vardiya amiri ve proses ekipleri için teknik anlatım dosyaları.' },
                { title: 'DOCX Teknik Dokümanlar', desc: 'İşletmeye göre düzenlenebilir proses açıklama ve talimat dosyaları.' },
                { title: 'XLSX Kontrol Tabloları', desc: 'Ölçüm, takip, analiz ve proses kontrol çizelgeleri.' },
              ].map((item) => (
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
                </div>
                <span className="w-fit rounded-full border border-accent-blue/25 bg-[#F3F6FA] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-navy/70">
                  Kaynak grubu
                </span>
              </div>

              <p className="mb-6 leading-relaxed text-navy/76">{module.purpose}</p>

              <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
                <div className="rounded-2xl bg-[#F3F6FA] p-5">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-navy/55">İçerik başlıkları</p>
                  <ul className="grid gap-3">
                    {module.scope.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy/76">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-border bg-white p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-navy/55">Çıktı formatı</p>
                  <p className="text-sm leading-relaxed text-navy/76">{module.output}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-accent-blue/20 bg-[#061A33] p-7 text-white shadow-sm md:p-9">
          <p className="section-label text-accent-blue">YAYINA UYGUNLUK NOTU</p>
          <h2 className="mb-4 text-3xl font-bold text-white">Teknik kaynaklar işletme şartlarına göre uyarlanır</h2>
          <p className="max-w-4xl leading-relaxed text-white/78">
            Bu bölümde yer alan teknik kaynaklar; eğitim, kontrol ve proses standardizasyonu amacıyla hazırlanır. Reçete, kabul limiti
            veya proses parametresi içeren uygulamalarda işletme makinesi, kumaş tipi, renk derinliği, flotte, müşteri şartnamesi
            ve kalite hedefleri ayrıca değerlendirilmelidir.
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
