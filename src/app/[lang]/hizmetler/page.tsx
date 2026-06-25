import type { Metadata } from 'next'
import Link from 'next/link'
import { isLang, type Lang } from '@/lib/i18n'

interface ServicesProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: ServicesProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const title = lang === 'tr' ? 'Teknik Hizmetler' : 'Technical Services'
  const description =
    lang === 'tr'
      ? 'Örgü, boya ve apre proseslerinde saha danışmanlığı, teknik eğitim, dokümantasyon ve performans iyileştirme hizmetleri.'
      : 'Field consulting, technical training, documentation and performance improvement services for knitting, dyeing and finishing processes.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/hizmetler`,
      languages: {
        tr: `${siteUrl}/tr/hizmetler`,
        en: `${siteUrl}/en/hizmetler`,
      },
    },
  }
}

export default async function ServicesPage({ params }: ServicesProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'TEKNİK HİZMETLER',
          title: 'Örgü, boya ve apre süreçleri için saha temelli çalışma modelleri.',
          summary:
            'Her çalışma; mevcut durum, ölçülebilir hedef, proses verisi, kök neden, uygulama planı ve sonuç doğrulaması üzerinden yapılandırılır.',
          services: [
            {
              no: '01',
              title: 'Örgü / Knitting Proses Analizi',
              subtitle: 'İplik · Makine · İlmek boyu · Gramaj · En',
              description:
                'İplik özellikleri, makine inceliği / gauge, ilmek boyu, elastan besleme, gramaj, en ve örme kaynaklı kalite sapmaları birlikte değerlendirilir.',
              details: ['Konstrüksiyon kontrolü', 'İlmek boyu standardı', 'Gramaj–en ilişkisi', 'Hata kök nedeni'],
            },
            {
              no: '02',
              title: 'Boyahane / Dyeing Proses Danışmanlığı',
              subtitle: 'Kasar · Boyama · Yıkama · HT Jet · Reçete',
              description:
                'Ön terbiye, reaktif ve dispers boyama, yıkama, pH, sıcaklık, tuz, alkali, makine dinamiği ve tekrar işleme nedenleri ölçülebilir proses planına bağlanır.',
              details: ['Reçete standardı', 'Dozaj sırası', 'Makine çevrimi', 'Renk ve haslık kontrolü'],
            },
            {
              no: '03',
              title: 'Apre / Finishing Proses Danışmanlığı',
              subtitle: 'Ramöz · Kompaktör · Fikse · Boyutsal stabilite',
              description:
                'Ramöz ve kompaktör ayarları; giriş rutubeti, overfeed, en, gramaj, gerçek kumaş sıcaklığı, çekme, spiralite ve tuşe hedefleriyle birlikte yönetilir.',
              details: ['Stabil en hedefi', 'Overfeed yönetimi', 'Mekanik kompaksiyon', 'Çekme ve spiralite'],
            },
            {
              no: '04',
              title: 'Teknik Dokümantasyon ve Eğitim',
              subtitle: 'Form · Kontrol listesi · Teknik yayın · Eğitim',
              description:
                'Saha bilgisinin vardiya, laboratuvar, kalite ve yönetim ekiplerinin kullanabileceği kontrollü dokümanlara ve eğitim sistemine dönüşmesi sağlanır.',
              details: ['Proses formları', 'Kontrol listeleri', 'Eğitim notları', 'Doküman revizyonu'],
            },
          ],
          whyLabel: 'ÇALIŞMA PRENSİBİ',
          whyTitle: 'Sabit reçete değil; doğrulanabilir proses sistemi.',
          reasons: [
            'Ölçüm yapılmadan ayar önerilmez.',
            'Makine, elyaf, iplik ve konstrüksiyon birlikte değerlendirilir.',
            'Düzeltici faaliyet, doğrulanmış kök nedene bağlanır.',
            'Sonuç; kalite, kapasite, maliyet ve sürdürülebilirlik birlikte izlenerek değerlendirilir.',
          ],
          contactLabel: 'İLETİŞİM',
          contactTitle: 'İhtiyacınıza göre teknik çalışma kapsamı oluşturalım.',
          contactText:
            'Örgü, boyahane, apre, laboratuvar, kalite veya teknik dokümantasyon başlığında ilk kapsamı birlikte netleştirebiliriz.',
          contactCta: 'İletişime Geç',
        }
      : {
          eyebrow: 'TECHNICAL SERVICES',
          title: 'Field-based work models for knitting, dyeing and finishing.',
          summary:
            'Each assignment is structured through the current condition, measurable targets, process data, root cause, implementation plan and result verification.',
          services: [
            {
              no: '01',
              title: 'Knitting Process Analysis',
              subtitle: 'Yarn · Machine · Stitch length · GSM · Width',
              description:
                'Yarn properties, machine gauge, stitch length, elastane feeding, GSM, width and knitting-related quality deviations are evaluated together.',
              details: ['Construction control', 'Stitch-length standard', 'GSM–width relationship', 'Defect root cause'],
            },
            {
              no: '02',
              title: 'Dyehouse Process Consulting',
              subtitle: 'Pretreatment · Dyeing · Washing · HT Jet · Recipe',
              description:
                'Pretreatment, reactive and disperse dyeing, washing, pH, temperature, salt, alkali, machine dynamics and reprocessing causes are connected to a measurable process plan.',
              details: ['Recipe standardisation', 'Dosing sequence', 'Machine circulation', 'Shade and fastness control'],
            },
            {
              no: '03',
              title: 'Finishing Process Consulting',
              subtitle: 'Stenter · Compactor · Heat setting · Dimensional stability',
              description:
                'Stenter and compactor settings are managed together with entry moisture, overfeed, width, GSM, actual fabric temperature, shrinkage, spirality and handle targets.',
              details: ['Stable-width target', 'Overfeed management', 'Mechanical compaction', 'Shrinkage and spirality'],
            },
            {
              no: '04',
              title: 'Technical Documentation and Training',
              subtitle: 'Forms · Checklists · Publications · Training',
              description:
                'Field knowledge is converted into controlled documents and training systems that shift, laboratory, quality and management teams can use.',
              details: ['Process forms', 'Checklists', 'Training notes', 'Document revision'],
            },
          ],
          whyLabel: 'WORKING PRINCIPLE',
          whyTitle: 'Not a fixed recipe—a verifiable process system.',
          reasons: [
            'No setting is recommended without measurement.',
            'Machine, fibre, yarn and construction are evaluated together.',
            'Corrective action is connected to a verified root cause.',
            'Results are assessed through quality, capacity, cost and sustainability together.',
          ],
          contactLabel: 'CONTACT',
          contactTitle: 'Let us define the technical work scope for your requirement.',
          contactText:
            'We can clarify an initial scope for knitting, dyehouse, finishing, laboratory, quality or technical documentation.',
          contactCta: 'Contact',
        }

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="bg-[#061A33] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <p className="section-label text-white/60">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">{copy.summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {copy.services.map(service => (
            <article key={service.no} className="rounded-[26px] border border-gray-border bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card">
              <div className="mb-5 flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 font-black tracking-wider text-accent-blue">
                  {service.no}
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-navy">{service.title}</h2>
                  <p className="text-sm font-semibold text-gray-text">{service.subtitle}</p>
                </div>
              </div>
              <p className="mb-5 leading-relaxed text-[#263B57]">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.details.map(item => (
                  <span key={item} className="rounded-full border border-gray-border bg-[#F3F6FA] px-3 py-1 text-xs font-semibold text-[#263B57]">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[28px] bg-[#061A33] p-8 text-white md:p-10">
          <p className="section-label text-white/60">{copy.whyLabel}</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{copy.whyTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {copy.reasons.map((reason, index) => (
              <div key={reason} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/7 p-5">
                <span className="font-black tracking-wider text-accent-blue">{String(index + 1).padStart(2, '0')}</span>
                <p className="font-medium leading-relaxed text-white/85">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-6 py-14 md:grid-cols-[1fr_auto]">
          <div>
            <p className="section-label">{copy.contactLabel}</p>
            <h2 className="text-3xl font-bold text-navy">{copy.contactTitle}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-gray-text">{copy.contactText}</p>
          </div>
          <Link href={`/${lang}/contact`} className="btn-primary whitespace-nowrap">
            {copy.contactCta} →
          </Link>
        </div>
      </section>
    </main>
  )
}
