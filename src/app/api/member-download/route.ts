import {
  findResourceByDownloadPath,
  getDownloadPathAccessLevel,
  type ResourceItem,
} from '@/lib/resources'
import { authPath } from '@/lib/auth'
import {
  createDownloadDedupeKey,
  enqueueAndSendBbEvent,
} from '@/lib/bb-event-notifications'
import { createClient } from '@/utils/supabase/server'
import { isSupabaseConfigured } from '@/utils/supabase/env'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { get } from '@vercel/blob'
import { basename, posix } from 'path'
import {
  NextResponse,
  type NextRequest,
} from 'next/server'

export const runtime = 'nodejs'

const historyCookieName =
  'bb_member_download_history'

const contentTypes: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

function getContentType(filename: string) {
  const extension = filename
    .split('.')
    .pop()
    ?.toLocaleLowerCase('en-US')

  return extension
    ? contentTypes[extension] ??
        'application/octet-stream'
    : 'application/octet-stream'
}

function getFileType(filename: string) {
  return (
    filename
      .split('.')
      .pop()
      ?.toLocaleUpperCase('en-US') ?? 'FILE'
  )
}

function resolveDownloadPath(value: string | null) {
  if (
    !value ||
    !value.startsWith('/downloads/') ||
    value.includes('..')
  ) {
    return null
  }

  const normalized = posix.normalize(value)

  if (!normalized.startsWith('/downloads/')) {
    return null
  }

  return normalized
}

function resolveLang(request: NextRequest) {
  const referer = request.headers.get('referer')

  if (referer) {
    try {
      const refererPath = new URL(referer).pathname

      if (refererPath.startsWith('/en')) {
        return 'en'
      }
    } catch {
      return 'tr'
    }
  }

  return 'tr'
}

function redirectToLogin(
  request: NextRequest,
  nextPath: string,
) {
  const url = request.nextUrl.clone()

  url.pathname = authPath(
    resolveLang(request),
    'login',
  )
  url.search = ''
  url.searchParams.set('next', nextPath)

  return NextResponse.redirect(url)
}

type CookieHistoryItem = {
  title: string
  fileType: string
  filePath: string
  downloadedAt: string
}

function parseCookieHistory(
  value: string | undefined,
) {
  if (!value) return []

  try {
    const parsed = JSON.parse(
      decodeURIComponent(value),
    ) as CookieHistoryItem[]

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
  const previous = parseCookieHistory(
    request.cookies.get(historyCookieName)?.value,
  )

  const nextItem: CookieHistoryItem = {
    title: resource?.title.tr ?? filename,
    fileType:
      resource?.format ?? getFileType(filename),
    filePath: filename,
    downloadedAt: new Date().toISOString(),
  }

  return [
    nextItem,
    ...previous.filter(
      item => item.filePath !== filename,
    ),
  ].slice(0, 10)
}

async function recordMemberActivity(
  supabase: SupabaseClient,
  resourceId: string | null,
  resource: ResourceItem | null,
  filename: string,
) {
  await supabase.rpc('record_member_activity', {
    p_event_type: 'publication_download',
    p_resource_id: resourceId,
    p_publication_slug: null,
    p_path: ['/downloads', filename].join('/'),
    p_source: 'member-download',
    p_metadata: {
      title: resource?.title.tr ?? filename,
      file_type:
        resource?.format ?? getFileType(filename),
    },
  })
}

async function recordMemberDownload(
  supabase: SupabaseClient,
  resource: ResourceItem | null,
  filename: string,
  userId: string,
  userAgent: string | null,
) {
  let resourceId: string | null = null
  let downloadRecorded = false

  if (resource) {
    const { data: resourceRecord } =
      await supabase
        .from('resources')
        .select('id')
        .eq('slug', resource.id)
        .maybeSingle()

    resourceId = resourceRecord?.id ?? null

    if (resourceId) {
      const { error } = await supabase.rpc(
        'record_download_event',
        {
          p_resource_id: resourceId,
          p_user_agent: userAgent,
        },
      )

      downloadRecorded = !error
    }
  }

  if (!downloadRecorded) {
    const catalogSnapshot = {
      source: 'catalog',
      title: resource?.title.tr ?? filename,
      fileType:
        resource?.format ?? getFileType(filename),
      filePath: filename,
      userAgent,
    }

    await supabase
      .from('download_events')
      .insert({
        user_id: userId,
        resource_id: null,
        user_agent: `catalog-download:${JSON.stringify(
          catalogSnapshot,
        )}`,
      })
  }

  await recordMemberActivity(
    supabase,
    resourceId,
    resource,
    filename,
  )
}

async function buildDownloadResponse({
  request,
  supabase,
  resource,
  filename,
  user,
  body,
  contentType,
  source,
}: {
  request: NextRequest
  supabase: SupabaseClient
  resource: ResourceItem | null
  filename: string
  user: User
  body: BodyInit
  contentType: string
  source: 'supabase-storage' | 'vercel-blob'
}) {
  await recordMemberDownload(
    supabase,
    resource,
    filename,
    user.id,
    request.headers.get('user-agent'),
  )

  const downloadPath = `/downloads/${filename}`
  const notificationResult = await enqueueAndSendBbEvent({
    eventType: 'publication_download',
    dedupeKey: createDownloadDedupeKey({
      userId: user.id,
      resourcePath: downloadPath,
    }),
    userId: user.id,
    email: user.email,
    resourcePath: downloadPath,
    resourceTitle: resource?.title.tr ?? filename,
    metadata: {
      file_type: resource?.format ?? getFileType(filename),
      source,
    },
  })

  if ('notificationFailed' in notificationResult) {
    console.warn('Download completed but notification failed', {
      eventId: notificationResult.eventId,
    })
  }

  const response = new NextResponse(body, {
    status: 200,
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': contentType,
    },
  })

  const cookieHistory =
    buildCookieHistory(
      request,
      resource,
      filename,
    )

  if (cookieHistory.length > 0) {
    response.cookies.set(
      historyCookieName,
      encodeURIComponent(
        JSON.stringify(cookieHistory),
      ),
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 90,
        path: '/',
        sameSite: 'lax',
        secure:
          process.env.NODE_ENV ===
          'production',
      },
    )
  }

  return response
}

