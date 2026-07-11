import { permanentRedirect } from 'next/navigation'

interface LegacyProcessFormsPageProps {
  params: Promise<{ lang: string }>
}

export default async function LegacyProcessFormsPage({
  params,
}: LegacyProcessFormsPageProps) {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'

  permanentRedirect(
    `/${lang}/sablonlar/tekstil-teknik-dokumanlari/proses-formlari`,
  )
}