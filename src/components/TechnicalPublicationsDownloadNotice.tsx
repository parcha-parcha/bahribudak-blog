'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TechnicalPublicationsDownloadNotice() {
  const pathname = usePathname()
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const lang = normalizedPathname.startsWith('/en/') ? 'en' : 'tr'
  const isCatalog =
    normalizedPathname === '/tr/blog' ||
    normalizedPathname === '/en/blog'

  if (!isCatalog) return null

  const copy =
    lang === 'tr'
      ? {
          kicker: 'İNDİRME SİSTEMİ',
          title: 'Teknik doküman indirmeleri aktif',
          text: 'Teknik yayınlara ait PDF, DOCX, XLSX ve PPTX dosyaları ücretsiz üyelik ile güvenli şekilde indirilebilir. Mevcut indirme bağlantıları aktiftir.',
          status: 'AKTİF',
          login: 'Giriş Yap',
          register: 'Ücretsiz Üye Ol',
        }
      : {
          kicker: 'DOWNLOAD SYSTEM',
          title: 'Technical document downloads are active',
          text: 'PDF, DOCX, XLSX and PPTX files attached to technical publications can be securely downloaded with a free membership. Existing download links remain active.',
          status: 'ACTIVE',
          login: 'Sign In',
          register: 'Join Free',
        }

  const loginHref = lang === 'tr' ? '/tr/giris' : '/en/login'
  const registerHref = lang === 'tr' ? '/tr/kayit' : '/en/register'

  return (
    <section className="border-b border-[#E5E2DA] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5 md:py-6">
        <div className="relative overflow-hidden rounded-[14px] border border-[#E5E2DA] bg-[#F6F4EF] p-5 md:p-6">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#E45A2B]" aria-hidden="true" />

          <div className="flex flex-col gap-5 pl-2 md:flex-row md:items-center md:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#E45A2B]">
                  {copy.kicker}
                </p>
                <span className="rounded-md border border-[#A7D8BE] bg-[#EAF8F1] px-2.5 py-1 text-[10px] font-black tracking-[0.1em] text-[#087A55]">
                  {copy.status}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-black tracking-[-0.02em] text-[#111315] md:text-2xl">
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#66717E] md:text-[15px]">
                {copy.text}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Link
                href={loginHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#111315] bg-white px-4 text-sm font-black text-[#111315] transition hover:bg-[#111315] hover:text-white"
              >
                {copy.login}
              </Link>
              <Link
                href={registerHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#E45A2B] px-4 text-sm font-black text-white transition hover:bg-[#C94D24]"
              >
                {copy.register}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
