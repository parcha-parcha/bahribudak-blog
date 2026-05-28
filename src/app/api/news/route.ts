import { NextResponse } from 'next/server'

const GNEWS_KEY = process.env.GNEWS_API_KEY

const RSS_FEEDS = [
  // Türkçe genel
  { name: 'Hürriyet',      url: 'https://www.hurriyet.com.tr/rss/anasayfa',       lang: 'tr', category: 'general' },
  { name: 'NTV',           url: 'https://www.ntv.com.tr/son-dakika.rss',           lang: 'tr', category: 'general' },
  { name: 'TRT Haber',     url: 'https://www.trthaber.com/sondakika.rss',          lang: 'tr', category: 'general' },
  { name: 'BBC Türkçe',    url: 'https://feeds.bbci.co.uk/turkce/rss.xml',         lang: 'tr', category: 'general' },
  { name: 'DW Türkçe',     url: 'https://rss.dw.com/rdf/rss-tur-all',             lang: 'tr', category: 'general' },
  // Dünya genel
  { name: 'BBC World',     url: 'https://feeds.bbci.co.uk/news/rss.xml',           lang: 'en', category: 'general' },
  { name: 'Reuters',       url: 'https://feeds.reuters.com/reuters/topNews',       lang: 'en', category: 'general' },
  { name: 'Guardian',      url: 'https://www.theguardian.com/world/rss',           lang: 'en', category: 'general' },
]

interface NewsItem {
  title: string
  link: string
  source: string
  lang: string
  category: 'general' | 'textile'
  image?: string
  description?: string
  publishedAt?: string
}

function parseRSS(xml: string, sourceName: string, lang: string): NewsItem[] {
  const items: NewsItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let itemMatch

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1]

    const titleCdata = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)
    const titlePlain = itemXml.match(/<title>([\s\S]*?)<\/title>/)
    const title = (titleCdata?.[1] || titlePlain?.[1] || '').trim()

    const linkTag   = itemXml.match(/<link>([\s\S]*?)<\/link>/)
    const linkCdata = itemXml.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/)
    const link = (linkCdata?.[1] || linkTag?.[1] || '').trim()

    if (title && title.length > 5) {
      items.push({ title, link, source: sourceName, lang, category: 'general' })
    }
    if (items.length >= 5) break
  }
  return items
}

async function fetchGNewsTextile(): Promise<NewsItem[]> {
  if (!GNEWS_KEY) return []

  const queries = [
    { q: 'tekstil sektörü', lang: 'tr', label: 'Tekstil TR' },
    { q: 'textile industry', lang: 'en', label: 'Textile EN' },
  ]

  const results: NewsItem[] = []

  for (const { q, lang, label } of queries) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${lang}&max=8&apikey=${GNEWS_KEY}`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) continue
      const data = await res.json()
      const articles = data.articles || []
      for (const a of articles) {
        results.push({
          title: a.title || '',
          link: a.url || '',
          source: a.source?.name || label,
          lang,
          category: 'textile',
          image: a.image || '',
          description: a.description || '',
          publishedAt: a.publishedAt || '',
        })
      }
    } catch {
      // sessizce geç
    }
  }

  return results
}

export async function GET() {
  const [rssResults, textileNews] = await Promise.all([
    Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, {
          next: { revalidate: 1800 },
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)' },
        })
        if (!res.ok) throw new Error(`${feed.name}: ${res.status}`)
        const xml = await res.text()
        return parseRSS(xml, feed.name, feed.lang)
      })
    ),
    fetchGNewsTextile(),
  ])

  const generalNews: NewsItem[] = []
  rssResults.forEach((r) => {
    if (r.status === 'fulfilled') generalNews.push(...r.value)
  })

  // Genel haberleri TR/EN karıştır
  const tr = generalNews.filter(n => n.lang === 'tr')
  const en = generalNews.filter(n => n.lang === 'en')
  const mixed: NewsItem[] = []
  const max = Math.max(tr.length, en.length)
  for (let i = 0; i < max; i++) {
    if (tr[i]) mixed.push(tr[i])
    if (en[i]) mixed.push(en[i])
  }

  // Tekstil haberleri en başa ekle, sonra genel
  const allNews = [...textileNews, ...mixed]

  return NextResponse.json({
    news: allNews,
    textileCount: textileNews.length,
    updatedAt: new Date().toISOString(),
  })
}
