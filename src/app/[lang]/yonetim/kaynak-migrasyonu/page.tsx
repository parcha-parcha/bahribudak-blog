import ResourceMigrationPanel from '@/components/admin/ResourceMigrationPanel'
import { authPath } from '@/lib/auth'
import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ResourceMigrationPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  if (lang !== 'tr') {
    redirect('/tr/yonetim/kaynak-migrasyonu')
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${authPath('tr', 'login')}?next=${encodeURIComponent(
        '/tr/yonetim/kaynak-migrasyonu',
      )}`,
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
      `/tr/yonetim/guvenlik?next=${encodeURIComponent(
        '/tr/yonetim/kaynak-migrasyonu',
      )}`,
    )
  }

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <ResourceMigrationPanel />
      </div>
    </main>
  )
}
