import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import MemberSettingsForm from './MemberSettingsForm'

export type MemberSettingsSection =
  | 'profile'
  | 'preferences'
  | 'consents'

export default async function MemberSettingsPage({
  lang,
  section,
}: {
  lang: Lang
  section: MemberSettingsSection
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${authPath(lang, 'login')}?next=${encodeURIComponent(
        settingsPath(lang, section),
      )}`,
    )
  }

  const [
    { data: profile },
    { data: memberProfile },
    { data: interests },
    { data: consents },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, company_name')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('member_profiles')
      .select(
        'job_title, department, city, country_code, preferred_language',
      )
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('member_interests')
      .select('interest_code')
      .eq('user_id', user.id),
    supabase
      .from('current_communication_consents')
      .select('consent_type, status, recorded_at')
      .eq('user_id', user.id),
  ])

  const tr = lang === 'tr'
  const copy = tr
    ? {
        eyebrow: 'ÜYE AYARLARI',
        title:
          section === 'profile'
            ? 'Profil bilgilerim'
            : section === 'preferences'
              ? 'İlgi alanlarım'
              : 'İletişim izinlerim',
        summary:
          section === 'profile'
            ? 'Kurumsal ve mesleki profil bilgilerinizi güncelleyin.'
            : section === 'preferences'
              ? 'Size gösterilecek teknik içeriklerin önceliğini belirleyin.'
              : 'E-posta iletişim tercihinizi görüntüleyin veya değiştirin.',
        back: 'Hesabıma dön',
      }
    : {
        eyebrow: 'MEMBER SETTINGS',
        title:
          section === 'profile'
            ? 'My profile'
            : section === 'preferences'
              ? 'My interests'
              : 'Communication consents',
        summary:
          section === 'profile'
            ? 'Update your professional and company profile.'
            : section === 'preferences'
              ? 'Choose the technical subjects most relevant to you.'
              : 'Review or change your email communication preference.',
        back: 'Back to my account',
      }

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[2rem] bg-[#071E3A] p-7 text-white shadow-[0_24px_70px_rgba(11,35,67,0.16)] md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#65C6EA]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] text-white md:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#DCE8F5]">
            {copy.summary}
          </p>
          <Link
            href={authPath(lang, 'account')}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#071E3A]"
          >
            ← {copy.back}
          </Link>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#D8DEE8] bg-white p-6 shadow-sm md:p-8">
          <MemberSettingsForm
            lang={lang}
            section={section}
            userId={user.id}
            email={user.email ?? ''}
            profile={{
              fullName:
                profile?.full_name ??
                String(user.user_metadata.full_name ?? ''),
              companyName:
                profile?.company_name ??
                String(user.user_metadata.company_name ?? ''),
              jobTitle: memberProfile?.job_title ?? '',
              department: memberProfile?.department ?? '',
              city: memberProfile?.city ?? '',
              countryCode: memberProfile?.country_code ?? 'TR',
              preferredLanguage:
                memberProfile?.preferred_language === 'en'
                  ? 'en'
                  : 'tr',
            }}
            interests={(interests ?? []).map(
              item => item.interest_code,
            )}
            consents={Object.fromEntries(
              (consents ?? []).map(item => [
                item.consent_type,
                item.status === 'granted',
              ]),
            )}
          />
        </section>
      </div>
    </main>
  )
}

function settingsPath(
  lang: Lang,
  section: MemberSettingsSection,
) {
  if (lang === 'tr') {
    if (section === 'profile') return '/tr/hesabim/profil'
    if (section === 'preferences') return '/tr/hesabim/tercihler'
    return '/tr/hesabim/izinler'
  }

  if (section === 'profile') return '/en/account/profile'
  if (section === 'preferences') return '/en/account/preferences'
  return '/en/account/consents'
}
