import type { MetadataRoute } from 'next'
import { expertiseSlugs } from '@/lib/expertise'
import { getAllPosts } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak.com'
const langs: Lang[] = ['tr', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = langs.flatMap(lang => [
    {
      url: `${siteUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/${lang}/uzmanlik`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    ...expertiseSlugs.map(slug => ({
      url: `${siteUrl}/${lang}/uzmanlik/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ])

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
