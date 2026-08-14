import { resources } from '@/lib/resources'
import { getAdminRole } from '@/lib/admin-access'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import { get } from '@vercel/blob'
import { basename } from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const noStoreHeaders = {
  'Cache-Control': 'no-store',
}

const contentTypes = {
  PDF: 'application/pdf',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
} as const

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

  if (!assurance || assurance.currentLevel !== 'aal2') {
    return null
  }

  return user
}

export async function GET() {
  const user = await requireSuperAdminAal2()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized.' },
      { status: 401, headers: noStoreHeaders },
    )
  }

  const admin = createAdminClient()
  const { data: migratedRows, error } = await admin
    .from('resources')
    .select('slug, id, file_path, is_active')
    .in('slug', resources.map(item => item.id))

  if (error) {
    return NextResponse.json(
      { error: 'Migration status unavailable.' },
      { status: 500, headers: noStoreHeaders },
    )
  }

  const migratedBySlug = new Map(
    (migratedRows ?? []).map(row => [row.slug, row]),
  )

  return NextResponse.json(
    {
      total: resources.length,
      migrated: migratedBySlug.size,
      pending: resources.length - migratedBySlug.size,
      items: resources.map(item => ({
        slug: item.id,
        title: item.title.tr,
        href: item.href,
        format: item.format,
        migrated: migratedBySlug.has(item.id),
        resourceId: migratedBySlug.get(item.id)?.id ?? null,
        filePath: migratedBySlug.get(item.id)?.file_path ?? null,
      })),
    },
    { status: 200, headers: noStoreHeaders },
  )
}

export async function POST(request: Request) {
  const user = await requireSuperAdminAal2()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized.' },
      { status: 401, headers: noStoreHeaders },
    )
  }

  let body: { slug?: string }
  try {
    body = (await request.json()) as { slug?: string }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400, headers: noStoreHeaders },
    )
  }

  const item = resources.find(resource => resource.id === body.slug)
  if (!item) {
    return NextResponse.json(
      { error: 'Unknown resource.' },
      { status: 404, headers: noStoreHeaders },
    )
  }

  const filename = basename(item.href)
  const targetPath = `catalog/${item.id}/${filename}`
  const admin = createAdminClient()

  try {
    const blobResult = await get(`downloads/${filename}`, {
      access: 'private',
    })

    if (!blobResult || blobResult.statusCode !== 200) {
      return NextResponse.json(
        { error: 'Source file unavailable in Vercel Blob.' },
        { status: 404, headers: noStoreHeaders },
      )
    }

    const sourceResponse = new Response(blobResult.stream)
    const fileBytes = await sourceResponse.arrayBuffer()
    const contentType =
      blobResult.blob.contentType || contentTypes[item.format]

    const { error: uploadError } = await admin.storage
      .from('technical-resources')
      .upload(targetPath, fileBytes, {
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

    const { data: resourceRow, error: resourceError } = await admin
      .from('resources')
      .upsert(
        {
          slug: item.id,
          title: item.title.tr,
          description: item.description.tr,
          storage_bucket: 'technical-resources',
          file_path: targetPath,
          file_type: contentType,
          access_type: 'member',
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' },
      )
      .select('id, slug, file_path')
      .single()

    if (resourceError || !resourceRow) {
      return NextResponse.json(
        { error: 'Resource record upsert failed.' },
        { status: 500, headers: noStoreHeaders },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        slug: resourceRow.slug,
        resourceId: resourceRow.id,
        filePath: resourceRow.file_path,
        sourcePath: item.href,
      },
      { status: 200, headers: noStoreHeaders },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Migration failed.'
    return NextResponse.json(
      { error: message },
      { status: 500, headers: noStoreHeaders },
    )
  }
}
