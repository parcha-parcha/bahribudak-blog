'use client'

import type { Lang } from '@/lib/i18n'
import { authPath, safeInternalPath } from '@/lib/auth'
import { captureRequestAttribution } from '@/lib/request-attribution'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent, InputHTMLAttributes, ReactNode } from 'react'
import { Suspense, useEffect, useState } from 'react'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
  lang: Lang
  mode: AuthMode
}

export default function AuthForm(props: AuthFormProps) {
  return (
    <Suspense>
      <AuthFormContent {...props} />
    </Suspense>
  )
}

function AuthFormContent({ lang, mode }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    captureRequestAttribution()
  }, [])

  const isRegister = mode === 'register'
  const accountPath = authPath(lang, 'account')
  const destination = safeInternalPath(
    searchParams.get('next'),
    accountPath,
  )

  const switchPath = authPath(
    lang,
    isRegister ? 'login' : 'register',
  )

  const switchHref =
    destination === accountPath
      ? switchPath
      : `${switchPath}?next=${encodeURIComponent(destination)}`

  const copy =
    lang === 'tr'
      ? {
          eyebrow: 'BAHRİ BUDAK TEKNİK YAYIN SİSTEMİ',
          title: isRegister
            ? 'Teknik kaynaklara erişmek için hesap oluşturun'
            : 'Teknik kaynaklarınıza giriş yapın',
          subtitle: isRegister
            ? 'Ücretsiz üyelik hesabınızı oluşturun. E-posta doğrulamasından sonra tüm teknik dosyalara erişin.'
            : 'E-posta adresiniz ve parolanızla devam edin. Giriş tamamlandığında istediğiniz dosyaya otomatik olarak yönlendirilirsiniz.',
          name: 'Ad soyad',
          company: 'Şirket adı',
          jobTitle: 'Görev / pozisyon',
          interest: 'Ana ilgi alanı',
          interestPlaceholder: 'İlgi alanı seçin',
          terms:
            'Üyelik koşullarını kabul ediyorum.',
          privacyNotice:
            'Kişisel verilerin işlenmesine ilişkin aydınlatma metnini okudum.',
          marketing:
            'Yeni teknik yayınlar ve hizmetler hakkında e-posta almak istiyorum (isteğe bağlı).',
          email: 'E-posta',
          password: 'Parola',
          submit: isRegister ? 'Hesap Oluştur' : 'Giriş Yap',
          loading: 'İşleniyor…',
          switchText: isRegister
            ? 'Zaten hesabınız var mı?'
            : 'Henüz hesabınız yok mu?',
          switchLink: isRegister
            ? 'Giriş yapın'
            : 'Ücretsiz hesap oluşturun',
          verify:
            'Kaydınız alındı. E-posta adresinize gönderilen doğrulama bağlantısını açın.',
          error:
            'İşlem tamamlanamadı. Bilgilerinizi kontrol edip tekrar deneyin.',
          secureAccess: 'Güvenli teknik yayın erişimi',
          secureAccessText:
            'Tüm teknik dosyalar ücretsizdir ve doğrulanmış üyelik hesabıyla indirilebilir.',
          pdfTitle: 'Tüm teknik dosyalar',
          pdfText:
            'PDF, DOCX, XLSX ve PPTX dosyalarının tamamı ücretsiz üyelikle sunulur.',
          memberTitle: 'Ücretsiz üyelik',
          memberText:
            'Tek hesapla tüm teknik kaynaklara ve yeni yayınlara erişin.',
          returnTitle: 'Otomatik geri dönüş',
          returnText:
            'Girişten sonra talep ettiğiniz dosyaya otomatik olarak dönersiniz.',
          privacy:
            'Hesap bilgileriniz yalnız erişim ve üyelik işlemleri için kullanılır.',
          panelTitle: 'Teknik yayın erişim sistemi',
          panelText:
            'Araştırma, saha uygulaması ve proses yönetimi dokümanlarına kontrollü erişim.',
          benefitOne: '13 standartlaştırılmış teknik yayın',
          benefitTwo: 'Tüm dosya türlerine ücretsiz erişim',
          benefitThree: 'Yeni teknik yayınlara düzenli erişim',
          benefitFour: 'Masaüstü ve mobil uyumlu indirme akışı',
        }
      : {
          eyebrow: 'BAHRİ BUDAK TECHNICAL PUBLICATION SYSTEM',
          title: isRegister
            ? 'Create an account to access technical resources'
            : 'Sign in to your technical resources',
          subtitle: isRegister
            ? 'Create your membership account. After email verification, you can securely access technical files.'
            : 'Continue with your email address and password. After sign-in, you will automatically return to the requested file.',
          name: 'Full name',
          company: 'Company name',
          jobTitle: 'Job title / position',
          interest: 'Primary area of interest',
          interestPlaceholder: 'Select an area of interest',
          terms:
            'I accept the membership terms.',
          privacyNotice:
            'I have read the privacy notice regarding the processing of personal data.',
          marketing:
            'I want to receive emails about new technical publications and services (optional).',
          email: 'Email',
          password: 'Password',
          submit: isRegister ? 'Create Account' : 'Sign In',
          loading: 'Working…',
          switchText: isRegister
            ? 'Already have an account?'
            : 'New here?',
          switchLink: isRegister
            ? 'Sign in'
            : 'Create a free account',
          verify:
            'Registration received. Open the verification link sent to your email address.',
          error:
            'We could not complete the request. Check your details and try again.',
          secureAccess: 'Secure technical publication access',
          secureAccessText:
            'Member files can only be downloaded through a verified user account.',
          pdfTitle: 'PDF Technical Master',
          pdfText:
            'PDF files open or download directly from the publication page.',
          memberTitle: 'DOCX and PPTX files',
          memberText:
            'Editable technical files are protected by member sign-in.',
          returnTitle: 'Automatic return',
          returnText:
            'After sign-in, you automatically return to the file you requested.',
          privacy:
            'Your account information is used only for access and membership operations.',
          panelTitle: 'Technical publication access system',
          panelText:
            'Controlled access to research, field application and process management documents.',
          benefitOne: '13 standardized technical publications',
          benefitTwo: 'Direct access to PDF files',
          benefitThree: 'Membership protection for DOCX and PPTX',
          benefitFour: 'Desktop and mobile compatible download flow',
        }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    const membershipTerms =
      form.get('membership_terms') === 'on'
    const privacyNotice =
      form.get('privacy_notice') === 'on'
    const emailMarketing =
      form.get('email_marketing') === 'on'
    const supabase = createClient()

    if (
      isRegister &&
      (!membershipTerms || !privacyNotice)
    ) {
      setMessage(copy.error)
      setLoading(false)
      return
    }

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${
              window.location.origin
            }/auth/callback?next=${encodeURIComponent(
              destination,
            )}`,
            data: {
              full_name: String(
                form.get('full_name') ?? '',
              ).trim(),
              company_name: String(
                form.get('company_name') ?? '',
              ).trim(),
              job_title: String(
                form.get('job_title') ?? '',
              ).trim(),
              interest_code: String(
                form.get('interest_code') ?? '',
              ).trim(),
              preferred_language: lang,
              membership_terms: membershipTerms,
              privacy_notice: privacyNotice,
              email_marketing: emailMarketing,
              registration_source: 'membership-form',
              legal_text_version: '2026-07-26-v1',
            },
          },
        })

        if (error) {
          setMessage(copy.error)
          return
        }

        if (data.session) {
          fetch('/api/bb-events/member-registration', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            credentials: 'same-origin',
            keepalive: true,
          }).catch(notificationError => {
            console.warn(
              'Membership notification request failed.',
              notificationError,
            )
          })

          router.replace(destination)
          router.refresh()
          return
        }

        setMessage(copy.verify)
        return
      }

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (error) {
        setMessage(copy.error)
        return
      }

      router.replace(destination)
      router.refresh()
    } catch {
      setMessage(copy.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#F6F4EF] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#E5E2DA] bg-white shadow-[0_28px_80px_rgba(17,19,21,0.14)] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative overflow-hidden bg-[#111315] px-6 py-9 text-white md:px-10 md:py-12 lg:min-h-[720px]">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border border-[#E45A2B]/35"
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full flex-col">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-5 max-w-md text-3xl font-black leading-tight tracking-[-0.035em] text-white md:text-4xl">
                {copy.panelTitle}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#F6F4EF]/75 md:text-base">
                {copy.panelText}
              </p>
            </div>

            <div className="mt-9 space-y-3">
              <Benefit>{copy.benefitOne}</Benefit>
              <Benefit>{copy.benefitTwo}</Benefit>
              <Benefit>{copy.benefitThree}</Benefit>
              <Benefit>{copy.benefitFour}</Benefit>
            </div>

            <div className="mt-auto pt-10">
              <div className="rounded-[1.4rem] border border-white/15 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm font-black text-white">
                  {copy.secureAccess}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#F6F4EF]/75">
                  {copy.secureAccessText}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="px-6 py-9 md:px-10 md:py-12 lg:px-14">
          <div className="mb-8 h-1.5 w-16 rounded-full bg-[#E45A2B]" />

          <h1 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.035em] text-[#111315] md:text-4xl">
            {copy.title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6F7782] md:text-base">
            {copy.subtitle}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <InfoCard
              title={copy.pdfTitle}
              text={copy.pdfText}
            />
            <InfoCard
              title={copy.memberTitle}
              text={copy.memberText}
            />
            <InfoCard
              title={copy.returnTitle}
              text={copy.returnText}
            />
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit}
          >
            {isRegister && (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={copy.name}
                    name="full_name"
                    autoComplete="name"
                    required
                  />
                  <Field
                    label={copy.company}
                    name="company_name"
                    autoComplete="organization"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={copy.jobTitle}
                    name="job_title"
                    autoComplete="organization-title"
                  />
                  <SelectField
                    label={copy.interest}
                    name="interest_code"
                    placeholder={copy.interestPlaceholder}
                    required
                    options={
                      lang === 'tr'
                        ? [
                            ['dyeing', 'Boya ve terbiye'],
                            ['knitting', 'Örme'],
                            ['textile_chemicals', 'Tekstil kimyasalları'],
                            ['maintenance', 'Bakım ve teknik işletme'],
                            ['energy_efficiency', 'Enerji verimliliği'],
                            ['quality', 'Kalite'],
                            ['fire_safety', 'Yangın güvenliği'],
                            ['management', 'Yönetim ve organizasyon'],
                          ]
                        : [
                            ['dyeing', 'Dyeing and finishing'],
                            ['knitting', 'Knitting'],
                            ['textile_chemicals', 'Textile chemicals'],
                            ['maintenance', 'Maintenance and engineering'],
                            ['energy_efficiency', 'Energy efficiency'],
                            ['quality', 'Quality'],
                            ['fire_safety', 'Fire safety'],
                            ['management', 'Management and organization'],
                          ]
                    }
                  />
                </div>

                <div className="space-y-3 rounded-2xl border border-[#E5E2DA] bg-[#F6F4EF] p-4">
                  <CheckboxField
                    name="membership_terms"
                    required
                  >
                    {copy.terms}
                  </CheckboxField>
                  <CheckboxField
                    name="privacy_notice"
                    required
                  >
                    {copy.privacyNotice}
                  </CheckboxField>
                  <CheckboxField name="email_marketing">
                    {copy.marketing}
                  </CheckboxField>
                </div>
              </div>
            )}

            <Field
              label={copy.email}
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <Field
              label={copy.password}
              name="password"
              type="password"
              autoComplete={
                isRegister
                  ? 'new-password'
                  : 'current-password'
              }
              required
              minLength={8}
            />

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-2xl border border-[#E45A2B]/35 bg-[#F6F4EF] p-4 text-sm font-semibold leading-6 text-[#111315]"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#111315] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#E45A2B] focus:outline-none focus:ring-4 focus:ring-[#E45A2B]/25 disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? copy.loading : copy.submit}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6F7782]">
            {copy.switchText}{' '}
            <Link
              className="font-black text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
              href={switchHref}
            >
              {copy.switchLink}
            </Link>
          </p>

          <p className="mt-7 border-t border-[#E5E2DA] pt-5 text-center text-xs leading-5 text-[#6F7782]">
            {copy.privacy}
          </p>
        </div>
      </div>
    </section>
  )
}

function Benefit({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E45A2B] text-xs font-black text-white"
        aria-hidden="true"
      >
        ✓
      </span>
      <span className="text-sm font-semibold leading-6 text-[#F6F4EF]">
        {children}
      </span>
    </div>
  )
}

function InfoCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border border-[#E5E2DA] bg-[#F6F4EF] p-4">
      <p className="text-xs font-black leading-5 text-[#111315]">
        {title}
      </p>
      <p className="mt-1 text-xs leading-5 text-[#6F7782]">
        {text}
      </p>
    </div>
  )
}

function Field({
  label,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}) {
  return (
    <label className="block text-sm font-black text-[#111315]">
      {label}
      <input
        {...inputProps}
        className="mt-2 min-h-12 w-full rounded-2xl border border-[#E5E2DA] bg-white px-4 font-normal text-[#111315] outline-none transition placeholder:text-[#6F7782]/65 focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/12 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#FFFFFF_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#111315]"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  placeholder,
  options,
  required,
}: {
  label: string
  name: string
  placeholder: string
  options: Array<[string, string]>
  required?: boolean
}) {
  return (
    <label className="block text-sm font-black text-[#111315]">
      {label}
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 min-h-12 w-full rounded-2xl border border-[#E5E2DA] bg-white px-4 font-normal text-[#111315] outline-none transition focus:border-[#E45A2B] focus:ring-4 focus:ring-[#E45A2B]/12"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  )
}

function CheckboxField({
  name,
  required,
  children,
}: {
  name: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#6F7782]">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 h-4 w-4 shrink-0 rounded border-[#6F7782] accent-[#E45A2B]"
      />
      <span>{children}</span>
    </label>
  )
}

