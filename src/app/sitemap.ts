import type { MetadataRoute } from 'next'
import { expertiseSlugs } from '@/lib/expertise'
import { getAllPosts } from '@/lib/posts'
import type { Lang } from '@/lib/i18n'

const siteUrl = 'https://bahribudak.com'
const langs: Lang[] = ['tr', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = langs.flatMap(lang => {
    const localizedPages: MetadataRoute.Sitemap = [
      {
        url: `${siteUrl}/${lang}`,
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${siteUrl}/${lang}/blog`,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/${lang}/about`,
        changeFrequency: 'monthly',
        priority: 0.72,
      },
      {
        url: `${siteUrl}/${lang}/hizmetler`,
        changeFrequency: 'monthly',
        priority: 0.78,
      },
      {
        url: `${siteUrl}/${lang}/contact`,
        changeFrequency: 'yearly',
        priority: 0.6,
      },
      {
        url: `${siteUrl}/${lang}/uzmanlik`,
        changeFrequency: 'monthly',
        priority: 0.95,
      },
      {
        url: `${siteUrl}/${lang}/magazam`,
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      ...expertiseSlugs.map(slug => ({
        url: `${siteUrl}/${lang}/uzmanlik/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      })),
    ]

    if (lang === 'tr') {
      localizedPages.push(
        {
          url: `${siteUrl}/tr/sablonlar/tekstil-teknik-dokumanlari`,
          changeFrequency: 'monthly',
          priority: 0.72,
        },
        {
          url: `${siteUrl}/tr/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari`,
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        {
          url: `${siteUrl}/tr/sablonlar/tekstil-teknik-dokumanlari/proses-formlari`,
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        {
          url: `${siteUrl}/tr/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri`,
          changeFrequency: 'monthly',
          priority: 0.7,
        }
      )
    }

    return localizedPages
  })

  const postPages: MetadataRoute.Sitemap = langs.flatMap(lang =>
    getAllPosts(lang).map(post => ({
      url: `${siteUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.revisionDate || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...staticPages, ...postPages]
}
