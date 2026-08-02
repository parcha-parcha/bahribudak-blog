import { enqueueMemberRegistrationNotification } from '@/lib/member-registration-notification'
import { checkRateLimit } from '@/lib/rate-limit'
import { isSameOriginRequest } from '@/lib/request-security'
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { error: 'İstek kaynağı doğrulanamadı.' },
        { status: 403 },
      )
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Oturum doğrulanamadı.' },
        { status: 401 },
      )
    }

    const rateLimit = await checkRateLimit({
      key: `rate-limit:member-registration:${user.id}`,
      limit: 5,
      windowSeconds: 10 * 60,
    })

    if (rateLimit.limited) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderildi.' },
        {
          status: 429,
          headers: {
            'Retry-After': '600',
          },
        },
      )
    }

    const result =
      await enqueueMemberRegistrationNotification(user)

    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('Member registration event failed', error)
    return NextResponse.json(
      { error: 'Üyelik bildirimi kaydedilemedi.' },
      { status: 500 },
    )
  }
}
