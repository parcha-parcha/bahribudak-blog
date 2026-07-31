'use client'

import type { Lang } from '@/lib/i18n'
import { useMemo, useState } from 'react'

export type MemberDirectoryItem = {
  id: string
  email: string
  fullName: string
  companyName: string
  membershipStatus: 'active' | 'inactive' | 'blocked' | 'deleted'
  verified: boolean
  createdAt: string
  lastSignInAt: string | null
  lastActivityAt: string | null
  segments: string[]
  activityCount: number
  downloadCount: number
}

export default function MemberDirectory({
  members,
  lang,
}: {
  members: MemberDirectoryItem[]
  lang: Lang
}) {
  const tr = lang === 'tr'
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [verification, setVerification] = useState('all')
  const [segment, setSegment] = useState('all')

  const segmentOptions = useMemo(
    () =>
      Array.from(
        new Set(members.flatMap(member => member.segments)),
      ).sort(),
    [members],
  )

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(
      tr ? 'tr-TR' : 'en-US',
    )

    return members.filter(member => {
      if (
        status !== 'all' &&
        member.membershipStatus !== status
      ) {
        return false
      }

      if (
        verification === 'verified' &&
        !member.verified
      ) {
        return false
      }

      if (
        verification === 'unverified' &&
        member.verified
      ) {
        return false
      }

      if (
        segment !== 'all' &&
        !member.segments.includes(segment)
      ) {
        return false
      }

      if (normalizedQuery) {
        const haystack = [
          member.fullName,
          member.email,
          member.companyName,
          ...member.segments,
        ]
          .join(' ')
          .toLocaleLowerCase(tr ? 'tr-TR' : 'en-US')

        if (!haystack.includes(normalizedQuery)) {
          return false
        }
      }

      return true
    })
  }, [members, query, status, verification, segment, tr])

  const copy = tr
    ? {
        search: 'Üye ara',
        searchPlaceholder: 'Ad, e-posta, firma veya segment',
        status: 'Üyelik durumu',
        verification: 'Doğrulama',
        segment: 'Segment',
        all: 'Tümü',
        active: 'Aktif',
        inactive: 'Pasif',
        blocked: 'Engelli',
        deleted: 'Silinmiş',
        verified: 'Doğrulanmış',
        unverified: 'Doğrulanmamış',
        result: 'gösterilen üye',
        created: 'Kayıt',
        lastSignIn: 'Son giriş',
        lastActivity: 'Son aktivite',
        activities: 'Aktivite',
        downloads: 'İndirme',
        noSegment: 'Segment yok',
        noResult: 'Filtrelerle eşleşen üye bulunamadı.',
      }
    : {
        search: 'Search members',
        searchPlaceholder: 'Name, email, company or segment',
        status: 'Membership status',
        verification: 'Verification',
        segment: 'Segment',
        all: 'All',
        active: 'Active',
        inactive: 'Inactive',
        blocked: 'Blocked',
        deleted: 'Deleted',
        verified: 'Verified',
        unverified: 'Unverified',
        result: 'members shown',
        created: 'Created',
        lastSignIn: 'Last sign-in',
        lastActivity: 'Last activity',
        activities: 'Activities',
        downloads: 'Downloads',
        noSegment: 'No segment',
        noResult: 'No members match the selected filters.',
      }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-[#64748B]">
            {copy.search}
          </span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="mt-2 min-h-12 w-full rounded-xl border border-[#D8DEE8] bg-white px-4 text-sm text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/10"
          />
        </label>

        <FilterSelect
          label={copy.status}
          value={status}
          onChange={setStatus}
          options={[
            ['all', copy.all],
            ['active', copy.active],
            ['inactive', copy.inactive],
            ['blocked', copy.blocked],
            ['deleted', copy.deleted],
          ]}
        />

        <FilterSelect
          label={copy.verification}
          value={verification}
          onChange={setVerification}
          options={[
            ['all', copy.all],
            ['verified', copy.verified],
            ['unverified', copy.unverified],
          ]}
        />

        <FilterSelect
          label={copy.segment}
          value={segment}
          onChange={setSegment}
          options={[
            ['all', copy.all],
            ...segmentOptions.map(value => [value, value]),
          ]}
        />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F3F6FA] px-4 py-3 text-sm">
        <span className="font-black text-[#0B2343]">
          {filteredMembers.length} {copy.result}
        </span>
        <span className="text-[#66717E]">
          {members.length} / {members.length}
        </span>
      </div>

      <div className="mt-4 grid gap-4">
        {filteredMembers.map(member => (
          <article
            key={member.id}
            className="rounded-2xl border border-[#D8DEE8] bg-[#F8FAFC] p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-[#0B2343]">
                    {member.fullName || member.email}
                  </h3>
                  <StatusBadge
                    status={member.membershipStatus}
                    copy={copy}
                  />
                  <span
                    className={
                      member.verified
                        ? 'rounded-full bg-[#EAF8F1] px-3 py-1 text-xs font-black text-[#087A55]'
                        : 'rounded-full bg-[#FFF4E8] px-3 py-1 text-xs font-black text-[#A85400]'
                    }
                  >
                    {member.verified
                      ? copy.verified
                      : copy.unverified}
                  </span>
                </div>

                <p className="mt-2 break-all text-sm font-bold text-[#0B2343]">
                  {member.email}
                </p>
                <p className="mt-1 text-sm text-[#66717E]">
                  {member.companyName || '—'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniMetric
                  label={copy.activities}
                  value={member.activityCount}
                />
                <MiniMetric
                  label={copy.downloads}
                  value={member.downloadCount}
                />
                <DateMetric
                  label={copy.created}
                  value={member.createdAt}
                  lang={lang}
                />
                <DateMetric
                  label={copy.lastSignIn}
                  value={member.lastSignInAt}
                  lang={lang}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#E2E8F0] pt-4">
              {member.segments.length > 0 ? (
                member.segments.map(item => (
                  <span
                    key={item}
                    className="rounded-full bg-[#DFF3FB] px-3 py-1 text-xs font-black text-[#0B2343]"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#66717E]">
                  {copy.noSegment}
                </span>
              )}

              {member.lastActivityAt && (
                <span className="ml-auto text-xs text-[#66717E]">
                  {copy.lastActivity}:{' '}
                  {formatDate(member.lastActivityAt, lang)}
                </span>
              )}
            </div>
          </article>
        ))}

        {filteredMembers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] p-8 text-center text-sm text-[#66717E]">
            {copy.noResult}
          </div>
        )}
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[][]
}) {
  return (
    <label>
      <span className="text-xs font-black uppercase tracking-[0.12em] text-[#64748B]">
        {label}
      </span>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-xl border border-[#D8DEE8] bg-white px-4 text-sm font-bold text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/10"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  )
}

function StatusBadge({
  status,
  copy,
}: {
  status: MemberDirectoryItem['membershipStatus']
  copy: Record<string, string>
}) {
  const labels = {
    active: copy.active,
    inactive: copy.inactive,
    blocked: copy.blocked,
    deleted: copy.deleted,
  }

  return (
    <span className="rounded-full border border-[#D8DEE8] bg-white px-3 py-1 text-xs font-black text-[#0B2343]">
      {labels[status]}
    </span>
  )
}

function MiniMetric({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="min-w-24 rounded-xl bg-white p-3 text-center">
      <p className="text-xl font-black text-[#0B2343]">{value}</p>
      <p className="mt-1 text-[11px] font-bold text-[#66717E]">
        {label}
      </p>
    </div>
  )
}

function DateMetric({
  label,
  value,
  lang,
}: {
  label: string
  value: string | null
  lang: Lang
}) {
  return (
    <div className="min-w-28 rounded-xl bg-white p-3 text-center">
      <p className="text-xs font-black text-[#0B2343]">
        {value ? formatDate(value, lang) : '—'}
      </p>
      <p className="mt-1 text-[11px] font-bold text-[#66717E]">
        {label}
      </p>
    </div>
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
