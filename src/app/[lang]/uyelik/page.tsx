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
    lang === 'tr' ? 'Ücretsiz Teknik Üyelik' : 'Free Technical Membership'
  const description =
    lang === 'tr'
      ? 'Ücretsiz üye olun; teknik yayınlara, kontrol listelerine, proses formlarına ve indirilebilir dosyalara erişin.'
      : 'Create a free account to access technical publications, checklists, process forms and downloadable files.'

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
  }
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const tr = lang === 'tr'
  const registerHref = tr ? '/tr/kayit' : '/en/register'
  const loginHref = tr ? '/tr/giris' : '/en/login'
  const resourcesHref = `/${lang}/sablonlar/tekstil-teknik-dokumanlari`
  const contactHref = `/${lang}/contact`

  const copy = tr
    ? {
        eyebrow: 'ÜCRETSİZ TEKNİK ÜYELİK',
        title: 'Tüm teknik kaynaklara tek ve ücretsiz hesapla erişin.',
        summary:
          'Üyelik ve indirmeler ücretsizdir. Amaç; sahada karşılığı olan teknik bilgiyi daha fazla sektör profesyoneline ulaştırmak ve gerçek problemlerde doğrudan destek sunmaktır.',
        primary: 'Ücretsiz Üye Ol',
        login: 'Zaten Hesabım Var',
        resources: 'Ücretsiz Kaynakları İncele',
        support: 'Teknik Destek Talep Et',
        benefits: [
          [
            '01',
            'Tüm dosya türleri',
            'PDF, DOCX, XLSX ve PPTX dosyalarının tamamına üyelikle ücretsiz erişim.',
          ],
          [
            '02',
            'Saha odaklı içerik',
            'Gerçek problemi, nedenlerini, kontrol noktalarını ve uygulanabilir çözümü birlikte ele alan yayınlar.',
          ],
          [
            '03',
            'İndirme geçmişi',
            'Daha önce indirdiğiniz dosyalara hesabınız üzerinden yeniden erişim.',
          ],
          [
            '04',
            'Doğrudan destek',
            'İçerikteki problemi işletmenizde yaşıyorsanız teknik değerlendirme talebi oluşturma.',
          ],
        ],
        principle:
          'Tüm teknik kaynaklar ücretsiz üyelik kapsamında sunulur.',
      }
    : {
        eyebrow: 'FREE TECHNICAL MEMBERSHIP',
        title: 'Access all technical resources with one free account.',
        summary:
          'Membership and downloads are free. The objective is to deliver field-relevant technical knowledge to more industry professionals and support real operating problems directly.',
        primary: 'Create Free Account',
        login: 'I Already Have an Account',
        resources: 'Browse Free Resources',
        support: 'Request Technical Support',
        benefits: [
          [
            '01',
            'All file types',
            'Free member access to PDF, DOCX, XLSX and PPTX files.',
          ],
          [
            '02',
            'Field-focused content',
            'Publications that connect the real problem, causes, control points and applicable solution.',
          ],
          [
            '03',
            'Download history',
            'Return to files you previously downloaded through your account.',
          ],
          [
            '04',
            'Direct support',
            'Request a technical review when the same problem exists in your operation.',
          ],
        ],
        principle:
          'All technical resources are provided through free membership.',
      }

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 text-[#111315] md:px-6 md:py-16">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[14px] bg-[#111315] p-7 text-[#F6F4EF] md:p-12">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E45A2B]">
          {copy.eyebrow}
        </p>

        <div className="mt-5 h-[3px] w-16 bg-[#E45A2B]" aria-hidden="true" />

        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#F6F4EF] md:text-6xl">
          {copy.title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-[#E5E2DA] md:text-lg">
          {copy.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={registerHref}
            className="rounded-md bg-[#E45A2B] px-6 py-3 font-bold text-[#F6F4EF] transition hover:bg-[#C94B20]"
          >
            {copy.primary} →
          </Link>

          <Link
            href={loginHref}
            className="rounded-md border border-[#F6F4EF]/30 px-6 py-3 font-bold text-[#F6F4EF] transition hover:bg-[#F6F4EF] hover:text-[#111315]"
          >
            {copy.login}
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2">
        {copy.benefits.map(([no, title, text]) => (
          <article
            key={no}
            className="rounded-[14px] border border-[#E5E2DA] bg-white p-7"
          >
            <span className="text-sm font-black tracking-[0.18em] text-[#E45A2B]">
              {no}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-[#111315]">
              {title}
            </h2>
            <p className="mt-3 leading-7 text-[#6F7782]">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-6xl rounded-[14px] border border-[#E5E2DA] bg-[#E5E2DA] p-7 md:p-9">
        <p className="text-lg font-bold leading-8 text-[#111315]">
          {copy.principle}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={resourcesHref}
            className="rounded-md bg-[#111315] px-6 py-3 font-bold text-[#F6F4EF] transition hover:bg-[#1A1F24]"
          >
            {copy.resources} →
          </Link>

          <Link
            href={contactHref}
            className="rounded-md border border-[#111315] px-6 py-3 font-bold text-[#111315] transition hover:bg-[#111315] hover:text-[#F6F4EF]"
          >
            {copy.support} →
          </Link>
        </div>
      </section>
    </main>
  )
}
