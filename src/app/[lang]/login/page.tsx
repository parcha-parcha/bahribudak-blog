import AuthForm from '@/components/auth/AuthForm'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang !== 'en') redirect('/tr/giris')

  return (
    <>
      <AuthForm lang="en" mode="login" />
      <div className="bg-[#F6F4EF] px-4 pb-12 text-center">
        <Link
          className="text-sm font-bold text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
          href="/en/forgot-password"
        >
          Forgot your password?
        </Link>
      </div>
    </>
  )
}
