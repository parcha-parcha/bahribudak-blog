import type { Lang } from './i18n'

const blogSlugPairs = [
  {
    tr: 'ilmek-boyu-gramaj-kumas-eni-proses-iliskisi',
    en: 'stitch-length-gsm-fabric-width-process-relationship',
  },
] as const

export function getTranslatedPath(pathname: string, fromLang: Lang, toLang: Lang): string {
  const blogPrefix = `/${fromLang}/blog/`

  if (pathname.startsWith(blogPrefix)) {
    const slug = pathname.slice(blogPrefix.length).split('/')[0]
    const pair = blogSlugPairs.find(item => item[fromLang] === slug)

    if (pair) {
      return `/${toLang}/blog/${pair[toLang]}`
    }
  }

  const langPrefix = `/${fromLang}`
  if (pathname === langPrefix) return `/${toLang}`
  if (pathname.startsWith(`${langPrefix}/`)) {
    return `/${toLang}${pathname.slice(langPrefix.length)}`
  }

  return `/${toLang}`
}
