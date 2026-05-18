/**
 * Testimoni / Review data — easy to edit, no database needed.
 *
 * Cara menambah testimoni baru:
 * 1. Tambahkan object baru di array TESTIMONIALS
 * 2. Save → refresh website
 * 3. Otomatis tampil di section reviews + masuk JSON-LD untuk SEO
 *
 * Field guide:
 * - id: unique identifier (e.g. 'review-001')
 * - name: nama tamu (boleh inisial, e.g. "Sarah M.")
 * - country: untuk flag/origin signal (e.g. "Australia", "Indonesia")
 * - rating: 1-5 (gunakan integer)
 * - tour: nama paket yg diambil (cocokkan dengan TOUR_PACKAGES.name)
 * - date: ISO date string (YYYY-MM-DD)
 * - title: ringkasan singkat (optional)
 * - body: isi review (60-300 karakter ideal untuk SEO)
 * - language: 'en' | 'id' — untuk filter UI
 * - verified: true kalau dari tamu real (akan tampil badge ✓)
 * - photo: URL foto tamu (optional)
 * - source: 'whatsapp' | 'google' | 'instagram' | 'website' | 'tripadvisor'
 */

export type Testimonial = {
  id: string;
  name: string;
  country?: string;
  countryCode?: string; // ISO 3166-1 alpha-2 (e.g. 'AU', 'ID')
  rating: 1 | 2 | 3 | 4 | 5;
  tour: string;
  date: string;
  title?: string;
  body: string;
  language: 'en' | 'id';
  verified?: boolean;
  photo?: string;
  source?: 'whatsapp' | 'google' | 'instagram' | 'website' | 'tripadvisor' | 'direct';
};

/**
 * Sample testimonials — REPLACE with real reviews from your guests.
 * To start, ask 3-5 happy customers to write a short review on WhatsApp,
 * then paste their words here (with permission).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-001',
    name: 'Sarah M.',
    country: 'Australia',
    countryCode: 'AU',
    rating: 5,
    tour: 'West Trip',
    date: '2026-04-15',
    title: 'Best day in Bali!',
    body: 'Our guide was incredible! Kelingking Beach blew our minds. The whole West Trip was smooth, well-organized, and the price was super fair. Highly recommend NusaBeeTrip!',
    language: 'en',
    verified: true,
    source: 'whatsapp',
  },
  {
    id: 'review-002',
    name: 'James K.',
    country: 'United Kingdom',
    countryCode: 'GB',
    rating: 5,
    tour: "Snorkeling with Manta Ray's",
    date: '2026-03-28',
    title: 'Saw 5 manta rays!',
    body: 'Absolutely magical experience. We saw 5 manta rays up close, the water was crystal clear, and our guide knew exactly where to go. Equipment was clean and well-maintained.',
    language: 'en',
    verified: true,
    source: 'whatsapp',
  },
  {
    id: 'review-003',
    name: 'Rina W.',
    country: 'Indonesia',
    countryCode: 'ID',
    rating: 5,
    tour: 'Mix Trip (West & East)',
    date: '2026-04-08',
    title: 'Pelayanan ramah, harga jujur',
    body: 'Pengalaman luar biasa! Pemandu lokal yang sangat ramah dan tahu spot-spot terbaik. Mobil bersih, harga transparan, tidak ada biaya tersembunyi. Pasti booking lagi kalau ke Bali!',
    language: 'id',
    verified: true,
    source: 'whatsapp',
  },
  {
    id: 'review-004',
    name: 'Mark T.',
    country: 'Germany',
    countryCode: 'DE',
    rating: 5,
    tour: 'East Trip',
    date: '2026-02-20',
    title: 'Hidden gems revealed',
    body: 'Diamond Beach and Atuh Beach were unreal. Our driver was patient with photos and shared great local stories. Pickup was on time, lunch recommendation was spot on.',
    language: 'en',
    verified: true,
    source: 'whatsapp',
  },
  {
    id: 'review-005',
    name: 'Budi S.',
    country: 'Indonesia',
    countryCode: 'ID',
    rating: 5,
    tour: 'Sewa Motor Yamaha N-Max',
    date: '2026-03-12',
    title: 'Motor terawat, mudah pesan',
    body: 'Sewa N-Max 2 hari, motornya bersih dan terawat. Helm lengkap, full tank, antar jemput gratis ke pelabuhan. Komunikasi via WA cepat banget. Recommended!',
    language: 'id',
    verified: true,
    source: 'whatsapp',
  },
  {
    id: 'review-006',
    name: 'Emma & Tom',
    country: 'Netherlands',
    countryCode: 'NL',
    rating: 5,
    tour: 'West Trip + Snorkeling',
    date: '2026-04-02',
    title: 'Perfect combo day',
    body: 'Doing both the West Trip and snorkeling in one day was the best decision. Saw all the iconic spots and then snorkeled with manta rays. Long but unforgettable day!',
    language: 'en',
    verified: true,
    source: 'whatsapp',
  },
];

/** Compute aggregate rating for SEO schema */
export function getAggregateRating() {
  if (TESTIMONIALS.length === 0) {
    return { ratingValue: 5, reviewCount: 0 };
  }
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  const avg = sum / TESTIMONIALS.length;
  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: TESTIMONIALS.length,
  };
}

/** Pre-built WhatsApp link to leave a review */
export function getReviewWhatsAppLink(language: 'en' | 'id' = 'en'): string {
  const phone = '6289631281234';
  const message =
    language === 'id'
      ? 'Halo NusaBeeTrip! Saya ingin memberikan ulasan tentang pengalaman saya:%0A%0ANama: %0AAsal: %0APaket yang diambil: %0ARating (1-5): %0AUlasan: '
      : 'Hi NusaBeeTrip! I would like to leave a review about my experience:%0A%0AName: %0ACountry: %0ATour package: %0ARating (1-5): %0AReview: ';
  return `https://wa.me/${phone}?text=${message}`;
}

/** Country flag emoji from ISO code (no external lib needed) */
export function countryFlag(code?: string): string {
  if (!code || code.length !== 2) return '🌍';
  const A = 0x1f1e6;
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((c) => A + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}
