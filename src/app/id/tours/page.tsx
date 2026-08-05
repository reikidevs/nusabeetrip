import type { Metadata } from 'next';
import ToursPage from '../../tours/page';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;
export const runtime = 'nodejs';


export const metadata: Metadata = buildMetadata({
  title: 'Paket Tour Nusa Penida - West, East, Mix & Snorkeling',
  description:
    'Paket tour Nusa Penida seharian: West Trip, East Trip, Mix Trip, dan snorkeling Manta Ray. Transport, pemandu lokal, dan booking via WhatsApp.',
  path: '/id/tours',
  keywords: [
    'paket tour nusa penida',
    'tour nusa penida murah',
    'west trip nusa penida',
    'east trip nusa penida',
    'snorkeling manta ray nusa penida',
  ],
  image: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
  imageAlt: 'Paket tour Nusa Penida',
});

export default ToursPage;
