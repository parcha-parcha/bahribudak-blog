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
          help: 'Teknik yayınlarda ve temel site sayfalarında arama yapar.',
        }
      : {
          button: 'Search the site',
          title: 'Site search',
          placeholder: 'e.g. reactive dyeing, pH, fastness…',
          submit: 'Search',
          close: 'Close search',
          help: 'Searches technical publications and core site pages.',
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E2DA] bg-white text-[#111315] transition-colors hover:border-[#E45A2B] hover:bg-[#F6F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
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
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#111315]/72 px-4 pt-[12vh]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="w-full max-w-2xl rounded-lg border border-[#E5E2DA] bg-white p-5 sm:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
                  Bahri Budak
                </p>
                <h2
                  id="site-search-title"
                  className="text-2xl font-extrabold tracking-[-0.03em] text-[#111315]"
                >
                  {copy.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6F7782]">{copy.help}</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#E5E2DA] text-[#111315] transition-colors hover:bg-[#F6F4EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B]"
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
                maxLength={120}
                className="min-h-[52px] flex-1 rounded-md border border-[#E5E2DA] bg-[#F6F4EF] px-4 py-3 text-base text-[#111315] outline-none transition placeholder:text-[#6F7782]/70 focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/15"
              />
              <button
                type="submit"
                className="min-h-[52px] rounded-md bg-[#111315] px-7 py-3 font-bold text-white transition-colors hover:bg-[#1A1F24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
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
