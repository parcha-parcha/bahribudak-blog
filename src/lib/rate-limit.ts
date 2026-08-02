import { Redis } from '@upstash/redis'

let redisClient: Redis | null | undefined

function getRedis() {
  if (redisClient !== undefined) return redisClient

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  redisClient = url && token ? new Redis({ url, token }) : null
  return redisClient
}

export async function checkRateLimit(args: {
  key: string
  limit: number
  windowSeconds: number
}) {
  const redis = getRedis()

  if (!redis) {
    return {
      enabled: false as const,
      limited: false as const,
      remaining: args.limit,
    }
  }

  try {
    const count = await redis.incr(args.key)

    if (count === 1) {
      await redis.expire(args.key, args.windowSeconds)
    }

    return {
      enabled: true as const,
      limited: count > args.limit,
      remaining: Math.max(0, args.limit - count),
    }
  } catch (error) {
    console.error('Rate limit check failed', {
      key: args.key,
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return {
      enabled: false as const,
      limited: false as const,
      remaining: args.limit,
    }
  }
}
