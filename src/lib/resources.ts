export * from './resources.base'

import {
  resources as baseResources,
  type ResourceAccessLevel,
  type ResourceItem,
} from './resources.base'

const cuproResources: ResourceItem[] = [
  {
    id: 'cupro-reaktif-boyama-master-pdf',
    href: '/downloads/bbos-cupro-reaktif-boyama-tr-master-v1-0.pdf',
    areas: ['boya'],
    group: 'technical',
    format: 'PDF',
    version: 'V1.0',
    catalogDate: '2026-08-15',
    size: '1.3 MB',
    fileLanguage: 'tr',
    title: {
      tr: 'Cupro Kumaşlarda Reaktif Boyama — Master PDF',
      en: 'Reactive Dyeing of Cupro Fabrics — Master PDF',
    },
    description: {
      tr: 'Cupro reaktif boyama teknik yayınının final Master PDF sürümü.',
      en: 'Final Master PDF edition of the Cupro reactive dyeing technical publication.',
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
