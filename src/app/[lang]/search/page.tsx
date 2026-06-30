import Link from 'next/link'
import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n'
import { searchSite } from '@/lib/search'

interface SearchPageProps {
  params: Promise<{ lang: Lang }>
  searchParams: Promise<{ q?: string | string[] }>
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === 'tr' ? 'Site İçi Arama | Bahri Budak' : 'Site Search | Bahri Budak',
    description:
      lang === 'tr'
        ? 'Bahri Budak teknik yayınları ve site sayfalarında arama yapın.'
        : 'Search Bahri Budak technical publications and site pages.',
    robots: { index: false, follow: true },
  }
}

function categoryLabel(category: string, lang: Lang): string {
  const labels: Record<string, { tr: string; en: string }> = {
    tekstil: { tr: 'Tekstil', en: 'Textile' },
    'kisisel-gelisim': { tr: 'Kişisel Gelişim', en: 'Personal Growth' },
    'turkiye-gundemi': { tr: 'Türkiye Gündemi', en: 'Turkey Agenda' },
    dunya: { tr: 'Dünya', en: 'World' },
  }

  return labels[category]?.[lang] ?? category
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams
  const rawQuery = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0] ?? ''
    : resolvedSearchParams.q ?? ''
  const query = rawQuery.trim()
  const results = query ? searchSite(lang, query) : []

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'BİLGİ BANKASI',
          title: 'Site içi arama',
          description:
            'Teknik yayınlarda; başlık, özet, etiket ve makale metni üzerinden arama yapabilirsiniz.',
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
          eyebrow: 'KNOWLEDGE BASE',
          title: 'Site search',
          description:
            'Search technical publications by title, summary, tag and full article text.',
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
      ? ['reaktif boyama', 'pH', 'haslık', 'enerji', 'reçete', 'kalite kontrol']
      : ['reactive dyeing', 'pH', 'fastness', 'energy', 'recipe', 'quality control']

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="border-b border-[#D8DDE5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <p className="section-label">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-[#0B2343] md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3E4F66]">
            {copy.description}
          </p>

          <form
            action={`/${lang}/search`}
            method="get"
            role="search"
            className="mt-9 flex flex-col gap-3 rounded-[24px] border border-[#D8DDE5] bg-[#F8FAFC] p-3 shadow-[0_12px_36px_rgba(11,35,67,0.07)] sm:flex-row"
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
              className="min-h-13 flex-1 rounded-2xl border border-[#D8DDE5] bg-white px-5 py-3.5 text-base text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/15"
            />
            <button
              type="submit"
              className="min-h-13 rounded-2xl bg-[#0B2343] px-8 py-3.5 font-bold text-white transition-colors hover:bg-[#12365E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2"
            >
              {copy.submit}
            </button>
          </form>

          {!query && (
            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5D5F63]">
                {copy.suggestions}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/${lang}/search?q=${encodeURIComponent(suggestion)}`}
                    className="rounded-full border border-[#D8DDE5] bg-white px-4 py-2 text-sm font-semibold text-[#0B2343] transition-colors hover:border-[#2EA6D9] hover:bg-[#EAF6FC]"
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
            <div className="mb-7 flex flex-col gap-2 border-b border-[#D8DDE5] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#5D5F63]">
                  {copy.resultPrefix}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#0B2343]">
                  “{query}”
                </h2>
              </div>
              <p className="text-sm font-semibold text-[#5D5F63]">
                {results.length} {copy.resultSuffix}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <article
                    key={`${result.type}-${result.href}`}
                    className="rounded-[24px] border border-[#D8DDE5] bg-white p-6 shadow-[0_8px_28px_rgba(11,35,67,0.06)] transition hover:-translate-y-0.5 hover:border-[#2EA6D9] hover:shadow-[0_14px_38px_rgba(11,35,67,0.10)] md:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#5D5F63]">
                      <span className="rounded-full bg-[#EAF6FC] px-3 py-1 text-[#0B2343]">
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

                    <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#0B2343]">
                      <Link href={result.href} className="hover:text-[#2EA6D9]">
                        {result.title}
                      </Link>
                    </h3>

                    <p className="mt-3 max-w-4xl leading-relaxed text-[#3E4F66]">
                      {result.excerpt}
                    </p>

                    <Link
                      href={result.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0B2343] hover:text-[#2EA6D9]"
                    >
                      {copy.read}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-[#D8DDE5] bg-white px-6 py-16 text-center">
                <h2 className="text-2xl font-extrabold text-[#0B2343]">{copy.noResult}</h2>
                <p className="mt-3 text-[#5D5F63]">{copy.noResultHelp}</p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[28px] border border-[#D8DDE5] bg-white px-6 py-16 text-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-[#2EA6D9]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.4-3.4" />
            </svg>
            <p className="mt-5 text-lg font-semibold text-[#3E4F66]">{copy.start}</p>
          </div>
        )}
      </section>
    </main>
  )
}
