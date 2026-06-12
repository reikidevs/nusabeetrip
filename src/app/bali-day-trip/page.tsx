import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLd } from '@/components/seo';
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  itemListJsonLd,
} from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'Best Day Trip from Bali — Nusa Penida Tours',
  description:
    'Looking for the best day trip from Bali? Nusa Penida is the #1 choice — Kelingking Beach, manta ray snorkeling & iconic cliffs. Full-day tours from 390K IDR, hotel pickup included.',
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

const FAQ = [
  {
    question: 'What is the best day trip from Bali?',
    answer:
      'Nusa Penida is widely considered the best day trip from Bali. A 30-minute fast boat from Sanur takes you to iconic spots like Kelingking Beach, Broken Beach, and Diamond Beach, plus year-round manta ray snorkeling. A full-day guided tour with NusaBeeTrip starts from IDR 390,000 with hotel pickup included.',
  },
  {
    question: 'How long is the trip from Bali to Nusa Penida?',
    answer:
      'The fast boat from Sanur Beach to Nusa Penida takes about 30–45 minutes. Boats run daily from 07:00 to 16:00. We recommend the early boat so you get a full day on the island.',
  },
  {
    question: 'Can I see Nusa Penida in one day from Bali?',
    answer:
      'Yes. Our Mix Trip combines the best of the west and east coasts in a single 8-hour day. If you only have one day, this is the most efficient way to see the famous viewpoints.',
  },
  {
    question: 'Is a Nusa Penida day trip worth it?',
    answer:
      'Absolutely. The cliffs and beaches are among the most striking in Indonesia. A guided tour handles the rough island roads and boat logistics so you can focus on the scenery.',
  },
];

export default function BaliDayTripPage() {
  const activeTours = TOUR_PACKAGES.filter((t) => t.isActive);

  const tourItems = activeTours.map((t) => ({
    name: t.name,
    url: absoluteUrl(`/tours/${t.slug}`),
    image: t.image,
  }));

  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-bali-day-trip"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Best Day Trip from Bali', path: '/bali-day-trip' },
        ])}
      />
      <JsonLd id="ld-bali-day-trip-faq" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="ld-bali-day-trip-service"
        data={serviceJsonLd({
          name: 'Nusa Penida Day Trip from Bali',
          description:
            'Full-day guided tour to Nusa Penida from Bali — iconic viewpoints, beaches, and manta ray snorkeling. Hotel pickup and boat coordination included.',
          areaServed: 'Bali, Indonesia',
          price: 390000,
          currency: 'IDR',
          image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
          url: '/bali-day-trip',
        })}
      />
      <JsonLd
        id="ld-bali-day-trip-itemlist"
        data={itemListJsonLd({
          name: 'Best Day Trips from Bali to Nusa Penida',
          description:
            'Guided full-day tour packages from Bali to Nusa Penida',
          items: tourItems,
        })}
      />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative text-white overflow-hidden" aria-label="Best day trip from Bali">
          <div className="absolute inset-0">
            <Image
              src="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
              alt="Best day trip from Bali — Kelingking Beach, Nusa Penida"
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
                The Best Day Trip from Bali
              </h1>
              <p className="hero-description text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Nusa Penida is the #1 day trip from Bali — towering cliffs,
                hidden beaches, and wild manta rays, all in one unforgettable
                day. Full-day guided tours from{' '}
                <span className="font-semibold">390K IDR</span> with hotel
                pickup included.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center bg-white text-brand-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                >
                  View Tour Packages
                </Link>
                <Link
                  href="/guides/how-to-get-to-nusa-penida"
                  className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
                >
                  How to Get There
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Nusa Penida */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Nusa Penida Is the Best Tour from Bali
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Of all the day trips you can take from Bali, none delivers as
                much drama in a single day as Nusa Penida. A short 30-minute
                fast boat from Sanur drops you onto an island of limestone
                cliffs, turquoise bays, and the most photographed beach in
                Indonesia — <strong>Kelingking Beach</strong>.
              </p>
              <p>
                In one full day you can stand above the famous T-Rex cliff, walk
                the natural arch at Broken Beach, descend to Diamond Beach, and
                snorkel beside wild manta rays. Our guided tours handle the boat
                timing, the rough island roads, and hotel pickup, so your day is
                pure sightseeing.
              </p>
            </div>
          </div>
        </section>

        {/* Tour cards */}
        <section className="py-14 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              Choose Your Bali Day Trip
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {activeTours.map((t) => (
                <Link
                  key={t.id}
                  href={`/tours/${t.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={t.image}
                      alt={`${t.name} — day trip from Bali to Nusa Penida`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {t.description}
                    </p>
                    <p className="mt-3 text-brand-blue-700 font-semibold">
                      From IDR {t.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Bali Day Trip FAQ
            </h2>
            <div className="space-y-4">
              {FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-gray-200 p-5"
                >
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

        {/* CTA */}
        <section className="py-14 sm:py-16 bg-brand-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready for the Best Day Trip from Bali?
            </h2>
            <p className="text-white/90 mb-7">
              Message us on WhatsApp and we&apos;ll confirm availability in
              minutes — hotel pickup, boat coordination, and a local guide all
              sorted.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-brand-blue-900 font-semibold px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Book Your Tour
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
