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

export function getAllPosts(lang: Lang): PostMeta[] {
  const langDir = path.join(contentDir, lang)

  if (!fs.existsSync(langDir)) return []

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.(mdx|md)$/, '')
    const filePath = path.join(langDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      category: data.category || 'kisisel-gelisim',
      tags: data.tags || [],
      readingTime: Math.ceil(rt.minutes).toString(),
      lang,
      coverImage: data.coverImage || null,
    } as PostMeta
  })

  const hiddenCategories = ['felsefe', 'philosophy']

  return posts
    .filter((p) => !hiddenCategories.includes(String(p.category).toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(lang: Lang, category: string): PostMeta[] {
  return getAllPosts(lang).filter(p => p.category === category)
}

export function getPost(lang: Lang, slug: string): Post | null {
  const filePath = path.join(contentDir, lang, `${slug}.mdx`)
  const fallback = path.join(contentDir, lang, `${slug}.md`)

  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!target) return null

  const raw = fs.readFileSync(target, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: data.category || 'kisisel-gelisim',
    tags: data.tags || [],
    readingTime: Math.ceil(rt.minutes).toString(),
    lang,
    coverImage: data.coverImage || null,
    content,
  }
}

export function getAllSlugs(lang: Lang): string[] {
  const langDir = path.join(contentDir, lang)
  if (!fs.existsSync(langDir)) return []
  return fs
    .readdirSync(langDir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}

function normalizeValue(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function getRelatedPosts(lang: Lang, slug: string, limit = 3): PostMeta[] {
  const current = getPost(lang, slug)
  if (!current) return []

  const currentCategory = normalizeValue(current.category)
  const currentTags = new Set(current.tags.map(tag => normalizeValue(tag)))

  return getAllPosts(lang)
    .filter(post => post.slug !== slug)
    .map(post => {
      const sameCategory = normalizeValue(post.category) === currentCategory
      const sharedTags = post.tags.reduce(
        (count, tag) => count + (currentTags.has(normalizeValue(tag)) ? 1 : 0),
        0
      )

      return {
        post,
        score: sharedTags * 3 + (sameCategory ? 2 : 0),
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })
    .slice(0, limit)
    .map(item => item.post)
}

