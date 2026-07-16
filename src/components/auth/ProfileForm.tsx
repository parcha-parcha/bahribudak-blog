'use client'

import type { Lang } from '@/lib/i18n'
import { useState } from 'react'
import { updateProfile } from '@/app/[lang]/account-actions'

export default function ProfileForm({ lang, fullName, companyName }: { lang: Lang; fullName: string; companyName: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const tr = lang === 'tr'
  return <form className="space-y-5" onSubmit={async event => {
    event.preventDefault(); setLoading(true); setMessage('')
    const result = await updateProfile(new FormData(event.currentTarget))
    setMessage(result.ok ? (tr ? 'Profiliniz güncellendi.' : 'Your profile was updated.') : (tr ? 'Profil güncellenemedi.' : 'Profile could not be updated.'))
    setLoading(false)
  }}>
    <input type="hidden" name="lang" value={lang} />
    <label className="block text-sm font-bold">{tr ? 'Ad soyad' : 'Full name'}<input name="full_name" defaultValue={fullName} required maxLength={120} className="mt-2 min-h-12 w-full rounded-xl border border-[#D8DDE5] px-4 font-normal" /></label>
    <label className="block text-sm font-bold">{tr ? 'Şirket adı' : 'Company name'}<input name="company_name" defaultValue={companyName} maxLength={160} className="mt-2 min-h-12 w-full rounded-xl border border-[#D8DDE5] px-4 font-normal" /></label>
    {message && <p role="status" className="text-sm font-medium text-[#0B2343]">{message}</p>}
    <button disabled={loading} className="rounded-full bg-[#2EA6D9] px-5 py-3 text-sm font-bold text-[#061A33] disabled:opacity-60">{loading ? (tr ? 'Kaydediliyor…' : 'Saving…') : (tr ? 'Değişiklikleri Kaydet' : 'Save Changes')}</button>
  </form>
}
