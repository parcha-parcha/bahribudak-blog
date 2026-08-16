export * from './resources.base'

import {
  resources as baseResources,
  type ResourceAccessLevel,
  type ResourceItem,
} from './resources.base'

const cuproResources: ResourceItem[] = [
  {
    id: 'cupro-reaktif-boyama-master-pdf',
    href: '/downloads/bbos-cupro-reaktif-boyama-tr-master-v1-3-2.pdf',
    areas: ['boya'],
    group: 'technical',
    format: 'PDF',
    version: 'V1.3.2',
    catalogDate: '2026-08-15',
    size: '1.3 MB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Kumaşlarda Reaktif Boyama — Master PDF',
      en: 'Reactive Dyeing of Cupro Fabrics — Master PDF',
    },
    description: {
      tr: 'Cupro reaktif boyama teknik yayınının son kontrollü Master PDF sürümü.',
      en: 'Latest controlled Master PDF edition of the Cupro reactive dyeing technical publication.',
    },
  },
  {
    id: 'cupro-reaktif-boyama-master-docx',
    href: '/downloads/bbos-cupro-reaktif-boyama-tr-master-v1-0.docx',
    areas: ['boya'],
    group: 'technical',
    format: 'DOCX',
    version: 'V1.0',
    catalogDate: '2026-08-15',
    size: '1.3 MB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Reaktif Boyama — Düzenlenebilir Master DOCX',
      en: 'Cupro Reactive Dyeing — Editable Master DOCX',
    },
    description: {
      tr: 'Teknik Master yayının düzenlenebilir DOCX sürümü.',
      en: 'Editable DOCX edition of the technical Master publication.',
    },
  },
  {
    id: 'cupro-reaktif-boyama-presentation-pptx',
    href: '/downloads/bbos-cupro-reaktif-boyama-tr-presentation-v1-0.pptx',
    areas: ['boya'],
    group: 'technical',
    format: 'PPTX',
    version: 'V1.0',
    catalogDate: '2026-08-15',
    size: '1.9 MB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Reaktif Boyama — Düzenlenebilir PPTX',
      en: 'Cupro Reactive Dyeing — Editable PPTX',
    },
    description: {
      tr: 'Cupro reaktif boyama teknik sunumunun düzenlenebilir PPTX sürümü.',
      en: 'Editable PPTX edition of the Cupro reactive dyeing technical presentation.',
    },
  },
  {
    id: 'cupro-reaktif-boyama-carousel-pdf',
    href: '/downloads/bbos-cupro-reaktif-boyama-tr-carousel-v1-0.pdf',
    areas: ['boya'],
    group: 'technical',
    format: 'PDF',
    version: 'V1.0',
    catalogDate: '2026-08-15',
    size: '669 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Reaktif Boyama — Carousel PDF',
      en: 'Cupro Reactive Dyeing — Carousel PDF',
    },
    description: {
      tr: 'Cupro reaktif boyama yayınının carousel PDF sürümü.',
      en: 'Carousel PDF edition of the Cupro reactive dyeing publication.',
    },
  },
  {
    id: 'cupro-karisimlari-master-pdf',
    href: '/downloads/bbos-cupro-karisimlari-tr-master-r05.pdf',
    areas: ['boya'],
    group: 'technical',
    format: 'PDF',
    version: 'R05',
    catalogDate: '2026-08-16',
    size: '643 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Karışımları — Master PDF',
      en: 'Cupro Blends — Master PDF',
    },
    description: {
      tr: 'Cupro + Polyester, Modal ve Lyocell teknik karşılaştırmasının kontrollü R05 Master PDF sürümü.',
      en: 'Controlled R05 Master PDF edition of the Cupro blends technical comparison.',
    },
  },
  {
    id: 'cupro-karisimlari-master-docx',
    href: '/downloads/bbos-cupro-karisimlari-tr-master-r05.docx',
    areas: ['boya'],
    group: 'technical',
    format: 'DOCX',
    version: 'R05',
    catalogDate: '2026-08-16',
    size: '1.5 MB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Karışımları — Düzenlenebilir Master DOCX',
      en: 'Cupro Blends — Editable Master DOCX',
    },
    description: {
      tr: 'Cupro karışımları teknik Master yayınının düzenlenebilir R05 DOCX sürümü.',
      en: 'Editable R05 DOCX edition of the Cupro blends technical Master publication.',
    },
  },
  {
    id: 'cupro-karisimlari-presentation-pptx',
    href: '/downloads/bbos-cupro-karisimlari-tr-presentation-r05.pptx',
    areas: ['boya'],
    group: 'technical',
    format: 'PPTX',
    version: 'R05',
    catalogDate: '2026-08-16',
    size: '954 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Karışımları — Düzenlenebilir PPTX',
      en: 'Cupro Blends — Editable PPTX',
    },
    description: {
      tr: 'Cupro karışımları teknik sunumunun düzenlenebilir R05 PPTX sürümü.',
      en: 'Editable R05 PPTX edition of the Cupro blends technical presentation.',
    },
  },
  {
    id: 'cupro-karisimlari-carousel-pdf',
    href: '/downloads/bbos-cupro-karisimlari-tr-carousel-r05.pdf',
    areas: ['boya'],
    group: 'technical',
    format: 'PDF',
    version: 'R05',
    catalogDate: '2026-08-16',
    size: '341 KB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Karışımları — Carousel PDF',
      en: 'Cupro Blends — Carousel PDF',
    },
    description: {
      tr: 'Cupro karışımları yayınının R05 Carousel PDF sürümü.',
      en: 'R05 Carousel PDF edition of the Cupro blends publication.',
    },
  },
]

export const resources: ResourceItem[] = [...baseResources, ...cuproResources]

export function isMemberDownloadPath(pathname: string) {
  return pathname.toLocaleLowerCase('en-US').startsWith('/downloads/')
}

export function getDownloadPathAccessLevel(pathname: string): ResourceAccessLevel | null {
  return isMemberDownloadPath(pathname) ? 'member' : null
}

export function findResourceByDownloadPath(pathname: string) {
  return resources.find(item => item.href === pathname) ?? null
}
