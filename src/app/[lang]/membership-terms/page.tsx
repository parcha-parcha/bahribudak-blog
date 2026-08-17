import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Membership Terms',
  description: 'Membership terms for the Bahri Budak free technical publication system.',
  robots: { index: false, follow: true },
}

export default async function MembershipTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (lang !== 'en') redirect('/tr/uyelik-kosullari')

  return (
    <main className="min-h-screen bg-[#F6F4EF] px-4 py-10 text-[#111315] md:px-6 md:py-16">
      <article className="mx-auto max-w-4xl rounded-[14px] border border-[#E5E2DA] bg-white p-7 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E45A2B]">
          MEMBERSHIP AND ACCESS
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-5xl">
          Membership Terms
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6F7782]">
          Last updated: 17 August 2026
        </p>

        <div className="mt-8 space-y-8 text-[15px] leading-7 text-[#39414A]">
          <section>
            <h2 className="text-xl font-black text-[#111315]">1. Scope of membership</h2>
            <p className="mt-2">
              Membership in the Bahri Budak technical publication system is free. A verified member account provides access to technical publications, checklists, process forms and available downloadable files.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">2. Account creation and verification</h2>
            <p className="mt-2">
              Members are expected to use a valid email address and provide accurate information in required registration fields. Some member features may remain unavailable until email verification is completed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">3. Account security</h2>
            <p className="mt-2">
              Members are responsible for protecting their password and account access information. Accounts should not be shared with unauthorized persons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">4. Use of technical content</h2>
            <p className="mt-2">
              Publications are provided for professional and informational use. Unauthorized bulk republication, resale or redistribution as part of another service is not permitted. Reasonable quotation with proper attribution is reserved.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">5. Technical responsibility</h2>
            <p className="mt-2">
              Technical information is prepared to support general evaluation and field practice. Site-specific process, equipment, chemical, occupational safety and regulatory conditions must be assessed separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">6. Service continuity</h2>
            <p className="mt-2">
              The system may be temporarily unavailable for maintenance, security, technical updates or operational reasons. Publication and file structures may be updated when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">7. Ending membership</h2>
            <p className="mt-2">
              Members may request support or account closure through the available contact channel. Access may be restricted in cases of misuse, security risk or serious violation of access rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#111315]">8. Updates</h2>
            <p className="mt-2">
              These membership terms may be updated as the service structure changes. The current version is published on this page.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#E5E2DA] pt-6">
          <Link
            href="/en/register"
            className="font-black text-[#111315] underline decoration-[#E45A2B] decoration-2 underline-offset-4"
          >
            Return to registration
          </Link>
        </div>
      </article>
    </main>
  )
}
