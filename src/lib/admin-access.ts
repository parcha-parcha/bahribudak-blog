import { createAdminClient } from '@/utils/supabase/admin'

export type AdminRole = 'editor' | 'admin' | 'super_admin'

const validRoles = new Set<AdminRole>([
  'editor',
  'admin',
  'super_admin',
])

export async function getAdminRole(
  userId: string,
  _email?: string | null,
): Promise<AdminRole | null> {
  // BB-ADM-01: admin_roles is the single authorization source.
  // The email argument remains temporarily for call-site compatibility only.
  void _email

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
