import type { NextRequest } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: HeadersInit }) => ({
      status: init?.status ?? 200,
      headers: new Headers(init?.headers),
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/google-places', () => {
  class GooglePlacesRequestError extends Error {
    constructor(
      message: string,
      public readonly upstreamStatus?: number,
    ) {
      super(message);
      this.name = 'GooglePlacesRequestError';
    }
  }

  return {
    fetchGooglePlaceReviews: jest.fn(),
    GooglePlacesRequestError,
  };
});

import { GET } from '../route';
import {
  fetchGooglePlaceReviews,
  GooglePlacesRequestError,
} from '@/lib/google-places';

const fetchGooglePlaceReviewsMock = jest.mocked(fetchGooglePlaceReviews);

function request(language?: string): NextRequest {
  const url = new URL('https://nusabeetrip.com/api/google-reviews');
  if (language) url.searchParams.set('language', language);
  return { nextUrl: url } as unknown as NextRequest;
}

describe('GET /api/google-reviews', () => {
  const originalApiKey = process.env.GOOGLE_PLACES_API_KEY;
  const originalEnabled = process.env.GOOGLE_REVIEWS_ENABLED;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    if (originalApiKey === undefined) {
      delete process.env.GOOGLE_PLACES_API_KEY;
    } else {
      process.env.GOOGLE_PLACES_API_KEY = originalApiKey;
    }
    if (originalEnabled === undefined) {
      delete process.env.GOOGLE_REVIEWS_ENABLED;
    } else {
      process.env.GOOGLE_REVIEWS_ENABLED = originalEnabled;
    }
  });

  it('returns a graceful configured:false response when the key is absent', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY;
    process.env.GOOGLE_REVIEWS_ENABLED = 'true';

    const response = await GET(request('id'));

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toContain('no-store');
    await expect(response.json()).resolves.toEqual({
      success: false,
      configured: false,
      place: null,
      reviews: [],
    });
    expect(fetchGooglePlaceReviewsMock).not.toHaveBeenCalled();
  });

  it('does not activate paid requests until the explicit opt-in is enabled', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'server-key';
    process.env.GOOGLE_REVIEWS_ENABLED = 'false';

    const response = await GET(request('en'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      configured: false,
    });
    expect(fetchGooglePlaceReviewsMock).not.toHaveBeenCalled();
  });

  it.each([
    ['id', 'id'],
    ['en', 'en'],
    ['unexpected', 'en'],
  ] as const)('normalizes language %s to %s', async (queryLanguage, expectedLanguage) => {
    process.env.GOOGLE_PLACES_API_KEY = 'server-key';
    process.env.GOOGLE_REVIEWS_ENABLED = 'true';
    fetchGooglePlaceReviewsMock.mockResolvedValue({
      place: {
        id: 'place-id',
        displayName: 'NusaBeeTrip',
        rating: 5,
        userRatingCount: 1,
        attributions: [],
      },
      reviews: [],
    });

    const response = await GET(request(queryLanguage));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({ success: true, configured: true });
    expect(fetchGooglePlaceReviewsMock).toHaveBeenCalledWith(expectedLanguage);
    expect(JSON.stringify(payload)).not.toContain('server-key');
  });

  it('returns a sanitized 502 response when Google is unavailable', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'server-key';
    process.env.GOOGLE_REVIEWS_ENABLED = 'true';
    fetchGooglePlaceReviewsMock.mockRejectedValue(
      new GooglePlacesRequestError('raw upstream details', 429),
    );

    const response = await GET(request('en'));

    expect(response.status).toBe(502);
    expect(response.headers.get('cache-control')).toContain('no-store');
    await expect(response.json()).resolves.toEqual({
      success: false,
      configured: true,
      place: null,
      reviews: [],
      error: 'Google reviews are temporarily unavailable',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[google-reviews] Places API request failed',
      { upstreamStatus: 429 },
    );
  });
});
