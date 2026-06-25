import type { Lang } from './i18n'

const blogSlugPairs = [
  {
    tr: 'ilmek-boyu-gramaj-kumas-eni-proses-iliskisi',
    en: 'stitch-length-gsm-fabric-width-process-relationship',
  },
] as const

/**
 * Returns the canonical slug for the requested language when the supplied
 * slug belongs to a known Turkish/English publication pair.
 */
export function resolveBlogSlugForLang(slug: string, toLang: Lang): string | null {
  const pair = blogSlugPairs.find(item => item.tr === slug || item.en === slug)
  return pair ? pair[toLang] : null
}

export function getTranslatedPath(pathname: string, fromLang: Lang, toLang: Lang): string {
  const cleanPathname = pathname.split('?')[0].replace(/\/+$/, '') || `/${fromLang}`
  const blogPrefix = `/${fromLang}/blog/`

  if (cleanPathname.startsWith(blogPrefix)) {
    const slug = cleanPathname.slice(blogPrefix.length).split('/')[0]
    const translatedSlug = resolveBlogSlugForLang(slug, toLang)

    if (translatedSlug) {
      return `/${toLang}/blog/${translatedSlug}`
    }

    // Unknown article slugs should fall back to the target-language
    // publication index instead of producing a 404 page.
    return `/${toLang}/blog`
  }

  const langPrefix = `/${fromLang}`
  if (cleanPathname === langPrefix) return `/${toLang}`
  if (cleanPathname.startsWith(`${langPrefix}/`)) {
    return `/${toLang}${cleanPathname.slice(langPrefix.length)}`
  }

  return `/${toLang}`
}
