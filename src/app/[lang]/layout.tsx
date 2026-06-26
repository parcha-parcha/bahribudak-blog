import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n'
import { langs } from '@/lib/i18n'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!langs.includes(lang as Lang)) return {}
  return {
    alternates: {
      canonical: `https://bahribudak.com/${lang}`,
      languages: {
        'tr': 'https://bahribudak.com/tr',
        'en': 'https://bahribudak.com/en',
      }
    }
  }
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  if (!langs.includes(lang as Lang)) notFound()

  return (
    <div lang={lang} className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-[#0B2343] px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        {lang === 'tr' ? 'Ana içeriğe geç' : 'Skip to main content'}
      </a>
      <Header lang={lang as Lang} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer lang={lang as Lang} />
    </div>
  )
}
