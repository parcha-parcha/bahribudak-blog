import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { authPath } from '@/lib/auth'
import { getDownloadPathAccessLevel } from '@/lib/resources'
import { updateSession } from '@/utils/supabase/middleware'
import { supabaseCookieOptions } from '@/utils/supabase/cookie-options'
import { isSupabaseConfigured } from '@/utils/supabase/env'

function resolveLang(request: NextRequest) {
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

  if (!accessLevel) return updateSession(request)
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
  matcher: [
    '/((?!_next/static|_next/image|favicon(?:\\.ico|\\.png)?|apple-touch-icon\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff2?)$).*)',
  ],
}
