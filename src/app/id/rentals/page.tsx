import type { Metadata } from 'next';
import RentalsPage from '../../rentals/page';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = buildMetadata({
  title: 'Sewa Motor & Mobil di Nusa Penida',
  description:
    'Sewa Yamaha N-Max, Honda Vario, Honda Scoopy, dan mobil dengan sopir di Nusa Penida. Kendaraan terawat, antar gratis, dan support via WhatsApp.',
  path: '/id/rentals',
  keywords: [
    'sewa motor nusa penida',
    'rental motor nusa penida',
    'sewa mobil nusa penida',
    'car with driver nusa penida',
  ],
  image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  imageAlt: 'Sewa kendaraan di Nusa Penida',
});

export default RentalsPage;
