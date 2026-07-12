import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import type { Lang } from './i18n'

const contentDir = path.join(process.cwd(), 'src/content')

export type ProcessArea = 'orgu' | 'boya' | 'apre'
export type DocumentStatus = 'current' | 'archive'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  readingTime: string
  lang: Lang
  coverImage?: string
  technicalPublication?: boolean
  processArea?: ProcessArea
  documentCode?: string
  revision?: string
  revisionDate?: string
  documentStatus?: DocumentStatus
  standards?: string[]
}

export interface Post extends PostMeta {
  content: string
}

function categoryKey(value: unknown): string {
  return String(value || '')
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function dateValue(value: string): number {
  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function normalizeCategory(value: unknown): string {
  const key = categoryKey(value)

  const aliases: Record<string, string> = {
    tekstil: 'tekstil',
    'tekstil-ve-teknik-yayinlar': 'tekstil',
    'uretim-ve-kalite': 'uretim-yonetim',
    'uretim-ve-yonetim': 'uretim-yonetim',
    'uretim-ve-yonetim-sistemleri': 'uretim-yonetim',
    'kisisel-gelisim': 'kisisel-gelisim',
    'turkiye-gundemi': 'sektorel-analiz',
    dunya: 'sektorel-analiz',
    'sektorel-ve-guncel-analizler': 'sektorel-analiz',
    felsefe: 'felsefe',
    philosophy: 'felsefe',
  }

  return aliases[key] || 'tekstil'
}

export function normalizeProcessArea(
  value: unknown,
): ProcessArea | undefined {
  const key = categoryKey(value)

  const aliases: Record<string, ProcessArea> = {
    orgu: 'orgu',
    knitting: 'orgu',
    boya: 'boya',
    dyeing: 'boya',
    apre: 'apre',
    finishing: 'apre',
  }

  return aliases[key]
}

export function normalizeDocumentStatus(
  value: unknown,
): DocumentStatus | undefined {
  const key = categoryKey(value)

  const aliases: Record<string, DocumentStatus> = {
    current: 'current',
    active: 'current',
    guncel: 'current',
    published: 'current',
    valid: 'current',
    archive: 'archive',
    archived: 'archive',
    arsiv: 'archive',
    obsolete: 'archive',
    superseded: 'archive',
    withdrawn: 'archive',
  }

  return aliases[key]
}

export function resolveDocumentStatus(
  status: DocumentStatus | undefined,
): DocumentStatus {
  return status === 'archive' ? 'archive' : 'current'
}

export function processAreaLabel(
  area: ProcessArea | undefined,
  lang: Lang,
): string {
  if (!area) return ''

  const labels: Record<ProcessArea, Record<Lang, string>> = {
    orgu: {
      tr: 'Örgü / Knitting',
      en: 'Knitting / Örgü',
    },
    boya: {
      tr: 'Boya / Dyeing',
      en: 'Dyeing / Boya',
    },
    apre: {
      tr: 'Apre / Finishing',
      en: 'Finishing / Apre',
    },
  }

  return labels[area][lang]
}

export function documentStatusLabel(
  status: DocumentStatus | undefined,
  lang: Lang,
): string {
  const resolvedStatus = resolveDocumentStatus(status)

  if (resolvedStatus === 'archive') {
    return lang === 'tr' ? 'Arşiv' : 'Archive'
  }

  return lang === 'tr' ? 'Güncel' : 'Current'
}

function parsePostFile(lang: Lang, filename: string): Post {
  const slug = filename.replace(/\.(mdx|md)$/, '')
  const filePath = path.join(contentDir, lang, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: normalizeCategory(data.category),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: Math.ceil(rt.minutes).toString(),
    lang,
    coverImage: data.coverImage || undefined,
    technicalPublication: Boolean(data.technicalPublication),
    processArea: normalizeProcessArea(data.processArea),
    documentCode: data.documentCode || undefined,
    revision: data.revision || undefined,
    revisionDate: data.revisionDate || undefined,
    documentStatus: normalizeDocumentStatus(data.documentStatus),
    standards: Array.isArray(data.standards) ? data.standards : [],
    content,
  }
}

export function getAllPosts(lang: Lang): PostMeta[] {
  const langDir = path.join(contentDir, lang)

  if (!fs.existsSync(langDir)) return []

  const files = fs
    .readdirSync(langDir)
    .filter(
      filename =>
        filename.endsWith('.mdx') || filename.endsWith('.md'),
    )

  return files
    .map(filename => parsePostFile(lang, filename))
    .filter(post => post.category !== 'felsefe')
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => dateValue(b.date) - dateValue(a.date))
}

export function getPostsByCategory(
  lang: Lang,
  category: string,
): PostMeta[] {
  return getAllPosts(lang).filter(
    post => post.category === normalizeCategory(category),
  )
}

export function getPostsByProcessArea(
  lang: Lang,
  processArea: string,
): PostMeta[] {
  const normalized = normalizeProcessArea(processArea)

  if (!normalized) return []

  return getAllPosts(lang).filter(
    post => post.processArea === normalized,
  )
}

export function getPost(
  lang: Lang,
  slug: string,
): Post | null {
  const mdx = path.join(contentDir, lang, `${slug}.mdx`)
  const md = path.join(contentDir, lang, `${slug}.md`)

  const target = fs.existsSync(mdx)
    ? mdx
    : fs.existsSync(md)
      ? md
      : null

  if (!target) return null

  const post = parsePostFile(lang, path.basename(target))

  return post.category === 'felsefe' ? null : post
}

export function getAllSlugs(lang: Lang): string[] {
  const langDir = path.join(contentDir, lang)

  if (!fs.existsSync(langDir)) return []

  return fs
    .readdirSync(langDir)
    .filter(
      filename =>
        filename.endsWith('.mdx') || filename.endsWith('.md'),
    )
    .filter(
      filename =>
        parsePostFile(lang, filename).category !== 'felsefe',
    )
    .map(filename => filename.replace(/\.(mdx|md)$/, ''))
}

function normalizeTag(value: string): string {
  return categoryKey(value)
}

export function getRelatedPosts(
  lang: Lang,
  currentSlug: string,
  limit = 3,
): PostMeta[] {
  const currentPost = getPost(lang, currentSlug)

  if (!currentPost || limit <= 0) return []

  const currentTags = new Set(
    currentPost.tags.map(normalizeTag).filter(Boolean),
  )

  return getAllPosts(lang)
    .filter(candidate => candidate.slug !== currentSlug)
    .map(candidate => {
      let score = 0

      if (
        candidate.processArea &&
        candidate.processArea === currentPost.processArea
      ) {
        score += 6
      }

      if (candidate.category === currentPost.category) {
        score += 4
      }

      const sharedTagCount = candidate.tags
        .map(normalizeTag)
        .filter(tag => tag && currentTags.has(tag)).length

      score += sharedTagCount * 3

      if (
        candidate.technicalPublication ===
        currentPost.technicalPublication
      ) {
        score += 1
      }

      return {
        candidate,
        score,
      }
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      return (
        dateValue(b.candidate.date) -
        dateValue(a.candidate.date)
      )
    })
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}