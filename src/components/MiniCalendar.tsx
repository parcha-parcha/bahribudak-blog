'use client'

import { useState, useEffect } from 'react'

const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function MiniCalendar({ lang = 'tr' }: { lang?: string }) {
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  if (!today) return null

  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()

  const firstDay = new Date(year, month, 1).getDay()
  // Pazartesi başlangıçlı: 0=Pzt
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const DAYS = lang === 'tr' ? DAYS_TR : DAYS_EN
  const MONTHS = lang === 'tr' ? MONTHS_TR : MONTHS_EN

  return (
    <section className="bg-white border-b border-gray-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center">
          <p className="section-label mb-2">{lang === 'tr' ? 'Bugün' : 'Today'}</p>
          <h2 className="text-2xl font-bold text-navy mb-6">
            {MONTHS[month]} {year}
          </h2>

          <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-border shadow-card overflow-hidden">
            {/* Header */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between">
              <span className="text-yellow-bb font-bold text-sm">{MONTHS[month]}</span>
              <span className="text-white/60 text-sm">{year}</span>
            </div>

            {/* Gün başlıkları */}
            <div className="grid grid-cols-7 border-b border-gray-border">
              {DAYS.map(d => (
                <div key={d} className="py-2 text-center text-xs font-bold text-navy/40 uppercase">
                  {d}
                </div>
              ))}
            </div>

            {/* Günler */}
            <div className="grid grid-cols-7 p-2 gap-1">
              {cells.map((cell, i) => (
                <div
                  key={i}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                    ${cell === null ? '' : cell === day
                      ? 'bg-navy text-white font-bold shadow-md ring-2 ring-yellow-bb'
                      : 'text-navy hover:bg-gray-soft'}
                  `}
                >
                  {cell}
                </div>
              ))}
            </div>

            {/* Bugünün tarihi */}
            <div className="border-t border-gray-border px-4 py-3 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-bb" />
              <span className="text-sm text-navy font-medium">
                {day} {MONTHS[month]} {year}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
