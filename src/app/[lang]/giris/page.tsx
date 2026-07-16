import AuthForm from '@/components/auth/AuthForm'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'tr') redirect('/en/login')
  return <AuthForm lang="tr" mode="login" />
}
