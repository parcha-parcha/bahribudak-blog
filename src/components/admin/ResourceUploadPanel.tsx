'use client'

import { useState } from 'react'

type UploadItem = {
  slug: string
  label: string
  filename: string
  accept: string
}

const cuproItems: UploadItem[] = [
  {
    slug: 'cupro-reaktif-boyama-master-pdf',
    label: 'Master PDF',
    filename: 'bbos-cupro-reaktif-boyama-tr-master-v1-0.pdf',
    accept: '.pdf',
  },
  {
    slug: 'cupro-reaktif-boyama-master-docx',
    label: 'Düzenlenebilir Master DOCX',
    filename: 'bbos-cupro-reaktif-boyama-tr-master-v1-0.docx',
    accept: '.docx',
  },
  {
    slug: 'cupro-reaktif-boyama-presentation-pptx',
    label: 'Düzenlenebilir PPTX',
    filename: 'bbos-cupro-reaktif-boyama-tr-presentation-v1-0.pptx',
    accept: '.pptx',
  },
  {
    slug: 'cupro-reaktif-boyama-carousel-pdf',
    label: 'Carousel PDF',
    filename: 'bbos-cupro-reaktif-boyama-tr-carousel-v1-0.pdf',
    accept: '.pdf',
  },
]

export default function ResourceUploadPanel() {
  const [states, setStates] = useState<Record<string, string>>({})

  async function upload(item: UploadItem, file: File | null) {
    if (!file) return

    setStates(prev => ({ ...prev, [item.slug]: 'Yükleniyor…' }))

    const form = new FormData()
    form.set('slug', item.slug)
    form.set('file', file)

    try {
      const response = await fetch('/api/admin/resource-upload', {
        method: 'POST',
        body: form,
      })
      const body = (await response.json()) as {
        ok?: boolean
        error?: string
        storedAs?: string
      }

      setStates(prev => ({
        ...prev,
        [item.slug]: response.ok && body.ok
          ? `Yüklendi ve doğrulandı: ${body.storedAs || item.filename}`
          : body.error || 'Yükleme başarısız.',
      }))
    } catch {
      setStates(prev => ({
        ...prev,
        [item.slug]: 'Yükleme başarısız.',
      }))
    }
  }

  return (
    <div className="space-y-4">
      {cuproItems.map(item => (
        <div
          key={item.slug}
          className="rounded-[12px] border border-[#E5E2DA] bg-white p-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#111315]">
                {item.label}
              </h2>
              <p className="mt-1 text-xs text-[#66717E]">
                Seçtiğiniz dosya Storage'a şu adla kaydedilir:
              </p>
              <p className="mt-1 break-all text-xs font-bold text-[#111315]">
                {item.filename}
              </p>
              {states[item.slug] ? (
                <p className="mt-2 text-sm font-bold text-[#A53C18]">
                  {states[item.slug]}
                </p>
              ) : null}
            </div>

            <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-[#111315] px-5 text-sm font-black text-white transition hover:bg-[#E45A2B]">
              Dosya seç ve yükle
              <input
                className="sr-only"
                type="file"
                accept={item.accept}
                onChange={event => {
                  const file = event.target.files?.[0] ?? null
                  void upload(item, file)
                  event.currentTarget.value = ''
                }}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}
