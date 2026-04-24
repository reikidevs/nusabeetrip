'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

const WHATSAPP_NUMBER = '6289631281234';
const WHATSAPP_MSG = encodeURIComponent('Hi! I would like to inquire about your tour and rental services.');

const DESTINATIONS = [
  'Kelingking Beach',
  'Angel Bilabong',
  'Broken Beach',
  'Crystal Bay',
  'Diamond Beach',
  'Atuh Beach',
  'Tree House',
];

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const destinations = DESTINATIONS;

  const quickLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.tours, href: '/tours' },
    { name: t.nav.rentals, href: '/rentals' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const services = [
    { name: t.tours.westTrip, href: '/tours' },
    { name: t.tours.eastTrip, href: '/tours' },
    { name: t.tours.mixTrip, href: '/tours' },
    { name: 'Snorkeling', href: '/tours' },
    { name: 'Motorcycle Rental', href: '/rentals' },
    { name: t.rentals.carWithDriver, href: '/rentals' },
  ];

  return (
    <footer className="bg-gray-900 text-white">

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-brand-blue-800 via-brand-blue-700 to-brand-teal-700">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{t.footer.ctaHeading}</h3>
            <p className="text-white/80">{t.footer.ctaSubtext}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.footer.chatWhatsApp}
            </a>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              {t.footer.viewTours}
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/NusaBeeTrip-Logo.png"
                alt="NusaBeeTrip"
                width={160}
                height={48}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.brandDesc}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/6289631281234"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-whatsapp flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/sidiq_1312"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:sidiqdwiatmoko@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-blue-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="tel:+6289631281234"
                aria-label="Phone"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-teal-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-teal-500 group-hover:w-2 transition-all duration-200 flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.ourServices}</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-orange-800 group-hover:w-2 transition-all duration-200 flex-shrink-0" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.contactUs}</h4>
            <ul className="space-y-4 mb-8">
              <li>
                <a href="tel:+6289631281234" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-brand-blue-700 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="pt-1.5">+62 896-3128-1234</span>
                </a>
              </li>
              <li>
                <a href="mailto:sidiqdwiatmoko@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-brand-blue-700 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="pt-1.5 break-all">sidiqdwiatmoko@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="pt-1.5">Nusa Penida, Klungkung, Bali</span>
                </div>
              </li>
            </ul>

            {/* Popular Destinations tags */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">{t.footer.popularDestinations}</p>
              <div className="flex flex-wrap gap-2">
                {destinations.map((d) => (
                  <span
                    key={d}
                    className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full border border-gray-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} NusaBeeTrip. {t.footer.copyright} — {t.footer.bestTravel}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">{t.footer.privacyPolicy}</Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;