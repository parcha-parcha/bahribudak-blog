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
          {lang === 'tr' ? 'Bağlantı Kuralım' : "Let's Connect"}
        </h1>
        <div className="w-12 h-1 bg-yellow-bb" />
      </div>

      <p className="text-navy/80 leading-relaxed mb-10">
        {lang === 'tr'
          ? 'Tekstil sektörü, kişisel gelişim veya felsefe üzerine düşüncelerinizi paylaşmak ister misiniz? Aşağıdaki kanallardan ulaşabilirsiniz.'
          : 'Would you like to share your thoughts on the textile industry, personal development, or philosophy? You can reach me through the channels below.'}
      </p>

      {/* Contact cards */}
      <div className="space-y-4 mb-12">

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/bahribudak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 p-5 bg-white border border-gray-border rounded-xl hover:border-navy hover:shadow-card transition-all group"
        >
          <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-text mb-1">LinkedIn</p>
            <p className="font-semibold text-navy group-hover:text-navy-light">linkedin.com/in/bahribudak</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:bahri.budak@gmail.com"
          className="flex items-center gap-5 p-5 bg-white border border-gray-border rounded-xl hover:border-navy hover:shadow-card transition-all group"
        >
          <div className="w-12 h-12 bg-yellow-bb rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1a3a" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-text mb-1">
              {lang === 'tr' ? 'E-posta' : 'Email'}
            </p>
            <p className="font-semibold text-navy group-hover:text-navy-light">bahri.budak@gmail.com</p>
          </div>
        </a>

        {/* Location */}
        <div className="flex items-center gap-5 p-5 bg-white border border-gray-border rounded-xl">
          <div className="w-12 h-12 bg-gray-soft border border-gray-border rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1a3a" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-text mb-1">
              {lang === 'tr' ? 'Konum' : 'Location'}
            </p>
            <p className="font-semibold text-navy">Çorlu, Tekirdağ / Türkiye</p>
          </div>
        </div>

      </div>

      <div className="mt-10">
        <Link href={`/${lang}`} className="text-sm font-bold text-navy">
          ← {lang === 'tr' ? 'Ana sayfaya dön' : 'Back to home'}
        </Link>
      </div>
    </div>
  )
}
