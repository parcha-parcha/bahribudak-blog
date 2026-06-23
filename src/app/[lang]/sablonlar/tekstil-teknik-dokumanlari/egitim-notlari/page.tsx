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
      'Kasar, reaktif, dispers, poliamid asit boyama, polyester/pamuk karışım boyama, boyama sonrası yıkama, HT jet proses yönetimi, renk düzeltme ve laboratuvar reçetesinin işletmeye aktarılması konularında hazırlanmış tekstil eğitim notları.',
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
      'Reaktif boyarmadde-lif ilişkisini; lif yüzeyine alınma, lif içine ilerleme, kumaş üzerinde renk dengelenmesi, elektrolit, alkali, pH, kimyasal bağlanma, suyla bozulma, HT jet proses seçenekleri, yıkama ve kalite kontrolüyle birlikte açıklar.',
    details: ['9 sayfa', 'PDF / DOCX', '14 bölüm', 'Proses ve hesaplama tabloları'],
    tags: ['Reaktif boyama', 'Pamuk', 'HT jet', 'Kimyasal bağlanma', 'Suyla bozulma', 'Art yıkama'],
    pdf: '/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.pdf',
    docx: '/downloads/pamuk-orme-kumaslarda-reaktif-boyama-egitimi-r2.docx',
  },
  {
    no: '03',
    status: 'İNDİRİLEBİLİR',
    title: 'Polyester Örme Kumaşlarda Dispers Boyama Eğitimi',
    category: 'Polyester ve polyester-elastan boyama',
    description:
      'Dispers boyarmaddenin banyoda homojen dağılımını, boya çekimini, lif içine ilerlemesini, boyarmadde enerji sınıflarını, HT jet prosesini, pH ve yardımcı kimyasal yönetimini, indirgen temizlemeyi, oligomer ve ısı etkisiyle boya göçü risklerini sade Türkçe terminolojiyle açıklar.',
    details: ['11 sayfa', 'PDF / DOCX', '16 bölüm', 'Proses ve hata analiz tabloları'],
    tags: ['Dispers boyama', 'Polyester', 'Elastan', 'İndirgen temizleme', 'Oligomer', 'Isıl boya göçü'],
    pdf: '/downloads/polyester-orme-kumaslarda-dispers-boyama-egitimi-r1.pdf',
    docx: '/downloads/polyester-orme-kumaslarda-dispers-boyama-egitimi-r1.docx',
  },
  {
    no: '04',
    status: 'İNDİRİLEBİLİR',
    title: 'Naylon / Poliamid Kumaşlarda Asit Boyama Eğitimi',
    category: 'Poliamid ve poliamid-elastan boyama',
    description:
      'Asit boyarmadde-poliamid ilişkisini; boya çekim oranı, ilk boya alımı, lif içine ilerleme, bağlama kapasitesi, pH profili, asit dozajı, sıcaklık, düzgünlük, art işlem, haslık ve poliamid-elastan riskleriyle birlikte sade Türkçe terminolojiyle açıklar.',
    details: ['9 sayfa', 'PDF / DOCX', '16 bölüm', 'Proses ve hata analiz tabloları'],
    tags: ['Naylon', 'Poliamid', 'Asit boyama', 'pH', 'Düzgünlük', 'Haslık'],
    pdf: '/downloads/naylon-poliamid-kumaslarda-asit-boyama-egitimi-r3.pdf',
    docx: '/downloads/naylon-poliamid-kumaslarda-asit-boyama-egitimi-r3.docx',
  },
  {
    no: '05',
    status: 'İNDİRİLEBİLİR',
    title: 'Polyester / Pamuk Karışımlarda Boyama Eğitimi',
    category: 'Karışım kumaşlarda dispers ve reaktif proses yönetimi',
    description:
      'Polyester/pamuk ve polyester/pamuk/elastan örme kumaşlarda boya sınıfı seçimini, lif oranı hesabını, çift banyo-iki aşama ve tek banyo-iki aşama proseslerini, pH-sıcaklık geçişini, indirgen temizlemeyi, reaktif yıkamayı, ton eşleştirmeyi ve kalite kontrolünü saha terminolojisiyle açıklar.',
    details: ['10 sayfa', 'PDF / DOCX', '18 bölüm', 'Tek ve çift banyo karşılaştırması'],
    tags: ['PES/CO', 'Karışım kumaş', 'Dispers boyama', 'Reaktif boyama', 'İndirgen temizleme', 'Ton eşleştirme'],
    pdf: '/downloads/pamuk-polyester-karisimlarda-boyama-egitimi-r1.pdf',
    docx: '/downloads/pamuk-polyester-karisimlarda-boyama-egitimi-r1.docx',
  },
  {
    no: '06',
    status: 'İNDİRİLEBİLİR',
    title: 'Boyama Sonrası Yıkama ve İndirgen Temizleme Eğitimi',
    category: 'Yaş haslık, yüzey boyası ve final kalite yönetimi',
    description:
      'Reaktif boyamada bağlanmamış boyanın sıcak yıkamayla uzaklaştırılmasını, polyesterde indirgen temizlemeyi, açık-koyu renk yıkama farklarını, final pH ve iletkenlik kontrolünü, elastan risklerini, makine temizliğini ve haslık yönetimini saha terminolojisiyle açıklar.',
    details: ['10 sayfa', 'PDF / DOCX', '19 bölüm', 'Örnek proses ve hata tabloları'],
    tags: ['Art yıkama', 'Reaktif sıcak yıkama', 'İndirgen temizleme', 'Final pH', 'Yaş haslık', 'Makine temizliği'],
    pdf: '/downloads/boyama-sonrasi-yikama-ve-indirgen-temizleme-egitimi-r1.pdf',
    docx: '/downloads/boyama-sonrasi-yikama-ve-indirgen-temizleme-egitimi-r1.docx',
  },
  {
    no: '07',
    status: 'İNDİRİLEBİLİR',
    title: 'HT Jet Boyahanede Proses Yönetimi ve Kritik Kontrol Noktaları Eğitimi',
    category: 'Boyahane proses yönetimi ve tekrar üretilebilirlik',
    description:
      'Sipariş gözden geçirmeden laboratuvardan üretime aktarıma; kumaş, makine, su, boya ve kimyasal ön koşullarından pH, sıcaklık, dozaj ve dolaşım kontrolüne; sapma, ilave, vardiya teslimi, kök neden ve performans göstergelerine kadar bütün proses zincirini ölçülebilir bir yönetim sistemi içinde açıklar.',
    details: ['8 sayfa', 'PDF / DOCX', '20 bölüm', 'Kontrol planı ve KPI tabloları'],
    tags: ['Proses yönetimi', 'Kritik kontrol', 'İlk seferde doğru üretim', 'Sapma yönetimi', 'KPI', 'İzlenebilirlik'],
    pdf: '/downloads/ht-jet-boyahanede-proses-yonetimi-egitimi-r1.pdf',
    docx: '/downloads/ht-jet-boyahanede-proses-yonetimi-egitimi-r1.docx',
  },
  {
    no: '08',
    status: 'İNDİRİLEBİLİR',
    title: 'Boyahanelerde Renk İlavesi ve Renk Düzeltme Yönetimi Eğitimi',
    category: 'Renk düzeltme, yeniden işlem ve maliyet yönetimi',
    description:
      'Renk farkının değerlendirilmesinden ilave kararına; tek ve iki yarım banyo, yeni banyoda ilave, apreden dönen mal, söküm ve yeniden boyama senaryolarından kök neden, kayıt, performans göstergeleri, maliyet ve iyileştirme sistemine kadar bütün süreci saha verileriyle açıklar.',
    details: ['13 sayfa', 'PDF / DOCX', '18 bölüm', 'Maliyet ve KPI tabloları'],
    tags: ['Renk ilavesi', 'Renk düzeltme', 'Yarım banyo', 'Kök neden', 'İlk seferde doğru üretim', 'Maliyet yönetimi'],
    pdf: '/downloads/boyahanelerde-renk-ilavesi-ve-renk-duzeltme-yonetimi-egitimi-r1.pdf',
    docx: '/downloads/boyahanelerde-renk-ilavesi-ve-renk-duzeltme-yonetimi-egitimi-r1.docx',
  },
  {
    no: '09',
    status: 'İNDİRİLEBİLİR',
    title: 'Laboratuvar Reçetesinden İşletme Reçetesine Geçiş Eğitimi',
    category: 'Ölçek büyütme, reçete aktarımı ve ilk parti yönetimi',
    description:
      'Laboratuvar numunesinden işletme partisine geçişte kumaş, ön terbiye, su, boya, kimyasal, makine, gerçek flotte, sıcaklık, pH, süre ve dozaj değişkenlerinin nasıl eşleştirileceğini; % HT, g/L ve stok çözelti hesaplarını; reaktif, dispers ve asit boyamada aktarım kurallarını ve ilk parti onay sistemini açıklar.',
    details: ['12 sayfa', 'PDF / DOCX', '18 bölüm', 'Hesap, aktarım ve KPI tabloları'],
    tags: ['Laboratuvar reçetesi', 'İşletme reçetesi', 'Ölçek büyütme', 'Gerçek flotte', 'İlk parti', 'İlk seferde doğru üretim'],
    pdf: '/downloads/laboratuvar-recetesinden-isletme-recetesine-gecis-egitimi-r1.pdf',
    docx: '/downloads/laboratuvar-recetesinden-isletme-recetesine-gecis-egitimi-r1.docx',
  },
  {
    no: '10',
    status: 'İNDİRİLEBİLİR',
    title: 'HT Jet Makinesinde Proses Kontrolü Eğitimi',
    category: 'Makine ayarları, çevrim kontrolü ve proses güvenliği',
    description:
      'HT jet makinesinde üretim öncesi uygunluk, parti ve yükleme hazırlığı, dikiş-halat kontrolü, gerçek flotte, kumaş hızı, tur süresi, düze, pompa, sıcaklık, basınç, dozaj, pH, iletkenlik, numune, alarm, sapma, boşaltma, temizlik ve vardiya kayıtlarını saha uygulamalarıyla açıklar.',
    details: ['14 sayfa', 'PDF / DOCX', '18 bölüm', 'Hesap, kontrol ve KPI tabloları'],
    tags: ['HT jet', 'Kumaş tur süresi', 'Gerçek flotte', 'Düze ve pompa', 'Dozaj kontrolü', 'Proses güvenliği'],
    pdf: '/downloads/ht-jet-makinesinde-proses-kontrolu-egitimi-r1.pdf',
    docx: '/downloads/ht-jet-makinesinde-proses-kontrolu-egitimi-r1.docx',
  },

  {
    no: '11',
    status: 'İNDİRİLEBİLİR',
    title: 'Renk, Haslık ve Final Kalite Kontrolleri Eğitimi',
    category: 'Renk ölçümü, haslık ve sevk onay yönetimi',
    description:
      'Boyalı ve apreli örme kumaşlarda numune alma, kondisyonlama, ışık kabini ve spektrofotometre ile renk kontrolü, renk farkı ve metamerizm, yıkama-su-sürtme-ter-ışık haslıkları, çekmezlik, dönme, gramaj, fiziksel performans, top kontrolü, karantina ve serbest bırakma kararlarını sistematik biçimde açıklar.',
    details: ['13 sayfa', 'PDF / DOCX', '18 bölüm', 'Test, karar ve KPI tabloları'],
    tags: ['Renk kontrolü', 'Spektrofotometre', 'Haslık', 'Çekmezlik', 'Final kalite', 'Serbest bırakma'],
    pdf: '/downloads/renk-haslik-ve-final-kalite-kontrolleri-egitimi-r1.pdf',
    docx: '/downloads/renk-haslik-ve-final-kalite-kontrolleri-egitimi-r1.docx',
  },
  {
    no: '12',
    status: 'İNDİRİLEBİLİR',
    title: 'Ramöz ve Apre Proses Kontrolü Eğitimi',
    category: 'Kurutma, ısı ile fikse, boyut ve apre yönetimi',
    description:
      'Örme kumaşlarda apre banyosu ve kimyasal uyumundan alınan flotte oranına; en, pozitif besleme, kumaş gerginliği, zincir, iğne-mandal, kurutma, ısı ile fikse, kürleme, gerçek kumaş sıcaklığı, etkin kalış süresi, en-gramaj-çekmezlik dengesi, kalite, sapma ve enerji yönetimine kadar ramöz prosesini sistematik biçimde açıklar.',
    details: ['14 sayfa', 'PDF / DOCX', '18 bölüm', 'Formül, kontrol ve KPI tabloları'],
    tags: ['Ramöz', 'Apre', 'Alınan flotte', 'Pozitif besleme', 'Isı ile fikse', 'Enerji yönetimi'],
    pdf: '/downloads/ramoz-ve-apre-proses-kontrolu-egitimi-r1.pdf',
    docx: '/downloads/ramoz-ve-apre-proses-kontrolu-egitimi-r1.docx',
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
