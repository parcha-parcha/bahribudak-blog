import AccountPage from '@/components/auth/AccountPage'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'tr') redirect('/en/account')
  return <AccountPage lang="tr" />
}
