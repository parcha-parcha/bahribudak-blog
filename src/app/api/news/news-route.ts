import { NextResponse } from 'next/server'

const FEEDS = [
  // Türkçe
  { name: 'Hürriyet',     url: 'https://www.hurriyet.com.tr/rss/anasayfa',           lang: 'tr' },
  { name: 'NTV',          url: 'https://www.ntv.com.tr/son-dakika.rss',              lang: 'tr' },
  { name: 'TRT Haber',    url: 'https://www.trthaber.com/sondakika.rss',             lang: 'tr' },
  { name: 'BBC Türkçe',   url: 'https://feeds.bbci.co.uk/turkce/rss.xml',            lang: 'tr' },
  { name: 'DW Türkçe',    url: 'https://rss.dw.com/rdf/rss-tur-all',                lang: 'tr' },
  { name: 'Al Jazeera TR',url: 'https://www.aljazeera.com.tr/feed',                 lang: 'tr' },
  // Dünya
  { name: 'BBC World',    url: 'https://feeds.bbci.co.uk/news/rss.xml',             lang: 'en' },
  { name: 'Guardian',     url: 'https://www.theguardian.com/world/rss',             lang: 'en' },
  { name: 'DW English',   url: 'https://rss.dw.com/rdf/rss-en-all',                lang: 'en' },
  { name: 'Al Jazeera',   url: 'https://www.aljazeera.com/xml/rss/all.xml',         lang: 'en' },
  { name: 'Reuters',      url: 'https://feeds.reuters.com/reuters/topNews',         lang: 'en' },
  { name: 'Euronews',     url: 'https://www.euronews.com/rss',                      lang: 'en' },
]

function parseRSS(xml: string, sourceName: string, lang: string) {
  const items: { title: string; link: string; source: string; lang: string }[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let itemMatch

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1]

    // Başlık — CDATA veya düz metin
    const titleCdata = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)
    const titlePlain = itemXml.match(/<title>([\s\S]*?)<\/title>/)
    const title = (titleCdata?.[1] || titlePlain?.[1] || '').trim()

    // Link
    const linkTag = itemXml.match(/<link>([\s\S]*?)<\/link>/)
    const linkCdata = itemXml.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/)
    const link = (linkCdata?.[1] || linkTag?.[1] || '').trim()

    if (title && title.length > 5) {
      items.push({ title, link, source: sourceName, lang })
    }
    if (items.length >= 5) break
  }
  return items
}

export async function GET() {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        next: { revalidate: 1800 }, // 30 dakikada bir güncelle
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)' },
      })
      if (!res.ok) throw new Error(`${feed.name}: ${res.status}`)
      const xml = await res.text()
      return parseRSS(xml, feed.name, feed.lang)
    })
  )

  const allNews: { title: string; link: string; source: string; lang: string }[] = []
  results.forEach((r) => {
    if (r.status === 'fulfilled') allNews.push(...r.value)
  })

  // Türkçe ve dünya karıştır
  const tr = allNews.filter(n => n.lang === 'tr')
  const en = allNews.filter(n => n.lang === 'en')
  const mixed: typeof allNews = []
  const max = Math.max(tr.length, en.length)
  for (let i = 0; i < max; i++) {
    if (tr[i]) mixed.push(tr[i])
    if (en[i]) mixed.push(en[i])
  }

  return NextResponse.json({ news: mixed, updatedAt: new Date().toISOString() })
}
