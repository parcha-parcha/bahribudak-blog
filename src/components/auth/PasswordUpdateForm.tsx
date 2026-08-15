'use client'

import type { Lang } from '@/lib/i18n'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useState } from 'react'

export default function PasswordUpdateForm({ lang }: { lang: Lang }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const isTr = lang === 'tr'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = new FormData(event.currentTarget)
    const password = String(form.get('password') ?? '')
    const passwordConfirm = String(form.get('password_confirm') ?? '')

    if (password.length < 8 || password !== passwordConfirm) {
      setMessage(
        isTr
          ? 'Parolalar eşleşmeli ve en az 8 karakter olmalıdır.'
          : 'Passwords must match and contain at least 8 characters.',
      )
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setMessage(
          isTr
            ? 'Parola güncellenemedi. Sıfırlama bağlantısını yeniden talep edin.'
            : 'Password could not be updated. Request a new reset link.',
        )
        return
      }

      setMessage(
        isTr
          ? 'Parolanız güncellendi. Giriş sayfasına yönlendiriliyorsunuz.'
          : 'Your password has been updated. Redirecting to sign in.',
      )

      await supabase.auth.signOut()
      router.replace(isTr ? '/tr/giris?reset=success' : '/en/login?reset=success')
      router.refresh()
    } catch {
      setMessage(
        isTr
          ? 'Parola güncellenemedi. Sıfırlama bağlantısını yeniden talep edin.'
          : 'Password could not be updated. Request a new reset link.',
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
          {isTr ? 'Yeni parola belirleyin' : 'Choose a new password'}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6F7782]">
          {isTr
            ? 'Yeni parolanızı iki kez girin. Parola en az 8 karakter olmalıdır.'
            : 'Enter your new password twice. It must contain at least 8 characters.'}
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold text-[#111315]">
            {isTr ? 'Yeni parola' : 'New password'}
            <input
              className="mt-2 w-full rounded-md border border-[#D8D5CD] px-4 py-3 outline-none focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className="block text-sm font-bold text-[#111315]">
            {isTr ? 'Yeni parolayı tekrar girin' : 'Confirm new password'}
            <input
              className="mt-2 w-full rounded-md border border-[#D8D5CD] px-4 py-3 outline-none focus:border-[#E45A2B] focus:ring-2 focus:ring-[#E45A2B]/20"
              name="password_confirm"
              type="password"
              autoComplete="new-password"
              minLength={8}
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
                ? 'Güncelleniyor…'
                : 'Updating…'
              : isTr
                ? 'Parolayı güncelle'
                : 'Update password'}
          </button>
        </form>

        {message && (
          <p className="mt-5 rounded-md border border-[#E5E2DA] bg-[#F6F4EF] p-4 text-sm leading-6 text-[#111315]">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}
