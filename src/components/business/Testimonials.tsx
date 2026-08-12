'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { countryFlag, type Testimonial } from '@/lib/testimonials';
import ReviewForm from './ReviewForm';
import GoogleReviewsPanel from './GoogleReviewsPanel';
import { SITE } from '@/lib/site-config';
import { trackGoogleReviewClick } from '@/lib/analytics';

type ReviewItem = Testimonial & {
  source?: string;
  helpfulCount?: number;
  ownerResponse?: string;
};

const REVIEWS_PER_PAGE = 6;

function GoogleIcon() {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
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
    </span>
  );
}

/**
 * Premium Testimonials section.
 * - Hero summary with rating distribution histogram (TripAdvisor / Booking.com style)
 * - Filterable, paginated review cards
 * - Connected to moderated records from /api/reviews
 * - No review structured data: self-serving business reviews are not eligible
 */
export default function Testimonials() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | number>('all');
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [visible, setVisible] = useState(REVIEWS_PER_PAGE);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews?limit=50', { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
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
    } catch (err) {
      console.warn('[Testimonials] Website reviews are temporarily unavailable:', err);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Compute aggregate stats with distribution
  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return { ratingValue: 0, reviewCount: 0, distribution: [0, 0, 0, 0, 0] };
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++;
    });
    return {
      ratingValue: Math.round((sum / reviews.length) * 10) / 10,
      reviewCount: reviews.length,
      distribution: dist,
    };
  }, [reviews]);

  // Apply filter
  const filtered = useMemo(() => {
    if (filter === 'all') return reviews;
    if (typeof filter === 'number') return reviews.filter((r) => r.rating === filter);
    return reviews;
  }, [filter, reviews]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisible(REVIEWS_PER_PAGE);
  }, [filter]);

  const labels = {
    en: {
      heading: 'What Our Guests Say',
      subheading: 'Honest reviews from travellers who explored Nusa Penida with us',
      writeReview: 'Write on this website',
      verified: 'Verified guest',
      basedOn: 'from',
      reviews: 'guest reviews on this website',
      excellent: 'Excellent',
      stars: 'stars',
      noReviews: 'No reviews match this filter yet.',
      shareYour: 'Travelled with us recently?',
      shareDesc: 'Share a few words about your trip — it helps fellow travellers and means the world to our local team.',
      tookTour: 'Booked',
      ownerResponseLabel: 'Reply from NusaBeeTrip',
      showMore: 'Show more reviews',
      readMore: 'Read more',
      readLess: 'Show less',
      reviewsOn: 'Reviews on',
      ratingSource: 'Website guest rating',
      poweredBy: 'Review us on Google',
      googleLinkLabel: 'Open NusaBeeTrip review page on Google Maps',
      reviewDestinationNote: 'Google reviews are submitted on Google; website reviews stay on this website.',
      reviewActionsLabel: 'Review options',
      ratingLabel: 'rating',
      clearFilter: 'Show all reviews',
    },
    id: {
      heading: 'Apa Kata Tamu Kami',
      subheading: 'Ulasan jujur dari wisatawan yang telah menjelajahi Nusa Penida bersama kami',
      writeReview: 'Tulis di website',
      verified: 'Tamu terverifikasi',
      basedOn: 'dari',
      reviews: 'ulasan tamu di website',
      excellent: 'Sangat Memuaskan',
      stars: 'bintang',
      noReviews: 'Belum ada ulasan yang cocok dengan filter ini.',
      shareYour: 'Baru saja trip bersama kami?',
      shareDesc: 'Bagikan sedikit cerita Anda — sangat berarti bagi tim lokal kami dan membantu wisatawan lain.',
      tookTour: 'Memesan',
      ownerResponseLabel: 'Balasan dari NusaBeeTrip',
      showMore: 'Tampilkan ulasan lainnya',
      readMore: 'Baca lainnya',
      readLess: 'Sembunyikan',
      reviewsOn: 'Ulasan di',
      ratingSource: 'Rating tamu di website',
      poweredBy: 'Beri ulasan di Google',
      googleLinkLabel: 'Buka halaman ulasan NusaBeeTrip di Google Maps',
      reviewDestinationNote: 'Ulasan Google dikirim di Google; ulasan website tetap di website ini.',
      reviewActionsLabel: 'Pilihan ulasan',
      ratingLabel: 'rating',
      clearFilter: 'Tampilkan semua ulasan',
    },
  };
  const L = labels[language];

  // Rating quality label
  const qualityLabel = (() => {
    if (stats.ratingValue >= 4.5) return L.excellent;
    if (stats.ratingValue >= 4.0) return language === 'id' ? 'Sangat Baik' : 'Very Good';
    if (stats.ratingValue >= 3.5) return language === 'id' ? 'Baik' : 'Good';
    return language === 'id' ? 'Cukup' : 'Average';
  })();

  return (
    <section
      className="relative py-14 sm:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden scroll-mt-20 lg:scroll-mt-28"
      aria-label="Customer Testimonials"
      id="testimonials"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30 58 138) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {stats.reviewCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
            <span className="flex items-center -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i <= Math.round(stats.ratingValue) ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-xs font-semibold text-gray-700 tracking-wide">
              {qualityLabel} {stats.ratingValue.toFixed(1)} / 5
            </span>
          </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            {L.heading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{L.subheading}</p>
        </div>

        {/* Premium aggregate panel — Booking/TripAdvisor style */}
        {stats.reviewCount > 0 && (
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Left — Big rating */}
              <div className="px-8 py-7 sm:py-8 flex flex-col items-center justify-center text-center">
                {/* This aggregate is calculated from reviews stored on this website. */}
                <div className="flex items-center gap-1.5 mb-3 text-gray-500">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[11px] font-semibold tracking-wide uppercase">
                    {L.ratingSource}
                  </span>
                </div>
                <div className="text-6xl sm:text-7xl font-bold text-gray-900 leading-none tracking-tight">
                  {stats.ratingValue.toFixed(1)}
                </div>
                <div className="flex items-center gap-0.5 mt-3" aria-label={`${stats.ratingValue} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const filled = i <= Math.floor(stats.ratingValue);
                    const half = !filled && i - 0.5 <= stats.ratingValue;
                    return (
                      <div key={i} className="relative w-5 h-5">
                        <svg
                          className="w-5 h-5 text-gray-200 absolute inset-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {(filled || half) && (
                          <svg
                            className="w-5 h-5 text-amber-400 absolute inset-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            style={half ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {L.basedOn} <span className="font-semibold text-gray-700">{stats.reviewCount}</span> {L.reviews}
                </div>
              </div>

              {/* Middle — Distribution histogram */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-center gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = stats.distribution[star - 1];
                  const pct = stats.reviewCount > 0 ? (count / stats.reviewCount) * 100 : 0;
                  const isActive = filter === star;
                  return (
                    <button
                      key={star}
                      onClick={() => setFilter(filter === star ? 'all' : star)}
                      className={`group flex items-center gap-3 text-left rounded-md px-2 py-1 -mx-2 transition-colors ${
                        isActive ? 'bg-amber-50' : 'hover:bg-gray-50'
                      }`}
                      aria-label={`Filter by ${star} ${L.stars}`}
                    >
                      <span className="text-xs font-medium text-gray-600 w-12 flex items-center gap-1">
                        {star}
                        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isActive ? 'bg-amber-500' : 'bg-amber-400 group-hover:bg-amber-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right — one clear primary action, with the website form as a fallback. */}
              <div
                className="flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-50 to-white px-6 py-6 sm:px-8 sm:py-8"
                role="group"
                aria-label={L.reviewActionsLabel}
              >
                <a
                  href={SITE.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGoogleReviewClick('testimonials_panel')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 sm:min-w-56"
                  aria-label={L.googleLinkLabel}
                >
                  <GoogleIcon />
                  {L.poweredBy}
                </a>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-blue-300 hover:bg-brand-blue-50 hover:text-brand-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 sm:min-w-56"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {L.writeReview}
                </button>
                <p className="max-w-64 text-center text-xs leading-relaxed text-gray-600">
                  {L.reviewDestinationNote}
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Google Maps reviews stay separate from the website review aggregate. */}
        <GoogleReviewsPanel language={language} />

        {/* Active filter indicator (shows when user clicks a star bar) */}
        {typeof filter === 'number' && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setFilter('all')}
              className="inline-flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              <span className="flex items-center gap-1">
                {filter}
                <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {L.stars}
              </span>
              <span className="text-amber-300">·</span>
              <span className="text-xs">{L.clearFilter}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Reviews Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {filtered.slice(0, visible).map((review, idx) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  position={idx + 1}
                  language={language}
                  labels={L}
                />
              ))}
            </div>

            {/* Show more button */}
            {visible < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisible((v) => v + REVIEWS_PER_PAGE)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-brand-blue-800 border border-gray-200 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md text-sm"
                >
                  {L.showMore}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-xs text-gray-400 font-normal">
                    ({filtered.length - visible})
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500">{L.noReviews}</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mx-auto mt-14 max-w-3xl border-t border-gray-200 pt-10 text-center sm:mt-20 sm:pt-12">
          <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">{L.shareYour}</h3>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-gray-600">
            {L.shareDesc}
          </p>
          <div
            className="mx-auto max-w-xl"
            role="group"
            aria-label={L.reviewActionsLabel}
          >
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a
                href={SITE.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoogleReviewClick('testimonials_bottom')}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2"
                aria-label={L.googleLinkLabel}
              >
                <GoogleIcon />
                {L.poweredBy}
              </a>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-blue-300 hover:bg-brand-blue-50 hover:text-brand-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {L.writeReview}
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-600">
              {L.reviewDestinationNote}
            </p>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={() => {
          setTimeout(() => fetchReviews(), 1000);
        }}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ReviewCard — individual review with read more, owner reply, etc.    */
/* ─────────────────────────────────────────────────────────────────── */

interface ReviewCardProps {
  review: ReviewItem;
  position: number;
  language: 'en' | 'id';
  labels: {
    verified: string;
    tookTour: string;
    ownerResponseLabel: string;
    readMore: string;
    readLess: string;
  };
}

function ReviewCard({ review, position, language, labels }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > 240;
  const displayBody = expanded || !isLong ? review.body : review.body.slice(0, 220) + '…';

  // Avatar gradient based on first letter — consistent per name
  const avatarGradient = useMemo(() => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-600',
      'from-violet-500 to-purple-600',
      'from-cyan-500 to-blue-600',
    ];
    const idx = review.name.charCodeAt(0) % gradients.length;
    return gradients[idx];
  }, [review.name]);

  return (
    <article
      className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
    >
      {/* Author header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-semibold text-base flex-shrink-0 shadow-sm ring-2 ring-white`}
          aria-hidden="true"
        >
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
            <span className="truncate">
              {review.name}
            </span>
            {review.verified && (
              <span title={labels.verified} className="text-blue-500 flex-shrink-0" aria-label={labels.verified}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
            {review.countryCode && (
              <span aria-hidden="true" className="text-sm leading-none">
                {countryFlag(review.countryCode)}
              </span>
            )}
            <span className="truncate">{review.country}</span>
            {review.country && <span className="text-gray-300" aria-hidden="true">·</span>}
            <time dateTime={review.date}>
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
        className="flex items-center gap-0.5 mb-2.5"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}
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
        <h3 className="font-semibold text-gray-900 mb-1.5 text-sm sm:text-base leading-snug">
          {review.title}
        </h3>
      )}

      {/* Body */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3 flex-grow">
        {displayBody}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-brand-blue-700 hover:text-brand-blue-900 font-medium underline-offset-2 hover:underline"
          >
            {expanded ? labels.readLess : labels.readMore}
          </button>
        )}
      </p>

      {/* Tour package taken */}
      {review.tour && (
        <div className="inline-flex items-center gap-1.5 self-start text-xs text-brand-teal-700 font-medium mt-1 bg-brand-teal-50/50 px-2.5 py-1 rounded-md">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span className="truncate">
            {labels.tookTour} {review.tour}
          </span>
        </div>
      )}

      {/* Owner response */}
      {review.ownerResponse && (
        <div className="mt-4 bg-gradient-to-br from-blue-50/50 to-teal-50/30 rounded-xl p-3.5 border border-blue-100/60">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-blue-800 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              N
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {labels.ownerResponseLabel}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed pl-8">
            {review.ownerResponse}
          </p>
        </div>
      )}
    </article>
  );
}
