import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
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
    const parsed = JSON.parse(value.slice(prefix.length)) as CatalogDownloadSnapshot
    return parsed.source === 'catalog' ? parsed : null
  } catch {
    return null
  }
}

function parseCookieHistory(value: string | undefined) {
  if (!value) return []

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as CookieHistoryItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function isDisplayableDownload(item: { title?: string | null; fileType?: string | null }) {
  const value = `${item.title ?? ''} ${item.fileType ?? ''}`.toLocaleLowerCase('en-US')

  return Boolean(item.title) && !/\b(test|demo|sample)\b/.test(value)
}

function normalizeDownloadPath(value?: string | null) {
  if (!value || value.includes('..')) return null

  const cleanValue = value.replace(/^[/\\]+/, '')
  const path = value.startsWith('/downloads/')
    ? value
    : ['', 'downloads', cleanValue].join('/')

  return path.startsWith('/downloads/') ? path : null
}

export default async function AccountPage({ lang }: { lang: Lang }) {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`${authPath(lang, 'login')}?next=${encodeURIComponent(authPath(lang, 'account'))}`)

  const [{ data: profile }, { data: downloadRows, error: downloadHistoryError }] = await Promise.all([
    supabase.from('profiles').select('full_name, company_name').eq('id', user.id).maybeSingle(),
    supabase
      .from('download_events')
      .select('downloaded_at, resource_id, user_agent, resources(title, file_type, slug, file_path)')
      .eq('user_id', user.id)
      .order('downloaded_at', { ascending: false })
      .limit(20),
  ])

  const tr = lang === 'tr'
  const createdAt = new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', { dateStyle: 'long' }).format(new Date(user.created_at))
  const cookieHistory = parseCookieHistory(cookieStore.get(historyCookieName)?.value).map((item) => ({
    resourceId: item.filePath ?? item.title ?? 'cookie-download',
    downloadedAtValue: item.downloadedAt ?? '',
    downloadedAt: item.downloadedAt
      ? new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(item.downloadedAt))
      : '—',
    title: item.title,
    fileType: item.fileType ?? '—',
    downloadPath: normalizeDownloadPath(item.filePath),
  })).filter(isDisplayableDownload)

  const databaseHistory = (downloadRows ?? []).map((item) => {
    const resourceMeta = Array.isArray(item.resources) ? item.resources[0] ?? null : item.resources ?? null
    const catalogSnapshot = parseCatalogDownloadSnapshot(item.user_agent)

    return {
      resourceId: item.resource_id,
      downloadedAtValue: item.downloaded_at,
      downloadedAt: new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(item.downloaded_at)),
      title: resourceMeta?.title ?? catalogSnapshot?.title ?? item.resource_id,
      fileType: resourceMeta?.file_type ?? catalogSnapshot?.fileType ?? '—',
      downloadPath: normalizeDownloadPath(resourceMeta?.file_path ?? catalogSnapshot?.filePath),
    }
  }).filter(isDisplayableDownload)

  const downloadHistory = [...cookieHistory, ...databaseHistory]
    .sort((a, b) => b.downloadedAtValue.localeCompare(a.downloadedAtValue))
    .reduce<DownloadHistoryItem[]>((items, item) => {
      const identity = item.downloadPath ?? `${item.title}-${item.fileType}`
      const alreadyAdded = items.some((existing) =>
        (existing.downloadPath ?? `${existing.title}-${existing.fileType}`) === identity)

      if (!alreadyAdded) items.push(item)
      return items
    }, [])
    .slice(0, 10)

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
          <article className="rounded-[2rem] border border-[#D8DDE5] bg-white p-6">
            <h2 className="text-xl font-bold">{tr ? 'İndirme Geçmişim' : 'My Download History'}</h2>
            <p className="mt-2 text-sm text-[#4C5561]">{tr ? 'Son 10 indirme kaydınız burada görünür.' : 'Your latest 10 download records appear here.'}</p>
            {downloadHistoryError ? (
              <p className="mt-4 text-sm text-[#8B1E3F]">{tr ? 'İndirme geçmişi alınamadı.' : 'Download history could not be loaded.'}</p>
            ) : downloadHistory.length === 0 ? (
              <div className="mt-5 rounded-2xl bg-[#F5F7FA] p-4 text-sm text-[#4C5561]">{tr ? 'Henüz indirme kaydınız bulunmuyor.' : 'You do not have any download records yet.'}</div>
            ) : (
              <ul className="mt-5 space-y-3 text-sm">
                {downloadHistory.map((item) => (
                  <li key={`${item.resourceId}-${item.downloadedAt}`} className="rounded-2xl border border-[#D8DDE5] bg-[#F8FBFD] p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-bold text-[#0B2343]">{item.title}</div>
                        <div className="mt-1 text-[#4C5561]">{item.fileType} · {item.downloadedAt}</div>
                      </div>
                      {item.downloadPath && (
                        <a
                          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0B2343] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#163B68] focus:outline-none focus:ring-2 focus:ring-[#5BBBE6] focus:ring-offset-2"
                          href={`/api/member-download?path=${encodeURIComponent(item.downloadPath)}`}
                        >
                          {tr ? 'Tekrar indir' : 'Download again'}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      </div>
    </div>
  </section>
}
