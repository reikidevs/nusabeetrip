'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { formatPriceByLang } from '@/lib/currency';
import { getWhatsAppRentalLink } from '@/lib/whatsapp';
import { BreadcrumbNav } from '@/components/seo';
import type { RentalService } from '@/types';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  rental: RentalService;
  relatedRentals: RentalService[];
  faqItems: FaqItem[];
}

export default function RentalDetailContent({
  rental,
  relatedRentals,
  faqItems,
}: Props) {
  const { language } = useLanguage();

  const labels = {
    en: {
      heroBadge: 'Vehicle Rental · Nusa Penida',
      perDay: 'per day',
      perHour: 'per hour',
      bookOnWa: 'Book on WhatsApp',
      backToRentals: 'Back to all rentals',
      includes: 'What is included',
      info: 'Rental terms',
      faqHeading: 'Frequently asked',
      relatedHeading: 'Other rental options',
      details: 'See details',
      requirements: [
        'Valid driving license required (motorcycle only)',
        'Minimum age: 18 years',
        'Helmet and fuel included',
        'Free delivery within Nusa Penida',
        'Insurance coverage included',
        '24/7 WhatsApp support',
      ],
    },
    id: {
      heroBadge: 'Sewa Kendaraan · Nusa Penida',
      perDay: 'per hari',
      perHour: 'per jam',
      bookOnWa: 'Pesan via WhatsApp',
      backToRentals: 'Kembali ke semua sewa',
      includes: 'Yang sudah termasuk',
      info: 'Syarat sewa',
      faqHeading: 'Pertanyaan umum',
      relatedHeading: 'Pilihan sewa lainnya',
      details: 'Lihat detail',
      requirements: [
        'SIM yang masih berlaku (khusus motor)',
        'Usia minimum: 18 tahun',
        'Helm dan bensin sudah termasuk',
        'Antar gratis di seluruh Nusa Penida',
        'Asuransi sudah termasuk',
        'Bantuan WhatsApp 24/7',
      ],
    },
  };
  const L = labels[language];

  const priceLabel = formatPriceByLang(rental.pricePerDay, language);
  const hourPrice = rental.pricePerHour
    ? formatPriceByLang(rental.pricePerHour, language)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <BreadcrumbNav
        items={[
          { label: 'Rentals', labelId: 'Sewa', href: '/rentals' },
          { label: rental.model, href: `/rentals/${rental.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-teal-900 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-16 md:py-20 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white/95 px-3 py-1 rounded-full text-xs font-semibold border border-white/20 mb-5">
                {L.heroBadge}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight leading-tight">
                {rental.model}
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-7">
                {language === 'id'
                  ? `Sewa ${rental.model} berkualitas di Nusa Penida. Helm, bensin, dan antar jemput gratis di seluruh pulau.`
                  : `Rent a well-maintained ${rental.model} in Nusa Penida. Helmet, fuel, and free delivery anywhere on the island.`}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppRentalLink(rental.model, language)}
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
                  href="/rentals"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-xl font-semibold transition-all backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  {L.backToRentals}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
                <Image
                  src={rental.image || '/images/placeholder-tour.svg'}
                  alt={`${rental.model} rental Nusa Penida`}
                  fill
                  className="object-contain p-6"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-400 text-amber-950 rounded-2xl px-5 py-3 shadow-xl">
                <div className="text-[10px] font-bold uppercase tracking-wide">
                  {L.perDay}
                </div>
                <div className="text-xl font-bold leading-none">
                  {priceLabel.display}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-10">
              {rental.features.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5">
                    {L.includes}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {rental.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 px-4 py-3 bg-gray-50/70 rounded-xl border border-gray-100"
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
                        <span className="text-gray-700 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50/40 to-teal-50/40 rounded-2xl p-6 sm:p-8 border border-blue-100/60">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-blue-800 mb-5">
                  {L.info}
                </h2>
                <ul className="space-y-3">
                  {L.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-blue-700 mt-2.5" />
                      <span>{req}</span>
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
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
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

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="text-sm text-gray-500 mb-1">{L.perDay}</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-bold text-brand-blue-800">
                    {priceLabel.display}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {priceLabel.currencyLabel}
                  </span>
                </div>

                {hourPrice && (
                  <div className="text-sm text-gray-500 mb-3">
                    {language === 'id' ? 'Atau' : 'Or'} {hourPrice.display}{' '}
                    {hourPrice.currencyLabel} {L.perHour}
                  </div>
                )}

                <div className="text-xs text-gray-400 mb-5">
                  {language === 'id'
                    ? 'Tanpa biaya tersembunyi'
                    : 'No hidden fees'}
                </div>

                <a
                  href={getWhatsAppRentalLink(rental.model, language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  {L.bookOnWa}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedRentals.length > 0 && (
        <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                {L.relatedHeading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedRentals.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/rentals/${rt.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                      <Image
                        src={rt.image || '/images/placeholder-tour.svg'}
                        alt={rt.model}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        {rt.vehicleType}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 group-hover:text-brand-blue-800 transition-colors">
                        {rt.model}
                      </h3>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-gray-400">{L.perDay}</span>
                          <div className="font-bold text-brand-blue-800 text-lg">
                            {formatPriceByLang(rt.pricePerDay, language).display}
                          </div>
                        </div>
                        <span className="text-sm text-brand-blue-700 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {L.details}
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
