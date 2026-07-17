import { evaluateResourceAccess } from '@/lib/resources/access'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isValidUuid(value: string) {
  return UUID_PATTERN.test(value)
}

const noStoreHeaders = {
  'Cache-Control': 'no-store',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resourceId: string }> },
) {
  const { resourceId } = await params

  if (!isValidUuid(resourceId)) {
    return NextResponse.json(
      { error: 'Invalid resource id.' },
      { status: 400, headers: noStoreHeaders },
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: accessRow, error: accessError } = await supabase.rpc('get_resource_access_for_download', {
    p_resource_id: resourceId,
  }) as {
    data: {
      id: string
      access_type: 'public' | 'member'
      is_active: boolean
    }[] | null
    error: { message?: string } | null
  }

  if (accessError || !accessRow?.[0]) {
    return NextResponse.json(
      { error: 'Resource unavailable.' },
      { status: 404, headers: noStoreHeaders },
    )
  }

  const accessDecision = evaluateResourceAccess(accessRow[0], user)

  if (!accessDecision.allowed) {
    return NextResponse.json(
      {
        error: accessDecision.code === 'RESOURCE_UNAUTHORIZED' ? 'Unauthorized.' : 'Resource unavailable.',
      },
      {
        status: accessDecision.code === 'RESOURCE_UNAUTHORIZED' ? 401 : 403,
        headers: noStoreHeaders,
      },
    )
  }

  const { data: resourceRecord, error: resourceError } = await supabase
    .from('resources')
    .select('id, storage_bucket, file_path, access_type, is_active')
    .eq('id', resourceId)
    .maybeSingle()

  if (resourceError || !resourceRecord) {
    return NextResponse.json(
      { error: 'Resource unavailable.' },
      { status: 404, headers: noStoreHeaders },
    )
  }

  try {
    const { data: signedData, error: signedError } = await supabase
      .storage
      .from(resourceRecord.storage_bucket)
      .createSignedUrl(resourceRecord.file_path, 60)

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json(
        { error: 'Download unavailable.' },
        { status: 500, headers: noStoreHeaders },
      )
    }

    if (user) {
      const { error: recordError } = await supabase.rpc('record_download_event', {
        p_resource_id: resourceRecord.id,
        p_user_agent: request.headers.get('user-agent') ?? null,
      })

      if (recordError) {
        return NextResponse.json(
          { error: 'Download unavailable.' },
          { status: 500, headers: noStoreHeaders },
        )
      }
    }

    return NextResponse.json(
      { signedUrl: signedData.signedUrl },
      { status: 200, headers: noStoreHeaders },
    )
  } catch {
    return NextResponse.json(
      { error: 'Download unavailable.' },
      { status: 500, headers: noStoreHeaders },
    )
  }
}
