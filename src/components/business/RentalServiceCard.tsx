'use client';

import React from 'react';
import { RentalService } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { formatPriceByLang } from '@/lib/currency';

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
  const { t, language } = useLanguage();
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

  return (
    <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${className} ${!isAvailable ? 'opacity-75' : ''}`}>
      {/* Vehicle Image */}
      <div className="relative h-40 sm:h-56 w-full overflow-hidden">
        <Image
          src={image || '/images/placeholder-tour.svg'}
          alt={`${model} rental - Nusa Penida`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {!isAvailable && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            {t.rentals.notAvailable}
          </div>
        )}
        
        {/* Vehicle Type Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-sm font-semibold text-brand-blue-800 capitalize">{vehicleType}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Vehicle Model */}
        <h3 className="text-base sm:text-xl font-bold text-brand-blue-800 mb-2 sm:mb-3">
          {model}
        </h3>

        {/* Pricing */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-bold text-brand-blue-800">
              {formatPriceByLang(pricePerDay, language).display}
            </span>
            <span className="text-sm font-semibold text-gray-500">{formatPriceByLang(pricePerDay, language).currencyLabel}</span>
          </div>
          <span className="text-xs text-gray-500">{t.rentals.perDay}</span>
          {pricePerHour && (
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-700">
                {formatPriceByLang(pricePerHour, language).display}
              </span>
              <span className="text-xs text-gray-500">{formatPriceByLang(pricePerHour, language).currencyLabel} {t.rentals.perHour} ({t.rentals.minHours})</span>
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">{t.tours.whatsIncludedLabel}</h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-xs text-brand-blue-600 font-semibold ml-6">
                + {features.length - 4} {t.tours.moreIncluded}
              </li>
            )}
          </ul>
        </div>

        {/* Booking Button */}
        <WhatsAppBookingButton
          phoneNumber="+62 896-3128-1234"
          serviceType="rental"
          serviceName={model}
          price={pricePerDay}
          currency={currency}
          className="w-full"
          disabled={!isAvailable}
          onClick={isAvailable ? handleBookingClick : undefined}
        />
        
        {!isAvailable && (
          <p className="text-center text-red-500 text-xs mt-2">
            {t.rentals.currentlyUnavailable}
          </p>
        )}
      </div>
    </div>
  );
};

export default RentalServiceCard;