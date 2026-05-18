import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Page not found',
  description:
    'The page you are looking for does not exist. Browse our Nusa Penida tours and vehicle rentals instead.',
  path: '/404',
  index: false,
});

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Hero image */}
        <div className="relative w-full h-48 sm:h-64 mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/West%20Trip/West%20trip%20Kelingking%20Beach%202.jpeg"
            alt="Kelingking Beach Nusa Penida"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl sm:text-9xl font-bold text-white/95 drop-shadow-2xl">
              404
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          This page wandered off the trail
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          But the rest of Nusa Penida is still waiting for you.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            href="/tours"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tours
          </Link>
          <Link
            href="/rentals"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Rentals
          </Link>
          <Link
            href="/souvenirs"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Souvenirs
          </Link>
          <Link
            href="/about"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-50 border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-800 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            Contact
          </Link>
        </div>

        <a
          href="https://wa.me/6289631281234?text=Hi!%20I'm%20interested%20in%20NusaBeeTrip%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          Need help? Chat on WhatsApp
        </a>
      </div>
    </main>
  );
}
