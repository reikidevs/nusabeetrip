import type { Metadata } from 'next';
import DestinationsPage from '../../destinations/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Destinasi Wisata Nusa Penida',
  description:
    'Panduan spot terbaik di Nusa Penida: Kelingking Beach, Diamond Beach, Broken Beach, Angel Billabong, Crystal Bay, Atuh Beach, dan Tree House.',
  path: '/id/destinations',
  keywords: [
    'destinasi nusa penida',
    'wisata nusa penida',
    'kelingking beach',
    'diamond beach nusa penida',
    'broken beach',
  ],
  image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
  imageAlt: 'Destinasi wisata Nusa Penida',
});

export default DestinationsPage;
