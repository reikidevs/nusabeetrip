import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo';
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  itemListJsonLd,
  serviceJsonLd,
} from '@/lib/seo';
import {
  absoluteUrl,
  localeFromPath,
  localizedPath,
  type SiteLocale,
} from '@/lib/site-config';
import { TOUR_PACKAGES } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'Best Day Trip from Bali — Nusa Penida Tours',
  description:
    'Plan a Nusa Penida day trip from Bali for Kelingking Beach, iconic cliffs, or manta snorkeling. Island tours start at 390K IDR with Nusa Penida pickup.',
  path: '/bali-day-trip',
  keywords: [
    'best day trip from bali',
    'best tour in bali',
    'best tour trip in bali',
    'bali day trip',
    'day trip from bali',
    'bali island tour',
    'nusa penida day trip from bali',
    'best nusa penida tour',
  ],
  image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
  imageAlt: 'Best day trip from Bali — Kelingking Beach Nusa Penida',
});

const FAQ: Record<SiteLocale, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: 'What is the best day trip from Bali?',
      answer:
        'Nusa Penida is one of the most popular day trips from Bali. A 30–45 minute fast boat from Sanur takes you to iconic spots such as Kelingking Beach, Broken Beach, and Diamond Beach, with manta ray snorkeling also available. NusaBeeTrip land tours start from IDR 390,000 with pickup on Nusa Penida included.',
    },
    {
      question: 'How long is the trip from Bali to Nusa Penida?',
      answer:
        'The fast boat from Sanur Beach to Nusa Penida usually takes about 30–45 minutes. Take an early departure to leave enough time for a full day on the island.',
    },
    {
      question: 'Can I see Nusa Penida in one day from Bali?',
      answer:
        'Yes. A guided full-day itinerary can cover the key viewpoints efficiently. The Mix Trip combines selected west- and east-coast stops in one eight-hour island tour.',
    },
    {
      question: 'Is a Nusa Penida day trip worth it?',
      answer:
        'It is a strong choice if you enjoy dramatic cliffs, beaches, and viewpoints. A guided tour handles the island roads and local routing so you can spend more time at the stops.',
    },
  ],
  id: [
    {
      question: 'Apa day trip terbaik dari Bali?',
      answer:
        'Nusa Penida adalah salah satu pilihan day trip paling populer dari Bali. Fast boat selama sekitar 30–45 menit dari Sanur membawa Anda menuju spot ikonik seperti Kelingking Beach, Broken Beach, dan Diamond Beach, dengan opsi snorkeling pari manta. Tur darat NusaBeeTrip mulai dari Rp390.000 dan sudah termasuk penjemputan di Nusa Penida.',
    },
    {
      question: 'Berapa lama perjalanan dari Bali ke Nusa Penida?',
      answer:
        'Fast boat dari Pantai Sanur ke Nusa Penida biasanya memerlukan waktu sekitar 30–45 menit. Pilih keberangkatan pagi agar waktu menjelajahi pulau lebih maksimal.',
    },
    {
      question: 'Bisakah Nusa Penida dikunjungi sehari dari Bali?',
      answer:
        'Bisa. Itinerary dengan pemandu dapat mengunjungi viewpoint utama secara efisien dalam sehari. Mix Trip menggabungkan beberapa spot pilihan di bagian barat dan timur dalam tur pulau selama delapan jam.',
    },
    {
      question: 'Apakah day trip ke Nusa Penida sepadan?',
      answer:
        'Nusa Penida cocok untuk wisatawan yang menyukai tebing dramatis, pantai, dan viewpoint. Tur berpemandu membantu menangani rute serta kondisi jalan pulau agar waktu di setiap spot lebih efektif.',
    },
  ],
};

