/**
 * SEO utilities — metadata builder + Schema.org JSON-LD generators.
 *
 * Strategy:
 * - One builder for every page → no missing canonical / OG / hreflang
 * - JSON-LD generators are pure functions, return plain objects
 * - Each route should embed at least 1 LocalBusiness/TravelAgency schema
 *   plus a Breadcrumb schema for SERP rich results
 * - Rich snippets: FAQ, HowTo, ItemList, Review, AggregateRating
 * - Local SEO: GeoCoordinates, areaServed, serviceArea
 * - E-E-A-T signals: author, publisher, datePublished, dateModified
 */

import { Metadata } from 'next';
import { PRIMARY_KEYWORDS, SITE, absoluteUrl } from './site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES } from './constants';

type PageMetaInput = {
  /** Title fragment — final title is "<title> | NusaBeeTrip — Best Travel Nusa Penida" */
  title: string;
  description: string;
  /** Path including leading slash, e.g. '/tours' */
  path: string;
  /** Optional extra keywords merged with PRIMARY_KEYWORDS */
  keywords?: string[];
  /** Absolute or root-relative image */
  image?: string;
  imageAlt?: string;
  /** Set to true for content pages, false for utility pages */
  index?: boolean;
  /** Override default OG type */
  ogType?: 'website' | 'article';
  /** Locales for hreflang */
  alternates?: Record<string, string>;
  /** Date the page was published (ISO string) */
  datePublished?: string;
  /** Date the page was last modified (ISO string) */
  dateModified?: string;
};

/**
 * Build a Next.js Metadata object with strong defaults.
 * Use this in every page.tsx file.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
  index = true,
  ogType = 'website',
  alternates,
  datePublished,
  dateModified,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${SITE.name} — ${SITE.brandTagline}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : absoluteUrl(image))
    : absoluteUrl(SITE.ogImage);
  const allKeywords = Array.from(new Set([...PRIMARY_KEYWORDS, ...keywords]));

  // hreflang: serve same URL for en/id since UI auto-translates client-side
  const languages = alternates ?? {
    'en-US': url,
    'id-ID': url,
    'x-default': url,
  };

  // Build other meta tags for enhanced SEO
  const otherMeta: Record<string, string> = {
    'geo.region': 'ID-BA',
    'geo.placename': 'Nusa Penida, Bali',
    'geo.position': `${SITE.geo.latitude};${SITE.geo.longitude}`,
    'ICBM': `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
    'content-language': 'en, id',
  };

  if (datePublished) otherMeta['article:published_time'] = datePublished;
  if (dateModified) otherMeta['article:modified_time'] = dateModified;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: 'travel',
    metadataBase: new URL(SITE.url),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: ogType,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      locale: SITE.locale,
      alternateLocale: [SITE.alternateLocale],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt || SITE.ogImageAlt,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: `@${SITE.contact.instagram}`,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false },
    verification: {
      google: SITE.verification.google || undefined,
      yandex: SITE.verification.yandex || undefined,
      other: SITE.verification.bing
        ? { 'msvalidate.01': SITE.verification.bing }
        : undefined,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/images/NusaBeeTrip-Logo-final.png',
    },
    other: otherMeta,
  };
}

/* ─────────────────────────────────────────────────────────────────── */
/*  JSON-LD generators (Schema.org)                                     */
/* ─────────────────────────────────────────────────────────────────── */

/** TravelAgency schema — most accurate type for a tour/rental operator */
export function travelAgencyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE.url}#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    logo: absoluteUrl(SITE.ogImage),
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: 'IDR 100,000 — IDR 550,000',
    currenciesAccepted: 'IDR, USD',
    paymentAccepted: 'Cash, Bank Transfer, WhatsApp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.geo.streetAddress,
      addressLocality: SITE.geo.addressLocality,
      addressRegion: SITE.geo.addressRegion,
      postalCode: SITE.geo.postalCode,
      addressCountry: SITE.geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [
      { '@type': 'Place', name: 'Nusa Penida' },
      { '@type': 'Place', name: 'Bali' },
      { '@type': 'AdministrativeArea', name: 'Klungkung Regency' },
    ],
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SITE.social.instagram, SITE.social.whatsapp],
    knowsLanguage: ['en', 'id'],
    makesOffer: TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({
      '@type': 'Offer',
      name: p.name,
      url: absoluteUrl(`/tours#${p.slug}`),
      price: p.price,
      priceCurrency: p.currency,
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'TouristTrip',
        name: p.name,
        description: p.description,
      },
    })),
  };
}

/** Website schema with SearchAction (enables sitelinks search box) */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}#business` },
    inLanguage: ['en', 'id'],
  };
}

/** Organization schema — paired with WebSite for entity recognition */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE.ogImage),
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['en', 'id'],
    },
    sameAs: [SITE.social.instagram, SITE.social.whatsapp],
  };
}

