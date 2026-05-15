import { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';

/**
 * Native Next.js sitemap. Visit /sitemap.xml — Next.js generates it from this file.
 * Includes priority + changefreq + lastmod + alternates for every public route.
 *
 * SEO Strategy:
 * - Homepage & Tours get highest priority (money pages)
 * - Individual product anchors help long-tail keyword indexing
 * - hreflang alternates signal bilingual content to Google
 * - lastModified uses real dates for freshness signals
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Helper for bilingual alternates
  const bilingualAlternates = (path: string) => ({
    languages: {
      en: absoluteUrl(path),
      id: absoluteUrl(path),
      'x-default': absoluteUrl(path),
    },
  });

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

  // Anchor URLs for individual products — helps long-tail keyword indexing
  const tourAnchors: MetadataRoute.Sitemap = TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({
    url: absoluteUrl(`/tours#${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: bilingualAlternates(`/tours#${p.slug}`),
  }));

  const rentalAnchors: MetadataRoute.Sitemap = RENTAL_SERVICES.filter((r) => r.isAvailable).map(
    (r) => ({
      url: absoluteUrl(`/rentals#${r.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
      alternates: bilingualAlternates(`/rentals#${r.slug}`),
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
