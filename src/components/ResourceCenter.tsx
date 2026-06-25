'use client'

import type {
  ResourceArea,
  ResourceFormat,
  ResourceGroup,
  ResourceItem,
} from '@/lib/resources'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

type Lang = 'tr' | 'en'
type FilterValue<T extends string> = 'all' | T

const areaOrder: ResourceArea[] = ['orgu', 'boya', 'apre', 'ortak']
const groupOrder: ResourceGroup[] = [
  'training',
  'technical',
  'form',
  'checklist',
  'calculation',
  'management',
]
const formatOrder: ResourceFormat[] = ['PDF', 'XLSX', 'DOCX']

const copy = {
  tr: {
    search: 'Kaynaklarda ara',
    searchPlaceholder: 'Başlık, açıklama veya dosya türü ara…',
    processFilter: 'Proses alanı',
    resourceFilter: 'Kaynak türü',
    formatFilter: 'Dosya biçimi',
    all: 'Tümü',
    area: {
      orgu: 'Örgü / Knitting',
      boya: 'Boya / Dyeing',
      apre: 'Apre / Finishing',
      ortak: 'Ortak Teknik Yönetim',
    },
    group: {
      training: 'Eğitim Notu',
      technical: 'Teknik Doküman',
      form: 'Proses Formu',
      checklist: 'Kontrol Listesi',
      calculation: 'Hesaplama Aracı',
      management: 'Yönetim Dokümanı',
    },
    result: 'kaynak gösteriliyor',
    download: 'Dosyayı indir',
    version: 'Sürüm',
    catalogDate: 'Katalog kaydı',
    fileLanguage: 'Dosya dili',
    turkish: 'Türkçe',
    noResultTitle: 'Seçilen filtrelerle eşleşen kaynak bulunamadı.',
    noResultText: 'Arama metnini temizleyin veya filtrelerden birini “Tümü” konumuna alın.',
    clear: 'Filtreleri temizle',
    archiveNote:
      'Eski dosyalar arşivde korunur; bu katalogda her kaynağın güncel ve doğrulanmış sürümü gösterilir.',
  },
  en: {
    search: 'Search resources',
    searchPlaceholder: 'Search title, description or file type…',
    processFilter: 'Process area',
    resourceFilter: 'Resource type',
    formatFilter: 'File format',
    all: 'All',
    area: {
      orgu: 'Knitting / Örgü',
      boya: 'Dyeing / Boya',
      apre: 'Finishing / Apre',
      ortak: 'Cross-process Management',
    },
    group: {
      training: 'Training Note',
      technical: 'Technical Document',
      form: 'Process Form',
      checklist: 'Checklist',
      calculation: 'Calculation Tool',
      management: 'Management Document',
    },
    result: 'resources shown',
    download: 'Download file',
    version: 'Version',
    catalogDate: 'Cataloged',
    fileLanguage: 'File language',
    turkish: 'Turkish',
    noResultTitle: 'No resources match the selected filters.',
    noResultText: 'Clear the search text or set one of the filters to “All”.',
    clear: 'Clear filters',
    archiveNote:
      'Older files remain in the archive; this catalog shows the current verified version of each resource.',
  },
} as const

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
        active
          ? 'border-[#0B2343] bg-[#0B2343] text-white shadow-sm'
          : 'border-[#D8DDE5] bg-white text-[#0B2343]/74 hover:border-[#2EA6D9] hover:text-[#0B2343]'
      }`}
    >
      {children}
    </button>
  )
}

export default function ResourceCenter({
  lang,
  resources,
}: {
  lang: Lang
  resources: ResourceItem[]
}) {
  const t = copy[lang]
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<FilterValue<ResourceArea>>('all')
  const [group, setGroup] = useState<FilterValue<ResourceGroup>>('all')
  const [format, setFormat] = useState<FilterValue<ResourceFormat>>('all')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : 'en-US')

    return resources.filter((item) => {
      const matchesArea = area === 'all' || item.areas.includes(area)
      const matchesGroup = group === 'all' || item.group === group
      const matchesFormat = format === 'all' || item.format === format
      const haystack = [
        item.title[lang],
        item.description[lang],
        item.format,
        item.version,
        ...item.areas.map((entry) => t.area[entry]),
        t.group[item.group],
      ]
        .join(' ')
        .toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : 'en-US')
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery)

      return matchesArea && matchesGroup && matchesFormat && matchesQuery
    })
  }, [area, format, group, lang, query, resources, t.area, t.group])

  const clearFilters = () => {
    setQuery('')
    setArea('all')
    setGroup('all')
    setFormat('all')
  }

  return (
    <div>
      <section className="rounded-[2rem] border border-[#D8DDE5] bg-white p-5 shadow-sm md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.95fr]">
          <div>
            <label htmlFor="resource-search" className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/55">
              {t.search}
            </label>
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-2xl border border-[#D8DDE5] bg-[#F5F7FA] px-4 py-3 text-sm text-[#0B2343] outline-none transition placeholder:text-[#0B2343]/38 focus:border-[#2EA6D9] focus:bg-white"
            />
          </div>

          <div className="grid gap-5">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/55">
                {t.processFilter}
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterButton active={area === 'all'} onClick={() => setArea('all')}>
                  {t.all}
                </FilterButton>
                {areaOrder.map((item) => (
                  <FilterButton key={item} active={area === item} onClick={() => setArea(item)}>
                    {t.area[item]}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/55">
                  {t.resourceFilter}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton active={group === 'all'} onClick={() => setGroup('all')}>
                    {t.all}
                  </FilterButton>
                  {groupOrder.map((item) => (
                    <FilterButton key={item} active={group === item} onClick={() => setGroup(item)}>
                      {t.group[item]}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/55">
                  {t.formatFilter}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton active={format === 'all'} onClick={() => setFormat('all')}>
                    {t.all}
                  </FilterButton>
                  {formatOrder.map((item) => (
                    <FilterButton key={item} active={format === item} onClick={() => setFormat(item)}>
                      {item}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm font-semibold text-[#0B2343]/70">
          <span className="font-black text-[#0B2343]">{filtered.length}</span> {t.result}
        </p>
        <p className="max-w-2xl text-xs leading-5 text-[#0B2343]/55">{t.archiveNote}</p>
      </div>

      {filtered.length > 0 ? (
        <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-[2rem] border border-[#D8DDE5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2EA6D9]/50 hover:shadow-[0_16px_45px_rgba(11,35,67,0.10)]"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.areas.map((entry) => (
                    <span
                      key={entry}
                      className="rounded-full bg-[#EAF6FC] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.11em] text-[#0B2343]"
                    >
                      {t.area[entry]}
                    </span>
                  ))}
                </div>
                <span className="rounded-full border border-[#2EA6D9]/30 px-3 py-1.5 text-[10px] font-black tracking-[0.12em] text-[#2EA6D9]">
                  {item.format}
                </span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#2EA6D9]">
                {t.group[item.group]}
              </p>
              <h2 className="mt-2 text-xl font-bold leading-snug text-[#0B2343]">{item.title[lang]}</h2>
              <p className="mt-4 text-sm leading-6 text-[#0B2343]/70">{item.description[lang]}</p>

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#D8DDE5] pt-5 text-xs">
                <div>
                  <dt className="font-semibold text-[#0B2343]/45">{t.version}</dt>
                  <dd className="mt-1 font-bold text-[#0B2343]">{item.version}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#0B2343]/45">{t.catalogDate}</dt>
                  <dd className="mt-1 font-bold text-[#0B2343]">{item.catalogDate}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#0B2343]/45">Boyut / Size</dt>
                  <dd className="mt-1 font-bold text-[#0B2343]">{item.size}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#0B2343]/45">{t.fileLanguage}</dt>
                  <dd className="mt-1 font-bold text-[#0B2343]">{t.turkish}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <a
                  href={item.href}
                  download
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2EA6D9]"
                >
                  {t.download} · {item.format}
                </a>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[#2EA6D9]/45 bg-[#EAF6FC]/60 px-6 py-14 text-center">
          <h2 className="text-xl font-bold text-[#0B2343]">{t.noResultTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#0B2343]/65">{t.noResultText}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2EA6D9]"
          >
            {t.clear}
          </button>
        </section>
      )}
    </div>
  )
}
