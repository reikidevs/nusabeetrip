import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTourPackages, getTourPackageBySlug } from '@/lib/db/queries';
import { TOUR_PACKAGES } from '@/lib/constants';
import { resolveTourImage } from '@/lib/image-resolver';
import { JsonLd } from '@/components/seo';
import {
  buildMetadata,
  breadcrumbJsonLd,
  serviceJsonLd,
  faqJsonLd,
} from '@/lib/seo';
import { getAggregateRating } from '@/lib/testimonials';
import { absoluteUrl, SITE } from '@/lib/site-config';
import { getTourRelatedGuideLinks } from '@/lib/guides';
import type { TourPackage } from '@/types';
import TourDetailContent from './TourDetailContent';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

/**
 * Pre-generate static slugs from the canonical tour list. Even though the
 * page is force-dynamic at request time, generateStaticParams gives Next.js
 * (and Google) a hint about which slugs are valid.
 */
export async function generateStaticParams() {
  return TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({ slug: p.slug }));
}

async function loadTour(slug: string): Promise<TourPackage | null> {
  // Try DB first, fall back to static list if DB is unreachable.
  try {
    const dbPackage = await getTourPackageBySlug(slug);
    if (dbPackage) {
      const features = Array.isArray(dbPackage.features) ? (dbPackage.features as string[]) : [];
      return {
        id: dbPackage.id.toString(),
        name: dbPackage.name,
        slug: dbPackage.slug,
        description: dbPackage.description || '',
        price: dbPackage.priceIdr,
        currency: 'IDR',
        duration: dbPackage.durationHours ?? 8,
        includesSnorkeling: dbPackage.includesSnorkeling ?? false,
        features,
        image: resolveTourImage({
          name: dbPackage.name,
          features,
          description: dbPackage.description || '',
          slug: dbPackage.slug,
          imageUrl: dbPackage.imageUrl,
        }),
        isActive: dbPackage.isActive ?? true,
      };
    }
  } catch (err) {
    console.warn('[tours/[slug]] DB unavailable, using static fallback');
  }

  return TOUR_PACKAGES.find((p) => p.slug === slug && p.isActive) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tour = await loadTour(params.slug);
  if (!tour) {
    return buildMetadata({
      title: 'Tour not found',
      description: 'The tour you are looking for is not available.',
      path: `/tours/${params.slug}`,
      index: false,
    });
  }

  const priceDisplay = `${(tour.price / 1000).toFixed(0)}K IDR`;
  const description = `${tour.description.slice(0, 130)}… ${tour.duration}-hour tour from ${priceDisplay}. Book on WhatsApp.`;

  return buildMetadata({
    title: `${tour.name} — ${tour.duration} Hour Nusa Penida Tour`,
    description: description.slice(0, 160),
    path: `/tours/${tour.slug}`,
    keywords: [
      `${tour.name.toLowerCase()} nusa penida`,
      `${tour.slug.replace(/-/g, ' ')} tour`,
      ...tour.features
        .filter((f) =>
          !['Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot', 'Snorkeling Equipment', 'Underwater Guide']
            .includes(f),
        )
        .map((f) => `${f.toLowerCase()} nusa penida`)
        .slice(0, 5),
    ],
    image: tour.image,
    imageAlt: `${tour.name} — Nusa Penida Tour by NusaBeeTrip`,
  });
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = await loadTour(params.slug);
  if (!tour) notFound();

  const { ratingValue, reviewCount } = getAggregateRating();

  // Pull two extra tours for the "Other tours you may like" section
  let related: TourPackage[] = [];
  try {
    const all = await getTourPackages();
    related = all
      .filter((p) => p.slug !== tour.slug && p.isActive)
      .slice(0, 3)
      .map((p) => {
        const features = Array.isArray(p.features) ? (p.features as string[]) : [];
        return {
          id: p.id.toString(),
          name: p.name,
          slug: p.slug,
          description: p.description || '',
          price: p.priceIdr,
          currency: 'IDR',
          duration: p.durationHours ?? 8,
          includesSnorkeling: p.includesSnorkeling ?? false,
          features,
          image: resolveTourImage({
            name: p.name,
            features,
            description: p.description || '',
            slug: p.slug,
            imageUrl: p.imageUrl,
          }),
          isActive: p.isActive ?? true,
        };
      });
  } catch {
    related = TOUR_PACKAGES.filter((p) => p.slug !== tour.slug && p.isActive).slice(0, 3);
  }

  // Tour-specific FAQ — boosts long-tail SEO and gives FAQ rich result
  const tourFaq = [
    {
      question: `How long does the ${tour.name} take?`,
      answer: `The ${tour.name} runs approximately ${tour.duration} hours including pickup, all destinations, and return drop-off.`,
    },
    {
      question: `What is the price of the ${tour.name}?`,
      answer: `The ${tour.name} costs ${tour.price.toLocaleString('id-ID')} IDR per person and includes professional guide, transportation, tax island, and parking tickets.`,
    },
    {
      question: `Is hotel pickup included for the ${tour.name}?`,
      answer:
        'Yes, free pickup and drop-off is included from any hotel or accommodation across Nusa Penida.',
    },
    {
      question: `What should I bring for the ${tour.name}?`,
      answer:
        'Sunscreen, comfortable shoes, swimwear, towel, water bottle, and a camera. We recommend wearing clothes you can swim in.',
    },
  ];

  const guideLinks = getTourRelatedGuideLinks(tour.slug);

  return (
    <>
      {/* Breadcrumb JSON-LD for the tour detail page */}
      <JsonLd
        id={`ld-breadcrumbs-tour-${tour.slug}`}
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Tours', path: '/tours' },
          { name: tour.name, path: `/tours/${tour.slug}` },
        ])}
      />

      {/* Service schema for this specific tour */}
      <JsonLd
        id={`ld-service-${tour.slug}`}
        data={serviceJsonLd({
          name: tour.name,
          description: tour.description,
          price: tour.price,
          currency: tour.currency,
          image: tour.image,
          url: `/tours/${tour.slug}`,
          areaServed: 'Nusa Penida, Bali, Indonesia',
        })}
      />

      {/* Product schema with price + offer */}
      <JsonLd
        id={`ld-product-${tour.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': absoluteUrl(`/tours/${tour.slug}`),
          name: tour.name,
          description: tour.description,
          image: tour.image ? absoluteUrl(tour.image) : absoluteUrl(SITE.ogImage),
          brand: { '@type': 'Brand', name: SITE.name },
          category: 'Travel & Tours',
          offers: {
            '@type': 'Offer',
            url: absoluteUrl(`/tours/${tour.slug}`),
            priceCurrency: tour.currency,
            price: tour.price,
            availability: 'https://schema.org/InStock',
            priceValidUntil: new Date(new Date().getFullYear(), 11, 31)
              .toISOString()
              .split('T')[0],
            seller: { '@id': `${SITE.url}#business` },
          },
          ...(reviewCount > 0
            ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: ratingValue.toString(),
                  reviewCount: reviewCount.toString(),
                  bestRating: '5',
                  worstRating: '1',
                },
              }
            : {}),
        }}
      />

      {/* Per-tour FAQ */}
      <JsonLd id={`ld-faq-${tour.slug}`} data={faqJsonLd(tourFaq)} />

      <TourDetailContent tour={tour} relatedTours={related} faqItems={tourFaq} guideLinks={guideLinks} />
    </>
  );
}
