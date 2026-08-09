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
import {
  PRIMARY_KEYWORDS,
  SITE,
  absoluteUrl,
  localeFromPath,
  localizedAlternates,
  localizedPath,
  stripLocaleFromPath,
  type SiteLocale,
} from './site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES } from './constants';
import { TESTIMONIALS, getAggregateRating } from './testimonials';
import type { RentalService, TourPackage } from '@/types';

type PageMetaInput = {
  /** Title fragment — inner pages append "| NusaBeeTrip". */
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
  /** Page language. Inferred from the route when omitted. */
  locale?: SiteLocale;
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
  locale,
  datePublished,
  dateModified,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const pageLocale = locale ?? localeFromPath(path);
  const isHomepage = stripLocaleFromPath(path) === '/';
  const fullTitle = isHomepage && title.toLowerCase().includes(SITE.name.toLowerCase())
    ? title
    : `${title} | ${SITE.name}`;
  const ogImage = image
    ? (image.startsWith('http') ? image : absoluteUrl(image))
    : absoluteUrl(SITE.socialImage);
  const ogImageType = image
    ? image.toLowerCase().endsWith('.png')
      ? 'image/png'
      : image.toLowerCase().endsWith('.webp')
        ? 'image/webp'
        : 'image/jpeg'
    : 'image/png';
  const allKeywords = Array.from(new Set([...PRIMARY_KEYWORDS, ...keywords]));

  const languages = alternates ?? localizedAlternates(path);

  // Build other meta tags for enhanced SEO
  const otherMeta: Record<string, string> = {
    'geo.region': 'ID-BA',
    'geo.placename': 'Nusa Penida, Bali',
    'geo.position': `${SITE.geo.latitude};${SITE.geo.longitude}`,
    'ICBM': `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
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
      locale: pageLocale === 'id' ? SITE.alternateLocale : SITE.locale,
      alternateLocale: [pageLocale === 'id' ? SITE.locale : SITE.alternateLocale],
      images: [
        {
          url: ogImage,
          ...(image ? {} : { width: 1200, height: 630 }),
          alt: imageAlt || SITE.ogImageAlt,
          type: ogImageType,
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
      icon: {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
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
    '@id': `${SITE.url}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.alternateNames,
    description: SITE.description,
    disambiguatingDescription: SITE.disambiguatingDescription,
    url: SITE.url,
    logo: absoluteUrl(SITE.ogImage),
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    currenciesAccepted: 'IDR, USD',
    paymentAccepted: 'Cash, Bank Transfer',
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
    sameAs: SITE.externalProfiles,
    knowsLanguage: ['en', 'id'],
    makesOffer: TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({
      '@type': 'Offer',
      name: p.name,
      url: absoluteUrl(`/tours/${p.slug}`),
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
    alternateName: SITE.alternateNames,
    description: SITE.description,
    disambiguatingDescription: SITE.disambiguatingDescription,
    publisher: { '@id': `${SITE.url}#organization` },
    inLanguage: ['en', 'id'],
  };
}

/** Organization schema — paired with WebSite for entity recognition */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'TravelAgency'],
    '@id': `${SITE.url}#organization`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    description: SITE.description,
    disambiguatingDescription: SITE.disambiguatingDescription,
    url: SITE.url,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'officialWebsite',
      value: 'nusabeetrip.com',
    },
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE.ogImage),
      width: 677,
      height: 369,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['en', 'id'],
      url: SITE.social.whatsapp,
    },
    sameAs: SITE.externalProfiles,
  };
}

/** ItemList for the tour catalog. Service schema belongs on each detail page. */
export function tourPackageListJsonLd(
  packages: TourPackage[] = TOUR_PACKAGES,
  locale: SiteLocale = 'en',
) {
  const activePackages = packages.filter((pkg) => pkg.isActive);
  const listPath = localizedPath('/tours', locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(listPath)}#tour-list`,
    name: locale === 'id' ? 'Paket Tour Nusa Penida' : 'Nusa Penida Tour Packages',
    url: absoluteUrl(listPath),
    numberOfItems: activePackages.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: activePackages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pkg.name,
      url: absoluteUrl(localizedPath(`/tours/${pkg.slug}`, locale)),
    })),
  };
}

/** ItemList for the rental catalog. Service schema belongs on each detail page. */
export function rentalServiceListJsonLd(
  services: RentalService[] = RENTAL_SERVICES,
  locale: SiteLocale = 'en',
) {
  const availableServices = services.filter((service) => service.isAvailable);
  const listPath = localizedPath('/rentals', locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(listPath)}#rental-list`,
    name: locale === 'id' ? 'Rental Kendaraan Nusa Penida' : 'Nusa Penida Vehicle Rentals',
    url: absoluteUrl(listPath),
    numberOfItems: availableServices.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: availableServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.model,
      url: absoluteUrl(localizedPath(`/rentals/${service.slug}`, locale)),
    })),
  };
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
  available?: boolean;
  unitText?: string;
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
      '@id': `${SITE.url}#organization`,
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
            availability: opts.available === false
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
            priceSpecification: opts.unitText
              ? {
                  '@type': 'UnitPriceSpecification',
                  price: opts.price,
                  priceCurrency: opts.currency,
                  unitText: opts.unitText,
                }
              : undefined,
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

