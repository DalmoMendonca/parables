/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/parables' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/parables/' : '',
  images: {
    unoptimized: true, // Required for static exports
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Add this if you're using environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

// Remove this if you don't need to support Netlify redirects
if (process.env.NODE_ENV === 'production') {
  nextConfig.redirects = async () => {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'parables.netlify.app',
          },
        ],
        destination: '/parables/:path*',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig