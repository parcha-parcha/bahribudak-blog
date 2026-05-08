import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n'
import { langs } from '@/lib/i18n'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: Lang }>
}

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params
  if (!langs.includes(lang)) return {}
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
  if (!langs.includes(lang)) notFound()

  return (
    <div lang={lang} className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
