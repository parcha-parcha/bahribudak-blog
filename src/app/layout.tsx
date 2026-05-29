import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Bahri Budak',
    template: '%s | Bahri Budak',
  },
  description: 'Tekstil yöneticisi, düşünür ve içerik üreticisi Bahri Budak\'ın kişisel blogu.',
 metadataBase: new URL('https://bahribudak-blog.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    url: 'https://bahribudak.com',
    siteName: 'Bahri Budak',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
verification: {
    google: 'OVSrNQr3Z1WQsMHZOk_c7OZAD5rqME7tf_HYl6WPLps',
  },

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins bg-white text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
