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
    { href: `/${lang}/magazam`, label: lang === 'tr' ? 'Şablonlar' : 'Templates' },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-border dark:bg-[#061A33]/95 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-6">
        <Link href={`/${lang}`} className="flex items-center justify-center group shrink-0 w-[9cm] h-[2.5cm] max-w-[58vw]" aria-label="Bahri Budak ana sayfa">
          <BrandLogo className="w-full h-full object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} className={`whitespace-nowrap text-[13px] xl:text-sm font-semibold transition-colors ${isActive ? 'text-navy border-b-2 border-accent-blue pb-0.5 dark:text-white' : 'text-gray-text hover:text-navy dark:text-slate-400 dark:hover:text-white'}`}>{link.label}</Link>
          })}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link href={switchedPath} className="text-xs font-bold uppercase tracking-widest text-gray-text hover:text-navy border border-gray-border rounded-full px-3 py-1.5 transition-colors hover:border-navy dark:text-slate-400 dark:hover:text-white dark:border-white/15 dark:hover:border-white/40">{otherLang.toUpperCase()}</Link>
          <a href="https://www.linkedin.com/in/bahri-budak-052ab5b8" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-navy-light transition-colors dark:bg-[#2EA6D9] dark:text-white dark:hover:bg-[#5BBBE6]">LinkedIn</a>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><div className="w-5 h-0.5 bg-navy mb-1 dark:bg-white" /><div className="w-5 h-0.5 bg-navy mb-1 dark:bg-white" /><div className="w-5 h-0.5 bg-navy dark:bg-white" /></button>
        </div>
      </div>
      {menuOpen && <div className="lg:hidden bg-white border-t border-gray-border px-6 py-4 space-y-4 dark:bg-[#061A33] dark:border-white/10">{navLinks.map(link => <Link key={link.href} href={link.href} className="block text-sm font-semibold text-navy hover:text-accent-blue transition-colors dark:text-slate-200 dark:hover:text-[#2EA6D9]" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</div>}
    </header>
  )
}
