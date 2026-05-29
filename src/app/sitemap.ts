import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak-blog.vercel.app'
const langs: Lang[] = ['tr', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/tr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/tr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const postPages: MetadataRoute.Sitemap = langs.flatMap(lang =>
    getAllPosts(lang).map(post => ({
      url: `${siteUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...staticPages, ...postPages]
}
