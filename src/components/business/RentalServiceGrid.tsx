'use client';

import React from 'react';
import { RentalService } from '@/types';
import RentalServiceCard from './RentalServiceCard';

interface RentalServiceGridProps {
  rentalServices: RentalService[];
  onBookingClick?: (vehicleModel: string, price: number) => void;
  className?: string;
  showTitle?: boolean;
  title?: string;
  maxItems?: number;
}

const RentalServiceGrid: React.FC<RentalServiceGridProps> = ({
  rentalServices,
  onBookingClick,
  className = '',
  showTitle = true,
  title = 'Vehicle Rentals',
  maxItems
}) => {
  // Filter available services and limit if maxItems is specified
  const availableServices = rentalServices.filter(service => service.isAvailable);
  const displayServices = maxItems 
    ? availableServices.slice(0, maxItems)
    : availableServices;

  // Group services by vehicle type for better organization
  const groupedServices = displayServices.reduce((acc, service) => {
    if (!acc[service.vehicleType]) {
      acc[service.vehicleType] = [];
    }
    acc[service.vehicleType].push(service);
    return acc;
  }, {} as Record<string, RentalService[]>);

  const handleBookingClick = (vehicleModel: string, price: number) => {
    if (onBookingClick) {
      onBookingClick(vehicleModel, price);
    }
  };

  if (displayServices.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Vehicles Available</h3>
          <p className="text-gray-500">
            All vehicles are currently rented out. Please check back later or contact us for availability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore Nusa Penida with our reliable vehicle rentals. Choose from motorcycles and cars 
            to suit your adventure needs.
          </p>
        </div>
      )}

      {/* Render services grouped by vehicle type */}
      <div className="space-y-8">
        {Object.entries(groupedServices).map(([vehicleType, services]) => (
          <div key={vehicleType}>
            {/* Vehicle Type Section Header */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-brand-blue-800 capitalize mb-2">
                {vehicleType} Rentals
              </h3>
              <div className="w-16 h-1 bg-brand-orange-800 rounded"></div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <RentalServiceCard
                  key={service.id}
                  rentalService={service}
                  onBookingClick={handleBookingClick}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Show more link if maxItems is set and there are more services */}
      {maxItems && availableServices.length > maxItems && (
        <div className="text-center mt-8">
          <a
            href="/rentals"
            className="inline-flex items-center px-6 py-3 bg-brand-blue-800 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition-colors duration-200"
          >
            View All Rentals
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default RentalServiceGrid;