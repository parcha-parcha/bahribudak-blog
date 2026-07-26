'use client'

import type { Lang } from '@/lib/i18n'
import { createClient } from '@/utils/supabase/client'
import type { FormEvent } from 'react'
import { useState } from 'react'

import type { MemberSettingsSection } from './MemberSettingsPage'

type ProfileValues = {
  fullName: string
  companyName: string
  jobTitle: string
  department: string
  city: string
  countryCode: string
  preferredLanguage: Lang
}

const interestOptions = {
  tr: [
    ['dyeing', 'Boya ve terbiye'],
    ['knitting', 'Örme'],
    ['textile_chemicals', 'Tekstil kimyasalları'],
    ['maintenance', 'Bakım ve teknik işletme'],
    ['energy_efficiency', 'Enerji verimliliği'],
    ['quality', 'Kalite'],
    ['fire_safety', 'Yangın güvenliği'],
    ['management', 'Yönetim ve organizasyon'],
  ],
  en: [
    ['dyeing', 'Dyeing and finishing'],
    ['knitting', 'Knitting'],
    ['textile_chemicals', 'Textile chemicals'],
    ['maintenance', 'Maintenance and engineering'],
    ['energy_efficiency', 'Energy efficiency'],
    ['quality', 'Quality'],
    ['fire_safety', 'Fire safety'],
    ['management', 'Management and organization'],
  ],
} as const

