import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'

export default function Footer({ lang }: { lang: Lang }) {
  const t = useTranslations(lang)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-yellow-bb flex items-center justify-center">
                <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700}} className="text-yellow-bb text-xl leading-none tracking-wide">BB</span>
              </div>
              <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:700}} className="text-2xl text-white">Bahri Budak</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{t('footer.tagline')}</p>
            <div className="mt-4 w-8 h-0.5 bg-yellow-bb" />
          </div>

          {/* Categories */}
          <div>
            <p className="section-label text-white/40 mb-4">
              {lang === 'tr' ? 'Kategoriler' : 'Categories'}
            </p>
            <ul className="space-y-2">
              {[
                { slug: 'kisisel-gelisim', emoji: '🧠' },
                { slug: 'felsefe', emoji: '🏛️' },
                { slug: 'tekstil', emoji: '🧵' },
                { slug: 'turkiye-gundemi', emoji: '🇹🇷' },
              ].map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/${lang}/blog?category=${cat.slug}`}
                    className="text-sm text-white/70 hover:text-yellow-bb transition-colors flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span>
                    <span>{t(`cat.${cat.slug}` as any)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="section-label text-white/40 mb-4">
              {lang === 'tr' ? 'Bağlantı' : 'Connect'}
            </p>
            <a
              href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-yellow-bb transition-colors flex items-center gap-2 mb-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              linkedin.com/in/bahri-budak-052ab5b8
            </a>

            {/* Adobe Stock */}
            <a
              href="https://stock.adobe.com/tr/contributor/203114603/bahribudak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-yellow-bb transition-colors flex items-center gap-2 mb-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              Adobe Stock Portfolyom
            </a>

            <a
              href="https://bahribudak.com"
              className="text-sm text-white/70 hover:text-yellow-bb transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
              </svg>
              bahribudak.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {year} Bahri Budak. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-4 h-0.5 bg-yellow-bb" />
            <span className="text-xs text-white/40 px-2">bahribudak.com</span>
            <div className="w-4 h-0.5 bg-yellow-bb" />
          </div>
        </div>
      </div>
    </footer>
  )
}