/** Generic HowTo schema for step-by-step guide articles (e.g. "How to get
 * to Nusa Penida", itinerary planning). Makes the article eligible for HowTo
 * rich results in Google SERPs. Steps must reflect content visible on-page. */
export function guideHowToJsonLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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
export function siteNavigationJsonLd(locale: SiteLocale = 'en') {
  const isIndonesian = locale === 'id';
  const page = (name: string, nameId: string, path: string) => ({
    '@type': 'WebPage',
    name: isIndonesian ? nameId : name,
    url: absoluteUrl(localizedPath(path, locale)),
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: isIndonesian ? 'Navigasi Utama' : 'Main Navigation',
    hasPart: [
      page('Home', 'Beranda', '/'),
      page('Tours', 'Tur', '/tours'),
      page('Rentals', 'Sewa', '/rentals'),
      page('Destinations', 'Destinasi', '/destinations'),
      page('Guides', 'Panduan', '/guides'),
      page('Souvenirs', 'Souvenir', '/souvenirs'),
      page('About', 'Tentang', '/about'),
      page('Contact', 'Kontak', '/contact'),
    ],
  };
}

/** Homepage-specific: combined rich schema for maximum SERP presence */
export function homepageJsonLd(locale: SiteLocale = 'en') {
  const isIndonesian = locale === 'id';
  const pageUrl = absoluteUrl(localizedPath('/', locale));

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: isIndonesian
      ? `Situs Resmi ${SITE.name} - Tour, Snorkeling & Rental Nusa Penida`
      : `Nusa Penida Tours & Private Driver — Official ${SITE.name}`,
    description: isIndonesian
      ? 'Situs resmi NusaBeeTrip untuk tour lokal Nusa Penida, snorkeling pari manta, sewa motor, dan mobil dengan sopir. Booking langsung via WhatsApp.'
      : SITE.description,
    disambiguatingDescription: SITE.disambiguatingDescription,
    isPartOf: { '@id': `${SITE.url}#website` },
    about: { '@id': `${SITE.url}#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg'),
      width: 1920,
      height: 1080,
      caption: isIndonesian
        ? 'Kelingking Beach Nusa Penida - Tour NusaBeeTrip'
        : 'Kelingking Beach Nusa Penida - NusaBeeTrip Tours',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isIndonesian ? 'Beranda' : 'Home',
          item: pageUrl,
        },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-description'],
    },
    inLanguage: isIndonesian ? 'id-ID' : 'en-US',
    datePublished: '2024-01-01',
    dateModified: '2026-08-04',
  };
}

/** LocalBusiness with enhanced local SEO signals.
 *  Pass real DB rating/reviews via `opts` (server-side); falls back to static. */
export function localBusinessEnhancedJsonLd(opts?: {
  ratingValue?: number;
  reviewCount?: number;
  includeReviews?: boolean;
  reviews?: Array<{
    authorName: string;
    title?: string | null;
    body: string;
    rating: number;
    date: string;
  }>;
}) {
  const fallback = getAggregateRating();
  const ratingValue = opts?.ratingValue ?? fallback.ratingValue;
  const reviewCount = opts?.reviewCount ?? fallback.reviewCount;
  const includeReviews = opts?.includeReviews === true;
  const reviewList =
    opts?.reviews ??
    TESTIMONIALS.slice(0, 6).map((t) => ({
      authorName: t.name,
      title: t.title,
      body: t.body,
      rating: t.rating,
      date: t.date,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE.url}#organization`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    legalName: SITE.legalName,
    description: SITE.description,
    disambiguatingDescription: SITE.disambiguatingDescription,
    url: SITE.url,
    logo: absoluteUrl(SITE.ogImage),
    image: [
      absoluteUrl('/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg'),
      absoluteUrl('/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg'),
      absoluteUrl('/images/snorkeling-manta-rays/snorkeling-manta-rays-nusa-penida-1.jpeg'),
    ],
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    currenciesAccepted: 'IDR, USD',
    paymentAccepted: 'Cash, Bank Transfer',
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
    hasMap: SITE.googleBusinessProfileUrl,
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
    sameAs: SITE.externalProfiles,
    knowsLanguage: ['en', 'id'],
    slogan: 'Best Travel Nusa Penida',
    aggregateRating:
      includeReviews && reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: ratingValue.toString(),
            reviewCount: reviewCount.toString(),
            bestRating: '5',
            worstRating: '1',
          }
        : undefined,
    review: includeReviews
      ? reviewList.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.authorName },
          datePublished: r.date,
          name: r.title || undefined,
          reviewBody: r.body,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating.toString(),
            bestRating: '5',
            worstRating: '1',
          },
        }))
      : undefined,
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
