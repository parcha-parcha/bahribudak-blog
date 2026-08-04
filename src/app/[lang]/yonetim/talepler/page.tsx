import { authPath } from '@/lib/auth'
import { hasAdminRole } from '@/lib/admin-access'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type LeadStatus =
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'proposal'
  | 'won'
  | 'lost'
  | 'closed'

type LeadPriority = 'low' | 'normal' | 'high' | 'urgent'

type TechnicalLead = {
  id: string
  email: string | null
  full_name: string | null
  company_name: string | null
  role_title: string | null
  phone: string | null
  request_type: string
  process_area: string | null
  problem_category: string | null
  occurrence_frequency: string | null
  support_preference: string | null
  contact_preference: string | null
  subject: string | null
  message: string | null
  reference_url: string | null
  language: string | null
  source: string
  status: LeadStatus
  priority: LeadPriority
  owner_note: string | null
  created_at: string
  updated_at: string
}

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'Yeni' },
  { value: 'qualified', label: 'Ön değerlendirme yapıldı' },
  { value: 'contacted', label: 'İletişime geçildi' },
  { value: 'proposal', label: 'Teklif aşamasında' },
  { value: 'won', label: 'Kazanıldı' },
  { value: 'lost', label: 'Kaybedildi' },
  { value: 'closed', label: 'Kapatıldı' },
]

const priorityOptions: Array<{
  value: LeadPriority
  label: string
}> = [
  { value: 'low', label: 'Düşük' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Yüksek' },
  { value: 'urgent', label: 'Acil' },
]

const statusValues = new Set(statusOptions.map(item => item.value))
const priorityValues = new Set(priorityOptions.map(item => item.value))

async function requireAdmin(lang: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const nextPath = `/${lang}/yonetim/talepler`
    redirect(
      `${authPath(lang === 'en' ? 'en' : 'tr', 'login')}?next=${encodeURIComponent(
        nextPath,
      )}`,
    )
  }

  if (
    !(await hasAdminRole(user.id, user.email, [
      'admin',
      'super_admin',
    ]))
  ) {
    redirect(authPath(lang === 'en' ? 'en' : 'tr', 'account'))
  }

  return user
}

