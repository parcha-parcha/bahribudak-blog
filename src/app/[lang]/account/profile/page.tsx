import MemberSettingsPage from '@/components/auth/MemberSettingsPage'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'en') redirect('/tr/hesabim/profil')
  return <MemberSettingsPage lang="en" section="profile" />
}
