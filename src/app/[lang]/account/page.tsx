import AccountPage from '@/components/auth/AccountPage'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'en') redirect('/tr/hesabim')
  return <AccountPage lang="en" />
}
