/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProduction ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains',
        },
      ]
    : []),
]

const nextConfig = {
  pageExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'md',
    'mdx',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bahribudak.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/tr/:path*',
        headers: [
          {
            key: 'Content-Language',
            value: 'tr',
          },
        ],
      },
      {
        source: '/en/:path*',
        headers: [
          {
            key: 'Content-Language',
            value: 'en',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source:
          '/downloads/BB-KSS-Tekstilde-Ram-Bacalarinin-Temizligi-Master-v1.0.pdf',
        destination:
          '/api/member-download?path=/downloads/BB-KSS-Tekstilde-Ram-Bacalarinin-Temizligi-Master-v1.0.pdf',
        permanent: false,
      },
      {
        source: '/downloads/:path*.docx',
        destination:
          '/api/member-download?path=/downloads/:path*.docx',
        permanent: false,
      },
      {
        source: '/downloads/:path*.pptx',
        destination:
          '/api/member-download?path=/downloads/:path*.pptx',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bahribudak-blog.vercel.app',
          },
        ],
        destination:
          'https://bahribudak.com/:path*',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
