import BrandLogo from '@/components/BrandLogo'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

interface FooterProps {
  lang: Lang
}

type FooterLink = {
  href: string
  label: string
  external?: boolean
}

export default function Footer({ lang }: FooterProps) {
  const t = useTranslations(lang)
  const year = new Date().getFullYear()
  const withLang = (path: string) => `/${lang}${path}`

  const copy =
    lang === 'tr'
      ? {
          tagline: 'Bilgiyle Kurulur. Sistemle Büyür.',
          summary:
            'Örgü, boya ve apre proseslerinde saha deneyimine dayalı teknik yayın, eğitim, dokümantasyon ve danışmanlık.',
          ctaLabel: 'ÜCRETSİZ TEKNİK ÜYELİK',
          ctaTitle:
            'Ücretsiz üye olun; doğrulanmış teknik dokümanlara, kontrol listelerine ve proses formlarına erişin.',
          ctaPrimary: 'Ücretsiz Üye Ol',
          ctaSecondary: 'Teknik Destek Talep Et',
          navigationTitle: 'Navigasyon',
          processTitle: 'Proses Alanları',
          resourcesTitle: 'Teknik Kaynaklar',
          contactTitle: 'İletişim',
          socialTitle: 'Sosyal',
          specialist:
            'Örgü, Boya ve Apre Prosesleri • Teknik Yayın ve Dokümantasyon',
          navigation: [
            { href: withLang('/'), label: 'Ana Sayfa' },
            { href: withLang('/about'), label: 'Hakkımda' },
            { href: withLang('/contact'), label: 'İletişim' },
          ] satisfies FooterLink[],
          processes: [
            {
              href: withLang('/uzmanlik/orgu'),
              label: 'Örgü',
            },
            {
              href: withLang('/uzmanlik/boya'),
              label: 'Boya',
            },
            {
              href: withLang('/uzmanlik/apre'),
              label: 'Apre',
            },
          ] satisfies FooterLink[],
          resources: [
            {
              href: withLang('/blog'),
              label: 'Teknik Yayınlar',
            },
            {
              href: withLang('/magazam'),
              label: 'Teknik Dokümanlar',
            },
            {
              href: withLang('/uyelik'),
              label: 'Üyelik',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
              ),
              label: 'Eğitim Notları',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
              ),
              label: 'Kontrol Listeleri',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
              ),
              label: 'Proses Formları',
            },
          ] satisfies FooterLink[],
        }
      : {
          tagline: 'Built with Knowledge. Grown through Systems.',
          summary:
            'Field-based technical publications, training, documentation and consulting for knitting, dyeing and finishing processes.',
          ctaLabel: 'TECHNICAL RESOURCE CENTER',
          ctaTitle:
            'Access verified technical documents, checklists and process forms.',
          ctaPrimary: 'Explore Technical Documents',
          ctaSecondary: 'Create a Technical Request',
          navigationTitle: 'Navigation',
          processTitle: 'Process Areas',
          resourcesTitle: 'Technical Resources',
          contactTitle: 'Contact',
          socialTitle: 'Social',
          specialist:
            'Knitting, Dyeing and Finishing Processes • Technical Publishing and Documentation',
          navigation: [
            { href: withLang('/'), label: 'Home' },
            { href: withLang('/about'), label: 'About' },
            { href: withLang('/contact'), label: 'Contact' },
          ] satisfies FooterLink[],
          processes: [
            {
              href: withLang('/uzmanlik/orgu'),
              label: 'Knitting',
            },
            {
              href: withLang('/uzmanlik/boya'),
              label: 'Dyeing',
            },
            {
              href: withLang('/uzmanlik/apre'),
              label: 'Finishing',
            },
          ] satisfies FooterLink[],
          resources: [
            {
              href: withLang('/blog'),
              label: 'Technical Publications',
            },
            {
              href: withLang('/magazam'),
              label: 'Technical Documents',
            },
            {
              href: withLang('/uyelik'),
              label: 'Membership',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/egitim-notlari',
              ),
              label: 'Training Notes',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/kontrol-listeleri',
              ),
              label: 'Checklists',
            },
            {
              href: withLang(
                '/sablonlar/tekstil-teknik-dokumanlari/proses-formlari',
              ),
              label: 'Process Forms',
            },
          ] satisfies FooterLink[],
        }

  const contactLinks: FooterLink[] = [
    {
      href: 'mailto:bahribudak@gmail.com',
      label: 'bahribudak@gmail.com',
      external: true,
    },
    {
      href: 'https://bahribudak.com',
      label: 'bahribudak.com',
      external: true,
    },
  ]

  const socialLinks: FooterLink[] = [
    {
      href: 'https://www.linkedin.com/in/bahri-budak-052ab5b8',
      label: 'LinkedIn',
      external: true,
    },
    {
      href: 'https://www.instagram.com/bahribudak/',
      label: 'Instagram',
      external: true,
    },
  ]

  const renderLinks = (links: FooterLink[]) => (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {link.external ? (
            <a
              href={link.href}
              target={
                link.href.startsWith('mailto:') ? undefined : '_blank'
              }
              rel={
                link.href.startsWith('mailto:')
                  ? undefined
                  : 'noopener noreferrer'
              }
              className="group inline-flex items-start gap-3 text-sm leading-6 text-white/72 transition-colors hover:text-[#F09A7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
            >
              <span
                className="mt-[0.58rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#E45A2B] transition-transform group-hover:scale-125"
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </a>
          ) : (
            <Link
              href={link.href}
              className="group inline-flex items-start gap-3 text-sm leading-6 text-white/72 transition-colors hover:text-[#F09A7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
            >
              <span
                className="mt-[0.58rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#E45A2B] transition-transform group-hover:scale-125"
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <footer className="relative overflow-hidden bg-[#111315] text-white">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#E45A2B]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E45A2B]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-14">
        <section
          className="mb-12 grid gap-7 rounded-[16px] border border-white/12 bg-white/[0.04] px-6 py-7 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center"
          aria-labelledby="footer-resource-title"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F09A7C]">
              {copy.ctaLabel}
            </p>
            <h2
              id="footer-resource-title"
              className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-white md:text-3xl"
            >
              {copy.ctaTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={withLang('/kayit')}
              className="inline-flex items-center justify-center rounded-md bg-[#E45A2B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C94B20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
            >
              {copy.ctaPrimary} →
            </Link>

            <Link
              href={withLang('/contact')}
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#111315] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.72fr_0.82fr_0.92fr]">
          <div>
            <Link
              href={withLang('/')}
              className="inline-flex max-w-[460px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E45A2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
              aria-label={
                lang === 'tr'
                  ? 'Bahri Budak ana sayfa'
                  : 'Bahri Budak home page'
              }
            >
              <BrandLogo
                variant="full"
                tone="light"
                className="h-auto w-full max-w-[440px]"
              />
            </Link>

            <p className="mt-6 max-w-md text-lg font-semibold text-[#F6F4EF]">
              {copy.tagline}
            </p>

            <p className="mt-2 max-w-md text-sm leading-7 text-white/68">
              {copy.summary}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/48">
              {copy.navigationTitle}
            </p>
            {renderLinks(copy.navigation)}

            <p className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/48">
              {copy.processTitle}
            </p>
            {renderLinks(copy.processes)}
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/48">
              {copy.resourcesTitle}
            </p>
            {renderLinks(copy.resources)}
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/48">
              {copy.contactTitle}
            </p>
            {renderLinks(contactLinks)}

            <p className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/48">
              {copy.socialTitle}
            </p>
            {renderLinks(socialLinks)}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-white/48">
            © {year} Bahri Budak. {t('footer.rights')}
          </p>

          <p className="max-w-xl text-xs leading-5 text-white/48 sm:text-right">
            {copy.specialist}
          </p>
        </div>
      </div>
    </footer>
  )
}
