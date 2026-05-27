'use client'

import { useState, useEffect } from 'react'

const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function MiniCalendar({ lang = 'tr' }: { lang?: string }) {
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => { setToday(new Date()) }, [])
  if (!today) return null

  const year  = today.getFullYear()
  const month = today.getMonth()
  const day   = today.getDate()

  const firstDay    = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const DAYS   = lang === 'tr' ? DAYS_TR   : DAYS_EN
  const MONTHS = lang === 'tr' ? MONTHS_TR : MONTHS_EN

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        maxWidth: '260px',
        background: '#0f1a3a',
        border: '1px solid rgba(245,197,24,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ background: 'rgba(245,197,24,0.12)', borderBottom: '1px solid rgba(245,197,24,0.15)' }}
      >
        <span className="font-bold text-xs tracking-wide" style={{ color: '#f5c518' }}>
          {MONTHS[month]}
        </span>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{year}</span>
      </div>

      {/* Gün başlıkları */}
      <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {DAYS.map(d => (
          <div key={d} className="py-1 text-center text-[9px] font-bold tracking-wide uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Günler */}
      <div className="grid grid-cols-7 p-1.5 gap-0.5">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="h-7 flex items-center justify-center rounded text-[11px] font-medium transition-all"
            style={
              cell === day
                ? { background: '#f5c518', color: '#0f1a3a', fontWeight: 800, borderRadius: '6px' }
                : cell
                ? { color: 'rgba(255,255,255,0.7)' }
                : {}
            }
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Alt tarih */}
      <div
        className="px-3 py-2 flex items-center justify-center gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#f5c518' }} />
        <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {day} {MONTHS[month]} {year}
        </span>
      </div>
    </div>
  )
}
