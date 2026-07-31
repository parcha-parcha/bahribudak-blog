import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { hasAdminRole } from '@/lib/admin-access'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type MetricCard = {
  label: string
  value: number
  note: string
}

type RecentLead = {
  id: string
  full_name: string | null
  company_name: string | null
  request_type: string
  priority: string
  status: string
  created_at: string
}

type RecentActivity = {
  id: string
  event_type: string
  source: string | null
  path: string | null
  occurred_at: string
}

type SegmentRow = {
  segment_code: string
  count: number
}

export default async function MembershipDashboard({
  lang,
}: {
  lang: Lang
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const nextPath =
      lang === 'tr'
        ? '/tr/yonetim/uyelik'
        : '/en/admin/membership'

    redirect(
      `${authPath(lang, 'login')}?next=${encodeURIComponent(
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
    redirect(authPath(lang, 'account'))
  }

  const admin = createAdminClient()
  const now = new Date()
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString()

  const [
    usersResult,
    activeMembersResult,
    verifiedMembersResult,
    recentMembersResult,
    activityCountResult,
    downloadCountResult,
    leadCountResult,
    newLeadCountResult,
    consentCountResult,
    recentLeadsResult,
    recentActivityResult,
    segmentsResult,
  ] = await Promise.all([
    admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    }),
    admin
      .from('member_profiles')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('membership_status', 'active'),
    admin
      .from('member_profiles')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .not('email_verified_at', 'is', null),
    admin
      .from('member_profiles')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .gte('created_at', thirtyDaysAgo),
    admin
      .from('member_activity_events')
      .select('*', {
        count: 'exact',
        head: true,
      }),
    admin
      .from('member_activity_events')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('event_type', 'publication_download'),
    admin
      .from('consultancy_leads')
      .select('*', {
        count: 'exact',
        head: true,
      }),
    admin
      .from('consultancy_leads')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'new'),
    admin
      .from('current_communication_consents')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'granted'),
    admin
      .from('consultancy_leads')
      .select(
        'id, full_name, company_name, request_type, priority, status, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(8),
    admin
      .from('member_activity_events')
      .select(
        'id, event_type, source, path, occurred_at',
      )
      .order('occurred_at', { ascending: false })
      .limit(10),
    admin
      .from('member_segments')
      .select('segment_code'),
  ])

  const segmentMap = new Map<string, number>()

  for (const item of segmentsResult.data ?? []) {
    segmentMap.set(
      item.segment_code,
      (segmentMap.get(item.segment_code) ?? 0) + 1,
    )
  }

  const segments: SegmentRow[] = Array.from(
    segmentMap.entries(),
  )
    .map(([segment_code, count]) => ({
      segment_code,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const totalUsers =
    usersResult.data?.users.length ?? 0

  const tr = lang === 'tr'
  const copy = tr
    ? {
        eyebrow: 'BB-İLS YÖNETİM',
        title: 'Üyelik ve dönüşüm raporlama ekranı',
        summary:
          'Üyeler, segmentler, aktiviteler, izinler ve danışmanlık talepleri tek ekranda izlenir.',
        account: 'Hesabıma dön',
        metrics: {
          total: 'Toplam üyeler',
          active: 'Aktif üyeler',
          verified: 'Doğrulanmış üyeler',
          recent: 'Son 30 gün kayıtları',
          activity: 'Toplam aktiviteler',
          downloads: 'Yayın indirmeleri',
          leads: 'Danışmanlık talepleri',
          newLeads: 'Yeni talepler',
          consents: 'Aktif izinler',
        },
        notes: {
          total: 'Supabase Auth toplamı',
          active: 'membership_status = active',
          verified: 'E-posta doğrulanmış',
          recent: 'Son 30 gün',
          activity: 'Tüm davranış olayları',
          downloads: 'publication_download',
          leads: 'Tüm kayıtlar',
          newLeads: 'status = new',
          consents: 'Güncel granted kayıtları',
        },
        segments: 'Üye segmentleri',
        recentLeads: 'Son danışmanlık talepleri',
        recentActivity: 'Son aktiviteler',
        empty: 'Kayıt bulunmuyor.',
        priority: 'Öncelik',
        status: 'Durum',
        date: 'Tarih',
      }
    : {
        eyebrow: 'BB-ILS ADMIN',
        title: 'Membership and conversion dashboard',
        summary:
          'Members, segments, activities, consents and consultancy requests are monitored in one screen.',
        account: 'Back to my account',
        metrics: {
          total: 'Total members',
          active: 'Active members',
          verified: 'Verified members',
          recent: 'Registrations in 30 days',
          activity: 'Total activities',
          downloads: 'Publication downloads',
          leads: 'Consultancy requests',
          newLeads: 'New requests',
          consents: 'Active consents',
        },
        notes: {
          total: 'Supabase Auth total',
          active: 'membership_status = active',
          verified: 'Email verified',
          recent: 'Last 30 days',
          activity: 'All behavior events',
          downloads: 'publication_download',
          leads: 'All records',
          newLeads: 'status = new',
          consents: 'Current granted records',
        },
        segments: 'Member segments',
        recentLeads: 'Recent consultancy requests',
        recentActivity: 'Recent activities',
        empty: 'No records found.',
        priority: 'Priority',
        status: 'Status',
        date: 'Date',
      }

  const metrics: MetricCard[] = [
    {
      label: copy.metrics.total,
      value: totalUsers,
      note: copy.notes.total,
    },
    {
      label: copy.metrics.active,
      value: activeMembersResult.count ?? 0,
      note: copy.notes.active,
    },
    {
      label: copy.metrics.verified,
      value: verifiedMembersResult.count ?? 0,
      note: copy.notes.verified,
    },
    {
      label: copy.metrics.recent,
      value: recentMembersResult.count ?? 0,
      note: copy.notes.recent,
    },
    {
      label: copy.metrics.activity,
      value: activityCountResult.count ?? 0,
      note: copy.notes.activity,
    },
    {
      label: copy.metrics.downloads,
      value: downloadCountResult.count ?? 0,
      note: copy.notes.downloads,
    },
    {
      label: copy.metrics.leads,
      value: leadCountResult.count ?? 0,
      note: copy.notes.leads,
    },
    {
      label: copy.metrics.newLeads,
      value: newLeadCountResult.count ?? 0,
      note: copy.notes.newLeads,
    },
    {
      label: copy.metrics.consents,
      value: consentCountResult.count ?? 0,
      note: copy.notes.consents,
    },
  ]

  const recentLeads =
    (recentLeadsResult.data ?? []) as RecentLead[]
  const recentActivity =
    (recentActivityResult.data ?? []) as RecentActivity[]

  return (
    <main className="min-h-screen bg-[#F3F6FA] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#071E3A] p-7 text-white shadow-[0_24px_70px_rgba(11,35,67,0.16)] md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#65C6EA]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.035em] text-white md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#DCE8F5] md:text-base">
            {copy.summary}
          </p>
          <Link
            href={authPath(lang, 'account')}
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white hover:text-[#071E3A]"
          >
            ← {copy.account}
          </Link>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map(metric => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-[#D8DEE8] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-black text-[#0B2343]/65">
                {metric.label}
              </p>
              <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#0B2343]">
                {metric.value.toLocaleString(
                  tr ? 'tr-TR' : 'en-US',
                )}
              </p>
              <p className="mt-3 text-xs leading-5 text-[#66717E]">
                {metric.note}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-[2rem] border border-[#D8DEE8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#0B2343]">
              {copy.segments}
            </h2>
            <div className="mt-5 space-y-3">
              {segments.length > 0 ? (
                segments.map(segment => (
                  <div
                    key={segment.segment_code}
                    className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] px-4 py-3"
                  >
                    <span className="text-sm font-bold text-[#0B2343]">
                      {segment.segment_code}
                    </span>
                    <span className="rounded-full bg-[#DFF3FB] px-3 py-1 text-xs font-black text-[#0B2343]">
                      {segment.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#66717E]">
                  {copy.empty}
                </p>
              )}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#D8DEE8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#0B2343]">
              {copy.recentLeads}
            </h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-xs uppercase tracking-[0.12em] text-[#64748B]">
                    <th className="px-3 py-3">Kayıt</th>
                    <th className="px-3 py-3">
                      {copy.priority}
                    </th>
                    <th className="px-3 py-3">
                      {copy.status}
                    </th>
                    <th className="px-3 py-3">
                      {copy.date}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map(lead => (
                    <tr
                      key={lead.id}
                      className="border-b border-[#EEF2F6]"
                    >
                      <td className="px-3 py-4">
                        <p className="font-black text-[#0B2343]">
                          {lead.full_name ?? '—'}
                        </p>
                        <p className="mt-1 text-xs text-[#66717E]">
                          {lead.company_name ?? '—'} ·{' '}
                          {lead.request_type}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        {lead.priority}
                      </td>
                      <td className="px-3 py-4">
                        {lead.status}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {formatDate(lead.created_at, lang)}
                      </td>
                    </tr>
                  ))}
                  {recentLeads.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-6 text-[#66717E]"
                      >
                        {copy.empty}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#D8DEE8] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2343]">
            {copy.recentActivity}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {recentActivity.map(item => (
              <article
                key={item.id}
                className="rounded-2xl bg-[#F8FAFC] p-4"
              >
                <p className="text-sm font-black text-[#0B2343]">
                  {item.event_type}
                </p>
                <p className="mt-2 break-all text-xs leading-5 text-[#66717E]">
                  {item.source ?? '—'} · {item.path ?? '—'}
                </p>
                <p className="mt-2 text-xs text-[#64748B]">
                  {formatDate(item.occurred_at, lang)}
                </p>
              </article>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-sm text-[#66717E]">
                {copy.empty}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function formatDate(value: string, lang: Lang) {
  return new Intl.DateTimeFormat(
    lang === 'tr' ? 'tr-TR' : 'en-GB',
    {
      dateStyle: 'short',
      timeStyle: 'short',
    },
  ).format(new Date(value))
}
