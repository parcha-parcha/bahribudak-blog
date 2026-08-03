import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import ConsultancyRequestForm from './ConsultancyRequestForm'
import RequestAttributionRedirect from './RequestAttributionRedirect'

export default async function ConsultancyRequestPage({
  lang,
}: {
  lang: Lang
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pagePath =
    lang === 'tr'
      ? '/tr/hesabim/destek-talebi'
      : '/en/account/support-request'

  if (!user) {
    return (
      <RequestAttributionRedirect
        lang={lang}
        fallbackPath={pagePath}
      />
    )
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company_name')
    .eq('id', user.id)
    .maybeSingle()

  const tr = lang === 'tr'
  const copy = tr
    ? {
        eyebrow: 'BB-İLS TEKNİK HİZMET AKIŞI',
        title: 'Danışmanlık ve teknik hizmet talebi',
        summary:
          'İşletmenizdeki teknik problemi, hedefi ve çalışma kapsamını iletin. Talebiniz üye hesabınıza bağlanarak değerlendirme kuyruğuna alınır.',
        back: 'Hesabıma dön',
        security:
          'Talebiniz yalnızca teknik değerlendirme ve geri dönüş amacıyla kullanılır.',
      }
    : {
        eyebrow: 'BB-ILS TECHNICAL SERVICE FLOW',
        title: 'Consultancy and technical service request',
        summary:
          'Describe the technical problem, objective and required scope. The request is linked to your member account and placed in the evaluation queue.',
        back: 'Back to my account',
        security:
          'Your request is used only for technical evaluation and response.',
      }

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#071E3A] p-7 text-white shadow-[0_24px_70px_rgba(11,35,67,0.16)] md:p-10">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#65C6EA]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] text-white md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#DCE8F5] md:text-base">
              {copy.summary}
            </p>
            <Link
              href={authPath(lang, 'account')}
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#071E3A]"
            >
              ← {copy.back}
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#D8DEE8] bg-white p-6 shadow-sm md:p-9">
          <ConsultancyRequestForm
            lang={lang}
            initialValues={{
              email: user.email ?? '',
              fullName:
                profile?.full_name ??
                String(user.user_metadata.full_name ?? ''),
              companyName:
                profile?.company_name ??
                String(user.user_metadata.company_name ?? ''),
            }}
          />
        </section>

        <p className="mt-5 text-center text-xs leading-6 text-[#66717E]">
          {copy.security}
        </p>
      </div>
    </main>
  )
}