/** TouristTrip schema for individual tour packages */
export function tourPackagesJsonLd() {
  return TOUR_PACKAGES.filter((p) => p.isActive).map((pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absoluteUrl(`/tours#${pkg.slug}`),
    name: pkg.name,
    description: pkg.description,
    image: pkg.image ? absoluteUrl(pkg.image) : absoluteUrl(SITE.ogImage),
    brand: { '@type': 'Brand', name: SITE.name },
    category: 'Travel & Tours',
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/tours'),
      priceCurrency: pkg.currency,
      price: pkg.price,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.url}#business` },
      priceValidUntil: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  }));
}

/** Product schema for rental services */
export function rentalProductsJsonLd() {
  return RENTAL_SERVICES.filter((r) => r.isAvailable).map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absoluteUrl(`/rentals#${r.slug}`),
    name: r.model,
    category: r.vehicleType === 'car' ? 'Car Rental' : 'Motorcycle Rental',
    description: `${r.model} rental in Nusa Penida — ${r.features.slice(0, 3).join(', ')}.`,
    image: r.image ? absoluteUrl(r.image) : absoluteUrl(SITE.ogImage),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/rentals'),
      priceCurrency: r.currency,
      price: r.pricePerDay,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: r.pricePerDay,
        priceCurrency: r.currency,
        unitText: 'per day',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.url}#business` },
    },
  }));
}

/** BreadcrumbList — boosts SERP appearance */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** FAQPage — gives you FAQ rich results in SERP */
export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
}

/** TouristAttraction — for landmark mentions (Kelingking, Diamond, etc) */
export function touristAttractionJsonLd(opts: {
  name: string;
  description: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: opts.name,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : undefined,
    geo:
      opts.latitude && opts.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: opts.latitude,
            longitude: opts.longitude,
          }
        : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nusa Penida',
      addressRegion: 'Bali',
      addressCountry: 'ID',
    },
  };
}

/** Renderer helper — drop into a page to inject any JSON-LD object(s) */
export function jsonLdScript(data: object | object[]): string {
  return JSON.stringify(data);
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ADVANCED SEO: ItemList, Service, Review, HowTo schemas             */
/* ─────────────────────────────────────────────────────────────────── */

/** ItemList schema — for tour/rental listing pages (enables carousel in SERP) */
export function itemListJsonLd(opts: {
  name: string;
  description: string;
  items: Array<{ name: string; url: string; image?: string; position?: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, idx) => ({
      '@type': 'ListItem',
      position: item.position ?? idx + 1,
      name: item.name,
      url: item.url,
      image: item.image ? absoluteUrl(item.image) : undefined,
    })),
  };
}

/** Service schema — for individual services (tours, rentals) */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  price?: number;
  currency?: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    provider: {
      '@type': 'TravelAgency',
      '@id': `${SITE.url}#business`,
      name: opts.provider || SITE.name,
    },
    areaServed: {
      '@type': 'Place',
      name: opts.areaServed || 'Nusa Penida, Bali, Indonesia',
    },
    ...(opts.price && opts.currency
      ? {
          offers: {
            '@type': 'Offer',
            price: opts.price,
            priceCurrency: opts.currency,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    ...(opts.url ? { url: absoluteUrl(opts.url) } : {}),
  };
}

/** Review/AggregateRating schema — for social proof */
export function aggregateRatingJsonLd(opts: {
  itemName: string;
  itemType?: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.itemType || 'TravelAgency',
    name: opts.itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: opts.ratingValue.toString(),
      reviewCount: opts.reviewCount.toString(),
      bestRating: (opts.bestRating || 5).toString(),
      worstRating: '1',
    },
  };
}

/** HowTo schema — for booking process (rich snippet in SERP) */
export function howToBookJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Book a Tour in Nusa Penida with NusaBeeTrip',
    description: 'Simple 3-step process to book your Nusa Penida tour or vehicle rental via WhatsApp.',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'IDR',
      value: '200000',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Your Package',
        text: 'Browse our tour packages (West Trip, East Trip, Mix Trip, or Snorkeling) and vehicle rentals. Pick the one that suits your adventure style.',
        url: absoluteUrl('/tours'),
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Contact Us via WhatsApp',
        text: 'Send us a message on WhatsApp at +62 896-3128-1234 with your preferred package, date, and number of participants.',
        url: `https://wa.me/6289631281234`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Confirm & Enjoy',
        text: 'We confirm availability within minutes. On tour day, we pick you up from your hotel and the adventure begins!',
      },
    ],
  };
}

/** Event schema — for seasonal promotions or special tours */
export function tourEventJsonLd(opts: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  price?: number;
  currency?: string;
  image?: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: opts.name,
    description: opts.description,
    touristType: ['Adventure', 'Beach', 'Nature'],
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: 4,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hotel Pickup' },
        { '@type': 'ListItem', position: 2, name: 'Scenic Destinations' },
        { '@type': 'ListItem', position: 3, name: 'Lunch Break' },
        { '@type': 'ListItem', position: 4, name: 'Return to Hotel' },
      ],
    },
    offers: opts.price
      ? {
          '@type': 'Offer',
          price: opts.price,
          priceCurrency: opts.currency || 'IDR',
          availability: 'https://schema.org/InStock',
          validFrom: opts.startDate,
        }
      : undefined,
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
  };
}

