'use client';

import React from 'react';
import { RentalServiceGrid } from '@/components/business';
import { RentalService } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface RentalsPageContentProps {
  rentalServices: RentalService[];
}

export default function RentalsPageContent({ rentalServices }: RentalsPageContentProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-800 to-brand-teal-600"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              {t.rentals.heroTitle}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.rentals.heroSubtitle}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-base text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.rentals.wellMaintained}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.rentals.affordablePrices}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.rentals.freeDelivery}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Services Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
            {t.rentals.chooseVehicle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.rentals.chooseVehicleDesc}
          </p>
        </div>
        
        <RentalServiceGrid
          rentalServices={rentalServices}
          showTitle={false}
        />
      </div>

      {/* Why Choose Our Rentals */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {t.rentals.whyChoose}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.rentals.whyChooseDesc}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.rentals.qualityVehicles}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.rentals.qualityVehiclesDesc}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.rentals.support247}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.rentals.support247Desc}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.rentals.freeDeliveryTitle}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.rentals.freeDeliveryDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-blue-800 to-brand-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.rentals.readyExplore}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t.rentals.readyExploreDesc}
            </p>
            <a
              href={getWhatsAppLink('rentVehicle', language)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-blue-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.common.bookViaWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
