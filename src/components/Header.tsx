'use client'

import BBHeaderSocialLinks from '@/components/BBHeaderSocialLinks'
import BrandLogo from '@/components/BrandLogo'
import SearchButton from '@/components/SearchButton'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import { getTranslatedPath } from '@/lib/translatedRoutes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface HeaderProps {
  lang: Lang
}

export default function Header({ lang }: HeaderProps) {
  const t = useTranslations(lang)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const otherLang = lang === 'tr' ? 'en' : 'tr'
  const switchedPath = getTranslatedPath(pathname, lang, otherLang)
  const mobileMenuId = 'primary-mobile-navigation'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  const navLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    {
      href: `/${lang}/uzmanlik`,
      label: lang === 'tr' ? 'Örgü · Boya · Apre' : 'Knitting · Dyeing · Finishing',
    },
    { href: `/${lang}/blog`, label: lang === 'tr' ? 'Teknik Yayınlar' : 'Technical Publications' },
    { href: `/${lang}/magazam`, label: lang === 'tr' ? 'Kaynak Merkezi' : 'Resource Center' },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8DDE5] bg-white/95 shadow-[0_8px_30px_rgba(11,35,67,0.06)] backdrop-blur-xl">
      <div className="h-[3px] bg-[#2EA6D9]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-6">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center"
          aria-label={lang === 'tr' ? 'Bahri Budak ana sayfa' : 'Bahri Budak home page'}
        >
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white">
            <BrandLogo variant="short" className="h-full w-full" priority />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#D8DDE5] bg-[#F5F7FA] px-2 py-1.5 xl:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === `/${lang}`
                ? pathname === link.href
                : !link.href.includes('#') && pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0B2343] text-white shadow-sm'
                    : 'text-[#0B2343]/82 hover:bg-white hover:text-[#0B2343]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <SearchButton lang={lang} />

          <Link
            href={switchedPath}
            className="rounded-full border border-[#D8DDE5] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0B2343] transition-colors hover:border-[#2EA6D9]"
            aria-label={otherLang === 'en' ? 'Switch to English' : 'Türkçeye geç'}
          >
            {otherLang === 'en' ? 'EN' : 'TR'}
          </Link>

          <div className="hidden md:flex">
            <BBHeaderSocialLinks />
          </div>

          <button
            type="button"
            className="rounded-xl border border-[#D8DDE5] p-2 xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={lang === 'tr' ? 'Menüyü aç veya kapat' : 'Open or close menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            <span className="mb-1 block h-0.5 w-5 bg-[#0B2343]" />
            <span className="mb-1 block h-0.5 w-5 bg-[#0B2343]" />
            <span className="block h-0.5 w-5 bg-[#0B2343]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id={mobileMenuId}
          className="border-t border-[#D8DDE5] bg-white px-6 py-4 xl:hidden"
        >
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${lang}`
                  ? pathname === link.href
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#0B2343] text-white'
                      : 'text-[#0B2343] hover:bg-[#EAF6FC]'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-3 border-t border-[#D8DDE5] pt-3 md:hidden">
            <BBHeaderSocialLinks />
          </div>
        </div>
      )}
    </header>
  )
}
