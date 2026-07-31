import JsonLd from './JsonLd';
import {
  homepageJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from '@/lib/seo';
import { absoluteUrl, localizedPath } from '@/lib/site-config';
import type { Language } from '@/lib/translations';

/**
 * Homepage-specific SEO schemas.
 *
 * FAQ structured data is intentionally language-specific and mirrors visible
 * homepage content. That keeps the schema aligned with what users can read.
 */

export type HomepageFaqItem = {
  question: string;
  answer: string;
};

export const HOMEPAGE_FAQ: Record<Language, HomepageFaqItem[]> = {
  en: [
    {
      question: 'Is NusaBeeTrip the same company as Nusatrip?',
      answer:
        'No. NusaBeeTrip is an independent, locally owned Nusa Penida tour, private driver, transfer, snorkeling, and rental operator. It is not affiliated with the flight and hotel booking company Nusatrip.',
    },
    {
      question: 'Can I book a driver or trip for today or tomorrow?',
      answer:
        'Sometimes, depending on the date, driver, vehicle, and route. Send your pickup point, group size, and available time through the trip planner so Sidiq can confirm availability on WhatsApp.',
    },
    {
      question: 'Can you pick me up from my hotel or the harbour?',
      answer:
        'Hotel and harbour pickup can be arranged. The practical route and quote depend on the exact location, so include your hotel name or arrival harbour in the trip brief.',
    },
    {
      question: 'Can snorkeling and a land tour fit in one day?',
      answer:
        'It may be possible when the sea schedule, weather, pickup point, and return time allow it. Sidiq will suggest a focused land route after checking your details. Manta Ray and other wildlife sightings are never guaranteed.',
    },
    {
      question: 'Can you return me before my fast boat departs?',
      answer:
        'Share the departure harbour and boat time before the route is planned. Stops can then be prioritized around that deadline, subject to traffic, weather, and final confirmation on WhatsApp.',
    },
    {
      question: 'Is the price per person or per car?',
      answer:
        'It depends on the service and group details. Your final WhatsApp quote will clearly state whether the price is per car or per person and list what is included and excluded.',
    },
    {
      question: 'What does West + East highlights mean?',
      answer:
        'It means selected highlights from both sides of Nusa Penida in one day, not every attraction. The selection depends on your pickup point and available time. Ask for two days if you prefer a less rushed visit.',
    },
  ],
  id: [
    {
      question: 'Apakah NusaBeeTrip sama dengan Nusatrip?',
      answer:
        'Tidak. NusaBeeTrip adalah operator lokal independen di Nusa Penida untuk tur, private driver, transfer, snorkeling, dan rental kendaraan. NusaBeeTrip tidak terafiliasi dengan perusahaan pemesanan tiket dan hotel Nusatrip.',
    },
    {
      question: 'Bisakah booking driver atau trip untuk hari ini atau besok?',
      answer:
        'Terkadang bisa, tergantung tanggal, driver, kendaraan, dan rute. Kirim titik jemput, jumlah orang, dan waktu yang tersedia lewat perencana trip agar Sidiq dapat mengonfirmasi ketersediaannya di WhatsApp.',
    },
    {
      question: 'Bisakah dijemput dari hotel atau pelabuhan?',
      answer:
        'Penjemputan dari hotel atau pelabuhan dapat diatur. Rute dan harga bergantung pada lokasi pastinya, jadi sertakan nama hotel atau pelabuhan kedatangan dalam ringkasan trip.',
    },
    {
      question: 'Bisakah snorkeling dan tur darat dilakukan dalam satu hari?',
      answer:
        'Mungkin bisa jika jadwal laut, cuaca, titik jemput, dan waktu pulang memungkinkan. Sidiq akan menyarankan rute darat yang terarah setelah mengecek detailmu. Kemunculan Manta Ray atau satwa liar lain tidak dapat dijamin.',
    },
    {
      question: 'Bisakah saya diantar kembali sebelum fast boat berangkat?',
      answer:
        'Kirim pelabuhan keberangkatan dan jam fast boat sebelum rute disusun. Spot kemudian dapat diprioritaskan mengikuti batas waktu tersebut, dengan mempertimbangkan lalu lintas, cuaca, dan konfirmasi akhir di WhatsApp.',
    },
    {
      question: 'Apakah harganya per orang atau per mobil?',
      answer:
        'Tergantung jenis layanan dan detail grup. Penawaran akhir di WhatsApp akan menyebutkan dengan jelas apakah harga per mobil atau per orang serta apa saja yang termasuk dan tidak termasuk.',
    },
    {
      question: 'Apa arti highlight Barat + Timur?',
      answer:
        'Artinya beberapa spot pilihan dari kedua sisi Nusa Penida dalam satu hari, bukan semua tempat wisata. Pilihannya bergantung pada titik jemput dan waktu yang tersedia. Tanyakan rencana dua hari jika ingin lebih santai.',
    },
  ],
};

type HomepageSEOProps = {
  language?: Language;
};

export default function HomepageSEO({ language = 'en' }: HomepageSEOProps) {
  const faq = HOMEPAGE_FAQ[language];
  const href = (path: string) => absoluteUrl(localizedPath(path, language));
  const isIndonesian = language === 'id';

  const tourItems = [
    { name: 'West Trip Nusa Penida', url: href('/tours/west-trip'), image: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg' },
    { name: 'East Trip Nusa Penida', url: href('/tours/east-trip'), image: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg' },
    { name: 'Mix Trip (West & East)', url: href('/tours/mix-trip'), image: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png' },
    { name: isIndonesian ? 'Snorkeling Pari Manta' : 'Snorkeling with Manta Rays', url: href('/tours/snorkeling-manta'), image: '/images/snorkeling-manta-rays/snorkeling-manta-rays-nusa-penida-1.jpeg' },
    { name: isIndonesian ? 'Sewa Yamaha N-Max' : 'Yamaha N-Max Rental', url: href('/rentals/nmax-motorcycle'), image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp' },
    { name: isIndonesian ? 'Mobil dengan Sopir' : 'Car with Driver', url: href('/rentals/car-rental'), image: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg' },
  ];

  return (
    <>
      <JsonLd id="ld-homepage" data={homepageJsonLd(language)} />
      <JsonLd id="ld-homepage-faq" data={faqJsonLd(faq)} />
      <JsonLd
        id="ld-homepage-itemlist"
        data={itemListJsonLd({
          name:
            language === 'id'
              ? 'Layanan NusaBeeTrip - Tour & Rental di Nusa Penida'
              : 'NusaBeeTrip Services - Tours & Rentals in Nusa Penida',
          description:
            language === 'id'
              ? 'Daftar paket tour dan rental kendaraan NusaBeeTrip di Nusa Penida, Bali'
              : 'Complete list of NusaBeeTrip tour packages and vehicle rentals in Nusa Penida, Bali',
          items: tourItems,
        })}
      />
    </>
  );
}
