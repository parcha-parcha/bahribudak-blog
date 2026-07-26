import ConsultancyRequestPage from '@/components/auth/ConsultancyRequestPage'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (lang !== 'en') {
    redirect('/tr/hesabim/destek-talebi')
  }

  return <ConsultancyRequestPage lang="en" />
}
