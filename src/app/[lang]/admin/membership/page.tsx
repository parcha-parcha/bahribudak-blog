import MembershipDashboard from '@/components/admin/MembershipDashboard'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (lang !== 'en') {
    redirect('/tr/yonetim/uyelik')
  }

  return <MembershipDashboard lang="en" />
}
