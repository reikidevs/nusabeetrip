import { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';

/**
 * Native Next.js sitemap. Visit /sitemap.xml — Next.js generates it from this file.
 * Includes priority + changefreq + lastmod + alternates for every public route.
 *
 * Strategy:
 * - Money pages (home, tours list, individual tours, rentals list, individual rentals)
 *   get high priority and weekly+ change frequency.
 * - hreflang alternates signal the bilingual UI (same URL serves both languages).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const bilingualAlternates = (path: string) => ({
    languages: {
      en: absoluteUrl(path),
      id: absoluteUrl(path),
      'x-default': absoluteUrl(path),
    },
  });

  // Static top-level routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: bilingualAlternates('/'),
    },
    {
      url: absoluteUrl('/tours'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: bilingualAlternates('/tours'),
    },
    {
      url: absoluteUrl('/rentals'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: bilingualAlternates('/rentals'),
    },
    {
      url: absoluteUrl('/souvenirs'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: bilingualAlternates('/souvenirs'),
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: bilingualAlternates('/about'),
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: bilingualAlternates('/contact'),
    },
  ];

  // Individual tour detail pages — high SEO value (long-tail keywords)
  const tourDetailRoutes: MetadataRoute.Sitemap = TOUR_PACKAGES.filter((p) => p.isActive).map(
    (p) => ({
      url: absoluteUrl(`/tours/${p.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: bilingualAlternates(`/tours/${p.slug}`),
    }),
  );

  // Individual rental detail pages
  const rentalDetailRoutes: MetadataRoute.Sitemap = RENTAL_SERVICES.filter(
    (r) => r.isAvailable,
  ).map((r) => ({
    url: absoluteUrl(`/rentals/${r.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: bilingualAlternates(`/rentals/${r.slug}`),
  }));

  // Anchor links for souvenirs (no individual pages yet)
  const souvenirAnchors: MetadataRoute.Sitemap = SOUVENIRS.filter((s) => s.isAvailable).map(
    (s) => ({
      url: absoluteUrl(`/souvenirs#${s.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.45,
    }),
  );

  return [
    ...staticRoutes,
    ...tourDetailRoutes,
    ...rentalDetailRoutes,
    ...souvenirAnchors,
  ];
}
