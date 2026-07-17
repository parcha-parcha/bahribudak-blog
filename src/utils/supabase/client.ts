import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from './env'
import { supabaseCookieOptions } from './cookie-options'

let client: SupabaseClient | undefined

export function createClient() {
  const { url, publishableKey } = getSupabaseEnv()
  client ??= createBrowserClient(url, publishableKey, {
    cookieOptions: supabaseCookieOptions,
  })
  return client
}
