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
      ? 'Endüstriyel örgü kumaş üretimi, boya, apre, laboratuvar, kalite ve üretim yönetimi alanlarında saha deneyimine dayalı teknik yayınlar ve profesyonel dokümanlar.'
      : 'Technical publications and professional documents based on field experience in knitted fabric production, dyeing, finishing, laboratory, quality and production management.'

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
          heroEyebrow: 'TEKNİK YAYINLAR • DANIŞMANLIK • TEKSTİL SİSTEMLERİ',
          heroTitle:
            'Teknik bilgi. Saha deneyimi. Sistematik çözümler.',
          heroSummary:
            'Tekstil işletmeleri için doğrulanabilir teknik yayınlar, kontrol araçları, proses sistemleri ve saha odaklı danışmanlık çözümleri.',
          heroAlt:
            'Tekstil proseslerinde su, kimya ve kontrollü üretim dengesi',
          expertiseCta: 'Teknik Yayınları İncele',
          publicationsCta: 'Teknik Destek Talep Et',
          documentsCta: 'Ücretsiz Kaynaklara Eriş',
          experienceLabel: 'SAHA DENEYİMİ',
          experienceTitle:
            'Üretim zincirinin tamamında karşılığı olan teknik bilgi.',
          experienceText:
            'Amaç; örgü kumaş üretiminden başlayıp boya ve apre ile tamamlanan saha bilgisini ölçüm, reçete, kontrol formu, eğitim notu ve yönetilebilir teknik dosya sistemine dönüştürmektir.',
          metrics: [
            {
              value: '35+',
              label: 'yıl saha deneyimi',
              text: 'Örgü kumaş, boya, apre ve fabrika yönetimi.',
            },
            {
              value: '3',
              label: 'ana proses alanı',
              text: 'Örgü kumaş, boya ve apre süreçleri.',
            },
            {
              value: '01',
              label: 'teknik öncelik',
              text: 'Kanıtlanabilir, ölçülebilir ve uygulanabilir bilgi.',
            },
          ],
          documentsLabel: 'TEKNİK DOKÜMANLAR',
          documentsTitle:
            'Ücretsiz üyelikle erişilen, sahada karşılığı olan teknik kaynak sistemi.',
          documentsText:
            'Eğitim notları, kontrol listeleri, proses formları ve teknik başvuru dokümanlarının tamamına ücretsiz üyelikle erişin.',
          documentsCtaMain: 'Ücretsiz Kaynak Merkezini Aç',
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
            'Örgü kumaş, boya ve apreyi tek üretim zinciri olarak ele almak.',
          expertiseSummary:
            'Her proses alanı; amaç, makine, kritik parametre, ölçüm noktası, kök neden ve düzeltici faaliyet yapısıyla değerlendirilir.',
          openExpertise: 'Uzmanlık Sayfasını Aç',
          focusAreas: [
            {
              no: '01',
              id: 'orgu',
              title: 'Örgü Kumaş / Knitted Fabric',
              text: 'İplik-kumaş ilişkisi, yuvarlak örme, makine inceliği, gramaj, ilmek boyu, elastan besleme ve örme kaynaklı kalite riskleri.',
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
              text: 'Örgü kumaş, ön terbiye, boya, yıkama, apre, laboratuvar ve kalite akışı birlikte değerlendirilir.',
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
            'Örgü kumaş, boyahane, apre, laboratuvar, kalite veya teknik dokümantasyon ihtiyacınızı net bir kapsamla değerlendirebiliriz.',
          contactCta: 'Teknik Destek Talep Et',
        }
      : {
          heroEyebrow: 'TECHNICAL PUBLICATIONS • CONSULTING • TEXTILE SYSTEMS',
          heroTitle:
            'Technical knowledge. Field experience. Systematic solutions.',
          heroSummary:
            'Verified technical publications, control tools, process systems and field-oriented consulting solutions for textile enterprises.',
          heroAlt:
            'Balance of water, chemistry and controlled production in textile processing',
          expertiseCta: 'Explore Technical Publications',
          publicationsCta: 'Request Technical Support',
          documentsCta: 'Access Free Resources',
          experienceLabel: 'FIELD EXPERIENCE',
          experienceTitle:
            'Technical knowledge with a direct counterpart across the production chain.',
          experienceText:
            'The objective is to convert field knowledge from knitted fabric production through dyeing and finishing into measurements, recipes, control forms, training notes and manageable technical documentation.',
          metrics: [
            {
              value: '35+',
              label: 'years of field experience',
              text: 'Knitted fabric, dyeing, finishing and factory management.',
            },
            {
              value: '3',
              label: 'core process areas',
              text: 'Knitted fabric, dyeing and finishing processes.',
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
            'Managing knitted fabric, dyeing and finishing as one production chain.',
          expertiseSummary:
            'Each process area is evaluated through its purpose, machinery, critical parameters, measurement points, root causes and corrective actions.',
          openExpertise: 'Open Expertise Page',
          focusAreas: [
            {
              no: '01',
              id: 'orgu',
              title: 'Knitted Fabric / Örgü Kumaş',
              text: 'Yarn–fabric relationship, circular knitting, machine gauge, GSM, stitch length, elastane feeding and knitting-related quality risks.',
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
              text: 'Knitted fabric, pretreatment, dyeing, washing, finishing, laboratory and quality flows are evaluated together.',
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
          contactCta: 'Request Technical Support',
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
      <section className="relative min-h-[560px] overflow-hidden bg-[#111315] text-white md:min-h-[620px]">
        <img
          src="/images/hero-su-damlasi.jpg"
          alt={copy.heroAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-[#111315]/88 to-[#111315]/24" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/76 via-transparent to-[#111315]/28" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 md:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-12 lg:py-16">
          <div>
            <p className="mb-5 inline-flex border-l-4 border-[#E45A2B] pl-4 text-xs font-black uppercase tracking-[0.22em] text-white/78">
              {copy.heroEyebrow}
            </p>

            <h1 className="max-w-[760px] text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl md:text-[56px] lg:text-[60px] 2xl:text-[68px]">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-[18px]">
              {copy.heroSummary}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={withLang('/blog')} className="btn-primary">
                {copy.expertiseCta} →
              </Link>

              <Link
                href={withLang('/contact')}
                className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#111315]"
              >
                {copy.publicationsCta}
              </Link>

              <Link
                href={withLang('/sablonlar/tekstil-teknik-dokumanlari')}
                className="inline-flex items-center justify-center rounded-md border border-white/35 px-6 py-3 font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#111315]"
              >
                {copy.documentsCta}
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[760px] lg:mx-0 lg:justify-self-end">
            <BBHomeLogoCard />
          </div>
        </div>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[18px] bg-[#111315] p-8 text-white md:p-10">
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
                className="flex min-h-[210px] flex-col justify-between rounded-[14px] border border-gray-border bg-white p-6 shadow-[0_10px_28px_rgba(17,19,21,0.06)]"
              >
                <div className="text-5xl font-bold tracking-[-0.04em] text-[#E45A2B]">
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

      <section className="bg-[#F6F4EF] text-navy">
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
                  className="group flex min-h-[340px] flex-col justify-between rounded-[14px] border border-[#E5E2DA] bg-white p-7 shadow-[0_10px_28px_rgba(17,19,21,0.06)] transition hover:-translate-y-1 hover:border-[#E45A2B]/70 hover:shadow-[0_18px_45px_rgba(17,19,21,0.10)]"
                >
                  <div>
                    <div className="mb-6 inline-flex min-w-[82px] flex-col rounded-lg bg-[#111315] px-4 py-3 text-white">
                      <span className="text-2xl font-black leading-none">
                        {card.count.toString().padStart(2, '0')}
                      </span>
                      <span className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-white/60">
                        {copy.resourceUnit}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-tight text-[#111315]">
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
                          className="rounded-md border border-[#EDB9A7] bg-[#F8E4DC] px-3 py-1 text-xs font-bold text-[#111315]"
                        >
                          {format}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={withLang(card.href)}
                      className="inline-flex items-center font-bold text-[#E45A2B] transition group-hover:translate-x-1"
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

      <section className="bg-[#F6F4EF] text-navy">
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
            <div className="rounded-[16px] border border-gray-border bg-white py-20 text-center text-gray-text">
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
                className={`rounded-[16px] border bg-white p-7 ${
                  index === 1
                    ? 'border-[#E45A2B]'
                    : 'border-[#E5E2DA]'
                }`}
              >
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-md text-lg font-black ${
                    index === 1
                      ? 'bg-[#E45A2B] text-[#111315]'
                      : 'bg-[#111315] text-white'
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
                      ? 'text-[#E45A2B]'
                      : 'text-[#111315]'
                  }`}
                >
                  {copy.openExpertise} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111315] text-white">
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
                className="rounded-[16px] border border-white/15 bg-white/6 p-7"
              >
                <span className="text-sm font-black tracking-[0.2em] text-[#F09A7C]">
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
