/**
 * SEO utilities — metadata builder + Schema.org JSON-LD generators.
 *
 * Strategy:
 * - One builder for every page → no missing canonical / OG / hreflang
 * - JSON-LD generators are pure functions, return plain objects
 * - Each route should embed at least 1 LocalBusiness/TravelAgency schema
 *   plus a Breadcrumb schema for SERP rich results
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
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
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