const COPY = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbPage: 'Best Day Trip from Bali',
    serviceName: 'Nusa Penida Day Trip from Bali',
    serviceDescription:
      'Full-day guided island tour in Nusa Penida with pickup, local transport, and an efficient sightseeing itinerary. Fast-boat tickets from Bali are booked separately.',
    listName: 'Best Day Trips from Bali to Nusa Penida',
    listDescription: 'Guided full-day tour packages for a Bali to Nusa Penida day trip.',
    heroAria: 'Best day trip from Bali',
    heroTitle: 'The Best Day Trip from Bali',
    heroBeforePrice:
      'Nusa Penida brings towering cliffs, hidden beaches, and wild manta rays into one memorable day. Full-day guided island tours start from',
    heroAfterPrice: 'with pickup on Nusa Penida included.',
    viewTours: 'View Tour Packages',
    howToGetThere: 'How to Get There',
    ubudGuideLead: 'Staying in Ubud? Use our',
    ubudGuideLink: 'Ubud to Nusa Penida distance and day-trip guide',
    ubudGuideTail: 'for realistic road, ferry, and return times.',
    whyTitle: 'Why Nusa Penida Is a Great Day Trip from Bali',
    whyParagraphs: [
      'Few day trips from Bali deliver as much scenery in one day as Nusa Penida. A 30–45 minute fast boat from Sanur reaches an island of limestone cliffs, turquoise bays, and the famous Kelingking Beach viewpoint.',
      'With a realistic itinerary, you can choose west-coast icons, east-coast beaches, a combined route, or a dedicated snorkeling trip. Our guided tours coordinate pickup on Nusa Penida and the island route; fast-boat tickets from Bali are booked separately.',
    ],
    toursTitle: 'Choose Your Nusa Penida Day Trip',
    fromPrice: (price: number) => `From IDR ${price.toLocaleString('id-ID')}`,
    faqTitle: 'Bali to Nusa Penida Day Trip FAQ',
    ctaTitle: 'Ready for Your Nusa Penida Day Trip?',
    ctaBody:
      'Message us to confirm availability and plan your pickup, island route, and timing. We will also explain which fast boat to book from Bali.',
    ctaButton: 'Plan Your Tour',
    imageAlt: (name: string) => `${name} — day trip from Bali to Nusa Penida`,
  },
  id: {
    breadcrumbHome: 'Beranda',
    breadcrumbPage: 'Day Trip Nusa Penida dari Bali',
    serviceName: 'Day Trip Nusa Penida dari Bali',
    serviceDescription:
      'Tur pulau Nusa Penida sehari penuh dengan penjemputan, transportasi lokal, dan itinerary wisata yang efisien. Tiket fast boat dari Bali dipesan terpisah.',
    listName: 'Pilihan Day Trip Nusa Penida dari Bali',
    listDescription: 'Paket tur berpemandu sehari penuh untuk perjalanan dari Bali ke Nusa Penida.',
    heroAria: 'Day trip Nusa Penida dari Bali',
    heroTitle: 'Day Trip Nusa Penida Terbaik dari Bali',
    heroBeforePrice:
      'Nikmati tebing dramatis, pantai tersembunyi, dan pari manta dalam perjalanan satu hari yang berkesan. Tur pulau sehari penuh mulai dari',
    heroAfterPrice: 'dengan penjemputan di Nusa Penida.',
    viewTours: 'Lihat Paket Tur',
    howToGetThere: 'Panduan Cara ke Sana',
    ubudGuideLead: 'Menginap di Ubud? Baca',
    ubudGuideLink: 'panduan jarak dan trip sehari Ubud ke Nusa Penida',
    ubudGuideTail: 'untuk estimasi perjalanan darat, fast boat, dan waktu pulang.',
    whyTitle: 'Mengapa Nusa Penida Cocok untuk Day Trip dari Bali',
    whyParagraphs: [
      'Nusa Penida menawarkan banyak pemandangan dalam satu hari. Perjalanan fast boat sekitar 30–45 menit dari Sanur membawa Anda menuju pulau dengan tebing batu kapur, teluk biru toska, dan viewpoint Kelingking Beach yang terkenal.',
      'Dengan itinerary yang realistis, Anda dapat memilih ikon pesisir barat, pantai timur, rute gabungan, atau trip khusus snorkeling. Tur kami mengatur penjemputan di Nusa Penida dan rute di pulau; tiket fast boat dari Bali dipesan terpisah.',
    ],
    toursTitle: 'Pilih Day Trip Nusa Penida',
    fromPrice: (price: number) => `Mulai Rp${price.toLocaleString('id-ID')}`,
    faqTitle: 'FAQ Day Trip Bali ke Nusa Penida',
    ctaTitle: 'Siap Menjelajahi Nusa Penida?',
    ctaBody:
      'Hubungi kami untuk mengecek ketersediaan serta merencanakan penjemputan, rute pulau, dan waktu perjalanan. Kami juga akan menjelaskan fast boat yang perlu dipesan dari Bali.',
    ctaButton: 'Rencanakan Tur Anda',
    imageAlt: (name: string) => `${name} — day trip dari Bali ke Nusa Penida`,
  },
} as const;

