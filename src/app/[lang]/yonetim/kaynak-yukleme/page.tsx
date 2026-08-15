import ResourceUploadPanel from '@/components/admin/ResourceUploadPanel'
import { authPath } from '@/lib/auth'
import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ResourceUploadPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  if (lang !== 'tr') redirect('/tr/yonetim/kaynak-yukleme')

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${authPath('tr', 'login')}?next=${encodeURIComponent('/tr/yonetim/kaynak-yukleme')}`,
    )
  }

  const role = await getAdminRole(user.id, user.email)
  if (role !== 'super_admin') redirect(authPath('tr', 'account'))

  const { data: assurance } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (!assurance || assurance.currentLevel !== 'aal2') {
    redirect(
      `/tr/yonetim/guvenlik?next=${encodeURIComponent('/tr/yonetim/kaynak-yukleme')}`,
    )
  }

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[14px] bg-[#111315] p-7 text-white md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
            BB-OS · Güvenli Kaynak Yönetimi
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.035em] md:text-5xl">
            Yayın Dosyası Yükleme
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            Dosyalar doğrudan private Supabase Storage alanına yüklenir. Dosya adı katalog kaydıyla birebir eşleşmeden yükleme kabul edilmez.
          </p>
        </section>

        <section className="mt-6">
          <ResourceUploadPanel />
        </section>

        <div className="mt-6">
          <Link
            href="/tr/yonetim"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#111315] px-5 text-sm font-black text-[#111315] transition hover:bg-[#111315] hover:text-white"
          >
            ← Yönetim Paneli
          </Link>
        </div>
      </div>
    </main>
  )
}
