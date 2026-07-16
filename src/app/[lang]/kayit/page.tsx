import AuthForm from '@/components/auth/AuthForm'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'tr') redirect('/en/register')
  return <AuthForm lang="tr" mode="register" />
}
