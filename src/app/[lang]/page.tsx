import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BBHomeLogoCard from '@/components/BBHomeLogoCard'
import { getAllPosts } from '@/lib/posts'
import { isLang, type Lang } from '@/lib/i18n'

interface HomeProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const title =
    lang === 'tr'
      ? 'Tekstil Teknik Bilgi Merkezi'
      : 'Textile Technical Knowledge Center'

  const description =
    lang === 'tr'
      ? 'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi alanlarında saha deneyimine dayalı teknik yayınlar ve profesyonel dokümanlar.'
      : 'Technical publications and professional documents based on field experience in knitting, dyeing, finishing, laboratory, quality and production management.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        tr: `${siteUrl}/tr`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}`,
      title,
      description,
      images: [{ url: '/images/hero-su-damlasi.jpg' }],
    },
  }
}

export default async function HomePage({ params }: HomeProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const withLang = (path: string) => `/${lang}${path}`

  const copy =
    lang === 'tr'
      ? {
          heroEyebrow: 'BAHRİ BUDAK • TEKSTİL TEKNİK BİLGİ MERKEZİ',
          heroTitle: 'Örgü, boya ve apre bilgisini üretim performansına dönüştürüyorum.',
          heroSummary:
            'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi alanlarında 35 yılı aşkın saha deneyimine dayalı teknik yayınlar, profesyonel dokümanlar ve uygulanabilir proses sistemleri.',
          heroAlt: 'Tekstil proseslerinde su, kimya ve kontrollü üretim dengesi',
          expertiseCta: 'Uzmanlık Alanlarını İncele',
          publicationsCta: 'Teknik Yayınları Gör',
          documentsCta: 'Teknik Dokümanlar',
          experienceLabel: 'SAHA DENEYİMİ',
          experienceTitle: 'Üretim zincirinin tamamında karşılığı olan teknik bilgi.',
          experienceText:
            'Amaç; örgüden başlayıp boya ve apre ile tamamlanan saha bilgisini ölçüm, reçete, kontrol formu, eğitim notu ve yönetilebilir teknik dosya sistemine dönüştürmektir.',
          metrics: [
            { value: '35+', label: 'yıl saha deneyimi', text: 'Örgü, boya, apre ve fabrika yönetimi.' },
            { value: '3', label: 'ana proses alanı', text: 'Örgü, boya ve apre süreçleri.' },
            { value: '01', label: 'teknik öncelik', text: 'Kanıtlanabilir, ölçülebilir ve uygulanabilir bilgi.' },
          ],
          documentsLabel: 'TEKNİK DOKÜMANLAR',
          documentsTitle: 'PDF, DOCX, XLSX, SOP ve kontrol formlarından oluşan profesyonel yayın paketleri.',
          documentsText:
            'Boyama, apre, laboratuvar, kalite ve üretim yönetimi alanlarında hazırlanmış indirilebilir teknik dokümanlara ve uzman paketlerine erişin.',
          documentsCtaMain: 'Teknik Dokümanları İncele',
          documentCards: [
            {
              title: 'Boyama Paketleri',
              count: '120+',
              text: 'Reaktif, polyester, naylon, HT jet, reçete ve proses kontrol dokümanları.',
              formats: ['PDF', 'DOCX', 'XLSX', 'SOP'],
            },
            {
              title: 'Apre Paketleri',
              count: '95+',
              text: 'Ramöz, sanfor, silikon, stabilite ve kontrol listeleri.',
              formats: ['PDF', 'DOCX', 'SOP'],
            },
            {
              title: 'Laboratuvar ve Kalite',
              count: '70+',
              text: 'Çözelti hazırlama, pH, renk, haslık ve test formları.',
              formats: ['PDF', 'XLSX', 'Form'],
            },
            {
              title: 'Üretim ve Yönetim',
              count: '150+',
              text: 'Norm kadro, KPI, RFT, maliyet, izlenebilirlik ve SOP sistemleri.',
              formats: ['PDF', 'DOCX', 'XLSX'],
            },
          ],
          publicationsLabel: 'TEKNİK YAYINLAR',
          publicationsTitle: 'Sahadan gelen, kontrol edilebilir teknik içerikler.',
          allPublications: 'Tüm Teknik Yayınlar',
          noPublications: 'Yakında ilk teknik yayın eklenecek.',
          expertiseLabel: 'UZMANLIK OMURGASI',
          expertiseTitle: 'Örgü, boya ve apreyi tek üretim zinciri olarak ele almak.',
          expertiseSummary:
            'Her proses alanı; amaç, makine, kritik parametre, ölçüm noktası, kök neden ve düzeltici faaliyet yapısıyla değerlendirilir.',
          openExpertise: 'Uzmanlık Sayfasını Aç',
          focusAreas: [
            {
              no: '01',
              id: 'orgu',
              title: 'Örgü / Knitting',
              text: 'İplik-kumaş ilişkisi, makine inceliği, gramaj, ilmek boyu, elastan besleme ve örme kaynaklı kalite riskleri.',
            },
            {
              no: '02',
              id: 'boya',
              title: 'Boya / Dyeing',
              text: 'Ön terbiye, boyama, yıkama, reçete standardı ve HT jet proses kontrolü.',
            },
            {
              no: '03',
              id: 'apre',
              title: 'Apre / Finishing',
              text: 'Ramöz, kompaktör, fikse, en-boy, gramaj, tuşe ve boyutsal stabilite.',
            },
          ],
          methodLabel: 'ÇALIŞMA YÖNTEMİ',
          methodTitle: 'Saha bilgisini ölçülebilir sisteme dönüştüren üç adım.',
          methodSteps: [
            {
              no: '01',
              title: 'Üretim zincirini okuma',
              text: 'Örgü, ön terbiye, boya, yıkama, apre, laboratuvar ve kalite akışı birlikte değerlendirilir.',
            },
            {
              no: '02',
              title: 'Standart proses ve kontrol dili',
              text: 'İlmek boyu, gramaj, pH, sıcaklık, süre, kimyasal, en-boy ve kalite sonuçları ortak kontrol diline bağlanır.',
            },
            {
              no: '03',
              title: 'Uygulanabilir teknik doküman',
              text: 'Bilgi; eğitim notu, kontrol listesi, form, SOP ve teknik yayına dönüştürülür.',
            },
          ],
          contactLabel: 'TEKNİK İLETİŞİM',
          contactTitle: 'Proses sorununu ölçülebilir bir çalışma kapsamına dönüştürelim.',
          contactText:
            'Örgü, boyahane, apre, laboratuvar, kalite veya teknik dokümantasyon ihtiyacınızı net bir kapsamla değerlendirebiliriz.',
          contactCta: 'İletişime Geç',
        }
      : {
          heroEyebrow: 'BAHRİ BUDAK • TEXTILE TECHNICAL KNOWLEDGE CENTER',
          heroTitle: 'I turn knitting, dyeing and finishing knowledge into production performance.',
          heroSummary:
            'Technical publications, professional documents and applicable process systems based on more than 35 years of field experience in knitting, dyeing, finishing, laboratory, quality and production management.',
          heroAlt: 'Balance of water, chemistry and controlled production in textile processing',
          expertiseCta: 'Explore Expertise Areas',
          publicationsCta: 'View Technical Publications',
          documentsCta: 'Technical Documents',
          experienceLabel: 'FIELD EXPERIENCE',
          experienceTitle: 'Technical knowledge with a direct counterpart across the production chain.',
          experienceText:
            'The objective is to convert field knowledge from knitting through dyeing and finishing into measurements, recipes, control forms, training notes and manageable technical documentation.',
          metrics: [
            { value: '35+', label: 'years of field experience', text: 'Knitting, dyeing, finishing and factory management.' },
            { value: '3', label: 'core process areas', text: 'Knitting, dyeing and finishing processes.' },
            { value: '01', label: 'technical priority', text: 'Evidence-based, measurable and applicable knowledge.' },
          ],
          documentsLabel: 'TECHNICAL DOCUMENTS',
          documentsTitle: 'Professional publication packages including PDF, DOCX, XLSX, SOP and control forms.',
          documentsText:
            'Access downloadable technical documents and expert packages for dyeing, finishing, laboratory, quality and production management.',
          documentsCtaMain: 'Explore Technical Documents',
          documentCards: [
            {
              title: 'Dyeing Packages',
              count: '120+',
              text: 'Reactive, polyester, nylon, HT jet, recipe and process control documents.',
              formats: ['PDF', 'DOCX', 'XLSX', 'SOP'],
            },
            {
              title: 'Finishing Packages',
              count: '95+',
              text: 'Stenter, sanfor, silicone, stability and control checklists.',
              formats: ['PDF', 'DOCX', 'SOP'],
            },
            {
              title: 'Laboratory and Quality',
              count: '70+',
              text: 'Solution preparation, pH, colour, fastness and test forms.',
              formats: ['PDF', 'XLSX', 'Form'],
            },
            {
              title: 'Production Management',
              count: '150+',
              text: 'Staffing, KPI, RFT, cost, traceability and SOP systems.',
              formats: ['PDF', 'DOCX', 'XLSX'],
            },
          ],
          publicationsLabel: 'TECHNICAL PUBLICATIONS',
          publicationsTitle: 'Controlled technical content built from field practice.',
          allPublications: 'All Technical Publications',
          noPublications: 'The first technical publication will be added soon.',
          expertiseLabel: 'EXPERTISE FRAMEWORK',
          expertiseTitle: 'Managing knitting, dyeing and finishing as one production chain.',
          expertiseSummary:
            'Each process area is evaluated through its purpose, machinery, critical parameters, measurement points, root causes and corrective actions.',
          openExpertise: 'Open Expertise Page',
          focusAreas: [
            {
              no: '01',
              id: 'orgu',
              title: 'Knitting / Örgü',
              text: 'Yarn–fabric relationship, machine gauge, GSM, stitch length, elastane feeding and knitting-related quality risks.',
            },
            {
              no: '02',
              id: 'boya',
              title: 'Dyeing / Boya',
              text: 'Pretreatment, dyeing, washing, recipe standardisation and measurable control of HT jet processes.',
            },
            {
              no: '03',
              id: 'apre',
              title: 'Finishing / Apre',
              text: 'Stenter, compactor, heat setting, width, length, GSM, handle and dimensional stability management.',
            },
          ],
          methodLabel: 'WORKING METHOD',
          methodTitle: 'Three steps that convert field knowledge into a measurable system.',
          methodSteps: [
            {
              no: '01',
              title: 'Read the production chain',
              text: 'Knitting, pretreatment, dyeing, washing, finishing, laboratory and quality flows are evaluated together.',
            },
            {
              no: '02',
              title: 'Create a standard process language',
              text: 'Stitch length, GSM, pH, temperature, time, chemicals, dimensions and quality results are connected in one control language.',
            },
            {
              no: '03',
              title: 'Build practical technical documents',
              text: 'Knowledge is converted into training notes, checklists, forms, SOPs and publications.',
            },
          ],
          contactLabel: 'TECHNICAL CONTACT',
          contactTitle: 'Let us turn your process problem into a measurable work scope.',
          contactText:
            'We can define a clear scope for knitting, dyehouse, finishing, laboratory, quality or technical documentation requirements.',
          contactCta: 'Contact',
        }

  const recentPosts = getAllPosts(lang)
    .filter(post => post.category === 'tekstil' || post.technicalPublication)
    .slice(0, 3)

  return (
    <>
      <section className="relative min-h-[500px] overflow-hidden bg-[#061A33] text-white md:min-h-[520px]">
        <img
          src="/images/hero-su-damlasi.jpg"
          alt={copy.heroAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A33] via-[#061A33]/82 to-[#061A33]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A33]/70 via-transparent to-[#061A33]/30" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-8 md:py-9 lg:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.5fr)] lg:py-8">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white/16 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/95 shadow-sm">
              {copy.heroEyebrow}
            </p>
            <h1 className="max-w-[800px] text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl md:text-[52px] lg:text-[54px] 2xl:text-[62px]">
              {copy.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-[16px]">
              {copy.heroSummary}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={withLang('/uzmanlik')} className="btn-primary">
                {copy.expertiseCta} →
              </Link>

              <Link
                href={withLang('/blog')}
                className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                {copy.publicationsCta}
              </Link>

              <Link
                href={withLang('/magazam')}
                className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                {copy.documentsCta}
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[235px] sm:max-w-[255px] lg:mx-0 lg:justify-self-end">
            <BBHomeLogoCard />
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[34px] bg-[#061A33] p-8 text-white md:p-10">
            <div className="absolute inset-0 bb-pattern opacity-30" />
            <div className="relative">
              <p className="section-label mb-5 text-white/55">{copy.experienceLabel}</p>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                {copy.experienceTitle}
              </h2>
              <p className="leading-relaxed text-white/80">{copy.experienceText}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {copy.metrics.map(card => (
              <div
                key={card.label}
                className="flex min-h-[210px] flex-col justify-between rounded-[28px] border border-gray-border p-6"
              >
                <div className="text-5xl font-bold tracking-[-0.04em] text-accent-blue">{card.value}</div>
                <div>
                  <h3 className="mb-2 font-bold text-navy">{card.label}</h3>
                  <p className="text-sm leading-relaxed text-navy/70">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EAF6FC] text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="section-label">{copy.documentsLabel}</p>
              <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {copy.documentsTitle}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-text">
                {copy.documentsText}
              </p>
            </div>

            <Link href={withLang('/magazam')} className="btn-primary whitespace-nowrap">
              {copy.documentsCtaMain} →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {copy.documentCards.map(card => (
              <article
                key={card.title}
                className="flex min-h-[320px] flex-col justify-between rounded-[30px] border border-[#C9E8F6] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="mb-5 inline-flex rounded-2xl bg-[#061A33] px-4 py-3 text-2xl font-black text-white">
                    {card.count}
                  </div>

                  <h3 className="text-2xl font-bold">{card.title}</h3>

                  <p className="mt-4 leading-relaxed text-gray-text">{card.text}</p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {card.formats.map(format => (
                      <span
                        key={format}
                        className="rounded-full border border-[#B7DFF0] bg-[#F3FBFE] px-3 py-1 text-xs font-bold"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  <Link href={withLang('/magazam')} className="font-bold text-[#0B2343]">
                    {lang === 'tr' ? 'İncele' : 'View'} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FA] text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">{copy.publicationsLabel}</p>
              <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-navy md:text-5xl">
                {copy.publicationsTitle}
              </h2>
            </div>
            <Link href={withLang('/blog')} className="btn-outline self-start md:self-auto">
              {copy.allPublications} →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recentPosts.map(post => (
                <PostCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-gray-border bg-white py-20 text-center text-gray-text">
              <p className="font-medium">{copy.noPublications}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white text-navy" id="uzmanlik">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <p className="section-label">{copy.expertiseLabel}</p>
            <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-5xl">{copy.expertiseTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-text">{copy.expertiseSummary}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {copy.focusAreas.map((area, index) => (
              <article
                key={area.id}
                className={`rounded-[30px] border bg-white p-7 ${
                  index === 1 ? 'border-[#2EA6D9]' : 'border-[#D8DDE5]'
                }`}
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full text-lg font-black ${
                    index === 1 ? 'bg-[#2EA6D9] text-[#0B2343]' : 'bg-[#0B2343] text-white'
                  }`}
                >
                  {area.no}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{area.title}</h3>
                <p className="min-h-[112px] leading-relaxed text-gray-text">{area.text}</p>
                <Link
                  href={withLang(`/uzmanlik/${area.id}`)}
                  className={`mt-7 inline-flex font-bold ${
                    index === 1 ? 'text-[#2EA6D9]' : 'text-[#0B2343]'
                  }`}
                >
                  {copy.openExpertise} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#061A33] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <p className="section-label text-white/60">{copy.methodLabel}</p>
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              {copy.methodTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {copy.methodSteps.map(step => (
              <article key={step.no} className="rounded-[28px] border border-white/15 bg-white/6 p-7">
                <span className="text-sm font-black tracking-[0.2em] text-[#5BBBE6]">{step.no}</span>
                <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-white/78">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:py-20">
          <div>
            <p className="section-label">{copy.contactLabel}</p>
            <h2 className="max-w-3xl text-3xl font-bold md:text-4xl">{copy.contactTitle}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-gray-text">{copy.contactText}</p>
          </div>
          <Link href={withLang('/contact')} className="btn-outline whitespace-nowrap">
            {copy.contactCta} →
          </Link>
        </div>
      </section>
    </>
  )
}
