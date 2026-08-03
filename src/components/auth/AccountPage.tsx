import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { getAdminRole } from '@/lib/admin-access'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import ProfileForm from './ProfileForm'
import SignOutButton from './SignOutButton'

const historyCookieName = 'bb_member_download_history'

type CatalogDownloadSnapshot = {
  source?: string
  title?: string
  fileType?: string
  filePath?: string
}

type CookieHistoryItem = {
  title?: string
  fileType?: string
  filePath?: string
  downloadedAt?: string
}

type DownloadHistoryItem = {
  resourceId: string
  downloadedAt: string
  downloadedAtValue: string
  title?: string | null
  fileType?: string | null
  downloadPath?: string | null
}

function parseCatalogDownloadSnapshot(value: string | null) {
  const prefix = 'catalog-download:'
  if (!value?.startsWith(prefix)) return null

  try {
    const parsed = JSON.parse(
      value.slice(prefix.length),
    ) as CatalogDownloadSnapshot

    return parsed.source === 'catalog' ? parsed : null
  } catch {
    return null
  }
}

function parseCookieHistory(value: string | undefined) {
  if (!value) return []

  try {
    const parsed = JSON.parse(
      decodeURIComponent(value),
    ) as CookieHistoryItem[]

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function isDisplayableDownload(item: {
  title?: string | null
  fileType?: string | null
}) {
  const value = `${item.title ?? ''} ${
    item.fileType ?? ''
  }`.toLocaleLowerCase('en-US')

  return (
    Boolean(item.title) &&
    !/\b(test|demo|sample)\b/.test(value)
  )
}

function normalizeDownloadPath(value?: string | null) {
  if (!value || value.includes('..')) return null

  const cleanValue = value.replace(/^[/\\]+/, '')
  const path = value.startsWith('/downloads/')
    ? value
    : ['', 'downloads', cleanValue].join('/')

  return path.startsWith('/downloads/') ? path : null
}

export default async function AccountPage({
  lang,
}: {
  lang: Lang
}) {
  const supabase = await createClient()
  const cookieStore = await cookies()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(
      `${authPath(
        lang,
        'login',
      )}?next=${encodeURIComponent(
        authPath(lang, 'account'),
      )}`,
    )
  }

  const [
    { data: profile },
    { data: downloadRows, error: downloadHistoryError },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, company_name')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('download_events')
      .select(
        'downloaded_at, resource_id, user_agent, resources(title, file_type, slug, file_path)',
      )
      .eq('user_id', user.id)
      .order('downloaded_at', { ascending: false })
      .limit(20),
  ])

  const adminRole = await getAdminRole(user.id, user.email)
  const canManage = adminRole === 'admin' || adminRole === 'super_admin'

  const tr = lang === 'tr'
  const fullName =
    profile?.full_name ??
    String(user.user_metadata.full_name ?? '')
  const companyName =
    profile?.company_name ??
    String(user.user_metadata.company_name ?? '')

  const createdAt = new Intl.DateTimeFormat(
    tr ? 'tr-TR' : 'en-US',
    {
      dateStyle: 'long',
    },
  ).format(new Date(user.created_at))

  const cookieHistory = parseCookieHistory(
    cookieStore.get(historyCookieName)?.value,
  )
    .map(item => ({
      resourceId:
        item.filePath ?? item.title ?? 'cookie-download',
      downloadedAtValue: item.downloadedAt ?? '',
      downloadedAt: item.downloadedAt
        ? new Intl.DateTimeFormat(
            tr ? 'tr-TR' : 'en-US',
            {
              dateStyle: 'medium',
              timeStyle: 'short',
            },
          ).format(new Date(item.downloadedAt))
        : '—',
      title: item.title,
      fileType: item.fileType ?? '—',
      downloadPath: normalizeDownloadPath(item.filePath),
    }))
    .filter(isDisplayableDownload)

  const databaseHistory = (downloadRows ?? [])
    .map(item => {
      const resourceMeta = Array.isArray(item.resources)
        ? item.resources[0] ?? null
        : item.resources ?? null

      const catalogSnapshot =
        parseCatalogDownloadSnapshot(item.user_agent)

      return {
        resourceId: item.resource_id,
        downloadedAtValue: item.downloaded_at,
        downloadedAt: new Intl.DateTimeFormat(
          tr ? 'tr-TR' : 'en-US',
          {
            dateStyle: 'medium',
            timeStyle: 'short',
          },
        ).format(new Date(item.downloaded_at)),
        title:
          resourceMeta?.title ??
          catalogSnapshot?.title ??
          item.resource_id,
        fileType:
          resourceMeta?.file_type ??
          catalogSnapshot?.fileType ??
          '—',
        downloadPath: normalizeDownloadPath(
          resourceMeta?.file_path ??
            catalogSnapshot?.filePath,
        ),
      }
    })
    .filter(isDisplayableDownload)

  const downloadHistory = [
    ...cookieHistory,
    ...databaseHistory,
  ]
    .sort((a, b) =>
      b.downloadedAtValue.localeCompare(
        a.downloadedAtValue,
      ),
    )
    .reduce<DownloadHistoryItem[]>((items, item) => {
      const identity =
        item.downloadPath ??
        `${item.title}-${item.fileType}`

      const alreadyAdded = items.some(existing => {
        const existingIdentity =
          existing.downloadPath ??
          `${existing.title}-${existing.fileType}`

        return existingIdentity === identity
      })

      if (!alreadyAdded) items.push(item)
      return items
    }, [])
    .slice(0, 10)

  const copy = tr
    ? {
        eyebrow: 'ÜYE ALANI',
        title: 'Hesabım',
        welcome: fullName
          ? `Hoş geldiniz, ${fullName}`
          : 'Teknik yayın hesabınıza hoş geldiniz',
        summary:
          'Profil bilgilerinizi yönetin, üyelik kapsamınızı görüntüleyin ve son indirmelerinize yeniden erişin.',
        membershipStatus: 'Üyelik durumu',
        freeMember: 'Ücretsiz Üye',
        membershipText:
          'PDF, DOCX, XLSX ve PPTX dosyalarının tamamını ücretsiz üyeliğinizle indirebilirsiniz.',
        profileTitle: 'Profil bilgileri',
        profileText:
          'Hesabınızda görünen ad ve şirket bilgilerini güncelleyin.',
        accountSummary: 'Hesap özeti',
        email: 'E-posta',
        company: 'Şirket',
        accountCreated: 'Hesap oluşturma tarihi',
        pdfTitle: 'PDF Teknik Master',
        pdfText: 'Doğrudan açılır veya indirilir.',
        editableTitle: 'DOCX ve PPTX',
        editableText:
          'Üyelik girişi sonrasında indirilebilir.',
        autoReturnTitle: 'Otomatik dönüş',
        autoReturnText:
          'Giriş sonrasında talep edilen dosyaya dönülür.',
        quickLinks: 'Hızlı bağlantılar',
        profileSettings: 'Profil Bilgilerimi Yönet',
        interestSettings: 'İlgi Alanlarımı Yönet',
        consentSettings: 'İletişim İzinlerimi Yönet',
        publications: 'Teknik Yayınları İncele',
        membership: 'Üyelik ve Erişim Bilgileri',
        documents: 'Teknik Dokümanları Aç',
        managementTitle: 'Yönetim bağlantıları',
        membershipManagement: 'Üyelik ve Dönüşüm Raporları',
        requestManagement: 'Teknik Talepler Yönetimi',
        roleLabel: 'Yönetici rolü',
        professionalTitle: 'Ücretsiz teknik erişim',
        comingSoon: 'Aktif',
        professionalText:
          'Tüm teknik kaynaklar, yeni yayınlar ve tekrar indirme erişimi ücretsiz üyelik kapsamında sunulur.',
        historyTitle: 'İndirme geçmişim',
        historyText:
          'Son 10 indirme kaydınız burada görünür.',
        historyError: 'İndirme geçmişi alınamadı.',
        noHistory: 'Henüz indirme kaydınız bulunmuyor.',
        downloadAgain: 'Tekrar indir',
        notProvided: 'Belirtilmedi',
      }
    : {
        eyebrow: 'MEMBER AREA',
        title: 'My Account',
        welcome: fullName
          ? `Welcome, ${fullName}`
          : 'Welcome to your technical publication account',
        summary:
          'Manage your profile, review your membership access and return to your latest downloads.',
        membershipStatus: 'Membership status',
        freeMember: 'Free Member',
        membershipText:
          'Open PDF publications directly and download DOCX and PPTX files through your account.',
        profileTitle: 'Profile details',
        profileText:
          'Update the name and company details shown on your account.',
        accountSummary: 'Account summary',
        email: 'Email',
        company: 'Company',
        accountCreated: 'Account created',
        pdfTitle: 'PDF Technical Master',
        pdfText: 'Opens or downloads directly.',
        editableTitle: 'DOCX and PPTX',
        editableText: 'Available after member sign-in.',
        autoReturnTitle: 'Automatic return',
        autoReturnText:
          'After sign-in, you return to the requested file.',
        quickLinks: 'Quick links',
        profileSettings: 'Manage Profile Details',
        interestSettings: 'Manage Interests',
        consentSettings: 'Manage Communication Consents',
        publications: 'Browse Technical Publications',
        membership: 'Membership and Access Information',
        documents: 'Open Technical Documents',
        managementTitle: 'Management links',
        membershipManagement: 'Membership and Conversion Reports',
        requestManagement: 'Technical Request Management',
        roleLabel: 'Administrator role',
        professionalTitle: 'Free technical access',
        comingSoon: 'Active',
        professionalText:
          'All technical resources, new publications and repeat downloads are included in free membership.',
        historyTitle: 'My download history',
        historyText:
          'Your latest 10 download records appear here.',
        historyError: 'Download history could not be loaded.',
        noHistory: 'You do not have any download records yet.',
        downloadAgain: 'Download again',
        notProvided: 'Not provided',
      }

  return (
    <section className="min-h-screen bg-[#F6F4EF] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 rounded-[14px] bg-[#111315] p-7 text-white md:p-9">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] text-white md:text-4xl">
                {copy.title}
              </h1>

              <p className="mt-3 text-lg font-bold text-white">
                {copy.welcome}
              </p>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/75">
                {copy.summary}
              </p>
            </div>

            <SignOutButton lang={lang} />
          </div>
        </div>

        <div className="mb-7 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
                  {copy.membershipStatus}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#111315]">
                  {copy.freeMember}
                </h2>
              </div>

              <span className="rounded-md border border-[#E5E2DA] bg-[#F6F4EF] px-4 py-2 text-xs font-black text-[#111315]">
                {copy.freeMember}
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6F7782]">
              {copy.membershipText}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <AccessCard title={copy.pdfTitle} text={copy.pdfText} />
              <AccessCard title={copy.editableTitle} text={copy.editableText} />
              <AccessCard title={copy.autoReturnTitle} text={copy.autoReturnText} />
            </div>
          </article>

          <article className="rounded-[14px] border border-[#E5E2DA] bg-[#F6F4EF] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6F7782]">
                  {copy.professionalTitle}
                </p>
                <h2 className="mt-3 text-2xl font-black text-[#111315]">
                  {copy.comingSoon}
                </h2>
              </div>

              <span className="rounded-md border border-[#E5E2DA] bg-white px-3 py-1.5 text-[11px] font-black text-[#6F7782]">
                {copy.comingSoon}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#6F7782]">
              {copy.professionalText}
            </p>

            <Link
              href={`/${lang}/uyelik`}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-[#111315] px-5 text-sm font-black text-[#111315] transition hover:bg-[#111315] hover:text-white"
            >
              {copy.membership}
            </Link>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-black text-[#111315]">
              {copy.profileTitle}
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#6F7782]">
              {copy.profileText}
            </p>

            <div className="mt-7">
              <ProfileForm
                lang={lang}
                fullName={fullName}
                companyName={companyName}
              />
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-[14px] border border-[#E5E2DA] bg-white p-6">
              <h2 className="text-xl font-black text-[#111315]">
                {copy.accountSummary}
              </h2>

              <dl className="mt-5 space-y-4 text-sm">
                <SummaryRow label={copy.email} value={user.email ?? '—'} />
                <SummaryRow label={copy.company} value={companyName || copy.notProvided} />
                <SummaryRow label={copy.accountCreated} value={createdAt} />
              </dl>
            </article>

            <article className="rounded-[14px] border border-[#E5E2DA] bg-white p-6">
              <h2 className="text-xl font-black text-[#111315]">
                {copy.quickLinks}
              </h2>

              <div className="mt-5 grid gap-3">
                <QuickLink
                  href={
                    lang === 'tr'
                      ? '/tr/hesabim/profil'
                      : '/en/account/profile'
                  }
                  label={copy.profileSettings}
                />
                <QuickLink
                  href={
                    lang === 'tr'
                      ? '/tr/hesabim/tercihler'
                      : '/en/account/preferences'
                  }
                  label={copy.interestSettings}
                />
                <QuickLink
                  href={
                    lang === 'tr'
                      ? '/tr/hesabim/izinler'
                      : '/en/account/consents'
                  }
                  label={copy.consentSettings}
                />
                <QuickLink href={`/${lang}/blog`} label={copy.publications} />
                <QuickLink href={`/${lang}/uyelik`} label={copy.membership} />
                <QuickLink href={`/${lang}/magazam`} label={copy.documents} />
              </div>
            </article>

            {canManage && (
              <article className="rounded-[14px] border border-[#E5E2DA] bg-[#111315] p-6 text-white">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
                      BB-OS
                    </p>
                    <h2 className="mt-2 text-xl font-black text-white">
                      {copy.managementTitle}
                    </h2>
                  </div>

                  <span className="rounded-md border border-white/20 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-white/80">
                    {copy.roleLabel}: {adminRole}
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  <ManagementLink
                    href={`/${lang}/yonetim/uyelik`}
                    label={copy.membershipManagement}
                  />
                  <ManagementLink
                    href={`/${lang}/yonetim/talepler`}
                    label={copy.requestManagement}
                  />
                </div>
              </article>
            )}
          </div>
        </div>

        <article className="mt-6 rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#111315]">
                {copy.historyTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#6F7782]">
                {copy.historyText}
              </p>
            </div>

            <span className="rounded-md bg-[#F6F4EF] px-4 py-2 text-xs font-black text-[#6F7782]">
              {downloadHistory.length}/10
            </span>
          </div>

          {downloadHistoryError ? (
            <p className="mt-5 rounded-lg border border-[#E4B4C3] bg-[#FFF2F5] p-4 text-sm font-semibold text-[#8B1E3F]">
              {copy.historyError}
            </p>
          ) : downloadHistory.length === 0 ? (
            <div className="mt-5 rounded-lg border border-[#E5E2DA] bg-[#F6F4EF] p-5 text-sm text-[#6F7782]">
              {copy.noHistory}
            </div>
          ) : (
            <ul className="mt-5 grid gap-3">
              {downloadHistory.map(item => (
                <li
                  key={`${item.resourceId}-${item.downloadedAt}`}
                  className="rounded-lg border border-[#E5E2DA] bg-white p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-black text-[#111315]">
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm text-[#6F7782]">
                        {item.fileType} · {item.downloadedAt}
                      </div>
                    </div>

                    {item.downloadPath && (
                      <a
                        className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md bg-[#111315] px-4 text-xs font-black text-white transition hover:bg-[#1A1F24] focus:outline-none focus:ring-2 focus:ring-[#E45A2B] focus:ring-offset-2"
                        href={`/api/member-download?path=${encodeURIComponent(item.downloadPath)}`}
                      >
                        {copy.downloadAgain}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  )
}

function AccessCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-lg border border-[#E5E2DA] bg-[#F6F4EF] p-4">
      <p className="text-sm font-black text-[#111315]">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#6F7782]">{text}</p>
    </div>
  )
}

function SummaryRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <dt className="font-black text-[#6F7782]">{label}</dt>
      <dd className="mt-1 break-all text-[#111315]">{value}</dd>
    </div>
  )
}

function QuickLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex min-h-12 items-center justify-between rounded-lg border border-[#E5E2DA] bg-[#F6F4EF] px-4 text-sm font-black text-[#111315] transition hover:border-[#E45A2B] hover:bg-white"
    >
      <span>{label}</span>
      <span className="text-[#E45A2B]" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

function ManagementLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex min-h-12 items-center justify-between rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:border-[#E45A2B] hover:bg-[#E45A2B]"
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  )
}
