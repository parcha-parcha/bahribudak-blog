import { authPath } from '@/lib/auth'
import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const cards = [
  {
    title: 'Üyeler',
    description:
      'Yeni üyeleri, doğrulama durumlarını, segmentleri, aktiviteleri ve indirme sayılarını görüntüleyin.',
    href: '/tr/yonetim/uyelik',
  },
  {
    title: 'Danışmanlık / Teknik Talepler',
    description:
      'Web sitesinden gelen teknik talepleri inceleyin; durum, öncelik ve yönetici notlarını yönetin.',
    href: '/tr/yonetim/talepler',
  },
  {
    title: 'Aktiviteler ve İndirmeler',
    description:
      'Üye aktivitelerini ve publication_download kayıtlarını üyelik panelinden takip edin.',
    href: '/tr/yonetim/uyelik#aktiviteler',
  },
  {
    title: 'Yayın Dosyaları',
    description:
      'Teknik yayın dosyalarını katalog kaydıyla doğrulayarak private Supabase Storage alanına yükleyin.',
    href: '/tr/yonetim/kaynak-yukleme',
  },
  {
    title: 'Güvenlik / BB-ADM-01',
    description:
      'Super Admin MFA durumunu ve oturum güvence seviyesini kontrol edin.',
    href: '/tr/yonetim/guvenlik',
  },
] as const

export default async function ManagementHub({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  if (lang !== 'tr') {
    redirect('/tr/yonetim')
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${authPath('tr', 'login')}?next=${encodeURIComponent('/tr/yonetim')}`,
    )
  }

  const role = await getAdminRole(user.id, user.email)
  if (role !== 'super_admin') {
    redirect(authPath('tr', 'account'))
  }

  const { data: assurance } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (!assurance || assurance.currentLevel !== 'aal2') {
    redirect(
      `/tr/yonetim/guvenlik?next=${encodeURIComponent('/tr/yonetim')}`,
    )
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[14px] bg-[#111315] p-7 text-white md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
                BB-OS · BB-ADM-01
              </p>
              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.035em] text-white md:text-5xl">
                Yönetim Paneli
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
                Üyelik, teknik talepler, indirme aktiviteleri, yayın dosyaları ve Super Admin güvenliğini tek merkezden yönetin.
              </p>
            </div>

            <div className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm">
              <div className="font-black text-white">Super Admin</div>
              <div className="mt-1 text-white/65">MFA oturumu: aal2</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {cards.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[14px] border border-[#E5E2DA] bg-white p-6 transition hover:border-[#E45A2B] hover:shadow-sm md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#111315] md:text-2xl">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#66717E]">
                    {card.description}
                  </p>
                </div>
                <span
                  className="text-xl font-black text-[#E45A2B] transition group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </section>

        <div className="mt-6">
          <Link
            href="/tr/hesabim"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#111315] px-5 text-sm font-black text-[#111315] transition hover:bg-[#111315] hover:text-white"
          >
            ← Hesabıma dön
          </Link>
        </div>
      </div>
    </main>
  )
}
