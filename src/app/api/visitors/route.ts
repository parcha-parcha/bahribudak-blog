import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function POST() {
  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ count: 0, enabled: false })
  }

  try {
    const count = await redis.incr('visitor_count')
    return NextResponse.json({ count, enabled: true })
  } catch {
    return NextResponse.json({ count: 0, enabled: false })
  }
}

export async function GET() {
  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ count: 0, enabled: false })
  }

  try {
    const count = (await redis.get<number>('visitor_count')) ?? 0
    return NextResponse.json({ count, enabled: true })
  } catch {
    return NextResponse.json({ count: 0, enabled: false })
  }
}
