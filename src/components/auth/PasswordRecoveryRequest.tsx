'use client'

import type { Lang } from '@/lib/i18n'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'

export default function PasswordRecoveryRequest({ lang }: { lang: Lang }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const isTr = lang === 'tr'
  const loginPath = isTr ? '/tr/giris' : '/en/login'
  const resetPath = isTr ? '/tr/parola-yenile' : '/en/reset-password'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const supabase = createClient()

    try {
      const redirectTo = `${window.location.origin}/auth/recovery?next=${encodeURIComponent(resetPath)}`
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

      if (error) {
        setMessage(
          isTr
            ? 'Parola sıfırlama bağlantısı gönderilemedi. Lütfen daha sonra tekrar deneyin.'
            : 'The password reset link could not be sent. Please try again later.',
        )
        return
      }

      // Deliberately use a neutral response to avoid account enumeration.
      setMessage(
        isTr
          ? 'Bu e-posta adresiyle kayıtlı bir hesap varsa parola sıfırlama bağlantısı gönderildi.'
          : 'If an account exists for this email address, a password reset link has been sent.',
      )
    } catch {
      setMessage(
        isTr
          ? 'Parola sıfırlama bağlantısı gönderilemedi. Lütfen daha sonra tekrar deneyin.'
          : 'The password reset link could not be sent. Please try again later.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#F6F4EF] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-xl rounded-lg border border-[#E5E2DA] bg-white p-6 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
          {isTr ? 'GÜVENLİ HESAP ERİŞİMİ' : 'SECURE ACCOUNT ACCESS'}
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#111315]">
          {isTr ? 'Parolanızı sıfırlayın' : 'Reset your password'}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6F7782]">
          {isTr
            ? 'Üyelik hesabınızda kullandığınız e-posta adresini girin. Hesap mevcutsa güvenli parola yenileme bağlantısı gönderilir.'
            : 'Enter the email address used for your membership account. If the account exists, a secure reset link will be sent.'}
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold text-[#111315]">
            {isTr ? 'E-posta' : 'Email'}
            <input
              className="mt-2 w-full rounded-md border border-[#D8D5CD] px-4 py-3 outline-none focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <button
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111315] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isTr
                ? 'Gönderiliyor…'
                : 'Sending…'
              : isTr
                ? 'Parola sıfırlama bağlantısı gönder'
                : 'Send password reset link'}
          </button>
        </form>

        {message && (
          <p className="mt-5 rounded-md border border-[#E5E2DA] bg-[#F6F4EF] p-4 text-sm leading-6 text-[#111315]">
            {message}
          </p>
        )}

        <Link className="mt-6 inline-flex text-sm font-bold text-[#111315] underline" href={loginPath}>
          {isTr ? 'Giriş sayfasına dön' : 'Return to sign in'}
        </Link>
      </div>
    </section>
  )
}
