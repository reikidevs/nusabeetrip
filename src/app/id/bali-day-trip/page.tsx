import type { Metadata } from 'next';
import BaliDayTripPage from '../../bali-day-trip/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Day Trip Nusa Penida dari Bali',
  description:
    'Paket day trip Nusa Penida dari Bali dengan fast boat, pemandu lokal, transport di pulau, dan itinerary efisien untuk spot terbaik.',
  path: '/id/bali-day-trip',
  keywords: [
    'day trip nusa penida dari bali',
    'nusa penida dari bali',
    'paket wisata bali nusa penida',
  ],
  image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
  imageAlt: 'Day trip Nusa Penida dari Bali',
});

export default BaliDayTripPage;
