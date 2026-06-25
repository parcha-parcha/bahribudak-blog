import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { isLang, type Lang } from '@/lib/i18n'

interface ContactProps {
  params: Promise<{ lang: string }>
}

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: ContactProps): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'
  const title = lang === 'tr' ? 'İletişim' : 'Contact'
  const description =
    lang === 'tr'
      ? 'Örgü, boya, apre, laboratuvar, kalite ve teknik dokümantasyon çalışmaları için Bahri Budak ile iletişime geçin.'
      : 'Contact Bahri Budak for knitting, dyeing, finishing, laboratory, quality and technical documentation work.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/contact`,
      languages: {
        tr: `${siteUrl}/tr/contact`,
        en: `${siteUrl}/en/contact`,
      },
    },
  }
}

export default async function ContactPage({ params }: ContactProps) {
  const { lang: rawLang } = await params
  const lang: Lang = isLang(rawLang) ? rawLang : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'İLETİŞİM',
          title: 'Teknik çalışma kapsamını birlikte netleştirelim.',
          summary:
            'Örgü / Knitting, Boya / Dyeing, Apre / Finishing, laboratuvar, kalite kontrol veya teknik dokümantasyon ihtiyacınızı aşağıdaki kanallardan iletebilirsiniz.',
          email: 'E-posta',
          location: 'Konum',
          back: 'Ana sayfaya dön',
        }
      : {
          eyebrow: 'CONTACT',
          title: 'Let us define the technical work scope together.',
          summary:
            'You can contact me regarding Knitting, Dyeing, Finishing, laboratory, quality control or technical documentation requirements.',
          email: 'Email',
          location: 'Location',
          back: 'Back to home',
        }

  return (
    <main className="bb-readable-page min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <div className="mx-auto max-w-2xl px-6 py-14 md:py-16">
        <header className="mb-10">
          <p className="section-label">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-navy md:text-5xl">{copy.title}</h1>
          <div className="mt-6 h-1 w-16 bg-yellow-bb" />
          <p className="mt-6 leading-relaxed text-[#263B57]">{copy.summary}</p>
        </header>

        <div className="mb-6 space-y-4">
          <a
            href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-xl border border-gray-border bg-white p-5 transition-all hover:border-navy hover:shadow-card"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-text">LinkedIn</p>
              <p className="font-semibold text-navy group-hover:text-navy-light">linkedin.com/in/bahri-budak-052ab5b8</p>
            </div>
          </a>

          <a
            href="mailto:bahribudak@gmail.com"
            className="group flex items-center gap-5 rounded-xl border border-gray-border bg-white p-5 transition-all hover:border-navy hover:shadow-card"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-bb">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2343" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-text">{copy.email}</p>
              <p className="font-semibold text-navy group-hover:text-navy-light">bahribudak@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-5 rounded-xl border border-gray-border bg-white p-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-border bg-gray-soft">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2343" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-text">{copy.location}</p>
              <p className="font-semibold text-navy">Çorlu, Tekirdağ / Türkiye</p>
            </div>
          </div>
        </div>

        <ContactForm lang={lang} />

        <div className="mt-10">
          <Link href={`/${lang}`} className="text-sm font-bold text-navy hover:text-[#2EA6D9]">
            ← {copy.back}
          </Link>
        </div>
      </div>
    </main>
  )
}
