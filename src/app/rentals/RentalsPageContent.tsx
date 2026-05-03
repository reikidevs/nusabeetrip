'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RentalServiceGrid } from '@/components/business';
import { RentalService } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

interface RentalsPageContentProps {
  rentalServices: RentalService[];
}

export default function RentalsPageContent({ rentalServices }: RentalsPageContentProps) {
  const { t, language } = useLanguage();

  const vehicleCount = rentalServices.length;
  const bikeCount = rentalServices.filter(r => r.vehicleType === 'motorcycle').length;
  const carCount = rentalServices.filter(r => r.vehicleType === 'car').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg"
            alt="Broken Beach - Vehicle Rentals Nusa Penida"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {language === 'id' ? 'Jelajahi Nusa Penida dengan Bebas' : 'Explore Nusa Penida Freely'}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              {t.rentals.heroTitle}
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.rentals.heroSubtitle}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: t.rentals.wellMaintained },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: t.rentals.affordablePrices },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, text: t.rentals.freeDelivery },
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
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{vehicleCount}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? 'Total Kendaraan' : 'Vehicles'}</div>
            </div>
            <div className="text-center py-7 px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{bikeCount}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? 'Motor' : 'Scooters'}</div>
            </div>
            <div className="text-center py-7 px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{carCount}</div>
              <div className="text-sm text-gray-500 font-medium">{language === 'id' ? 'Mobil + Sopir' : 'Car + Driver'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Services Grid */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {t.rentals.chooseVehicle}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.rentals.chooseVehicleDesc}
              </p>
            </div>
            
            <RentalServiceGrid
              rentalServices={rentalServices}
              showTitle={false}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Our Rentals — Card Grid */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {t.rentals.whyChoose}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t.rentals.whyChooseDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Quality Vehicles */}
              <div className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.rentals.qualityVehicles}</h3>
                <p className="text-gray-600 leading-relaxed">{t.rentals.qualityVehiclesDesc}</p>
              </div>

              {/* 24/7 Support */}
              <div className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.rentals.support247}</h3>
                <p className="text-gray-600 leading-relaxed">{t.rentals.support247Desc}</p>
              </div>

              {/* Free Delivery */}
              <div className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.rentals.freeDeliveryTitle}</h3>
                <p className="text-gray-600 leading-relaxed">{t.rentals.freeDeliveryDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
                {language === 'id' ? 'Cara Sewa' : 'How to Rent'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'id'
                  ? 'Proses mudah dalam 3 langkah'
                  : 'Easy process in 3 steps'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: language === 'id' ? 'Pilih Kendaraan' : 'Choose Vehicle',
                  desc: language === 'id'
                    ? 'Pilih kendaraan yang sesuai kebutuhan Anda dari koleksi kami'
                    : 'Pick the vehicle that suits your needs from our collection',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  ),
                  color: 'bg-blue-50 text-brand-blue-700',
                },
                {
                  step: '2',
                  title: language === 'id' ? 'Hubungi via WhatsApp' : 'Contact via WhatsApp',
                  desc: language === 'id'
                    ? 'Klik tombol sewa dan kirim pesan otomatis ke WhatsApp kami'
                    : 'Click the rent button and send an automatic message to our WhatsApp',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  ),
                  color: 'bg-green-50 text-whatsapp',
                },
                {
                  step: '3',
                  title: language === 'id' ? 'Antar ke Lokasi' : 'Delivered to You',
                  desc: language === 'id'
                    ? 'Kendaraan diantar gratis ke hotel atau lokasi Anda di Nusa Penida'
                    : 'Vehicle delivered free to your hotel or location in Nusa Penida',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  color: 'bg-teal-50 text-brand-teal-600',
                },
              ].map((s, i) => (
                <div key={i} className="text-center group">
                  <div className={`w-20 h-20 ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {language === 'id' ? `Langkah ${s.step}` : `Step ${s.step}`}
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%202.jpeg"
            alt="Crystal Bay Beach Nusa Penida"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-brand-teal-800/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              {t.rentals.readyExplore}
            </h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-10 text-white/90 max-w-2xl mx-auto">
              {t.rentals.readyExploreDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink('rentVehicle', language)}
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
                href="/tours"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                {t.tours.viewAll}
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
