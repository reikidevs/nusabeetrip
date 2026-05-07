'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TourPackageGrid } from '@/components/business';
import { TourPackage } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface ToursPageContentProps {
  tourPackages: TourPackage[];
}

export default function ToursPageContent({ tourPackages }: ToursPageContentProps) {
  const { t, language } = useLanguage();

  const totalTours = tourPackages.length;
  const snorkelTours = tourPackages.filter(p => p.includesSnorkeling).length;
  const landTours = totalTours - snorkelTours;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg"
            alt="Kelingking Beach - Nusa Penida Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/85 via-brand-blue-800/75 to-brand-teal-900/85" />
        </div>
        
        <div className="container mx-auto px-4 py-16 sm:py-28 md:py-40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/95 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === 'id' ? 'Petualangan Terbaik di Nusa Penida' : 'Best Adventures in Nusa Penida'}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              {t.tours.heroTitle}
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.tours.heroSubtitle}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, text: t.tours.localExpertGuides },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: t.hero.fairPrices },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: t.hero.quickBooking },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15">
                  <span className="text-white/90">{item.icon}</span>
                  <span className="text-sm font-medium text-white/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
            <div className="text-center py-7 px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{totalTours}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? 'Paket Tur' : 'Tour Packages'}</div>
            </div>
            <div className="text-center py-7 px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{landTours}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? 'Tur Darat' : 'Land Tours'}</div>
            </div>
            <div className="text-center py-7 px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-teal-600 mb-1">{snorkelTours}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? '+ Snorkeling' : '+ Snorkeling'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {t.tours.chooseAdventure}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.tours.chooseAdventureDesc}
              </p>
            </div>
            
            <TourPackageGrid
              tourPackages={tourPackages}
              showTitle={false}
            />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {t.tours.whatsIncluded}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.tours.whatsIncludedDesc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Professional Guide */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{t.tours.professionalGuide}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.tours.professionalGuideDesc}</p>
              </div>

              {/* Transportation */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{t.tours.comfortableTransport}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.tours.comfortableTransportDesc}</p>
              </div>

              {/* Tax Island */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{language === 'id' ? 'Pajak Pulau' : 'Tax Island'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{language === 'id' ? 'Semua biaya pajak pulau sudah termasuk' : 'All island tax fees included'}</p>
              </div>

              {/* Parking Ticket */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{language === 'id' ? 'Parkir di Semua Spot' : 'Parking in Any Spot'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{language === 'id' ? 'Biaya parkir di setiap destinasi sudah termasuk' : 'Parking fees at every destination included'}</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
              {/* Snorkeling Equipment */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{t.tours.snorkelingEquipment}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.tours.snorkelingEquipmentDesc}</p>
                <span className="inline-block mt-3 text-xs bg-orange-100 text-brand-orange-700 px-3 py-1 rounded-full font-semibold">
                  {t.tours.snorkelingOnly}
                </span>
              </div>

              {/* Underwater Guide */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{t.tours.underwaterGuide}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.tours.underwaterGuideDesc}</p>
                <span className="inline-block mt-3 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                  {t.tours.snorkelingOnly}
                </span>
              </div>

              {/* Documentation */}
              <div className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{language === 'id' ? 'Dokumentasi' : 'Documentation'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{language === 'id' ? 'Foto dan video perjalanan Anda tersedia' : 'Photos and videos of your journey available'}</p>
                <span className="inline-block mt-3 text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                  {language === 'id' ? 'Opsional' : 'Optional'}
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">{t.tours.entranceNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose — Card Grid */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {t.tours.whyChoose}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.tours.whyChooseDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Expert Guides */}
              <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.tours.expertGuides}</h3>
                <p className="text-gray-600 leading-relaxed">{t.tours.expertGuidesDesc}</p>
              </div>

              {/* Fair Pricing */}
              <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.tours.fairPricing}</h3>
                <p className="text-gray-600 leading-relaxed">{t.tours.fairPricingDesc}</p>
              </div>

              {/* Easy Booking */}
              <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.tours.easyBooking}</h3>
                <p className="text-gray-600 leading-relaxed">{t.tours.easyBookingDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg"
            alt="Atuh Beach Nusa Penida"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-brand-teal-800/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              {t.tours.readyExplore}
            </h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-10 text-white/90 max-w-2xl mx-auto">
              {t.tours.readyExploreDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink('bookTour', language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                {t.common.bookViaWhatsApp}
              </a>
              <Link
                href="/rentals"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                {language === 'id' ? 'Sewa Kendaraan' : 'Rent a Vehicle'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
