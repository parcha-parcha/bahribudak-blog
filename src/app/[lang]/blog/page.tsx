import type { Metadata } from 'next'
import Link from 'next/link'

import PostCard from '@/components/PostCard'
import type { Lang } from '@/lib/i18n'
import {
  getAllPosts,
  normalizeProcessArea,
  processAreaLabel,
  resolveDocumentStatus,
  type DocumentStatus,
  type ProcessArea,
} from '@/lib/posts'

const siteUrl = 'https://bahribudak.com'

type StatusFilter = 'all' | DocumentStatus
type SortOption = 'newest' | 'oldest' | 'title'

interface BlogPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{
    q?: string | string[]
    area?: string | string[]
    status?: string | string[]
    sort?: string | string[]
  }>
}

interface BlogFilterState {
  q: string
  area?: ProcessArea
  status: StatusFilter
  sort: SortOption
}

const processAreas: {
  slug: ProcessArea
  tr: string
  en: string
}[] = [
  {
    slug: 'orgu',
    tr: 'Örgü Kumaş / Knitted Fabric',
    en: 'Knitted Fabric / Örgü Kumaş',
  },
  {
    slug: 'boya',
    tr: 'Boya / Dyeing',
    en: 'Dyeing / Boya',
  },
  {
    slug: 'apre',
    tr: 'Apre / Finishing',
    en: 'Finishing / Apre',
  },
]

