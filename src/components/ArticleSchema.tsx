interface ArticleSchemaProps {
  title: string
  excerpt: string
  date: string
  revisionDate?: string
  slug: string
  lang: string
  coverImage?: string
  documentCode?: string
  processArea?: string
}

export default function ArticleSchema({
  title,
  excerpt,
  date,
  revisionDate,
  slug,
  lang,
  coverImage,
  documentCode,
  processArea,
}: ArticleSchemaProps) {
  const siteUrl = 'https://bahribudak.com'
  const postUrl = `${siteUrl}/${lang}/blog/${slug}`
  const imageUrl = coverImage
    ? `${siteUrl}${coverImage}`
    : `${siteUrl}/images/hero-su-damlasi.jpg`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: excerpt,
    image: imageUrl,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(revisionDate || date).toISOString(),
    url: postUrl,
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    articleSection: processArea || 'Textile Technical Publications',
    ...(documentCode ? { identifier: documentCode } : {}),
    author: {
      '@type': 'Person',
      name: 'Bahri Budak',
      url: 'https://www.linkedin.com/in/bahri-budak-052ab5b8',
      jobTitle:
        lang === 'tr'
          ? 'Örgü, Boya ve Apre Uzmanı'
          : 'Knitting, Dyeing and Finishing Specialist',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bahri Budak Tekstil Proses Danışmanlığı',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/brand/bb-logo-yatay.png`,
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
