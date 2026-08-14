'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type MigrationItem = {
  slug: string
  title: string
  href: string
  format: string
  migrated: boolean
  resourceId: string | null
  filePath: string | null
}

type MigrationStatus = {
  total: number
  migrated: number
  pending: number
  items: MigrationItem[]
}

export default function ResourceMigrationPanel() {
  const [status, setStatus] = useState<MigrationStatus | null>(null)
  const [running, setRunning] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const response = await fetch('/api/admin/resource-migration', {
      cache: 'no-store',
    })
    const payload = (await response.json()) as MigrationStatus & { error?: string }

    if (!response.ok) {
      throw new Error(payload.error ?? 'Migrasyon durumu alınamadı.')
    }

    setStatus(payload)
    return payload
  }, [])

  useEffect(() => {
    void refresh().catch(error => {
      setMessage(error instanceof Error ? error.message : 'Migrasyon durumu alınamadı.')
    })
  }, [refresh])

  const pendingItems = useMemo(
    () => status?.items.filter(item => !item.migrated) ?? [],
    [status],
  )

  async function migrateOne(slug: string) {
    const response = await fetch('/api/admin/resource-migration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
    const payload = (await response.json()) as { error?: string }

    if (!response.ok) {
      throw new Error(payload.error ?? 'Dosya taşınamadı.')
    }
  }

  async function migrateAll() {
    if (running) return

    setRunning(true)
    setMessage(null)

    try {
      let snapshot = await refresh()
      const queue = snapshot.items.filter(item => !item.migrated)

      for (const item of queue) {
        setCurrent(item.title)
        await migrateOne(item.slug)
        snapshot = await refresh()
      }

      setCurrent(null)
      setMessage('UUID / Supabase kaynak migrasyonu tamamlandı.')
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Migrasyon durdu: ${error.message}`
          : 'Migrasyon durdu.',
      )
    } finally {
      setCurrent(null)
      setRunning(false)
    }
  }

  return (
    <section className="rounded-[14px] border border-[#E5E2DA] bg-white p-6 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
        BB-OS / Download Migration
      </p>
      <h1 className="mt-3 text-3xl font-black text-[#111315]">
        UUID / Supabase Kaynak Migrasyonu
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6F7782]">
        Mevcut Vercel Blob dosyalarını, eski /downloads bağlantılarını kapatmadan Supabase Storage ve UUID kaynak kayıtlarına taşır. İşlem kaldığı yerden devam edebilir.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Toplam" value={status?.total ?? '—'} />
        <Metric label="Taşındı" value={status?.migrated ?? '—'} />
        <Metric label="Bekleyen" value={status?.pending ?? '—'} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={migrateAll}
          disabled={running || !status || pendingItems.length === 0}
          className="rounded-md bg-[#E45A2B] px-5 py-3 text-sm font-black text-[#111315] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? 'Migrasyon Çalışıyor…' : pendingItems.length === 0 ? 'Migrasyon Tamamlandı' : 'Bekleyenleri Taşı'}
        </button>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={running}
          className="rounded-md border border-[#D9D5CC] bg-white px-5 py-3 text-sm font-bold text-[#111315] disabled:opacity-50"
        >
          Durumu Yenile
        </button>
      </div>

      {current ? (
        <p className="mt-5 rounded-md bg-[#F6F4EF] p-4 text-sm text-[#111315]">
          Taşınıyor: <strong>{current}</strong>
        </p>
      ) : null}

      {message ? (
        <p className="mt-5 text-sm font-bold text-[#111315]">{message}</p>
      ) : null}

      <div className="mt-7 max-h-[34rem] overflow-auto rounded-md border border-[#E5E2DA]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-[#F6F4EF] text-[#111315]">
            <tr>
              <th className="px-4 py-3 font-black">Durum</th>
              <th className="px-4 py-3 font-black">Kaynak</th>
              <th className="px-4 py-3 font-black">Format</th>
            </tr>
          </thead>
          <tbody>
            {(status?.items ?? []).map(item => (
              <tr key={item.slug} className="border-t border-[#E5E2DA]">
                <td className="px-4 py-3 font-bold text-[#111315]">
                  {item.migrated ? 'PASS' : 'BEKLEME'}
                </td>
                <td className="px-4 py-3 text-[#111315]">
                  <div className="font-bold">{item.title}</div>
                  <div className="mt-1 break-all text-xs text-[#6F7782]">{item.href}</div>
                </td>
                <td className="px-4 py-3 text-[#6F7782]">{item.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-[#F6F4EF] p-4">
      <div className="text-xs font-black uppercase tracking-[0.12em] text-[#6F7782]">{label}</div>
      <div className="mt-2 text-2xl font-black text-[#111315]">{value}</div>
    </div>
  )
}
