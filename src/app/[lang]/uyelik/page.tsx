import type { Metadata } from 'next'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const title = lang === 'tr' ? 'Ücretsiz Teknik Üyelik' : 'Free Technical Membership'
  const description = lang === 'tr'
    ? 'Ücretsiz üye olun; teknik yayınlara, kontrol listelerine, proses formlarına ve indirilebilir dosyalara erişin.'
    : 'Create a free account to access technical publications, checklists, process forms and downloadable files.'

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/uyelik`,
      languages: { tr: `${siteUrl}/tr/uyelik`, en: `${siteUrl}/en/uyelik` },
    },
  }
}

export default async function MembershipPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang: Lang = rawLang === 'en' ? 'en' : 'tr'
  const tr = lang === 'tr'
  const registerHref = tr ? '/tr/kayit' : '/en/register'
  const loginHref = tr ? '/tr/giris' : '/en/login'
  const resourcesHref = `/${lang}/sablonlar/tekstil-teknik-dokumanlari`
  const contactHref = `/${lang}/contact`

  const copy = tr ? {
    eyebrow: 'ÜCRETSİZ TEKNİK ÜYELİK',
    title: 'Tüm teknik kaynaklara tek ve ücretsiz hesapla erişin.',
    summary: 'Üyelik ve indirmeler ücretsizdir. Amaç; sahada karşılığı olan teknik bilgiyi daha fazla sektör profesyoneline ulaştırmak ve gerçek problemlerde doğrudan destek sunmaktır.',
    primary: 'Ücretsiz Üye Ol',
    login: 'Zaten Hesabım Var',
    resources: 'Ücretsiz Kaynakları İncele',
    support: 'Teknik Destek Talep Et',
    benefits: [
      ['01', 'Tüm dosya türleri', 'PDF, DOCX, XLSX ve PPTX dosyalarının tamamına üyelikle ücretsiz erişim.'],
      ['02', 'Saha odaklı içerik', 'Gerçek problemi, nedenlerini, kontrol noktalarını ve uygulanabilir çözümü birlikte ele alan yayınlar.'],
      ['03', 'İndirme geçmişi', 'Daha önce indirdiğiniz dosyalara hesabınız üzerinden yeniden erişim.'],
      ['04', 'Doğrudan destek', 'İçerikteki problemi işletmenizde yaşıyorsanız teknik değerlendirme talebi oluşturma.'],
    ],
    principle: 'Tüm teknik kaynaklar ücretsiz üyelik kapsamında sunulur.',
  } : {
    eyebrow: 'FREE TECHNICAL MEMBERSHIP',
    title: 'Access all technical resources with one free account.',
    summary: 'Membership and downloads are free. The objective is to deliver field-relevant technical knowledge to more industry professionals and support real operating problems directly.',
    primary: 'Create Free Account',
    login: 'I Already Have an Account',
    resources: 'Browse Free Resources',
    support: 'Request Technical Support',
    benefits: [
      ['01', 'All file types', 'Free member access to PDF, DOCX, XLSX and PPTX files.'],
      ['02', 'Field-focused content', 'Publications that connect the real problem, causes, control points and applicable solution.'],
      ['03', 'Download history', 'Return to files you previously downloaded through your account.'],
      ['04', 'Direct support', 'Request a technical review when the same problem exists in your operation.'],
    ],
    principle: 'All technical resources are provided through free membership.',
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-16">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-[#071E3A] p-7 text-white shadow-[0_28px_80px_rgba(11,35,67,0.16)] md:p-12">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65C6EA]">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-white md:text-6xl">{copy.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg">{copy.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={registerHref} className="rounded-full bg-[#2EA6D9] px-6 py-3 font-bold text-[#071E3A] transition hover:bg-[#65C6EA]">{copy.primary} →</Link>
          <Link href={loginHref} className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#071E3A]">{copy.login}</Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2">
        {copy.benefits.map(([no, title, text]) => (
          <article key={no} className="rounded-[2rem] border border-[#D8E0E8] bg-white p-7 shadow-sm">
            <span className="text-sm font-black tracking-[0.18em] text-[#2EA6D9]">{no}</span>
            <h2 className="mt-4 text-2xl font-bold text-[#0B2343]">{title}</h2>
            <p className="mt-3 leading-7 text-[#0B2343]/65">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-6xl rounded-[2rem] border border-[#BFE4F4] bg-[#EAF6FC] p-7 md:p-9">
        <p className="text-lg font-bold leading-8 text-[#0B2343]">{copy.principle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={resourcesHref} className="rounded-full bg-[#0B2343] px-6 py-3 font-bold text-white">{copy.resources} →</Link>
          <Link href={contactHref} className="rounded-full border border-[#0B2343] px-6 py-3 font-bold text-[#0B2343]">{copy.support} →</Link>
        </div>
      </section>
    </main>
  )
}
