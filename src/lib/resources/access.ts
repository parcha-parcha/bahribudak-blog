import type { User } from '@supabase/supabase-js'

export type ResourceAccessType = 'public' | 'member'

export type ResourceAccessCode =
  | 'OK'
  | 'RESOURCE_INACTIVE'
  | 'RESOURCE_UNAUTHORIZED'
  | 'RESOURCE_NOT_FOUND'

export interface ResourceAccessRecord {
  id: string
  is_active: boolean
  access_type: ResourceAccessType
}

export interface ResourceAccessDecision {
  allowed: boolean
  accessType: ResourceAccessType
  code: ResourceAccessCode
  message: string
}

export function evaluateResourceAccess(
  resource: ResourceAccessRecord | null,
  user: User | null,
): ResourceAccessDecision {
  if (!resource) {
    return {
      allowed: false,
      accessType: 'member',
      code: 'RESOURCE_NOT_FOUND',
      message: 'Resource not found.',
    }
  }

  if (!resource.is_active) {
    return {
      allowed: false,
      accessType: resource.access_type,
      code: 'RESOURCE_INACTIVE',
      message: 'This resource is currently unavailable.',
    }
  }

  if (resource.access_type === 'public') {
    return {
      allowed: true,
      accessType: 'public',
      code: 'OK',
      message: 'Public access allowed.',
    }
  }

  if (!user) {
    return {
      allowed: false,
      accessType: 'member',
      code: 'RESOURCE_UNAUTHORIZED',
      message: 'Authentication required for this resource.',
    }
  }

  return {
    allowed: true,
    accessType: 'member',
    code: 'OK',
    message: 'Member access allowed.',
  }
}
