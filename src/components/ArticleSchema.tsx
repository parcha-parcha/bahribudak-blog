// components/ArticleSchema.tsx
// Bu bileşeni app/blog/[slug]/page.tsx içine import et

interface ArticleSchemaProps {
  title: string
  excerpt: string
  date: string
  slug: string
  lang: string
  coverImage?: string
}

export default function ArticleSchema({
  title,
  excerpt,
  date,
  slug,
  lang,
  coverImage,
}: ArticleSchemaProps) {
  const siteUrl = 'https://bahribudak-blog.vercel.app'
  const postUrl = `${siteUrl}/${lang}/blog/${slug}`
  const imageUrl = coverImage
    ? `${siteUrl}${coverImage}`
    : `${siteUrl}/images/og-default.jpg`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: imageUrl,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    url: postUrl,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    author: {
      '@type': 'Person',
      name: 'Bahri Budak',
      url: 'https://www.linkedin.com/in/bahri-budak-052ab5b8',
      jobTitle:
        lang === 'tr'
          ? 'Tekstil Fabrikası Yöneticisi'
          : 'Textile Factory Manager',
    },
    publisher: {
      '@type': 'Person',
      name: 'Bahri Budak',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/bb-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
