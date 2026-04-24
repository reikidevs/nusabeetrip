/**
 * SEO utilities for meta tags, structured data, and optimization
 */

import { Metadata } from 'next';
import { BUSINESS_INFO, SITE_CONFIG, TARGET_KEYWORDS } from './constants';
import { getBaseUrl } from './env';

/**
 * Generates page metadata for SEO
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/images/og-image.jpg`;
  
  const allKeywords = [...TARGET_KEYWORDS, ...keywords];
  
  return {
    title,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: BUSINESS_INFO.name }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generates structured data for LocalBusiness
 */
export function generateLocalBusinessStructuredData() {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: baseUrl,
    telephone: BUSINESS_INFO.contactInfo.phone,
    email: BUSINESS_INFO.contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nusa Penida',
      addressRegion: 'Bali',
      addressCountry: 'Indonesia',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.7274,
      longitude: 115.5442,
    },
    priceRange: '$$',
    serviceArea: {
      '@type': 'Place',
      name: 'Nusa Penida, Bali, Indonesia',
    },
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.contactInfo.instagram}`,
      `https://wa.me/${BUSINESS_INFO.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
    ],
  };
}

/**
 * Generates structured data for TouristAttraction
 */
export function generateTouristAttractionStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Nusa Penida Island Tours',
    description: 'Explore the beautiful attractions of Nusa Penida including Kelingking Beach, Diamond Beach, Angel Billabong, and more.',
    url: `${getBaseUrl()}/tours`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nusa Penida',
      addressRegion: 'Bali',
      addressCountry: 'Indonesia',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.7274,
      longitude: 115.5442,
    },
    touristType: ['Families', 'Couples', 'Solo Travelers', 'Adventure Seekers'],
  };
}

/**
 * Generates structured data for Service
 */
export function generateServiceStructuredData() {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Nusa Penida Tour and Rental Services',
    description: 'Professional tour guide services and vehicle rentals in Nusa Penida, Bali.',
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.contactInfo.phone,
      email: BUSINESS_INFO.contactInfo.email,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Nusa Penida, Bali, Indonesia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tour and Rental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'West Trip Tour',
            description: 'Guided tour to western attractions of Nusa Penida',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'East Trip Tour',
            description: 'Guided tour to eastern attractions of Nusa Penida',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vehicle Rental',
            description: 'Motorcycle and car rental services',
          },
        },
      ],
    },
  };
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}