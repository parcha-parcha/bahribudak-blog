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

export default function AuthStatusLink({
  lang,
  className,
  onClick,
  showArrow = false,
}: AuthStatusLinkProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let active = true

    async function refreshAccess() {
      const { data } = await supabase.auth.getSession()
      if (!active) return

      const authenticated = Boolean(data.session)
      setIsAuthenticated(authenticated)

      if (!authenticated) {
        setIsSuperAdmin(false)
        return
      }

      const { data: role } = await supabase.rpc('current_admin_role')
      if (active) setIsSuperAdmin(role === 'super_admin')
    }

    void refreshAccess()

    const { data } = supabase.auth.onAuthStateChange(() => {
      void refreshAccess()
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const href = isSuperAdmin
    ? lang === 'tr'
      ? '/tr/yonetim'
      : '/en/admin'
    : authPath(lang, isAuthenticated ? 'account' : 'login')

  const label = isSuperAdmin
    ? lang === 'tr'
      ? 'Yönetim Paneli'
      : 'Admin Panel'
    : isAuthenticated
      ? lang === 'tr'
        ? 'Hesabım'
        : 'Account'
      : lang === 'tr'
        ? 'Giriş Yap'
        : 'Login'

  return (
    <Link href={href} className={className} onClick={onClick}>
      <span>{label}</span>
      {showArrow && (
        <span className="text-base text-[#E45A2B]" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  )
}
