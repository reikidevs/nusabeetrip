/**
 * Server-only review utilities.
 * Used by server components / page metadata to embed real DB reviews into JSON-LD.
 *
 * Falls back to static TESTIMONIALS if DB is unavailable (build time, no DB connection).
 */

import 'server-only';
import { TESTIMONIALS, getAggregateRating, type Testimonial } from './testimonials';

export type ServerReview = {
  authorName: string;
  authorCountry?: string | null;
  rating: number;
  title?: string | null;
  body: string;
  language?: string | null;
  tourName?: string | null;
  date: string;
};

/**
 * Get reviews from DB for use in JSON-LD schema (server-side).
 * Returns at most `limit` approved reviews, falls back to static if DB fails.
 */
export async function getReviewsForSeo(limit = 6): Promise<ServerReview[]> {
  try {
    const { getApprovedReviews } = await import('./db/queries');
    const dbReviews = await getApprovedReviews(limit);

    if (dbReviews.length > 0) {
      return dbReviews.map((r) => ({
        authorName: r.authorName,
        authorCountry: r.authorCountry,
        rating: r.rating,
        title: r.title,
        body: r.body,
        language: r.language,
        tourName: r.tourName,
        date: r.createdAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      }));
    }
  } catch (error) {
    console.warn('[reviews-server] DB unavailable, using static fallback');
  }

  // Fallback to static testimonials
  return TESTIMONIALS.slice(0, limit).map((t) => ({
    authorName: t.name,
    authorCountry: t.country,
    rating: t.rating,
    title: t.title,
    body: t.body,
    language: t.language,
    tourName: t.tour,
    date: t.date,
  }));
}

/**
 * Get aggregate rating for SEO schema, with DB fallback to static.
 */
export async function getAggregateRatingForSeo(): Promise<{
  ratingValue: number;
  reviewCount: number;
}> {
  try {
    const { getReviewStats } = await import('./db/queries');
    const stats = await getReviewStats();
    if (stats.reviewCount > 0) {
      return { ratingValue: stats.ratingValue, reviewCount: stats.reviewCount };
    }
  } catch (error) {
    console.warn('[reviews-server] DB unavailable for rating, using static fallback');
  }

  return getAggregateRating();
}
