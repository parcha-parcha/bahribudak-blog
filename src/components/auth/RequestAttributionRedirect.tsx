'use client'

import { authPath } from '@/lib/auth'
import type { Lang } from '@/lib/i18n'
import { captureRequestAttribution } from '@/lib/request-attribution'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RequestAttributionRedirect({
  lang,
  fallbackPath,
}: {
  lang: Lang
  fallbackPath: string
}) {
  const router = useRouter()

  useEffect(() => {
    captureRequestAttribution()

    const currentPath = `${window.location.pathname}${window.location.search}`
    const destination =
      currentPath.startsWith('/') && !currentPath.startsWith('//')
        ? currentPath
        : fallbackPath
    const loginPath = authPath(lang, 'login')

    router.replace(
      `${loginPath}?next=${encodeURIComponent(destination)}`,
    )
  }, [fallbackPath, lang, router])

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F3F6FA] px-4 py-12">
      <p
        className="rounded-2xl border border-[#D8DEE8] bg-white px-6 py-5 text-sm font-semibold text-[#071E3A] shadow-sm"
        role="status"
        aria-live="polite"
      >
        {lang === 'tr'
          ? 'Giriş sayfasına yönlendiriliyorsunuz…'
          : 'Redirecting to sign in…'}
      </p>
    </main>
  )
}
