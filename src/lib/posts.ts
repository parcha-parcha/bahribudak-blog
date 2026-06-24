import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Lang } from './i18n'

const contentDir = path.join(process.cwd(), 'src/content')

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
    content,
  }
}

export function getAllPosts(lang: Lang): PostMeta[] {
  const langDir = path.join(contentDir, lang)

  if (!fs.existsSync(langDir)) return []

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))

  return files
    .map(filename => parsePostFile(lang, filename))
    .filter(post => post.category !== 'felsefe')
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(lang: Lang, category: string): PostMeta[] {
  return getAllPosts(lang).filter(post => post.category === normalizeCategory(category))
}

export function getPost(lang: Lang, slug: string): Post | null {
  const mdx = path.join(contentDir, lang, `${slug}.mdx`)
  const md = path.join(contentDir, lang, `${slug}.md`)
  const target = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null

  if (!target) return null

  const post = parsePostFile(lang, path.basename(target))
  return post.category === 'felsefe' ? null : post
}

export function getAllSlugs(lang: Lang): string[] {
  const langDir = path.join(contentDir, lang)
  if (!fs.existsSync(langDir)) return []

  return fs
    .readdirSync(langDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .filter(filename => parsePostFile(lang, filename).category !== 'felsefe')
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}
