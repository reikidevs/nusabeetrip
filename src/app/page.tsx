import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Real photo background */}
        <div className="absolute inset-0">
          <Image
            src="/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.24.56.jpeg"
            alt="Broken Beach Nusa Penida"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/80 via-brand-blue-800/70 to-brand-teal-900/80" />
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Explore Nusa Penida
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
              Guided tours and vehicle rentals around the island. Local guides who know the spots.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/tours"
                className="inline-flex items-center gap-2 bg-white text-brand-blue-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                View Tours
              </Link>
              
              <a 
                href="https://wa.me/6289631281234?text=Hi!%20I%27m%20interested%20in%20booking%20a%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Book via WhatsApp
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-base text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Fair Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Quick Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Preview */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
              Tour Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Full-day tours with transport, guide, and entrance fees included
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* West Trip Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg"
                  alt="Broken Beach - West Trip Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-4 py-1.5 rounded-full text-sm font-bold text-brand-blue-800 shadow-md">
                    8 Hours
                  </span>
                </div>
              </div>
              
              <div className="p-7">
                <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                  West Trip
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Kelingking Beach, Angel Billabong, Broken Beach, and Crystal Bay
                </p>
                
                <div className="flex items-baseline mb-6 pb-6 border-b border-gray-100">
                  <span className="text-4xl font-bold text-brand-blue-800">$25</span>
                  <span className="text-gray-500 ml-2 text-base">per person</span>
                </div>
                
                <Link 
                  href="/tours"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* East Trip Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/East%20Trip/WhatsApp%20Image%202026-04-19%20at%2020.32.36.jpeg"
                  alt="East Trip Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-4 py-1.5 rounded-full text-sm font-bold text-brand-blue-800 shadow-md">
                    8 Hours
                  </span>
                </div>
              </div>
              
              <div className="p-7">
                <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                  East Trip
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Atuh Beach, Diamond Beach, Tree House, and Teletubbies Hill
                </p>
                
                <div className="flex items-baseline mb-6 pb-6 border-b border-gray-100">
                  <span className="text-4xl font-bold text-brand-blue-800">$28</span>
                  <span className="text-gray-500 ml-2 text-base">per person</span>
                </div>
                
                <Link 
                  href="/tours"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Mix Trip Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.15.jpeg"
                  alt="Diamond Beach - Mix Trip Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-4 py-1.5 rounded-full text-sm font-bold text-brand-blue-800 shadow-md">
                    12 Hours
                  </span>
                </div>
              </div>
              
              <div className="p-7">
                <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                  Mix Trip (West & East)
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Combine both tours in one day - see the highlights from east and west
                </p>
                
                <div className="flex items-baseline mb-6 pb-6 border-b border-gray-100">
                  <span className="text-4xl font-bold text-brand-blue-800">$32</span>
                  <span className="text-gray-500 ml-2 text-base">per person</span>
                </div>
                
                <Link 
                  href="/tours"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link 
              href="/tours"
              className="inline-flex items-center gap-2 text-brand-blue-800 hover:text-brand-teal-600 font-semibold text-lg transition-colors group"
            >
              View All Tour Packages
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
              Explore The Spots
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hidden gems and iconic landmarks across Nusa Penida
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              { src: '/images/Angel%20Bilabong/WhatsApp%20Image%202026-04-19%20at%2019.45.02%20(1).jpeg', label: 'Angel Bilabong' },
              { src: '/images/Atuh%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.35.33.jpeg', label: 'Atuh Beach' },
              { src: '/images/Crystal%20Bay%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.14.jpeg', label: 'Crystal Bay Beach' },
              { src: '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.34.15.jpeg', label: 'Diamond Beach' },
              { src: '/images/Tree%20House/WhatsApp%20Image%202026-04-19%20at%2019.45.15%20(1).jpeg', label: 'Tree House' },
              { src: '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg', label: 'Broken Beach' },
            ].map((spot) => (
              <div key={spot.label} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src={spot.src}
                  alt={spot.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-white font-semibold text-sm drop-shadow-md">{spot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
              Why Book With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re locals who know the island well and keep things simple
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-600 to-brand-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-blue-800 mb-4">Local Guides</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Born and raised here. We know the best times to visit each spot and can show you places most tourists miss.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-teal-600 to-brand-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-blue-800 mb-4">Fair Pricing</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                No hidden fees or surprise charges. What you see is what you pay.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-orange-600 to-brand-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-blue-800 mb-4">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Just message us on WhatsApp. We&apos;ll confirm your booking and answer any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Rentals Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
              Vehicle Rentals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rent a scooter or car to explore on your own schedule
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* N-Max Rental */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/Vehicle%20Rentals/Yamaha%20N-Max.webp"
                  alt="Yamaha N-Max - Scooter Rental Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                  Yamaha N-Max
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Automatic scooter
                </p>
                <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-brand-blue-800">$8</span>
                  <span className="text-gray-500 ml-2 text-sm">per day</span>
                </div>
                <a 
                  href="https://wa.me/6289631281234?text=Hi!%20I%27d%20like%20to%20rent%20a%20Yamaha%20N-Max."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Vario Rental */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/Vehicle%20Rentals/Honda%20Vario.webp"
                  alt="Honda Vario - Scooter Rental Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                  Honda Vario
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Automatic scooter
                </p>
                <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-brand-blue-800">$6.50</span>
                  <span className="text-gray-500 ml-2 text-sm">per day</span>
                </div>
                <a 
                  href="https://wa.me/6289631281234?text=Hi!%20I%27d%20like%20to%20rent%20a%20Honda%20Vario."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Scoopy Rental */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/Vehicle%20Rentals/Honda%20Scoopy.webp"
                  alt="Honda Scoopy - Scooter Rental Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                  Honda Scoopy
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Compact scooter
                </p>
                <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-brand-blue-800">$6.50</span>
                  <span className="text-gray-500 ml-2 text-sm">per day</span>
                </div>
                <a 
                  href="https://wa.me/6289631281234?text=Hi!%20I%27d%20like%20to%20rent%20a%20Honda%20Scoopy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Car Rental */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/Vehicle%20Rentals/Car%20with%20Driver.jpg"
                  alt="Car with Driver - Car Rental Nusa Penida"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">
                  Car with Driver
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  4-hour rental
                </p>
                <div className="flex items-baseline mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-brand-blue-800">$32</span>
                  <span className="text-gray-500 ml-2 text-sm">0-4 hours</span>
                </div>
                <a 
                  href="https://wa.me/6289631281234?text=Hi!%20I%27d%20like%20to%20rent%20a%20car%20with%20driver."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 group-hover:shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
            <Link 
              href="/rentals"
              className="inline-flex items-center gap-2 text-brand-blue-800 hover:text-brand-blue-600 font-semibold text-lg transition-colors group"
            >
              View All Rental Options
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Questions? Ready to book? Reach out through any of these channels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Phone Card */}
            <a 
              href="tel:+6289631281234"
              className="group bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-white/95">+62 896-3128-1234</p>
            </a>
            
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/6289631281234?text=Hi!%20I%27m%20interested%20in%20NusaBeeTrip%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-whatsapp to-whatsapp-dark text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">WhatsApp</h3>
              <p className="text-white/95">+62 896-3128-1234</p>
            </a>
            
            {/* Email Card */}
            <a 
              href="mailto:sidiqdwiatmoko@gmail.com"
              className="group bg-gradient-to-br from-brand-orange-600 to-brand-orange-700 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-white/95 break-all text-sm">sidiqdwiatmoko@gmail.com</p>
            </a>
            
            {/* Instagram Card */}
            <a 
              href="https://instagram.com/sidiq_1312"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instagram</h3>
              <p className="text-white/95">@sidiq_1312</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
