import { createAdminClient } from '@/utils/supabase/admin'
import { createHash, randomUUID } from 'crypto'

export type BbEventType =
  | 'member_registered'
  | 'publication_download'

type EventPayload = {
  eventType: BbEventType
  dedupeKey: string
  occurredAt?: string
  userId?: string | null
  email?: string | null
  resourcePath?: string | null
  resourceTitle?: string | null
  metadata?: Record<string, unknown>
}

type QueueRow = {
  id: string
  event_type: BbEventType
  occurred_at: string
  masked_email: string | null
  resource_path: string | null
  resource_title: string | null
  metadata: Record<string, unknown> | null
}

function maskEmail(value: string | null | undefined) {
  if (!value) return null
  const [local, domain] = value.split('@')
  if (!domain) return '***'
  const visible = local.slice(0, 1)
  return `${visible}${'*'.repeat(Math.max(3, local.length - 1))}@${domain}`
}

function htmlEscape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function eventLabel(eventType: BbEventType) {
  return eventType === 'member_registered'
    ? 'Yeni ücretsiz üyelik'
    : 'Yeni doküman indirmesi'
}

function eventSubject(row: QueueRow) {
  return `[bahribudak.com] ${eventLabel(row.event_type)}`
}

function eventHtml(row: QueueRow) {
  const details = [
    ['Olay', eventLabel(row.event_type)],
    ['Tarih-saat', row.occurred_at],
    ['Olay kimliği', row.id],
    ['Üye', row.masked_email ?? 'Bilgi yok'],
    ['İçerik / dosya', row.resource_title ?? row.resource_path ?? 'Bilgi yok'],
  ]

  const rows = details
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #d8dee8">${htmlEscape(label)}</th><td style="padding:8px;border-bottom:1px solid #d8dee8">${htmlEscape(value)}</td></tr>`,
    )
    .join('')

  return `<div style="font-family:Arial,sans-serif;color:#17263d"><h2 style="margin:0 0 16px">${htmlEscape(eventLabel(row.event_type))}</h2><table style="border-collapse:collapse;width:100%;max-width:680px">${rows}</table><p style="margin-top:16px;font-size:12px;color:#607089">Bu bildirim BB-OS Faz 2 olay sistemi tarafından otomatik oluşturuldu.</p></div>`
}

async function sendEmail(row: QueueRow) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.BB_NOTIFICATION_FROM_EMAIL
  const to = process.env.BB_NOTIFICATION_TO_EMAIL

  if (!apiKey || !from || !to) {
    throw new Error(
      'RESEND_API_KEY, BB_NOTIFICATION_FROM_EMAIL veya BB_NOTIFICATION_TO_EMAIL eksik.',
    )
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: eventSubject(row),
      html: eventHtml(row),
      headers: {
        'X-BB-Event-Id': row.id,
      },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`E-posta gönderilemedi (${response.status}): ${body.slice(0, 500)}`)
  }

  return (await response.json()) as { id?: string }
}

export function createDownloadDedupeKey(args: {
  userId: string
  resourcePath: string
  requestId?: string | null
}) {
  const minute = new Date().toISOString().slice(0, 16)
  const source = [
    'publication_download',
    args.userId,
    args.resourcePath,
    args.requestId ?? minute,
  ].join('|')

  return createHash('sha256').update(source).digest('hex')
}

export async function enqueueAndSendBbEvent(payload: EventPayload) {
  const admin = createAdminClient()
  const occurredAt = payload.occurredAt ?? new Date().toISOString()
  const eventId = randomUUID()

  const { data, error } = await admin
    .from('bb_event_queue')
    .upsert(
      {
        id: eventId,
        event_type: payload.eventType,
        dedupe_key: payload.dedupeKey,
        occurred_at: occurredAt,
        user_id: payload.userId ?? null,
        masked_email: maskEmail(payload.email),
        resource_path: payload.resourcePath ?? null,
        resource_title: payload.resourceTitle ?? null,
        metadata: payload.metadata ?? {},
        status: 'pending',
      },
      {
        onConflict: 'dedupe_key',
        ignoreDuplicates: true,
      },
    )
    .select(
      'id,event_type,occurred_at,masked_email,resource_path,resource_title,metadata,status',
    )
    .maybeSingle()

  if (error) throw error
  if (!data) return { duplicate: true as const }

  const row = data as QueueRow & { status: string }

  try {
    const result = await sendEmail(row)

    await admin
      .from('bb_event_queue')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        provider_message_id: result.id ?? null,
        last_error: null,
        attempt_count: 1,
      })
      .eq('id', row.id)

    return { duplicate: false as const, eventId: row.id }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Bilinmeyen bildirim hatası.'

    await admin
      .from('bb_event_queue')
      .update({
        status: 'failed',
        last_error: message.slice(0, 2000),
        attempt_count: 1,
      })
      .eq('id', row.id)

    console.error('BB event notification failed', {
      eventId: row.id,
      eventType: row.event_type,
      error: message,
    })

    return {
      duplicate: false as const,
      eventId: row.id,
      notificationFailed: true as const,
    }
  }
}

export async function retryPendingBbEvents(limit = 50) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('bb_event_queue')
    .select(
      'id,event_type,occurred_at,masked_email,resource_path,resource_title,metadata,attempt_count',
    )
    .in('status', ['pending', 'failed'])
    .lt('attempt_count', 5)
    .order('occurred_at', { ascending: true })
    .limit(limit)

  if (error) throw error

  let sent = 0
  let failed = 0

  for (const item of data ?? []) {
    const row = item as QueueRow & { attempt_count: number }
    try {
      const result = await sendEmail(row)
      await admin
        .from('bb_event_queue')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          provider_message_id: result.id ?? null,
          last_error: null,
          attempt_count: row.attempt_count + 1,
        })
        .eq('id', row.id)
      sent += 1
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Bilinmeyen bildirim hatası.'
      await admin
        .from('bb_event_queue')
        .update({
          status: 'failed',
          last_error: message.slice(0, 2000),
          attempt_count: row.attempt_count + 1,
        })
        .eq('id', row.id)
      failed += 1
    }
  }

  return { sent, failed }
}
