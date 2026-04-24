'use client';

import React from 'react';
import { TourPackage } from '@/types';
import TourPackageCard from './TourPackageCard';

interface TourPackageGridProps {
  tourPackages: TourPackage[];
  onBookingClick?: (packageName: string, price: number) => void;
  className?: string;
  showTitle?: boolean;
  title?: string;
  maxItems?: number;
}

const TourPackageGrid: React.FC<TourPackageGridProps> = ({
  tourPackages,
  onBookingClick,
  className = '',
  showTitle = true,
  title = 'Our Tour Packages',
  maxItems
}) => {
  // Filter active packages and limit if maxItems is specified
  const displayPackages = tourPackages
    .filter(pkg => pkg.isActive)
    .slice(0, maxItems);

  if (displayPackages.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg">No tour packages available at the moment.</p>
          <p className="text-sm mt-2">Please check back later or contact us directly.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the breathtaking beauty of Nusa Penida with our carefully curated tour packages. 
            Each tour is designed to showcase the island&apos;s most stunning attractions.
          </p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPackages.map((tourPackage) => (
          <TourPackageCard
            key={tourPackage.id}
            tourPackage={tourPackage}
            onBookingClick={onBookingClick}
            className="h-full"
          />
        ))}
      </div>

      {/* Show More Link if there are more packages */}
      {maxItems && tourPackages.filter(pkg => pkg.isActive).length > maxItems && (
        <div className="text-center mt-12">
          <a
            href="/tours"
            className="inline-flex items-center px-6 py-3 bg-brand-blue-800 hover:bg-brand-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            View All Tour Packages
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
};

export default TourPackageGrid;