const TOUR_DESCRIPTIONS_ID: Record<string, string> = {
  'west-trip':
    'Jelajahi Kelingking Beach, Angel Billabong, Broken Beach, dan Crystal Bay dalam rute pesisir barat.',
  'east-trip':
    'Kunjungi Diamond Beach, Atuh Beach, Rumah Pohon, dan viewpoint Thousand Islands di pesisir timur.',
  'west-trip-snorkeling':
    'Gabungkan spot utama pesisir barat dengan pengalaman snorkeling di perairan Nusa Penida.',
  'east-trip-snorkeling':
    'Padukan pantai dan viewpoint di bagian timur dengan sesi snorkeling berpemandu.',
  'mix-trip':
    'Kunjungi beberapa spot pilihan dari bagian barat dan timur Nusa Penida dalam satu hari.',
  'snorkeling-manta':
    'Jelajahi beberapa spot snorkeling dan cari kesempatan berenang bersama pari manta liar.',
};

export default function BaliDayTripPage() {
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const isIndonesian = locale === 'id';
  const copy = COPY[locale];
  const faq = FAQ[locale];
  const pagePath = localizedPath('/bali-day-trip', locale);
  const activeTours = TOUR_PACKAGES.filter((tour) => tour.isActive);
  const tourItems = activeTours.map((tour) => ({
    name: tour.name,
    url: absoluteUrl(localizedPath(`/tours/${tour.slug}`, locale)),
    image: tour.image,
  }));

  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-bali-day-trip"
        data={breadcrumbJsonLd([
          { name: copy.breadcrumbHome, path: localizedPath('/', locale) },
          { name: copy.breadcrumbPage, path: pagePath },
        ])}
      />
      <JsonLd id="ld-bali-day-trip-faq" data={faqJsonLd(faq)} />
      <JsonLd
        id="ld-bali-day-trip-service"
        data={serviceJsonLd({
          name: copy.serviceName,
          description: copy.serviceDescription,
          areaServed: 'Bali, Indonesia',
          price: 390000,
          currency: 'IDR',
          image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
          url: pagePath,
        })}
      />
      <JsonLd
        id="ld-bali-day-trip-itemlist"
        data={itemListJsonLd({
          name: copy.listName,
          description: copy.listDescription,
          items: tourItems,
        })}
      />

      <main className="min-h-screen">
        <section
          className="relative text-white overflow-hidden"
          aria-label={copy.heroAria}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
              alt={copy.imageAlt('Kelingking Beach')}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/80 via-brand-blue-800/70 to-brand-teal-900/80" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-36 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                {copy.heroTitle}
              </h1>
              <p className="hero-description text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {copy.heroBeforePrice}{' '}
                <span className="font-semibold">390K IDR</span>{' '}
                {copy.heroAfterPrice}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={localizedPath('/tours', locale)}
                  className="inline-flex items-center justify-center bg-white text-brand-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                >
                  {copy.viewTours}
                </Link>
                <Link
                  href={localizedPath('/guides/how-to-get-to-nusa-penida', locale)}
                  className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
                >
                  {copy.howToGetThere}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              {copy.whyTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              {copy.whyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {copy.ubudGuideLead}{' '}
                <Link
                  href={localizedPath('/guides/nusa-penida-day-trip-from-ubud', locale)}
                  className='font-semibold text-brand-blue-800 underline decoration-brand-teal-500 underline-offset-4 hover:text-brand-teal-700'
                >
                  {copy.ubudGuideLink}
                </Link>{' '}
                {copy.ubudGuideTail}
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              {copy.toursTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {activeTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={localizedPath(`/tours/${tour.slug}`, locale)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={tour.image}
                      alt={copy.imageAlt(tour.name)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {isIndonesian
                        ? TOUR_DESCRIPTIONS_ID[tour.slug] || `Paket tur ${tour.name} di Nusa Penida.`
                        : tour.description}
                    </p>
                    <p className="mt-3 text-brand-blue-700 font-semibold">
                      {copy.fromPrice(tour.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              {copy.faqTitle}
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details key={item.question} className="group rounded-xl border border-gray-200 p-5">
                  <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-brand-blue-600 group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 bg-brand-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-white/90 mb-7">{copy.ctaBody}</p>
            <Link
              href={localizedPath('/contact', locale)}
              className="inline-flex items-center justify-center bg-white text-brand-blue-900 font-semibold px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
