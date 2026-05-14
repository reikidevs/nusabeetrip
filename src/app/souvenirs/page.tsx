import { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import SouvenirsPageContent from './SouvenirsPageContent';

export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Souvenirs — Authentic Local Gifts & Apparel',
  description:
    'Take home a piece of Nusa Penida — t-shirts, caps, keychains, tote bags, postcards, and handmade bracelets from local artisans. Order via WhatsApp.',
  path: '/souvenirs',
  keywords: [
    'nusa penida souvenir',
    'oleh-oleh nusa penida',
    'nusa penida t-shirt',
    'kelingking beach souvenir',
    'bali handmade gifts',
  ],
  image: '/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.41.jpeg',
  imageAlt: 'Authentic Nusa Penida Souvenirs',
});

export default function SouvenirsPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-souvenirs"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Souvenirs', path: '/souvenirs' },
        ])}
      />
      <SouvenirsPageContent />
    </>
  );
}
