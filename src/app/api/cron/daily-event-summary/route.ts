import {
  retryPendingBbEvents,
} from '@/lib/bb-event-notifications'
import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const retry = await retryPendingBbEvents()
  const admin = createAdminClient()
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { data, error } = await admin
    .from('bb_event_queue')
    .select('event_type,status')
    .gte('occurred_at', since)

  if (error) throw error

  const summary = (data ?? []).reduce<Record<string, number>>((acc, row) => {
    const key = `${row.event_type}:${row.status}`
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  console.info('BB daily event summary', { since, summary, retry })
  return NextResponse.json({ ok: true, since, summary, retry })
}
