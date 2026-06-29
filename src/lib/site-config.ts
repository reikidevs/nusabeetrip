/**
 * Single source of truth for SEO + branding metadata.
 * Edit here, propagates to <head>, sitemap, robots, JSON-LD.
 */

import { CONTACT_INFO } from './constants';

export const SITE = {
  /** Production canonical URL — change this when you buy your real domain */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://nusabeetrip.com').replace(/\/$/, ''),

  name: 'NusaBeeTrip',
  legalName: 'NusaBeeTrip',
  shortName: 'NusaBeeTrip',
  brandTagline: 'Best Travel Nusa Penida',

  /**
   * Brand name variations — fed into Organization/WebSite/LocalBusiness
   * `alternateName`. Helps search engines disambiguate "NusaBeeTrip" from
   * the unrelated "Nusatrip" (OTA) and "BeeTrip" brands, and to recognise
   * common spellings users actually type.
   */
  alternateNames: [
    'Nusa Bee Trip',
    'NusaBee Trip',
    'Nusabee Trip',
    'Nusa Bee Trip Nusa Penida',
    'NusaBeeTrip Nusa Penida Tours',
    'NusaBeeTrip Tours & Rentals',
  ],

  /** ~155 chars max — used as default <meta description> */
  description:
    'Local-owned Nusa Penida tours, snorkeling with Manta Rays, and motorcycle/car rentals. West Trip, East Trip & Mix Trip from 390K IDR. Book instantly via WhatsApp — best prices guaranteed.',

  /** Default Open Graph image — must exist in /public */
  ogImage: '/images/NusaBeeTrip-Logo-final.png',
  ogImageAlt: 'NusaBeeTrip - Best Travel Nusa Penida',

  /** Locale shipped on initial render */
  locale: 'en_US',
  alternateLocale: 'id_ID',

  /** Geo for LocalBusiness JSON-LD (Nusa Penida, Bali) */
  geo: {
    latitude: -8.7274,
    longitude: 115.5442,
    addressLocality: 'Nusa Penida',
    addressRegion: 'Bali',
    postalCode: '80771',
    addressCountry: 'ID',
    streetAddress: 'Nusa Penida, Klungkung Regency',
  },

  /** Operating hours — used by LocalBusiness JSON-LD */
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '22:00',
    },
  ],

  /** Search engine verification — drop your codes here when you have them */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.BING_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_SITE_VERIFICATION || '',
  },

  social: {
    instagram: `https://instagram.com/${CONTACT_INFO.instagram}`,
    whatsapp: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`,
  },

  /**
   * Google Business Profile review link. Until the GBP is verified we fall back
   * to a Maps brand search. Once verified, grab your short review link from the
   * GBP dashboard (Ask for reviews → looks like https://g.page/r/XXXX/review)
   * and set NEXT_PUBLIC_GOOGLE_REVIEW_URL in Vercel — it propagates everywhere.
   */
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
    'https://www.google.com/maps/search/?api=1&query=NusaBeeTrip+Nusa+Penida',

  contact: CONTACT_INFO,
} as const;

/** Primary keywords — keep tight, Google ignores keyword bloat */
export const PRIMARY_KEYWORDS = [
  // Brand — defend the name so it always surfaces
  'nusabeetrip',
  'nusa bee trip',
  // English — broad Bali intent (high volume, top-of-funnel)
  'best tour in bali',
  'best day trip from bali',
  'best tour trip in bali',
  'bali island tour',
  'best tour nusa penida',
  'best nusa penida tour',
  // English — high intent
  'nusa penida tour',
  'best travel nusa penida',
  'tour nusa penida',
  'nusa penida trip',
  'nusa penida day trip',
  'nusa penida day trip from bali',
  'nusa penida tour package',
  'nusa penida island tour',
  'kelingking beach tour',
  'diamond beach tour',
  'broken beach nusa penida',
  'snorkeling manta ray nusa penida',
  'swim with manta rays bali',
  'nusa penida snorkeling tour',
  'sewa motor nusa penida',
  'nusa penida motorcycle rental',
  'nusa penida car rental',
  'nusa penida scooter rental',
  'west trip nusa penida',
  'east trip nusa penida',
  'nusa penida from bali',
  'things to do nusa penida',
  'nusa penida travel guide',
  'nusa penida tour price',
  // Indonesian — local SEO
  'paket tur nusa penida',
  'wisata nusa penida',
  'tour nusa penida murah',
  'sewa motor nusa penida murah',
  'rental motor nusa penida',
  'paket snorkeling nusa penida',
  'trip nusa penida',
  'liburan nusa penida',
  'paket wisata bali',
];

/** Build absolute URL for a given path */
export function absoluteUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}
