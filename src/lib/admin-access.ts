import { createAdminClient } from '@/utils/supabase/admin'

export type AdminRole = 'editor' | 'admin' | 'super_admin'

const validRoles = new Set<AdminRole>([
  'editor',
  'admin',
  'super_admin',
])

export function getAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map(value => value.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isAdminEmail(
  email: string | null | undefined,
) {
  if (!email) return false

  return getAdminEmails().has(
    email.trim().toLowerCase(),
  )
}

export async function getAdminRole(
  userId: string,
  email: string | null | undefined,
): Promise<AdminRole | null> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('admin_roles')
    .select('role, is_active')
    .eq('user_id', userId)
    .maybeSingle()

  if (
    !error &&
    data?.is_active === true &&
    validRoles.has(data.role as AdminRole)
  ) {
    return data.role as AdminRole
  }

  // Geçiş döneminde mevcut ADMIN_EMAILS erişimini yedek olarak korur.
  if (isAdminEmail(email)) {
    return 'super_admin'
  }

  return null
}

export async function hasAdminRole(
  userId: string,
  email: string | null | undefined,
  allowedRoles: readonly AdminRole[],
) {
  const role = await getAdminRole(userId, email)

  return role !== null && allowedRoles.includes(role)
}
