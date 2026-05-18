'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';
import { getWhatsAppLink } from '@/lib/whatsapp';

/* ------------------------------------------------------------------ */
/*  Nav items                                                          */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: 'home' as const, href: '/' },
  { key: 'tours' as const, href: '/tours' },
  { key: 'rentals' as const, href: '/rentals' },
  { key: 'souvenirs' as const, href: '/souvenirs' },
  { key: 'reviews' as const, href: '/#testimonials' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
];

/* ------------------------------------------------------------------ */
/*  Mobile bottom-bar items (5 tabs — About accessible via menu)       */
/* ------------------------------------------------------------------ */
const MOBILE_TABS = [
  {
    key: 'home' as const,
    href: '/',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: 'tours' as const,
    href: '/tours',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'rentals' as const,
    href: '/rentals',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    key: 'reviews' as const,
    href: '/#testimonials',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.887a1 1 0 00-1.176 0l-3.976 2.887c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 9.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.673z" />
      </svg>
    ),
  },
  {
    key: 'contact' as const,
    href: '/contact',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.2 : 1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Flag SVGs                                                          */
/* ------------------------------------------------------------------ */
const FlagGB: React.FC<{ className?: string }> = ({ className = 'w-5 h-4' }) => (
  <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="10" />
    <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const FlagID: React.FC<{ className?: string }> = ({ className = 'w-5 h-4' }) => (
  <svg className={className} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
    <rect width="3" height="1" fill="#CE1126" />
    <rect y="1" width="3" height="1" fill="#FFFFFF" />
  </svg>
);

const FLAG_MAP: Record<Language, React.FC<{ className?: string }>> = { en: FlagGB, id: FlagID };
const LANG_LABEL: Record<Language, string> = { en: 'EN', id: 'ID' };

/* ------------------------------------------------------------------ */
/*  Language switcher                                                   */
/* ------------------------------------------------------------------ */
const LangSwitcher: React.FC<{
  language: Language;
  setLanguage: (l: Language) => void;
  variant?: 'desktop' | 'mobile';
}> = ({ language, setLanguage, variant = 'desktop' }) => {
  const isDesktop = variant === 'desktop';

  return (
    <div className={`flex items-center gap-0.5 rounded-full p-0.5 ${
      isDesktop ? 'bg-white/10' : 'bg-gray-100'
    }`}>
      {(['en', 'id'] as Language[]).map((lang) => {
        const Flag = FLAG_MAP[lang];
        const active = language === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center gap-1 rounded-full font-bold uppercase tracking-wide transition-all duration-200 ${
              isDesktop
                ? `px-2.5 py-0.5 text-xs ${active ? 'bg-white text-brand-blue-800 shadow-sm' : 'text-white/70 hover:text-white'}`
                : `px-2.5 py-1 text-[11px] ${active ? 'bg-brand-blue-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`
            }`}
            aria-label={`Switch to ${lang === 'en' ? 'English' : 'Indonesian'}`}
          >
            <Flag className={`rounded-sm overflow-hidden flex-shrink-0 ${isDesktop ? 'w-5 h-3.5' : 'w-4 h-3'}`} />
            {LANG_LABEL[lang]}
          </button>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Header Component                                                    */
/* ------------------------------------------------------------------ */
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    name: t.nav[item.key],
  }));

  // Anchor links (e.g. /#testimonials) are jump-to-section shortcuts, not real
  // pages, so they never show as the active page.
  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white shadow-sm'
        }`}
      >
        {/* Desktop top info bar — visible only on large screens */}
        <div className="hidden lg:block bg-brand-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center text-xs">
            <div className="flex items-center gap-6">
              <a
                href="tel:+6289631281234"
                className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +62 896-3128-1234
              </a>
              <span className="w-px h-3 bg-white/20" />
              <a
                href="mailto:sidiqdwiatmoko@gmail.com"
                className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sidiqdwiatmoko@gmail.com
              </a>
              <span className="w-px h-3 bg-white/20" />
              <a
                href="https://instagram.com/sidiq_1312"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @sidiq_1312
              </a>
            </div>
            <LangSwitcher language={language} setLanguage={setLanguage} variant="desktop" />
          </div>
        </div>

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/NusaBeeTrip-Logo-final.png"
                alt="NusaBeeTrip"
                width={180}
                height={54}
                className="h-10 sm:h-11 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav links — visible on lg+ (tablet uses hamburger) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 xl:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-brand-blue-800'
                      : 'text-gray-600 hover:text-brand-blue-800 hover:bg-brand-blue-50'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-blue-800 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getWhatsAppLink('services', language)}
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

            {/* Mobile & Tablet: Lang toggle + Hamburger */}
            <div className="flex lg:hidden items-center gap-2.5">
              {/* Compact lang toggle */}
              <LangSwitcher language={language} setLanguage={setLanguage} variant="mobile" />

              {/* Hamburger button */}
              <button
                onClick={toggleMenu}
                className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-5 h-3.5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet slide-down menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 bg-white">
            <nav className="px-5 sm:px-6 py-3 space-y-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-brand-blue-50 text-brand-blue-800'
                      : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  {isActive(item.href) && (
                    <span className="w-1 h-5 bg-brand-blue-800 rounded-full flex-shrink-0" />
                  )}
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* WhatsApp CTA in mobile menu */}
            <div className="px-5 sm:px-6 pb-5 pt-2">
              <a
                href={getWhatsAppLink('services', language)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                {t.nav.bookNow}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ============================================================ */}
      {/*  Mobile Bottom Tab Bar                                        */}
      {/* ============================================================ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {/* Safe area for notched phones */}
        <div className="flex items-center justify-around px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]">
          {MOBILE_TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-1 min-w-[3.75rem] py-1.5 rounded-xl outline-none transition-all duration-200 ${
                  active
                    ? 'text-brand-blue-800'
                    : 'text-gray-400 active:text-brand-blue-600'
                }`}
              >
                <div className={`relative transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                  {tab.icon(active)}
                  {active && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-brand-blue-800 rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] font-medium leading-none ${active ? 'text-brand-blue-800 font-semibold' : 'text-gray-400'}`}>
                  {t.nav[tab.key]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;