import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { JsonLd } from '@/components/seo';
import {
  buildMetadata,
  breadcrumbJsonLd,
  touristAttractionJsonLd,
} from '@/lib/seo';
import { absoluteUrl, localeFromPath, localizedPath } from '@/lib/site-config';
import { DESTINATIONS, getDestinationBySlug } from '@/lib/destinations';
import { TOUR_PACKAGES } from '@/lib/constants';
import DestinationContent from './DestinationContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) {
    return buildMetadata({
      title: 'Destination not found',
      description: 'Browse our other Nusa Penida destinations instead.',
      path: `/destinations/${params.slug}`,
      index: false,
    });
  }
  return buildMetadata({
    title: `${dest.name} — Nusa Penida Travel Guide`,
    description: dest.description.en,
    path: `/destinations/${dest.slug}`,
    keywords: [
      `${dest.name.toLowerCase()}`,
      `${dest.name.toLowerCase()} nusa penida`,
      `${dest.name.toLowerCase()} guide`,
      `${dest.name.toLowerCase()} how to visit`,
      `${dest.region} nusa penida`,
    ],
    image: dest.heroImage,
    imageAlt: `${dest.name} in Nusa Penida, Bali`,
  });
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  const isIndonesian = locale === 'id';
  const name = isIndonesian ? dest.nameId || dest.name : dest.name;
  const description = isIndonesian ? dest.description.id : dest.description.en;
  const homePath = localizedPath('/', locale);
  const destinationsPath = localizedPath('/destinations', locale);
  const destinationPath = localizedPath(`/destinations/${dest.slug}`, locale);

  // Find related tours
  const relatedTours = TOUR_PACKAGES.filter(
    (p) => p.isActive && dest.relatedTourSlugs.includes(p.slug),
  );

  // Find related destinations (same region, excluding self)
  const relatedDestinations = DESTINATIONS.filter(
    (d) => d.slug !== dest.slug && d.region === dest.region,
  ).slice(0, 3);

  return (
    <>
      <JsonLd
        id={`ld-breadcrumbs-${dest.slug}`}
        data={breadcrumbJsonLd([
          { name: isIndonesian ? 'Beranda' : 'Home', path: homePath },
          { name: isIndonesian ? 'Destinasi' : 'Destinations', path: destinationsPath },
          { name, path: destinationPath },
        ])}
      />
      <JsonLd
        id={`ld-attraction-${dest.slug}`}
        data={touristAttractionJsonLd({
          name,
          description,
          image: dest.heroImage,
          latitude: dest.geo?.lat,
          longitude: dest.geo?.lng,
        })}
      />
      <JsonLd
        id={`ld-place-${dest.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          name,
          description,
          image: dest.images.map((img) => absoluteUrl(img)),
          ...(dest.geo
            ? {
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: dest.geo.lat,
                  longitude: dest.geo.lng,
                },
              }
            : {}),
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nusa Penida',
            addressRegion: 'Bali',
            addressCountry: 'ID',
          },
        }}
      />

      <DestinationContent
        destination={dest}
        relatedTours={relatedTours}
        relatedDestinations={relatedDestinations}
      />
    </>
  );
}
