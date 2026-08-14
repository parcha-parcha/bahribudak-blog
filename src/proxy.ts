import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { authPath } from '@/lib/auth'
import { getDownloadPathAccessLevel } from '@/lib/resources'
import { updateSession } from '@/utils/supabase/middleware'
import { supabaseCookieOptions } from '@/utils/supabase/cookie-options'
import { isSupabaseConfigured } from '@/utils/supabase/env'

function resolveLang(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/en/')) return 'en'

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const refererPath = new URL(referer).pathname
      if (refererPath.startsWith('/en')) return 'en'
    } catch {
      return 'tr'
    }
  }

  return 'tr'
}

function isAdminPath(pathname: string) {
  return (
    pathname === '/tr/yonetim' ||
    pathname.startsWith('/tr/yonetim/') ||
    pathname === '/en/admin' ||
    pathname.startsWith('/en/admin/')
  )
}

function isAdminSecurityPath(pathname: string) {
  return pathname === '/tr/yonetim/guvenlik'
}

function redirectToLogin(
  request: NextRequest,
  cookiesToSet: Parameters<NextResponse['cookies']['set']>[],
) {
  const lang = resolveLang(request)
  const url = request.nextUrl.clone()

  url.pathname = authPath(lang, 'login')
  url.search = ''
  url.searchParams.set(
    'next',
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  )

  const response = NextResponse.redirect(url)
  cookiesToSet.forEach(cookie => response.cookies.set(...cookie))
  return response
}

function redirectToAdminSecurity(
  request: NextRequest,
  cookiesToSet: Parameters<NextResponse['cookies']['set']>[],
) {
  const url = request.nextUrl.clone()
  url.pathname = '/tr/yonetim/guvenlik'
  url.search = ''
  url.searchParams.set(
    'next',
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  )

  const response = NextResponse.redirect(url)
  cookiesToSet.forEach(cookie => response.cookies.set(...cookie))
  return response
}

function redirectToMemberDownload(
  request: NextRequest,
  cookiesToSet: Parameters<NextResponse['cookies']['set']>[],
) {
  const url = request.nextUrl.clone()

  url.pathname = '/api/member-download'
  url.search = ''
  url.searchParams.set('path', request.nextUrl.pathname)

  const response = NextResponse.redirect(url)
  cookiesToSet.forEach(cookie => response.cookies.set(...cookie))
  return response
}

export async function proxy(request: NextRequest) {
  const accessLevel = getDownloadPathAccessLevel(
    request.nextUrl.pathname,
  )
  const adminPath = isAdminPath(request.nextUrl.pathname)

  if (!accessLevel && !adminPath) {
    return updateSession(request)
  }

  if (!isSupabaseConfigured()) {
    return redirectToLogin(request, [])
  }

  let response = NextResponse.next({ request })
  const cookiesToSet: Parameters<NextResponse['cookies']['set']>[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: supabaseCookieOptions,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(nextCookies) {
          nextCookies.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          nextCookies.forEach(({ name, value, options }) => {
            const cookie = [name, value, options] as Parameters<
              NextResponse['cookies']['set']
            >
            cookiesToSet.push(cookie)
            response.cookies.set(...cookie)
          })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirectToLogin(request, cookiesToSet)

  if (adminPath) {
    const { data: role } = await supabase.rpc('current_admin_role')

    if (
      role === 'super_admin' &&
      !isAdminSecurityPath(request.nextUrl.pathname)
    ) {
      const { data: assurance } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

      if (!assurance || assurance.currentLevel !== 'aal2') {
        return redirectToAdminSecurity(request, cookiesToSet)
      }
    }

    return response
  }

  return redirectToMemberDownload(request, cookiesToSet)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon(?:\\.ico|\\.png)?|apple-touch-icon\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff2?)$).*)',
  ],
}
