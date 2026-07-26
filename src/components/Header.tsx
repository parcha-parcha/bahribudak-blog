'use client'

import BBHeaderSocialLinks from '@/components/BBHeaderSocialLinks'
import BrandLogo from '@/components/BrandLogo'
import SearchButton from '@/components/SearchButton'
import AuthStatusLink from '@/components/auth/AuthStatusLink'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import { getTranslatedPath } from '@/lib/translatedRoutes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface HeaderProps {
  lang: Lang
}

type NavItem = {
  href: string
  label: string
}

function isPathActive(pathname: string, href: string, homePath: string) {
  if (href === homePath) return pathname === homePath

  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header({ lang }: HeaderProps) {
  const t = useTranslations(lang)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const homePath = `/${lang}`
  const otherLang = lang === 'tr' ? 'en' : 'tr'
  const switchedPath = getTranslatedPath(pathname, lang, otherLang)
  const mobileMenuId = 'primary-mobile-navigation'

  const navLinks: NavItem[] = [
    {
      href: homePath,
      label: t('nav.home'),
    },
    {
      href: `/${lang}/uzmanlik`,
      label:
        lang === 'tr'
          ? 'Örgü Kumaş · Boya · Apre'
          : 'Knitted Fabric · Dyeing · Finishing',
    },
    {
      href: `/${lang}/blog`,
      label:
        lang === 'tr'
          ? 'Teknik Yayınlar'
          : 'Technical Publications',
    },
    {
      href: `/${lang}/sablonlar/tekstil-teknik-dokumanlari`,
      label:
        lang === 'tr'
          ? 'Ücretsiz Kaynaklar'
          : 'Free Resources',
    },
    {
      href: `/${lang}/uyelik`,
      label:
        lang === 'tr'
          ? 'Ücretsiz Üyelik'
          : 'Free Membership',
    },
    {
      href: `/${lang}/about`,
      label: t('nav.about'),
    },
    {
      href: `/${lang}/contact`,
      label: t('nav.contact'),
    },
  ]

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E2DA] bg-white/95 shadow-[0_8px_30px_rgba(17,19,21,0.06)] backdrop-blur-xl">
      <div className="h-[3px] bg-[#E45A2B]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link
          href={homePath}
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
          aria-label={
            lang === 'tr'
              ? 'Bahri Budak ana sayfa'
              : 'Bahri Budak home page'
          }
        >
          <span className="flex h-[56px] w-[156px] items-center justify-start bg-transparent">
            <BrandLogo
              variant="full"
              className="h-[52px] w-auto object-contain object-left"
              priority
            />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 border border-[#E5E2DA] bg-white px-2 py-1.5 xl:flex"
          aria-label={
            lang === 'tr'
              ? 'Ana navigasyon'
              : 'Primary navigation'
          }
        >
          {navLinks.map((link) => {
            const active = isPathActive(
              pathname,
              link.href,
              homePath,
            )

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-1 ${
                  active
                    ? 'bg-[#111315] text-white shadow-sm'
                    : 'text-[#111315]/82 hover:bg-white hover:text-[#111315]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <SearchButton lang={lang} />

          <AuthStatusLink
            lang={lang}
            className="hidden min-h-10 items-center rounded-md bg-[#111315] px-4 text-xs font-bold text-white transition-colors hover:bg-[#1A1F24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 sm:inline-flex"
          />

          <Link
            href={switchedPath}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-[#E5E2DA] bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#111315] transition-colors hover:border-[#E45A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
            aria-label={
              otherLang === 'en'
                ? 'Switch to English'
                : 'Türkçeye geç'
            }
          >
            {otherLang === 'en' ? 'EN' : 'TR'}
          </Link>

          <div className="hidden md:flex">
            <BBHeaderSocialLinks />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E2DA] bg-white text-[#111315] transition-colors hover:border-[#E45A2B] hover:bg-[#F6F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 xl:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={
              menuOpen
                ? lang === 'tr'
                  ? 'Menüyü kapat'
                  : 'Close menu'
                : lang === 'tr'
                  ? 'Menüyü aç'
                  : 'Open menu'
            }
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            <span className="relative block h-5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-[3px] block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen
                    ? 'translate-y-[7px] rotate-45'
                    : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-[17px] block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  menuOpen
                    ? '-translate-y-[7px] -rotate-45'
                    : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[87px] z-40 bg-[#111315]/30 backdrop-blur-[2px] xl:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label={
              lang === 'tr'
                ? 'Menüyü kapat'
                : 'Close menu'
            }
            tabIndex={-1}
          />

          <div
            id={mobileMenuId}
            className="relative z-50 border-t border-[#E5E2DA] bg-white px-4 py-4 shadow-[0_18px_45px_rgba(17,19,21,0.14)] xl:hidden"
          >
            <nav
              className="mx-auto max-w-7xl"
              aria-label={
                lang === 'tr'
                  ? 'Mobil navigasyon'
                  : 'Mobile navigation'
              }
            >
              <div className="grid gap-1 md:grid-cols-2">
                {navLinks.map((link) => {
                  const active = isPathActive(
                    pathname,
                    link.href,
                    homePath,
                  )

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-12 items-center justify-between rounded-md px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-inset ${
                        active
                          ? 'bg-[#111315] text-white'
                          : 'text-[#111315] hover:bg-[#F8E4DC]'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span
                        className={`text-base ${
                          active
                            ? 'text-[#F09A7C]'
                            : 'text-[#E45A2B]'
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  )
                })}
                <AuthStatusLink
                  lang={lang}
                  className="flex min-h-12 items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-[#111315] transition-colors hover:bg-[#F8E4DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-inset"
                  onClick={() => setMenuOpen(false)}
                  showArrow
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#E5E2DA] pt-4 md:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#111315]/50">
                  {lang === 'tr'
                    ? 'Sosyal bağlantılar'
                    : 'Social links'}
                </p>

                <BBHeaderSocialLinks />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
