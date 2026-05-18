import { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

/**
 * Enhanced robots.txt with bot-specific rules and image sitemap reference.
 *
 * Note on `sitemap`: Next.js' MetadataRoute.Robots type only accepts a single
 * sitemap URL. We point it at the standard /sitemap.xml. Google also discovers
 * /image-sitemap.xml because we include it in the URL list it picks up via
 * the homepage <link rel="sitemap"> hint plus the Search Console submission.
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
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/image-sitemap.xml`,
    ],
    host: SITE.url,
  };
}
