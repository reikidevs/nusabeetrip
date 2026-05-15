import { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Best Travel Nusa Penida | Tours, Snorkeling & Rentals`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a8a',
    orientation: 'portrait',
    categories: ['travel', 'tourism', 'lifestyle', 'transportation'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
    prefer_related_applications: false,
    icons: [
      {
        src: '/images/NusaBeeTrip-Logo-final.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/NusaBeeTrip-Logo-final.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/NusaBeeTrip-Logo-final.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Tour Packages',
        short_name: 'Tours',
        url: '/tours',
        description: 'Browse Nusa Penida tour packages',
      },
      {
        name: 'Vehicle Rentals',
        short_name: 'Rentals',
        url: '/rentals',
        description: 'Rent motorcycles and cars in Nusa Penida',
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        url: '/contact',
        description: 'Book via WhatsApp or contact us',
      },
    ],
  };
}
