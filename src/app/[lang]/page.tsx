import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import BBHomeLogoCard from '@/components/BBHomeLogoCard'
import { getAllPosts } from '@/lib/posts'
import { isLang, type Lang } from '@/lib/i18n'
import {
  resources,
  type ResourceGroup,
} from '@/lib/resources'

interface HomeProps {
  params: Promise<{ lang: string }>
}

type DocumentCollectionKey =
  | 'training'
  | 'checklist'
  | 'form'
  | 'catalog'

type DocumentCollectionDefinition = {
  key: DocumentCollectionKey
  href: string
  group?: ResourceGroup
}

const siteUrl = 'https://bahribudak.com'

const documentCollections: DocumentCollectionDefinition[] = [
  {
    key: 'training',
    href: '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
    group: 'training',
  },
  {
    key: 'checklist',
    href: '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
    group: 'checklist',
  },
  {
    key: 'form',
    href: '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
    group: 'form',
  },
  {
    key: 'catalog',
    href: '/sablonlar/tekstil-teknik-dokumanlari',
  },
]

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
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
          heroTitle:
            'Örgü, boya ve apre bilgisini üretim performansına dönüştürüyorum.',
          heroSummary:
            'Örgü, boya, apre, laboratuvar, kalite ve üretim yönetimi alanlarında 35 yılı aşkın saha deneyimine dayalı teknik yayınlar, profesyonel dokümanlar ve uygulanabilir proses sistemleri.',
          heroAlt:
            'Tekstil proseslerinde su, kimya ve kontrollü üretim dengesi',
          expertiseCta: 'Uzmanlık Alanlarını İncele',
          publicationsCta: 'Teknik Yayınları Gör',
          documentsCta: 'Teknik Dokümanlar',
          experienceLabel: 'SAHA DENEYİMİ',
          experienceTitle:
            'Üretim zincirinin tamamında karşılığı olan teknik bilgi.',
          experienceText:
            'Amaç; örgüden başlayıp boya ve apre ile tamamlanan saha bilgisini ölçüm, reçete, kontrol formu, eğitim notu ve yönetilebilir teknik dosya sistemine dönüştürmektir.',
          metrics: [
            {
              value: '35+',
              label: 'yıl saha deneyimi',
              text: 'Örgü, boya, apre ve fabrika yönetimi.',
            },
            {
              value: '3',
              label: 'ana proses alanı',
              text: 'Örgü, boya ve apre süreçleri.',
            },
            {
              value: '01',
              label: 'teknik öncelik',
              text: 'Kanıtlanabilir, ölçülebilir ve uygulanabilir bilgi.',
            },
          ],
          documentsLabel: 'TEKNİK DOKÜMANLAR',
          documentsTitle:
            'Doğrulanmış eğitim, kontrol ve proses dosyalarından oluşan profesyonel kaynak sistemi.',
          documentsText:
            'Ana kaynak kataloğuyla eş zamanlı çalışan eğitim notlarına, kontrol listelerine, proses formlarına ve teknik başvuru dokümanlarına doğrudan erişin.',
          documentsCtaMain: 'Teknik Doküman Merkezini Aç',
          resourceUnit: 'dosya',
          documentCards: {
            training: {
              title: 'Eğitim Notları',
              text: 'Kasar, boyama, yıkama, HT jet, laboratuvar, kalite, ramöz ve mekanik apre konularında sistematik teknik eğitimler.',
              linkLabel: 'Eğitim koleksiyonunu aç',
            },
            checklist: {
              title: 'Kontrol Listeleri',
              text: 'Proses başlamadan önce, proses sırasında ve final kontrolde kritik noktaları doğrulayan karar ve kayıt araçları.',
              linkLabel: 'Kontrol listelerini aç',
            },
            form: {
              title: 'Proses Formları',
              text: 'Parti, reçete, makine, proses parametreleri, sapma, kalite ve düzeltici faaliyet kayıt sistemleri.',
              linkLabel: 'Proses formlarını aç',
            },
            catalog: {
              title: 'Teknik Doküman Kataloğu',
              text: 'PDF, DOCX ve XLSX biçimindeki tüm doğrulanmış teknik kaynakları tek katalog içinde proses ve dosya türüne göre inceleyin.',
              linkLabel: 'Ana kataloğu aç',
            },
          },
          publicationsLabel: 'TEKNİK YAYINLAR',
          publicationsTitle:
            'Sahadan gelen, kontrol edilebilir teknik içerikler.',
          allPublications: 'Tüm Teknik Yayınlar',
          noPublications: 'Yakında ilk teknik yayın eklenecek.',
          expertiseLabel: 'UZMANLIK OMURGASI',
          expertiseTitle:
            'Örgü, boya ve apreyi tek üretim zinciri olarak ele almak.',
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
          methodTitle:
            'Saha bilgisini ölçülebilir sisteme dönüştüren üç adım.',
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
          resourcesLabel: 'TEKNİK DOKÜMANLAR',
          resourcesTitle:
            'PDF, DOCX, XLSX, SOP ve kontrol formlarından oluşan profesyonel yayın paketleri.',
          resourcesText:
            'Boyama, apre, laboratuvar, kalite ve üretim yönetimi alanlarında hazırlanmış indirilebilir teknik dokümanlara ve uzman paketlerine erişin.',
          resourcesCta: 'Teknik Dokümanları İncele',
          contactLabel: 'TEKNİK İLETİŞİM',
          contactTitle:
            'Proses sorununu ölçülebilir bir çalışma kapsamına dönüştürelim.',
          contactText:
            'Örgü, boyahane, apre, laboratuvar, kalite veya teknik dokümantasyon ihtiyacınızı net bir kapsamla değerlendirebiliriz.',
          contactCta: 'İletişime Geç',
        }
      : {
          heroEyebrow: 'BAHRİ BUDAK • TEXTILE TECHNICAL KNOWLEDGE CENTER',
          heroTitle:
            'I turn knitting, dyeing and finishing knowledge into production performance.',
          heroSummary:
            'Technical publications, professional documents and applicable process systems based on more than 35 years of field experience in knitting, dyeing, finishing, laboratory, quality and production management.',
          heroAlt:
            'Balance of water, chemistry and controlled production in textile processing',
          expertiseCta: 'Explore Expertise Areas',
          publicationsCta: 'View Technical Publications',
          documentsCta: 'Technical Documents',
          experienceLabel: 'FIELD EXPERIENCE',
          experienceTitle:
            'Technical knowledge with a direct counterpart across the production chain.',
          experienceText:
            'The objective is to convert field knowledge from knitting through dyeing and finishing into measurements, recipes, control forms, training notes and manageable technical documentation.',
          metrics: [
            {
              value: '35+',
              label: 'years of field experience',
              text: 'Knitting, dyeing, finishing and factory management.',
            },
            {
              value: '3',
              label: 'core process areas',
              text: 'Knitting, dyeing and finishing processes.',
            },
            {
              value: '01',
              label: 'technical priority',
              text: 'Evidence-based, measurable and applicable knowledge.',
            },
          ],
          documentsLabel: 'TECHNICAL DOCUMENTS',
          documentsTitle:
            'A professional resource system of verified training, control and process files.',
          documentsText:
            'Access training notes, checklists, process forms and technical reference documents synchronized with the main resource catalog.',
          documentsCtaMain: 'Open Technical Documents Center',
          resourceUnit: 'files',
          documentCards: {
            training: {
              title: 'Training Notes',
              text: 'Systematic technical training on pretreatment, dyeing, washing, HT jet, laboratory, quality, stenter and mechanical finishing.',
              linkLabel: 'Open training collection',
            },
            checklist: {
              title: 'Checklists',
              text: 'Decision and record tools verifying critical points before process start, during processing and at final inspection.',
              linkLabel: 'Open checklists',
            },
            form: {
              title: 'Process Forms',
              text: 'Record systems for batches, recipes, machinery, process parameters, deviations, quality and corrective actions.',
              linkLabel: 'Open process forms',
            },
            catalog: {
              title: 'Technical Document Catalog',
              text: 'Browse all verified PDF, DOCX and XLSX technical resources in one catalog by process area and file type.',
              linkLabel: 'Open main catalog',
            },
          },
          publicationsLabel: 'TECHNICAL PUBLICATIONS',
          publicationsTitle:
            'Controlled technical content built from field practice.',
          allPublications: 'All Technical Publications',
          noPublications: 'The first technical publication will be added soon.',
          expertiseLabel: 'EXPERTISE FRAMEWORK',
          expertiseTitle:
            'Managing knitting, dyeing and finishing as one production chain.',
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
          methodTitle:
            'Three steps that convert field knowledge into a measurable system.',
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
          resourcesLabel: 'TECHNICAL DOCUMENTS',
          resourcesTitle:
            'Professional publication packages including PDF, DOCX, XLSX, SOP and control forms.',
          resourcesText:
            'Access downloadable technical documents and expert packages for dyeing, finishing, laboratory, quality and production management.',
          resourcesCta: 'Explore Technical Documents',
          contactLabel: 'TECHNICAL CONTACT',
          contactTitle:
            'Let us turn your process problem into a measurable work scope.',
          contactText:
            'We can define a clear scope for knitting, dyehouse, finishing, laboratory, quality or technical documentation requirements.',
          contactCta: 'Contact',
        }

  const documentCards = documentCollections.map((collection) => {
    const matchingResources = collection.group
      ? resources.filter((resource) => resource.group === collection.group)
      : resources

    return {
      ...collection,
      count: matchingResources.length,
      formats: Array.from(
        new Set(matchingResources.map((resource) => resource.format)),
      ),
    }
  })

  const recentPosts = getAllPosts(lang)
    .filter(
      (post) => post.category === 'tekstil' || post.technicalPublication,
    )
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
              <p className="section-label mb-5 text-white/55">
                {copy.experienceLabel}
              </p>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                {copy.experienceTitle}
              </h2>

              <p className="leading-relaxed text-white/80">
                {copy.experienceText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {copy.metrics.map((card) => (
              <div
                key={card.label}
                className="flex min-h-[210px] flex-col justify-between rounded-[28px] border border-gray-border p-6"
              >
                <div className="text-5xl font-bold tracking-[-0.04em] text-accent-blue">
                  {card.value}
                </div>

                <div>
                  <h3 className="mb-2 font-bold text-navy">{card.label}</h3>
                  <p className="text-sm leading-relaxed text-navy/70">
                    {card.text}
                  </p>
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

              <h2 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-5xl">
                {copy.documentsTitle}
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-text">
                {copy.documentsText}
              </p>
            </div>

            <Link
              href={withLang(
                '/sablonlar/tekstil-teknik-dokumanlari',
              )}
              className="btn-primary whitespace-nowrap"
            >
              {copy.documentsCtaMain} →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {documentCards.map((card) => {
              const cardCopy = copy.documentCards[card.key]

              return (
                <article
                  key={card.key}
                  className="group flex min-h-[340px] flex-col justify-between rounded-[30px] border border-[#C9E8F6] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#2EA6D9]/70 hover:shadow-[0_18px_45px_rgba(11,35,67,0.12)]"
                >
                  <div>
                    <div className="mb-6 inline-flex min-w-[82px] flex-col rounded-2xl bg-[#061A33] px-4 py-3 text-white">
                      <span className="text-2xl font-black leading-none">
                        {card.count.toString().padStart(2, '0')}
                      </span>
                      <span className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-white/60">
                        {copy.resourceUnit}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-tight text-[#0B2343]">
                      {cardCopy.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-text">
                      {cardCopy.text}
                    </p>
                  </div>

                  <div>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {card.formats.map((format) => (
                        <span
                          key={format}
                          className="rounded-full border border-[#B7DFF0] bg-[#F3FBFE] px-3 py-1 text-xs font-bold text-[#0B2343]"
                        >
                          {format}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={withLang(card.href)}
                      className="inline-flex items-center font-bold text-[#2EA6D9] transition group-hover:translate-x-1"
                    >
                      {cardCopy.linkLabel} →
                    </Link>
                  </div>
                </article>
              )
            })}
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

            <Link
              href={withLang('/blog')}
              className="btn-outline self-start md:self-auto"
            >
              {copy.allPublications} →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
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

            <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              {copy.expertiseTitle}
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-text">
              {copy.expertiseSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {copy.focusAreas.map((area, index) => (
              <article
                key={area.id}
                className={`rounded-[30px] border bg-white p-7 ${
                  index === 1
                    ? 'border-[#2EA6D9]'
                    : 'border-[#D8DDE5]'
                }`}
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full text-lg font-black ${
                    index === 1
                      ? 'bg-[#2EA6D9] text-[#0B2343]'
                      : 'bg-[#0B2343] text-white'
                  }`}
                >
                  {area.no}
                </div>

                <h3 className="mb-4 text-2xl font-bold">{area.title}</h3>

                <p className="min-h-[112px] leading-relaxed text-gray-text">
                  {area.text}
                </p>

                <Link
                  href={withLang(`/uzmanlik/${area.id}`)}
                  className={`mt-7 inline-flex font-bold ${
                    index === 1
                      ? 'text-[#2EA6D9]'
                      : 'text-[#0B2343]'
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
            <p className="section-label text-white/60">
              {copy.methodLabel}
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              {copy.methodTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {copy.methodSteps.map((step) => (
              <article
                key={step.no}
                className="rounded-[28px] border border-white/15 bg-white/6 p-7"
              >
                <span className="text-sm font-black tracking-[0.2em] text-[#5BBBE6]">
                  {step.no}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-relaxed text-white/78">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:py-20">
          <div>
            <p className="section-label">{copy.contactLabel}</p>

            <h2 className="max-w-3xl text-3xl font-bold md:text-4xl">
              {copy.contactTitle}
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-gray-text">
              {copy.contactText}
            </p>
          </div>

          <Link
            href={withLang('/contact')}
            className="btn-outline whitespace-nowrap"
          >
            {copy.contactCta} →
          </Link>
        </div>
      </section>
    </>
  )
}
