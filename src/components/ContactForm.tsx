'use client'

import type { Lang } from '@/lib/i18n'
import { useState } from 'react'

interface ContactFormProps {
  lang: Lang
  initialValues?: {
    requestType?: string
    processArea?: string
    subject?: string
    message?: string
    referenceUrl?: string
  }
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const fieldClassName =
  'w-full rounded-xl border border-[#E5E2DA] bg-white px-4 py-3 text-sm text-[#111315] outline-none transition placeholder:text-[#6F7782]/65 focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/12'

const labelClassName =
  'mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#6F7782]'

export default function ContactForm({ lang, initialValues }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const tr = lang === 'tr'

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setStatus('loading')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(
        'https://formspree.io/f/xkoypknn',
        {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        },
      )

      if (!response.ok) {
        setStatus('error')
        return
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const requestTypes = tr
    ? [
        'Teknik danışmanlık',
        'Proses inceleme ve iyileştirme',
        'Teknik doküman talebi',
        'Eğitim çalışması',
        'İçerik ve yayın iş birliği',
        'Diğer',
      ]
    : [
        'Technical consulting',
        'Process review and improvement',
        'Technical document request',
        'Training',
        'Content and publishing collaboration',
        'Other',
      ]

  const processAreas = tr
    ? [
        'Örgü',
        'Boya',
        'Apre',
        'Laboratuvar ve kalite',
        'Üretim ve fabrika yönetimi',
        'Teknik dokümantasyon',
        'Birden fazla alan',
      ]
    : [
        'Knitting',
        'Dyeing',
        'Finishing',
        'Laboratory and quality',
        'Production and factory management',
        'Technical documentation',
        'Multiple areas',
      ]

  return (
    <section
      className="rounded-[2rem] border border-[#E5E2DA] bg-white p-6 shadow-[0_18px_55px_rgba(17,19,21,0.08)] md:p-8"
      aria-labelledby="contact-form-title"
    >
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E45A2B]">
          {tr ? 'TEKNİK TALEP FORMU' : 'TECHNICAL REQUEST FORM'}
        </p>

        <h2
          id="contact-form-title"
          className="mt-3 text-2xl font-bold tracking-[-0.025em] text-[#111315] md:text-3xl"
        >
          {tr
            ? 'Çalışma kapsamını net bilgilerle iletin.'
            : 'Describe the work scope with clear information.'}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#6F7782]">
          {tr
            ? 'Zorunlu alanları doldurun. Makine, kumaş, proses, hata veya hedef bilgilerini mümkün olduğunca somut yazın.'
            : 'Complete the required fields. Describe machinery, fabric, process, defect or target information as clearly as possible.'}
        </p>
      </div>

      {status === 'success' ? (
        <div
          className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-8 text-center"
          role="status"
        >
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white"
            aria-hidden="true"
          >
            ✓
          </div>

          <h3 className="mt-4 text-xl font-bold text-[#111315]">
            {tr ? 'Talebiniz iletildi.' : 'Your request has been sent.'}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6F7782]">
            {tr
              ? 'İçerik ve kapsam değerlendirildikten sonra e-posta üzerinden dönüş yapılacaktır.'
              : 'You will receive a response by email after the content and scope have been reviewed.'}
          </p>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 text-sm font-bold text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4 transition hover:text-[#E45A2B]"
          >
            {tr ? 'Yeni talep gönder' : 'Send another request'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="hidden"
            name="_subject"
            value={
              initialValues?.subject
                ? initialValues.subject
                : tr
                ? 'bahribudak.com yeni teknik talep'
                : 'bahribudak.com new technical request'
            }
          />
          <input type="hidden" name="language" value={lang} />
          <input
            type="hidden"
            name="source"
            value={`/${lang}/contact`}
          />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company-site">Website</label>
            <input
              id="contact-company-site"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClassName}>
                {tr ? 'Ad Soyad' : 'Full Name'} *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder={tr ? 'Adınız Soyadınız' : 'Your full name'}
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClassName}>
                {tr ? 'E-posta' : 'Email'} *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="ornek@email.com"
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-company"
                className={labelClassName}
              >
                {tr ? 'Firma' : 'Company'}
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                autoComplete="organization"
                placeholder={
                  tr ? 'Firma veya kurum adı' : 'Company or organization'
                }
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="contact-role" className={labelClassName}>
                {tr ? 'Görev / Ünvan' : 'Role / Title'}
              </label>
              <input
                id="contact-role"
                type="text"
                name="role"
                autoComplete="organization-title"
                placeholder={
                  tr ? 'Göreviniz veya ünvanınız' : 'Your role or title'
                }
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-request-type"
                className={labelClassName}
              >
                {tr ? 'Talep Türü' : 'Request Type'} *
              </label>
              <select
                id="contact-request-type"
                name="requestType"
                required
                defaultValue={initialValues?.requestType ?? ''}
                className={fieldClassName}
              >
                <option value="" disabled>
                  {tr ? 'Seçiniz' : 'Select'}
                </option>
                {requestTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-process-area"
                className={labelClassName}
              >
                {tr ? 'Proses Alanı' : 'Process Area'} *
              </label>
              <select
                id="contact-process-area"
                name="processArea"
                required
                defaultValue={initialValues?.processArea ?? ''}
                className={fieldClassName}
              >
                <option value="" disabled>
                  {tr ? 'Seçiniz' : 'Select'}
                </option>
                {processAreas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className={labelClassName}>
              {tr ? 'Konu' : 'Subject'} *
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              required
              placeholder={
                tr
                  ? 'Talebinizi kısa bir başlıkla özetleyin'
                  : 'Summarize your request in a short title'
              }
              defaultValue={initialValues?.subject}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClassName}>
              {tr ? 'Çalışma Kapsamı' : 'Work Scope'} *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={8}
              maxLength={3000}
              placeholder={
                tr
                  ? 'Kumaş türü, makine, proses, mevcut sorun, hedef, ölçüm sonuçları ve beklenen çıktıyı açıklayın.'
                  : 'Describe the fabric type, machinery, process, current issue, target, measurements and expected output.'
              }
              defaultValue={initialValues?.message}
              className={`${fieldClassName} resize-y`}
            />
            <p className="mt-2 text-xs leading-5 text-[#6F7782]">
              {tr
                ? 'Azami 3000 karakter. Hassas üretim verilerini veya ticari sırları paylaşmayın.'
                : 'Maximum 3000 characters. Do not share sensitive production data or trade secrets.'}
            </p>
          </div>

          <div>
            <label
              htmlFor="contact-reference"
              className={labelClassName}
            >
              {tr ? 'Referans Bağlantısı' : 'Reference Link'}
            </label>
            <input
              id="contact-reference"
              type="url"
              name="referenceUrl"
              inputMode="url"
              placeholder="https://"
              defaultValue={initialValues?.referenceUrl}
              className={fieldClassName}
            />
            <p className="mt-2 text-xs leading-5 text-[#6F7782]">
              {tr
                ? 'Gerekliyse erişilebilir bir doküman veya görsel bağlantısı ekleyin.'
                : 'Add an accessible document or image link when relevant.'}
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-[#E5E2DA] bg-[#F6F4EF] p-4">
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-[#E45A2B]"
            />
            <span className="text-xs leading-6 text-[#6F7782]">
              {tr
                ? 'Formda paylaştığım bilgilerin yalnızca iletişim talebimin değerlendirilmesi ve yanıtlanması amacıyla kullanılmasını kabul ediyorum.'
                : 'I agree that the information submitted in this form may be used only to review and respond to my contact request.'}
            </span>
          </label>

          {status === 'error' && (
            <p
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {tr
                ? 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.'
                : 'An error occurred while sending. Please try again or contact directly by email.'}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E45A2B] px-6 py-3.5 text-sm font-bold text-[#F6F4EF] transition hover:bg-[#C94E26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading'
              ? tr
                ? 'Gönderiliyor...'
                : 'Sending...'
              : tr
                ? 'Teknik Talebi Gönder'
                : 'Send Technical Request'}

            {status !== 'loading' && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
            )}
          </button>
        </form>
      )}
    </section>
  )
}
