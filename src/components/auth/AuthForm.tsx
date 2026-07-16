'use client'

import type { Lang } from '@/lib/i18n'
import { authPath, safeInternalPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function AuthForm({ lang, mode }: { lang: Lang; mode: 'login' | 'register' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const isRegister = mode === 'register'
  const copy = lang === 'tr'
    ? {
        title: isRegister ? 'Hesap oluşturun' : 'Hesabınıza giriş yapın',
        subtitle: isRegister ? 'Teknik kaynaklarınıza güvenli erişim için kaydolun.' : 'E-posta adresiniz ve parolanızla devam edin.',
        name: 'Ad soyad', company: 'Şirket adı', email: 'E-posta', password: 'Parola',
        submit: isRegister ? 'Kayıt Ol' : 'Giriş Yap', loading: 'İşleniyor…',
        switchText: isRegister ? 'Zaten hesabınız var mı?' : 'Henüz hesabınız yok mu?',
        switchLink: isRegister ? 'Giriş yapın' : 'Kayıt olun',
        verify: 'Kaydınız alındı. Gelen kutunuzdaki doğrulama bağlantısını açın.',
        error: 'İşlem tamamlanamadı. Bilgilerinizi kontrol edip tekrar deneyin.',
      }
    : {
        title: isRegister ? 'Create your account' : 'Sign in to your account',
        subtitle: isRegister ? 'Register for secure access to your technical resources.' : 'Continue with your email address and password.',
        name: 'Full name', company: 'Company name', email: 'Email', password: 'Password',
        submit: isRegister ? 'Register' : 'Login', loading: 'Working…',
        switchText: isRegister ? 'Already have an account?' : 'New here?',
        switchLink: isRegister ? 'Sign in' : 'Create an account',
        verify: 'Registration received. Open the verification link in your inbox.',
        error: 'We could not complete that request. Check your details and try again.',
      }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    const supabase = createClient()

    if (isRegister) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl.replace(/\/$/, '')}/auth/callback?next=${encodeURIComponent(authPath(lang, 'account'))}`,
          data: {
            full_name: String(form.get('full_name') ?? '').trim(),
            company_name: String(form.get('company_name') ?? '').trim(),
          },
        },
      })
      setLoading(false)
      if (error) return setMessage(copy.error)
      if (data.session) {
        router.replace(authPath(lang, 'account'))
        router.refresh()
      } else setMessage(copy.verify)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMessage(copy.error)
    const destination = safeInternalPath(
      new URLSearchParams(window.location.search).get('next'),
      authPath(lang, 'account'),
    )
    router.replace(destination)
    router.refresh()
  }

  return (
    <section className="bg-[#F5F7FA] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#D8DDE5] bg-white p-6 shadow-[0_20px_55px_rgba(11,35,67,0.10)] md:p-9">
        <div className="mb-7 h-1.5 w-16 rounded-full bg-[#2EA6D9]" />
        <h1 className="text-3xl font-bold text-[#0B2343]">{copy.title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#4C5561]">{copy.subtitle}</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {isRegister && <>
            <Field label={copy.name} name="full_name" autoComplete="name" required />
            <Field label={copy.company} name="company_name" autoComplete="organization" />
          </>}
          <Field label={copy.email} name="email" type="email" autoComplete="email" required />
          <Field label={copy.password} name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} required minLength={8} />
          {message && <p role="status" className="rounded-xl bg-[#EAF6FC] p-3 text-sm font-medium text-[#0B2343]">{message}</p>}
          <button disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0B2343] px-5 font-bold text-white transition hover:bg-[#12365E] disabled:cursor-wait disabled:opacity-60">
            {loading ? copy.loading : copy.submit}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#4C5561]">
          {copy.switchText}{' '}
          <Link className="font-bold text-[#0B2343] underline decoration-[#2EA6D9] underline-offset-4" href={authPath(lang, isRegister ? 'login' : 'register')}>{copy.switchLink}</Link>
        </p>
      </div>
    </section>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...inputProps } = props
  return <label className="block text-sm font-bold text-[#0B2343]">{label}
    <input {...inputProps} className="mt-2 min-h-12 w-full rounded-xl border border-[#D8DDE5] bg-white px-4 font-normal text-[#0B2343] focus:border-[#2EA6D9] focus:ring-2 focus:ring-[#2EA6D9]/30" />
  </label>
}
