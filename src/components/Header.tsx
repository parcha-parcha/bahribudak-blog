'use client'

import BBHeaderSocialLinks from '@/components/BBHeaderSocialLinks'
import BrandLogo from '@/components/BrandLogo'
import ThemeToggle from '@/components/ThemeToggle'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface HeaderProps {
  lang: Lang
}

export default function Header({ lang }: HeaderProps) {
  const t = useTranslations(lang)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const otherLang = lang === 'tr' ? 'en' : 'tr'
  const switchedPath = pathname.replace(`/${lang}`, `/${otherLang}`)

  const navLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/blog`, label: t('nav.blog') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/hizmetler`, label: lang === 'tr' ? 'Hizmetler' : 'Services' },
    { href: `/${lang}/haberler`, label: lang === 'tr' ? 'Haberler' : 'News' },
    { href: `/${lang}/magazam`, label: lang === 'tr' ? 'Şablonlar' : 'Templates' },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#D7E0EA] bg-white/95 shadow-[0_8px_30px_rgba(11,35,67,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#071a33]/95">
      <div className="h-[3px] bg-gradient-to-r from-[#2EA6D9] via-[#0B2343] to-[#5BBBE6]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-5">
        <Link
          href={`/${lang}`}
          className="group flex min-w-0 shrink-0 items-center gap-3"
          aria-label="Bahri Budak ana sayfa"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6FC] p-1.5 ring-1 ring-[#2EA6D9]/20 transition-transform group-hover:scale-[1.03]">
            <BrandLogo variant="mark" className="h-full w-full" />
          </span>

          <span className="hidden min-w-0 sm:block">
            <span className="block whitespace-nowrap text-[18px] font-extrabold leading-tight tracking-[0.01em] text-[#0B2343] dark:text-white">
              Bahri Budak
            </span>
            <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12365E]/70 dark:text-[#EAF6FC]/70">
              {lang === 'tr'
                ? 'Tekstil Boyama ve Apre Uzmanı'
                : 'Textile Dyeing and Finishing Specialist'}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#D7E0EA] bg-[#F3F6FA]/90 px-2 py-1.5 xl:flex dark:border-white/10 dark:bg-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0B2343] text-white shadow-sm'
                    : 'text-[#0B2343]/80 hover:bg-white hover:text-[#0B2343] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <Link
            href={switchedPath}
            className="rounded-full border border-[#D7E0EA] bg-white px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0B2343]/75 transition-colors hover:border-[#2EA6D9] hover:text-[#0B2343] dark:border-white/15 dark:bg-white/5 dark:text-white/75"
          >
            {otherLang === 'en' ? 'EN' : 'TR'}
          </Link>

          <div className="hidden md:flex">
            <BBHeaderSocialLinks />
          </div>

          <button
            type="button"
            className="rounded-xl border border-[#D7E0EA] p-2 xl:hidden dark:border-white/15"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={lang === 'tr' ? 'Menüyü aç veya kapat' : 'Open or close menu'}
            aria-expanded={menuOpen}
          >
            <span className="mb-1 block h-0.5 w-5 bg-[#0B2343] dark:bg-white" />
            <span className="mb-1 block h-0.5 w-5 bg-[#0B2343] dark:bg-white" />
            <span className="block h-0.5 w-5 bg-[#0B2343] dark:bg-white" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[#D7E0EA] bg-white/98 px-6 py-4 backdrop-blur-xl xl:hidden dark:border-white/10 dark:bg-[#071a33]/98">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#0B2343] transition-colors hover:bg-[#EAF6FC] hover:text-[#0B2343] dark:text-white dark:hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-[#D7E0EA] pt-3 md:hidden dark:border-white/10">
            <BBHeaderSocialLinks />
          </div>
        </div>
      )}
    </header>
  )
}
