/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bahribudak.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/downloads/:path*.docx',
        destination: '/api/member-download?path=/downloads/:path*.docx',
        permanent: false,
      },
      {
        source: '/downloads/:path*.pptx',
        destination: '/api/member-download?path=/downloads/:path*.pptx',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bahribudak-blog.vercel.app' }],
        destination: 'https://bahribudak.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
