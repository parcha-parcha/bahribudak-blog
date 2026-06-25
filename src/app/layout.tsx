import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Bahri Budak | Örgü, Boya ve Apre',
    template: '%s | Bahri Budak',
  },
  description:
    "Bahri Budak'ın 35 yılı aşkın saha deneyimine dayalı Örgü / Knitting, Boya / Dyeing ve Apre / Finishing teknik yayınları, eğitimleri ve proses danışmanlığı.",
  metadataBase: new URL('https://bahribudak.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    url: 'https://bahribudak.com',
    siteName: 'Bahri Budak',
    title: 'Bahri Budak | Örgü, Boya ve Apre Uzmanı',
    description:
      'Örgü, boya ve apre proseslerinde saha deneyimine dayalı teknik yayın, eğitim ve uygulanabilir proses sistemleri.',
    images: [
      {
        url: '/images/hero-su-damlasi.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahri Budak — Örgü, Boya ve Apre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahri Budak | Örgü, Boya ve Apre Uzmanı',
    description:
      'Örgü, boya ve apre proseslerinde saha deneyimine dayalı teknik yayınlar ve proses sistemleri.',
    images: ['/images/hero-su-damlasi.jpg'],
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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname.split('/')[1];document.documentElement.lang=p==='en'?'en':'tr';})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-white text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
