import { enqueueAndSendBbEvent } from '@/lib/bb-event-notifications'
import type { User } from '@supabase/supabase-js'

export function enqueueMemberRegistrationNotification(user: User) {
  return enqueueAndSendBbEvent({
    eventType: 'member_registered',
    dedupeKey: `member_registered:${user.id}`,
    occurredAt: user.created_at,
    userId: user.id,
    email: user.email,
    metadata: {
      registration_source:
        user.user_metadata?.registration_source ??
        'membership-form',
      preferred_language:
        user.user_metadata?.preferred_language ??
        'tr',
      verified: Boolean(user.email_confirmed_at),
    },
  })
}
