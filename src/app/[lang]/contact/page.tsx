import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { isLang, type Lang } from '@/lib/i18n'

interface ContactProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({
  params,
}: ContactProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const title =
    lang === 'tr'
      ? 'İletişim ve Teknik Talep'
      : 'Contact and Technical Request'

  const description =
    lang === 'tr'
      ? 'Örgü, boya, apre, laboratuvar, kalite, üretim yönetimi ve teknik dokümantasyon çalışmaları için Bahri Budak ile iletişime geçin.'
      : 'Contact Bahri Budak for knitting, dyeing, finishing, laboratory, quality, production management and technical documentation work.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/contact`,
      languages: {
        tr: `${siteUrl}/tr/contact`,
        en: `${siteUrl}/en/contact`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/contact`,
      title,
      description,
      siteName: 'Bahri Budak',
    },
  }
}

export default async function ContactPage({ params }: ContactProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'TEKNİK İLETİŞİM',
          title:
            'Proses sorununu veya teknik doküman ihtiyacını net bir çalışma kapsamına dönüştürelim.',
          summary:
            'Örgü, boya, apre, laboratuvar, kalite, üretim yönetimi, eğitim veya teknik dokümantasyon taleplerinizi form üzerinden iletin. Doğru değerlendirme için mevcut durum, hedef ve beklenen çıktıyı mümkün olduğunca somut açıklayın.',
          directLabel: 'DOĞRUDAN İLETİŞİM',
          directTitle: 'Alternatif iletişim kanalları',
          email: 'E-posta',
          linkedin: 'LinkedIn',
          location: 'Konum',
          locationValue: 'Çorlu, Tekirdağ / Türkiye',
          preparationLabel: 'TALEP ÖNCESİ HAZIRLIK',
          preparationTitle:
            'Değerlendirmeyi hızlandıran temel bilgiler',
          preparationItems: [
            'Kumaş veya ürün yapısı',
            'Makine ve proses bilgisi',
            'Mevcut sorun veya performans kaybı',
            'Ölçüm, test veya kalite sonuçları',
            'Beklenen teknik çıktı ve zaman planı',
          ],
          scopeLabel: 'ÇALIŞMA KAPSAMLARI',
          scopeTitle:
            'Teknik talebinize göre değerlendirilebilecek başlıca alanlar',
          scopes: [
            {
              no: '01',
              title: 'Proses İnceleme',
              text: 'Örgü, boya, yıkama, apre, laboratuvar ve kalite süreçlerinde teknik değerlendirme.',
            },
            {
              no: '02',
              title: 'Kök Neden ve İyileştirme',
              text: 'Hata, sapma, tekrar işleme, kalite kaybı ve performans sorunlarının sistematik analizi.',
            },
            {
              no: '03',
              title: 'Teknik Dokümantasyon',
              text: 'Eğitim notu, kontrol listesi, proses formu, hesaplama aracı ve yayın sistemi.',
            },
            {
              no: '04',
              title: 'Eğitim ve Standardizasyon',
              text: 'Operatör, vardiya, laboratuvar, proses ve kalite ekipleri için ortak teknik dil.',
            },
          ],
          responseLabel: 'DEĞERLENDİRME SÜRECİ',
          responseTitle: 'Talep nasıl ele alınır?',
          responseSteps: [
            {
              no: '01',
              title: 'Kapsam kontrolü',
              text: 'Talebin proses alanı, veri yeterliliği ve beklenen çıktısı değerlendirilir.',
            },
            {
              no: '02',
              title: 'Teknik çerçeve',
              text: 'Çalışmanın sınırları, gerekli bilgiler ve uygulanabilir yöntem netleştirilir.',
            },
            {
              no: '03',
              title: 'Geri dönüş',
              text: 'Uygun iletişim kanalı üzerinden sonraki adım ve çalışma biçimi paylaşılır.',
            },
          ],
        }
      : {
          eyebrow: 'TECHNICAL CONTACT',
          title:
            'Let us turn your process issue or documentation need into a clear work scope.',
          summary:
            'Submit requests related to knitting, dyeing, finishing, laboratory, quality, production management, training or technical documentation. Describe the current situation, target and expected output as clearly as possible.',
          directLabel: 'DIRECT CONTACT',
          directTitle: 'Alternative contact channels',
          email: 'Email',
          linkedin: 'LinkedIn',
          location: 'Location',
          locationValue: 'Çorlu, Tekirdağ / Türkiye',
          preparationLabel: 'BEFORE SUBMITTING',
          preparationTitle:
            'Core information that accelerates evaluation',
          preparationItems: [
            'Fabric or product structure',
            'Machinery and process information',
            'Current issue or performance loss',
            'Measurement, test or quality results',
            'Expected technical output and timeline',
          ],
          scopeLabel: 'WORK AREAS',
          scopeTitle:
            'Primary areas that may be evaluated according to your request',
          scopes: [
            {
              no: '01',
              title: 'Process Review',
              text: 'Technical evaluation of knitting, dyeing, washing, finishing, laboratory and quality processes.',
            },
            {
              no: '02',
              title: 'Root Cause and Improvement',
              text: 'Systematic analysis of defects, deviations, reprocessing, quality loss and performance issues.',
            },
            {
              no: '03',
              title: 'Technical Documentation',
              text: 'Training notes, checklists, process forms, calculation tools and publishing systems.',
            },
            {
              no: '04',
              title: 'Training and Standardisation',
              text: 'A shared technical language for operators, shifts, laboratory, process and quality teams.',
            },
          ],
          responseLabel: 'REVIEW PROCESS',
          responseTitle: 'How is a request handled?',
          responseSteps: [
            {
              no: '01',
              title: 'Scope review',
              text: 'The process area, available information and expected output are reviewed.',
            },
            {
              no: '02',
              title: 'Technical framework',
              text: 'The boundaries, required information and practical method are clarified.',
            },
            {
              no: '03',
              title: 'Response',
              text: 'The next step and working format are shared through the appropriate contact channel.',
            },
          ],
        }

  return (
    <main className="min-h-screen bg-[#F6F4EF] text-[#111315]">
      <section className="relative overflow-hidden bg-[#111315] text-[#F6F4EF]">
        <div className="absolute inset-0 bb-pattern opacity-30" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E45A2B]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E45A2B]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#F6F4EF] md:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#E5E2DA] md:text-lg">
            {copy.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <aside className="space-y-6 lg:sticky lg:top-28">
          <section className="rounded-[1.75rem] border border-[#E5E2DA] bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
              {copy.directLabel}
            </p>

            <h2 className="mt-3 text-2xl font-bold text-[#111315]">
              {copy.directTitle}
            </h2>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:bahribudak@gmail.com"
                className="group flex items-center gap-4 rounded-xl border border-[#E5E2DA] bg-[#F6F4EF] p-4 transition hover:border-[#E45A2B] hover:bg-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E45A2B] text-[#F6F4EF]">
                  @
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111315]/45">
                    {copy.email}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#111315] group-hover:text-[#E45A2B]">
                    bahribudak@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-[#E5E2DA] bg-[#F6F4EF] p-4 transition hover:border-[#E45A2B] hover:bg-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111315] text-xs font-black text-[#F6F4EF]">
                  in
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111315]/45">
                    {copy.linkedin}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#111315] group-hover:text-[#E45A2B]">
                    Bahri Budak
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-[#E5E2DA] bg-[#F6F4EF] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E2DA] bg-white text-sm font-bold text-[#111315]">
                  ●
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111315]/45">
                    {copy.location}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#111315]">
                    {copy.locationValue}
                  </span>
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] bg-[#111315] p-6 text-[#F6F4EF]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
              {copy.preparationLabel}
            </p>

            <h2 className="mt-3 text-2xl font-bold text-[#F6F4EF]">
              {copy.preparationTitle}
            </h2>

            <ul className="mt-6 space-y-3">
              {copy.preparationItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-[#E5E2DA]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E45A2B]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <ContactForm lang={lang} />
      </section>

      <section className="border-y border-[#E5E2DA] bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="mb-9 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
              {copy.scopeLabel}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#111315] md:text-4xl">
              {copy.scopeTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {copy.scopes.map((scope) => (
              <article
                key={scope.no}
                className="rounded-[1.5rem] border border-[#E5E2DA] bg-white p-5 shadow-[0_12px_36px_rgba(17,19,21,0.05)]"
              >
                <span className="text-sm font-black tracking-[0.16em] text-[#E45A2B]">
                  {scope.no}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#111315]">
                  {scope.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6F7782]">
                  {scope.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E5E2DA]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="mb-9 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
              {copy.responseLabel}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#111315] md:text-4xl">
              {copy.responseTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.responseSteps.map((step) => (
              <article
                key={step.no}
                className="rounded-[1.5rem] border border-[#E5E2DA] bg-white p-5 shadow-[0_12px_36px_rgba(17,19,21,0.05)]"
              >
                <span className="text-sm font-black tracking-[0.16em] text-[#E45A2B]">
                  {step.no}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#111315]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6F7782]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
