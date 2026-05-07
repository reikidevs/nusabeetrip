import { Metadata } from 'next';
import { getTourPackages } from '@/lib/db/queries';
import { TourPackage } from '@/types';
import { resolveTourImage } from '@/lib/image-resolver';
import ToursPageContent from './ToursPageContent';

// Opt out of static generation — this page fetches from DB at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data
export const fetchCache = 'force-no-store'; // Disable fetch cache
export const runtime = 'nodejs'; // Use Node.js runtime

// Generate unique cache buster
const CACHE_BUSTER = Date.now();

export const metadata: Metadata = {
  title: 'Tour Packages - Best Travel Nusa Penida | NusaBeeTrip',
  description: 'Discover amazing tour packages in Nusa Penida. West trip, East trip, Mix trip with snorkeling options. Starting from 390,000 IDR.',
  keywords: ['nusa penida tour', 'best travel nusa penida', 'west trip', 'east trip', 'snorkeling tour'],
  other: {
    'cache-buster': CACHE_BUSTER.toString(),
  },
};

// Transform database tour package to component format
const transformTourPackage = (dbPackage: any): TourPackage => {
  const features = Array.isArray(dbPackage.features) ? dbPackage.features : [];
  const resolvedImage = resolveTourImage({
    name: dbPackage.name,
    features,
    description: dbPackage.description || '',
    slug: dbPackage.slug,
    imageUrl: dbPackage.imageUrl,
  });

  return {
    id: dbPackage.id.toString(),
    name: dbPackage.name,
    slug: dbPackage.slug,
    description: dbPackage.description || '',
    price: dbPackage.priceIdr,
    currency: 'IDR',
    duration: dbPackage.durationHours,
    includesSnorkeling: dbPackage.includesSnorkeling,
    features,
    image: resolvedImage,
    isActive: dbPackage.isActive,
  };
};

export default async function ToursPage() {
  let tourPackages: TourPackage[] = [];
  
  try {
    const dbPackages = await getTourPackages();
    console.log('✅ Successfully fetched', dbPackages.length, 'tour packages from database');
    
    // Log Snorkeling duration specifically
    const snorkeling = dbPackages.find(pkg => pkg.slug === 'snorkeling-manta');
    if (snorkeling) {
      console.log('🏊 Snorkeling duration from DB:', snorkeling.durationHours, 'hours');
    }
    
    tourPackages = dbPackages.map(transformTourPackage);
    
    // Log transformed Snorkeling
    const transformedSnorkeling = tourPackages.find(pkg => pkg.slug === 'snorkeling-manta');
    if (transformedSnorkeling) {
      console.log('🏊 Snorkeling duration after transform:', transformedSnorkeling.duration, 'hours');
    }
  } catch (error) {
    console.error('❌ Failed to fetch tour packages from database:', error);
    console.log('⚠️ Using fallback static data');
    
    // Fallback static data with correct images matching database
    const fallbackData = [
      {
        id: '1',
        name: 'West Trip',
        slug: 'west-trip',
        description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach',
        price: 390000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
      },
      {
        id: '2',
        name: 'East Trip',
        slug: 'east-trip',
        description: 'Discover the eastern wonders of Nusa Penida with breathtaking viewpoints',
        price: 430000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Diamond Beach', 'Atuh Beach', 'Tree House', 'View Thousand Island', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
      },
      {
        id: '3',
        name: 'West Trip + Snorkeling',
        slug: 'west-trip-snorkeling',
        description: 'West trip combined with amazing Manta snorkeling experience',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Manta Snorkeling', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
      },
      {
        id: '4',
        name: 'East Trip + Snorkeling',
        slug: 'east-trip-snorkeling',
        description: 'East trip with snorkeling adventure at the best spots',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Diamond Beach', 'Atuh Beach', 'Tree House', 'View Thousand Island', 'Snorkeling at Best Spots', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
      },
      {
        id: '5',
        name: 'Mix Trip (West & East)',
        slug: 'mix-trip',
        description: 'Combined west and east attractions tour for the complete Nusa Penida experience',
        price: 500000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Kelingking Beach', 'Broken Beach', 'Angel Billabong', 'Diamond Beach', 'Atuh Beach', 'Full Island Experience', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/Mix%20Trip%20Diamond%20Kelingking.png',
      },
      {
        id: '6',
        name: "Snorkeling with Manta Ray's",
        slug: 'snorkeling-manta',
        description: 'Swim alongside majestic Manta Rays and explore 4 incredible snorkeling spots',
        price: 200000,
        currency: 'IDR',
        duration: 2,
        includesSnorkeling: true,
        features: ['Manta Bay', 'Crystal Bay', 'Gamat Bay', 'Wall Point', 'Snorkeling Equipment', 'Professional Guide', 'Transportation', 'Tax Island', 'Parking Ticket in Any Spot'],
        isActive: true,
        imageUrl: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg',
      },
    ];

    tourPackages = fallbackData.map((pkg) => ({
      ...pkg,
      image: resolveTourImage({
        name: pkg.name,
        features: pkg.features,
        description: pkg.description,
        slug: pkg.slug,
        imageUrl: pkg.imageUrl,
      }),
    }));
  }

  return <ToursPageContent tourPackages={tourPackages} />;
}