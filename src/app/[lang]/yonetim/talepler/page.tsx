import { authPath } from '@/lib/auth'
import { isAdminEmail } from '@/lib/admin-access'
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

  if (!isAdminEmail(user.email)) {
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
}

export default async function TechnicalRequestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  if (lang !== 'tr') {
    redirect('/tr/yonetim/talepler')
  }

  await requireAdmin(lang)

  const { status: requestedStatus } = await searchParams
  const selectedStatus =
    requestedStatus &&
    statusValues.has(requestedStatus as LeadStatus)
      ? (requestedStatus as LeadStatus)
      : null

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

  if (selectedStatus) {
    query = query.eq('status', selectedStatus)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Teknik talepler alınamadı: ${error.message}`)
  }

  const leads = (data ?? []) as unknown as TechnicalLead[]

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
        <section className="rounded-[2rem] bg-[#111315] p-7 text-white shadow-[0_24px_70px_rgba(17,19,21,0.16)] md:p-10">
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
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#111315]"
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

        <section className="mt-6 rounded-[1.5rem] border border-[#E5E2DA] bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-wrap gap-2">
            <FilterLink
              href="/tr/yonetim/talepler"
              active={!selectedStatus}
              label="Tümü"
            />

            {statusOptions.map(option => (
              <FilterLink
                key={option.value}
                href={`/tr/yonetim/talepler?status=${option.value}`}
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
              className="overflow-hidden rounded-[1.75rem] border border-[#E5E2DA] bg-white shadow-[0_12px_35px_rgba(17,19,21,0.06)]"
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
            <div className="rounded-[1.75rem] border border-[#E5E2DA] bg-white p-10 text-center shadow-sm">
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
    <article className="rounded-[1.5rem] border border-[#E5E2DA] bg-white p-6 shadow-sm">
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
          : 'rounded-full border border-[#E5E2DA] bg-[#F6F4EF] px-4 py-2 text-xs font-black text-[#111315] transition hover:border-[#E45A2B]'
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}
