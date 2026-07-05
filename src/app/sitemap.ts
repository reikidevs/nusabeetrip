import { MetadataRoute } from 'next';
import {
  absoluteUrl,
  localizedAlternates,
  localizedPath,
  type SiteLocale,
} from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';
import { DESTINATIONS } from '@/lib/destinations';
import { getAllGuides } from '@/lib/guides';

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

  type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

  const localizedRoutes = (
    path: string,
    changeFrequency: ChangeFrequency,
    priority: number,
    lastModified: Date = now,
  ): MetadataRoute.Sitemap =>
    (['en', 'id'] as SiteLocale[]).map((locale) => ({
      url: absoluteUrl(localizedPath(path, locale)),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: localizedAlternates(path),
      },
    }));

  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedRoutes('/', 'daily', 1.0),
    ...localizedRoutes('/tours', 'daily', 0.95),
    ...localizedRoutes('/bali-day-trip', 'weekly', 0.92),
    ...localizedRoutes('/rentals', 'weekly', 0.9),
    ...localizedRoutes('/destinations', 'monthly', 0.85),
    ...localizedRoutes('/guides', 'weekly', 0.8),
    ...localizedRoutes('/souvenirs', 'weekly', 0.7),
    ...localizedRoutes('/about', 'monthly', 0.6),
    ...localizedRoutes('/contact', 'monthly', 0.7),
    ...localizedRoutes('/privacy', 'yearly', 0.3),
    ...localizedRoutes('/terms', 'yearly', 0.3),
  ];

  const tourDetailRoutes: MetadataRoute.Sitemap = TOUR_PACKAGES.filter(
    (p) => p.isActive,
  ).flatMap((p) => localizedRoutes(`/tours/${p.slug}`, 'weekly', 0.9));

  const rentalDetailRoutes: MetadataRoute.Sitemap = RENTAL_SERVICES.filter(
    (r) => r.isAvailable,
  ).flatMap((r) => localizedRoutes(`/rentals/${r.slug}`, 'weekly', 0.85));

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.flatMap((d) =>
    localizedRoutes(`/destinations/${d.slug}`, 'monthly', 0.8),
  );

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().flatMap((g) =>
    localizedRoutes(`/guides/${g.slug}`, 'monthly', 0.75, new Date(g.dateModified)),
  );

  const souvenirAnchors: MetadataRoute.Sitemap = SOUVENIRS.filter(
    (s) => s.isAvailable,
  ).flatMap((s) => localizedRoutes(`/souvenirs#${s.slug}`, 'monthly', 0.45));

  return [
    ...staticRoutes,
    ...tourDetailRoutes,
    ...rentalDetailRoutes,
    ...destinationRoutes,
    ...guideRoutes,
    ...souvenirAnchors,
  ];
}
