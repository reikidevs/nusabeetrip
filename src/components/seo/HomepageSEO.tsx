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
      question: 'Is NusaBeeTrip the same as Nusatrip or BeeTrip?',
      answer:
        'No. NusaBeeTrip is an independent, locally-owned tour and vehicle rental operator based on Nusa Penida island, Bali. We are not affiliated with Nusatrip.com, the flight and hotel OTA, or BeeTrip. Book directly with us at nusabeetrip.com or via WhatsApp at +62 896-3128-1234.',
    },
    {
      question: 'How much does a Nusa Penida tour cost?',
      answer:
        'Tour prices start from IDR 200,000 for Manta Ray Snorkeling, IDR 390,000 for West Trip, IDR 430,000 for East Trip, and IDR 500,000 for Mix Trip. All prices include transport, guide, and entrance fees.',
    },
    {
      question: 'How do I get to Nusa Penida from Bali?',
      answer:
        'Take a fast boat from Sanur Beach to Nusa Penida. The crossing usually takes 30-45 minutes. We can arrange pickup from the harbor after you arrive.',
    },
    {
      question: 'Is it safe to rent a motorcycle in Nusa Penida?',
      answer:
        'Our motorcycles are maintained regularly and include helmets. Roads can be steep, so we recommend scooters for confident riders. For easier travel, choose a car with driver.',
    },
    {
      question: 'Do you offer hotel pickup for tours?',
      answer:
        'Yes. Free pickup and drop-off is included with tour packages across Nusa Penida. Share your hotel name when booking via WhatsApp.',
    },
    {
      question: 'Can I combine West Trip and East Trip in one day?',
      answer:
        'Yes. Our Mix Trip combines key spots from West and East Nusa Penida in one full-day tour for IDR 500,000 per person.',
    },
  ],
  id: [
    {
      question: 'Apakah NusaBeeTrip sama dengan Nusatrip atau BeeTrip?',
      answer:
        'Tidak. NusaBeeTrip adalah operator tour dan rental kendaraan lokal di Pulau Nusa Penida, Bali. Kami tidak berafiliasi dengan Nusatrip.com, OTA tiket pesawat dan hotel, maupun BeeTrip. Booking langsung di nusabeetrip.com atau via WhatsApp +62 896-3128-1234.',
    },
    {
      question: 'Berapa harga paket tour Nusa Penida?',
      answer:
        'Harga tour mulai dari Rp 200.000 untuk Snorkeling Manta Ray, Rp 390.000 untuk West Trip, Rp 430.000 untuk East Trip, dan Rp 500.000 untuk Mix Trip. Harga termasuk transportasi, pemandu, dan tiket masuk.',
    },
    {
      question: 'Bagaimana cara ke Nusa Penida dari Bali?',
      answer:
        'Naik fast boat dari Pantai Sanur ke Nusa Penida. Perjalanan biasanya 30-45 menit. Kami bisa mengatur penjemputan dari pelabuhan setelah Anda tiba.',
    },
    {
      question: 'Apakah aman sewa motor di Nusa Penida?',
      answer:
        'Motor kami dirawat rutin dan sudah termasuk helm. Jalan di Nusa Penida bisa menanjak, jadi kami menyarankan motor untuk pengendara yang sudah percaya diri. Untuk lebih nyaman, pilih mobil dengan sopir.',
    },
    {
      question: 'Apakah tersedia pickup hotel untuk tour?',
      answer:
        'Ya. Penjemputan dan pengantaran gratis termasuk dalam paket tour di area Nusa Penida. Kirim nama hotel saat booking via WhatsApp.',
    },
    {
      question: 'Bisakah gabung West Trip dan East Trip dalam satu hari?',
      answer:
        'Bisa. Paket Mix Trip menggabungkan spot utama Barat dan Timur Nusa Penida dalam tour satu hari penuh dengan harga Rp 500.000 per orang.',
    },
  ],
};

type HomepageSEOProps = {
  language?: Language;
};

export default function HomepageSEO({ language = 'en' }: HomepageSEOProps) {
  const faq = HOMEPAGE_FAQ[language];
  const href = (path: string) => absoluteUrl(localizedPath(path, language));

  const tourItems = [
    { name: 'West Trip Nusa Penida', url: href('/tours/west-trip'), image: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg' },
    { name: 'East Trip Nusa Penida', url: href('/tours/east-trip'), image: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg' },
    { name: 'Mix Trip (West & East)', url: href('/tours/mix-trip'), image: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png' },
    { name: 'Snorkeling with Manta Rays', url: href('/tours/snorkeling-manta'), image: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg' },
    { name: 'Yamaha N-Max Rental', url: href('/rentals/nmax-motorcycle'), image: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp' },
    { name: 'Car with Driver', url: href('/rentals/car-rental'), image: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg' },
  ];

  return (
    <>
      <JsonLd id="ld-homepage" data={homepageJsonLd()} />
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
