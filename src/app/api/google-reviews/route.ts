import { NextRequest, NextResponse } from 'next/server';
import {
  fetchGooglePlaceReviews,
  GooglePlacesRequestError,
  type GoogleReviewLanguage,
} from '@/lib/google-places';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
} as const;

function languageFromRequest(request: NextRequest): GoogleReviewLanguage {
  return request.nextUrl.searchParams.get('language') === 'id' ? 'id' : 'en';
}

/**
 * Read-only proxy for NusaBeeTrip's Places reviews. It intentionally accepts no
 * Place ID and never writes Google content to the local review database.
 */
export async function GET(request: NextRequest) {
  const explicitlyEnabled = process.env.GOOGLE_REVIEWS_ENABLED === 'true';
  if (!explicitlyEnabled || !process.env.GOOGLE_PLACES_API_KEY?.trim()) {
    return NextResponse.json(
      { success: false, configured: false, place: null, reviews: [] },
      { status: 200, headers: NO_STORE_HEADERS },
    );
  }

  try {
    const data = await fetchGooglePlaceReviews(languageFromRequest(request));
    return NextResponse.json(
      { success: true, configured: true, ...data },
      { status: 200, headers: NO_STORE_HEADERS },
    );
  } catch (error) {
    const upstreamStatus =
      error instanceof GooglePlacesRequestError ? error.upstreamStatus : undefined;
    console.error(
      '[google-reviews] Places API request failed',
      upstreamStatus ? { upstreamStatus } : undefined,
    );

    return NextResponse.json(
      {
        success: false,
        configured: true,
        place: null,
        reviews: [],
        error: 'Google reviews are temporarily unavailable',
      },
      { status: 502, headers: NO_STORE_HEADERS },
    );
  }
}
