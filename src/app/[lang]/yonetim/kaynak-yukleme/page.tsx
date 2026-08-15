import ResourceUploadPanel from '@/components/admin/ResourceUploadPanel'
import { authPath } from '@/lib/auth'
import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const closingChecks = [
  'TR ve EN yayın sayfalarında beklenen tüm indirme kartları görünür.',
  'Resource kayıtları aktif ve beklenen erişim seviyesindedir.',
  'Private Storage objeleri kanonik yol ve doğru dosya ile mevcuttur.',
  'Anonim erişim dosyayı açmaz; giriş akışına yönlendirir.',
  'Gerçek üye hesabıyla tüm yayın dosyaları fiziksel olarak indirilmiştir.',
] as const

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
            BB-OS · G13-YED · Güvenli Kaynak Yönetimi
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.035em] md:text-5xl">
            Yayın Dosyası Yükleme
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            Dosyalar doğrudan private Supabase Storage alanına yüklenir. Yerel dosya adı farklı olabilir; dosya türü doğrulanır ve sistem katalogdaki kanonik dosya adıyla saklar.
          </p>
        </section>

        <section className="mt-6">
          <ResourceUploadPanel />
        </section>

        <section className="mt-6 rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
            BB-OS G13-YED · Final PASS kapısı
          </p>
          <h2 className="mt-3 text-2xl font-black text-[#111315]">
            Yükleme tamamlanınca yayın kapanmış sayılmaz
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#66717E]">
            FINAL PASS ancak repository doğrulaması, production kontrolü ve gerçek üye indirme kanıtı birlikte tamamlandığında verilir.
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {closingChecks.map(check => (
              <li
                key={check}
                className="rounded-md border border-[#E5E2DA] bg-[#F6F4EF] px-4 py-3 text-sm font-semibold leading-6 text-[#111315]"
              >
                □ {check}
              </li>
            ))}
          </ul>
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
