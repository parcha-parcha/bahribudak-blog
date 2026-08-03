'use client'

import type { Lang } from '@/lib/i18n'
import { captureRequestAttribution } from '@/lib/request-attribution'
import { createClient } from '@/utils/supabase/client'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type InitialValues = {
  email: string
  fullName: string
  companyName: string
}

const fieldClassName =
  'mt-2 min-h-12 w-full rounded-md border border-[#E5E2DA] bg-white px-4 font-normal text-[#111315] outline-none transition placeholder:text-[#6F7782]/70 focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/12'

const labelClassName =
  'block text-sm font-black text-[#111315]'

const requestTypes = {
  tr: [
    ['technical-consultancy', 'Teknik danışmanlık'],
    ['field-assessment', 'Saha incelemesi'],
    ['process-review', 'Proses değerlendirmesi'],
    ['chemical-solution', 'Kimyasal çözüm desteği'],
    ['maintenance', 'Bakım ve teknik işletme'],
    ['fire-safety', 'Yangın güvenliği incelemesi'],
    ['training', 'Eğitim çalışması'],
    ['other', 'Diğer'],
  ],
  en: [
    ['technical-consultancy', 'Technical consultancy'],
    ['field-assessment', 'Field assessment'],
    ['process-review', 'Process review'],
    ['chemical-solution', 'Chemical solution support'],
    ['maintenance', 'Maintenance and engineering'],
    ['fire-safety', 'Fire safety review'],
    ['training', 'Training'],
    ['other', 'Other'],
  ],
} as const

const processAreas = {
  tr: [
    ['knitting', 'Örgü'],
    ['dyeing', 'Boya'],
    ['finishing', 'Apre'],
    ['laboratory-quality', 'Laboratuvar ve kalite'],
    ['maintenance-utilities', 'Bakım ve yardımcı işletmeler'],
    ['energy-water-steam', 'Enerji, su ve buhar sistemleri'],
    ['fire-safety', 'Yangın güvenliği'],
    ['management', 'Üretim ve fabrika yönetimi'],
    ['multiple', 'Birden fazla alan'],
  ],
  en: [
    ['knitting', 'Knitting'],
    ['dyeing', 'Dyeing'],
    ['finishing', 'Finishing'],
    ['laboratory-quality', 'Laboratory and quality'],
    ['maintenance-utilities', 'Maintenance and utilities'],
    ['energy-water-steam', 'Energy, water and steam systems'],
    ['fire-safety', 'Fire safety'],
    ['management', 'Production and factory management'],
    ['multiple', 'Multiple areas'],
  ],
} as const