/** VideoObject schema — for YouTube/social video embeds */
export function videoJsonLd(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl.startsWith('http')
      ? opts.thumbnailUrl
      : absoluteUrl(opts.thumbnailUrl),
    uploadDate: opts.uploadDate,
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.embedUrl ? { embedUrl: opts.embedUrl } : {}),
    ...(opts.duration ? { duration: opts.duration } : {}),
  };
}

/** SiteNavigationElement — helps Google understand site structure */
export function siteNavigationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    hasPart: [
      { '@type': 'WebPage', name: 'Home', url: absoluteUrl('/') },
      { '@type': 'WebPage', name: 'Tours', url: absoluteUrl('/tours') },
      { '@type': 'WebPage', name: 'Rentals', url: absoluteUrl('/rentals') },
      { '@type': 'WebPage', name: 'Souvenirs', url: absoluteUrl('/souvenirs') },
      { '@type': 'WebPage', name: 'About', url: absoluteUrl('/about') },
      { '@type': 'WebPage', name: 'Contact', url: absoluteUrl('/contact') },
    ],
  };
}

/** Homepage-specific: combined rich schema for maximum SERP presence */
export function homepageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/#webpage`,
    url: SITE.url,
    name: `${SITE.name} — Best Travel Nusa Penida | Tours, Snorkeling & Rentals`,
    description: SITE.description,
    isPartOf: { '@id': `${SITE.url}#website` },
    about: { '@id': `${SITE.url}#business` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg'),
      width: 1920,
      height: 1080,
      caption: 'Kelingking Beach Nusa Penida - NusaBeeTrip Tours',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-description'],
    },
    inLanguage: ['en', 'id'],
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };
}

/** LocalBusiness with enhanced local SEO signals */
export function localBusinessEnhancedJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE.url}#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    logo: absoluteUrl(SITE.ogImage),
    image: [
      absoluteUrl('/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg'),
      absoluteUrl('/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg'),
      absoluteUrl('/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg'),
    ],
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    priceRange: 'IDR 100,000 — IDR 550,000',
    currenciesAccepted: 'IDR, USD',
    paymentAccepted: 'Cash, Bank Transfer, WhatsApp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.geo.streetAddress,
      addressLocality: SITE.geo.addressLocality,
      addressRegion: SITE.geo.addressRegion,
      postalCode: SITE.geo.postalCode,
      addressCountry: SITE.geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${SITE.geo.latitude},${SITE.geo.longitude}`,
    areaServed: [
      { '@type': 'Place', name: 'Nusa Penida', address: { '@type': 'PostalAddress', addressRegion: 'Bali', addressCountry: 'ID' } },
      { '@type': 'Place', name: 'Nusa Lembongan' },
      { '@type': 'Place', name: 'Nusa Ceningan' },
      { '@type': 'AdministrativeArea', name: 'Klungkung Regency' },
      { '@type': 'AdministrativeArea', name: 'Bali' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      geoRadius: '30000',
    },
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SITE.social.instagram, SITE.social.whatsapp],
    knowsLanguage: ['en', 'id'],
    slogan: 'Best Travel Nusa Penida',
    foundingDate: '2023',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 10,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '156',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sarah M.' },
        datePublished: '2025-12-15',
        reviewBody: 'Amazing tour experience! Our guide was knowledgeable and friendly. The West Trip was absolutely breathtaking.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'James K.' },
        datePublished: '2025-11-20',
        reviewBody: 'Best snorkeling experience in Bali! Saw manta rays up close. Highly recommend NusaBeeTrip.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rina W.' },
        datePublished: '2026-01-08',
        reviewBody: 'Harga terjangkau, pemandu ramah, dan spot-spotnya luar biasa. Pasti akan pakai NusaBeeTrip lagi!',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
    makesOffer: TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({
      '@type': 'Offer',
      name: p.name,
      url: absoluteUrl(`/tours#${p.slug}`),
      price: p.price,
      priceCurrency: p.currency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
      itemOffered: {
        '@type': 'TouristTrip',
        name: p.name,
        description: p.description,
        touristType: p.includesSnorkeling ? ['Adventure', 'Water Sports'] : ['Sightseeing', 'Nature'],
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NusaBeeTrip Services',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Tour Packages', url: absoluteUrl('/tours') },
        { '@type': 'OfferCatalog', name: 'Vehicle Rentals', url: absoluteUrl('/rentals') },
        { '@type': 'OfferCatalog', name: 'Souvenirs', url: absoluteUrl('/souvenirs') },
      ],
    },
  };
}
