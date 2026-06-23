'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { BreadcrumbNav } from '@/components/seo';
import {
  GUIDE_CATEGORIES,
  getGuideRelatedTourLinks,
  getGuideRelatedDestinationLinks,
  type Guide,
} from '@/lib/guides';

interface Props {
  guide: Guide;
  relatedGuides: Guide[];
}

export default function GuideContent({ guide: g, relatedGuides }: Props) {
  const { language } = useLanguage();

  const tourLinks = getGuideRelatedTourLinks(g);
  const destinationLinks = getGuideRelatedDestinationLinks(g);

  const formattedDate = new Date(g.dateModified).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbNav
        items={[
          { label: 'Guides', labelId: 'Panduan', href: '/guides' },
          { label: g.title, href: `/guides/${g.slug}` },
        ]}
      />

      {/* Article header */}
      <header className="py-8 sm:py-14 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wide">
              <span className="bg-brand-blue-50 text-brand-blue-800 px-2.5 py-1 rounded-full">
                {GUIDE_CATEGORIES[g.category]}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500">{g.readingMinutes} min read</span>
              <span className="text-gray-300">·</span>
              <time dateTime={g.dateModified} className="text-gray-500">
                Updated {formattedDate}
              </time>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
              {g.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {g.excerpt}
            </p>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="container mx-auto px-4 mt-8 sm:mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={g.heroImage}
              alt={g.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            {g.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5 bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <svg
                          className="w-5 h-5 text-brand-teal-600 flex-shrink-0 mt-0.5"
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
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* CTA card after body */}
            <div className="bg-gradient-to-br from-brand-blue-800 to-brand-teal-700 text-white rounded-2xl p-7 sm:p-9 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Ready to plan your trip?
              </h3>
              <p className="text-white/90 mb-5 leading-relaxed">
                Tell us when you arrive and we will put together a tour or rental
                that fits the rest of your day. No payment until the trip starts.
              </p>
              <a
                href={getWhatsAppLink('bookTour', language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-brand-blue-800 hover:bg-amber-50 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Plan via WhatsApp
              </a>
            </div>

            {/* Automatic internal links — related tours & destinations */}
            {(tourLinks.length > 0 || destinationLinks.length > 0) && (
              <div className="space-y-6">
                {tourLinks.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                      {language === 'id' ? 'Tur & rental terkait' : 'Related tours & rentals'}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {tourLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 hover:border-brand-blue-300 hover:shadow-md transition-all"
                        >
                          <span>
                            <span className="block font-semibold text-gray-900 group-hover:text-brand-blue-800 transition-colors">
                              {link.label}
                            </span>
                            {link.sub && (
                              <span className="block text-sm text-gray-500">{link.sub}</span>
                            )}
                          </span>
                          <svg
                            className="w-5 h-5 text-brand-blue-600 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {destinationLinks.length > 0 && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                      {language === 'id' ? 'Destinasi yang disebutkan' : 'Destinations mentioned'}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {destinationLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 bg-brand-blue-50 text-brand-blue-800 hover:bg-brand-blue-100 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors"
                        >
                          {link.label}
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* FAQ — visible on-page content backs the FAQPage JSON-LD */}
      {g.faq && g.faq.length > 0 && (
        <section className="py-10 sm:py-16 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 tracking-tight">
                {language === 'id' ? 'Pertanyaan yang sering diajukan' : 'Frequently asked questions'}
              </h2>
              <div className="space-y-3">
                {g.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                    {...(i === 0 ? { open: true } : {})}
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 font-semibold text-gray-900">
                      <span>{item.question}</span>
                      <svg
                        className="w-5 h-5 text-brand-blue-700 flex-shrink-0 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-gray-700 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="py-10 sm:py-16 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-800 mb-6 sm:mb-8">
                Keep reading
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {relatedGuides.map((rg) => (
                  <Link
                    key={rg.slug}
                    href={`/guides/${rg.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={rg.heroImage}
                        alt={rg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold mb-1.5">
                        {GUIDE_CATEGORIES[rg.category]} · {rg.readingMinutes} min
                      </div>
                      <h3 className="font-bold text-gray-900 leading-tight group-hover:text-brand-blue-800 transition-colors">
                        {rg.title}
                      </h3>
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
