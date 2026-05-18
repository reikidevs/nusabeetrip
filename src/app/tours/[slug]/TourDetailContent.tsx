'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { formatPriceByLang } from '@/lib/currency';
import { getWhatsAppLink, getWhatsAppItemLink } from '@/lib/whatsapp';
import { BreadcrumbNav } from '@/components/seo';
import type { TourPackage } from '@/types';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  tour: TourPackage;
  relatedTours: TourPackage[];
  faqItems: FaqItem[];
}

const SERVICE_FEATURES = new Set([
  'Professional Guide',
  'Transportation',
  'Tax Island',
  'Parking Ticket in Any Spot',
  'Snorkeling Equipment',
  'Underwater Guide',
  'Full Island Experience',
]);

export default function TourDetailContent({ tour, relatedTours, faqItems }: Props) {
  const { t, language } = useLanguage();

  const destinations = tour.features.filter((f) => !SERVICE_FEATURES.has(f));
  const services = tour.features.filter((f) => SERVICE_FEATURES.has(f));

  const labels = {
    en: {
      heroBadge: 'Nusa Penida, Bali',
      hours: 'hours',
      perPerson: 'per person',
      destinations: 'Destinations',
      includes: 'What is included',
      info: 'Important information',
      pickupInfo: 'Free hotel pickup and drop-off across Nusa Penida.',
      timingInfo: 'Flexible departure times — usually starts 07:00–08:00 WITA.',
      weatherInfo: 'Some activities depend on weather conditions for safety.',
      cancelInfo: 'Free cancellation up to 24 hours before the tour.',
      faqHeading: 'Frequently asked',
      relatedHeading: 'Other tours you may like',
      bookOnWa: 'Book on WhatsApp',
      backToTours: 'Back to all tours',
    },
    id: {
      heroBadge: 'Nusa Penida, Bali',
      hours: 'jam',
      perPerson: 'per orang',
      destinations: 'Destinasi',
      includes: 'Yang sudah termasuk',
      info: 'Informasi penting',
      pickupInfo: 'Penjemputan dan pengantaran gratis di seluruh Nusa Penida.',
      timingInfo: 'Waktu keberangkatan fleksibel — biasanya mulai 07.00–08.00 WITA.',
      weatherInfo: 'Beberapa aktivitas tergantung kondisi cuaca demi keselamatan.',
      cancelInfo: 'Pembatalan gratis hingga 24 jam sebelum tur.',
      faqHeading: 'Pertanyaan umum',
      relatedHeading: 'Paket lain yang mungkin Anda suka',
      bookOnWa: 'Pesan via WhatsApp',
      backToTours: 'Kembali ke semua tur',
    },
  };
  const L = labels[language];

  const priceLabel = formatPriceByLang(tour.price, language);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: 'Tours', labelId: 'Tur', href: '/tours' },
          { label: tour.name, href: `/tours/${tour.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={tour.image || '/images/placeholder-tour.svg'}
            alt={`${tour.name} — Nusa Penida Tour`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/95 px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {L.heroBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/95 text-amber-950 px-3 py-1 rounded-full text-xs font-bold">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tour.duration} {L.hours}
              </span>
              {tour.includesSnorkeling && (
                <span className="inline-flex items-center gap-1.5 bg-cyan-500/95 text-white px-3 py-1 rounded-full text-xs font-bold">
                  + Snorkeling
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              {tour.name}
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
              {tour.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppItemLink(tour.name, language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                {L.bookOnWa}
              </a>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-xl font-semibold transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                {L.backToTours}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left column — content */}
            <div className="space-y-10">
              {/* Destinations */}
              {destinations.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {L.destinations}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {destinations.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 px-4 py-3 bg-gray-50/70 rounded-xl border border-gray-100"
                      >
                        <svg className="w-5 h-5 text-brand-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What is included */}
              {services.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {L.includes}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {services.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-gray-700 text-sm">
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important info */}
              <div className="bg-gradient-to-br from-blue-50/40 to-teal-50/40 rounded-2xl p-6 sm:p-8 border border-blue-100/60">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {L.info}
                </h2>
                <ul className="space-y-3">
                  {[L.pickupInfo, L.timingInfo, L.weatherInfo, L.cancelInfo].map((info, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-blue-700 mt-2.5" />
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5">
                  {L.faqHeading}
                </h2>
                <div className="space-y-3">
                  {faqItems.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — sticky booking card */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="text-sm text-gray-500 mb-1">{L.perPerson}</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-bold text-brand-blue-800">
                    {priceLabel.display}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {priceLabel.currencyLabel}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-5">
                  {language === 'id' ? 'Tanpa biaya tersembunyi' : 'No hidden fees'}
                </div>

                <div className="space-y-2.5 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tour.duration} {L.hours}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {language === 'id' ? 'Pemandu lokal profesional' : 'Professional local guide'}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {language === 'id' ? 'Booking 24/7 via WhatsApp' : '24/7 booking via WhatsApp'}
                  </div>
                </div>

                <a
                  href={getWhatsAppItemLink(tour.name, language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  {L.bookOnWa}
                </a>

                <p className="text-xs text-gray-400 text-center mt-3">
                  {language === 'id'
                    ? 'Respon instan • Tidak perlu login'
                    : 'Instant reply • No signup needed'}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                {L.relatedHeading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedTours.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/tours/${rt.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={rt.image || '/images/placeholder-tour.svg'}
                        alt={rt.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full">
                        {rt.duration} {L.hours}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-blue-800 transition-colors">
                        {rt.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {rt.description}
                      </p>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-gray-400">{L.perPerson}</span>
                          <div className="font-bold text-brand-blue-800 text-lg">
                            {formatPriceByLang(rt.price, language).display}
                          </div>
                        </div>
                        <span className="text-sm text-brand-blue-700 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {language === 'id' ? 'Detail' : 'Details'}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
    </main>
  );
}
