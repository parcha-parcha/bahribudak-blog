'use client'
import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const isOwner = localStorage.getItem('bb_owner') === 'true'

    if (isOwner) {
      // Sadece sayıyı oku, artırma
      fetch('/api/visitors')
        .then(res => res.json())
        .then(data => setCount(data.count))
        .catch(() => setCount(null))
    } else {
      // Normal ziyaretçi — sayacı artır
      fetch('/api/visitors', { method: 'POST' })
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
