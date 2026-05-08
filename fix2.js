const fs = require('fs')
const p = "src/app/[lang]/layout.tsx"
let c = fs.readFileSync(p, 'utf8')

c = c.replace(
  "params: Promise<{ lang: string }>",
  "params: Promise<{ lang: Lang }>"
)
c = c.replace(
  "export async function generateMetadata({ params }: { params: Promise<{ lang: string }> })",
  "export async function generateMetadata({ params }: { params: Promise<{ lang: string }> })"
)

// Full rewrite of the file
fs.writeFileSync(p, `import type { Metadata } from 'next'
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
      canonical: \`https://bahribudak.com/\${lang}\`,
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
      <Header lang={lang as Lang} />
      <main className="flex-1">
        {children}
      </main>
      <Footer lang={lang as Lang} />
    </div>
  )
}
`)
console.log('✓ layout.tsx fixed')
