'use client'

import BBHeaderSocialLinks from '@/components/BBHeaderSocialLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import ThemeToggle from '@/components/ThemeToggle'
import BrandLogo from '@/components/BrandLogo'

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
    <header
      className="sticky top-0 z-50 relative overflow-hidden border-b border-[#D7E0EA] dark:border-white/10"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.90) 50%, rgba(243,246,250,0.86) 100%), url('/images/header-su-dalga.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 43%',
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#2EA6D9] via-[#0B2343] to-transparent opacity-80" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:px-5">
        <Link
          href={`/${lang}`}
          className="flex h-[46px] w-[165px] max-w-[48vw] shrink-0 items-center justify-center rounded-[16px]"
          aria-label="Bahri Budak ana sayfa"
        >
          <BrandLogo className="h-full w-full object-contain" />
        </Link>

        <nav className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2.5 py-2 shadow-sm backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy/80 hover:bg-[#F3F6FA] hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/80 bg-white/75 px-2 py-1.5 shadow-sm backdrop-blur-md">
          <ThemeToggle />

          <Link
            href={switchedPath}
            className="rounded-full border border-[#D7E0EA] bg-white/70 px-2.5 py-1.5 text-xs font-bold uppercase tracking-widest text-navy/75 transition-colors hover:border-navy hover:text-navy"
          >
            {otherLang === 'en' ? 'English' : 'Türkçe'}
          </Link>

          <div className="hidden md:flex">
            <BBHeaderSocialLinks />
          </div>

          <button
            className="xl:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="mb-1 h-0.5 w-5 bg-navy" />
            <div className="mb-1 h-0.5 w-5 bg-navy" />
            <div className="h-0.5 w-5 bg-navy" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="relative space-y-3 border-t border-[#D7E0EA] bg-white/95 px-6 py-4 backdrop-blur-md xl:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold text-navy transition-colors hover:text-accent-blue"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 md:hidden">
            <BBHeaderSocialLinks />
          </div>
        </div>
      )}
    </header>
  )
}