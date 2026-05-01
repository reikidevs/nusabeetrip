'use client';

import React from 'react';
import { TourPackage } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import TourImage from './TourImage';
import { useLanguage } from '@/lib/LanguageContext';
import { formatPriceByLang } from '@/lib/currency';

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
  const { t, language } = useLanguage();
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
    <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${className}`}>
      {/* Tour Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <TourImage
          src={image || '/images/placeholder-tour.svg'}
          alt={`${name} - Best Travel Nusa Penida`}
          fill
          className="rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {includesSnorkeling && (
          <div className="absolute top-4 right-4 bg-brand-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            {t.common.snorkeling}
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-brand-blue-800">{duration} {t.tours.hours.toLowerCase()}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Tour Name */}
        <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-brand-blue-800">
              {formatPriceByLang(price, language).display}
            </span>
            <span className="text-sm font-semibold text-gray-500">{formatPriceByLang(price, language).currencyLabel}</span>
          </div>
          <span className="text-xs text-gray-500">{t.tours.perPerson}</span>
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