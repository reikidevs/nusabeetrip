import { Metadata } from 'next';
import { getTourPackages } from '@/lib/db/queries';
import { TourPackageGrid } from '@/components/business';
import { TourPackage } from '@/types';

// Opt out of static generation — this page fetches from DB at runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tour Packages - Best Travel Nusa Penida | NusaBeeTrip',
  description: 'Discover amazing tour packages in Nusa Penida. West trip, East trip, Mix trip with snorkeling options. Starting from 390,000 IDR.',
  keywords: ['nusa penida tour', 'best travel nusa penida', 'west trip', 'east trip', 'snorkeling tour'],
};

// Transform database tour package to component format
const transformTourPackage = (dbPackage: any): TourPackage => ({
  id: dbPackage.id.toString(),
  name: dbPackage.name,
  slug: dbPackage.slug,
  description: dbPackage.description || '',
  price: dbPackage.priceIdr,
  currency: 'IDR',
  duration: dbPackage.durationHours,
  includesSnorkeling: dbPackage.includesSnorkeling,
  features: Array.isArray(dbPackage.features) ? dbPackage.features : [],
  image: dbPackage.imageUrl || '/images/placeholder-tour.svg',
  isActive: dbPackage.isActive
});

export default async function ToursPage() {
  let tourPackages: TourPackage[] = [];
  
  try {
    const dbPackages = await getTourPackages();
    tourPackages = dbPackages.map(transformTourPackage);
  } catch (error) {
    console.error('Failed to fetch tour packages:', error);
    // Fallback to static data if database is not available
    tourPackages = [
      {
        id: '1',
        name: 'West Trip',
        slug: 'west-trip',
        description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach and Angel Billabong',
        price: 390000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Professional Guide', 'Transportation Included'],
        image: '/images/placeholder-tour.svg',
        isActive: true
      },
      {
        id: '2',
        name: 'East Trip',
        slug: 'east-trip',
        description: 'Discover the eastern wonders of Nusa Penida with stunning beaches and breathtaking viewpoints',
        price: 430000,
        currency: 'IDR',
        duration: 8,
        includesSnorkeling: false,
        features: ['Atuh Beach', 'Diamond Beach', 'Tree House', 'Thousand Islands Viewpoint', 'Professional Guide', 'Transportation Included'],
        image: '/images/placeholder-tour.svg',
        isActive: true
      },
      {
        id: '3',
        name: 'West Trip + Snorkeling',
        slug: 'west-trip-snorkeling',
        description: 'West trip combined with an amazing snorkeling experience in crystal clear waters',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation Included'],
        image: '/images/placeholder-tour.svg',
        isActive: true
      },
      {
        id: '4',
        name: 'East Trip + Snorkeling',
        slug: 'east-trip-snorkeling',
        description: 'East trip with snorkeling adventure in the pristine waters around Nusa Penida',
        price: 550000,
        currency: 'IDR',
        duration: 10,
        includesSnorkeling: true,
        features: ['Atuh Beach', 'Diamond Beach', 'Tree House', 'Thousand Islands Viewpoint', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation Included'],
        image: '/images/placeholder-tour.svg',
        isActive: true
      },
      {
        id: '5',
        name: 'Mix Trip (West & East)',
        slug: 'mix-trip',
        description: 'Combined experience of both western and eastern attractions for the ultimate Nusa Penida adventure',
        price: 500000,
        currency: 'IDR',
        duration: 12,
        includesSnorkeling: false,
        features: ['Best of West Attractions', 'Best of East Attractions', 'Full Island Experience', 'Lunch Included', 'Professional Guide', 'Transportation Included'],
        image: '/images/placeholder-tour.svg',
        isActive: true
      }
    ];
  }

  const handleBookingClick = (packageName: string, price: number) => {
    // Analytics tracking will be handled by WhatsAppBookingButton
    console.log(`Booking clicked for ${packageName} at ${price} IDR`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue-800 to-brand-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Travel Nusa Penida Tour Packages
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              Discover the breathtaking beauty of Nusa Penida with our expertly curated tours
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              From the iconic Kelingking Beach to the pristine Diamond Beach, explore the most stunning 
              attractions with professional guides and comfortable transportation.
            </p>
          </div>
        </div>
      </div>

      {/* Tour Packages Grid */}
      <div className="container mx-auto px-4 py-16">
        <TourPackageGrid
          tourPackages={tourPackages}
          showTitle={false}
        />
      </div>

      {/* Additional Information Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">
                Why Choose Our Tours?
              </h2>
              <p className="text-gray-600 text-lg">
                Experience the best of Nusa Penida with our professional tour services and local expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">Expert Local Guides</h3>
                <p className="text-gray-600">
                  Our experienced guides know every hidden gem and will ensure you have an unforgettable experience.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">Safe & Comfortable</h3>
                <p className="text-gray-600">
                  Travel in comfort with our well-maintained vehicles and comprehensive safety measures.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">Best Value</h3>
                <p className="text-gray-600">
                  Competitive pricing with all-inclusive packages covering transportation, guides, and entrance fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}