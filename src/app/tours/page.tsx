import { Metadata } from 'next';
import Image from 'next/image';
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
        image: '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg',
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
        image: '/images/East%20Trip/WhatsApp%20Image%202026-04-19%20at%2020.32.36.jpeg',
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
        image: '/images/Crystal%20Bay%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.14.jpeg',
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
        image: '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.15.jpeg',
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
        features: ['Best of West Attractions', 'Best of East Attractions', 'Full Island Experience', 'Professional Guide', 'Transportation Included'],
        image: '/images/Atuh%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.35.33.jpeg',
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
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.24.56.jpeg"
            alt="Nusa Penida Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/90 via-brand-blue-800/85 to-brand-teal-900/90" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best Travel Nusa Penida Tour Packages
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95 leading-relaxed max-w-2xl mx-auto">
              Discover the breathtaking beauty of Nusa Penida with our expertly curated tours
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
              From the iconic Kelingking Beach to the pristine Diamond Beach, explore the most stunning 
              attractions with professional guides and comfortable transportation.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-base text-white/95">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>5 Tour Options</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Professional Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>All-Inclusive Packages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our carefully designed tour packages to explore the best of Nusa Penida
          </p>
        </div>
        
        <TourPackageGrid
          tourPackages={tourPackages}
          showTitle={false}
        />
      </div>

      {/* What's Included Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4">
                What&apos;s Included
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every tour package comes with professional service and comfortable transportation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Professional Guide */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">Professional Guide</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experienced local guides who know the best spots, stories, and ensure your safety throughout the journey
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl border border-teal-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">Transportation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Comfortable vehicles to take you to all destinations safely and conveniently
                    </p>
                  </div>
                </div>
              </div>

              {/* Snorkeling Equipment - Only for snorkeling packages */}
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">Snorkeling Equipment</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Complete snorkeling gear provided for packages with snorkeling activities
                    </p>
                    <span className="inline-block mt-2 text-xs bg-orange-100 text-brand-orange-700 px-3 py-1 rounded-full font-semibold">
                      Snorkeling packages only
                    </span>
                  </div>
                </div>
              </div>

              {/* Underwater Guide - Only for snorkeling packages */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">Underwater Guide</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Expert underwater guide to show you the best snorkeling spots and marine life
                    </p>
                    <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                      Snorkeling packages only
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Note: Entrance fees to attractions are not included and will be paid separately at each location
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Tours - Horizontal Layout */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4">
                Why Choose Our Tours?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the best of Nusa Penida with our professional tour services and local expertise
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">Expert Local Guides</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our experienced guides know every hidden gem and will ensure you have an unforgettable experience with insider knowledge and local stories.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">Safe & Comfortable</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Travel in comfort with our well-maintained vehicles and comprehensive safety measures. Your safety is our top priority.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">Best Value</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Competitive pricing with all-inclusive packages covering transportation, guides, and entrance fees. No hidden costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-blue-800 to-brand-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Nusa Penida?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Book your tour today and create unforgettable memories in paradise
            </p>
            <a
              href="https://wa.me/6289631281234?text=Hi!%20I%27m%20interested%20in%20booking%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-blue-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}