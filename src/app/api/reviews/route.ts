import { NextRequest, NextResponse } from 'next/server';
import { createReview, getApprovedReviews } from '@/lib/db/queries';
import type { NewReview } from '@/lib/db/schema';

/**
 * GET /api/reviews — fetch approved reviews (public)
 * Query params:
 *   - language: 'en' | 'id' (optional)
 *   - limit: number (default 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    const reviews = await getApprovedReviews(Math.min(limit, 100));

    return NextResponse.json(
      { success: true, reviews, count: reviews.length },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/reviews — submit a new review (goes to moderation queue)
 * Body:
 * {
 *   authorName: string (required),
 *   authorEmail?: string,
 *   authorCountry?: string,
 *   authorCountryCode?: string,
 *   rating: number (1-5, required),
 *   title?: string,
 *   body: string (required, min 20 chars),
 *   language?: 'en' | 'id',
 *   tourSlug?: string,
 *   tourName?: string,
 *   serviceType?: 'tour' | 'rental' | 'general',
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const errors: string[] = [];
    if (!body.authorName || typeof body.authorName !== 'string') {
      errors.push('Author name is required');
    } else if (body.authorName.length > 255) {
      errors.push('Author name too long (max 255 chars)');
    }

    if (!body.rating || typeof body.rating !== 'number') {
      errors.push('Rating is required');
    } else if (body.rating < 1 || body.rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }

    if (!body.body || typeof body.body !== 'string') {
      errors.push('Review body is required');
    } else if (body.body.length < 20) {
      errors.push('Review must be at least 20 characters');
    } else if (body.body.length > 2000) {
      errors.push('Review too long (max 2000 chars)');
    }

    // Email validation if provided
    if (body.authorEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.authorEmail)) {
        errors.push('Invalid email format');
      }
    }

    // Spam check — simple heuristics
    const spamPatterns = [
      /\bhttps?:\/\//i, // any URL in body = spam
      /<[^>]+>/, // HTML tags
      /\b(viagra|casino|porn|xxx)\b/i, // keyword spam
    ];
    const isSpam = spamPatterns.some((pattern) => pattern.test(body.body));

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 },
      );
    }

    // Capture IP & user agent for spam tracking
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      null;
    const userAgent = request.headers.get('user-agent') || null;

    // Build review record
    const reviewData: NewReview = {
      authorName: body.authorName.trim(),
      authorEmail: body.authorEmail?.trim() || null,
      authorPhone: body.authorPhone?.trim() || null,
      authorCountry: body.authorCountry?.trim() || null,
      authorCountryCode: body.authorCountryCode?.toUpperCase().slice(0, 2) || null,
      authorPhotoUrl: body.authorPhotoUrl || null,
      rating: Math.round(body.rating),
      title: body.title?.trim() || null,
      body: body.body.trim(),
      language: body.language === 'id' ? 'id' : 'en',
      tourSlug: body.tourSlug || null,
      tourName: body.tourName || null,
      serviceType: body.serviceType || 'general',
      photos: body.photos || [],
      source: 'website',
      ipAddress,
      userAgent,
      status: isSpam ? 'spam' : 'pending',
      isVerified: false,
      isFeatured: false,
    };

    const newReview = await createReview(reviewData);

    return NextResponse.json(
      {
        success: true,
        message: isSpam
          ? 'Thank you. Your review is being reviewed.'
          : 'Thank you! Your review has been submitted and will appear after moderation.',
        reviewId: newReview.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit review. Please try again later.' },
      { status: 500 },
    );
  }
}
