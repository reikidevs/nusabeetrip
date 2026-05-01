'use client';

import React from 'react';
import Image from 'next/image';
import { TourPackageGrid } from '@/components/business';
import { TourPackage } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface ToursPageContentProps {
  tourPackages: TourPackage[];
}

export default function ToursPageContent({ tourPackages }: ToursPageContentProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(2).jpeg"
            alt="Nusa Penida Tours - Broken Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/80 via-brand-blue-800/70 to-brand-teal-900/80" />
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              {t.tours.heroTitle}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.tours.heroSubtitle}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-base text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.tours.localExpertGuides}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.hero.fairPrices}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t.hero.quickBooking}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
            {t.tours.chooseAdventure}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.tours.chooseAdventureDesc}
          </p>
        </div>
        
        <TourPackageGrid
          tourPackages={tourPackages}
          showTitle={false}
        />
      </div>

      {/* What's Included Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {t.tours.whatsIncluded}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.tours.whatsIncludedDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Professional Guide */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.tours.professionalGuide}</h3>
                    <p className="text-gray-600 leading-relaxed">{t.tours.professionalGuideDesc}</p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl border border-teal-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.tours.comfortableTransport}</h3>
                    <p className="text-gray-600 leading-relaxed">{t.tours.comfortableTransportDesc}</p>
                  </div>
                </div>
              </div>

              {/* Snorkeling Equipment */}
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.tours.snorkelingEquipment}</h3>
                    <p className="text-gray-600 leading-relaxed">{t.tours.snorkelingEquipmentDesc}</p>
                    <span className="inline-block mt-2 text-xs bg-orange-100 text-brand-orange-700 px-3 py-1 rounded-full font-semibold">
                      {t.tours.snorkelingOnly}
                    </span>
                  </div>
                </div>
              </div>

              {/* Underwater Guide */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.tours.underwaterGuide}</h3>
                    <p className="text-gray-600 leading-relaxed">{t.tours.underwaterGuideDesc}</p>
                    <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                      {t.tours.snorkelingOnly}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">{t.tours.entranceNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Tours */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {t.tours.whyChoose}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.tours.whyChooseDesc}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.tours.expertGuides}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.tours.expertGuidesDesc}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.tours.fairPricing}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.tours.fairPricingDesc}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">{t.tours.easyBooking}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{t.tours.easyBookingDesc}</p>
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
              {t.tours.readyExplore}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t.tours.readyExploreDesc}
            </p>
            <a
              href={getWhatsAppLink('bookTour', language)}
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
