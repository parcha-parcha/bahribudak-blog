import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function POST() {
  try {
    const count = await redis.incr('visitor_count')
    return NextResponse.json({ count })
  } catch (error) {
    return NextResponse.json({ error: 'Sayaç güncellenemedi' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = (await redis.get<number>('visitor_count')) ?? 0
    return NextResponse.json({ count })
  } catch (error) {
    return NextResponse.json({ count: 0 })
  }
}
