'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DownloadSystemNotice() {
  const pathname = usePathname()
  const isEnglish = pathname === '/en/blog'
  const isTurkish = pathname === '/tr/blog'

  if (!isEnglish && !isTurkish) return null

  const copy = isEnglish
    ? {
        kicker: 'DOWNLOAD SYSTEM',
        title: 'Technical document downloads are active',
        text: 'PDF, DOCX, XLSX and PPTX files can be downloaded securely with a free membership. Existing download links remain active.',
        status: 'ACTIVE',
        login: 'Sign in',
        register: 'Join free',
        loginHref: '/en/login',
        registerHref: '/en/register',
      }
    : {
        kicker: 'İNDİRME SİSTEMİ',
        title: 'Teknik doküman indirmeleri aktif',
        text: 'PDF, DOCX, XLSX ve PPTX dosyaları ücretsiz üyelik ile güvenli şekilde indirilebilir. Mevcut indirme bağlantıları aktiftir.',
        status: 'AKTİF',
        login: 'Giriş Yap',
        register: 'Ücretsiz Üye Ol',
        loginHref: '/tr/giris',
        registerHref: '/tr/kayit',
      }

  return (
    <section className="border-b border-[#E5E2DA] bg-[#FFF8F4]">
      <div className="mx-auto max-w-7xl px-6 py-5 md:py-6">
        <div className="flex flex-col gap-5 rounded-[14px] border border-[#E45A2B]/25 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex min-w-0 gap-4">
            <div
              className="w-1 shrink-0 rounded-full bg-[#E45A2B]"
              aria-hidden="true"
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#E45A2B]">
                  {copy.kicker}
                </p>
                <span className="rounded-md bg-[#EAF8F1] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#087A55]">
                  {copy.status}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[#111315] md:text-2xl">
                {copy.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#66717E] md:text-[15px]">
                {copy.text}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href={copy.loginHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#111315] px-4 text-sm font-black text-[#111315] transition hover:bg-[#111315] hover:text-white"
            >
              {copy.login}
            </Link>
            <Link
              href={copy.registerHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#E45A2B] px-4 text-sm font-black text-white transition hover:bg-[#C94D24]"
            >
              {copy.register}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
