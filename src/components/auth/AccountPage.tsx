import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'
import SignOutButton from './SignOutButton'

export default async function AccountPage({ lang }: { lang: Lang }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`${authPath(lang, 'login')}?next=${encodeURIComponent(authPath(lang, 'account'))}`)

  const { data: profile } = await supabase.from('profiles')
    .select('full_name, company_name').eq('id', user.id).maybeSingle()
  const tr = lang === 'tr'
  const createdAt = new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', { dateStyle: 'long' }).format(new Date(user.created_at))

  return <section className="bg-[#F5F7FA] px-4 py-12 md:py-18">
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-5 rounded-[2rem] bg-[#0B2343] p-7 text-white md:flex-row md:items-center md:justify-between md:p-9">
        <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#5BBBE6]">{tr ? 'Üye alanı' : 'Member area'}</p><h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{tr ? 'Hesabım' : 'My Account'}</h1></div>
        <SignOutButton lang={lang} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-[2rem] border border-[#D8DDE5] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold">{tr ? 'Profil bilgileri' : 'Profile details'}</h2>
          <p className="mt-2 text-sm text-[#4C5561]">{tr ? 'Hesabınızda görünen bilgileri güncelleyin.' : 'Update the details shown on your account.'}</p>
          <div className="mt-7"><ProfileForm lang={lang} fullName={profile?.full_name ?? String(user.user_metadata.full_name ?? '')} companyName={profile?.company_name ?? String(user.user_metadata.company_name ?? '')} /></div>
        </article>
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-[#D8DDE5] bg-white p-6">
            <h2 className="text-xl font-bold">{tr ? 'Hesap özeti' : 'Account summary'}</h2>
            <dl className="mt-5 space-y-4 text-sm"><div><dt className="font-bold text-[#4C5561]">{tr ? 'E-posta' : 'Email'}</dt><dd className="mt-1 break-all text-[#0B2343]">{user.email}</dd></div><div><dt className="font-bold text-[#4C5561]">{tr ? 'Hesap oluşturma tarihi' : 'Account created'}</dt><dd className="mt-1 text-[#0B2343]">{createdAt}</dd></div></dl>
          </article>
          <article className="rounded-[2rem] border border-[#B7DFF0] bg-[#EAF6FC] p-6">
            <h2 className="text-xl font-bold">{tr ? 'Satın alınan ürünler' : 'Purchased products'}</h2>
            <p className="mt-3 text-sm leading-6 text-[#4C5561]">{tr ? 'Satın aldığınız teknik dokümanlar ilerleyen aşamada burada güvenli biçimde listelenecek.' : 'Your purchased technical documents will be listed securely here in a later phase.'}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
}