export async function GET(
  request: NextRequest,
) {
  const downloadPath = resolveDownloadPath(
    request.nextUrl.searchParams.get('path'),
  )

  if (!downloadPath) {
    return NextResponse.json(
      {
        error: 'Invalid download path.',
      },
      {
        status: 400,
      },
    )
  }

  const accessLevel =
    getDownloadPathAccessLevel(downloadPath)

  if (!accessLevel) {
    return NextResponse.json(
      {
        error: 'Resource unavailable.',
      },
      {
        status: 404,
      },
    )
  }

  const resource =
    findResourceByDownloadPath(downloadPath)

  if (!isSupabaseConfigured()) {
    return redirectToLogin(
      request,
      downloadPath,
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirectToLogin(
      request,
      downloadPath,
    )
  }

  try {
    const filename = basename(downloadPath)

    if (resource) {
      const { data: migratedResource } = await supabase
        .from('resources')
        .select('id, storage_bucket, file_path, file_type, is_active')
        .eq('slug', resource.id)
        .eq('is_active', true)
        .maybeSingle()

      if (migratedResource) {
        const { data: storedFile, error: storageError } = await supabase.storage
          .from(migratedResource.storage_bucket)
          .download(migratedResource.file_path)

        if (!storageError && storedFile) {
          return buildDownloadResponse({
            request,
            supabase,
            resource,
            filename,
            user,
            body: storedFile,
            contentType: migratedResource.file_type || getContentType(filename),
            source: 'supabase-storage',
          })
        }
      }
    }

    const blobResult = await get(`downloads/${filename}`, {
      access: 'private',
    })

    if (!blobResult || blobResult.statusCode !== 200) {
      return NextResponse.json(
        {
          error: 'Download unavailable.',
        },
        {
          status: 404,
        },
      )
    }

    return buildDownloadResponse({
      request,
      supabase,
      resource,
      filename,
      user,
      body: blobResult.stream,
      contentType:
        blobResult.blob.contentType ??
        getContentType(filename),
      source: 'vercel-blob',
    })
  } catch {
    return NextResponse.json(
      {
        error: 'Download unavailable.',
      },
      {
        status: 404,
      },
    )
  }
}
