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

  /** ~155 chars max — used as default <meta description> */
  description:
    'Local-owned Nusa Penida tours, snorkeling with Manta Rays, and motorcycle/car rentals. West Trip, East Trip & Mix Trip from 390K IDR. Book via WhatsApp.',

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

  contact: CONTACT_INFO,
} as const;

/** Primary keywords — keep tight, Google ignores keyword bloat */
export const PRIMARY_KEYWORDS = [
  'nusa penida tour',
  'best travel nusa penida',
  'tour nusa penida',
  'nusa penida trip',
  'paket tur nusa penida',
  'kelingking beach tour',
  'diamond beach tour',
  'snorkeling manta ray nusa penida',
  'sewa motor nusa penida',
  'nusa penida motorcycle rental',
  'nusa penida car rental',
  'west trip nusa penida',
  'east trip nusa penida',
];

/** Build absolute URL for a given path */
export function absoluteUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}
