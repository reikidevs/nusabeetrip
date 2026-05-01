'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';

export default function AboutPage() {
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
              {language === 'id' ? 'Tentang NusaBeeTrip' : 'About NusaBeeTrip'}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              {language === 'id'
                ? 'Partner terpercaya Anda untuk petualangan Nusa Penida'
                : 'Your trusted partner for Nusa Penida adventures'}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {language === 'id' ? 'Cerita Kami' : 'Our Story'}
              </h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                      {language === 'id' ? 'Berbasis Lokal' : 'Locally Based'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {language === 'id'
                        ? 'NusaBeeTrip adalah bisnis tur dan sewa kendaraan milik warga lokal yang berbasis di Nusa Penida, Bali. Kami lahir dan besar di pulau ini, mengenal setiap sudut, pantai tersembunyi, dan waktu terbaik untuk mengunjungi setiap tempat.'
                        : 'NusaBeeTrip is a locally-owned tour and vehicle rental business based in Nusa Penida, Bali. Born and raised on this island, we know every corner, hidden beach, and the best times to visit each location.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                      {language === 'id' ? 'Misi Kami' : 'Our Mission'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {language === 'id'
                        ? 'Misi kami sederhana: membagikan keindahan Nusa Penida dengan dunia sambil memberikan pengalaman wisata yang jujur, aman, dan berkesan. Kami percaya wisata yang baik dimulai dari pemandu yang baik.'
                        : 'Our mission is simple: share the beauty of Nusa Penida with the world while providing honest, safe, and memorable travel experiences. We believe great tourism starts with great guides.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-blue-800 mb-3">
                      {language === 'id' ? 'Harga Transparan' : 'Fair Pricing'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {language === 'id'
                        ? 'Kami berkomitmen pada transparansi harga. Tidak ada biaya tersembunyi atau kejutan. Harga yang tertera adalah yang Anda bayar, dengan kualitas layanan terbaik.'
                        : 'We are committed to price transparency. No hidden fees or surprises. The price you see is what you pay, with the best quality service.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-blue-800 to-brand-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'id' ? 'Siap Berpetualang Bersama Kami?' : 'Ready to Adventure With Us?'}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {language === 'id'
                ? 'Hubungi kami dan mulai rencanakan perjalanan Nusa Penida impian Anda'
                : 'Contact us and start planning your dream Nusa Penida trip'}
            </p>
            <a
              href={getWhatsAppLink('services', language)}
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
      </section>
    </div>
  );
}