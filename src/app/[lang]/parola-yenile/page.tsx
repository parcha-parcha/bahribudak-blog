import PasswordUpdateForm from '@/components/auth/PasswordUpdateForm'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'tr') redirect('/en/reset-password')
  return <PasswordUpdateForm lang="tr" />
}
