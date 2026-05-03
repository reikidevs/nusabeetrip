'use client';

import React from 'react';
import Image from 'next/image';
import { Souvenir } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import { trackBookingClick } from '@/lib/analytics';
import { useLanguage } from '@/lib/LanguageContext';
import { formatUsdPriceByLang } from '@/lib/currency';

export interface SouvenirCardProps {
  souvenir: Souvenir;
  onBookingClick?: (souvenirName: string, price: number) => void;
  className?: string;
}

export const SouvenirCard: React.FC<SouvenirCardProps> = ({
  souvenir,
  onBookingClick,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const { name, description, price, currency, category, image, isAvailable } = souvenir;

  const handleBookingClick = () => {
    trackBookingClick({
      serviceType: 'souvenir',
      serviceName: name,
      price,
      method: 'whatsapp',
    });

    if (onBookingClick) {
      onBookingClick(name, price);
    }
  };



  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 ${
        !isAvailable ? 'opacity-60' : ''
      } ${className}`}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-64 bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-800">
              {t.souvenirs.outOfStock}
            </span>
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-blue-800">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-brand-blue-800 mb-1.5 sm:mb-2 line-clamp-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
          <span className="text-xl sm:text-3xl font-bold text-brand-blue-800">
            {formatUsdPriceByLang(price, language).display}
          </span>
        </div>

        {/* Booking Button */}
        <WhatsAppBookingButton
          phoneNumber="6289631281234"
          serviceType="souvenir"
          serviceName={name}
          price={price}
          currency={currency}
          className="w-full"
          onClick={handleBookingClick}
          disabled={!isAvailable}
        />
      </div>
    </div>
  );
};

export default SouvenirCard;
