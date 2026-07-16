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
  }} className="rounded-full border-2 border-white/70 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-[#2EA6D9] hover:bg-[#2EA6D9] hover:text-[#061A33] disabled:opacity-60">
    {loading ? (lang === 'tr' ? 'Çıkış yapılıyor…' : 'Signing out…') : (lang === 'tr' ? 'Çıkış Yap' : 'Sign Out')}
  </button>
}
