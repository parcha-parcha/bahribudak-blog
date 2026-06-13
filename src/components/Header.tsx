'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import ThemeToggle from '@/components/ThemeToggle'
import BrandLogo from '@/components/BrandLogo'

interface HeaderProps { lang: Lang }

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
    { href: `/${lang}/magazam`, label: lang === 'tr' ? 'Magazam' : 'Store' },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-border dark:bg-[#061A33]/95 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3 group" aria-label="Bahri Budak ana sayfa">
          <BrandLogo className="h-12 w-[198px] hidden sm:block" />
          <BrandLogo variant="mark" className="h-10 w-14 sm:hidden" />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} className={`text-sm font-semibold transition-colors ${isActive ? 'text-navy border-b-2 border-yellow-bb pb-0.5 dark:text-white' : 'text-gray-text hover:text-navy dark:text-slate-400 dark:hover:text-white'}`}>{link.label}</Link>
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={switchedPath} className="text-xs font-bold uppercase tracking-widest text-gray-text hover:text-navy border border-gray-border rounded-full px-3 py-1.5 transition-colors hover:border-navy dark:text-slate-400 dark:hover:text-white dark:border-white/15 dark:hover:border-white/40">{otherLang.toUpperCase()}</Link>
          <a href="https://www.linkedin.com/in/bahri-budak-052ab5b8" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-navy-light transition-colors dark:bg-[#2EA6D9] dark:text-white dark:hover:bg-[#5BBBE6]">LinkedIn</a>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><div className="w-5 h-0.5 bg-navy mb-1 dark:bg-white" /><div className="w-5 h-0.5 bg-navy mb-1 dark:bg-white" /><div className="w-5 h-0.5 bg-navy dark:bg-white" /></button>
        </div>
      </div>
      {menuOpen && <div className="md:hidden bg-white border-t border-gray-border px-6 py-4 space-y-4 dark:bg-[#061A33] dark:border-white/10">{navLinks.map(link => <Link key={link.href} href={link.href} className="block text-sm font-semibold text-navy hover:text-yellow-bb transition-colors dark:text-slate-200 dark:hover:text-[#2EA6D9]" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</div>}
    </header>
  )
}
