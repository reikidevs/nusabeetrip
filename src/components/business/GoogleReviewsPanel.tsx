'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { trackGoogleReviewClick } from '@/lib/analytics';
import { SITE } from '@/lib/site-config';

type Language = 'en' | 'id';

interface ProviderAttribution {
  provider: string;
  providerUri?: string;
}

interface GooglePlaceSummary {
  id: string;
  displayName: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviewsUri?: string;
  writeAReviewUri?: string;
  attributions?: ProviderAttribution[];
}

interface GoogleReview {
  id: string;
  source: 'google';
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
  rating: number;
  body: string;
  languageCode?: string;
  publishedAt?: string;
  relativePublishedAt?: string;
  googleMapsUri: string;
  flagContentUri?: string;
}

interface GoogleReviewsResponse {
  success: true;
  configured: true;
  place: GooglePlaceSummary;
  reviews: GoogleReview[];
}

interface GoogleReviewsPanelProps {
  language: Language;
}

const labels = {
  en: {
    sectionLabel: 'NusaBeeTrip reviews from Google Maps',
    eyebrow: 'Reviews from Google Maps',
    heading: 'What guests say on Google',
    description:
      'These Google ratings are shown separately from reviews submitted on this website.',
    rating: 'Google Maps rating',
    reviews: 'reviews',
    relevanceNotice:
      'Google selects and orders the reviews shown here by relevance. NusaBeeTrip does not filter or reorder them.',
    reviewLink: 'Read this review on Google Maps',
    profileLink: (name: string) => `View ${name}'s Google Maps profile`,
    writeReview: 'Write a review on Google',
    attributionPrefix: 'Data provided by',
  },
  id: {
    sectionLabel: 'Ulasan NusaBeeTrip dari Google Maps',
    eyebrow: 'Ulasan dari Google Maps',
    heading: 'Cerita tamu di Google',
    description:
      'Rating Google ini ditampilkan terpisah dari ulasan yang dikirim melalui website.',
    rating: 'Rating Google Maps',
    reviews: 'ulasan',
    relevanceNotice:
      'Google memilih dan mengurutkan ulasan ini berdasarkan relevansi. NusaBeeTrip tidak menyaring atau mengubah urutannya.',
    reviewLink: 'Baca ulasan ini di Google Maps',
    profileLink: (name: string) => `Lihat profil Google Maps ${name}`,
    writeReview: 'Tulis ulasan di Google',
    attributionPrefix: 'Data disediakan oleh',
  },
} as const;

function isGoogleReviewsResponse(value: unknown): value is GoogleReviewsResponse {
  if (!value || typeof value !== 'object') return false;
  const response = value as Partial<GoogleReviewsResponse>;
  return (
    response.success === true &&
    response.configured === true &&
    Boolean(response.place) &&
    Array.isArray(response.reviews)
  );
}

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= safeRating ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatReviewDate(review: GoogleReview, language: Language) {
  if (review.relativePublishedAt) return review.relativePublishedAt;
  if (!review.publishedAt) return '';
  const date = new Date(review.publishedAt);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function GoogleReviewCard({ review, language }: { review: GoogleReview; language: Language }) {
  const L = labels[language];
  const dateLabel = formatReviewDate(review, language);
  const authorIdentity = (
    <>
      {review.authorPhotoUri ? (
        // Google supplies this avatar URL as part of the review attribution.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={review.authorPhotoUri}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover bg-gray-100 flex-shrink-0"
        />
      ) : (
        <span
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          {review.authorName.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="font-semibold text-sm text-gray-900 group-hover:text-brand-blue-800 truncate">
        {review.authorName}
      </span>
    </>
  );

  return (
    <article
      className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col shadow-sm"
      aria-label={`Google review by ${review.authorName}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        {review.authorUri ? (
          <a
            href={review.authorUri}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 min-w-0"
            aria-label={L.profileLink(review.authorName)}
          >
            {authorIdentity}
          </a>
        ) : (
          <div className="flex items-center gap-3 min-w-0">{authorIdentity}</div>
        )}
        <GoogleIcon className="w-5 h-5 flex-shrink-0" />
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <ReviewStars rating={review.rating} />
        {dateLabel && (
          <time dateTime={review.publishedAt} className="text-xs text-gray-500 whitespace-nowrap">
            {dateLabel}
          </time>
        )}
      </div>

      {review.body && (
        <p className="text-sm text-gray-700 leading-relaxed flex-grow whitespace-pre-line">
          {review.body}
        </p>
      )}

      <a
        href={review.googleMapsUri}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 self-start mt-4 text-xs font-semibold text-brand-blue-700 hover:text-brand-blue-900 hover:underline underline-offset-2"
      >
        {L.reviewLink}
        <ExternalLinkIcon />
      </a>
    </article>
  );
}

export default function GoogleReviewsPanel({ language }: GoogleReviewsPanelProps) {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null);
  const L = labels[language];

  useEffect(() => {
    const controller = new AbortController();
    setData(null);

    const load = async () => {
      try {
        const response = await fetch(`/api/google-reviews?language=${language}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        if (!controller.signal.aborted && isGoogleReviewsResponse(payload) && payload.reviews.length > 0) {
          setData(payload);
        }
      } catch {
        // The Google panel is optional and should not disturb website reviews.
      }
    };

    load();
    return () => controller.abort();
  }, [language]);

  const reviews = useMemo(() => data?.reviews.slice(0, 5) ?? [], [data]);
  if (!data || reviews.length === 0) return null;

  const mapsUrl = data.place.reviewsUri || data.place.googleMapsUri || SITE.googleBusinessProfileUrl;
  const writeReviewUrl = data.place.writeAReviewUri || SITE.googleReviewUrl;
  const attributions = data.place.attributions ?? [];

  return (
    <section
      className="max-w-7xl mx-auto mb-10 sm:mb-14 rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/50 p-5 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
      aria-label={L.sectionLabel}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
        <div className="max-w-3xl">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-brand-blue-800 mb-2"
          >
            <GoogleIcon />
            <span>{L.eyebrow}</span>
            <ExternalLinkIcon />
          </a>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {L.heading}
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{L.description}</p>
          {typeof data.place.rating === 'number' && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold">{L.rating}: {data.place.rating.toFixed(1)}</span>
              <ReviewStars rating={data.place.rating} />
              {typeof data.place.userRatingCount === 'number' && (
                <span className="text-gray-500">
                  ({data.place.userRatingCount.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')} {L.reviews})
                </span>
              )}
            </div>
          )}
        </div>

        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackGoogleReviewClick('google_reviews_panel')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-md text-sm font-semibold text-gray-800 transition-all lg:flex-shrink-0"
        >
          <GoogleIcon className="w-4 h-4" />
          {L.writeReview}
          <ExternalLinkIcon />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <GoogleReviewCard key={review.id} review={review} language={language} />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-blue-100 text-xs text-gray-600 leading-relaxed space-y-2">
        <p>{L.relevanceNotice}</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Provider attributions">
          <span>{L.attributionPrefix}</span>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-[#5E5E5E] hover:underline underline-offset-2 whitespace-nowrap"
          >
            <span translate="no">Google Maps</span>
          </a>
          {attributions.map((attribution, index) => (
            <React.Fragment key={`${attribution.provider}-${index}`}>
              <span aria-hidden="true">&middot;</span>
              {attribution.providerUri ? (
                <a
                  href={attribution.providerUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-blue-700 hover:underline underline-offset-2"
                >
                  {attribution.provider}
                </a>
              ) : (
                <span className="font-semibold">{attribution.provider}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
