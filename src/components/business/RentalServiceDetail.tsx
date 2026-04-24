'use client';

import React from 'react';
import { RentalService } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import TourImage from './TourImage';

interface RentalServiceDetailProps {
  rentalService: RentalService;
  onBookingClick?: (vehicleModel: string, price: number) => void;
  className?: string;
}

const RentalServiceDetail: React.FC<RentalServiceDetailProps> = ({
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

  // Sample rental terms and conditions
  const rentalTerms = [
    'Valid driving license required',
    'Minimum age: 18 years old',
    'Fuel not included in rental price',
    'Return vehicle with same fuel level',
    'Damage deposit may be required',
    'Insurance coverage available',
    'Free delivery within Nusa Penida area',
    '24/7 roadside assistance'
  ];

  const specifications = vehicleType === 'motorcycle' 
    ? [
        'Engine: 125cc - 155cc',
        'Transmission: Automatic',
        'Fuel Type: Gasoline',
        'Seating: 2 persons',
        'Storage: Under-seat compartment',
        'Safety: Helmet included'
      ]
    : [
        'Engine: 1.0L - 1.5L',
        'Transmission: Manual/Automatic',
        'Fuel Type: Gasoline',
        'Seating: 4-7 persons',
        'Air Conditioning: Yes',
        'Safety: Seat belts, airbags'
      ];

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Left Column - Image and Basic Info */}
        <div>
          {/* Vehicle Image */}
          <div className="relative h-64 w-full mb-6">
            <TourImage
              src={image || '/images/placeholder-tour.svg'}
              alt={`${model} ${vehicleType} rental - Nusa Penida`}
              fill
              className="rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={true}
            />
            {!isAvailable && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Not Available
              </div>
            )}
            <div className="absolute top-3 left-3 bg-brand-blue-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {formatVehicleType(vehicleType)}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-blue-800 mb-2">
                {model}
              </h1>
              <p className="text-lg text-gray-600 capitalize">
                {vehicleType} Rental in Nusa Penida
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Rental Pricing</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Rate:</span>
                  <span className="text-2xl font-bold text-brand-orange-800">
                    {pricePerDay.toLocaleString('id-ID')} {currency}
                  </span>
                </div>
                {pricePerHour && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hourly Rate:</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {pricePerHour.toLocaleString('id-ID')} {currency}
                    </span>
                  </div>
                )}
              </div>
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
              <p className="text-center text-red-500 text-sm">
                This vehicle is currently unavailable. Contact us for alternative options.
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Details and Features */}
        <div className="space-y-6">
          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-brand-blue-800 mb-4">What&apos;s Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-semibold text-brand-blue-800 mb-4">Specifications</h3>
            <ul className="space-y-2">
              {specifications.map((spec, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-brand-teal-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Rental Terms */}
          <div>
            <h3 className="text-xl font-semibold text-brand-blue-800 mb-4">Rental Terms</h3>
            <ul className="space-y-2">
              {rentalTerms.map((term, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {term}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-brand-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-blue-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact us for questions about availability, pricing, or special requirements.
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> +62 896-3128-1234
              </p>
              <p className="text-gray-600">
                <span className="font-medium">WhatsApp:</span> +62 896-3128-1234
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> sidiqdwiatmoko@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalServiceDetail;