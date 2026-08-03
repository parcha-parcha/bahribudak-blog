'use client'

import { useEffect, useState } from 'react'

const DAYS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]
const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function MiniCalendar({ lang = 'tr' }: { lang?: string }) {
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setToday(new Date())
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  if (!today) return null

  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()

  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  const days = lang === 'tr' ? DAYS_TR : DAYS_EN
  const months = lang === 'tr' ? MONTHS_TR : MONTHS_EN

  return (
    <div
      className="w-full overflow-hidden border border-[#E5E2DA] bg-[#111315]"
      style={{ maxWidth: '260px' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'rgba(228,90,43,0.12)',
          borderBottom: '1px solid rgba(229,226,218,0.18)',
        }}
      >
        <span
          className="text-xs font-bold tracking-wide"
          style={{ color: '#E45A2B' }}
        >
          {months[month]}
        </span>
        <span
          className="text-xs"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {year}
        </span>
      </div>

      <div
        className="grid grid-cols-7"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {days.map((weekday) => (
          <div
            key={weekday}
            className="py-1 text-center text-[9px] font-bold uppercase tracking-wide"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 p-1.5">
        {cells.map((cell, index) => (
          <div
            key={`${cell ?? 'empty'}-${index}`}
            className="flex h-7 items-center justify-center rounded text-[11px] font-medium transition-all"
            style={
              cell === day
                ? {
                    background: '#E45A2B',
                    color: '#111315',
                    fontWeight: 800,
                    borderRadius: '6px',
                  }
                : cell
                  ? { color: 'rgba(255,255,255,0.7)' }
                  : undefined
            }
          >
            {cell}
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-2 px-3 py-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: '#E45A2B' }}
        />
        <span
          className="text-[11px] font-medium"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {day} {months[month]} {year}
        </span>
      </div>
    </div>
  )
}
