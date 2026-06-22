// SON SÜRÜM: İKİ FORM AKTİF — 22.06.2026
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Proses Formları | Bahri Budak',
    description:
      'Boyahane üretiminde parti, reçete, makine, ölçüm, kalite ve proses sapmalarının düzenli takip edilmesini sağlayan uygulanabilir formlar.',
  }
}

const forms = [
  {
    no: '01',
    status: 'İNDİRİLEBİLİR',
    title: 'Boyama Parti Takip Formu',
    category: 'Boyahane üretim ve proses takibi',
    description:
      'Sipariş, kumaş, makine, yükleme, flotte, reçete, proses parametreleri, kritik kontroller, sapmalar ve final kalite sonuçlarını tek kayıt düzeninde birleştiren kapsamlı Excel formudur.',
    details: ['XLSX', '3 çalışma sayfası', '200 parti kaydı', 'Otomatik hesaplama'],
    tags: ['Parti takibi', 'Reçete', 'Makine', 'Kalite', 'Sapma analizi'],
    button: 'XLSX dosyasını indir',
    href: '/downloads/boyama-parti-takip-formu-kurumsal-r3.xlsx',
  },
  {
    no: '02',
    status: 'İNDİRİLEBİLİR',
    title: 'Reçete Hazırlama ve Onay Formu',
    category: 'Laboratuvar ve işletme reçete yönetimi',
    description:
      'Laboratuvar reçetesinin işletmeye aktarılması, boyarmadde ve kimyasal miktarlarının otomatik hesaplanması, tartım farklarının kontrolü, revizyonların kaydedilmesi ve yetkili onaylarının izlenmesi için hazırlanmış Excel formudur.',
    details: ['XLSX', '3 çalışma sayfası', '20 malzeme satırı', 'Otomatik doz hesabı'],
    tags: ['Laboratuvar', 'Reçete', 'Dozaj', 'Revizyon', 'Onay'],
    button: 'XLSX dosyasını indir',
    href: '/downloads/recete-hazirlama-ve-onay-formu-kurumsal-r2.xlsx',
  },
  {
    no: '03',
    status: 'İNDİRİLEBİLİR',
    title: 'Ramöz ve Apre Proses Takip Formu',
    category: 'Apre ve terbiye prosesleri',
    description:
      'Kumaş ve sipariş bilgileri, apre banyosu, 12 kamara sıcaklığı, makine hızı, kalış süresi, overfeed, zincir eni, fular basıncı, pick-up, giriş-çıkış ölçümleri, sapmalar ve final kalite sonuçlarını tek Excel düzeninde izler.',
    details: ['XLSX', '3 çalışma sayfası', '12 kamara takibi', 'Otomatik hesaplama'],
    tags: ['Ramöz', 'Apre', 'Fikse', 'Pick-up', 'Kalite'],
    button: 'XLSX dosyasını indir',
    href: '/downloads/ramoz-apre-proses-takip-formu-kurumsal-r1.xlsx',
  },
  {
    no: '04',
    status: 'SIRADA',
    title: 'Hata, Kök Neden ve Düzeltici Faaliyet Formu',
    category: 'Kalite ve proses iyileştirme',
    description:
      'Üretim hatasının tanımlanması, olası nedenlerin değerlendirilmesi, kök nedenin doğrulanması, düzeltici faaliyetlerin atanması ve sonuçların izlenmesi için hazırlanır.',
    details: ['XLSX / DOCX', 'Kök neden', 'Aksiyon takibi', 'Kapanış kontrolü'],
    tags: ['Hata analizi', 'Kök neden', 'Düzeltici faaliyet', 'Kalite'],
    button: 'Sırada',
    href: null,
  },
]

const users = [
  'Boyahane müdürü',
  'Vardiya amiri ve vardiya mühendisi',
  'Proses kontrol ekibi',
  'Laboratuvar ve kalite kontrol',
  'Operatör ve reçete hazırlama sorumlusu',
  'Planlama ve üretim yönetimi',
]

const benefits = [
  {
    title: 'Ortak kayıt düzeni',
    desc: 'Vardiyalar ve bölümler aynı bilgi alanlarını kullanır; eksik veya farklı kayıt biçimleri azaltılır.',
  },
  {
    title: 'İzlenebilir proses',
    desc: 'Reçete, makine, sıcaklık, süre, pH, kalite ve sapma kayıtları aynı parti numarası altında izlenir.',
  },
  {
    title: 'Ölçülebilir performans',
    desc: 'Planlanan ve gerçekleşen süre, uygun parti oranı ve tekrar işlem oranı otomatik hesaplanabilir.',
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
            Proses Formları
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84">
            Boyahane, laboratuvar, kalite ve terbiye süreçlerinde reçete, parti, makine, ölçüm ve işlem
            bilgilerinin aynı kayıt düzeninde izlenmesini sağlayan uygulanabilir form setidir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-gray-border bg-white p-7 shadow-sm md:p-9">
            <p className="section-label">FORM SİSTEMİ</p>
            <h2 className="mb-4 text-3xl font-bold text-navy">
              Kayıttan yönetime uzanan proses takibi
            </h2>
            <p className="leading-relaxed text-navy/76">
              Formlar yalnızca bilgi yazmak için değil; prosesin planlanan şekilde yürütülüp yürütülmediğini
              görmek, sapmaları kaydetmek, tekrar işlemleri azaltmak ve üretim sonuçlarını karşılaştırmak amacıyla
              hazırlanır.
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
              Özel form talebi oluştur
            </Link>
          </aside>
        </div>

        <div className="mt-12">
          <div className="mb-7 max-w-3xl">
            <p className="section-label">İNDİRİLEBİLİR FORMLAR</p>
            <h2 className="mb-4 text-3xl font-bold text-navy md:text-4xl">
              Üretimde kullanılabilecek form seti
            </h2>
            <p className="leading-relaxed text-navy/72">
              Tamamlanan dosyalar doğrudan indirilebilir. Hazırlık aşamasındaki formların güncel durumu kartların
              üzerinde gösterilir.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {forms.map((form) => (
              <article
                key={form.no}
                className="flex h-full flex-col rounded-[2rem] border border-gray-border bg-white p-6 shadow-sm md:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-blue/20 bg-[#F3F6FA] text-lg font-black text-accent-blue">
                    {form.no}
                  </span>
                  <span className="rounded-full border border-accent-blue/25 bg-[#F3F6FA] px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-navy/65">
                    {form.status}
                  </span>
                </div>

                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-accent-blue">
                  {form.category}
                </p>
                <h3 className="text-2xl font-bold leading-tight text-navy">{form.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-navy/72">{form.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {form.details.map((detail) => (
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
                    {form.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-navy/65">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  {form.href ? (
                    <a
                      href={form.href}
                      download
                      className="inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-blue"
                    >
                      {form.button}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed rounded-full bg-navy/10 px-5 py-3 text-sm font-bold text-navy/55"
                    >
                      {form.button}
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
            Formlar işletmenin makine ve organizasyon yapısına göre uyarlanır
          </h2>
          <p className="max-w-4xl leading-relaxed text-white/78">
            Makine numaraları, proses adları, onay kademeleri, kalite limitleri ve raporlama alanları işletmenin
            gerçek çalışma düzenine göre güncellenmelidir. Formlar tek başına proses talimatı yerine geçmez.
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
