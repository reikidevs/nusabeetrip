'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: '500+',
      label: language === 'id' ? 'Wisatawan Puas' : 'Happy Travelers',
    },
    {
      value: '5+',
      label: language === 'id' ? 'Paket Tur' : 'Tour Packages',
    },
    {
      value: '4',
      label: language === 'id' ? 'Kendaraan Sewa' : 'Rental Vehicles',
    },
    {
      value: '24/7',
      label: language === 'id' ? 'Dukungan WhatsApp' : 'WhatsApp Support',
    },
  ];

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: language === 'id' ? 'Tur Pulau' : 'Island Tours',
      desc: language === 'id'
        ? 'West Trip, East Trip, Mix Trip — jelajahi pantai ikonik dan pemandangan menakjubkan Nusa Penida'
        : 'West Trip, East Trip, Mix Trip — explore iconic beaches and breathtaking views of Nusa Penida',
      href: '/tours',
      color: 'from-blue-500 to-brand-blue-700',
      bgLight: 'bg-blue-50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: language === 'id' ? 'Snorkeling' : 'Snorkeling',
      desc: language === 'id'
        ? 'Selam bersama pemandu underwater profesional di Crystal Bay dan spot terbaik lainnya'
        : 'Dive with professional underwater guides at Crystal Bay and other top snorkeling spots',
      href: '/tours',
      color: 'from-teal-500 to-brand-teal-700',
      bgLight: 'bg-teal-50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: language === 'id' ? 'Sewa Kendaraan' : 'Vehicle Rentals',
      desc: language === 'id'
        ? 'N-Max, Vario, Scoopy, atau mobil dengan sopir — jelajahi pulau dengan bebas'
        : 'N-Max, Vario, Scoopy, or car with driver — explore the island at your own pace',
      href: '/rentals',
      color: 'from-orange-500 to-brand-orange-700',
      bgLight: 'bg-orange-50',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: language === 'id' ? 'Souvenir' : 'Souvenirs',
      desc: language === 'id'
        ? 'Bawa pulang kenangan — kaos, topi, gantungan kunci, dan tote bag Nusa Penida'
        : 'Take memories home — t-shirts, caps, keychains, and tote bags from Nusa Penida',
      href: '/souvenirs',
      color: 'from-purple-500 to-purple-700',
      bgLight: 'bg-purple-50',
    },
  ];

  const gallery = [
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(2).jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01%20(2).jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2020.25.14.jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03%20(2).jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01%20(1).jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2020.27.05.jpeg',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01.jpeg"
            alt="Nusa Penida Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/85 via-brand-blue-800/75 to-brand-teal-900/85" />
        </div>

        <div className="container mx-auto px-4 py-28 md:py-40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/95 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nusa Penida, Bali
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              {language === 'id' ? 'Tentang NusaBeeTrip' : 'About NusaBeeTrip'}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              {language === 'id'
                ? 'Partner terpercaya Anda untuk petualangan Nusa Penida yang tak terlupakan'
                : 'Your trusted partner for unforgettable Nusa Penida adventures'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center py-8 px-4">
                <div className="text-3xl md:text-4xl font-bold text-brand-blue-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Photo Collage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.02.jpeg" alt="Nusa Penida" fill className="object-cover" />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image src="/images/WhatsApp%20Image%202026-04-19%20at%2020.26.34.jpeg" alt="Nusa Penida" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <Image src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(1).jpeg" alt="Nusa Penida" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.13.jpeg" alt="Nusa Penida" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Right: Story Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-6 tracking-tight">
                  {language === 'id' ? 'Cerita Kami' : 'Our Story'}
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'id'
                      ? 'NusaBeeTrip adalah bisnis tur dan sewa kendaraan milik warga lokal yang berbasis di Nusa Penida, Bali. Kami lahir dan besar di pulau ini, mengenal setiap sudut, pantai tersembunyi, dan waktu terbaik untuk mengunjungi setiap tempat.'
                      : 'NusaBeeTrip is a locally-owned tour and vehicle rental business based in Nusa Penida, Bali. Born and raised on this island, we know every corner, hidden beach, and the best times to visit each location.'}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'id'
                      ? 'Misi kami sederhana: membagikan keindahan Nusa Penida dengan dunia sambil memberikan pengalaman wisata yang jujur, aman, dan berkesan. Kami percaya wisata yang baik dimulai dari pemandu yang baik.'
                      : 'Our mission is simple: share the beauty of Nusa Penida with the world while providing honest, safe, and memorable travel experiences. We believe great tourism starts with great guides.'}
                  </p>

                  {/* Values */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      {
                        icon: (
                          <svg className="w-6 h-6 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        title: language === 'id' ? 'Lokal' : 'Local',
                        desc: language === 'id' ? 'Warga asli Nusa Penida' : 'Born in Nusa Penida',
                      },
                      {
                        icon: (
                          <svg className="w-6 h-6 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ),
                        title: language === 'id' ? 'Jujur' : 'Honest',
                        desc: language === 'id' ? 'Tanpa biaya tersembunyi' : 'No hidden fees',
                      },
                      {
                        icon: (
                          <svg className="w-6 h-6 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ),
                        title: language === 'id' ? 'Berkualitas' : 'Quality',
                        desc: language === 'id' ? 'Layanan terbaik' : 'Best service',
                      },
                    ].map((v, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                        <div className="flex justify-center mb-2">{v.icon}</div>
                        <div className="font-bold text-brand-blue-800 text-sm">{v.title}</div>
                        <div className="text-gray-500 text-xs mt-1">{v.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {language === 'id' ? 'Layanan Kami' : 'Our Services'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'id'
                  ? 'Semua yang Anda butuhkan untuk petualangan Nusa Penida yang sempurna'
                  : 'Everything you need for the perfect Nusa Penida adventure'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc, i) => (
                <Link
                  key={i}
                  href={svc.href}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${svc.bgLight} rounded-xl flex items-center justify-center mb-5 text-brand-blue-700 group-hover:scale-110 transition-transform duration-300`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-blue-800 mb-2">{svc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="mt-4 text-brand-blue-700 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    {language === 'id' ? 'Lihat' : 'Explore'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {language === 'id' ? 'Galeri Nusa Penida' : 'Nusa Penida Gallery'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'id'
                  ? 'Sekilas keindahan yang menanti Anda'
                  : 'A glimpse of the beauty awaiting you'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl shadow-lg group ${
                    i === 0 ? 'md:row-span-2 h-64 md:h-full' : 'h-48 md:h-64'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Nusa Penida ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.02%20(2).jpeg"
            alt="Nusa Penida"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-brand-teal-800/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {language === 'id' ? 'Siap Berpetualang?' : 'Ready to Explore?'}
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              {language === 'id'
                ? 'Hubungi kami dan mulai rencanakan perjalanan Nusa Penida impian Anda'
                : 'Contact us and start planning your dream Nusa Penida trip'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink('services', language)}
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