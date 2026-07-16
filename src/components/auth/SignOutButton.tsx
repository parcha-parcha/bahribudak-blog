'use client'

import type { Lang } from '@/lib/i18n'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignOutButton({ lang }: { lang: Lang }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  return <button disabled={loading} onClick={async () => {
    setLoading(true)
    await createClient().auth.signOut()
    router.replace(`/${lang}`)
    router.refresh()
  }} className="rounded-full border-2 border-[#0B2343] px-5 py-2.5 text-sm font-bold text-[#0B2343] hover:bg-[#0B2343] hover:text-white disabled:opacity-60">
    {loading ? (lang === 'tr' ? 'Çıkış yapılıyor…' : 'Signing out…') : (lang === 'tr' ? 'Çıkış Yap' : 'Sign Out')}
  </button>
}
