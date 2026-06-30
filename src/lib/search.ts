import { getAllPosts, getPost } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'

export interface SiteSearchResult {
  type: 'post' | 'page'
  title: string
  excerpt: string
  href: string
  category: string
  date?: string
  readingTime?: string
  score: number
}

interface StaticPageEntry {
  title: string
  excerpt: string
  href: string
  keywords: string
}

const staticPages: Record<Lang, StaticPageEntry[]> = {
  tr: [
    {
      title: 'Ana Sayfa',
      excerpt: 'Tekstil proses danışmanlığı, eğitim ve teknik dokümantasyon.',
      href: '',
      keywords: 'örgü boyama boya boyahane apre terbiye danışmanlık tekstil proses kalite',
    },
    {
      title: 'Teknik Yayınlar ve Blog',
      excerpt: 'Boyahane, terbiye, kalite kontrol, üretim yönetimi ve teknik dokümantasyon yayınları.',
      href: '/blog',
      keywords: 'blog makale teknik yazı yayın örgü boyama apre tekstil',
    },
    {
      title: 'Hakkımda',
      excerpt: 'Bahri Budak’ın tekstil üretimi, boyahane, terbiye ve fabrika yönetimi deneyimi.',
      href: '/about',
      keywords: 'bahri budak özgeçmiş deneyim uzmanlık kariyer',
    },
    {
      title: 'Hizmetler',
      excerpt: 'Boyahane proses danışmanlığı, teknik eğitim ve doküman sistemi hizmetleri.',
      href: '/hizmetler',
      keywords: 'danışmanlık eğitim proses reçete kalite boyahane apre terbiye',
    },
    {
      title: 'Haberler',
      excerpt: 'Tekstil sektörü ve üretim dünyasına ilişkin güncel haberler.',
      href: '/haberler',
      keywords: 'haber gündem tekstil sektör üretim',
    },
    {
      title: 'Teknik Şablonlar',
      excerpt: 'Proses formları, kontrol listeleri, eğitim notları ve teknik dokümanlar.',
      href: '/magazam',
      keywords: 'şablon form kontrol listesi eğitim notu doküman reçete excel pdf',
    },
    {
      title: 'Proses Formları',
      excerpt: 'Boyama ve terbiye proseslerinin takibi için saha kullanımlı formlar.',
      href: '/proses-formlari',
      keywords: 'proses form boyama reçete kontrol takip vardiya kalite',
    },
    {
      title: 'İletişim',
      excerpt: 'Tekstil danışmanlığı, eğitim ve teknik doküman çalışmaları için iletişim.',
      href: '/contact',
      keywords: 'iletişim danışmanlık teklif eğitim',
    },
  ],
  en: [
    {
      title: 'Home',
      excerpt: 'Textile process consulting, training and technical documentation.',
      href: '',
      keywords: 'knitting dyeing finishing dyehouse consulting textile process quality',
    },
    {
      title: 'Technical Publications and Blog',
      excerpt: 'Field-based publications on dyehouse, finishing, quality control and production management.',
      href: '/blog',
      keywords: 'blog article technical publication knitting dyeing finishing textile',
    },
    {
      title: 'About',
      excerpt: 'Bahri Budak’s experience in textile production, dyehouse, finishing and factory management.',
      href: '/about',
      keywords: 'bahri budak profile experience expertise career',
    },
    {
      title: 'Services',
      excerpt: 'Dyehouse process consulting, technical training and documentation systems.',
      href: '/hizmetler',
      keywords: 'consulting training process recipe quality dyehouse finishing',
    },
    {
      title: 'News',
      excerpt: 'Current developments in the textile sector and production world.',
      href: '/haberler',
      keywords: 'news agenda textile sector production',
    },
    {
      title: 'Technical Templates',
      excerpt: 'Process forms, checklists, training notes and technical documents.',
      href: '/magazam',
      keywords: 'template form checklist training document recipe excel pdf',
    },
    {
      title: 'Process Forms',
      excerpt: 'Field-ready forms for monitoring dyeing and finishing processes.',
      href: '/proses-formlari',
      keywords: 'process form dyeing recipe control monitoring shift quality',
    },
    {
      title: 'Contact',
      excerpt: 'Contact for textile consulting, training and technical documentation.',
      href: '/contact',
      keywords: 'contact consulting proposal training',
    },
  ],
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreText(
  normalizedQuery: string,
  tokens: string[],
  fields: Array<{ value: string; weight: number }>,
): number {
  let score = 0
  let combined = ''

  for (const field of fields) {
    const normalizedField = normalize(field.value)
    combined += ` ${normalizedField}`

    if (normalizedField.includes(normalizedQuery)) {
      score += 12 * field.weight
    }

    for (const token of tokens) {
      if (normalizedField.includes(token)) score += field.weight
    }
  }

  const normalizedCombined = combined.trim()
  if (!tokens.every((token) => normalizedCombined.includes(token))) return 0

  return score
}

export function searchSite(lang: Lang, rawQuery: string): SiteSearchResult[] {
  const normalizedQuery = normalize(rawQuery)
  if (!normalizedQuery) return []

  const tokens = normalizedQuery.split(' ').filter((token) => token.length > 1)
  if (tokens.length === 0) return []

  const pageResults: SiteSearchResult[] = staticPages[lang]
    .map((page) => {
      const score = scoreText(normalizedQuery, tokens, [
        { value: page.title, weight: 8 },
        { value: page.excerpt, weight: 4 },
        { value: page.keywords, weight: 3 },
      ])

      return {
        type: 'page' as const,
        title: page.title,
        excerpt: page.excerpt,
        href: `/${lang}${page.href}`,
        category: lang === 'tr' ? 'Site Sayfası' : 'Site Page',
        score,
      }
    })
    .filter((result) => result.score > 0)

  const postResults: SiteSearchResult[] = getAllPosts(lang)
    .map((post) => {
      const fullPost = getPost(lang, post.slug)
      const content = fullPost?.content ?? ''
      const score = scoreText(normalizedQuery, tokens, [
        { value: post.title, weight: 10 },
        { value: post.tags.join(' '), weight: 7 },
        { value: post.excerpt, weight: 5 },
        { value: post.category, weight: 3 },
        { value: post.slug, weight: 2 },
        { value: content, weight: 1 },
      ])

      return {
        type: 'post' as const,
        title: post.title,
        excerpt: post.excerpt,
        href: `/${lang}/blog/${post.slug}`,
        category: post.category,
        date: post.date,
        readingTime: post.readingTime,
        score,
      }
    })
    .filter((result) => result.score > 0)

  return [...postResults, ...pageResults].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (a.type !== b.type) return a.type === 'post' ? -1 : 1
    return (b.date ?? '').localeCompare(a.date ?? '')
  })
}
