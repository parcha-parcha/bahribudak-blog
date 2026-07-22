import { getDownloadPathAccessLevel } from '@/lib/resources'
import { createClient } from '@/utils/supabase/server'
import { readFile } from 'fs/promises'
import { basename, join, normalize } from 'path'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

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

  try {
    const filename = basename(downloadPath)
    const file = await readFile(join(process.cwd(), 'public', 'downloads', filename))

    return new NextResponse(file, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': getContentType(filename),
      },
    })
  } catch {
    return NextResponse.json({ error: 'Download unavailable.' }, { status: 404 })
  }
}
