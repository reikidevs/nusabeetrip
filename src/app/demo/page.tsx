import React from 'react';
import { TourPackageGrid, TourPackageCard, TourPackageDetail } from '@/components';
import { TourPackage } from '@/types';

// Sample tour package data
const sampleTourPackages: TourPackage[] = [
  {
    id: '1',
    name: 'West Trip',
    slug: 'west-trip',
    description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach, Angel Billabong, and Broken Beach.',
    price: 390000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Professional Guide', 'Transportation'],
    image: '/images/placeholder-tour.svg',
    isActive: true
  },
  {
    id: '2',
    name: 'East Trip',
    slug: 'east-trip',
    description: 'Discover the eastern wonders of Nusa Penida with breathtaking views and pristine beaches.',
    price: 430000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: ['Atuh Beach', 'Diamond Beach', 'Tree House', 'Thousand Islands Viewpoint', 'Professional Guide', 'Transportation'],
    image: '/images/placeholder-tour.svg',
    isActive: true
  },
  {
    id: '3',
    name: 'West Trip + Snorkeling',
    slug: 'west-trip-snorkeling',
    description: 'West trip combined with amazing snorkeling experience in crystal clear waters.',
    price: 550000,
    currency: 'IDR',
    duration: 10,
    includesSnorkeling: true,
    features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation'],
    image: '/images/placeholder-tour.svg',
    isActive: true
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Tour Package Components Demo</h1>
          <p className="text-center mt-2 text-blue-100">
            Showcasing the tour package display components for NusaBeeTrip
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Tour Package Grid Demo */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tour Package Grid Component</h2>
          <TourPackageGrid
            tourPackages={sampleTourPackages}
            showTitle={true}
            title="Featured Tour Packages"
          />
        </section>

        {/* Individual Tour Package Cards */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Individual Tour Package Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleTourPackages.map((tourPackage) => (
              <TourPackageCard
                key={tourPackage.id}
                tourPackage={tourPackage}
              />
            ))}
          </div>
        </section>

        {/* Tour Package Detail View */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tour Package Detail Component</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <TourPackageDetail
              tourPackage={sampleTourPackages[0]}
              images={[
                '/images/placeholder-tour.svg',
                '/images/placeholder-tour.svg',
                '/images/placeholder-tour.svg'
              ]}
            />
          </div>
        </section>

        {/* Component Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Component Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">Responsive Design</h3>
              <p className="text-gray-600 text-sm">
                All components are fully responsive and work seamlessly across mobile, tablet, and desktop devices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">WhatsApp Integration</h3>
              <p className="text-gray-600 text-sm">
                Direct WhatsApp booking with pre-filled messages containing tour details and pricing information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">Image Handling</h3>
              <p className="text-gray-600 text-sm">
                Optimized image loading with fallback placeholders and loading states for better user experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">Brand Colors</h3>
              <p className="text-gray-600 text-sm">
                Consistent use of NusaBeeTrip brand colors throughout all components for cohesive design.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                Components follow accessibility best practices with proper ARIA labels and keyboard navigation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-brand-blue-800 mb-3">Analytics Ready</h3>
              <p className="text-gray-600 text-sm">
                Built-in analytics tracking for booking clicks and user interactions for business insights.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}