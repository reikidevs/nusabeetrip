'use client';

import React from 'react';
import { SouvenirGrid } from '@/components/business';
import { SOUVENIRS } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function SouvenirsPage() {
  const { t } = useLanguage();

  const handleBookingClick = (souvenirName: string, price: number) => {
    console.log(`Booking clicked for ${souvenirName} at ${price} USD`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue-800 via-brand-blue-700 to-brand-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {t.souvenirs.heading}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              {t.souvenirs.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Souvenirs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SouvenirGrid
            souvenirs={SOUVENIRS}
            onBookingClick={handleBookingClick}
            className="max-w-7xl mx-auto"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We have more souvenirs available! Contact us on WhatsApp to ask about specific items or custom orders.
          </p>
          <a
            href="https://wa.me/6289631281234?text=Hi!%20I%27m%20interested%20in%20Nusa%20Penida%20souvenirs."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
