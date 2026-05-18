import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd, BreadcrumbNav } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-config';
import { getAllGuides, GUIDE_CATEGORIES } from '@/lib/guides';

export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Travel Guides — Honest Tips from Locals',
  description:
    'Practical guides for planning your Nusa Penida trip: how to get there, the best time to visit, sample itineraries, packing list, and a fair comparison with Nusa Lembongan.',
  path: '/guides',
  keywords: [
    'nusa penida travel guide',
    'nusa penida tips',
    'nusa penida travel blog',
    'nusa penida itinerary',
    'nusa penida how to',
    'panduan wisata nusa penida',
  ],
  image: '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
  imageAlt: 'Travel guides for Nusa Penida',
});

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        id="ld-breadcrumbs-guides"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />
      <JsonLd
        id="ld-guides-list"
        data={itemListJsonLd({
          name: 'Nusa Penida Travel Guides',
          description:
            'Curated guides for planning a trip to Nusa Penida — getting there, when to visit, what to see, and what to pack.',
          items: guides.map((g) => ({
            name: g.title,
            url: absoluteUrl(`/guides/${g.slug}`),
            image: g.heroImage,
          })),
        })}
      />

      <BreadcrumbNav items={[{ label: 'Guides', labelId: 'Panduan', href: '/guides' }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg"
            alt="Nusa Penida travel guides"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>
        <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/95 px-3 py-1 rounded-full text-xs font-semibold border border-white/20 mb-5 uppercase tracking-wide">
              Travel guides
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Honest guides to Nusa Penida
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              Written by people who live and work on the island. No fluff, no
              filler — just the answers you actually need to plan a good trip.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {guides.map((g, i) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <article className="grid md:grid-cols-[280px_1fr] gap-0">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <Image
                      src={g.heroImage}
                      alt={g.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 280px"
                      priority={i < 2}
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-wide font-semibold">
                      <span className="text-brand-blue-700">
                        {GUIDE_CATEGORIES[g.category]}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-500">
                        {g.readingMinutes} min read
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue-800 transition-colors leading-tight">
                      {g.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {g.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-700 group-hover:gap-2 transition-all">
                      Read the guide
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