async function updateTechnicalLead(formData: FormData) {
  'use server'

  const lang =
    String(formData.get('lang') ?? 'tr') === 'en' ? 'en' : 'tr'

  await requireAdmin(lang)

  const id = String(formData.get('id') ?? '').trim()
  const status = String(formData.get('status') ?? '').trim()
  const priority = String(formData.get('priority') ?? '').trim()
  const ownerNote = String(formData.get('owner_note') ?? '')
    .trim()
    .slice(0, 4000)
  const returnQuery = sanitizeReturnQuery(
    String(formData.get('return_query') ?? ''),
  )

  if (!id) {
    throw new Error('Talep kimliği bulunamadı.')
  }

  if (!statusValues.has(status as LeadStatus)) {
    throw new Error('Geçersiz talep durumu.')
  }

  if (!priorityValues.has(priority as LeadPriority)) {
    throw new Error('Geçersiz öncelik değeri.')
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('consultancy_leads')
    .update({
      status,
      priority,
      owner_note: ownerNote || null,
    })
    .eq('id', id)

  if (error) {
    throw new Error(`Talep güncellenemedi: ${error.message}`)
  }

  revalidatePath(`/${lang}/yonetim/talepler`)
  revalidatePath(`/${lang}/yonetim/uyelik`)

  const destination = new URLSearchParams(returnQuery)
  destination.set('saved', '1')

  redirect(`/${lang}/yonetim/talepler?${destination.toString()}`)
}

export default async function TechnicalRequestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{
    status?: string
    priority?: string
    q?: string
    from?: string
    to?: string
    saved?: string
  }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  if (lang !== 'tr') {
    redirect('/tr/yonetim/talepler')
  }

  await requireAdmin(lang)

  const {
    status: requestedStatus,
    priority: requestedPriority,
    q: requestedQuery,
    from: requestedFrom,
    to: requestedTo,
    saved,
  } = await searchParams

  const selectedStatus =
    requestedStatus &&
    statusValues.has(requestedStatus as LeadStatus)
      ? (requestedStatus as LeadStatus)
      : null

  const selectedPriority =
    requestedPriority &&
    priorityValues.has(requestedPriority as LeadPriority)
      ? (requestedPriority as LeadPriority)
      : null

  const searchQuery = String(requestedQuery ?? '').trim().slice(0, 120)
  const fromDate = normalizeDateInput(requestedFrom)
  const toDate = normalizeDateInput(requestedTo)

  const admin = createAdminClient()

  let query = admin
    .from('consultancy_leads')
    .select(
      [
        'id',
        'email',
        'full_name',
        'company_name',
        'role_title',
        'phone',
        'request_type',
        'process_area',
        'problem_category',
        'occurrence_frequency',
        'support_preference',
        'contact_preference',
        'subject',
        'message',
        'reference_url',
        'language',
        'source',
        'status',
        'priority',
        'owner_note',
        'created_at',
        'updated_at',
      ].join(', '),
    )
    .order('created_at', { ascending: false })
    .limit(250)

  const { data, error } = await query

  if (error) {
    throw new Error(`Teknik talepler alınamadı: ${error.message}`)
  }

  const allLeads = (data ?? []) as unknown as TechnicalLead[]

  const leads = allLeads.filter(lead => {
    if (selectedStatus && lead.status !== selectedStatus) return false
    if (selectedPriority && lead.priority !== selectedPriority) return false

    const createdAt = new Date(lead.created_at)

    if (fromDate) {
      const fromBoundary = new Date(`${fromDate}T00:00:00`)
      if (createdAt < fromBoundary) return false
    }

    if (toDate) {
      const toBoundary = new Date(`${toDate}T23:59:59.999`)
      if (createdAt > toBoundary) return false
    }

    if (searchQuery) {
      const haystack = [
        lead.email,
        lead.full_name,
        lead.company_name,
        lead.role_title,
        lead.subject,
        lead.message,
        lead.request_type,
        lead.process_area,
        lead.problem_category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('tr-TR')

      if (!haystack.includes(searchQuery.toLocaleLowerCase('tr-TR'))) {
        return false
      }
    }

    return true
  })

  const filterParams = new URLSearchParams()

  if (selectedStatus) filterParams.set('status', selectedStatus)
  if (selectedPriority) filterParams.set('priority', selectedPriority)
  if (searchQuery) filterParams.set('q', searchQuery)
  if (fromDate) filterParams.set('from', fromDate)
  if (toDate) filterParams.set('to', toDate)

  const returnQuery = filterParams.toString()

  const counts = statusOptions.reduce<Record<LeadStatus, number>>(
    (accumulator, option) => {
      accumulator[option.value] = 0
      return accumulator
    },
    {
      new: 0,
      qualified: 0,
      contacted: 0,
      proposal: 0,
      won: 0,
      lost: 0,
      closed: 0,
    },
  )

  for (const lead of leads) {
    counts[lead.status] += 1
  }

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[14px] bg-[#111315] p-7 text-white md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
            BB-OS YÖNETİM
          </p>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.035em] text-white md:text-5xl">
            Teknik talepler ve durum takibi
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            Web sitesinden gelen teknik talepleri inceleyin;
            öncelik, durum ve yönetici notlarını tek ekranda
            yönetin.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tr/yonetim/uyelik"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#111315]"
            >
              ← Üyelik paneline dön
            </Link>

            <Link
              href="/tr/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E45A2B] px-5 text-sm font-black text-white transition hover:bg-[#C94D24]"
            >
              Teknik talep formunu aç
            </Link>
          </div>
        </section>

        {saved === '1' && (
          <div className="mt-6 rounded-2xl border border-[#9AD9BF] bg-[#EAF8F1] px-5 py-4 text-sm font-black text-[#087A55]">
            Takip bilgileri başarıyla kaydedildi.
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Listelenen talepler" value={leads.length} />
          <MetricCard label="Yeni" value={counts.new} />
          <MetricCard
            label="İletişimde"
            value={counts.contacted}
          />
          <MetricCard
            label="Teklif aşamasında"
            value={counts.proposal}
          />
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#E5E2DA] bg-white p-4 md:p-5">
          <form
            method="get"
            action="/tr/yonetim/talepler"
            className="grid gap-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_auto]"
          >
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">
                Arama
              </span>
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="E-posta, ad, firma, konu veya açıklama"
                className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
              />
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">
                Öncelik
              </span>
              <select
                name="priority"
                defaultValue={selectedPriority ?? ''}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm font-bold text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
              >
                <option value="">Tümü</option>
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">
                Başlangıç
              </span>
              <input
                type="date"
                name="from"
                defaultValue={fromDate ?? ''}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm font-bold text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
              />
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">
                Bitiş
              </span>
              <input
                type="date"
                name="to"
                defaultValue={toDate ?? ''}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm font-bold text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
              />
            </label>

            {selectedStatus && (
              <input type="hidden" name="status" value={selectedStatus} />
            )}

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#E45A2B] px-5 text-sm font-black text-white transition hover:bg-[#C94D24]"
              >
                Filtrele
              </button>

              <Link
                href="/tr/yonetim/talepler"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D8D4CC] px-4 text-sm font-black text-[#111315] transition hover:border-[#E45A2B]"
              >
                Temizle
              </Link>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E5E2DA] pt-5">
            <FilterLink
              href={buildFilterHref({
                priority: selectedPriority,
                q: searchQuery,
                from: fromDate,
                to: toDate,
              })}
              active={!selectedStatus}
              label="Tümü"
            />

            {statusOptions.map(option => (
              <FilterLink
                key={option.value}
                href={buildFilterHref({
                  status: option.value,
                  priority: selectedPriority,
                  q: searchQuery,
                  from: fromDate,
                  to: toDate,
                })}
                active={selectedStatus === option.value}
                label={option.label}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 space-y-5">
          {leads.map(lead => (
            <article
              key={lead.id}
              className="overflow-hidden rounded-[14px] border border-[#E5E2DA] bg-white"
            >
              <div className="grid gap-5 border-b border-[#E5E2DA] bg-[#111315] p-6 text-white lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={lead.status} />
                    <PriorityBadge priority={lead.priority} />

                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/70">
                      {formatDate(lead.created_at)}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black tracking-[-0.025em]">
                    {lead.subject || 'Başlıksız teknik talep'}
                  </h2>

                  <p className="mt-2 text-sm text-white/65">
                    {lead.full_name || 'Ad belirtilmedi'} ·{' '}
                    {lead.company_name || 'Firma belirtilmedi'}
                  </p>
                </div>

                <div className="text-left text-sm leading-6 text-white/70 lg:text-right">
                  <a
                    href={`mailto:${lead.email ?? ''}`}
                    className="block font-black text-white underline decoration-[#E45A2B] decoration-2 underline-offset-4"
                  >
                    {lead.email || 'E-posta yok'}
                  </a>
                  <p>{lead.role_title || 'Görev/ünvan yok'}</p>
                  <p>{lead.phone || 'Telefon yok'}</p>
                </div>
              </div>

              <div className="grid gap-6 p-6 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoItem
                      label="Talep türü"
                      value={lead.request_type}
                    />
                    <InfoItem
                      label="Proses alanı"
                      value={lead.process_area}
                    />
                    <InfoItem
                      label="Problem kategorisi"
                      value={lead.problem_category}
                    />
                    <InfoItem
                      label="Görülme sıklığı"
                      value={lead.occurrence_frequency}
                    />
                    <InfoItem
                      label="Destek tercihi"
                      value={
                        lead.support_preference ??
                        lead.contact_preference
                      }
                    />
                    <InfoItem
                      label="Kaynak"
                      value={lead.source}
                    />
                  </div>

                  <div className="rounded-2xl bg-[#F6F4EF] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6F7782]">
                      Çalışma kapsamı
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#111315]">
                      {lead.message || 'Açıklama bulunmuyor.'}
                    </p>
                  </div>

                  {lead.reference_url && (
                    <a
                      href={lead.reference_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm font-black text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
                    >
                      Referans bağlantısını aç ↗
                    </a>
                  )}
                </div>

                <form
                  action={updateTechnicalLead}
                  className="rounded-2xl border border-[#E5E2DA] bg-[#F6F4EF] p-5"
                >
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="lang" value={lang} />
                  <input
                    type="hidden"
                    name="return_query"
                    value={returnQuery}
                  />

                  <label className="block text-xs font-black uppercase tracking-[0.14em] text-[#111315]/60">
                    Durum
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm font-bold text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
                    >
                      {statusOptions.map(option => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="mt-4 block text-xs font-black uppercase tracking-[0.14em] text-[#111315]/60">
                    Öncelik
                    <select
                      name="priority"
                      defaultValue={lead.priority}
                      className="mt-2 min-h-12 w-full rounded-xl border border-[#D8D4CC] bg-white px-4 text-sm font-bold text-[#111315] outline-none focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
                    >
                      {priorityOptions.map(option => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="mt-4 block text-xs font-black uppercase tracking-[0.14em] text-[#111315]/60">
                    Yönetici notu
                    <textarea
                      name="owner_note"
                      defaultValue={lead.owner_note ?? ''}
                      rows={6}
                      maxLength={4000}
                      placeholder="Ön değerlendirme, görüşme notu, sonraki adım veya teklif bilgisi…"
                      className="mt-2 w-full resize-y rounded-xl border border-[#D8D4CC] bg-white px-4 py-3 text-sm leading-6 text-[#111315] outline-none placeholder:text-[#111315]/35 focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/10"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#E45A2B] px-5 text-sm font-black text-white transition hover:bg-[#C94D24]"
                  >
                    Takip bilgilerini kaydet
                  </button>

                  <p className="mt-3 text-xs leading-5 text-[#6F7782]">
                    Son güncelleme: {formatDate(lead.updated_at)}
                  </p>
                </form>
              </div>
            </article>
          ))}

          {leads.length === 0 && (
            <div className="rounded-[14px] border border-[#E5E2DA] bg-white p-10 text-center">
              <p className="text-lg font-black text-[#111315]">
                Bu filtrede teknik talep bulunmuyor.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function MetricCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <article className="rounded-[1.5rem] border border-[#E5E2DA] bg-white p-6">
      <p className="text-sm font-black text-[#111315]/60">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#111315]">
        {value.toLocaleString('tr-TR')}
      </p>
    </article>
  )
}

function FilterLink({
  href,
  active,
  label,
}: {
  href: string
  active: boolean
  label: string
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'rounded-full bg-[#111315] px-4 py-2 text-xs font-black text-white'
          : 'rounded-md border border-[#E5E2DA] bg-[#F6F4EF] px-4 py-2 text-xs font-black text-[#111315] transition hover:border-[#E45A2B]'
      }
    >
      {label}
    </Link>
  )
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value: string | null
}) {
  return (
    <div className="rounded-xl border border-[#E5E2DA] p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold leading-6 text-[#111315]">
        {value || '—'}
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const label =
    statusOptions.find(option => option.value === status)?.label ??
    status

  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111315]">
      {label}
    </span>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: LeadPriority
}) {
  const label =
    priorityOptions.find(option => option.value === priority)
      ?.label ?? priority

  return (
    <span className="rounded-full bg-[#E45A2B] px-3 py-1 text-xs font-black text-white">
      {label}
    </span>
  )
}

function normalizeDateInput(value: string | undefined) {
  if (!value) return null
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null
}

function sanitizeReturnQuery(value: string) {
  const input = new URLSearchParams(value)
  const output = new URLSearchParams()

  const status = input.get('status')
  const priority = input.get('priority')
  const q = input.get('q')
  const from = input.get('from')
  const to = input.get('to')

  if (status && statusValues.has(status as LeadStatus)) {
    output.set('status', status)
  }

  if (priority && priorityValues.has(priority as LeadPriority)) {
    output.set('priority', priority)
  }

  if (q) output.set('q', q.slice(0, 120))
  if (normalizeDateInput(from ?? undefined)) output.set('from', from!)
  if (normalizeDateInput(to ?? undefined)) output.set('to', to!)

  return output.toString()
}

function buildFilterHref({
  status,
  priority,
  q,
  from,
  to,
}: {
  status?: LeadStatus | null
  priority?: LeadPriority | null
  q?: string | null
  from?: string | null
  to?: string | null
}) {
  const params = new URLSearchParams()

  if (status) params.set('status', status)
  if (priority) params.set('priority', priority)
  if (q) params.set('q', q)
  if (from) params.set('from', from)
  if (to) params.set('to', to)

  const query = params.toString()
  return query
    ? `/tr/yonetim/talepler?${query}`
    : '/tr/yonetim/talepler'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}
