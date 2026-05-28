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
  'Hürriyet':     '#d32f2f',
  'NTV':          '#1565c0',
  'TRT Haber':    '#2e7d32',
  'BBC Türkçe':   '#c62828',
  'DW Türkçe':    '#0d47a1',
  'Al Jazeera TR':'#004d40',
  'BBC World':    '#b71c1c',
  'Guardian':     '#1b5e20',
  'DW English':   '#0a3069',
  'Al Jazeera':   '#00695c',
  'Reuters':      '#e65100',
  'Euronews':     '#4a148c',
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
    { key: 'textile', label: '🧵 Tekstil' },
    { key: 'tr',      label: '🇹🇷 Türkçe' },
    { key: 'en',      label: '🌍 Dünya' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="section-label mb-2">Dünya & Türkiye & Tekstil</p>
        <h1 className="text-4xl font-bold text-navy mb-3">
          Günün <span className="text-yellow-bb">Haberleri</span>
        </h1>
        <div className="w-12 h-1 bg-yellow-bb mb-4" />
        {updatedAt && (
          <p className="text-xs text-navy/40">
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
              ? { background: '#1a3a5c', color: '#f5c518', border: '1px solid #f5c518' }
              : { background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb' }
            }
          >
            {f.label}
            {f.key === 'textile' && textileCount > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(245,197,24,0.15)', color: '#b8860b' }}>
                {textileCount}
              </span>
            )}
          </button>
        ))}
        <span className="ml-auto text-xs text-navy/40 self-center">
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
              className="group rounded-xl border p-5 hover:shadow-card transition-all block"
              style={{
                textDecoration: 'none',
                borderColor: item.category === 'textile' ? 'rgba(245,197,24,0.35)' : '#e5e7eb',
                background: item.category === 'textile' ? 'rgba(245,197,24,0.03)' : 'white',
              }}
            >
              {/* Kaynak + Kategori */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.category === 'textile' ? '#f5c518' : (SOURCE_COLORS[item.source] || '#6b7280') }}
                />
                <span
                  className="text-[11px] font-bold tracking-wide uppercase"
                  style={{ color: item.category === 'textile' ? '#b8860b' : (SOURCE_COLORS[item.source] || '#6b7280') }}
                >
                  {item.source}
                </span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
                  style={
                    item.category === 'textile'
                      ? { background: 'rgba(245,197,24,0.15)', color: '#b8860b' }
                      : item.lang === 'tr'
                        ? { background: 'rgba(245,197,24,0.1)', color: '#b8860b' }
                        : { background: 'rgba(26,58,92,0.08)', color: '#6b7280' }
                  }>
                  {item.category === 'textile' ? '🧵 TEKSTİL' : item.lang === 'tr' ? 'TR' : 'EN'}
                </span>
              </div>

              {/* Başlık */}
              <p className="text-sm font-semibold text-navy leading-snug group-hover:text-yellow-bb transition-colors mb-2">
                {item.title}
              </p>

              {/* Açıklama (sadece tekstil haberlerinde) */}
              {item.category === 'textile' && item.description && (
                <p className="text-xs text-navy/50 leading-relaxed line-clamp-2 mb-2">
                  {item.description}
                </p>
              )}

              {/* Tarih + Ok */}
              <div className="flex items-center justify-between mt-3">
                {item.publishedAt ? (
                  <span className="text-[10px] text-navy/30">{formatDate(item.publishedAt)}</span>
                ) : <span />}
                <span className="text-yellow-bb text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-navy/40">
          <div className="text-4xl mb-4">📭</div>
          <p>Haber yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      )}

    </div>
  )
}
