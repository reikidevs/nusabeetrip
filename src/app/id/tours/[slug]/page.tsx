import type { Metadata } from 'next';
import TourDetailPage from '../../../tours/[slug]/page';
import { TOUR_PACKAGES } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export function generateStaticParams() {
  return TOUR_PACKAGES.filter((p) => p.isActive).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tour = TOUR_PACKAGES.find((p) => p.slug === params.slug && p.isActive);
  if (!tour) {
    return buildMetadata({
      title: 'Paket tour tidak ditemukan',
      description: 'Paket tour yang Anda cari tidak tersedia.',
      path: `/id/tours/${params.slug}`,
      index: false,
    });
  }

  const priceDisplay = `${(tour.price / 1000).toFixed(0)}K IDR`;

  return buildMetadata({
    title: `${tour.name} - Tour Nusa Penida ${tour.duration} Jam`,
    description:
      `${tour.name} di Nusa Penida mulai ${priceDisplay} per orang. Termasuk pemandu lokal, transport, dan booking cepat via WhatsApp.`.slice(
        0,
        160,
      ),
    path: `/id/tours/${tour.slug}`,
    keywords: [
      `${tour.name.toLowerCase()} nusa penida`,
      `${tour.slug.replace(/-/g, ' ')} tour nusa penida`,
      'paket tour nusa penida',
      'wisata nusa penida',
    ],
    image: tour.image,
    imageAlt: `${tour.name} Nusa Penida`,
  });
}

export default TourDetailPage;
