import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getRentalServices } from '@/lib/db/queries';
import { RENTAL_SERVICES } from '@/lib/constants';
import { RentalService } from '@/types';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata, rentalServiceListJsonLd } from '@/lib/seo';
import { localeFromPath, localizedPath } from '@/lib/site-config';
import RentalsPageContent from './RentalsPageContent';
import { isLocalImageAvailable } from '@/lib/image-resolver';

// ISR: revalidate every hour so availability stays fresh without a full
// server render on every request (better TTFB + crawl budget).
export const revalidate = 3600;


export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Vehicle Rentals — Motorcycle & Car with Driver',
  description:
    'Rent Yamaha N-Max, Honda Vario, Honda Scoopy, or a car with driver in Nusa Penida. See vehicle-specific inclusions and book via WhatsApp. From 100K IDR/day.',
  path: '/rentals',
  keywords: [
    'sewa motor nusa penida',
    'nusa penida motorcycle rental',
    'nusa penida car rental',
    'nmax rental nusa penida',
    'honda vario nusa penida',
    'scoopy nusa penida',
    'car with driver nusa penida',
  ],
  image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  imageAlt: 'Vehicle Rentals in Nusa Penida',
});

/** Model-name → image-file mapping for reliable image resolution */
const VEHICLE_IMAGE_MAP: Record<string, string> = {
  'yamaha n-max':   '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'n-max':          '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'nmax':           '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'honda vario':    '/images/Vehicle%20Rentals/Honda%20Vario.png',
  'vario':          '/images/Vehicle%20Rentals/Honda%20Vario.png',
  'honda scoopy':   '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
  'scoopy':         '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
  'car with driver': '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
  'car':            '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
};

/**
 * Resolve a valid image path for a rental vehicle.
 * 1. Use DB imageUrl only when it is a verified local asset
 * 2. Otherwise match model name to known vehicle image
 * 3. Fallback to placeholder
 */
function resolveRentalImage(model: string, dbImageUrl: string | null): string {
  // 1. Reject stale or external DB paths before they reach next/image.
  if (
    dbImageUrl &&
    !dbImageUrl.includes('placeholder') &&
    isLocalImageAvailable(dbImageUrl)
  ) {
    return dbImageUrl;
  }

  // 2. Match model name to known vehicle images
  const modelLower = model.toLowerCase().trim();
  for (const [keyword, imagePath] of Object.entries(VEHICLE_IMAGE_MAP)) {
    if (modelLower.includes(keyword)) {
      return imagePath;
    }
  }

  // 3. Fallback
  return '/images/placeholder-tour.svg';
}

// Transform database rental service to component format
const transformRentalService = (dbService: any): RentalService => ({
  id: dbService.id.toString(),
  vehicleType: dbService.vehicleType,
  model: dbService.model,
  slug: dbService.slug,
  pricePerDay: dbService.pricePerDayIdr,
  pricePerHour: dbService.pricePerHourIdr,
  currency: 'IDR',
  features: Array.isArray(dbService.features) ? dbService.features : [],
  image: resolveRentalImage(dbService.model, dbService.imageUrl),
  isAvailable: dbService.isAvailable
});

export default async function RentalsPage() {
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const isIndonesian = locale === 'id';
  let rentalServices: RentalService[] = [];
  
  try {
    const dbServices = await getRentalServices();
    rentalServices = dbServices.map(transformRentalService);
  } catch (error) {
    console.error('Failed to fetch rental services from database:', error);
    
    // Keep fallback facts in one canonical source so inclusions cannot drift.
    rentalServices = RENTAL_SERVICES.filter((rental) => rental.isAvailable);
  }

  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-rentals"
        data={breadcrumbJsonLd([
          { name: isIndonesian ? 'Beranda' : 'Home', path: localizedPath('/', locale) },
          { name: isIndonesian ? 'Rental' : 'Rentals', path: localizedPath('/rentals', locale) },
        ])}
      />
      <JsonLd id="ld-rental-list" data={rentalServiceListJsonLd(rentalServices, locale)} />
      <RentalsPageContent rentalServices={rentalServices} />
    </>
  );
}
