import Link from 'next/link'

const services = [
  {
    no: '01',
    title: 'Boyahane Proses Danışmanlığı',
    subtitle: 'Kasar · Reaktif boyama · Yıkama · Proses kontrol',
    description: 'Üretimde tekrar işleme, renk farkı, proses süresi, kimyasal kullanım ve kalite sapmalarını azaltmaya yönelik saha temelli danışmanlık yapısı.',
    details: ['Proses akış kontrolü', 'Reçete ve zaman standardı', 'Hata nedeni analizi', 'Maliyet ve verim takibi'],
  },
  {
    no: '02',
    title: 'Tekstil Teknik Eğitimleri',
    subtitle: 'Operatör · Vardiya · Laboratuvar · Yönetim',
    description: 'Boyahane ve terbiye işletmelerinde çalışan ekipler için sade, ölçülebilir ve uygulanabilir eğitim notları hazırlanır.',
    details: ['Kasar ve ön terbiye', 'Reaktif boyama', 'Yıkama ve haslık', 'Laboratuvar kontrolleri'],
  },
  {
    no: '03',
    title: 'Laboratuvar ve Kalite Kontrol Sistemi',
    subtitle: 'pH · Sertlik · Tuz · Renk · Haslık',
    description: 'Parti kabul, proses kontrol, son kontrol ve tekrar işlem kararlarının ölçülebilir hale getirilmesi için kontrol sistemi kurulur.',
    details: ['Test planı', 'Kabul kriterleri', 'Kontrol formları', 'Raporlama standardı'],
  },
  {
    no: '04',
    title: 'Teknik Dokümantasyon Hazırlama',
    subtitle: 'Form · Liste · Rapor · Eğitim dosyası',
    description: 'Sahada kullanılan teknik bilgi, okunabilir ve sürdürülebilir doküman sistemine dönüştürülür.',
    details: ['Proses formu', 'Kontrol listesi', 'Teknik rapor', 'Müşteri teslim dosyası'],
  },
  {
    no: '05',
    title: 'Üretim Verimliliği ve Maliyet Analizi',
    subtitle: 'Enerji · Su · Kimyasal · Süre · Fire',
    description: 'İşletme verileri üzerinden fire, tekrar işlem, enerji, su, kimyasal ve zaman kayıpları görünür hale getirilir.',
    details: ['Fire analizi', 'Tekrar işlem maliyeti', 'Makine verimi', 'Kapasite değerlendirme'],
  },
  {
    no: '06',
    title: 'Kurumsal Teknik Dosya Tasarımı',
    subtitle: 'Teklif · Sunum · Şablon · Eğitim notu',
    description: 'Teknik içeriğin müşteriye, yönetime veya ekibe profesyonel görünümle sunulması için kurumsal dosya yapısı hazırlanır.',
    details: ['Teklif dosyası', 'Sunum kapağı', 'Eğitim notu', 'Şablon standardı'],
  },
]

const reasons = [
  '35 yıllık tekstil üretim ve yönetim deneyimi',
  'Boyahane, terbiye ve fabrika yönetimi saha bilgisi',
  'Teoriden çok uygulanabilir proses yaklaşımı',
  'Teknik bilgiyi doküman ve eğitim sistemine dönüştürme yetkinliği',
]

export default function HizmetlerPage() {
  const contactPath = '/tr/contact'

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-navy">
      <section className="bg-[#061A33] text-white bb-pattern">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="section-label text-white/60">HİZMETLER</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Tekstil proses danışmanlığı ve teknik eğitim hizmetleri</h1>
          <p className="text-white/78 leading-relaxed max-w-3xl text-lg">
            Hizmet yapısı; boyahane prosesleri, kalite kontrol, teknik eğitim, maliyet/verimlilik analizi ve uygulanabilir dokümantasyon üzerine kuruludur.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <article key={service.no} className="rounded-2xl bg-white border border-gray-border p-7 shadow-sm hover:shadow-card transition-all">
              <div className="flex items-start gap-5 mb-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 text-accent-blue font-black tracking-wider">
                  {service.no}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-2">{service.title}</h2>
                  <p className="text-sm font-semibold text-navy/60">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-navy/82 leading-relaxed mb-5">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.details.map((item) => (
                  <span key={item} className="rounded-full bg-[#F3F6FA] border border-gray-border px-3 py-1 text-xs font-semibold text-navy/80">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-[28px] bg-[#061A33] text-white p-8 md:p-10 bb-pattern">
          <p className="section-label text-white/55">NEDEN BAHRİ BUDAK?</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Deneyim, saha bilgisi ve uygulanabilir sistem yaklaşımı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div key={reason} className="rounded-2xl bg-white/8 border border-white/14 p-5 flex gap-4 items-start">
                <span className="text-accent-blue font-black tracking-wider">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-white/86 font-medium leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="section-label">İLETİŞİM</p>
            <h2 className="text-3xl font-bold text-navy mb-3">İhtiyacınıza göre teknik çalışma kapsamı çıkaralım.</h2>
            <p className="text-navy/72 leading-relaxed">Boyahane, eğitim, proses formu, maliyet analizi veya teknik dosya hazırlığı için ilk kapsamı birlikte netleştirebiliriz.</p>
          </div>
          <Link href={contactPath} className="btn-primary whitespace-nowrap">İletişime Geç →</Link>
        </div>
      </section>
    </main>
  )
}