function firstValue(
  value: string | string[] | undefined,
): string {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function dateValue(value: string): number {
  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function buildBlogHref(
  lang: Lang,
  state: BlogFilterState,
): string {
  const params = new URLSearchParams()

  if (state.q.trim()) {
    params.set('q', state.q.trim())
  }

  if (state.area) {
    params.set('area', state.area)
  }

  if (state.status !== 'all') {
    params.set('status', state.status)
  }

  if (state.sort !== 'newest') {
    params.set('sort', state.sort)
  }

  const queryString = params.toString()

  return queryString
    ? `/${lang}/blog?${queryString}`
    : `/${lang}/blog`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const title =
    lang === 'tr'
      ? 'Teknik Yayınlar'
      : 'Technical Publications'

  const description =
    lang === 'tr'
      ? 'Endüstriyel örgü kumaş, boya ve apre proseslerini parametre, ölçüm, formül, kök neden ve düzeltici faaliyet yapısıyla ele alan teknik yayınlar.'
      : 'Technical publications covering knitted fabric, dyeing and finishing through parameters, measurements, calculations, root causes and corrective actions.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        tr: `${siteUrl}/tr/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/blog`,
      title,
      description,
      images: [
        {
          url: '/images/blog-endustriyel-proses.jpg',
        },
      ],
    },
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { lang: rawLang } = await params
  const resolvedSearchParams = await searchParams

  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'ÖRGÜ KUMAŞ · BOYA · APRE',
          title: 'Teknik Yayınlar',
          summary:
            'Endüstriyel örgü kumaş, boya ve apre süreçlerini; proses parametreleri, ölçüm noktaları, formüller, kök nedenler ve düzeltici faaliyetlerle birlikte ele alan saha yayınları.',
          imageAlt:
            'Tekstil proses ve endüstriyel üretim altyapısı',
          systemKicker: 'BAHRİ BUDAK',
          systemTitle: 'Teknik Yayın Sistemi',
          systemText:
            'Her yayın; amaç, kapsam, proses ilişkisi, kontrol planı, kök neden, düzeltici faaliyet ve kaynak yapısıyla sunulur.',
          totalPublications: 'Toplam yayın',
          technicalPublications: 'Teknik yayın',
          currentTechnicalPublications: 'Güncel teknik yayın',
          archiveTechnicalPublications: 'Arşiv teknik yayın',
          downloadablePublications: 'İndirilebilir dosyalı yayın',
          searchLabel: 'Yayınlarda ara',
          searchPlaceholder:
            'Başlık, konu, etiket, doküman kodu veya standart ara',
          searchButton: 'Ara',
          processLabel: 'Proses alanı',
          allProcesses: 'Tüm yayınlar',
          statusLabel: 'Yayın durumu',
          allStatuses: 'Tüm yayınlar',
          currentStatus: 'Güncel teknik',
          archiveStatus: 'Arşiv teknik',
          sortLabel: 'Sıralama',
          newest: 'En yeni',
          oldest: 'En eski',
          alphabetical: 'Başlığa göre A–Z',
          clearFilters: 'Filtreleri temizle',
          resultsLabel: 'Yayın listesi',
          resultsFound: 'yayın bulundu',
          resultsListed: 'yayın listeleniyor',
          noResultsTitle: 'Arama ölçütlerine uygun yayın bulunamadı.',
          noResultsText:
            'Arama sözcüğünü değiştirin veya aktif filtreleri temizleyin.',
          noResultsButton: 'Tüm yayınları göster',
        }
      : {
          eyebrow: 'KNITTED FABRIC · DYEING · FINISHING',
          title: 'Technical Publications',
          summary:
            'Field publications covering knitted fabric, dyeing and finishing through process parameters, measurement points, calculations, root causes and corrective actions.',
          imageAlt:
            'Textile processing and industrial production infrastructure',
          systemKicker: 'BAHRİ BUDAK',
          systemTitle: 'Technical Publication System',
          systemText:
            'Each publication follows a controlled structure covering purpose, scope, process relationship, control plan, root cause, corrective action and references.',
          totalPublications: 'Total publications',
          technicalPublications: 'Technical publications',
          currentTechnicalPublications:
            'Current technical publications',
          archiveTechnicalPublications:
            'Archived technical publications',
          downloadablePublications:
            'Publications with downloads',
          searchLabel: 'Search publications',
          searchPlaceholder:
            'Search title, topic, tag, document code or standard',
          searchButton: 'Search',
          processLabel: 'Process area',
          allProcesses: 'All publications',
          statusLabel: 'Publication status',
          allStatuses: 'All publications',
          currentStatus: 'Current technical',
          archiveStatus: 'Archived technical',
          sortLabel: 'Sort order',
          newest: 'Newest first',
          oldest: 'Oldest first',
          alphabetical: 'Title A–Z',
          clearFilters: 'Clear filters',
          resultsLabel: 'Publication list',
          resultsFound: 'publications found',
          resultsListed: 'publications listed',
          noResultsTitle:
            'No publications match the selected criteria.',
          noResultsText:
            'Change the search term or clear the active filters.',
          noResultsButton: 'Show all publications',
        }

  const searchQuery = firstValue(resolvedSearchParams.q).trim()
  const activeArea = normalizeProcessArea(
    firstValue(resolvedSearchParams.area),
  )

  const rawStatus = firstValue(resolvedSearchParams.status)
  const activeStatus: StatusFilter =
    rawStatus === 'current' || rawStatus === 'archive'
      ? rawStatus
      : 'all'

  const rawSort = firstValue(resolvedSearchParams.sort)
  const activeSort: SortOption =
    rawSort === 'oldest' || rawSort === 'title'
      ? rawSort
      : 'newest'

  const technicalPosts = getAllPosts(lang).filter(
    post =>
      post.category === 'tekstil' ||
      post.technicalPublication,
  )

  const controlledTechnicalPosts = technicalPosts.filter(
    post => post.technicalPublication,
  )

  const technicalPublicationCount =
    controlledTechnicalPosts.length

  const currentCount = controlledTechnicalPosts.filter(
    post =>
      resolveDocumentStatus(post.documentStatus) ===
      'current',
  ).length

  const archiveCount = controlledTechnicalPosts.filter(
    post =>
      resolveDocumentStatus(post.documentStatus) ===
      'archive',
  ).length

  const downloadableCount = controlledTechnicalPosts.filter(
    post => post.hasDownloads,
  ).length

  const processCounts = technicalPosts.reduce<
    Record<ProcessArea, number>
  >(
    (counts, post) => {
      if (post.processArea) {
        counts[post.processArea] += 1
      }

      return counts
    },
    {
      orgu: 0,
      boya: 0,
      apre: 0,
    },
  )

  const normalizedSearchQuery =
    normalizeSearchText(searchQuery)

  const searchTerms = normalizedSearchQuery
    .split(/\s+/)
    .filter(Boolean)

  const filteredPosts = technicalPosts
    .filter(post => {
      if (
        activeArea &&
        post.processArea !== activeArea
      ) {
        return false
      }

      if (activeStatus !== 'all') {
        if (!post.technicalPublication) {
          return false
        }

        if (
          resolveDocumentStatus(post.documentStatus) !==
          activeStatus
        ) {
          return false
        }
      }

      if (searchTerms.length === 0) {
        return true
      }

      const searchIndex = normalizeSearchText(
        [
          post.title,
          post.excerpt,
          post.category,
          post.tags.join(' '),
          post.documentCode || '',
          post.revision || '',
          post.standards?.join(' ') || '',
          processAreaLabel(post.processArea, lang),
          post.hasDownloads ? copy.downloadablePublications : '',
        ].join(' '),
      )

      return searchTerms.every(term =>
        searchIndex.includes(term),
      )
    })
    .sort((a, b) => {
      if (activeSort === 'oldest') {
        return dateValue(a.date) - dateValue(b.date)
      }

      if (activeSort === 'title') {
        return a.title.localeCompare(
          b.title,
          lang === 'tr' ? 'tr-TR' : 'en-US',
          {
            sensitivity: 'base',
          },
        )
      }

      return dateValue(b.date) - dateValue(a.date)
    })

  const filterState: BlogFilterState = {
    q: searchQuery,
    area: activeArea,
    status: activeStatus,
    sort: activeSort,
  }

  const numberFormatter = new Intl.NumberFormat(
    lang === 'tr' ? 'tr-TR' : 'en-US',
  )

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(activeArea) ||
    activeStatus !== 'all' ||
    activeSort !== 'newest'

  const metrics = [
    {
      value: technicalPosts.length,
      label: copy.totalPublications,
    },
    {
      value: technicalPublicationCount,
      label: copy.technicalPublications,
    },
    {
      value: currentCount,
      label: copy.currentTechnicalPublications,
    },
    {
      value: archiveCount,
      label: copy.archiveTechnicalPublications,
    },
    {
      value: downloadableCount,
      label: copy.downloadablePublications,
    },
  ]

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="border-b border-[#D8DEE8] bg-[#F3F6FA]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="section-label text-[#4C5561]">
                {copy.eyebrow}
              </p>

              <h1 className="mb-5 mt-3 text-5xl font-bold tracking-[-0.045em] text-[#0B2343] md:text-6xl">
                {copy.title}
              </h1>

              <div
                className="mb-7 h-1 w-16 bg-[#2EA6D9]"
                aria-hidden="true"
              />

              <p className="max-w-xl text-lg leading-relaxed text-[#4C5561]">
                {copy.summary}
              </p>
            </div>

            <div className="bb-publication-panel relative min-h-[310px] overflow-hidden rounded-[34px] border border-[#D8DEE8] bg-[#061A33] shadow-[0_24px_70px_rgba(11,35,67,0.18)]">
              <img
                src="/images/blog-endustriyel-proses.jpg"
                alt={copy.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#061A33]/96 via-[#061A33]/78 to-[#061A33]/48" />

              <div className="relative z-10 flex min-h-[310px] items-end p-6 md:p-8">
                <div className="bb-publication-card max-w-[620px] rounded-[26px] border border-white/30 bg-[#061A33] px-6 py-5 shadow-2xl">
                  <p className="bb-publication-kicker text-xs font-black tracking-[0.28em] text-white">
                    {copy.systemKicker}
                  </p>

                  <h2 className="bb-publication-title mt-2 text-2xl font-black leading-tight text-white md:text-3xl">
                    {copy.systemTitle}
                  </h2>

                  <p className="bb-publication-copy mt-3 max-w-lg text-sm leading-relaxed text-[#EAF3FF] md:text-base">
                    {copy.systemText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {metrics.map(metric => (
              <div
                key={metric.label}
                className="rounded-[22px] border border-[#D8DEE8] bg-white px-5 py-5 shadow-sm"
              >
                <div className="text-3xl font-black tracking-[-0.04em] text-[#0B2343]">
                  {numberFormatter.format(metric.value)}
                </div>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[#66717E]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D8DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-[28px] border border-[#D8DEE8] bg-[#F7F9FC] p-5 md:p-7">
            <form
              action={`/${lang}/blog`}
              method="get"
              className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_230px_auto]"
            >
              {activeArea && (
                <input
                  type="hidden"
                  name="area"
                  value={activeArea}
                />
              )}

              {activeStatus !== 'all' && (
                <input
                  type="hidden"
                  name="status"
                  value={activeStatus}
                />
              )}

              <div>
                <label
                  htmlFor="publication-search"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.13em] text-[#4C5561]"
                >
                  {copy.searchLabel}
                </label>

                <div className="relative">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8490]"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>

                  <input
                    id="publication-search"
                    name="q"
                    type="search"
                    defaultValue={searchQuery}
                    placeholder={copy.searchPlaceholder}
                    className="h-12 w-full rounded-2xl border border-[#C9D1DC] bg-white pl-12 pr-4 text-sm text-[#0B2343] outline-none transition placeholder:text-[#8A949F] focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="publication-sort"
                  className="mb-2 block text-xs font-black uppercase tracking-[0.13em] text-[#4C5561]"
                >
                  {copy.sortLabel}
                </label>

                <select
                  id="publication-sort"
                  name="sort"
                  defaultValue={activeSort}
                  className="h-12 w-full rounded-2xl border border-[#C9D1DC] bg-white px-4 text-sm font-semibold text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/10"
                >
                  <option value="newest">
                    {copy.newest}
                  </option>
                  <option value="oldest">
                    {copy.oldest}
                  </option>
                  <option value="title">
                    {copy.alphabetical}
                  </option>
                </select>
              </div>

              <div className="flex items-end gap-3">
                <button
                  type="submit"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#0B2343] px-6 text-sm font-black text-white transition hover:bg-[#163A64] lg:flex-none"
                >
                  {copy.searchButton}
                </button>

                {hasActiveFilters && (
                  <Link
                    href={`/${lang}/blog`}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#C9D1DC] bg-white px-5 text-sm font-bold text-[#4C5561] transition hover:border-[#0B2343] hover:text-[#0B2343]"
                  >
                    {copy.clearFilters}
                  </Link>
                )}
              </div>
            </form>

            <div className="mt-7 grid grid-cols-1 gap-6 border-t border-[#D8DEE8] pt-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.13em] text-[#4C5561]">
                  {copy.processLabel}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={buildBlogHref(lang, {
                      ...filterState,
                      area: undefined,
                    })}
                    aria-current={
                      !activeArea ? 'page' : undefined
                    }
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      !activeArea
                        ? 'border-[#0B2343] bg-[#0B2343]'
                        : 'border-[#D8DEE8] bg-white hover:border-[#0B2343]'
                    }`}
                  >
                    <span
                      style={{
                        color: !activeArea
                          ? '#FFFFFF'
                          : '#4C5561',
                      }}
                    >
                      {copy.allProcesses}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        !activeArea
                          ? 'bg-white/15 text-white'
                          : 'bg-[#EAF0F6] text-[#4C5561]'
                      }`}
                    >
                      {technicalPosts.length}
                    </span>
                  </Link>

                  {processAreas.map(item => {
                    const isActive =
                      activeArea === item.slug

                    return (
                      <Link
                        key={item.slug}
                        href={buildBlogHref(lang, {
                          ...filterState,
                          area: item.slug,
                        })}
                        aria-current={
                          isActive ? 'page' : undefined
                        }
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                          isActive
                            ? 'border-[#0B2343] bg-[#0B2343]'
                            : 'border-[#D8DEE8] bg-white hover:border-[#0B2343]'
                        }`}
                      >
                        <span
                          style={{
                            color: isActive
                              ? '#FFFFFF'
                              : '#4C5561',
                          }}
                        >
                          {lang === 'tr'
                            ? item.tr
                            : item.en}
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-[#EAF0F6] text-[#4C5561]'
                          }`}
                        >
                          {processCounts[item.slug]}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.13em] text-[#4C5561]">
                  {copy.statusLabel}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      value: 'all' as const,
                      label: copy.allStatuses,
                      count: technicalPosts.length,
                    },
                    {
                      value: 'current' as const,
                      label: copy.currentStatus,
                      count: currentCount,
                    },
                    {
                      value: 'archive' as const,
                      label: copy.archiveStatus,
                      count: archiveCount,
                    },
                  ].map(item => {
                    const isActive =
                      activeStatus === item.value

                    return (
                      <Link
                        key={item.value}
                        href={buildBlogHref(lang, {
                          ...filterState,
                          status: item.value,
                        })}
                        aria-current={
                          isActive ? 'page' : undefined
                        }
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                          isActive
                            ? 'border-[#2EA6D9] bg-[#EAF6FC] text-[#075A7D]'
                            : 'border-[#D8DEE8] bg-white text-[#4C5561] hover:border-[#2EA6D9] hover:text-[#075A7D]'
                        }`}
                      >
                        <span>{item.label}</span>

                        <span className="rounded-full bg-[#DCECF5] px-2 py-0.5 text-[10px] text-[#075A7D]">
                          {item.count}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-14">
        <div className="mb-7 flex flex-col gap-3 border-b border-[#D8DEE8] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#2A8EB8]">
              {copy.resultsLabel}
            </p>

            <h2
              className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#0B2343]"
              aria-live="polite"
            >
              {numberFormatter.format(filteredPosts.length)}{' '}
              {searchQuery
                ? copy.resultsFound
                : copy.resultsListed}
            </h2>
          </div>

          {searchQuery && (
            <p className="max-w-lg truncate text-sm font-medium text-[#66717E]">
              “{searchQuery}”
            </p>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map(post => (
              <PostCard
                key={post.slug}
                post={post}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-[#D8DDE5] bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FC] text-[#2A8EB8]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M8.5 11h5" />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#0B2343]">
              {copy.noResultsTitle}
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-[#66717E]">
              {copy.noResultsText}
            </p>

            <Link
              href={`/${lang}/blog`}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0B2343] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#163A64]"
            >
              {copy.noResultsButton}
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
