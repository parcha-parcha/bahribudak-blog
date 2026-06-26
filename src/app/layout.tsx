import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Bahri Budak',
    template: '%s | Bahri Budak',
  },
  description:
    "Tekstil Boyama ve Apre Uzmanı Bahri Budak'ın; tekstil teknolojileri, proses yönetimi, teknik yayınlar, kişisel gelişim ve Türkiye-sektör gündemi üzerine içerikleri.",
  metadataBase: new URL('https://bahribudak.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    url: 'https://bahribudak.com',
    siteName: 'Bahri Budak',
    title: 'Bahri Budak | Tekstil Boyama ve Apre Uzmanı',
    description:
      'Tekstil teknolojileri, proses yönetimi, teknik yayınlar, kişisel gelişim ve sektörel analizler.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahri Budak | Tekstil Boyama ve Apre Uzmanı',
    description:
      'Tekstil teknolojileri, proses yönetimi, teknik yayınlar, kişisel gelişim ve sektörel analizler.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: '8lEut5GT1mdu1_nJg92Bg69sD0OKhcz0od-WN8nB_RM',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-white text-navy antialiased dark:bg-[#0b1530] dark:text-slate-100">
        {children}
      </body>
    </html>
  )
}
