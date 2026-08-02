import { enqueueAndSendBbEvent } from '@/lib/bb-event-notifications'
import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      userId?: string
    }

    if (!body.userId) {
      return NextResponse.json({ error: 'userId gerekli.' }, { status: 400 })
    }

    const admin = createAdminClient()
    const { data, error } = await admin.auth.admin.getUserById(body.userId)

    if (error || !data.user) {
      return NextResponse.json({ error: 'Üye bulunamadı.' }, { status: 404 })
    }

    const user = data.user
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
