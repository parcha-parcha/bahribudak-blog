'use client'

import { authPath, safeInternalPath } from '@/lib/auth'
import type { Lang } from '@/lib/i18n'
import { useState } from 'react'

interface DownloadButtonProps {
  resourceId: string
  lang: Lang
  className?: string
}

const copy = {
  tr: {
    button: 'İndir',
    loading: 'İndirme bağlantısı hazırlanıyor…',
    error: 'İndirme bağlantısı hazırlanamadı.',
    unauthorized: 'Giriş yapmanız gerekiyor.',
    redirecting: 'Giriş sayfasına yönlendiriliyorsunuz…',
  },
  en: {
    button: 'Download',
    loading: 'Preparing download link…',
    error: 'Could not prepare download link.',
    unauthorized: 'Sign in is required.',
    redirecting: 'Redirecting to sign in…',
  },
} as const

export default function DownloadButton({ resourceId, lang, className = '' }: DownloadButtonProps) {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const labels = copy[lang]

  async function handleDownload() {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch(`/api/download/${resourceId}`, {
        method: 'GET',
        cache: 'no-store',
      })

      if (response.status === 401) {
        const pathname = `${window.location.pathname}${window.location.search}`
        const safeNext = safeInternalPath(pathname, `/${lang === 'tr' ? 'tr/hesabim' : 'en/account'}`)
        window.location.assign(`${authPath(lang, 'login')}?next=${encodeURIComponent(safeNext)}`)
        setStatus(labels.redirecting)
        return
      }

      const payload = await response.json() as { signedUrl?: string; error?: string }

      if (!response.ok || !payload.signedUrl) {
        setStatus(labels.error)
        return
      }

      window.open(payload.signedUrl, '_blank', 'noopener,noreferrer')
      setStatus(labels.button)
    } catch {
      setStatus(labels.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className={`inline-flex items-center justify-center rounded-full bg-[#0B2343] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#112A56] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
        aria-live="polite"
      >
        {loading ? labels.loading : labels.button}
      </button>
      {status ? (
        <p className="text-sm text-[#4C5561]" aria-live="polite">
          {status}
        </p>
      ) : null}
    </div>
  )
}
