import type { Metadata } from 'next';
import DestinationDetailPage from '../../../destinations/[slug]/page';
import { DESTINATIONS, getDestinationBySlug } from '@/lib/destinations';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) {
    return buildMetadata({
      title: 'Destinasi tidak ditemukan',
      description: 'Lihat destinasi Nusa Penida lainnya.',
      path: `/id/destinations/${params.slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: `${dest.nameId || dest.name} - Panduan Wisata Nusa Penida`,
    description: dest.description.id,
    path: `/id/destinations/${dest.slug}`,
    keywords: [
      `${dest.name.toLowerCase()} nusa penida`,
      `${dest.name.toLowerCase()} wisata`,
      `wisata nusa penida ${dest.region}`,
      'destinasi nusa penida',
    ],
    image: dest.heroImage,
    imageAlt: `${dest.nameId || dest.name} di Nusa Penida, Bali`,
  });
}

export default DestinationDetailPage;
