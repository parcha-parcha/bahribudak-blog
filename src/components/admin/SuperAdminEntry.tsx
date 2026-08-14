import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function SuperAdminEntry() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const role = await getAdminRole(user.id, user.email)
  if (role !== 'super_admin') return null

  return (
    <div className="bg-[#F6F4EF] px-4 pt-6 md:px-6 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <section className="flex flex-col gap-4 rounded-[14px] border border-[#E45A2B]/30 bg-[#111315] p-5 text-white sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E45A2B]">
              BB-ADM-01 · SUPER ADMIN
            </p>
            <h2 className="mt-2 text-xl font-black text-white md:text-2xl">
              Yönetim Paneli
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Üyeler, teknik talepler, indirmeler ve güvenlik yönetimine tek noktadan erişin.
            </p>
          </div>

          <Link
            href="/tr/yonetim"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-[#E45A2B] px-6 text-sm font-black text-white transition hover:bg-[#C94D24] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111315]"
          >
            Yönetim Panelini Aç →
          </Link>
        </section>
      </div>
    </div>
  )
}
