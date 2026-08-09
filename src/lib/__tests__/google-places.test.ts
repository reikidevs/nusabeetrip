jest.mock('server-only', () => ({}), { virtual: true });

import {
  fetchGooglePlaceReviews,
  GOOGLE_PLACE_FIELD_MASK,
  normalizeGooglePlaceResponse,
} from '@/lib/google-places';
import { SITE } from '@/lib/site-config';

function upstreamReview(index: number) {
  return {
    name: `places/${SITE.googlePlaceId}/reviews/review-${index}`,
    relativePublishTimeDescription: `${index} days ago`,
    text: { text: `Translated review ${index}`, languageCode: 'en' },
    originalText: { text: `Ulasan asli ${index}`, languageCode: 'id' },
    rating: 5,
    authorAttribution: {
      displayName: `Guest ${index}`,
      uri: `https://www.google.com/maps/contrib/${index}`,
      photoUri: `https://lh3.googleusercontent.com/photo-${index}`,
    },
    publishTime: `2026-08-0${Math.min(index, 9)}T00:00:00Z`,
    flagContentUri: `https://www.google.com/local/review/rap/report?review=${index}`,
    googleMapsUri: `https://www.google.com/maps/reviews/data=${index}`,
  };
}

describe('Google Places review normalization', () => {
  it('returns a small public DTO, preserves relevance order, and caps reviews at five', () => {
    const result = normalizeGooglePlaceResponse({
      id: SITE.googlePlaceId,
      displayName: { text: 'NusaBeeTrip', languageCode: 'en' },
      rating: 4.9,
      userRatingCount: 18,
      googleMapsUri: 'https://maps.google.com/example',
      googleMapsLinks: {
        placeUri: 'https://www.google.com/maps/place/example',
        reviewsUri: 'https://www.google.com/maps/reviews/example',
        writeAReviewUri: 'https://www.google.com/maps/reviews/write/example',
      },
      attributions: [
        { provider: 'Example provider', providerUri: 'https://example.com/provider' },
      ],
      reviews: Array.from({ length: 7 }, (_, index) => upstreamReview(index + 1)),
    });

    expect(result.place).toMatchObject({
      id: SITE.googlePlaceId,
      displayName: 'NusaBeeTrip',
      rating: 4.9,
      userRatingCount: 18,
      googleMapsUri: 'https://www.google.com/maps/place/example',
      reviewsUri: 'https://www.google.com/maps/reviews/example',
      writeAReviewUri: 'https://www.google.com/maps/reviews/write/example',
    });
    expect(result.place.attributions).toEqual([
      { provider: 'Example provider', providerUri: 'https://example.com/provider' },
    ]);
    expect(result.reviews).toHaveLength(5);
    expect(result.reviews.map((review) => review.id)).toEqual(
      [1, 2, 3, 4, 5].map((index) => `places/${SITE.googlePlaceId}/reviews/review-${index}`),
    );
    expect(result.reviews[0]).toMatchObject({
      source: 'google',
      authorName: 'Guest 1',
      body: 'Ulasan asli 1',
      languageCode: 'id',
      rating: 5,
      relativePublishedAt: '1 days ago',
    });
  });

  it('omits malformed reviews and unsafe attribution URLs', () => {
    const valid = upstreamReview(1);
    const result = normalizeGooglePlaceResponse({
      displayName: { text: 'NusaBeeTrip' },
      attributions: [
        { provider: 'Unsafe', providerUri: 'javascript:alert(1)' },
        { provider: 'Valid', providerUri: 'https://example.com/source' },
      ],
      reviews: [
        { ...valid, googleMapsUri: 'javascript:alert(1)' },
        { ...valid, name: '' },
        valid,
      ],
    });

    expect(result.place.id).toBe(SITE.googlePlaceId);
    expect(result.place.attributions).toEqual([
      { provider: 'Unsafe' },
      { provider: 'Valid', providerUri: 'https://example.com/source' },
    ]);
    expect(result.reviews).toHaveLength(1);
  });
});

describe('Google Places server request', () => {
  const originalApiKey = process.env.GOOGLE_PLACES_API_KEY;
  const originalFetch = global.fetch;

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.GOOGLE_PLACES_API_KEY;
    } else {
      process.env.GOOGLE_PLACES_API_KEY = originalApiKey;
    }
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('keeps the key server-side and disables upstream caching', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'server-secret-key';
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        id: SITE.googlePlaceId,
        displayName: { text: 'NusaBeeTrip' },
        reviews: [],
      }),
    });
    global.fetch = fetchMock as typeof fetch;

    const result = await fetchGooglePlaceReviews('id');

    expect(result.place.id).toBe(SITE.googlePlaceId);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.origin).toBe('https://places.googleapis.com');
    expect(url.pathname).toBe(`/v1/places/${SITE.googlePlaceId}`);
    expect(url.searchParams.get('languageCode')).toBe('id');
    expect(url.searchParams.get('regionCode')).toBe('ID');
    expect(options.cache).toBe('no-store');
    expect(options.headers).toMatchObject({
      'X-Goog-Api-Key': 'server-secret-key',
      'X-Goog-FieldMask': GOOGLE_PLACE_FIELD_MASK,
    });
    expect(url.toString()).not.toContain('server-secret-key');
  });
});
