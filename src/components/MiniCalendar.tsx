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

  const year  = today.getFullYear()
  const month = today.getMonth()
  const day   = today.getDate()

  const firstDay   = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const DAYS   = lang === 'tr' ? DAYS_TR   : DAYS_EN
  const MONTHS = lang === 'tr' ? MONTHS_TR : MONTHS_EN

  return (
    /* ─── Değişen: py-12 → py-5, flex justify-center ─── */
    <section className="bg-white border-b border-gray-border">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-center">

        {/* ─── Değişen: max-w-sm → max-w-[260px], shadow-card → shadow-sm ─── */}
        <div className="w-full max-w-[260px] bg-white rounded-xl border border-gray-border shadow-sm overflow-hidden">

          {/* Header — aynı, sadece padding küçüldü */}
          <div className="bg-navy px-3 py-2 flex items-center justify-between">
            <span className="text-yellow-bb font-bold text-xs tracking-wide">
              {MONTHS[month]}
            </span>
            <span className="text-white/50 text-xs">{year}</span>
          </div>

          {/* Gün başlıkları — py-2 → py-1 */}
          <div className="grid grid-cols-7 border-b border-gray-border">
            {DAYS.map(d => (
              <div key={d} className="py-1 text-center text-[9px] font-bold text-navy/40 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Günler — aspect-square kaldırıldı, h-7 sabit yükseklik */}
          <div className="grid grid-cols-7 p-1.5 gap-0.5">
            {cells.map((cell, i) => (
              <div
                key={i}
                className={`
                  h-7 flex items-center justify-center rounded text-[11px] font-medium transition-all
                  ${cell === null
                    ? ''
                    : cell === day
                      ? 'bg-navy text-white font-bold ring-2 ring-yellow-bb ring-offset-1'
                      : 'text-navy/80 hover:bg-gray-soft cursor-default'
                  }
                `}
              >
                {cell}
              </div>
            ))}
          </div>

          {/* Alt tarih — py-3 → py-2 */}
          <div className="border-t border-gray-border px-3 py-2 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-bb flex-shrink-0" />
            <span className="text-[11px] text-navy font-medium">
              {day} {MONTHS[month]} {year}
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
