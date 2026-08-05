import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
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
import { getTourRelatedGuideLinks } from '@/lib/guides';
import { localeFromPath, localizedPath } from '@/lib/site-config';
import type { TourPackage } from '@/types';
import TourDetailContent from './TourDetailContent';

export const revalidate = 3600;
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
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const tour = await loadTour(params.slug);
  if (!tour) notFound();
  const isIndonesian = locale === 'id';

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
  const tourFaq = isIndonesian
    ? [
        {
          question: `Berapa lama durasi ${tour.name}?`,
          answer: `${tour.name} berlangsung sekitar ${tour.duration} jam, termasuk penjemputan, kunjungan ke seluruh destinasi, dan pengantaran kembali.`,
        },
        {
          question: `Berapa harga ${tour.name}?`,
          answer: `Harga ${tour.name} adalah ${tour.price.toLocaleString('id-ID')} IDR per orang, termasuk pemandu profesional, transportasi, pajak pulau, dan tiket parkir.`,
        },
        {
          question: `Apakah penjemputan hotel termasuk dalam ${tour.name}?`,
          answer:
            'Ya. Penjemputan dan pengantaran gratis tersedia dari hotel atau akomodasi di seluruh Nusa Penida.',
        },
        {
          question: `Apa yang perlu dibawa untuk ${tour.name}?`,
          answer:
            'Bawa tabir surya, sepatu nyaman, pakaian renang, handuk, botol minum, dan kamera. Sebaiknya kenakan pakaian yang nyaman untuk berenang.',
        },
      ]
    : [
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

  const guideLinks = getTourRelatedGuideLinks(tour.slug, locale);
  const homePath = localizedPath('/', locale);
  const toursPath = localizedPath('/tours', locale);
  const tourPath = localizedPath(`/tours/${tour.slug}`, locale);

  return (
    <>
      {/* Breadcrumb JSON-LD for the tour detail page */}
      <JsonLd
        id={`ld-breadcrumbs-tour-${tour.slug}`}
        data={breadcrumbJsonLd([
          { name: isIndonesian ? 'Beranda' : 'Home', path: homePath },
          { name: isIndonesian ? 'Tur' : 'Tours', path: toursPath },
          { name: tour.name, path: tourPath },
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
          available: tour.isActive,
          image: tour.image,
          url: tourPath,
          areaServed: 'Nusa Penida, Bali, Indonesia',
        })}
      />

      {/* Per-tour FAQ */}
      <JsonLd id={`ld-faq-${tour.slug}`} data={faqJsonLd(tourFaq)} />

      <TourDetailContent tour={tour} relatedTours={related} faqItems={tourFaq} guideLinks={guideLinks} />
    </>
  );
}
