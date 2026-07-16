'use client'

import type { Lang } from '@/lib/i18n'
import { authPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface AuthStatusLinkProps {
  lang: Lang
  className: string
  onClick?: () => void
  showArrow?: boolean
}

export default function AuthStatusLink({ lang, className, onClick, showArrow = false }: AuthStatusLinkProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let active = true
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthenticated(Boolean(data.session))
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session))
    })
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const label = isAuthenticated
    ? lang === 'tr' ? 'Hesabım' : 'Account'
    : lang === 'tr' ? 'Giriş Yap' : 'Login'

  return (
    <Link href={authPath(lang, isAuthenticated ? 'account' : 'login')} className={className} onClick={onClick}>
      <span>{label}</span>
      {showArrow && <span className="text-base text-[#2EA6D9]" aria-hidden="true">→</span>}
    </Link>
  )
}
