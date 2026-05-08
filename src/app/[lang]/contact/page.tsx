import type { Lang } from '@/lib/i18n'
import Link from 'next/link'

interface ContactProps {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: ContactProps) {
  const { lang } = await params

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="section-label">{lang === 'tr' ? 'İletişim' : 'Contact'}</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          {lang === 'tr' ? 'Bağlantı Kuralım' : 'Let\'s Connect'}
        </h1>
        <div className="w-12 h-1 bg-yellow-bb" />
      </div>

      <div className="space-y-6 text-navy/80 leading-relaxed mb-12">
        <p>
          {lang === 'tr'
            ? 'Tekstil sektörü, kişisel gelişim veya felsefe üzerine düşüncelerinizi paylaşmak ister misiniz? LinkedIn üzerinden bağlantı kurmaktan memnuniyet duyarım.'
            : 'Would you like to share your thoughts on the textile industry, personal development, or philosophy? I\'d be happy to connect on LinkedIn.'}
        </p>
      </div>

      <a
        href="https://linkedin.com/in/bahribudak"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>

      <div className="mt-10">
        <Link href={`/${lang}`} className="text-sm font-bold text-navy">
          ← {lang === 'tr' ? 'Ana sayfaya dön' : 'Back to home'}
        </Link>
      </div>
    </div>
  )
}
