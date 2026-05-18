'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { TESTIMONIALS, countryFlag, getAggregateRating, type Testimonial } from '@/lib/testimonials';
import ReviewForm from './ReviewForm';

type ReviewItem = Testimonial & {
  source?: string;
  helpfulCount?: number;
  ownerResponse?: string;
};

/**
 * Testimonials section — Google-style review display.
 * - Loads from /api/reviews (DB) and falls back to static TESTIMONIALS
 * - Includes ReviewForm modal triggered by "Write a Review" button
 * - Schema.org Review microdata for SEO rich snippets
 */
export default function Testimonials() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'en' | 'id'>('all');
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(TESTIMONIALS as ReviewItem[]);
  const [loading, setLoading] = useState(true);

  // Fetch from API on mount, fall back to static if API fails or empty
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews?limit=50', { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
        // Map DB shape to display shape
        const mapped: ReviewItem[] = data.reviews.map((r: any) => ({
          id: `db-${r.id}`,
          name: r.authorName,
          country: r.authorCountry,
          countryCode: r.authorCountryCode,
          rating: r.rating,
          tour: r.tourName || '',
          date: r.createdAt,
          title: r.title,
          body: r.body,
          language: r.language || 'en',
          verified: r.isVerified,
          photo: r.authorPhotoUrl,
          source: r.source,
          helpfulCount: r.helpfulCount,
          ownerResponse: r.ownerResponse,
        }));
        setReviews(mapped);
      }
      // If empty, keep static TESTIMONIALS as starter content
    } catch (err) {
      console.warn('[Testimonials] Using static fallback:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filtered =
    filter === 'all' ? reviews : reviews.filter((t) => t.language === filter);

  // Compute live aggregate from current dataset
  const liveAgg = (() => {
    if (reviews.length === 0) return getAggregateRating();
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      ratingValue: Math.round((sum / reviews.length) * 10) / 10,
      reviewCount: reviews.length,
    };
  })();

  const labels = {
    en: {
      heading: 'Reviews from Our Guests',
      subheading: 'Real experiences from real travelers',
      writeReview: 'Write a review',
      verified: 'Verified Guest',
      basedOn: 'Based on',
      reviews: 'reviews',
      filterAll: 'All',
      filterEn: 'English',
      filterId: 'Bahasa',
      noReviews: 'No reviews yet in this language. Be the first!',
      shareYour: 'Loved your trip? Share your experience',
      shareDesc: 'Help fellow travelers and support our small local business. Takes just 1 minute.',
      tookTour: 'Took the',
      tour: 'tour',
      ownerResponseLabel: 'Response from the owner',
      helpful: 'Helpful',
      googleStyle: 'Reviews shown here will sync with Google Business Profile when available',
    },
    id: {
      heading: 'Ulasan Tamu Kami',
      subheading: 'Pengalaman asli dari wisatawan asli',
      writeReview: 'Tulis ulasan',
      verified: 'Tamu Terverifikasi',
      basedOn: 'Berdasarkan',
      reviews: 'ulasan',
      filterAll: 'Semua',
      filterEn: 'English',
      filterId: 'Bahasa',
      noReviews: 'Belum ada ulasan dalam bahasa ini. Jadilah yang pertama!',
      shareYour: 'Senang dengan trip Anda? Bagikan pengalaman',
      shareDesc: 'Bantu wisatawan lain dan dukung bisnis lokal kami. Hanya 1 menit.',
      tookTour: 'Mengambil paket',
      tour: '',
      ownerResponseLabel: 'Tanggapan dari pemilik',
      helpful: 'Bermanfaat',
      googleStyle: 'Ulasan di sini akan disinkronkan dengan Google Business Profile saat tersedia',
    },
  };
  const L = labels[language];

  return (
    <section
      className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50"
      aria-label="Customer Testimonials"
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        {/* Header — Google-style summary card */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-blue-800 mb-3 sm:mb-4 tracking-tight">
            {L.heading}
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {L.subheading}
          </p>

          {/* Google-style aggregate rating card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-2xl px-6 py-5 shadow-md border border-gray-100">
            {/* Big rating number */}
            <div className="text-center sm:text-left sm:pr-6 sm:border-r border-gray-200">
              <div className="text-5xl font-bold text-gray-900 leading-none">
                {liveAgg.ratingValue.toFixed(1)}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i <= Math.round(liveAgg.ratingValue) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {L.basedOn} {liveAgg.reviewCount} {L.reviews}
              </div>
            </div>

            {/* Google-style "G" badge */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <div className="text-left">
                <div className="text-xs font-semibold text-gray-700">Google-style reviews</div>
                <div className="text-[10px] text-gray-500 max-w-[200px] leading-tight">
                  {L.googleStyle}
                </div>
              </div>
            </div>

            {/* Write review CTA */}
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {L.writeReview}
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(['all', 'en', 'id'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-brand-blue-800 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f === 'all' ? L.filterAll : f === 'en' ? L.filterEn : L.filterId}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        {filtered.length > 0 ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {filtered.map((review, idx) => (
              <article
                key={review.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="position" content={String(idx + 1)} />

                {/* Author header — Google-style */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue-700 to-brand-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold text-gray-900 text-sm flex items-center gap-1 truncate"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{review.name}</span>
                      {review.verified && (
                        <span title={L.verified} className="text-blue-500 flex-shrink-0">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                      {review.countryCode && <span aria-hidden="true">{countryFlag(review.countryCode)}</span>}
                      <span className="truncate">{review.country}</span>
                      {review.country && <span className="text-gray-300">·</span>}
                      <time
                        className="text-xs text-gray-500"
                        dateTime={review.date}
                        itemProp="datePublished"
                      >
                        {new Date(review.date).toLocaleDateString(
                          language === 'id' ? 'id-ID' : 'en-US',
                          { year: 'numeric', month: 'short' },
                        )}
                      </time>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div
                  className="flex items-center gap-0.5 mb-2"
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={String(review.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Title */}
                {review.title && (
                  <h3
                    className="font-semibold text-gray-900 mb-1.5 text-sm sm:text-base"
                    itemProp="name"
                  >
                    {review.title}
                  </h3>
                )}

                {/* Body */}
                <p
                  className="text-gray-700 text-sm leading-relaxed mb-3 flex-grow"
                  itemProp="reviewBody"
                >
                  {review.body}
                </p>

                {/* Tour package taken */}
                {review.tour && (
                  <div className="text-xs text-brand-teal-700 font-medium mb-3 inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="truncate">
                      {L.tookTour} {review.tour} {L.tour}
                    </span>
                  </div>
                )}

                {/* Owner response */}
                {review.ownerResponse && (
                  <div className="mt-2 bg-gray-50 rounded-lg p-3 border-l-2 border-brand-blue-700">
                    <div className="flex items-center gap-1.5 mb-1">
                      <svg className="w-3.5 h-3.5 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">{L.ownerResponseLabel}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{review.ownerResponse}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">{L.noReviews}</div>
        )}

        {/* CTA — Write a Review */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto bg-gradient-to-r from-brand-blue-800 to-brand-teal-700 rounded-2xl p-8 sm:p-10 text-center text-white shadow-xl">
          <svg className="w-12 h-12 mx-auto mb-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">{L.shareYour}</h3>
          <p className="text-white/90 mb-6 text-sm sm:text-base">{L.shareDesc}</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-white text-brand-blue-800 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {L.writeReview}
          </button>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={() => {
          // Refetch reviews after submission (will show pending if approved)
          setTimeout(() => fetchReviews(), 1000);
        }}
      />
    </section>
  );
}
