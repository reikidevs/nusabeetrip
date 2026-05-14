import { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';

/**
 * Native Next.js sitemap. Visit /sitemap.xml — Next.js generates it from this file.
 * Includes priority + changefreq + lastmod for every public route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { en: SITE.url, id: SITE.url },
      },
    },
    {
      url: absoluteUrl('/tours'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: { en: absoluteUrl('/tours'), id: absoluteUrl('/tours') },
      },
    },
    {
      url: absoluteUrl('/rentals'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/souvenirs'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Anchor URLs for individual products — helps long-tail keyword indexing
  const tourAnchors: MetadataRoute.Sitemap = TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({
    url: absoluteUrl(`/tours#${p.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const rentalAnchors: MetadataRoute.Sitemap = RENTAL_SERVICES.filter((r) => r.isAvailable).map(
    (r) => ({
      url: absoluteUrl(`/rentals#${r.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  const souvenirAnchors: MetadataRoute.Sitemap = SOUVENIRS.filter((s) => s.isAvailable).map((s) => ({
    url: absoluteUrl(`/souvenirs#${s.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...tourAnchors, ...rentalAnchors, ...souvenirAnchors];
}
