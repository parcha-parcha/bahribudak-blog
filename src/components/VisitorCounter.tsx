'use client'
import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const lastVisit = localStorage.getItem('bb_last_visit')
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000

    if (!lastVisit || now - parseInt(lastVisit) > oneDay) {
      localStorage.setItem('bb_last_visit', now.toString())
      fetch('/api/visitors', { method: 'POST' })
        .then(res => res.json())
        .then(data => setCount(data.count))
        .catch(() => setCount(null))
    } else {
      fetch('/api/visitors')
        .then(res => res.json())
        .then(data => setCount(data.count))
        .catch(() => setCount(null))
    }
  }, [])

  if (count === null) return null

  return (
    <div className="visitor-counter">
      <span className="visitor-counter__icon">👁</span>
      <span className="visitor-counter__text">
        {count.toLocaleString('tr-TR')} ziyaretçi
      </span>
    </div>
  )
}