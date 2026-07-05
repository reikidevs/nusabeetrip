import type { Metadata } from 'next';
import SouvenirsPage from '../../souvenirs/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Souvenir Nusa Penida',
  description:
    'Souvenir lokal Nusa Penida: kaos, gantungan kunci, topi, tote bag, magnet, postcard, dan hadiah perjalanan lainnya. Pesan via WhatsApp.',
  path: '/id/souvenirs',
  keywords: [
    'souvenir nusa penida',
    'oleh oleh nusa penida',
    'kaos nusa penida',
    'gantungan kunci nusa penida',
  ],
  image: '/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.37.jpeg',
  imageAlt: 'Souvenir Nusa Penida',
});

export default SouvenirsPage;
