'use client';

import React from 'react';
import { RentalService } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import TourImage from './TourImage';

interface RentalServiceCardProps {
  rentalService: RentalService;
  onBookingClick?: (vehicleModel: string, price: number) => void;
  className?: string;
}

const RentalServiceCard: React.FC<RentalServiceCardProps> = ({
  rentalService,
  onBookingClick,
  className = ''
}) => {
  const {
    vehicleType,
    model,
    pricePerDay,
    pricePerHour,
    currency,
    features,
    image,
    isAvailable
  } = rentalService;

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick(model, pricePerDay);
    }
  };

  const formatVehicleType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className} ${!isAvailable ? 'opacity-75' : ''}`}>
      {/* Vehicle Image */}
      <div className="relative h-48 w-full">
        <TourImage
          src={image || '/images/placeholder-tour.svg'}
          alt={`${model} ${vehicleType} rental - Nusa Penida`}
          fill
          className="rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {!isAvailable && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Not Available
          </div>
        )}
        <div className="absolute top-3 left-3 bg-brand-blue-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {formatVehicleType(vehicleType)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Vehicle Model */}
        <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
          {model}
        </h3>

        {/* Vehicle Type */}
        <p className="text-gray-600 mb-4 text-sm capitalize">
          {vehicleType} Rental
        </p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-brand-orange-800">
                {pricePerDay.toLocaleString('id-ID')} {currency}
              </span>
              <span className="text-gray-500 ml-2 text-sm">per day</span>
            </div>
            {pricePerHour && (
              <div className="flex items-baseline mt-1">
                <span className="text-lg font-semibold text-gray-700">
                  {pricePerHour.toLocaleString('id-ID')} {currency}
                </span>
                <span className="text-gray-500 ml-2 text-xs">per hour</span>
              </div>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">What&apos;s Included:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Button */}
        <WhatsAppBookingButton
          phoneNumber="+62 896-3128-1234"
          serviceType="rental"
          serviceName={`${model} ${vehicleType}`}
          price={pricePerDay}
          currency={currency}
          className={`w-full ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={isAvailable ? handleBookingClick : undefined}
        />
        
        {!isAvailable && (
          <p className="text-center text-red-500 text-xs mt-2">
            Currently unavailable
          </p>
        )}
      </div>
    </div>
  );
};

export default RentalServiceCard;