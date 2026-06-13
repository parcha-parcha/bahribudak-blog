import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import BrandLogo from '@/components/BrandLogo'

export default function Footer({ lang }: { lang: Lang }) {
  const t = useTranslations(lang)
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white bb-pattern">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div><div className="mb-5 rounded-2xl bg-white/95 p-4 inline-block"><BrandLogo className="h-14 w-[225px]" /></div><p className="text-sm text-white/65 leading-relaxed">{t('footer.tagline')}</p><div className="mt-5 w-10 h-0.5 bg-accent-blue" /></div>
          <div><p className="section-label text-white/45 mb-4">{lang === 'tr' ? 'Kategoriler' : 'Categories'}</p><ul className="space-y-2">{[{ slug: 'kisisel-gelisim', emoji: '🧠' },{ slug: 'felsefe', emoji: '🏛️' },{ slug: 'tekstil', emoji: '🧵' },{ slug: 'turkiye-gundemi', emoji: '🇹🇷' }].map(cat => <li key={cat.slug}><Link href={`/${lang}/blog?category=${cat.slug}`} className="text-sm text-white/70 hover:text-accent-blue transition-colors flex items-center gap-2"><span>{cat.emoji}</span><span>{t(`cat.${cat.slug}` as any)}</span></Link></li>)}</ul></div>
          <div><p className="section-label text-white/45 mb-4">{lang === 'tr' ? 'Bağlantı' : 'Connect'}</p><a href="https://www.linkedin.com/in/bahri-budak-052ab5b8" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-accent-blue transition-colors flex items-center gap-2 mb-3">LinkedIn · linkedin.com/in/bahri-budak-052ab5b8</a><a href="https://stock.adobe.com/tr/contributor/203114603/bahribudak" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-accent-blue transition-colors flex items-center gap-2 mb-3">Adobe Stock Portfolyom</a><a href="https://bahribudak.com" className="text-sm text-white/70 hover:text-accent-blue transition-colors flex items-center gap-2">bahribudak.com</a></div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"><p className="text-xs text-white/45">© {year} Bahri Budak. {t('footer.rights')}</p><div className="flex items-center gap-1"><div className="w-4 h-0.5 bg-accent-blue" /><span className="text-xs text-white/45 px-2">bahribudak.com</span><div className="w-4 h-0.5 bg-accent-blue" /></div></div>
      </div>
    </footer>
  )
}
