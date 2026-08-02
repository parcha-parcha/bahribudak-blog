import { safeInternalPath } from '@/lib/auth'
import { enqueueMemberRegistrationNotification } from '@/lib/member-registration-notification'
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = safeInternalPath(request.nextUrl.searchParams.get('next'), '/tr/hesabim')

  if (code) {
    const supabase = await createClient()
    const { data, error } =
      await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      try {
        await enqueueMemberRegistrationNotification(data.user)
      } catch (notificationError) {
        console.error(
          'Verified member notification failed',
          notificationError,
        )
      }

      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  const loginPath = next.startsWith('/en/') ? '/en/login' : '/tr/giris'
  return NextResponse.redirect(new URL(`${loginPath}?error=callback`, request.url))
}
