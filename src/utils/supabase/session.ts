import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from './env'
import { createClient } from './server'

export async function getAuthenticatedUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return error ? null : data.user
}
