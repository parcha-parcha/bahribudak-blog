/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['bahribudak.com'],
  },
  async redirects() {
    return [
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
