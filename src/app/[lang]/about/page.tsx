import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isLang, type Lang } from '@/lib/i18n'

interface AboutProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: AboutProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const title = lang === 'tr' ? 'Hakkımda' : 'About'
  const description =
    lang === 'tr'
      ? 'Bahri Budak’ın örgü, boya, apre, laboratuvar, kalite ve fabrika yönetiminde 35 yılı aşkın saha deneyimi.'
      : 'More than 35 years of Bahri Budak’s field experience in knitting, dyeing, finishing, laboratory, quality and factory management.'

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
  }
}

export default async function AboutPage({ params }: AboutProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'HAKKIMDA',
          title: 'Örgü, Boya ve Apre Uzmanı',
          subtitle: 'Proses Yönetimi · Teknik Yayın · Eğitim · Saha Danışmanlığı',
          role: 'Örgü, Boya ve Apre Uzmanı',
          profile:
            'Örgü, boyahane, apre, kalite kontrol, laboratuvar, planlama ve fabrika yönetiminde 35 yılı aşkın saha ve yönetim deneyimine sahibim. Bu birikimi ölçülebilir proses sistemlerine, teknik yayınlara, eğitimlere ve uygulanabilir dokümanlara dönüştürüyorum.',
          stats: [
            { number: '35+', unit: 'Yıl', label: 'Tekstil sektörü deneyimi' },
            { number: '3', unit: 'Alan', label: 'Örgü, Boya ve Apre' },
            { number: '360°', unit: '', label: 'Üretim zinciri yaklaşımı' },
          ],
          profileTitle: 'Profesyonel Profil',
          paragraphs: [
            'Mesleki yaklaşımım, üretimin tek bir bölümünü değil; iplik ve örgüden başlayarak ön terbiye, boyama, yıkama, apre, laboratuvar ve final kaliteye uzanan zincirin tamamını birlikte değerlendirmeye dayanır.',
            'Uzmanlık alanım; pamuk, polyester, naylon, elastan ve karışım kumaşlarda proseslerin doğru kurulması, kritik parametrelerin ölçülebilir hâle getirilmesi, kalite sürekliliğinin sağlanması ve üretim kayıplarının azaltılmasıdır.',
            'Çalışmalarımda reçete, makine dinamiği, su ve enerji kullanımı, kapasite, maliyet, kalite kontrol, teknik izlenebilirlik ve insan faktörünü tek yönetim sistemi içinde ele alırım.',
          ],
          approachLabel: 'ÇALIŞMA YAKLAŞIMI',
          approachTitle: 'Bilgiyle Kurulur. Sistemle Büyür.',
          approachText:
            'Kalıcı sonuç; doğru proses, güvenilir veri, ölçülebilir hedef, nitelikli ekip ve sürdürülebilir yönetim sistemlerinin birlikte çalışmasıyla oluşur.',
          expertiseTitle: 'Uzmanlık ve Yetkinlikler',
          skills: [
            'Örgü prosesleri, ilmek boyu, gramaj ve kumaş eni ilişkisi',
            'Pamuk, polyester, naylon, elastan ve karışım kumaş boyama',
            'Kasar / Pretreatment, boyama / Dyeing ve yıkama / Washing',
            'Ramöz / Stenter, kompaktör / Compactor ve boyutsal stabilite',
            'Reçete, maliyet, kapasite ve verimlilik hesaplamaları',
            'Laboratuvar, kalite kontrol ve teknik izlenebilirlik',
            'Su, enerji ve yardımcı işletmeler yönetimi',
            'Teknik dokümantasyon, eğitim ve saha danışmanlığı',
          ],
          systemsTitle: 'Seçilmiş Çalışma Alanları',
          systems: [
            {
              mark: '01',
              title: 'Proses Kontrol Sistemleri',
              text: 'Örgü, boya ve apre süreçlerinde kritik parametre, ölçüm noktası, kayıt ve sapma yönetimi.',
            },
            {
              mark: '02',
              title: 'Teknik Dokümantasyon',
              text: 'Kontrol listeleri, proses formları, eğitim notları, hesaplama araçları ve teknik yayınlar.',
            },
            {
              mark: '03',
              title: 'Kök Neden ve İyileştirme',
              text: 'Hata–Kök Neden–Düzeltici Faaliyet yapısı, tekrar işleme ve kalite kaybı analizi.',
            },
            {
              mark: '04',
              title: 'Kaynak Verimliliği',
              text: 'Su, buhar, elektrik, kimyasal, süre ve kapasitenin teknik performansla birlikte yönetimi.',
            },
          ],
          publicationsCta: 'Teknik Yayınları İncele',
          contactCta: 'İletişime Geç',
        }
      : {
          eyebrow: 'ABOUT',
          title: 'Knitting, Dyeing and Finishing Specialist',
          subtitle: 'Process Management · Technical Publications · Training · Field Consulting',
          role: 'Knitting, Dyeing and Finishing Specialist',
          profile:
            'I have more than 35 years of field and management experience in knitting, dyehouse, finishing, quality control, laboratory, planning and factory management. I convert this experience into measurable process systems, technical publications, training and practical documentation.',
          stats: [
            { number: '35+', unit: 'Years', label: 'Textile industry experience' },
            { number: '3', unit: 'Areas', label: 'Knitting, Dyeing and Finishing' },
            { number: '360°', unit: '', label: 'Production-chain approach' },
          ],
          profileTitle: 'Professional Profile',
          paragraphs: [
            'My professional approach evaluates the entire production chain—not a single department—from yarn and knitting through pretreatment, dyeing, washing, finishing, laboratory and final quality.',
            'My expertise covers the correct design of processes for cotton, polyester, nylon, elastane and blended fabrics; measurable control of critical parameters; quality consistency; and reduction of production losses.',
            'I manage recipes, machine dynamics, water and energy use, capacity, cost, quality control, technical traceability and the human factor as one integrated production system.',
          ],
          approachLabel: 'WORKING APPROACH',
          approachTitle: 'Built with Knowledge. Grown through Systems.',
          approachText:
            'Sustainable results are created when the correct process, reliable data, measurable targets, qualified teams and management systems work together.',
          expertiseTitle: 'Expertise and Competencies',
          skills: [
            'Knitting processes and the relationship between stitch length, GSM and fabric width',
            'Dyeing of cotton, polyester, nylon, elastane and blended fabrics',
            'Pretreatment, dyeing and washing processes',
            'Stenter, compactor and dimensional-stability management',
            'Recipe, cost, capacity and efficiency calculations',
            'Laboratory, quality control and technical traceability',
            'Water, energy and utility management',
            'Technical documentation, training and field consulting',
          ],
          systemsTitle: 'Selected Work Areas',
          systems: [
            {
              mark: '01',
              title: 'Process Control Systems',
              text: 'Critical parameters, measurement points, records and deviation management in knitting, dyeing and finishing.',
            },
            {
              mark: '02',
              title: 'Technical Documentation',
              text: 'Checklists, process forms, training notes, calculation tools and technical publications.',
            },
            {
              mark: '03',
              title: 'Root Cause and Improvement',
              text: 'Defect–Root Cause–Corrective Action systems, reprocessing and quality-loss analysis.',
            },
            {
              mark: '04',
              title: 'Resource Efficiency',
              text: 'Management of water, steam, electricity, chemicals, time and capacity together with technical performance.',
            },
          ],
          publicationsCta: 'View Technical Publications',
          contactCta: 'Contact',
        }

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-18">
        <header className="mb-12 max-w-3xl">
          <p className="section-label">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[#0B2343] md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-base font-semibold leading-relaxed text-[#4C5561]">{copy.subtitle}</p>
          <div className="mt-6 h-1 w-16 rounded-full bg-[#2EA6D9]" />
        </header>

        <section className="mb-14 flex flex-col items-start gap-8 rounded-[28px] border border-[#D7E0EA] bg-white p-7 shadow-sm sm:flex-row md:p-9">
          <div className="relative h-32 w-32 flex-shrink-0">
            <Image
              src="/images/bahri-budak.jpeg"
              alt="Bahri Budak"
              fill
              className="rounded-2xl object-cover object-top"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0B2343]">Bahri Budak</h2>
            <p className="mt-1 text-sm font-semibold text-[#2EA6D9]">{copy.role}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#263B57]">{copy.profile}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Çorlu / Tekirdağ', 'bahribudak.com', 'bahribudak@gmail.com'].map(item => (
                <span key={item} className="rounded-full border border-[#D7E0EA] bg-[#F3F6FA] px-3 py-1 text-xs text-[#263B57]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {copy.stats.map(stat => (
            <article key={stat.label} className="rounded-2xl border border-[#D7E0EA] bg-white p-6 text-center shadow-sm">
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-bold text-[#0B2343]">{stat.number}</span>
                {stat.unit && <span className="mb-1 text-sm font-semibold text-[#4C5561]">{stat.unit}</span>}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#4C5561]">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#0B2343]">
            <span className="h-7 w-1 rounded-full bg-[#2EA6D9]" />
            {copy.profileTitle}
          </h2>
          <div className="space-y-5 text-[15px] leading-7 text-[#263B57]">
            {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="mb-14 rounded-[28px] bg-[#0B2343] p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5BBBE6]">{copy.approachLabel}</p>
          <h2 className="mt-3 text-3xl font-bold text-white">{copy.approachTitle}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/80">{copy.approachText}</p>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0B2343]">
            <span className="h-7 w-1 rounded-full bg-[#2EA6D9]" />
            {copy.expertiseTitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {copy.skills.map(skill => (
              <span key={skill} className="flex items-center gap-2 rounded-full border border-[#D7E0EA] bg-white px-4 py-2 text-sm text-[#263B57]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2EA6D9]" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0B2343]">
            <span className="h-7 w-1 rounded-full bg-[#2EA6D9]" />
            {copy.systemsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {copy.systems.map(system => (
              <article key={system.mark} className="rounded-2xl border border-[#D7E0EA] bg-white p-6 shadow-sm">
                <span className="text-xs font-black tracking-[0.18em] text-[#2EA6D9]">{system.mark}</span>
                <h3 className="mt-3 text-xl font-bold text-[#0B2343]">{system.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C5561]">{system.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-[#D7E0EA] pt-8">
          <Link href={`/${lang}/blog`} className="btn-primary">{copy.publicationsCta} →</Link>
          <Link href={`/${lang}/contact`} className="btn-outline">{copy.contactCta} →</Link>
        </div>
      </div>
    </main>
  )
}
