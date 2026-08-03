export const requestAttributionKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'landing_page',
  'referrer',
  'source_post',
] as const

export type RequestAttributionKey =
  (typeof requestAttributionKeys)[number]

export type RequestAttribution = Record<
  RequestAttributionKey,
  string
>

const storageKey = 'bb_request_attribution_v1'
const maxValueLength = 2048

const emptyAttribution: RequestAttribution = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  landing_page: '',
  referrer: '',
  source_post: '',
}

function normalizeValue(value: unknown) {
  return String(value ?? '')
    .trim()
    .slice(0, maxValueLength)
}

function normalizeUrl(value: unknown) {
  const normalized = normalizeValue(value)
  if (!normalized) return ''

  try {
    const url = new URL(normalized)
    url.hash = ''
    return url.toString().slice(0, maxValueLength)
  } catch {
    return normalized
  }
}

function sourcePostFromUrl(url: URL) {
  const explicitSourcePost = normalizeValue(
    url.searchParams.get('source_post'),
  )
  if (explicitSourcePost) return explicitSourcePost

  const match = url.pathname.match(
    /^\/(?:tr|en)\/blog\/([^/?#]+)/i,
  )

  return normalizeValue(match?.[1])
}

function parseStoredAttribution(value: string | null) {
  if (!value) return { ...emptyAttribution }

  try {
    const parsed = JSON.parse(value) as Partial<RequestAttribution>

    return requestAttributionKeys.reduce<RequestAttribution>(
      (result, key) => {
        result[key] = normalizeValue(parsed[key])
        return result
      },
      { ...emptyAttribution },
    )
  } catch {
    return { ...emptyAttribution }
  }
}

export function readStoredRequestAttribution() {
  if (typeof window === 'undefined') {
    return { ...emptyAttribution }
  }

  try {
    return parseStoredAttribution(
      window.sessionStorage.getItem(storageKey),
    )
  } catch {
    return { ...emptyAttribution }
  }
}

export function captureRequestAttribution(args?: {
  href?: string
  referrer?: string
}) {
  if (typeof window === 'undefined' && !args?.href) {
    return { ...emptyAttribution }
  }

  const href = normalizeUrl(
    args?.href ?? window.location.href,
  )
  const referrer = normalizeUrl(
    args?.referrer ??
      (typeof document === 'undefined'
        ? ''
        : document.referrer),
  )
  const stored = readStoredRequestAttribution()

  try {
    const url = new URL(href)
    let referrerUrl: URL | null = null

    try {
      referrerUrl = referrer ? new URL(referrer) : null
    } catch {
      referrerUrl = null
    }

    const queryValue = (key: string) =>
      normalizeValue(
        url.searchParams.get(key) ||
          referrerUrl?.searchParams.get(key),
      )

    const captured: RequestAttribution = {
      utm_source: queryValue('utm_source'),
      utm_medium: queryValue('utm_medium'),
      utm_campaign: queryValue('utm_campaign'),
      utm_content: queryValue('utm_content'),
      landing_page: stored.landing_page || href,
      referrer: stored.referrer || referrer,
      source_post:
        sourcePostFromUrl(url) ||
        (referrerUrl ? sourcePostFromUrl(referrerUrl) : '') ||
        stored.source_post,
    }

    const merged = requestAttributionKeys.reduce<RequestAttribution>(
      (result, key) => {
        result[key] = captured[key] || stored[key]
        return result
      },
      { ...emptyAttribution },
    )

    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(
          storageKey,
          JSON.stringify(merged),
        )
      } catch {
        // Storage may be unavailable in restricted browser contexts.
      }
    }

    return merged
  } catch {
    return stored
  }
}

export function requestAttributionToFormData(
  attribution: RequestAttribution,
) {
  return requestAttributionKeys.reduce<Record<string, string>>(
    (result, key) => {
      result[key] = normalizeValue(attribution[key])
      return result
    },
    {},
  )
}
