import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRentalServiceBySlug, getRentalServices } from '@/lib/db/queries';
import { RENTAL_SERVICES } from '@/lib/constants';
import { JsonLd } from '@/components/seo';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site-config';
import type { RentalService } from '@/types';
import RentalDetailContent from './RentalDetailContent';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const VEHICLE_IMAGE_MAP: Record<string, string> = {
  'yamaha n-max': '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'n-max': '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  nmax: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'honda vario': '/images/Vehicle%20Rentals/Honda%20Vario.png',
  vario: '/images/Vehicle%20Rentals/Honda%20Vario.png',
  'honda scoopy': '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
  scoopy: '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
  'car with driver': '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
  car: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
};

function resolveImage(model: string, dbImageUrl?: string | null) {
  if (dbImageUrl && !dbImageUrl.includes('placeholder')) return dbImageUrl;
  const lower = model.toLowerCase();
  for (const [key, url] of Object.entries(VEHICLE_IMAGE_MAP)) {
    if (lower.includes(key)) return url;
  }
  return '/images/placeholder-tour.svg';
}

export async function generateStaticParams() {
  return RENTAL_SERVICES.filter((r) => r.isAvailable).map((r) => ({ slug: r.slug }));
}

async function loadRental(slug: string): Promise<RentalService | null> {
  try {
    const db = await getRentalServiceBySlug(slug);
    if (db) {
      return {
        id: db.id.toString(),
        vehicleType: db.vehicleType as 'motorcycle' | 'car',
        model: db.model,
        slug: db.slug,
        pricePerDay: db.pricePerDayIdr,
        pricePerHour: db.pricePerHourIdr ?? undefined,
        currency: 'IDR',
        features: Array.isArray(db.features) ? (db.features as string[]) : [],
        image: resolveImage(db.model, db.imageUrl),
        isAvailable: db.isAvailable ?? true,
      };
    }
  } catch {
    // fall back to static
  }
  return RENTAL_SERVICES.find((r) => r.slug === slug && r.isAvailable) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const rental = await loadRental(params.slug);
  if (!rental) {
    return buildMetadata({
      title: 'Rental not found',
      description: 'The vehicle you are looking for is not available.',
      path: `/rentals/${params.slug}`,
      index: false,
    });
  }

  const priceDisplay = `${(rental.pricePerDay / 1000).toFixed(0)}K IDR`;
  const vehicleLabel =
    rental.vehicleType === 'car' ? 'Car Rental' : 'Motorcycle Rental';

  return buildMetadata({
    title: `${rental.model} ${vehicleLabel} Nusa Penida — From ${priceDisplay}/Day`,
    description: `Rent a ${rental.model} in Nusa Penida for ${priceDisplay} per day. ${rental.features
      .slice(0, 3)
      .join(', ')}. Free delivery, helmet, and insurance included. Book on WhatsApp.`.slice(
      0,
      160,
    ),
    path: `/rentals/${rental.slug}`,
    keywords: [
      `${rental.model.toLowerCase()} rental nusa penida`,
      `sewa ${rental.model.toLowerCase()} nusa penida`,
      `${rental.vehicleType} rental nusa penida`,
      `${rental.slug.replace(/-/g, ' ')}`,
    ],
    image: rental.image,
    imageAlt: `${rental.model} rental in Nusa Penida`,
  });
}

export default async function RentalDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const rental = await loadRental(params.slug);
  if (!rental) notFound();

  // related rentals
  let related: RentalService[] = [];
  try {
    const all = await getRentalServices();
    related = all
      .filter((r) => r.slug !== rental.slug && (r.isAvailable ?? true))
      .slice(0, 3)
      .map((r) => ({
        id: r.id.toString(),
        vehicleType: r.vehicleType as 'motorcycle' | 'car',
        model: r.model,
        slug: r.slug,
        pricePerDay: r.pricePerDayIdr,
        pricePerHour: r.pricePerHourIdr ?? undefined,
        currency: 'IDR',
        features: Array.isArray(r.features) ? (r.features as string[]) : [],
        image: resolveImage(r.model, r.imageUrl),
        isAvailable: r.isAvailable ?? true,
      }));
  } catch {
    related = RENTAL_SERVICES.filter(
      (r) => r.slug !== rental.slug && r.isAvailable,
    ).slice(0, 3);
  }

  const rentalFaq = [
    {
      question: `How much does the ${rental.model} cost in Nusa Penida?`,
      answer: `The ${rental.model} costs ${rental.pricePerDay.toLocaleString('id-ID')} IDR per day in Nusa Penida, with free delivery, helmet, and full tank included.`,
    },
    {
      question: `Do I need a license to rent the ${rental.model}?`,
      answer:
        rental.vehicleType === 'motorcycle'
          ? 'Yes, a valid international or local driving license for motorcycles is required. Minimum age is 18.'
          : 'Our cars come with a professional driver, so no license is required from you.',
    },
    {
      question: `Is delivery to my hotel included?`,
      answer:
        'Yes, free delivery and pickup is included anywhere in Nusa Penida. Just share your accommodation when booking.',
    },
    {
      question: `What if something goes wrong during the rental?`,
      answer:
        'We provide 24/7 roadside support via WhatsApp. Insurance is included and any minor issues are handled at no extra cost.',
    },
  ];

  return (
    <>
      <JsonLd
        id={`ld-breadcrumbs-rental-${rental.slug}`}
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Rentals', path: '/rentals' },
          { name: rental.model, path: `/rentals/${rental.slug}` },
        ])}
      />
      <JsonLd
        id={`ld-product-${rental.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': absoluteUrl(`/rentals/${rental.slug}`),
          name: rental.model,
          category:
            rental.vehicleType === 'car' ? 'Car Rental' : 'Motorcycle Rental',
          description: `${rental.model} rental in Nusa Penida — ${rental.features
            .slice(0, 3)
            .join(', ')}.`,
          image: rental.image
            ? absoluteUrl(rental.image)
            : absoluteUrl(SITE.ogImage),
          brand: { '@type': 'Brand', name: SITE.name },
          offers: {
            '@type': 'Offer',
            url: absoluteUrl(`/rentals/${rental.slug}`),
            priceCurrency: rental.currency,
            price: rental.pricePerDay,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: rental.pricePerDay,
              priceCurrency: rental.currency,
              unitText: 'per day',
            },
            availability: rental.isAvailable
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: { '@id': `${SITE.url}#business` },
          },
        }}
      />
      <JsonLd id={`ld-faq-${rental.slug}`} data={faqJsonLd(rentalFaq)} />

      <RentalDetailContent
        rental={rental}
        relatedRentals={related}
        faqItems={rentalFaq}
      />
    </>
  );
}
