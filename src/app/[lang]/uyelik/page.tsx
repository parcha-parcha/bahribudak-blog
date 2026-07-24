import type { Metadata } from 'next'
import Link from 'next/link'

import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const title =
    lang === 'tr'
      ? 'Üyelik ve Teknik Dosya Erişimi'
      : 'Membership and Technical File Access'

  const description =
    lang === 'tr'
      ? 'PDF, DOCX ve PPTX teknik dosyalarına erişim modelini, ücretsiz üyelik avantajlarını ve planlanan profesyonel paketleri inceleyin.'
      : 'Review access rules for PDF, DOCX and PPTX technical files, free membership benefits and planned professional packages.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/uyelik`,
      languages: {
        tr: `${siteUrl}/tr/uyelik`,
        en: `${siteUrl}/en/uyelik`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}/uyelik`,
      title,
      description,
    },
  }
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'ÜYELİK VE ERİŞİM',
          title: 'Teknik dosyalara kontrollü ve güvenli erişim',
          summary:
            'PDF yayınları doğrudan inceleyin; düzenlenebilir DOCX ve PPTX dosyalarına ücretsiz üyelik hesabınızla erişin.',
          noticeTitle: 'Mevcut sistem',
          noticeText:
            'Ücretli üyelik ve ödeme altyapısı henüz aktif değildir. Şu anda hesap oluşturmak ücretsizdir.',
          freePlan: 'Ücretsiz Üyelik',
          freePrice: 'Ücretsiz',
          freeText:
            'Teknik yayın sistemine kayıt olun ve üyelik korumalı düzenlenebilir dosyalara erişin.',
          freeFeatures: [
            'PDF Teknik Master dosyalarına doğrudan erişim',
            'DOCX ve PPTX dosyalarına giriş sonrası erişim',
            'Masaüstü ve mobil uyumlu indirme akışı',
            'Talep edilen dosyaya giriş sonrası otomatik dönüş',
          ],
          freeButton: 'Ücretsiz Hesap Oluştur',
          loginButton: 'Zaten hesabım var',
          proPlan: 'Profesyonel Erişim',
          comingSoon: 'Yakında',
          proText:
            'Yeni yayınlar, revizyon bildirimleri, paket indirmeler ve genişletilmiş teknik kaynaklar için planlanan üyelik modeli.',
          proFeatures: [
            'Yeni yayın ve revizyon bildirimleri',
            'Toplu teknik dosya paketleri',
            'Özel kontrol listeleri ve proses formları',
            'Öncelikli teknik içerik erişimi',
          ],
          publicationsButton: 'Teknik Yayınları İncele',
          accessTitle: 'Dosya erişim modeli',
          pdfTitle: 'PDF Teknik Master',
          pdfText:
            'Makale sayfasından doğrudan açılır veya indirilir. Üyelik gerekmez.',
          editableTitle: 'DOCX ve PPTX',
          editableText:
            'Düzenlenebilir dosyalardır. İndirme öncesinde ücretsiz hesap girişi gerekir.',
          returnTitle: 'Otomatik yönlendirme',
          returnText:
            'Giriş tamamlandığında kullanıcı talep ettiği dosyaya otomatik olarak geri döner.',
          faqTitle: 'Sık Sorulan Sorular',
          faqs: [
            {
              q: 'Üyelik ücretli mi?',
              a: 'Hayır. Mevcut ücretsiz üyelik sistemi için ödeme alınmamaktadır.',
            },
            {
              q: 'PDF dosyaları için hesap gerekli mi?',
              a: 'Hayır. PDF Teknik Master dosyaları doğrudan açılır veya indirilir.',
            },
            {
              q: 'DOCX ve PPTX dosyaları neden üyelikli?',
              a: 'Düzenlenebilir teknik dosyaların kontrollü dağıtımı ve erişim güvenliği için kullanıcı girişi uygulanır.',
            },
            {
              q: 'Ücretli paketler ne zaman başlayacak?',
              a: 'Fiyatlandırma ve ödeme altyapısı tamamlandığında bu sayfada ayrıca duyurulacaktır.',
            },
          ],
        }
      : {
          eyebrow: 'MEMBERSHIP AND ACCESS',
          title: 'Controlled and secure access to technical files',
          summary:
            'Review PDF publications directly and access editable DOCX and PPTX files through a free membership account.',
          noticeTitle: 'Current system',
          noticeText:
            'Paid membership and payment infrastructure are not active yet. Account registration is currently free.',
          freePlan: 'Free Membership',
          freePrice: 'Free',
          freeText:
            'Register for the technical publication system and access protected editable files.',
          freeFeatures: [
            'Direct access to PDF Technical Master files',
            'Access to DOCX and PPTX files after sign-in',
            'Desktop and mobile compatible download flow',
            'Automatic return to the requested file after sign-in',
          ],
          freeButton: 'Create Free Account',
          loginButton: 'I already have an account',
          proPlan: 'Professional Access',
          comingSoon: 'Coming Soon',
          proText:
            'A planned membership model for new publications, revision alerts, package downloads and expanded technical resources.',
          proFeatures: [
            'New publication and revision alerts',
            'Bundled technical file downloads',
            'Special checklists and process forms',
            'Priority technical content access',
          ],
          publicationsButton: 'Browse Technical Publications',
          accessTitle: 'File access model',
          pdfTitle: 'PDF Technical Master',
          pdfText:
            'Opens or downloads directly from the publication page. No membership is required.',
          editableTitle: 'DOCX and PPTX',
          editableText:
            'Editable files require a free account sign-in before download.',
          returnTitle: 'Automatic redirect',
          returnText:
            'After sign-in, the user automatically returns to the requested file.',
          faqTitle: 'Frequently Asked Questions',
          faqs: [
            {
              q: 'Is membership paid?',
              a: 'No. The current membership system is free and no payment is collected.',
            },
            {
              q: 'Do PDF files require an account?',
              a: 'No. PDF Technical Master files open or download directly.',
            },
            {
              q: 'Why are DOCX and PPTX files protected?',
              a: 'User sign-in supports controlled distribution and access security for editable technical files.',
            },
            {
              q: 'When will paid packages launch?',
              a: 'Pricing will be announced on this page after the payment infrastructure is completed.',
            },
          ],
        }

  const registerHref = lang === 'tr' ? '/tr/kayit' : '/en/register'
  const loginHref = lang === 'tr' ? '/tr/giris' : '/en/login'
  const publicationsHref = `/${lang}/blog`

  return (
    <main className="min-h-screen bg-[#F3F6FA] text-[#0B2343]">
      <section className="border-b border-[#D8DEE8] bg-[#071E3A] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65C6EA]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#DCE8F5]">
            {copy.summary}
          </p>

          <div className="mt-8 max-w-3xl rounded-[1.5rem] border border-[#65C6EA]/35 bg-white/5 p-5">
            <p className="font-black text-white">
              {copy.noticeTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#DCE8F5]">
              {copy.noticeText}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="grid gap-7 lg:grid-cols-2">
          <article className="flex flex-col rounded-[2rem] border border-[#B9DFF0] bg-white p-7 shadow-[0_20px_55px_rgba(11,35,67,0.08)] md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2A8EB8]">
                  {copy.freePlan}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {copy.freePrice}
                </h2>
              </div>

              <span className="rounded-full bg-[#EAF6FC] px-4 py-2 text-xs font-black text-[#075A7D]">
                {copy.noticeTitle}
              </span>
            </div>

            <p className="mt-5 leading-7 text-[#4C5561]">
              {copy.freeText}
            </p>

            <ul className="mt-7 space-y-3">
              {copy.freeFeatures.map(feature => (
                <Feature key={feature}>{feature}</Feature>
              ))}
            </ul>

            <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
              <Link
                href={registerHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B2343] px-5 text-center text-sm font-black text-white transition hover:bg-[#163A64]"
              >
                {copy.freeButton}
              </Link>

              <Link
                href={loginHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9D1DC] bg-white px-5 text-center text-sm font-black text-[#0B2343] transition hover:border-[#0B2343]"
              >
                {copy.loginButton}
              </Link>
            </div>
          </article>

          <article className="flex flex-col rounded-[2rem] border border-[#D8DEE8] bg-[#F8FAFC] p-7 md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66717E]">
                  {copy.proPlan}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {copy.comingSoon}
                </h2>
              </div>

              <span className="rounded-full border border-[#D8DEE8] bg-white px-4 py-2 text-xs font-black text-[#66717E]">
                {copy.comingSoon}
              </span>
            </div>

            <p className="mt-5 leading-7 text-[#4C5561]">
              {copy.proText}
            </p>

            <ul className="mt-7 space-y-3">
              {copy.proFeatures.map(feature => (
                <Feature key={feature} muted>
                  {feature}
                </Feature>
              ))}
            </ul>

            <Link
              href={publicationsHref}
              className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full border border-[#0B2343] px-5 pt-3 text-center text-sm font-black text-[#0B2343] transition hover:bg-[#0B2343] hover:text-white"
            >
              {copy.publicationsButton}
            </Link>
          </article>
        </div>
      </section>

      <section className="border-y border-[#D8DEE8] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-3xl font-black tracking-[-0.035em] md:text-4xl">
            {copy.accessTitle}
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <AccessCard title={copy.pdfTitle} text={copy.pdfText} />
            <AccessCard
              title={copy.editableTitle}
              text={copy.editableText}
            />
            <AccessCard
              title={copy.returnTitle}
              text={copy.returnText}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:py-18">
        <h2 className="text-center text-3xl font-black tracking-[-0.035em] md:text-4xl">
          {copy.faqTitle}
        </h2>

        <div className="mt-8 space-y-4">
          {copy.faqs.map(item => (
            <details
              key={item.q}
              className="group rounded-[1.4rem] border border-[#D8DEE8] bg-white px-6 py-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none pr-8 font-black text-[#0B2343]">
                {item.q}
              </summary>
              <p className="mt-3 leading-7 text-[#4C5561]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}

function Feature({
  children,
  muted = false,
}: {
  children: string
  muted?: boolean
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
          muted
            ? 'bg-[#E8EDF3] text-[#66717E]'
            : 'bg-[#2EA6D9] text-white'
        }`}
        aria-hidden="true"
      >
        ✓
      </span>
      <span className="text-sm font-semibold leading-6 text-[#344152]">
        {children}
      </span>
    </li>
  )
}

function AccessCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <article className="rounded-[1.5rem] border border-[#D8DEE8] bg-[#F7F9FC] p-6">
      <h3 className="text-lg font-black text-[#0B2343]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#4C5561]">
        {text}
      </p>
    </article>
  )
}
