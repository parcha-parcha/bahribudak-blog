import { safeInternalPath } from '@/lib/auth'
import { createClient } from '@/utils/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash')
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null
  const next = safeInternalPath(request.nextUrl.searchParams.get('next'), '/tr/hesabim')
  if (tokenHash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return NextResponse.redirect(new URL(next, request.url))
  }
  const lang = next.startsWith('/en/') ? 'en' : 'tr'
  return NextResponse.redirect(new URL(`/${lang}/${lang === 'tr' ? 'giris' : 'login'}?error=verification`, request.url))
}
