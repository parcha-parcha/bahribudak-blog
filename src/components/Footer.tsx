import BrandLogo from '@/components/BrandLogo'
import type { Lang } from '@/lib/i18n'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

export default function Footer({ lang }: { lang: Lang }) {
  const t = useTranslations(lang)
  const year = new Date().getFullYear()

  const categories = [
    { slug: 'tekstil', label: lang === 'tr' ? 'Tekstil ve Teknik Yayınlar' : 'Textile and Technical Publications' },
    { slug: 'uretim-yonetim', label: lang === 'tr' ? 'Üretim ve Yönetim Sistemleri' : 'Production and Management Systems' },
    { slug: 'kisisel-gelisim', label: lang === 'tr' ? 'Kişisel Gelişim' : 'Personal Development' },
    { slug: 'sektorel-analiz', label: lang === 'tr' ? 'Sektörel ve Güncel Analizler' : 'Industry and Current Analysis' },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#0B2343] text-white">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#2EA6D9]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2EA6D9]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.9fr_0.8fr]">
          <div>
            <div className="inline-flex items-center justify-center rounded-[26px] bg-[#F5F7FA] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <BrandLogo variant="labeled" className="h-[220px] w-[220px] max-w-full" />
            </div>

            <p className="mt-6 max-w-md text-lg font-semibold text-[#EAF6FC]">
              {lang === 'tr' ? 'Bilgiyle Kurulur. Sistemle Büyür.' : 'Built with Knowledge. Grown through Systems.'}
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/72">
              {lang === 'tr'
                ? 'Örgü / Knitting, Boya / Dyeing ve Apre / Finishing proseslerinde saha deneyimine dayalı teknik yayın, eğitim ve danışmanlık.'
                : 'Field-based technical publications, training and consulting in Knitting, Dyeing and Finishing processes.'}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
              {lang === 'tr' ? 'Yayın Alanları' : 'Publication Areas'}
            </p>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${lang}/blog?category=${category.slug}`}
                    className="flex items-start gap-3 text-sm text-white/74 transition-colors hover:text-[#5BBBE6]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2EA6D9]" />
                    <span>{category.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
              {lang === 'tr' ? 'İletişim' : 'Contact'}
            </p>

            <div className="space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/in/bahri-budak-052ab5b8"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/74 transition-colors hover:text-[#5BBBE6]"
              >
                LinkedIn
              </a>
              <a
                href="mailto:bahribudak@gmail.com"
                className="block text-white/74 transition-colors hover:text-[#5BBBE6]"
              >
                bahribudak@gmail.com
              </a>
              <a
                href="https://bahribudak.com"
                className="block font-semibold text-[#5BBBE6] transition-colors hover:text-white"
              >
                bahribudak.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-white/50">
            © {year} Bahri Budak. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/50">
            {lang === 'tr' ? 'Tekstil Boyama ve Apre Uzmanı' : 'Textile Dyeing and Finishing Specialist'}
          </p>
        </div>
      </div>
    </footer>
  )
}
