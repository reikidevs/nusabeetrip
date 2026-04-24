'use client';

import React from 'react';
import { TourPackage } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import TourImage from './TourImage';

interface TourPackageCardProps {
  tourPackage: TourPackage;
  onBookingClick?: (packageName: string, price: number) => void;
  className?: string;
}

const TourPackageCard: React.FC<TourPackageCardProps> = ({
  tourPackage,
  onBookingClick,
  className = ''
}) => {
  const {
    name,
    description,
    price,
    currency,
    duration,
    includesSnorkeling,
    features,
    image
  } = tourPackage;

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick(name, price);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Tour Image */}
      <div className="relative h-48 w-full">
        <TourImage
          src={image || '/images/placeholder-tour.svg'}
          alt={`${name} - Best Travel Nusa Penida`}
          fill
          className="rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {includesSnorkeling && (
          <div className="absolute top-3 right-3 bg-brand-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            + Snorkeling
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Tour Name */}
        <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Duration */}
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration} hours
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-brand-orange-800">
            {price.toLocaleString('id-ID')} {currency}
          </span>
          <span className="text-gray-500 ml-2 text-sm">per person</span>
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
          serviceType="tour"
          serviceName={name}
          price={price}
          currency={currency}
          className="w-full"
          onClick={handleBookingClick}
        />
      </div>
    </div>
  );
};

export default TourPackageCard;