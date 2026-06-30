'use client'

import type { Lang } from '@/lib/i18n'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'

interface SearchButtonProps {
  lang: Lang
}

export default function SearchButton({ lang }: SearchButtonProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const copy =
    lang === 'tr'
      ? {
          button: 'Site içinde ara',
          title: 'Site içi arama',
          placeholder: 'Örn. reaktif boyama, pH, haslık…',
          submit: 'Ara',
          close: 'Aramayı kapat',
          help: 'Teknik yayınlar, makaleler ve temel site sayfalarında arama yapar.',
        }
      : {
          button: 'Search the site',
          title: 'Site search',
          placeholder: 'e.g. reactive dyeing, pH, fastness…',
          submit: 'Search',
          close: 'Close search',
          help: 'Searches technical publications, articles and core site pages.',
        }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => inputRef.current?.focus(), 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) {
      inputRef.current?.focus()
      return
    }

    router.push(`/${lang}/search?q=${encodeURIComponent(normalizedQuery)}`)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E0EA] bg-white text-[#0B2343] transition-colors hover:border-[#2EA6D9] hover:bg-[#EAF6FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        aria-label={copy.button}
        title={copy.button}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.4-3.4" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#061A33]/72 px-4 pt-[12vh] backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="w-full max-w-2xl rounded-[28px] border border-white/15 bg-white p-5 shadow-[0_32px_100px_rgba(6,26,51,0.35)] sm:p-7 dark:bg-[#071A33]"
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2EA6D9]">
                  Bahri Budak
                </p>
                <h2
                  id="site-search-title"
                  className="text-2xl font-extrabold tracking-[-0.03em] text-[#0B2343] dark:text-white"
                >
                  {copy.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5D5F63] dark:text-white/70">
                  {copy.help}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7E0EA] text-[#0B2343] transition-colors hover:bg-[#EAF6FC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                aria-label={copy.close}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="site-search-input" className="sr-only">
                {copy.title}
              </label>
              <input
                ref={inputRef}
                id="site-search-input"
                name="q"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.placeholder}
                autoComplete="off"
                className="min-h-12 flex-1 rounded-2xl border border-[#D7E0EA] bg-[#F8FAFC] px-4 py-3 text-base text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/15 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/45"
              />
              <button
                type="submit"
                className="min-h-12 rounded-2xl bg-[#0B2343] px-6 py-3 font-bold text-white transition-colors hover:bg-[#12365E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2 dark:bg-[#2EA6D9] dark:text-[#061A33]"
              >
                {copy.submit}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
