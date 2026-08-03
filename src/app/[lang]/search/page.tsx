import type { Metadata } from 'next'
import Link from 'next/link'
import { normalizeLang } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { searchSite } from '@/lib/search'

interface SearchPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ q?: string | string[] }>
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = normalizeLang(rawLang)

  return {
    title: lang === 'tr' ? 'Site İçi Arama' : 'Site Search',
    description:
      lang === 'tr'
        ? 'Bahri Budak teknik yayınlarında ve site sayfalarında arama yapın.'
        : 'Search Bahri Budak technical publications and site pages.',
    robots: { index: false, follow: true },
  }
}

function categoryLabel(category: string, lang: Lang): string {
  const labels: Record<string, { tr: string; en: string }> = {
    tekstil: { tr: 'Tekstil ve Teknik Yayınlar', en: 'Textile and Technical Publications' },
    'uretim-yonetim': {
      tr: 'Üretim ve Yönetim Sistemleri',
      en: 'Production and Management Systems',
    },
    'kisisel-gelisim': { tr: 'Kişisel Gelişim', en: 'Personal Growth' },
    'sektorel-analiz': { tr: 'Sektörel Analiz', en: 'Industry Analysis' },
  }

  return labels[category]?.[lang] ?? category
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { lang: rawLang } = await params
  const lang = normalizeLang(rawLang)
  const resolvedSearchParams = await searchParams
  const rawQuery = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0] ?? ''
    : resolvedSearchParams.q ?? ''
  const query = rawQuery.trim().slice(0, 120)
  const results = query ? searchSite(lang, query) : []

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'TEKNİK BİLGİ BANKASI',
          title: 'Site içi arama',
          description:
            'Teknik yayınlarda; başlık, özet, etiket, standart ve makale metni üzerinden arama yapabilirsiniz.',
          placeholder: 'Örn. reaktif boyama, pH, haslık, enerji…',
          submit: 'Ara',
          resultPrefix: 'Arama sonucu',
          resultSuffix: 'kayıt bulundu',
          noResult: 'Bu aramayla eşleşen bir kayıt bulunamadı.',
          noResultHelp: 'Daha kısa veya farklı bir teknik terim deneyin.',
          start: 'Aramak istediğiniz teknik terimi yazın.',
          read: 'İçeriği aç',
          minute: 'dk okuma',
          suggestions: 'Örnek aramalar',
        }
      : {
          eyebrow: 'TECHNICAL KNOWLEDGE BASE',
          title: 'Site search',
          description:
            'Search technical publications by title, summary, tag, standard and full article text.',
          placeholder: 'e.g. reactive dyeing, pH, fastness, energy…',
          submit: 'Search',
          resultPrefix: 'Search result',
          resultSuffix: 'records found',
          noResult: 'No records matched this search.',
          noResultHelp: 'Try a shorter or different technical term.',
          start: 'Enter the technical term you want to find.',
          read: 'Open content',
          minute: 'min read',
          suggestions: 'Example searches',
        }

  const suggestions =
    lang === 'tr'
      ? ['reaktif boyama', 'pH', 'haslık', 'enerji', 'reçete', 'boyutsal stabilite']
      : ['reactive dyeing', 'pH', 'fastness', 'energy', 'recipe', 'dimensional stability']

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#111315]">
      <section className="border-b border-[#E5E2DA] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <p className="section-label">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-[#111315] md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#414950]">
            {copy.description}
          </p>

          <form
            action={`/${lang}/search`}
            method="get"
            role="search"
            className="mt-9 flex flex-col gap-3 rounded-lg border border-[#E5E2DA] bg-white p-3 sm:flex-row"
          >
            <label htmlFor="search-page-input" className="sr-only">
              {copy.title}
            </label>
            <input
              id="search-page-input"
              name="q"
              type="search"
              defaultValue={query}
              placeholder={copy.placeholder}
              autoComplete="off"
              maxLength={120}
              className="min-h-[52px] flex-1 rounded-md border border-[#E5E2DA] bg-white px-5 py-3.5 text-base text-[#111315] outline-none transition placeholder:text-[#6F7782] focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
            />
            <button
              type="submit"
              className="min-h-[52px] rounded-md bg-[#111315] px-8 py-3.5 font-bold text-white transition-colors hover:bg-[#1A1F24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
            >
              {copy.submit}
            </button>
          </form>

          {!query && (
            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6F7782]">
                {copy.suggestions}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/${lang}/search?q=${encodeURIComponent(suggestion)}`}
                    className="rounded-md border border-[#E5E2DA] bg-white px-4 py-2 text-sm font-semibold text-[#111315] transition-colors hover:border-[#E45A2B] hover:bg-[#F8E4DC]"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {query ? (
          <>
            <div className="mb-7 flex flex-col gap-2 border-b border-[#E5E2DA] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#6F7782]">
                  {copy.resultPrefix}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#111315]">“{query}”</h2>
              </div>
              <p className="text-sm font-semibold text-[#6F7782]">
                {results.length} {copy.resultSuffix}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <article
                    key={`${result.type}-${result.href}`}
                    className="rounded-lg border border-[#E5E2DA] bg-white p-6 transition-colors hover:border-[#E45A2B] md:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6F7782]">
                      <span className="rounded-md bg-[#F8E4DC] px-3 py-1 text-[#A53C18]">
                        {categoryLabel(result.category, lang)}
                      </span>
                      {result.date && (
                        <time dateTime={result.date}>
                          {new Date(result.date).toLocaleDateString(
                            lang === 'tr' ? 'tr-TR' : 'en-US',
                            { day: 'numeric', month: 'long', year: 'numeric' },
                          )}
                        </time>
                      )}
                      {result.readingTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>
                            {result.readingTime} {copy.minute}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#111315]">
                      <Link href={result.href} className="hover:text-[#E45A2B]">
                        {result.title}
                      </Link>
                    </h3>

                    <p className="mt-3 max-w-4xl leading-relaxed text-[#414950]">
                      {result.excerpt}
                    </p>

                    <Link
                      href={result.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#111315] hover:text-[#E45A2B]"
                    >
                      {copy.read}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-[#E5E2DA] bg-white px-6 py-16 text-center">
                <h2 className="text-2xl font-extrabold text-[#111315]">{copy.noResult}</h2>
                <p className="mt-3 text-[#414950]">{copy.noResultHelp}</p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-[#E5E2DA] bg-white px-6 py-16 text-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-[#E45A2B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.4-3.4" />
            </svg>
            <p className="mt-5 text-lg font-semibold text-[#414950]">{copy.start}</p>
          </div>
        )}
      </section>
    </div>
  )
}
