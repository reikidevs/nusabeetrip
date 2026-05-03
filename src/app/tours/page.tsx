import { Metadata } from 'next';
import { getTourPackages } from '@/lib/db/queries';
import { TourPackage } from '@/types';
import { resolveTourImage } from '@/lib/image-resolver';
import ToursPageContent from './ToursPageContent';

// Opt out of static generation — this page fetches from DB at runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tour Packages - Best Travel Nusa Penida | NusaBeeTrip',
  description: 'Discover amazing tour packages in Nusa Penida. West trip, East trip, Mix trip with snorkeling options. Starting from 390,000 IDR.',
  keywords: ['nusa penida tour', 'best travel nusa penida', 'west trip', 'east trip', 'snorkeling tour'],
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
    tourPackages = dbPackages.map(transformTourPackage);
  } catch (error) {
    console.error('Failed to fetch tour packages:', error);
    // Fallback static data — images resolved via content matching
    const fallbackData = [
      {
        id: '1',
        name: 'West Trip',
        slug: 'west-trip',
        description: 'Explore the iconic western attractions of Nusa Penida including the world-famous Kelingking Beach, the natural infinity pool at Angel Billabong, and the stunning Broken Beach.',
        price: 390000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay Beach', 'Professional Guide', 'Transportation Included'],
        isActive: true,
      },
      {
        id: '2',
        name: 'East Trip',
        slug: 'east-trip',
        description: 'Discover the hidden gems of eastern Nusa Penida with pristine white sand beaches, dramatic cliffs, and the famous Tree House viewpoint.',
        price: 430000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Diamond Beach', 'Atuh Beach', 'Tree House Viewpoint', 'View Thousand Island', 'Professional Guide', 'Transportation Included'],
        isActive: true,
      },
      {
        id: '3',
        name: 'West Trip + Snorkeling',
        slug: 'west-trip-snorkeling',
        description: 'Experience the best of both worlds - explore stunning western landmarks and dive into crystal-clear waters to discover vibrant marine life and coral reefs.',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Manta Snorkeling', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation Included'],
        isActive: true,
      },
      {
        id: '4',
        name: 'East Trip + Snorkeling',
        slug: 'east-trip-snorkeling',
        description: 'Combine the breathtaking eastern beaches with an unforgettable underwater adventure. Perfect for beach lovers and snorkeling enthusiasts.',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Diamond Beach', 'Atuh Beach', 'Tree House Viewpoint', 'Snorkeling at Best Spots', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation Included'],
        isActive: true,
      },
      {
        id: '5',
        name: 'Mix Trip (West & East)',
        slug: 'mix-trip',
        description: 'The ultimate Nusa Penida experience! Visit the most iconic spots from both western and eastern parts of the island in one comprehensive full-day adventure.',
        price: 500000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Kelingking Beach', 'Broken Beach', 'Angel Billabong', 'Diamond Beach', 'Atuh Beach', 'Full Island Experience', 'Professional Guide', 'Transportation Included'],
        isActive: true,
      },
    ];

    tourPackages = fallbackData.map((pkg) => ({
      ...pkg,
      image: resolveTourImage({
        name: pkg.name,
        features: pkg.features,
        description: pkg.description,
        slug: pkg.slug,
        imageUrl: null,
      }),
    }));
  }

  return <ToursPageContent tourPackages={tourPackages} />;
}