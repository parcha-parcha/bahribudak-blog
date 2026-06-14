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
    <header
      className="sticky top-0 z-50 relative overflow-hidden border-b border-[#D7E0EA] dark:border-white/10"
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.88) 45%, rgba(243,246,250,0.82) 100%), url('/images/header-su-dalga.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 43%',
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#2EA6D9] via-[#0B2343] to-transparent opacity-80" />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-6 relative">
        <Link href={`/${lang}`} className="flex items-center justify-center group shrink-0 w-[9cm] h-[2.5cm] max-w-[58vw]" aria-label="Bahri Budak ana sayfa">
          <BrandLogo className="w-full h-full object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md px-3 py-2">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] xl:text-sm font-semibold transition-colors ${isActive ? 'bg-navy text-white shadow-sm' : 'text-navy/80 hover:bg-[#F3F6FA] hover:text-navy'}`}>{link.label}</Link>
          })}
        </nav>
        <div className="flex items-center gap-3 shrink-0 rounded-full bg-white/75 border border-white/80 shadow-sm backdrop-blur-md px-2 py-1.5">
          <ThemeToggle />
          <Link href={switchedPath} className="text-xs font-bold uppercase tracking-widest text-navy/75 hover:text-navy border border-[#D7E0EA] rounded-full px-3 py-1.5 transition-colors hover:border-navy bg-white/70">{otherLang.toUpperCase()}</Link>
          <a href="https://www.linkedin.com/in/bahri-budak-052ab5b8" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-navy-light transition-colors">LinkedIn</a>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><div className="w-5 h-0.5 bg-navy mb-1" /><div className="w-5 h-0.5 bg-navy mb-1" /><div className="w-5 h-0.5 bg-navy" /></button>
        </div>
      </div>
      {menuOpen && <div className="lg:hidden relative bg-white/95 backdrop-blur-md border-t border-[#D7E0EA] px-6 py-4 space-y-4">{navLinks.map(link => <Link key={link.href} href={link.href} className="block text-sm font-semibold text-navy hover:text-accent-blue transition-colors" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}</div>}
    </header>
  )
}