export default function ConsultancyRequestForm({
  lang,
  initialValues,
}: {
  lang: Lang
  initialValues: InitialValues
}) {
  const tr = lang === 'tr'
  const [status, setStatus] =
    useState<FormStatus>('idle')
  const [message, setMessage] =
    useState<string | null>(null)

  useEffect(() => {
    captureRequestAttribution()
  }, [])

  const copy = tr
    ? {
        intro:
          'Aşağıdaki alanları mümkün olduğunca somut doldurun. Sabit reçete veya kesin makine ayarı vermek yerine problem, gözlem, ölçüm ve hedef bilgilerini paylaşın.',
        requestType: 'Talep türü',
        processArea: 'İlgili proses / bölüm',
        priority: 'Öncelik',
        subject: 'Konu',
        company: 'Firma',
        phone: 'Telefon',
        contactPreference: 'Tercih edilen iletişim yöntemi',
        message: 'Problem ve çalışma kapsamı',
        referenceUrl: 'Referans bağlantısı',
        consent:
          'Paylaştığım bilgilerin teknik değerlendirme ve geri dönüş amacıyla kullanılmasını kabul ediyorum.',
        select: 'Seçiniz',
        submit: 'Talebi Gönder',
        loading: 'Gönderiliyor…',
        successTitle: 'Talebiniz kaydedildi.',
        successText:
          'Teknik kapsam incelendikten sonra kayıtlı iletişim bilgileriniz üzerinden dönüş yapılacaktır.',
        another: 'Yeni talep gönder',
        error:
          'Talep kaydedilemedi. Bilgileri kontrol edip tekrar deneyin.',
        priorityOptions: [
          ['low', 'Düşük'],
          ['normal', 'Normal'],
          ['high', 'Yüksek'],
          ['urgent', 'Acil'],
        ],
        contactOptions: [
          ['email', 'E-posta'],
          ['phone', 'Telefon'],
          ['either', 'E-posta veya telefon'],
        ],
      }
    : {
        intro:
          'Complete the fields as concretely as possible. Describe the problem, observations, measurements and objective rather than requesting a fixed recipe or universal machine setting.',
        requestType: 'Request type',
        processArea: 'Process / department',
        priority: 'Priority',
        subject: 'Subject',
        company: 'Company',
        phone: 'Phone',
        contactPreference: 'Preferred contact method',
        message: 'Problem and work scope',
        referenceUrl: 'Reference link',
        consent:
          'I agree that the information provided may be used for technical evaluation and response.',
        select: 'Select',
        submit: 'Submit Request',
        loading: 'Submitting…',
        successTitle: 'Your request has been recorded.',
        successText:
          'You will be contacted through your registered contact details after the technical scope has been reviewed.',
        another: 'Submit another request',
        error:
          'The request could not be saved. Check the information and try again.',
        priorityOptions: [
          ['low', 'Low'],
          ['normal', 'Normal'],
          ['high', 'High'],
          ['urgent', 'Urgent'],
        ],
        contactOptions: [
          ['email', 'Email'],
          ['phone', 'Phone'],
          ['either', 'Email or phone'],
        ],
      }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const formElement = event.currentTarget

    setStatus('loading')
    setMessage(null)

    const form = new FormData(formElement)
    const attribution = captureRequestAttribution()
    const supabase = createClient()

    const { error } = await supabase.rpc(
      'submit_consultancy_lead',
      {
        p_request_type: String(
          form.get('request_type') ?? '',
        ),
        p_process_area: String(
          form.get('process_area') ?? '',
        ),
        p_subject: String(
          form.get('subject') ?? '',
        ).trim(),
        p_message: String(
          form.get('message') ?? '',
        ).trim(),
        p_company_name: String(
          form.get('company_name') ?? '',
        ).trim(),
        p_phone: String(
          form.get('phone') ?? '',
        ).trim(),
        p_priority: String(
          form.get('priority') ?? 'normal',
        ),
        p_contact_preference: String(
          form.get('contact_preference') ?? 'email',
        ),
        p_reference_url: String(
          form.get('reference_url') ?? '',
        ).trim(),
        p_source:
          lang === 'tr'
            ? '/tr/hesabim/destek-talebi'
            : '/en/account/support-request',
        p_utm_source: attribution.utm_source,
        p_utm_medium: attribution.utm_medium,
        p_utm_campaign: attribution.utm_campaign,
        p_utm_content: attribution.utm_content,
        p_landing_page: attribution.landing_page,
        p_referrer: attribution.referrer,
        p_source_post: attribution.source_post,
      },
    )

    if (error) {
      setStatus('error')
      setMessage(copy.error)
      return
    }

    formElement.reset()
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center"
        role="status"
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-emerald-600 text-xl font-bold text-white"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-black text-[#111315]">
          {copy.successTitle}
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#6F7782]">
          {copy.successText}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-black text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
        >
          {copy.another}
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <p className="rounded-md border border-[#E5E2DA] bg-[#F6F4EF] p-5 text-sm leading-7 text-[#111315]">
        {copy.intro}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={copy.requestType}
          name="request_type"
          options={requestTypes[lang]}
          placeholder={copy.select}
          required
        />
        <SelectField
          label={copy.processArea}
          name="process_area"
          options={processAreas[lang]}
          placeholder={copy.select}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClassName}>
          {copy.company}
          <input
            name="company_name"
            defaultValue={initialValues.companyName}
            autoComplete="organization"
            className={fieldClassName}
          />
        </label>
        <label className={labelClassName}>
          {copy.phone}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClassName}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={copy.priority}
          name="priority"
          options={
  copy.priorityOptions as [string, string][]
}
          placeholder={copy.select}
          defaultValue="normal"
          required
        />
        <SelectField
          label={copy.contactPreference}
          name="contact_preference"
          options={
  copy.contactOptions as [string, string][]
}
          placeholder={copy.select}
          defaultValue="email"
          required
        />
      </div>

      <label className={labelClassName}>
        {copy.subject}
        <input
          name="subject"
          required
          maxLength={180}
          className={fieldClassName}
        />
      </label>

      <label className={labelClassName}>
        {copy.message}
        <textarea
          name="message"
          required
          rows={9}
          maxLength={4000}
          className={`${fieldClassName} resize-y py-4`}
        />
      </label>

      <label className={labelClassName}>
        {copy.referenceUrl}
        <input
          name="reference_url"
          type="url"
          inputMode="url"
          placeholder="https://"
          className={fieldClassName}
        />
      </label>

      <label className="flex items-start gap-3 rounded-md border border-[#E5E2DA] bg-[#F6F4EF] p-5 text-sm leading-6 text-[#6F7782]">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#E45A2B]"
        />
        <span>{copy.consent}</span>
      </label>

      {status === 'error' && message && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#111315] px-6 text-sm font-black text-white transition hover:bg-[#2A2E32] disabled:cursor-wait disabled:opacity-60"
      >
        {status === 'loading'
          ? copy.loading
          : copy.submit}
      </button>
    </form>
  )
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  defaultValue = '',
  required,
}: {
  label: string
  name: string
  options: readonly (readonly [string, string])[]
  placeholder: string
  defaultValue?: string
  required?: boolean
}) {
  return (
    <label className={labelClassName}>
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={fieldClassName}
      >
        {!defaultValue && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  )
}
