import { Metadata } from 'next';
import { getRentalServices } from '@/lib/db/queries';
import { RentalService } from '@/types';
import RentalsPageContent from './RentalsPageContent';

// Opt out of static generation — this page fetches from DB at runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vehicle Rentals - Motorcycle & Car Rental | NusaBeeTrip',
  description: 'Rent motorcycles and cars in Nusa Penida. N-Max, Vario, Scoopy motorcycles and car rentals available. Starting from 100,000 IDR per day.',
  keywords: ['nusa penida rental', 'motorcycle rental', 'car rental', 'nmax rental', 'vario rental'],
};

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
 * 1. ALWAYS use DB imageUrl if provided (prioritize database)
 * 2. Otherwise match model name to known vehicle image
 * 3. Fallback to placeholder
 */
function resolveRentalImage(model: string, dbImageUrl: string | null): string {
  // 1. ALWAYS prioritize DB imageUrl if it exists and is not a placeholder
  if (dbImageUrl && !dbImageUrl.includes('placeholder')) {
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
  let rentalServices: RentalService[] = [];
  
  try {
    const dbServices = await getRentalServices();
    console.log('✅ Successfully fetched', dbServices.length, 'rental services from database');
    rentalServices = dbServices.map(transformRentalService);
  } catch (error) {
    console.error('❌ Failed to fetch rental services from database:', error);
    console.log('⚠️ Using fallback static data');
    
    // Fallback to static data with correct images matching database
    rentalServices = [
      {
        id: '1',
        vehicleType: 'motorcycle',
        model: 'N-Max',
        slug: 'nmax-motorcycle',
        pricePerDay: 125000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Comfortable Seat', 'Storage Space', 'Helmet Included', 'Full Tank', 'Insurance Covered'],
        image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
        isAvailable: true
      },
      {
        id: '2',
        vehicleType: 'motorcycle',
        model: 'Vario',
        slug: 'vario-motorcycle',
        pricePerDay: 100000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Fuel Efficient', 'Easy Handling', 'Helmet Included', 'Full Tank', 'Insurance Covered'],
        image: '/images/Vehicle%20Rentals/Honda%20Vario.png',
        isAvailable: true
      },
      {
        id: '3',
        vehicleType: 'motorcycle',
        model: 'Scoopy',
        slug: 'scoopy-motorcycle',
        pricePerDay: 100000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Lightweight', 'Perfect for Beginners', 'Helmet Included', 'Full Tank', 'Insurance Covered'],
        image: '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
        isAvailable: true
      },
      {
        id: '4',
        vehicleType: 'car',
        model: 'Car Rental',
        slug: 'car-rental',
        pricePerDay: 500000,
        pricePerHour: 125000,
        currency: 'IDR',
        features: ['Air Conditioning', 'Driver Included', 'Comfortable for 4-6 People', 'Full Tank', 'Insurance Covered', 'Local Driver Knowledge'],
        image: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
        isAvailable: true
      }
    ];
  }

  return <RentalsPageContent rentalServices={rentalServices} />;
}