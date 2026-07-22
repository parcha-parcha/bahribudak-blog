import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { authPath } from './src/lib/auth'
import { getDownloadPathAccessLevel } from './src/lib/resources'
import { supabaseCookieOptions } from './src/utils/supabase/cookie-options'
import { isSupabaseConfigured } from './src/utils/supabase/env'

function resolveLang(request: NextRequest) {
  const referer = request.headers.get('referer')

  if (referer) {
    try {
      const refererPath = new URL(referer).pathname
      if (refererPath.startsWith('/en')) return 'en'
    } catch {
      // Keep the Turkish default when the header is unavailable or malformed.
    }
  }

  return 'tr'
}

function redirectToLogin(request: NextRequest, cookiesToSet: Parameters<NextResponse['cookies']['set']>[]) {
  const lang = resolveLang(request)
  const url = request.nextUrl.clone()

  url.pathname = authPath(lang, 'login')
  url.search = ''
  url.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)

  const response = NextResponse.redirect(url)
  cookiesToSet.forEach((cookie) => response.cookies.set(...cookie))
  return response
}

function redirectToContact(request: NextRequest) {
  const lang = resolveLang(request)
  const url = request.nextUrl.clone()

  url.pathname = `/${lang}/contact`
  url.search = ''

  return NextResponse.redirect(url)
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
  cookiesToSet.forEach((cookie) => response.cookies.set(...cookie))
  return response
}

export async function proxy(request: NextRequest) {
  const accessLevel = getDownloadPathAccessLevel(request.nextUrl.pathname)

  if (!accessLevel) return NextResponse.next()
  if (accessLevel === 'premiumSoon') return redirectToContact(request)
  if (!isSupabaseConfigured()) return redirectToLogin(request, [])

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
          nextCookies.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          nextCookies.forEach(({ name, value, options }) => {
            const cookie = [name, value, options] as Parameters<NextResponse['cookies']['set']>
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

  return redirectToMemberDownload(request, cookiesToSet)
}

export const config = {
  matcher: ['/downloads/:path*'],
}
