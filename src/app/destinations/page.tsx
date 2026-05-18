import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd, BreadcrumbNav } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-config';
import { DESTINATIONS } from '@/lib/destinations';

export const metadata: Metadata = buildMetadata({
  title: 'Top Destinations in Nusa Penida — Beaches, Cliffs, Lagoons',
  description:
    'Complete guide to the best spots in Nusa Penida: Kelingking Beach, Diamond Beach, Atuh Beach, Broken Beach, Angel Billabong, and Crystal Bay. Tips, best time to visit, and tour packages.',
  path: '/destinations',
  keywords: [
    'nusa penida destinations',
    'kelingking beach guide',
    'diamond beach guide',
    'atuh beach guide',
    'broken beach nusa penida',
    'angel billabong nusa penida',
    'crystal bay nusa penida',
    'nusa penida travel guide',
  ],
  image: DESTINATIONS[0].heroImage,
  imageAlt: 'Top destinations in Nusa Penida',
});

export default function DestinationsIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        id="ld-breadcrumbs-destinations"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
        ])}
      />
      <JsonLd
        id="ld-destinations-list"
        data={itemListJsonLd({
          name: 'Top Destinations in Nusa Penida',
          description:
            'A curated guide to the most popular beaches, cliffs, and lagoons in Nusa Penida, Bali.',
          items: DESTINATIONS.map((d) => ({
            name: d.name,
            url: absoluteUrl(`/destinations/${d.slug}`),
            image: d.heroImage,
          })),
        })}
      />

      <BreadcrumbNav
        items={[{ label: 'Destinations', labelId: 'Destinasi', href: '/destinations' }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={DESTINATIONS[0].heroImage}
            alt="Nusa Penida destinations"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>
        <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/95 px-3 py-1 rounded-full text-xs font-semibold border border-white/20 mb-5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {DESTINATIONS.length} iconic spots, one island
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Top destinations in Nusa Penida
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              Practical guides to the beaches, cliffs, and lagoons that make
              Nusa Penida one of Bali&apos;s most photographed islands.
              Each guide includes the best time to visit, what to expect, and
              which of our tour packages cover it.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={d.heroImage}
                    alt={`${d.name} — Nusa Penida`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {d.region}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-brand-blue-800 transition-colors">
                    {d.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {d.description.en}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-700 group-hover:gap-2 transition-all">
                    Read full guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
