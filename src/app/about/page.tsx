import { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = buildMetadata({
  title: 'About NusaBeeTrip — Local Nusa Penida Tour Operator',
  description:
    'Locally-owned, born and raised in Nusa Penida. We run honest tours, snorkeling, and vehicle rentals across the island. Meet the team behind NusaBeeTrip.',
  path: '/about',
  keywords: [
    'about nusa penida tour',
    'local nusa penida guide',
    'nusabeetrip team',
    'nusa penida travel agency',
  ],
  image: '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg',
  imageAlt: 'Thousand Islands Viewpoint Nusa Penida',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-about"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutPageContent />
    </>
  );
}
