'use client'

import type { Lang } from '@/lib/i18n'
import { useState } from 'react'
import { updateProfile } from '@/app/[lang]/account-actions'

export default function ProfileForm({
  lang,
  fullName,
  companyName,
}: {
  lang: Lang
  fullName: string
  companyName: string
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const tr = lang === 'tr'

  return (
    <form
      className="space-y-5"
      onSubmit={async event => {
        event.preventDefault()
        setLoading(true)
        setMessage('')

        const result = await updateProfile(
          new FormData(event.currentTarget),
        )

        setMessage(
          result.ok
            ? tr
              ? 'Profiliniz güncellendi.'
              : 'Your profile was updated.'
            : tr
              ? 'Profil güncellenemedi.'
              : 'Profile could not be updated.',
        )
        setLoading(false)
      }}
    >
      <input type="hidden" name="lang" value={lang} />

      <label className="block text-sm font-bold text-[#111315]">
        {tr ? 'Ad soyad' : 'Full name'}
        <input
          name="full_name"
          defaultValue={fullName}
          required
          maxLength={120}
          className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E2DA] bg-white px-4 font-normal text-[#111315] outline-none transition focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
        />
      </label>

      <label className="block text-sm font-bold text-[#111315]">
        {tr ? 'Şirket adı' : 'Company name'}
        <input
          name="company_name"
          defaultValue={companyName}
          maxLength={160}
          className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E2DA] bg-white px-4 font-normal text-[#111315] outline-none transition focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
        />
      </label>

      {message && (
        <p
          role="status"
          className="text-sm font-medium text-[#1A1F24]"
        >
          {message}
        </p>
      )}

      <button
        disabled={loading}
        className="rounded-md bg-[#111315] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1A1F24] focus:outline-none focus:ring-2 focus:ring-[#E45A2B] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? tr
            ? 'Kaydediliyor…'
            : 'Saving…'
          : tr
            ? 'Değişiklikleri Kaydet'
            : 'Save Changes'}
      </button>
    </form>
  )
}
