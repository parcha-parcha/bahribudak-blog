import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

interface AboutProps {
  params: Promise<{ lang: string }>
}

export default async function AboutPage({ params }: AboutProps) {
  const { lang } = await params
  const t = useTranslations(lang as Lang)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="section-label">{t('about.title')}</p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          {lang === 'tr' ? 'Merhaba, ben Bahri Budak.' : 'Hello, I\'m Bahri Budak.'}
        </h1>
        <div className="w-12 h-1 bg-yellow-bb" />
      </div>

      {/* BB monogram */}
      <div className="flex items-center gap-6 mb-12 p-8 bg-navy rounded-xl">
        <div className="w-20 h-20 rounded-full border-2 border-yellow-bb flex items-center justify-center flex-shrink-0">
          <span className="font-['Great_Vibes'] text-yellow-bb text-3xl leading-none">BB</span>
        </div>
        <div>
          <p className="font-bold text-white text-xl mb-1">Bahri Budak</p>
          <p className="text-white/60 text-sm">
            {lang === 'tr'
              ? 'Tekstil Fabrikası Yöneticisi · İçerik Üreticisi'
              : 'Textile Factory Manager · Content Creator'}
          </p>
          <a
            href="https://linkedin.com/in/bahribudak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-bb text-sm font-bold mt-2 inline-block hover:underline"
          >
            linkedin.com/in/bahribudak →
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="prose-bb space-y-6">
        {lang === 'tr' ? (
          <>
            <p>
              Tekstil fabrikası yöneticisiyim. İşimin içinde büyüdüm — her vardiyada hem üretim hem insan yönettim. Makinelerin dili kadar insanların dilini de anlamak zorunda kaldım. Bu zorunluluk, zamanla bir merak haline geldi.
            </p>
            <p>
              Felsefe, kişisel gelişim ve sektör analizini birleştirdiğim bu blog; o merakın somutlaştığı yerdir. Her yazı bir sorudan doğar. Her soru, fabrika zemininde geçirilen yıllara dayanır.
            </p>
            <p>
              Yazılarımda dört temel alan var: <strong>Kişisel Gelişim</strong>, <strong>Felsefe</strong>, <strong>Tekstil</strong> ve <strong>Türkiye Gündemi</strong>. Bu dört alan ayrı görünse de aslında tek bir bakış açısının farklı yüzleridir — pratikle teorinin, sahadan düşüncenin buluşması.
            </p>
          </>
        ) : (
          <>
            <p>
              I am a textile factory manager. I grew up inside the industry — managing both production and people through every shift. I had to understand the language of machines as well as the language of people. That necessity, over time, became curiosity.
            </p>
            <p>
              This blog, where I combine philosophy, personal development, and industry analysis, is where that curiosity takes shape. Every post starts with a question. Every question is rooted in years spent on the factory floor.
            </p>
            <p>
              My writing covers four core areas: <strong>Personal Growth</strong>, <strong>Philosophy</strong>, <strong>Textile</strong>, and <strong>Turkey Today</strong>. These may look separate, but they are different faces of a single perspective — where practice meets theory, where the floor meets thought.
            </p>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 pt-8 border-t border-gray-border flex gap-4">
        <Link href={`/${lang}/blog`} className="btn-primary">
          {lang === 'tr' ? 'Yazıları Oku' : 'Read Posts'}
        </Link>
        <a
          href="https://linkedin.com/in/bahribudak"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
