import type { ReactNode } from 'react'

import TechnicalPublicationsDownloadNotice from '@/components/TechnicalPublicationsDownloadNotice'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TechnicalPublicationsDownloadNotice />
      {children}
    </>
  )
}
