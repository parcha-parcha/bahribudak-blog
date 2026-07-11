import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isLang, type Lang } from '@/lib/i18n'

interface AboutProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({
  params,
}: AboutProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const title =
    lang === 'tr'
      ? 'Hakkımda | Bahri Budak'
      : 'About | Bahri Budak'

  const description =
    lang === 'tr'
      ? 'Bahri Budak’ın örgü, boya, apre, laboratuvar, kalite, üretim yönetimi ve teknik dokümantasyonda 35 yılı aşkın saha deneyimi.'
      : 'More than 35 years of Bahri Budak’s field experience in knitting, dyeing, finishing, laboratory, quality, production management and technical documentation.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/about`,
      languages: {
        tr: `${siteUrl}/tr/about`,
        en: `${siteUrl}/en/about`,
      },
    },
    openGraph: {
      type: 'profile',
      url: `${siteUrl}/${lang}/about`,
      title,
      description,
      siteName: 'Bahri Budak',
      images: [{ url: '/images/bahri-budak.jpeg' }],
    },
  }
}

export default async function AboutPage({ params }: AboutProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const withLang = (path: string) => `/${lang}${path}`

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'BAHRİ BUDAK • PROFESYONEL PROFİL',
          title:
            'Saha bilgisini ölçülebilir tekstil proses sistemlerine dönüştürüyorum.',
          intro:
            'Örgü, boya, apre, laboratuvar, kalite, planlama ve fabrika yönetiminde 35 yılı aşkın deneyimi; teknik yayın, eğitim, kontrol sistemi ve uygulanabilir dokümantasyona dönüştüren bütüncül bir çalışma yaklaşımı.',
          primaryCta: 'Uzmanlık Alanlarını İncele',
          secondaryCta: 'Teknik Dokümanları Gör',
          portraitAlt: 'Bahri Budak profesyonel portresi',
          role: 'Örgü, Boya ve Apre Uzmanı',
          location: 'Çorlu / Tekirdağ',
          profile:
            'Üretim zincirini yalnızca tek bir bölüm üzerinden değil; iplik, örgü, ön terbiye, boyama, yıkama, apre, laboratuvar, kalite ve fabrika yönetimi arasındaki teknik ilişkiler üzerinden değerlendiriyorum.',
          stats: [
            {
              value: '35+',
              label: 'Yıl saha ve yönetim deneyimi',
            },
            {
              value: '3',
              label: 'Ana proses alanı',
            },
            {
              value: '360°',
              label: 'Üretim zinciri yaklaşımı',
            },
          ],
          profileLabel: 'PROFESYONEL YAKLAŞIM',
          profileTitle:
            'Teknik bilgi, doğru sistem kurulmadığında kalıcı performansa dönüşmez.',
          profileParagraphs: [
            'Mesleki yaklaşımım; üretim sürecini yalnızca reçete veya makine parametresi üzerinden değil, malzeme, proses, ekipman, enerji, kalite, kapasite ve insan faktörünün birlikte çalıştığı bir sistem olarak değerlendirmeye dayanır.',
            'Pamuk, polyester, naylon, elastan ve karışım kumaşlarda proseslerin doğru kurulması, kritik parametrelerin ölçülebilir hâle getirilmesi, kalite sürekliliğinin sağlanması ve tekrar işleme risklerinin azaltılması temel çalışma alanlarımdır.',
            'Saha deneyimini; eğitim notu, proses formu, kontrol listesi, teknik yayın, hesaplama aracı ve yönetilebilir doküman sistemine dönüştürerek bilginin ekipler arasında standart biçimde kullanılmasını hedefliyorum.',
          ],
          chainLabel: 'ÜRETİM ZİNCİRİ',
          chainTitle:
            'Örgüden final kaliteye kadar birbirine bağlı tek proses sistemi',
          chainAreas: [
            {
              no: '01',
              title: 'Örgü / Knitting',
              text: 'İplik–kumaş ilişkisi, makine inceliği, ilmek boyu, gramaj, elastan besleme ve örme kaynaklı kalite riskleri.',
            },
            {
              no: '02',
              title: 'Boya / Dyeing',
              text: 'Ön terbiye, boyama, yıkama, HT jet proses kontrolü, reçete standardı ve renk–haslık performansı.',
            },
            {
              no: '03',
              title: 'Apre / Finishing',
              text: 'Ramöz, kompaktör, fikse, en-boy, gramaj, tuşe, boyutsal stabilite ve final kalite yönetimi.',
            },
          ],
          experienceLabel: 'DENEYİM VE YÖNETİM ODAKLARI',
          experienceTitle:
            'Saha uygulamasından fabrika yönetimine uzanan çalışma kapsamı',
          experienceItems: [
            {
              no: '01',
              title: 'Proses ve Üretim Yönetimi',
              text: 'Örgü, boyahane, apre, laboratuvar, kalite ve planlama arasındaki teknik akışın ortak hedeflerle yönetilmesi.',
            },
            {
              no: '02',
              title: 'Kalite ve Teknik İzlenebilirlik',
              text: 'Kritik parametrelerin, test sonuçlarının, sapmaların ve düzeltici faaliyetlerin kayıt altında tutulması.',
            },
            {
              no: '03',
              title: 'Kaynak ve Kapasite Verimliliği',
              text: 'Su, buhar, elektrik, kimyasal, süre, makine kapasitesi ve iş gücünün teknik performansla birlikte değerlendirilmesi.',
            },
            {
              no: '04',
              title: 'Ekip, Eğitim ve Standardizasyon',
              text: 'Operatör, vardiya, laboratuvar, proses ve kalite ekiplerinin aynı teknik dil ve kontrol sistemiyle çalışması.',
            },
          ],
          expertiseLabel: 'UZMANLIK VE YETKİNLİKLER',
          expertiseTitle:
            'Üretim performansını doğrudan etkileyen teknik çalışma alanları',
          skills: [
            'Örgü prosesleri, ilmek boyu, gramaj ve kumaş eni ilişkisi',
            'Pamuk, polyester, naylon, elastan ve karışım kumaş boyama',
            'Kasar, boyama, yıkama ve HT jet proses yönetimi',
            'Ramöz, kompaktör, fikse ve boyutsal stabilite',
            'Reçete, maliyet, kapasite ve verimlilik hesaplamaları',
            'Laboratuvar, kalite kontrol ve teknik izlenebilirlik',
            'Su, enerji, yardımcı işletmeler ve kaynak yönetimi',
            'Hata, kök neden ve düzeltici faaliyet sistemleri',
          ],
          publishingLabel: 'TEKNİK YAYIN YAKLAŞIMI',
          publishingTitle:
            'Saha bilgisini uygulanabilir ve doğrulanabilir dokümana dönüştürmek',
          publishingText:
            'Teknik içerikler; amaç, kapsam, kritik parametreler, kontrol noktaları, örnek uygulamalar, sık hatalar, revizyon bilgisi ve işletme onayı mantığıyla hazırlanır. Amaç yalnızca bilgi aktarmak değil, bilgiyi üretimde kullanılabilir bir kontrol sistemine dönüştürmektir.',
          publishingCards: [
            {
              title: 'Teknik Yayınlar',
              text: 'Proses mantığını, riskleri ve uygulama esaslarını açıklayan kontrollü içerikler.',
            },
            {
              title: 'Eğitim Notları',
              text: 'Operatör, vardiya, laboratuvar, proses ve kalite ekipleri için sistematik öğrenme dosyaları.',
            },
            {
              title: 'Kontrol ve Kayıt Araçları',
              text: 'Kontrol listeleri, proses formları, hesaplama araçları ve izlenebilir kayıt sistemleri.',
            },
          ],
          principleLabel: 'ÇALIŞMA İLKESİ',
          principleTitle: 'Bilgiyle Kurulur. Sistemle Büyür.',
          principleText:
            'Kalıcı sonuç; doğru proses, güvenilir veri, ölçülebilir hedef, nitelikli ekip ve sürdürülebilir yönetim sistemlerinin birlikte çalışmasıyla oluşur.',
          publicationsCta: 'Teknik Yayınları İncele',
          documentsCta: 'Teknik Dokümanları Aç',
          contactCta: 'İletişime Geç',
        }
      : {
          eyebrow: 'BAHRİ BUDAK • PROFESSIONAL PROFILE',
          title:
            'I convert field knowledge into measurable textile process systems.',
          intro:
            'A holistic working approach that transforms more than 35 years of experience in knitting, dyeing, finishing, laboratory, quality, planning and factory management into technical publications, training, control systems and practical documentation.',
          primaryCta: 'Explore Expertise Areas',
          secondaryCta: 'View Technical Documents',
          portraitAlt: 'Professional portrait of Bahri Budak',
          role: 'Knitting, Dyeing and Finishing Specialist',
          location: 'Çorlu / Tekirdağ',
          profile:
            'I evaluate the production chain not through a single department, but through the technical relationships between yarn, knitting, pretreatment, dyeing, washing, finishing, laboratory, quality and factory management.',
          stats: [
            {
              value: '35+',
              label: 'Years of field and management experience',
            },
            {
              value: '3',
              label: 'Core process areas',
            },
            {
              value: '360°',
              label: 'Production-chain approach',
            },
          ],
          profileLabel: 'PROFESSIONAL APPROACH',
          profileTitle:
            'Technical knowledge does not create lasting performance without the correct system.',
          profileParagraphs: [
            'My professional approach evaluates production not only through recipes or machine settings, but as a system in which materials, processes, equipment, energy, quality, capacity and people work together.',
            'My core areas include correct process design for cotton, polyester, nylon, elastane and blended fabrics; measurable control of critical parameters; quality consistency; and reduction of reprocessing risks.',
            'I convert field experience into training notes, process forms, checklists, technical publications, calculation tools and manageable documentation systems so that knowledge can be used consistently across teams.',
          ],
          chainLabel: 'PRODUCTION CHAIN',
          chainTitle:
            'One connected process system from knitting to final quality',
          chainAreas: [
            {
              no: '01',
              title: 'Knitting / Örgü',
              text: 'Yarn–fabric relationship, machine gauge, stitch length, GSM, elastane feeding and knitting-related quality risks.',
            },
            {
              no: '02',
              title: 'Dyeing / Boya',
              text: 'Pretreatment, dyeing, washing, HT jet control, recipe standardisation and colour–fastness performance.',
            },
            {
              no: '03',
              title: 'Finishing / Apre',
              text: 'Stenter, compactor, heat setting, width, length, GSM, handle, dimensional stability and final quality.',
            },
          ],
          experienceLabel: 'EXPERIENCE AND MANAGEMENT FOCUS',
          experienceTitle:
            'A working scope extending from field practice to factory management',
          experienceItems: [
            {
              no: '01',
              title: 'Process and Production Management',
              text: 'Managing the technical flow between knitting, dyehouse, finishing, laboratory, quality and planning through shared targets.',
            },
            {
              no: '02',
              title: 'Quality and Technical Traceability',
              text: 'Recording critical parameters, test results, deviations and corrective actions in a traceable structure.',
            },
            {
              no: '03',
              title: 'Resource and Capacity Efficiency',
              text: 'Evaluating water, steam, electricity, chemicals, time, machine capacity and labour together with technical performance.',
            },
            {
              no: '04',
              title: 'Teams, Training and Standardisation',
              text: 'Enabling operators, shifts, laboratory, process and quality teams to work with one technical language and control system.',
            },
          ],
          expertiseLabel: 'EXPERTISE AND COMPETENCIES',
          expertiseTitle:
            'Technical work areas that directly affect production performance',
          skills: [
            'Knitting processes and the relationship between stitch length, GSM and fabric width',
            'Dyeing of cotton, polyester, nylon, elastane and blended fabrics',
            'Pretreatment, dyeing, washing and HT jet process management',
            'Stenter, compactor, heat setting and dimensional stability',
            'Recipe, cost, capacity and efficiency calculations',
            'Laboratory, quality control and technical traceability',
            'Water, energy, utilities and resource management',
            'Defect, root-cause and corrective-action systems',
          ],
          publishingLabel: 'TECHNICAL PUBLISHING APPROACH',
          publishingTitle:
            'Converting field knowledge into practical and verifiable documentation',
          publishingText:
            'Technical content is structured around purpose, scope, critical parameters, control points, practical examples, common errors, revision information and plant approval. The objective is not only to transfer knowledge, but to convert it into a control system that can be used in production.',
          publishingCards: [
            {
              title: 'Technical Publications',
              text: 'Controlled content explaining process logic, risks and implementation principles.',
            },
            {
              title: 'Training Notes',
              text: 'Systematic learning files for operators, shifts, laboratory, process and quality teams.',
            },
            {
              title: 'Control and Record Tools',
              text: 'Checklists, process forms, calculation tools and traceable record systems.',
            },
          ],
          principleLabel: 'WORKING PRINCIPLE',
          principleTitle: 'Built with Knowledge. Grown through Systems.',
          principleText:
            'Lasting results are created when the correct process, reliable data, measurable targets, qualified teams and sustainable management systems work together.',
          publicationsCta: 'View Technical Publications',
          documentsCta: 'Open Technical Documents',
          contactCta: 'Contact',
        }

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0B2343]">
      <section className="relative overflow-hidden bg-[#061A33] text-white">
        <div className="absolute inset-0 bb-pattern opacity-30" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2EA6D9]/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5BBBE6]">
              {copy.eyebrow}
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-white md:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              {copy.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={withLang('/uzmanlik')}
                className="inline-flex items-center justify-center rounded-full bg-[#2EA6D9] px-6 py-3 text-sm font-bold text-[#061A33] transition hover:bg-[#5BBBE6]"
              >
                {copy.primaryCta} →
              </Link>

              <Link
                href={withLang('/magazam')}
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#061A33]"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 backdrop-blur">
            <div className="grid gap-5 sm:grid-cols-[150px_1fr] sm:items-center">
              <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10">
                <Image
                  src="/images/bahri-budak.jpeg"
                  alt={copy.portraitAlt}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">Bahri Budak</h2>
                <p className="mt-1 text-sm font-bold text-[#5BBBE6]">
                  {copy.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {copy.profile}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/70">
                    {copy.location}
                  </span>
                  <a
                    href="mailto:bahribudak@gmail.com"
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/70 transition hover:border-[#5BBBE6] hover:text-[#5BBBE6]"
                  >
                    bahribudak@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {copy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-[#061A33]/45 px-3 py-4 text-center"
                >
                  <p className="text-2xl font-black text-[#5BBBE6] md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2EA6D9]">
              {copy.profileLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.profileTitle}
            </h2>
          </div>

          <div className="space-y-5 text-[15px] leading-8 text-[#263B57]">
            {copy.profileParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8DDE5] bg-[#F5F7FA]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2EA6D9]">
              {copy.chainLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.chainTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {copy.chainAreas.map((area) => (
              <article
                key={area.no}
                className="rounded-[1.75rem] border border-[#D8DDE5] bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-black tracking-[0.18em] text-[#2EA6D9]">
                  {area.no}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[#0B2343]">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4C5561]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2EA6D9]">
              {copy.experienceLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.experienceTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {copy.experienceItems.map((item) => (
              <article
                key={item.no}
                className="grid gap-5 rounded-[1.75rem] border border-[#D8DDE5] bg-[#F8FAFC] p-6 sm:grid-cols-[64px_1fr]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#061A33] text-sm font-black text-white">
                  {item.no}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B2343]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4C5561]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8DDE5] bg-[#F5F7FA]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2EA6D9]">
              {copy.expertiseLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
              {copy.expertiseTitle}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {copy.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-start gap-3 rounded-2xl border border-[#D8DDE5] bg-white px-4 py-4 text-sm leading-6 text-[#263B57]"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2EA6D9]"
                  aria-hidden="true"
                />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2EA6D9]">
                {copy.publishingLabel}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B2343] md:text-4xl">
                {copy.publishingTitle}
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#4C5561]">
                {copy.publishingText}
              </p>
            </div>

            <div className="grid gap-4">
              {copy.publishingCards.map((card, index) => (
                <article
                  key={card.title}
                  className="grid gap-4 rounded-[1.5rem] border border-[#D8DDE5] bg-[#F8FAFC] p-5 sm:grid-cols-[52px_1fr]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2EA6D9] text-sm font-black text-[#061A33]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2343]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#4C5561]">
                      {card.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061A33] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5BBBE6]">
            {copy.principleLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            {copy.principleTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-white/75">
            {copy.principleText}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={withLang('/blog')}
              className="inline-flex items-center justify-center rounded-full bg-[#2EA6D9] px-5 py-3 text-sm font-bold text-[#061A33] transition hover:bg-[#5BBBE6]"
            >
              {copy.publicationsCta} →
            </Link>

            <Link
              href={withLang('/magazam')}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#061A33]"
            >
              {copy.documentsCta}
            </Link>

            <Link
              href={withLang('/contact')}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#061A33]"
            >
              {copy.contactCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
