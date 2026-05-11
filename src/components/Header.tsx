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

  // Build language-switched URL
  const switchedPath = pathname.replace(`/${lang}`, `/${otherLang}`)

  const navLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/blog`, label: t('nav.blog') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/hizmetler`, label: lang === 'tr' ? 'Hizmetler' : 'Services' },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Signature */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700}} className="text-white text-xl leading-none tracking-wide">BB</span>
          </div>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700}} className="text-2xl text-navy hidden sm:block">Bahri Budak</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-navy border-b-2 border-yellow-bb pb-0.5'
                    : 'text-gray-text hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Lang switch + LinkedIn */}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-navy mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-navy mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-navy transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
