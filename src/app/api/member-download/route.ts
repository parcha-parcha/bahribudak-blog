import { findResourceByDownloadPath, getDownloadPathAccessLevel, type ResourceItem } from '@/lib/resources'
import { createClient } from '@/utils/supabase/server'
import { readFile } from 'fs/promises'
import { basename, join, normalize } from 'path'
import { NextResponse, type NextRequest } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const historyCookieName = 'bb_member_download_history'

const contentTypes: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

function getContentType(filename: string) {
  const extension = filename.split('.').pop()?.toLocaleLowerCase('en-US')
  return extension ? contentTypes[extension] ?? 'application/octet-stream' : 'application/octet-stream'
}

function resolveDownloadPath(value: string | null) {
  if (!value || !value.startsWith('/downloads/') || value.includes('..')) return null

  const normalized = normalize(value)
  if (!normalized.startsWith('/downloads/')) return null

  return normalized
}

type CookieHistoryItem = {
  title: string
  fileType: string
  filePath: string
  downloadedAt: string
}

function parseCookieHistory(value: string | undefined) {
  if (!value) return []

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as CookieHistoryItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function buildCookieHistory(
  request: NextRequest,
  resource: ResourceItem | null,
  filename: string,
) {
  if (!resource) return []

  const previous = parseCookieHistory(request.cookies.get(historyCookieName)?.value)
  const nextItem: CookieHistoryItem = {
    title: resource.title.tr,
    fileType: resource.format,
    filePath: filename,
    downloadedAt: new Date().toISOString(),
  }

  return [
    nextItem,
    ...previous.filter((item) => item.filePath !== filename),
  ].slice(0, 10)
}

async function recordMemberDownload(
  supabase: SupabaseClient,
  resource: ResourceItem | null,
  filename: string,
  userId: string,
  userAgent: string | null,
) {
  if (!resource) return

  const { data: resourceRecord } = await supabase
    .from('resources')
    .select('id')
    .eq('file_path', filename)
    .maybeSingle()

  if (resourceRecord?.id) {
    const { error } = await supabase.rpc('record_download_event', {
      p_resource_id: resourceRecord.id,
      p_user_agent: userAgent,
    })

    if (!error) return
  }

  const catalogSnapshot = {
    source: 'catalog',
    title: resource.title.tr,
    fileType: resource.format,
    filePath: filename,
    userAgent,
  }

  await supabase.from('download_events').insert({
    user_id: userId,
    resource_id: null,
    user_agent: `catalog-download:${JSON.stringify(catalogSnapshot)}`,
  })
}

export async function GET(request: NextRequest) {
  const downloadPath = resolveDownloadPath(request.nextUrl.searchParams.get('path'))
  if (!downloadPath) {
    return NextResponse.json({ error: 'Invalid download path.' }, { status: 400 })
  }

  if (getDownloadPathAccessLevel(downloadPath) !== 'member') {
    return NextResponse.json({ error: 'Resource unavailable.' }, { status: 404 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const resource = findResourceByDownloadPath(downloadPath)

  try {
    const filename = basename(downloadPath)
    const file = await readFile(join(process.cwd(), 'public', 'downloads', filename))

    await recordMemberDownload(
      supabase,
      resource,
      filename,
      user.id,
      request.headers.get('user-agent'),
    )

    const response = new NextResponse(file, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': getContentType(filename),
      },
    })
    const cookieHistory = buildCookieHistory(request, resource, filename)

    if (cookieHistory.length > 0) {
      response.cookies.set(historyCookieName, encodeURIComponent(JSON.stringify(cookieHistory)), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 90,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return response
  } catch {
    return NextResponse.json({ error: 'Download unavailable.' }, { status: 404 })
  }
}
