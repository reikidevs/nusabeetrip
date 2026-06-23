'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { formatPriceByLang } from '@/lib/currency';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { BreadcrumbNav } from '@/components/seo';
import type { Destination } from '@/lib/destinations';
import { getDestinationRelatedGuideLinks } from '@/lib/guides';
import type { TourPackage } from '@/types';

interface Props {
  destination: Destination;
  relatedTours: TourPackage[];
  relatedDestinations: Destination[];
}

export default function DestinationContent({
  destination: d,
  relatedTours,
  relatedDestinations,
}: Props) {
  const { language } = useLanguage();

  const labels = {
    en: {
      regionLabel: `${d.region.charAt(0).toUpperCase() + d.region.slice(1)} Nusa Penida`,
      highlights: 'Highlights',
      tips: 'Tips for visitors',
      bestTime: 'Best time to visit',
      accessibility: 'Accessibility',
      gallery: 'Gallery',
      relatedTours: 'Visit on these tours',
      relatedDestinations: 'Other spots nearby',
      mapHeading: 'Find it on the map',
      backToDestinations: 'All destinations',
      perPerson: 'per person',
      hours: 'hours',
      details: 'See details',
      bookOnWa: 'Book a tour on WhatsApp',
      viewOnMaps: 'Open in Google Maps',
    },
    id: {
      regionLabel:
        d.region === 'west'
          ? 'Nusa Penida Barat'
          : d.region === 'east'
          ? 'Nusa Penida Timur'
          : d.region === 'south'
          ? 'Nusa Penida Selatan'
          : 'Nusa Penida Tengah',
      highlights: 'Sorotan',
      tips: 'Tips berkunjung',
      bestTime: 'Waktu terbaik berkunjung',
      accessibility: 'Aksesibilitas',
      gallery: 'Galeri',
      relatedTours: 'Kunjungi dengan tur ini',
      relatedDestinations: 'Spot lain di sekitar',
      mapHeading: 'Temukan di peta',
      backToDestinations: 'Semua destinasi',
      perPerson: 'per orang',
      hours: 'jam',
      details: 'Lihat detail',
      bookOnWa: 'Pesan tur via WhatsApp',
      viewOnMaps: 'Buka di Google Maps',
    },
  };
  const L = labels[language];

  const description = language === 'id' ? d.description.id : d.description.en;
  const body = language === 'id' ? d.body.id : d.body.en;
  const highlights = language === 'id' ? d.highlights.id : d.highlights.en;
  const tips = language === 'id' ? d.tips.id : d.tips.en;
  const bestTime = language === 'id' ? d.bestTime.id : d.bestTime.en;
  const accessibility =
    language === 'id' ? d.accessibility.id : d.accessibility.en;

  const mapsUrl = d.geo
    ? `https://www.google.com/maps/search/?api=1&query=${d.geo.lat},${d.geo.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name} Nusa Penida`)}`;

  const guideLinks = getDestinationRelatedGuideLinks(d.relatedGuideSlugs);

  return (
    <main className="min-h-screen bg-gray-50">
      <BreadcrumbNav
        items={[
          { label: 'Destinations', labelId: 'Destinasi', href: '/destinations' },
          { label: d.name, href: `/destinations/${d.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={d.heroImage}
            alt={`${d.name} — Nusa Penida`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>
        <div className="container mx-auto px-4 py-12 sm:py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/95 px-3 py-1 rounded-full text-xs font-semibold border border-white/20 mb-5 uppercase tracking-wide">
              {L.regionLabel}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              {d.name}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-10">
              {/* Long-form description */}
              <article className="prose prose-gray max-w-none">
                {body.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4"
                  >
                    {para}
                  </p>
                ))}
              </article>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5">
                  {L.highlights}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-amber-50/50 rounded-2xl p-6 sm:p-8 border border-amber-200/40">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {L.tips}
                </h2>
                <ul className="space-y-3">
                  {tips.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-4">
                  {L.mapHeading}
                </h2>
                <p className="text-gray-600 mb-4">
                  {language === 'id'
                    ? `${d.name} berlokasi di Nusa Penida, Bali. Kami menjemput Anda dari hotel sebagai bagian dari paket tur kami.`
                    : `${d.name} is located in Nusa Penida, Bali. We pick you up from your hotel as part of our tour packages.`}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  {L.viewOnMaps}
                </a>
              </div>

              {/* Gallery */}
              {d.images.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5">
                    {L.gallery}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {d.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100"
                      >
                        <Image
                          src={img}
                          alt={`${d.name} photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Quick facts */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                <h3 className="font-bold text-gray-900 mb-4">
                  {language === 'id' ? 'Info cepat' : 'Quick facts'}
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-0.5">
                      {L.bestTime}
                    </dt>
                    <dd className="text-gray-800">{bestTime}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-0.5">
                      {L.accessibility}
                    </dt>
                    <dd className="text-gray-800">{accessibility}</dd>
                  </div>
                </dl>
              </div>

              {/* Booking CTA */}
              <a
                href={getWhatsAppLink('bookTour', language)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                {L.bookOnWa}
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-2">
                {L.relatedTours}
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8">
                {language === 'id'
                  ? `Paket tur yang menyertakan ${d.name}.`
                  : `Tour packages that include ${d.name}.`}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedTours.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tours/${t.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={t.image || '/images/placeholder-tour.svg'}
                        alt={t.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.duration} {L.hours}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-blue-800 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {t.description}
                      </p>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-gray-400">{L.perPerson}</span>
                          <div className="font-bold text-brand-blue-800 text-lg">
                            {formatPriceByLang(t.price, language).display}
                          </div>
                        </div>
                        <span className="text-sm text-brand-blue-700 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {L.details}
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      {guideLinks.length > 0 && (
        <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-2">
                {language === 'id' ? 'Panduan terkait' : 'Related guides'}
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8">
                {language === 'id'
                  ? `Baca panduan kami untuk merencanakan kunjungan ke ${d.name}.`
                  : `Read our guides to plan your visit to ${d.name}.`}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guideLinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="group flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-teal-600/10 text-brand-teal-700 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-gray-900 group-hover:text-brand-blue-800 transition-colors leading-snug">
                        {g.label}
                      </span>
                      {g.sub && (
                        <span className="block text-xs text-gray-500 mt-1">
                          {g.sub}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related destinations */}
      {relatedDestinations.length > 0 && (
        <section className="py-10 sm:py-16 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                {L.relatedDestinations}
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {relatedDestinations.map((rd) => (
                  <Link
                    key={rd.slug}
                    href={`/destinations/${rd.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={rd.heroImage}
                        alt={rd.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-blue-800 transition-colors">
                        {rd.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {language === 'id' ? rd.description.id : rd.description.en}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 text-brand-blue-700 hover:text-brand-blue-900 font-semibold"
                >
                  {L.backToDestinations}
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
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
