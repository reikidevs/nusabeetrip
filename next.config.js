/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issue
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    IMAGE_CACHE_VERSION: '6',
    BUILD_TIME: new Date().toISOString(),
  },
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  // SEO: trailing slash consistency (no trailing slash = canonical)
  trailingSlash: false,
  async redirects() {
    return [
      // Redirect common misspellings and old URLs
      { source: '/tour', destination: '/tours', permanent: true },
      { source: '/rental', destination: '/rentals', permanent: true },
      { source: '/souvenir', destination: '/souvenirs', permanent: true },
      { source: '/book', destination: '/contact', permanent: true },
      { source: '/booking', destination: '/contact', permanent: true },
      // Redirect trailing slashes (belt-and-suspenders with trailingSlash: false)
      { source: '/tours/', destination: '/tours', permanent: true },
      { source: '/rentals/', destination: '/rentals', permanent: true },
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/souvenirs/', destination: '/souvenirs', permanent: true },
    ];
  },
  async headers() {
    return [
      // Security headers — applied to every response
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Content-Security-Policy for SEO crawlers trust
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
      // SEO surface: must always be fresh so Googlebot sees latest changes
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      // API routes — never cached
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      // Hashed Next.js static assets — safe to cache forever
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Optimized images
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Public images — long cache with stale-while-revalidate
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      // HTML pages — short cache for freshness
      {
        source: '/:path((?!api|_next|images|sitemap|robots).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
