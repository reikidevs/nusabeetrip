import type { Metadata } from 'next';
import GuidesPage from '../../guides/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Panduan Wisata Nusa Penida',
  description:
    'Panduan wisata Nusa Penida: cara ke Nusa Penida dari Bali, itinerary 1-3 hari, waktu terbaik berkunjung, packing list, dan tips perjalanan.',
  path: '/id/guides',
  keywords: [
    'panduan nusa penida',
    'cara ke nusa penida',
    'itinerary nusa penida',
    'tips nusa penida',
  ],
  image: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png',
  imageAlt: 'Panduan wisata Nusa Penida',
});

export default GuidesPage;