export default function MemberSettingsForm({
  lang,
  section,
  userId,
  email,
  profile,
  interests,
  consents,
}: {
  lang: Lang
  section: MemberSettingsSection
  userId: string
  email: string
  profile: ProfileValues
  interests: string[]
  consents: Record<string, boolean>
}) {
  const tr = lang === 'tr'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const copy = tr
    ? {
        save: 'Değişiklikleri Kaydet',
        saving: 'Kaydediliyor…',
        success: 'Değişiklikleriniz kaydedildi.',
        error: 'İşlem tamamlanamadı. Lütfen tekrar deneyin.',
        fullName: 'Ad soyad',
        companyName: 'Şirket adı',
        jobTitle: 'Görev / pozisyon',
        department: 'Departman',
        city: 'Şehir',
        countryCode: 'Ülke kodu',
        language: 'Tercih edilen dil',
        email: 'E-posta',
        interestsHelp:
          'Bir veya birden fazla teknik konu seçebilirsiniz.',
        emailMarketing:
          'Yeni teknik yayınlar ve hizmetler hakkında e-posta almak istiyorum.',
        consentNote:
          'Değişiklikler izin geçmişine yeni kayıt olarak eklenir; önceki kayıtlar silinmez.',
      }
    : {
        save: 'Save Changes',
        saving: 'Saving…',
        success: 'Your changes have been saved.',
        error: 'The operation could not be completed. Please try again.',
        fullName: 'Full name',
        companyName: 'Company name',
        jobTitle: 'Job title / position',
        department: 'Department',
        city: 'City',
        countryCode: 'Country code',
        language: 'Preferred language',
        email: 'Email',
        interestsHelp:
          'You may select one or more technical subjects.',
        emailMarketing:
          'I want to receive emails about new technical publications and services.',
        consentNote:
          'Changes are appended to the consent history; earlier records are not deleted.',
      }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = new FormData(event.currentTarget)
    const supabase = createClient()

    try {
      if (section === 'profile') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: String(form.get('full_name') ?? '').trim(),
            company_name: String(
              form.get('company_name') ?? '',
            ).trim(),
          })
          .eq('id', userId)

        if (profileError) throw profileError

        const { error: memberError } = await supabase
          .from('member_profiles')
          .update({
            job_title: String(
              form.get('job_title') ?? '',
            ).trim(),
            department: String(
              form.get('department') ?? '',
            ).trim(),
            city: String(form.get('city') ?? '').trim(),
            country_code:
              String(form.get('country_code') ?? 'TR')
                .trim()
                .toUpperCase()
                .slice(0, 2) || 'TR',
            preferred_language:
              form.get('preferred_language') === 'en'
                ? 'en'
                : 'tr',
          })
          .eq('user_id', userId)

        if (memberError) throw memberError
      }

      if (section === 'preferences') {
        const selected = form
          .getAll('interest_code')
          .map(value => String(value))

        const { error: deleteError } = await supabase
          .from('member_interests')
          .delete()
          .eq('user_id', userId)

        if (deleteError) throw deleteError

        if (selected.length > 0) {
          const { error: insertError } = await supabase
            .from('member_interests')
            .insert(
              selected.map(interestCode => ({
                user_id: userId,
                interest_code: interestCode,
                interest_level: 'declared',
                source: 'account-settings',
              })),
            )

          if (insertError) throw insertError
        }
      }

      if (section === 'consents') {
        const granted =
          form.get('email_marketing') === 'on'
        const previous =
          consents.email_marketing === true

        if (granted !== previous) {
          const { error: consentError } = await supabase
            .from('communication_consents')
            .insert({
              user_id: userId,
              consent_type: 'email_marketing',
              status: granted ? 'granted' : 'withdrawn',
              legal_text_version: '2026-07-26-v1',
              source: 'account-settings',
            })

          if (consentError) throw consentError
        }
      }

      setMessage(copy.success)
    } catch {
      setMessage(copy.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {section === 'profile' && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={copy.fullName}
              name="full_name"
              defaultValue={profile.fullName}
              required
            />
            <Field
              label={copy.companyName}
              name="company_name"
              defaultValue={profile.companyName}
            />
            <Field
              label={copy.jobTitle}
              name="job_title"
              defaultValue={profile.jobTitle}
            />
            <Field
              label={copy.department}
              name="department"
              defaultValue={profile.department}
            />
            <Field
              label={copy.city}
              name="city"
              defaultValue={profile.city}
            />
            <Field
              label={copy.countryCode}
              name="country_code"
              defaultValue={profile.countryCode}
              maxLength={2}
            />
          </div>

          <label className="block text-sm font-black text-[#0B2343]">
            {copy.language}
            <select
              name="preferred_language"
              defaultValue={profile.preferredLanguage}
              className="mt-2 min-h-12 w-full rounded-2xl border border-[#C9D1DC] bg-white px-4 font-normal text-[#0B2343] outline-none focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/12"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </label>

          <Field
            label={copy.email}
            name="email"
            defaultValue={email}
            disabled
          />
        </>
      )}

      {section === 'preferences' && (
        <>
          <p className="text-sm leading-7 text-[#4C5561]">
            {copy.interestsHelp}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {interestOptions[lang].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#D8DEE8] bg-[#F8FAFC] p-4 text-sm font-semibold text-[#0B2343]"
              >
                <input
                  type="checkbox"
                  name="interest_code"
                  value={value}
                  defaultChecked={interests.includes(value)}
                  className="mt-0.5 h-4 w-4 accent-[#0B2343]"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {section === 'consents' && (
        <>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#B9DFF0] bg-[#EAF6FC] p-5 text-sm font-semibold leading-6 text-[#0B2343]">
            <input
              type="checkbox"
              name="email_marketing"
              defaultChecked={
                consents.email_marketing === true
              }
              className="mt-1 h-4 w-4 accent-[#0B2343]"
            />
            <span>{copy.emailMarketing}</span>
          </label>
          <p className="text-xs leading-6 text-[#66717E]">
            {copy.consentNote}
          </p>
        </>
      )}

      {message && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-[#B7DDED] bg-[#EAF6FC] p-4 text-sm font-semibold text-[#0B2343]"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0B2343] px-6 text-sm font-black text-white transition hover:bg-[#163A64] disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? copy.saving : copy.save}
      </button>
    </form>
  )
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}) {
  return (
    <label className="block text-sm font-black text-[#0B2343]">
      {label}
      <input
        {...props}
        className="mt-2 min-h-12 w-full rounded-2xl border border-[#C9D1DC] bg-white px-4 font-normal text-[#0B2343] outline-none transition disabled:bg-[#F1F5F9] disabled:text-[#64748B] focus:border-[#2EA6D9] focus:ring-4 focus:ring-[#2EA6D9]/12"
      />
    </label>
  )
}
