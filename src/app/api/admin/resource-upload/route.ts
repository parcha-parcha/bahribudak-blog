import { resources } from '@/lib/resources'
import { getAdminRole } from '@/lib/admin-access'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import { basename } from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_FILE_SIZE = 25 * 1024 * 1024
const noStoreHeaders = { 'Cache-Control': 'no-store' }

const contentTypes = {
  PDF: 'application/pdf',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
} as const

function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false

  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

async function requireSuperAdminAal2() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const role = await getAdminRole(user.id, user.email)
  if (role !== 'super_admin') return null

  const { data: assurance } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (!assurance || assurance.currentLevel !== 'aal2') return null
  return user
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      { status: 403, headers: noStoreHeaders },
    )
  }

  const user = await requireSuperAdminAal2()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized.' },
      { status: 401, headers: noStoreHeaders },
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json(
      { error: 'Invalid upload request.' },
      { status: 400, headers: noStoreHeaders },
    )
  }

  const slug = String(form.get('slug') || '')
  const file = form.get('file')
  const resource = resources.find(item => item.id === slug)

  if (!resource || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'Unknown resource or missing file.' },
      { status: 400, headers: noStoreHeaders },
    )
  }

  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File size is outside the allowed range.' },
      { status: 400, headers: noStoreHeaders },
    )
  }

  const expectedFilename = basename(resource.href)
  if (file.name !== expectedFilename) {
    return NextResponse.json(
      { error: `Expected filename: ${expectedFilename}` },
      { status: 400, headers: noStoreHeaders },
    )
  }

  const contentType = contentTypes[resource.format]
  const targetPath = `catalog/${resource.id}/${expectedFilename}`
  const bytes = await file.arrayBuffer()
  const admin = createAdminClient()

  const { error: uploadError } = await admin.storage
    .from('technical-resources')
    .upload(targetPath, bytes, {
      contentType,
      cacheControl: '3600',
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json(
      { error: `Storage upload failed: ${uploadError.message}` },
      { status: 500, headers: noStoreHeaders },
    )
  }

  const { error: upsertError } = await admin
    .from('resources')
    .upsert(
      {
        slug: resource.id,
        title: resource.title.tr,
        description: resource.description.tr,
        storage_bucket: 'technical-resources',
        file_path: targetPath,
        file_type: contentType,
        access_type: 'member',
        is_active: true,
      },
      { onConflict: 'slug' },
    )

  if (upsertError) {
    return NextResponse.json(
      { error: `Resource record upsert failed: ${upsertError.message}` },
      { status: 500, headers: noStoreHeaders },
    )
  }

  const { data: row, error: selectError } = await admin
    .from('resources')
    .select('id, slug, file_path')
    .eq('slug', resource.id)
    .maybeSingle()

  if (selectError || !row) {
    return NextResponse.json(
      { error: 'Resource verification failed.' },
      { status: 500, headers: noStoreHeaders },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      resourceId: row.id,
      slug: row.slug,
      filePath: row.file_path,
    },
    { status: 200, headers: noStoreHeaders },
  )
}
