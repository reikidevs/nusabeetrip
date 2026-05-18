import { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';
import { DESTINATIONS } from '@/lib/destinations';

/**
 * Native Next.js sitemap. Visit /sitemap.xml — Next.js generates it from this file.
 *
 * Note on images: Next 14.2's MetadataRoute.Sitemap type does not yet expose
 * an `images` field, but Google's image sitemap protocol allows it. We emit
 * image references through the dedicated `/image-sitemap.xml` route instead
 * (see /src/app/image-sitemap.xml/route.ts), and reference both sitemaps from
 * robots.txt so crawlers find them.
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
      url: absoluteUrl('/destinations'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: bilingualAlternates('/destinations'),
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

  const tourDetailRoutes: MetadataRoute.Sitemap = TOUR_PACKAGES.filter(
    (p) => p.isActive,
  ).map((p) => ({
    url: absoluteUrl(`/tours/${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: bilingualAlternates(`/tours/${p.slug}`),
  }));

  const rentalDetailRoutes: MetadataRoute.Sitemap = RENTAL_SERVICES.filter(
    (r) => r.isAvailable,
  ).map((r) => ({
    url: absoluteUrl(`/rentals/${r.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: bilingualAlternates(`/rentals/${r.slug}`),
  }));

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map((d) => ({
    url: absoluteUrl(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: bilingualAlternates(`/destinations/${d.slug}`),
  }));

  const souvenirAnchors: MetadataRoute.Sitemap = SOUVENIRS.filter(
    (s) => s.isAvailable,
  ).map((s) => ({
    url: absoluteUrl(`/souvenirs#${s.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.45,
  }));

  return [
    ...staticRoutes,
    ...tourDetailRoutes,
    ...rentalDetailRoutes,
    ...destinationRoutes,
    ...souvenirAnchors,
  ];
}
