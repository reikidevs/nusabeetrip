import type { Metadata } from 'next';
import RentalDetailPage from '../../../rentals/[slug]/page';
import { RENTAL_SERVICES } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export function generateStaticParams() {
  return RENTAL_SERVICES.filter((r) => r.isAvailable).map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const rental = RENTAL_SERVICES.find((r) => r.slug === params.slug && r.isAvailable);
  if (!rental) {
    return buildMetadata({
      title: 'Rental tidak ditemukan',
      description: 'Kendaraan yang Anda cari tidak tersedia.',
      path: `/id/rentals/${params.slug}`,
      index: false,
    });
  }

  const priceDisplay = `${(rental.pricePerDay / 1000).toFixed(0)}K IDR`;
  const vehicleLabel = rental.vehicleType === 'car' ? 'Mobil dengan Sopir' : 'Sewa Motor';

  return buildMetadata({
    title: `${vehicleLabel} ${rental.model} di Nusa Penida`,
    description:
      `Sewa ${rental.model} di Nusa Penida mulai ${priceDisplay} per hari. Kendaraan terawat, antar gratis, dan support via WhatsApp.`.slice(
        0,
        160,
      ),
    path: `/id/rentals/${rental.slug}`,
    keywords: [
      `sewa ${rental.model.toLowerCase()} nusa penida`,
      `${rental.model.toLowerCase()} rental nusa penida`,
      'sewa motor nusa penida',
      'rental kendaraan nusa penida',
    ],
    image: rental.image,
    imageAlt: `${rental.model} rental Nusa Penida`,
  });
}

export default RentalDetailPage;
