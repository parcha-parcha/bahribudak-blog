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


export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  if (!langs.includes(lang as Lang)) notFound()

  return (
    <div lang={lang} className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-[#111315] px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2"
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
