import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getRentalServiceBySlug, getRentalServices } from '@/lib/db/queries';
import { RENTAL_SERVICES } from '@/lib/constants';
import { JsonLd } from '@/components/seo';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import { formatRentalList, getRentalIncludedBenefits } from '@/lib/rentals';
import type { RentalService } from '@/types';
import { localeFromPath, localizedPath } from '@/lib/site-config';
import RentalDetailContent from './RentalDetailContent';
import { isLocalImageAvailable } from '@/lib/image-resolver';

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
  if (
    dbImageUrl &&
    !dbImageUrl.includes('placeholder') &&
    isLocalImageAvailable(dbImageUrl)
  ) {
    return dbImageUrl;
  }
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
  const isCar = rental.vehicleType === 'car';
  const includedBenefits = getRentalIncludedBenefits(rental, 'en');
  const inclusionCopy = includedBenefits.length
    ? ` Includes ${formatRentalList(includedBenefits, 'en')}.`
    : '';

  return buildMetadata({
    title: isCar
      ? `Car with Driver Nusa Penida — From ${priceDisplay}`
      : `${rental.model} Motorcycle Rental Nusa Penida — From ${priceDisplay}/Day`,
    description: `${isCar ? 'Hire a car with driver' : `Rent a ${rental.model}`} in Nusa Penida for ${priceDisplay}${isCar ? '' : ' per day'}.${inclusionCopy} Book on WhatsApp.`.slice(0, 160),
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
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const isIndonesian = locale === 'id';

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

  const hasIncludedDriver = rental.features.some((feature) =>
    /(?:professional driver|driver included)/i.test(feature),
  );

  const rentalFaq = isIndonesian
    ? [
        {
          question: `Berapa harga sewa ${rental.model} di Nusa Penida?`,
          answer: `Harga sewa ${rental.model} adalah ${rental.pricePerDay.toLocaleString('id-ID')} IDR per hari di Nusa Penida, termasuk pengantaran gratis dan perlengkapan yang tercantum pada paket.`,
        },
        {
          question: `Apakah perlu SIM untuk menyewa ${rental.model}?`,
          answer:
            rental.vehicleType === 'motorcycle'
              ? 'Ya. Anda memerlukan SIM internasional atau SIM lokal yang berlaku untuk sepeda motor dan harus berusia minimal 18 tahun.'
              : hasIncludedDriver
                ? 'Mobil ini disertai sopir profesional, jadi Anda tidak perlu memiliki SIM.'
                : 'Hubungi kami untuk memastikan opsi sopir dan persyaratan SIM kendaraan ini.',
        },
        {
          question: 'Apakah pengantaran ke hotel termasuk?',
          answer:
            'Ya. Pengantaran dan penjemputan gratis tersedia di area Nusa Penida. Beri tahu lokasi akomodasi saat memesan.',
        },
        {
          question: 'Bagaimana jika terjadi kendala selama masa sewa?',
          answer:
            'Hubungi kami melalui WhatsApp untuk mendapatkan bantuan. Tim lokal kami akan membantu menangani kendala kendaraan secepat mungkin.',
        },
      ]
    : [
        {
          question: `How much does the ${rental.model} cost in Nusa Penida?`,
          answer: `The ${rental.model} costs ${rental.pricePerDay.toLocaleString('id-ID')} IDR per day in Nusa Penida, including free delivery and the equipment listed with the rental.`,
        },
        {
          question: `Do I need a license to rent the ${rental.model}?`,
          answer:
            rental.vehicleType === 'motorcycle'
              ? 'Yes, a valid international or local driving license for motorcycles is required. Minimum age is 18.'
              : hasIncludedDriver
                ? 'This car comes with a professional driver, so no license is required from you.'
                : 'Contact us to confirm the driver option and licence requirements for this vehicle.',
        },
        {
          question: 'Is delivery to my hotel included?',
          answer:
            'Yes, free delivery and pickup is available across Nusa Penida. Share your accommodation location when booking.',
        },
        {
          question: 'What if something goes wrong during the rental?',
          answer:
            'Contact us on WhatsApp for assistance. Our local team will help resolve vehicle issues as quickly as possible.',
        },
      ];

  const homePath = localizedPath('/', locale);
  const rentalsPath = localizedPath('/rentals', locale);
  const rentalPath = localizedPath(`/rentals/${rental.slug}`, locale);
  const includedBenefits = getRentalIncludedBenefits(rental, locale);
  const inclusionSummary = formatRentalList(includedBenefits, locale);

  return (
    <>
      <JsonLd
        id={`ld-breadcrumbs-rental-${rental.slug}`}
        data={breadcrumbJsonLd([
          { name: isIndonesian ? 'Beranda' : 'Home', path: homePath },
          { name: isIndonesian ? 'Rental' : 'Rentals', path: rentalsPath },
          { name: rental.model, path: rentalPath },
        ])}
      />
      <JsonLd
        id={`ld-service-${rental.slug}`}
        data={serviceJsonLd({
          name: isIndonesian ? `Sewa ${rental.model}` : `${rental.model} rental`,
          description: isIndonesian
            ? `Sewa ${rental.model} di Nusa Penida${inclusionSummary ? `, termasuk ${inclusionSummary}` : ''}. Pesan melalui WhatsApp.`
            : `${rental.model} rental in Nusa Penida${inclusionSummary ? `, including ${inclusionSummary}` : ''}. Book through WhatsApp.`,
          price: rental.pricePerDay,
          currency: rental.currency,
          available: rental.isAvailable,
          unitText: isIndonesian ? 'per hari' : 'per day',
          image: rental.image,
          url: rentalPath,
          areaServed: 'Nusa Penida, Bali, Indonesia',
        })}
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
