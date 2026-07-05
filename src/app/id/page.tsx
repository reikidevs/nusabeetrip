import type { Metadata } from 'next';
import HomePage from '../page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Paket Tour Nusa Penida, Snorkeling & Sewa Kendaraan',
  description:
    'Tour Nusa Penida milik warga lokal: West Trip, East Trip, Mix Trip, snorkeling Manta Ray, sewa motor, dan mobil dengan sopir. Booking cepat via WhatsApp.',
  path: '/id',
  keywords: [
    'tour nusa penida',
    'paket tour nusa penida',
    'sewa motor nusa penida',
    'snorkeling manta ray nusa penida',
    'wisata nusa penida',
  ],
  image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
  imageAlt: 'Tour Nusa Penida bersama NusaBeeTrip',
});

export default HomePage;
