import { checkRateLimit } from '@/lib/rate-limit'
import {
  getRequestIp,
  isSameOriginRequest,
} from '@/lib/request-security'
import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'

type SubmissionBody = Record<string, unknown>

function text(
  value: unknown,
  maxLength: number,
) {
  return typeof value === 'string'
    ? value.trim().slice(0, maxLength)
    : ''
}

function isValidEmail(value: string) {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  )
}

function normalizeReferenceUrl(value: string) {
  if (!value) return ''

  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.toString()
      : ''
  } catch {
    return ''
  }
}

function json(
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = {},
) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  })
}

async function sendFormspreeNotification(args: {
  lang: 'tr' | 'en'
  name: string
  email: string
  company: string
  role: string
  requestType: string
  processArea: string
  problemCategory: string
  frequency: string
  supportPreference: string
  subject: string
  message: string
  referenceUrl: string
  source: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  landingPage: string
  referrer: string
  sourcePost: string
}) {
  const form = new FormData()

  form.set(
    '_subject',
    args.lang === 'tr'
      ? 'bahribudak.com yeni teknik talep'
      : 'bahribudak.com new technical request',
  )
  form.set('language', args.lang)
  form.set('source', args.source)
  form.set('name', args.name)
  form.set('email', args.email)
  form.set('company', args.company)
  form.set('role', args.role)
  form.set('requestType', args.requestType)
  form.set('processArea', args.processArea)
  form.set('problemCategory', args.problemCategory)
  form.set('frequency', args.frequency)
  form.set('supportPreference', args.supportPreference)
  form.set('subject', args.subject)
  form.set('message', args.message)
  form.set('referenceUrl', args.referenceUrl)
  form.set('utm_source', args.utmSource)
  form.set('utm_medium', args.utmMedium)
  form.set('utm_campaign', args.utmCampaign)
  form.set('utm_content', args.utmContent)
  form.set('landing_page', args.landingPage)
  form.set('referrer', args.referrer)
  form.set('source_post', args.sourcePost)

  const response = await fetch(
    'https://formspree.io/f/xkoypknn',
    {
      method: 'POST',
      body: form,
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(6_000),
    },
  )

  if (!response.ok) {
    throw new Error(
      `Formspree notification failed (${response.status})`,
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return json(
      { error: 'İstek kaynağı doğrulanamadı.' },
      403,
    )
  }

  let body: SubmissionBody

  try {
    body = (await request.json()) as SubmissionBody
  } catch {
    return json({ error: 'Geçersiz istek gövdesi.' }, 400)
  }

  if (text(body._gotcha, 200)) {
    return json({ ok: true })
  }

  const ip = getRequestIp(request)
  const rateLimit = await checkRateLimit({
    key: `rate-limit:technical-request:${ip}`,
    limit: 5,
    windowSeconds: 60 * 60,
  })

  if (rateLimit.limited) {
    return json(
      { error: 'Çok fazla talep gönderildi.' },
      429,
      { 'Retry-After': '3600' },
    )
  }

  const lang = body.language === 'en' ? 'en' : 'tr'
  const source = `/${lang}/contact`
  const name = text(body.name, 120)
  const email = text(body.email, 254).toLowerCase()
  const company = text(body.company, 160)
  const role = text(body.role, 160)
  const requestType = text(body.requestType, 160)
  const processArea = text(body.processArea, 160)
  const problemCategory = text(body.problemCategory, 160)
  const frequency = text(body.frequency, 160)
  const supportPreference = text(body.supportPreference, 160)
  const subject = text(body.subject, 200)
  const message = text(body.message, 3_000)
  const rawReferenceUrl = text(body.referenceUrl, 500)
  const referenceUrl = normalizeReferenceUrl(rawReferenceUrl)
  const utmSource = text(body.utm_source, 2_048)
  const utmMedium = text(body.utm_medium, 2_048)
  const utmCampaign = text(body.utm_campaign, 2_048)
  const utmContent = text(body.utm_content, 2_048)
  const landingPage = normalizeReferenceUrl(
    text(body.landing_page, 2_048),
  )
  const referrer = normalizeReferenceUrl(
    text(body.referrer, 2_048),
  )
  const sourcePost = text(body.source_post, 2_048)
  const consentAccepted = body.consent === 'accepted'

  if (
    !name ||
    !isValidEmail(email) ||
    !requestType ||
    !processArea ||
    !problemCategory ||
    !frequency ||
    !supportPreference ||
    !subject ||
    !message ||
    !consentAccepted ||
    (rawReferenceUrl && !referenceUrl)
  ) {
    return json(
      { error: 'Zorunlu alanlar geçersiz veya eksik.' },
      400,
    )
  }

  try {
    const admin = createAdminClient()
    const { error: databaseError } = await admin.rpc(
      'submit_public_technical_request',
      {
        p_email: email,
        p_full_name: name,
        p_company_name: company,
        p_role_title: role,
        p_request_type: requestType,
        p_process_area: processArea,
        p_problem_category: problemCategory,
        p_occurrence_frequency: frequency,
        p_support_preference: supportPreference,
        p_subject: subject,
        p_message: message,
        p_reference_url: referenceUrl,
        p_language: lang,
        p_source: source,
        p_consent_accepted: consentAccepted,
        p_utm_source: utmSource,
        p_utm_medium: utmMedium,
        p_utm_campaign: utmCampaign,
        p_utm_content: utmContent,
        p_landing_page: landingPage,
        p_referrer: referrer,
        p_source_post: sourcePost,
      },
    )

    if (databaseError) throw databaseError
  } catch (error) {
    console.error('Technical request database insert failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return json(
      { error: 'Teknik talep kaydedilemedi.' },
      500,
    )
  }

  try {
    await sendFormspreeNotification({
      lang,
      name,
      email,
      company,
      role,
      requestType,
      processArea,
      problemCategory,
      frequency,
      supportPreference,
      subject,
      message,
      referenceUrl,
      source,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      landingPage,
      referrer,
      sourcePost,
    })
  } catch (error) {
    console.error('Technical request notification failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  return json({ ok: true })
}
