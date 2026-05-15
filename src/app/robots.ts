import { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

/**
 * Enhanced robots.txt with specific bot directives.
 * - Allows all public pages for indexing
 * - Blocks API, admin, and internal Next.js routes
 * - Specific crawl-delay for aggressive bots
 * - Points to sitemap for discovery
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/_next/', '/demo', '/*.json$'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/_next/', '/demo'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/'],
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/_next/', '/demo'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
