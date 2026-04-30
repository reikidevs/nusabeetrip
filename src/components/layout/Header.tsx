'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';

const NAV_ITEMS = [
  { key: 'home' as const, href: '/' },
  { key: 'tours' as const, href: '/tours' },
  { key: 'rentals' as const, href: '/rentals' },
  { key: 'souvenirs' as const, href: '/souvenirs' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
];

const WHATSAPP_NUMBER = '6289631281234';
const WHATSAPP_MSG = encodeURIComponent('Hi! I would like to inquire about your tour and rental services.');

/** UK / British flag SVG */
const FlagGB: React.FC<{ className?: string }> = ({ className = 'w-5 h-4' }) => (
  <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="30" fill="#012169" />
    {/* Diagonals white */}
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
    {/* Diagonals red clipped to quadrants */}
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
    {/* Cross white */}
    <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" />
    {/* Cross red */}
    <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

/** Indonesia flag SVG */
const FlagID: React.FC<{ className?: string }> = ({ className = 'w-5 h-4' }) => (
  <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
    <rect width="3" height="1" fill="#CE1126" />
    <rect y="1" width="3" height="1" fill="#FFFFFF" />
  </svg>
);

const FLAG_MAP: Record<Language, React.FC<{ className?: string }>> = {
  en: FlagGB,
  id: FlagID,
};

const LANG_LABEL: Record<Language, string> = { en: 'EN', id: 'ID' };

/** Language switcher toggle — desktop (top bar, white pill) */
const LangSwitcher: React.FC<{ language: Language; setLanguage: (l: Language) => void }> = ({ language, setLanguage }) => (
  <div className="flex items-center gap-0.5 bg-white/10 rounded-full p-0.5">
    {(['en', 'id'] as Language[]).map((lang) => {
      const Flag = FLAG_MAP[lang];
      return (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
            language === lang
              ? 'bg-white text-brand-blue-800 shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label={`Switch to ${lang === 'en' ? 'English' : 'Indonesian'}`}
        >
          <Flag className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0" />
          {LANG_LABEL[lang]}
        </button>
      );
    })}
  </div>
);

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    name: t.nav[item.key],
  }));

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white shadow-sm'
      }`}
    >
      {/* Top info bar */}
      <div className="hidden lg:block bg-brand-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            {/* Phone */}
            <a
              href="tel:+6289631281234"
              className="flex items-center gap-1.5 hover:text-brand-orange-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +62 896-3128-1234
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/sidiq_1312"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-orange-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @sidiq_1312
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <LangSwitcher language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/NusaBeeTrip-Logo.png"
              alt="NusaBeeTrip"
              width={180}
              height={54}
              className="h-10 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                  isActive(item.href)
                    ? 'text-brand-blue-800'
                    : 'text-gray-600 hover:text-brand-blue-800 hover:bg-brand-blue-50'
                }`}
              >
                {item.name}
                {/* Active underline indicator */}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-brand-blue-800 transition-all duration-200 ${
                    isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.nav.bookNow}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-brand-blue-800 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-brand-blue-50 text-brand-blue-800'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue-800'
              }`}
            >
              {isActive(item.href) && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-800 flex-shrink-0" />
              )}
              {item.name}
            </Link>
          ))}
          {/* Mobile language switcher */}
          <div className="px-4 pt-2 flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Language:</span>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
              {(['en', 'id'] as Language[]).map((lang) => {
                const Flag = FLAG_MAP[lang];
                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                      language === lang
                        ? 'bg-brand-blue-800 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Flag className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0" />
                    {LANG_LABEL[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Book via WhatsApp
            </a>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <a href="tel:+6289631281234" className="hover:text-brand-blue-800 transition-colors">📞 Call</a>
              <a href="mailto:sidiqdwiatmoko@gmail.com" className="hover:text-brand-blue-800 transition-colors">✉️ Email</a>
              <a href="https://instagram.com/sidiq_1312" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue-800 transition-colors">📷 Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;