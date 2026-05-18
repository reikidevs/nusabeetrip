'use client';

import React from 'react';
import Link from 'next/link';
import { TourPackage } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import Image from 'next/image';
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
    slug,
    description,
    price,
    currency,
    duration,
    includesSnorkeling,
    features,
    image
  } = tourPackage;

  const detailHref = `/tours/${slug}`;

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick(name, price);
    }
  };

  return (
    <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${className}`}>
      {/* Tour Image (linked to detail page) */}
      <Link href={detailHref} className="block relative h-40 sm:h-56 w-full overflow-hidden">
        <Image
          src={image || '/images/placeholder-tour.svg'}
          alt={`${name} - Best Travel Nusa Penida`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Tour Name (linked to detail page) */}
        <Link href={detailHref} className="block group/title">
          <h3 className="text-base sm:text-xl font-bold text-brand-blue-800 mb-2 sm:mb-3 group-hover/title:text-brand-blue-700 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <span className="text-xs text-gray-500 block mb-1">{t.tours.perPerson}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-bold text-brand-blue-800">
              {formatPriceByLang(price, language).display}
            </span>
            <span className="text-sm font-semibold text-gray-500">{formatPriceByLang(price, language).currencyLabel}</span>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <ul className="space-y-2">
            {/* Show all destinations/features first (excluding service items) */}
            {features
              .filter(f => 
                f !== 'Professional Guide' && 
                f !== 'Tax Island' && 
                f !== 'Parking Ticket in Any Spot' && 
                f !== 'Transportation' &&
                f !== 'Snorkeling Equipment' &&
                f !== 'Underwater Guide'
              )
              .map((feature, index) => (
                <li key={`dest-${index}`} className="flex items-start text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            
            {/* Then show service items */}
            {features.includes('Professional Guide') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Professional Guide</span>
              </li>
            )}
            {features.includes('Snorkeling Equipment') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Snorkeling Equipment</span>
              </li>
            )}
            {features.includes('Underwater Guide') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Underwater Guide</span>
              </li>
            )}
            {features.includes('Transportation') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Transportation</span>
              </li>
            )}
            {features.includes('Tax Island') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Tax Island</span>
              </li>
            )}
            {features.includes('Parking Ticket in Any Spot') && (
              <li className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Parking Ticket in Any Spot</span>
              </li>
            )}
          </ul>
        </div>

        {/* Booking Buttons */}
        <div className="space-y-2">
          <Link
            href={detailHref}
            className="flex items-center justify-center gap-2 w-full bg-white border border-brand-blue-200 hover:border-brand-blue-700 hover:bg-brand-blue-50 text-brand-blue-800 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
          >
            {language === 'id' ? 'Lihat Detail' : 'View Details'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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
    </div>
  );
};

export default TourPackageCard;