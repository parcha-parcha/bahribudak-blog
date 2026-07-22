import type { NextRequest } from 'next/server'
import { proxy as srcProxy } from './src/proxy'

export function proxy(request: NextRequest) {
  return srcProxy(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon(?:\\.ico|\\.png)?|apple-touch-icon\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff2?)$).*)',
  ],
}
