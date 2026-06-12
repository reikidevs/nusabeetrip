import React from 'react';
import JsonLd from './JsonLd';
import {
  homepageJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-config';

/**
 * Homepage-specific SEO schemas.
 * Renders multiple JSON-LD blocks for maximum SERP rich snippet coverage:
 * - WebPage schema (speakable, breadcrumb)
 * - FAQ schema (rich results)
 * - ItemList schema (carousel potential)
 *
 * The authoritative AggregateRating + Review nodes live on the site-wide
 * LocalBusiness schema (see layout.tsx), which is fed real DB data — so we
 * intentionally do NOT emit a second rating entity here to avoid conflicts.
 */

const HOMEPAGE_FAQ = [
  {
    question: 'How much does a Nusa Penida tour cost?',
    answer:
      'Tour prices start from IDR 200,000 (approx. $13 USD) for Manta Ray Snorkeling, IDR 390,000 for West Trip, IDR 430,000 for East Trip, and IDR 500,000 for Mix Trip. All prices include transport, guide, and entrance fees.',
  },
  {
    question: 'Berapa harga paket tur Nusa Penida?',
    answer:
      'Harga tur mulai dari Rp 200.000 untuk Snorkeling Manta Ray, Rp 390.000 untuk West Trip, Rp 430.000 untuk East Trip, dan Rp 500.000 untuk Mix Trip. Semua harga sudah termasuk transportasi, pemandu, dan tiket masuk.',
  },
  {
    question: 'How do I get to Nusa Penida from Bali?',
    answer:
      'Take a fast boat from Sanur Beach to Nusa Penida (30-45 minutes). We can arrange pickup from the harbor. Boats depart daily from 7:00 AM to 4:00 PM.',
  },
  {
    question: 'Is it safe to rent a motorcycle in Nusa Penida?',
    answer:
      'Yes, our motorcycles are well-maintained with regular servicing. We provide helmets and insurance. Roads can be steep, so we recommend experienced riders. For beginners, we suggest the Honda Scoopy or hiring a car with driver.',
  },
  {
    question: 'What is the best time to visit Nusa Penida?',
    answer:
      'Nusa Penida is great year-round. The dry season (April-October) offers the best weather for tours and snorkeling. Manta Rays are visible all year, with peak sightings from April to November.',
  },
  {
    question: 'Do you offer hotel pickup for tours?',
    answer:
      'Yes! Free hotel pickup and drop-off is included with all tour packages anywhere in Nusa Penida. Just share your hotel name when booking via WhatsApp.',
  },
  {
    question: 'Can I combine West Trip and East Trip in one day?',
    answer:
      'Yes! Our Mix Trip package combines the best spots from both West and East Nusa Penida in a single full-day tour (8 hours) for IDR 500,000 per person.',
  },
  {
    question: 'Apakah bisa booking tur di hari yang sama?',
    answer:
      'Ya, kami menerima booking di hari yang sama tergantung ketersediaan. Hubungi kami via WhatsApp di +62 896-3128-1234 untuk konfirmasi cepat. Kami merespon dalam hitungan menit.',
  },
  {
    question: 'Is NusaBeeTrip the same as Nusatrip or BeeTrip?',
    answer:
      'No. NusaBeeTrip is an independent, locally-owned tour and vehicle rental operator based on Nusa Penida island, Bali. We are not affiliated with Nusatrip.com (the flight/hotel OTA) or BeeTrip. Book directly with us at nusabeetrip.com or via WhatsApp at +62 896-3128-1234.',
  },
  {
    question: 'Apakah NusaBeeTrip sama dengan Nusatrip atau BeeTrip?',
    answer:
      'Tidak. NusaBeeTrip adalah operator tur dan rental kendaraan lokal yang berbasis di Pulau Nusa Penida, Bali. Kami tidak berafiliasi dengan Nusatrip.com (OTA tiket pesawat/hotel) maupun BeeTrip. Pesan langsung dengan kami di nusabeetrip.com atau via WhatsApp di +62 896-3128-1234.',
  },
];

export default function HomepageSEO() {
  const tourItems = [
    { name: 'West Trip Nusa Penida', url: absoluteUrl('/tours/west-trip'), image: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg' },
    { name: 'East Trip Nusa Penida', url: absoluteUrl('/tours/east-trip'), image: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg' },
    { name: 'Mix Trip (West & East)', url: absoluteUrl('/tours/mix-trip'), image: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png' },
    { name: 'Snorkeling with Manta Rays', url: absoluteUrl('/tours/snorkeling-manta'), image: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg' },
    { name: 'Yamaha N-Max Rental', url: absoluteUrl('/rentals/nmax-motorcycle'), image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp' },
    { name: 'Car with Driver', url: absoluteUrl('/rentals/car-rental'), image: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg' },
  ];

  return (
    <>
      <JsonLd id="ld-homepage" data={homepageJsonLd()} />
      <JsonLd id="ld-homepage-faq" data={faqJsonLd(HOMEPAGE_FAQ)} />
      <JsonLd
        id="ld-homepage-itemlist"
        data={itemListJsonLd({
          name: 'NusaBeeTrip Services — Tours & Rentals in Nusa Penida',
          description: 'Complete list of tour packages and vehicle rentals available in Nusa Penida, Bali',
          items: tourItems,
        })}
      />
    </>
  );
}
