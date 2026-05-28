'use client'

import { useEffect, useState } from 'react'

interface NewsItem {
  title: string
  link: string
  source: string
  lang: string
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => { setNews(d.news || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ background: '#0f1a3a', borderBottom: '1px solid rgba(245,197,24,0.15)' }}
        className="flex items-center px-4 py-2 gap-3">
        <span className="text-xs font-bold tracking-widest uppercase flex-shrink-0"
          style={{ color: '#f5c518' }}>● HABERLER</span>
        <span className="text-white/30 text-xs animate-pulse">Yükleniyor...</span>
      </div>
    )
  }

  if (!news.length) return null

  // Ticker içeriği iki kez tekrar — sonsuz döngü için
  const doubled = [...news, ...news]

  return (
    <div
      style={{ background: '#0f1a3a', borderBottom: '1px solid rgba(245,197,24,0.15)', overflow: 'hidden' }}
      className="flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sabit etiket */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0 z-10"
        style={{
          background: '#f5c518',
          minWidth: '110px',
          justifyContent: 'center',
        }}
      >
        <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#0f1a3a' }}>
          ● HABERLER
        </span>
      </div>

      {/* Kayan alan */}
      <div className="flex-1 overflow-hidden py-2">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{
            animation: paused ? 'none' : 'ticker 120s linear infinite',
            display: 'inline-flex',
            gap: 0,
          }}
        >
          {doubled.map((item, i) => (
            <a
              key={i}
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 hover:opacity-80 transition-opacity"
              style={{ textDecoration: 'none', flexShrink: 0 }}
            >
              {/* Kaynak etiketi */}
              <span
                className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded flex-shrink-0"
                style={{
                  background: item.lang === 'tr' ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.08)',
                  color: item.lang === 'tr' ? '#f5c518' : 'rgba(255,255,255,0.5)',
                  border: item.lang === 'tr' ? '1px solid rgba(245,197,24,0.2)' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {item.source}
              </span>
              {/* Başlık */}
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {item.title}
              </span>
              {/* Ayırıcı */}
              <span className="mx-3" style={{ color: 'rgba(245,197,24,0.3)' }}>✦</span>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
