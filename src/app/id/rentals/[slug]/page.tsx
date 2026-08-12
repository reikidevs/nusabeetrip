import type { Metadata } from 'next';
import RentalDetailPage from '../../../rentals/[slug]/page';
import { RENTAL_SERVICES } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { formatRentalList, getRentalIncludedBenefits } from '@/lib/rentals';

export const revalidate = 3600;
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
  const isCar = rental.vehicleType === 'car';
  const vehicleName = isCar ? 'mobil dengan sopir' : rental.model;
  const includedBenefits = getRentalIncludedBenefits(rental, 'id');
  const inclusionCopy = includedBenefits.length
    ? ` Termasuk ${formatRentalList(includedBenefits, 'id')}.`
    : '';

  return buildMetadata({
    title: isCar
      ? 'Private Driver Nusa Penida — Mobil dengan Sopir Lokal'
      : `Sewa Motor ${rental.model} di Nusa Penida`,
    description: `Sewa ${vehicleName} di Nusa Penida mulai ${priceDisplay}${isCar ? '' : ' per hari'}.${inclusionCopy} Pesan via WhatsApp.`.slice(0, 160),
    path: `/id/rentals/${rental.slug}`,
    keywords: [
      `sewa ${rental.model.toLowerCase()} nusa penida`,
      `${rental.model.toLowerCase()} rental nusa penida`,
      'sewa motor nusa penida',
      'rental kendaraan nusa penida',
      ...(isCar
        ? [
            'private driver nusa penida',
            'sopir pribadi nusa penida',
            'sewa mobil dengan sopir nusa penida',
            'jemput pelabuhan nusa penida',
          ]
        : []),
    ],
    image: rental.image,
    imageAlt: `${rental.model} rental Nusa Penida`,
  });
}

export default RentalDetailPage;
