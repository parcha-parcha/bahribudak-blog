'use client'

import { useEffect, useState } from 'react'

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

const SOURCE_COLORS: Record<string, string> = {
  'Hürriyet': '#0B2343',
  'NTV': '#0B2343',
  'TRT Haber': '#0B2343',
  'BBC Türkçe': '#0B2343',
  'DW Türkçe': '#0B2343',
  'Al Jazeera TR': '#0B2343',
  'BBC World': '#0B2343',
  'Guardian': '#0B2343',
  'DW English': '#0B2343',
  'Al Jazeera': '#0B2343',
  'Reuters': '#0B2343',
  'Euronews': '#0B2343',
}

type FilterType = 'all' | 'tr' | 'en' | 'textile'

export default function HaberlerPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [updatedAt, setUpdatedAt] = useState<string>('')
  const [textileCount, setTextileCount] = useState(0)

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => {
        setNews(d.news || [])
        setUpdatedAt(d.updatedAt || '')
        setTextileCount(d.textileCount || 0)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered =
    filter === 'all'     ? news :
    filter === 'textile' ? news.filter(n => n.category === 'textile') :
                           news.filter(n => n.lang === filter && n.category === 'general')

  const formatTime = (iso: string) => {
    if (!iso) return ''
    return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (iso: string) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
  }

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all',     label: 'Tümü' },
    { key: 'textile', label: 'Tekstil' },
    { key: 'tr',      label: 'Türkçe' },
    { key: 'en',      label: 'Dünya' },
  ]

  return (
    <div className="bb-news-readable max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="section-label mb-2">Dünya & Türkiye & Tekstil</p>
        <h1 className="text-4xl font-bold text-navy mb-3 bb-news-title">
          Günün <span className="text-accent-blue">Haberleri</span>
        </h1>
        <div className="w-12 h-1 bg-yellow-bb mb-4" />
        {updatedAt && (
          <p className="text-xs bb-news-muted">
            Son güncelleme: {formatTime(updatedAt)} — Her saatte otomatik yenilenir
          </p>
        )}
      </div>

      {/* Filtre */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={filter === f.key
              ? { background: '#0B2343', color: '#FFFFFF', border: '1px solid #0B2343' }
              : { background: '#FFFFFF', color: '#5D5F63', border: '1px solid #D8DDE5' }
            }
          >
            {f.label}
            {f.key === 'textile' && textileCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: '#EAF6FC', color: '#0B2343' }}>
                {textileCount}
              </span>
            )}
          </button>
        ))}
        <span className="ml-auto text-xs bb-news-muted self-center">
          {filtered.length} haber
        </span>
      </div>

      {/* Haberler */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9).fill(0).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-border p-5 animate-pulse">
              <div className="h-3 bg-gray-200 rounded mb-3 w-20" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <a
              key={i}
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bb-news-card group rounded-xl border p-5 hover:shadow-card transition-all block"
              style={{
                textDecoration: 'none',
                borderColor: item.category === 'textile' ? '#2EA6D9' : '#D8DDE5',
                background: '#ffffff',
              }}
            >
              {/* Kaynak + Kategori */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.category === 'textile' ? '#2EA6D9' : (SOURCE_COLORS[item.source] || '#6b7280') }}
                />
                <span
                  className="text-[11px] font-bold tracking-wide uppercase"
                  style={{ color: item.category === 'textile' ? '#0B2343' : (SOURCE_COLORS[item.source] || '#5D5F63') }}
                >
                  {item.source}
                </span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
                  style={
                    item.category === 'textile'
                      ? { background: '#EAF6FC', color: '#0B2343' }
                      : item.lang === 'tr'
                        ? { background: '#F3F6FA', color: '#0B2343' }
                        : { background: '#F3F6FA', color: '#5D5F63' }
                  }>
                  {item.category === 'textile' ? 'TEKSTİL' : item.lang === 'tr' ? 'TR' : 'EN'}
                </span>
              </div>

              {/* Başlık */}
              <p className="bb-news-card-title text-sm font-semibold leading-snug transition-colors mb-2">
                {item.title}
              </p>

              {/* Açıklama (sadece tekstil haberlerinde) */}
              {item.category === 'textile' && item.description && (
                <p className="bb-news-card-desc text-xs leading-relaxed line-clamp-2 mb-2">
                  {item.description}
                </p>
              )}

              {/* Tarih + Ok */}
              <div className="flex items-center justify-between mt-3">
                {item.publishedAt ? (
                  <span className="bb-news-date text-[10px]">{formatDate(item.publishedAt)}</span>
                ) : <span />}
                <span className="text-accent-blue text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 bb-news-muted">
          <p>Haber yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      )}

    </div>
  )
}
