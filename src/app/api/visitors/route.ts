import { checkRateLimit } from '@/lib/rate-limit'
import { getRequestIp, isSameOriginRequest } from '@/lib/request-security'
import { Redis } from '@upstash/redis'
import { NextResponse, type NextRequest } from 'next/server'

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { count: 0, enabled: false },
      { status: 403 },
    )
  }

  const ip = getRequestIp(request)
  const rateLimit = await checkRateLimit({
    key: `rate-limit:visitors:${ip}`,
    limit: 30,
    windowSeconds: 60 * 60,
  })

  if (rateLimit.limited) {
    return NextResponse.json(
      { count: 0, enabled: false },
      {
        status: 429,
        headers: {
          'Retry-After': '3600',
          'Cache-Control': 'no-store',
        },
      },
    )
  }

  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ count: 0, enabled: false })
  }

  try {
    const count = await redis.incr('visitor_count')
    return NextResponse.json(
      { count, enabled: true },
      { headers: { 'Cache-Control': 'no-store' } },
    )
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
    return NextResponse.json(
      { count, enabled: true },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return NextResponse.json({ count: 0, enabled: false })
  }
}
