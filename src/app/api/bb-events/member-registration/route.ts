import { enqueueAndSendBbEvent } from '@/lib/bb-event-notifications'
import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

const USER_LOOKUP_ATTEMPTS = 6
const USER_LOOKUP_DELAY_MS = 400

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      userId?: string
    }

    if (!body.userId) {
      return NextResponse.json({ error: 'userId gerekli.' }, { status: 400 })
    }

    const admin = createAdminClient()
    let user = null
    let lookupError: Error | null = null

    for (let attempt = 1; attempt <= USER_LOOKUP_ATTEMPTS; attempt += 1) {
      const result = await admin.auth.admin.getUserById(body.userId)

      if (result.data.user) {
        user = result.data.user
        lookupError = null
        break
      }

      lookupError = result.error ?? new Error('Üye henüz okunabilir durumda değil.')

      if (attempt < USER_LOOKUP_ATTEMPTS) {
        await wait(USER_LOOKUP_DELAY_MS)
      }
    }

    if (!user) {
      console.error('Member registration user lookup failed', {
        userId: body.userId,
        error: lookupError?.message ?? 'Üye bulunamadı.',
      })

      return NextResponse.json(
        { error: 'Üye kaydı henüz doğrulanamadı. Bildirim daha sonra tekrar denenebilir.' },
        { status: 503 },
      )
    }

    const result = await enqueueAndSendBbEvent({
      eventType: 'member_registered',
      dedupeKey: `member_registered:${user.id}`,
      occurredAt: user.created_at,
      userId: user.id,
      email: user.email,
      metadata: {
        registration_source:
          user.user_metadata?.registration_source ?? 'membership-form',
        preferred_language:
          user.user_metadata?.preferred_language ?? 'tr',
      },
    })

    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('Member registration event failed', error)
    return NextResponse.json(
      { error: 'Üyelik bildirimi kaydedilemedi.' },
      { status: 500 },
    )
  }
}
