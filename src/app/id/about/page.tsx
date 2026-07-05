import type { Metadata } from 'next';
import AboutPage from '../../about/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tentang NusaBeeTrip',
  description:
    'NusaBeeTrip adalah operator tour dan rental lokal di Nusa Penida, Bali. Kami membantu wisatawan menjelajahi pulau dengan pemandu lokal dan booking mudah.',
  path: '/id/about',
  keywords: [
    'tentang nusabeetrip',
    'operator tour nusa penida',
    'pemandu lokal nusa penida',
  ],
  image: '/images/NusaBeeTrip-Logo-final.png',
  imageAlt: 'Logo NusaBeeTrip',
});

export default AboutPage;
