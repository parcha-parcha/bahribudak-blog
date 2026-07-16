import { safeInternalPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = safeInternalPath(request.nextUrl.searchParams.get('next'), '/tr/hesabim')
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, request.url))
  }
  const loginPath = next.startsWith('/en/') ? '/en/login' : '/tr/giris'
  return NextResponse.redirect(new URL(`${loginPath}?error=callback`, request.url))
}
