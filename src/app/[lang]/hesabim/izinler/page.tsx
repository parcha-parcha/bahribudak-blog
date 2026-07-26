import MemberSettingsPage from '@/components/auth/MemberSettingsPage'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'tr') redirect('/en/account/consents')
  return <MemberSettingsPage lang="tr" section="consents" />
}
