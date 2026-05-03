'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { formatPriceByLang, formatUsdPriceByLang } from '@/lib/currency'
import { getWhatsAppLink, getWhatsAppRentalLink, getWhatsAppItemLink } from '@/lib/whatsapp'

export default function Home() {
  const { t, language } = useLanguage();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Real photo background */}
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
            alt="Kelingking Beach Nusa Penida"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/80 via-brand-blue-800/70 to-brand-teal-900/80" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-28 md:py-40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/95 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border border-white/20">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nusa Penida, Bali
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              {t.hero.title}
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-12">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 bg-white text-brand-blue-800 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                {t.hero.viewTours}
              </Link>

              <a
                href={getWhatsAppLink('bookTour', language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                {t.hero.bookWhatsApp}
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {[
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, text: t.hero.localGuides },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: t.hero.fairPrices },
                { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: t.hero.quickBooking },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/15">
                  <span className="text-white/90 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-white/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Preview - 2 Column Layout */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
              {t.tours.heading}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.tours.subheading}
            </p>
          </div>

          {/* 2 Column Layout: Content Left, Images Right */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Content */}
              <div className="space-y-8">
                <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 sm:w-8 sm:h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-brand-blue-800">{t.tours.westTrip}</h3>
                        <span className="bg-brand-blue-100 text-brand-blue-800 px-3 py-1 rounded-full text-sm font-semibold">8 {t.tours.hours}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {t.tours.westTripDesc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl sm:text-4xl font-bold text-brand-blue-800">{formatPriceByLang(390000, language).display}</span>
                          <span className="text-gray-500 ml-2">{t.tours.perPerson}</span>
                        </div>
                        <Link
                          href="/tours"
                          className="bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:shadow-lg"
                        >
                          {t.tours.viewDetails}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 sm:w-8 sm:h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-brand-blue-800">{t.tours.eastTrip}</h3>
                        <span className="bg-brand-teal-100 text-brand-teal-800 px-3 py-1 rounded-full text-sm font-semibold">8 {t.tours.hours}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {t.tours.eastTripDesc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl sm:text-4xl font-bold text-brand-blue-800">{formatPriceByLang(430000, language).display}</span>
                          <span className="text-gray-500 ml-2">{t.tours.perPerson}</span>
                        </div>
                        <Link
                          href="/tours"
                          className="bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:shadow-lg"
                        >
                          {t.tours.viewDetails}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 bg-orange-100 rounded-xl flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 sm:w-8 sm:h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-brand-blue-800">{t.tours.mixTrip}</h3>
                        <span className="bg-brand-orange-100 text-brand-orange-800 px-3 py-1 rounded-full text-sm font-semibold">8 {t.tours.hours}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {t.tours.mixTripDesc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl sm:text-4xl font-bold text-brand-blue-800">{formatPriceByLang(500000, language).display}</span>
                          <span className="text-gray-500 ml-2">{t.tours.perPerson}</span>
                        </div>
                        <Link
                          href="/tours"
                          className="bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all hover:shadow-lg"
                        >
                          {t.tours.viewDetails}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image Gallery/Carousel */}
              <div className="space-y-4">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src="/images/West%20Trip/West%20Trip%20Broken%20Beach%203.jpeg"
                    alt="Broken Beach - West Trip"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-semibold mb-1">{language === 'id' ? 'Highlight West Trip' : 'West Trip Highlight'}</p>
                    <h4 className="text-2xl font-bold">Broken Beach</h4>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
                    <Image
                      src="/images/East%20Trip/East%20Trip%20Diamond%20Beach%204.jpeg"
                      alt="Diamond Beach - East Trip"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs font-semibold">Diamond Beach</p>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
                    <Image
                      src="/images/East%20Trip/East%20Trip%20Diamond%20Beach%205.jpeg"
                      alt="Diamond Beach"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs font-semibold">Diamond Beach</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Link */}
            <div className="text-center">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 text-brand-blue-800 hover:text-brand-teal-600 font-semibold text-lg transition-colors group"
              >
                {t.tours.viewAll}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Gallery Section - Balanced Masonry Grid */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
              {t.destinations.heading}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.destinations.subheading}
            </p>
          </div>

          {/* Balanced Grid Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Row 1: Large featured + 2 regular */}
              <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-full min-h-[240px] sm:min-h-[400px]">
                  <Image
                    src="/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg"
                    alt="Broken Beach"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3 inline-block">{language === 'id' ? 'Destinasi Unggulan' : 'Featured Destination'}</span>
                    <h3 className="text-3xl font-bold mb-2">Broken Beach</h3>
                    <p className="text-white/90 text-sm">{language === 'id' ? 'Formasi lengkungan batu alam' : 'Natural rock arch formation'}</p>
                  </div>
                </div>
              </div>

              {/* Right side - 2 stacked cards */}
              <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg"
                  alt="Angel Bilabong"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-md">Angel Bilabong</span>
              </div>

              <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg"
                  alt="Crystal Bay Beach"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-md">Crystal Bay</span>
              </div>

              {/* Row 2: 3 equal cards */}
              <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg"
                  alt="Diamond Beach"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-md">Diamond Beach</span>
              </div>

              <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg"
                  alt="Atuh Beach"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-md">Atuh Beach</span>
              </div>

              <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src="/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg"
                  alt="Tree House"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-md">Tree House</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Horizontal Layout */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
              {t.whyUs.heading}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.whyUs.subheading}
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-8">
            <div className="group bg-white rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.whyUs.localGuides}</h3>
              <p className="text-gray-600 leading-relaxed" suppressHydrationWarning>{t.whyUs.localGuidesDesc}</p>
            </div>

            <div className="group bg-white rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.whyUs.fairPricing}</h3>
              <p className="text-gray-600 leading-relaxed">{t.whyUs.fairPricingDesc}</p>
            </div>

            <div className="group bg-white rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-blue-800 mb-3">{t.whyUs.easyBooking}</h3>
              <p className="text-gray-600 leading-relaxed">{t.whyUs.easyBookingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Rentals Section - Horizontal Scroll/Carousel Style */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
              {t.rentals.heading}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.rentals.subheading}
            </p>
          </div>

          {/* Horizontal scrollable container */}
          <div className="relative max-w-7xl mx-auto">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* N-Max Rental */}
              <div className="flex-shrink-0 w-80 snap-start">
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/images/Vehicle%20Rentals/Yamaha%20N-Max.webp"
                      alt="Yamaha N-Max - Scooter Rental Nusa Penida"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-brand-blue-800 text-white px-3 py-1 rounded-full text-sm font-semibold">{language === 'id' ? 'Populer' : 'Popular'}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                      Yamaha N-Max
                    </h3>
                    <p className="text-gray-600 text-sm mb-4" suppressHydrationWarning>
                      {t.rentals.automaticScooter}
                    </p>
                    <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                      <span className="text-3xl font-bold text-brand-blue-800">{formatPriceByLang(125000, language).display}</span>
                      <span className="text-gray-500 ml-2 text-sm">{t.rentals.perDay}</span>
                    </div>
                    <a
                      href={getWhatsAppRentalLink('Yamaha N-Max', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      {t.rentals.bookNow}
                    </a>
                  </div>
                </div>
              </div>

              {/* Vario Rental */}
              <div className="flex-shrink-0 w-80 snap-start">
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/images/Vehicle%20Rentals/Honda%20Vario.png"
                      alt="Honda Vario - Scooter Rental Nusa Penida"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                      Honda Vario
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {t.rentals.automaticScooter}
                    </p>
                    <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                      <span className="text-3xl font-bold text-brand-blue-800">{formatPriceByLang(100000, language).display}</span>
                      <span className="text-gray-500 ml-2 text-sm">{t.rentals.perDay}</span>
                    </div>
                    <a
                      href={getWhatsAppRentalLink('Honda Vario', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      {t.rentals.bookNow}
                    </a>
                  </div>
                </div>
              </div>

              {/* Scoopy Rental */}
              <div className="flex-shrink-0 w-80 snap-start">
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/images/Vehicle%20Rentals/Honda%20Scoopy.webp"
                      alt="Honda Scoopy - Scooter Rental Nusa Penida"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                      Honda Scoopy
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {t.rentals.compactScooter}
                    </p>
                    <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                      <span className="text-3xl font-bold text-brand-blue-800">{formatPriceByLang(100000, language).display}</span>
                      <span className="text-gray-500 ml-2 text-sm">{t.rentals.perDay}</span>
                    </div>
                    <a
                      href={getWhatsAppRentalLink('Honda Scoopy', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      {t.rentals.bookNow}
                    </a>
                  </div>
                </div>
              </div>

              {/* Car Rental */}
              <div className="flex-shrink-0 w-80 snap-start">
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src="/images/Vehicle%20Rentals/Car%20with%20Driver.jpg"
                      alt="Car with Driver - Car Rental Nusa Penida"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-brand-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{language === 'id' ? 'Premium' : 'Premium'}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                      {t.rentals.carWithDriver}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {t.rentals.fourHourRental}
                    </p>
                    <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                      <span className="text-3xl font-bold text-brand-blue-800">{formatPriceByLang(500000, language).display}</span>
                      <span className="text-gray-500 ml-2 text-sm">{t.rentals.zeroToFourHours}</span>
                    </div>
                    <a
                      href={getWhatsAppRentalLink('Car with Driver', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                    >
                      {t.rentals.bookNow}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="text-center mt-6 text-gray-500 text-sm md:hidden">
              {language === 'id' ? 'Geser untuk lihat lainnya →' : 'Swipe to see more →'}
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              href="/rentals"
              className="inline-flex items-center gap-2 text-brand-blue-800 hover:text-brand-blue-600 font-semibold text-lg transition-colors group"
            >
              {t.rentals.viewAll}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Souvenirs Section - Bento Grid Layout */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
              {t.souvenirs.heading}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t.souvenirs.subheading}
            </p>
          </div>

          {/* Bento Grid - Varied sizes */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Large featured item - spans 2x2 */}
              <div className="col-span-2 row-span-2 group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-full min-h-[240px] sm:min-h-[400px] bg-gray-100 overflow-hidden">
                  <Image
                    src="/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.37.jpeg"
                    alt="Nusa Penida T-Shirt"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-blue-800">
                      {language === 'id' ? 'Unggulan' : 'Featured'}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      Nusa Penida T-Shirt
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{formatUsdPriceByLang(5, language).display}</span>
                      <a
                        href={getWhatsAppItemLink('Nusa Penida T-Shirt', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-brand-blue-800 hover:bg-gray-100 px-6 py-2 rounded-xl font-semibold transition-all duration-200"
                      >
                        {t.souvenirs.orderNow}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular item */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src="/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.39.jpeg"
                    alt="Kelingking Beach Keychain"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-brand-blue-800">
                      {language === 'id' ? 'Aksesoris' : 'Accessories'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-brand-blue-800 mb-2">
                    Kelingking Keychain
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-blue-800">{formatUsdPriceByLang(3, language).display}</span>
                    <a
                      href={getWhatsAppItemLink('Kelingking Keychain', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue-800 hover:text-brand-blue-600 font-semibold text-sm"
                    >
                      {t.souvenirs.orderNow} →
                    </a>
                  </div>
                </div>
              </div>

              {/* Regular item */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src="/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.40%20(1).jpeg"
                    alt="Nusa Penida Cap"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-brand-blue-800">
                      {language === 'id' ? 'Pakaian' : 'Apparel'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-brand-blue-800 mb-2">
                    Nusa Penida Cap
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-blue-800">{formatUsdPriceByLang(6, language).display}</span>
                    <a
                      href={getWhatsAppItemLink('Nusa Penida Cap', language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue-800 hover:text-brand-blue-600 font-semibold text-sm"
                    >
                      {t.souvenirs.orderNow} →
                    </a>
                  </div>
                </div>
              </div>

              {/* Wide item - spans 2 columns */}
              <div className="col-span-2 group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="flex h-full">
                  <div className="relative w-1/2 bg-gray-100 overflow-hidden">
                    <Image
                      src="/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.41.jpeg"
                      alt="Canvas Tote Bag"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="w-1/2 p-6 flex flex-col justify-between">
                    <div>
                      <span className="bg-brand-teal-100 text-brand-teal-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                        {language === 'id' ? 'Tas' : 'Bags'}
                      </span>
                      <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                        Canvas Tote Bag
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {language === 'id' ? 'Tote bag ramah lingkungan dengan print Nusa Penida' : 'Eco-friendly tote bag with Nusa Penida print'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-brand-blue-800">{formatUsdPriceByLang(8, language).display}</span>
                      <a
                        href={getWhatsAppItemLink('Canvas Tote Bag', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200"
                      >
                        {t.souvenirs.orderNow}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              href="/souvenirs"
              className="inline-flex items-center gap-2 text-brand-blue-800 hover:text-brand-blue-600 font-semibold text-lg transition-colors group"
            >
              {t.souvenirs.viewAll}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%206.jpeg"
            alt="Kelingking Beach Nusa Penida"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-brand-teal-800/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              {t.contact.heading}
            </h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-10 text-white/90 max-w-2xl mx-auto">
              {t.contact.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={getWhatsAppLink('services', language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                {t.common.bookViaWhatsApp}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                {t.contact.heading}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Compact contact pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+6289631281234" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm font-medium">+62 896-3128-1234</span>
              </a>
              <a href="mailto:sidiqdwiatmoko@gmail.com" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm font-medium">sidiqdwiatmoko@gmail.com</span>
              </a>
              <a href="https://instagram.com/sidiq_1312" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                <span className="text-sm font-medium">@sidiq_1312</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
