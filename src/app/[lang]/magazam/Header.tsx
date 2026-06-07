'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'

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
    { href: `/${lang}`,           label: t('nav.home') },
    { href: `/${lang}/blog`,      label: t('nav.blog') },
    { href: `/${lang}/about`,     label: t('nav.about') },
    { href: `/${lang}/hizmetler`, label: lang === 'tr' ? 'Hizmetler' : 'Services' },
    { href: `/${lang}/haberler`,  label: lang === 'tr' ? 'Haberler' : 'News' },
    { href: `/${lang}/magazam`,   label: lang === 'tr' ? 'Magazam' : 'Store' },
    { href: `/${lang}/contact`,   label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700 }} className="text-white text-xl leading-none tracking-wide">BB</span>
          </div>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700 }} className="text-2xl text-navy hidden sm:block">Bahri Budak</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${isActive ? 'text-navy border-b-2 border-yellow-bb pb-0.5' : 'text-gray-text hover:text-navy'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchedPath}
            className="text-xs font-bold uppercase tracking-widest text-gray-text hover:text-navy border border-gray-border rounded-full px-3 py-1.5 transition-colors hover:border-navy"
          >
            {otherLang.toUpperCase()}
          </Link>

          <a
            href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-navy-light transition-colors"
          >
            LinkedIn
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-navy mb-1" />
            <div className="w-5 h-0.5 bg-navy mb-1" />
            <div className="w-5 h-0.5 bg-navy" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-border px-6 py-4 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold text-navy hover:text-yellow-bb transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
