/**
 * Single source of truth for SEO + branding metadata.
 * Edit here, propagates to <head>, sitemap, robots, JSON-LD.
 */

import { CONTACT_INFO } from './constants';

const GOOGLE_PLACE_ID = 'ChIJUwlc6Uhz0i0RUwOyEzu2e-Y';
const GOOGLE_BUSINESS_PROFILE_URL =
  'https://maps.app.goo.gl/AT6nfQVX19KM9ryZ6';
const GOOGLE_REVIEW_URL =
  `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

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
    'nusabeetrip.com',
  ],

  /** ~155 chars max — used as default <meta description> */
  description:
    'NusaBeeTrip official website for local Nusa Penida tours, Manta Ray snorkeling, scooter rental, and car with driver. Book direct via WhatsApp.',

  disambiguatingDescription:
    'NusaBeeTrip is an independent local tour, private driver, transfer, snorkeling, and vehicle rental operator based in Nusa Penida, Bali.',

  /** Default Open Graph image — must exist in /public */
  ogImage: '/images/NusaBeeTrip-Logo-final.png',
  ogImageAlt: 'NusaBeeTrip - Best Travel Nusa Penida',
  socialImage: '/opengraph-image',

  /** Locale shipped on initial render */
  locale: 'en_US',
  alternateLocale: 'id_ID',

  /** Geo for LocalBusiness JSON-LD (Nusa Penida, Bali) */
  geo: {
    latitude: -8.6791946,
    longitude: 115.4921559,
    addressLocality: 'Nusa Penida',
    addressRegion: 'Bali',
    postalCode: '80771',
    addressCountry: 'ID',
    streetAddress: 'Desa Banjarnyuh, Ped',
    fullAddress:
      'Desa Banjarnyuh, Ped, Kec. Nusa Penida, Kabupaten Klungkung, Bali 80771',
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

  googlePlaceId: GOOGLE_PLACE_ID,
  googleBusinessProfileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  /**
   * Social / third-party profiles for JSON-LD `sameAs`.
   * Only non-empty values are emitted, so leaving any env var blank is safe.
   * Fill these in .env.local / Vercel to strengthen entity trust signals.
   */
  externalProfiles: [
    `https://instagram.com/${CONTACT_INFO.instagram}`,
    GOOGLE_BUSINESS_PROFILE_URL,
    ...(process.env.NEXT_PUBLIC_FACEBOOK_URL ? [process.env.NEXT_PUBLIC_FACEBOOK_URL] : []),
    ...(process.env.NEXT_PUBLIC_YOUTUBE_URL ? [process.env.NEXT_PUBLIC_YOUTUBE_URL] : []),
    ...(process.env.NEXT_PUBLIC_TIKTOK_URL ? [process.env.NEXT_PUBLIC_TIKTOK_URL] : []),
    ...(process.env.NEXT_PUBLIC_TRIPADVISOR_URL ? [process.env.NEXT_PUBLIC_TRIPADVISOR_URL] : []),
    ...(process.env.NEXT_PUBLIC_WHATSAPP_URL ? [process.env.NEXT_PUBLIC_WHATSAPP_URL] : []),
  ],


  /** Direct Google review flow for the verified NusaBeeTrip Place ID. */
  googleReviewUrl: GOOGLE_REVIEW_URL,
  /** A direct review destination is always available through the Place ID. */
  hasDirectGoogleReviewUrl: true,

  contact: CONTACT_INFO,
} as const;

/** Primary keywords — keep tight, Google ignores keyword bloat */
export const PRIMARY_KEYWORDS = [
  // Brand — defend the name so it always surfaces
  'nusabeetrip',
  'nusabeetrip.com',
  'nusabeetrip official',
  'nusa bee trip',
  'nusa bee trip official',
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

export type SiteLocale = 'en' | 'id';

export const DEFAULT_LOCALE: SiteLocale = 'en';
export const LOCALE_PREFIXES: Record<Exclude<SiteLocale, 'en'>, string> = {
  id: '/id',
};

function normalizePath(path: string = '/'): string {
  if (!path) return '/';
  const [pathname, suffix = ''] = path.split(/(?=[?#])/);
  let cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath.length > 1) {
    cleanPath = cleanPath.replace(/\/+$/, '');
  }
  return `${cleanPath}${suffix}`;
}

export function stripLocaleFromPath(path: string = '/'): string {
  const cleanPath = normalizePath(path);
  const [pathname, suffix = ''] = cleanPath.split(/(?=[?#])/);
  if (pathname === LOCALE_PREFIXES.id) return `/${suffix}`;
  if (pathname.startsWith(`${LOCALE_PREFIXES.id}/`)) {
    return `${pathname.slice(LOCALE_PREFIXES.id.length)}${suffix}`;
  }
  return cleanPath;
}

export function localizedPath(path: string = '/', locale: SiteLocale = DEFAULT_LOCALE): string {
  const basePath = stripLocaleFromPath(path);
  const [pathname, suffix = ''] = basePath.split(/(?=[?#])/);
  if (locale === 'en') return basePath;
  if (pathname === '/') return `${LOCALE_PREFIXES.id}${suffix}`;
  return `${LOCALE_PREFIXES.id}${pathname}${suffix}`;
}

export function localeFromPath(path: string = '/'): SiteLocale {
  const cleanPath = normalizePath(path);
  return cleanPath === LOCALE_PREFIXES.id || cleanPath.startsWith(`${LOCALE_PREFIXES.id}/`)
    ? 'id'
    : 'en';
}

export function localizedAlternates(path: string = '/'): Record<string, string> {
  const basePath = stripLocaleFromPath(path);
  const enUrl = absoluteUrl(localizedPath(basePath, 'en'));
  const idUrl = absoluteUrl(localizedPath(basePath, 'id'));
  return {
    'en-US': enUrl,
    'id-ID': idUrl,
    'x-default': enUrl,
  };
}
