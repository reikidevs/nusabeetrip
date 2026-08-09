import 'server-only';

import { SITE } from './site-config';

const PLACES_API_BASE_URL = 'https://places.googleapis.com/v1/places';
const GOOGLE_REVIEW_LIMIT = 5;
const REQUEST_TIMEOUT_MS = 8_000;

/** Explicit field mask; requesting reviews activates the paid Atmosphere SKU. */
export const GOOGLE_PLACE_FIELD_MASK = [
  'id',
  'displayName',
  'rating',
  'userRatingCount',
  'googleMapsUri',
  'googleMapsLinks.placeUri',
  'googleMapsLinks.reviewsUri',
  'googleMapsLinks.writeAReviewUri',
  'attributions.provider',
  'attributions.providerUri',
  'reviews.name',
  'reviews.relativePublishTimeDescription',
  'reviews.text',
  'reviews.originalText',
  'reviews.rating',
  'reviews.authorAttribution',
  'reviews.publishTime',
  'reviews.flagContentUri',
  'reviews.googleMapsUri',
].join(',');

export type GoogleReviewLanguage = 'en' | 'id';

export type GooglePlaceAttribution = {
  provider: string;
  providerUri?: string;
};

export type GoogleReviewDto = {
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
};

export type GooglePlaceReviewsDto = {
  place: {
    id: string;
    displayName: string;
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviewsUri?: string;
    writeAReviewUri?: string;
    attributions: GooglePlaceAttribution[];
  };
  reviews: GoogleReviewDto[];
};

type UnknownRecord = Record<string, unknown>;

export class GooglePlacesRequestError extends Error {
  constructor(
    message: string,
    public readonly upstreamStatus?: number,
  ) {
    super(message);
    this.name = 'GooglePlacesRequestError';
  }
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function httpsUrl(value: unknown): string | undefined {
  const candidate = stringValue(value);
  if (!candidate) return undefined;

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

function localizedText(value: unknown): { text?: string; languageCode?: string } {
  if (!isRecord(value)) return {};
  return {
    text: stringValue(value.text),
    languageCode: stringValue(value.languageCode),
  };
}

function ratingValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 5
    ? value
    : undefined;
}

function countValue(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
    ? value
    : undefined;
}

function normalizeAttributions(value: unknown): GooglePlaceAttribution[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isRecord(item)) return [];
    const provider = stringValue(item.provider);
    const providerUri = httpsUrl(item.providerUri);
    return provider
      ? [{ provider, ...(providerUri ? { providerUri } : {}) }]
      : [];
  });
}

function normalizeReview(value: unknown): GoogleReviewDto | null {
  if (!isRecord(value)) return null;

  const id = stringValue(value.name);
  const rating = ratingValue(value.rating);
  const googleMapsUri = httpsUrl(value.googleMapsUri);
  const author = isRecord(value.authorAttribution) ? value.authorAttribution : {};
  const authorName = stringValue(author.displayName);

  // Google requires author attribution and direct access to the source review.
  if (!id || rating === undefined || !googleMapsUri || !authorName) return null;

  const original = localizedText(value.originalText);
  const localized = localizedText(value.text);
  const authorUri = httpsUrl(author.uri);
  const authorPhotoUri = httpsUrl(author.photoUri);
  const publishedAt = stringValue(value.publishTime);
  const relativePublishedAt = stringValue(value.relativePublishTimeDescription);
  const flagContentUri = httpsUrl(value.flagContentUri);

  return {
    id,
    source: 'google',
    authorName,
    ...(authorUri ? { authorUri } : {}),
    ...(authorPhotoUri ? { authorPhotoUri } : {}),
    rating,
    // Prefer the author's original wording to avoid presenting a translation
    // without the disclosure recommended by Google.
    body: original.text || localized.text || '',
    ...(original.languageCode || localized.languageCode
      ? { languageCode: original.languageCode || localized.languageCode }
      : {}),
    ...(publishedAt ? { publishedAt } : {}),
    ...(relativePublishedAt ? { relativePublishedAt } : {}),
    googleMapsUri,
    ...(flagContentUri ? { flagContentUri } : {}),
  };
}

/** Preserve Google's relevance order and expose at most five reviews. */
export function normalizeGooglePlaceResponse(
  value: unknown,
  expectedPlaceId: string = SITE.googlePlaceId,
): GooglePlaceReviewsDto {
  if (!isRecord(value)) {
    throw new GooglePlacesRequestError('Google Places returned an invalid response');
  }

  const displayName = localizedText(value.displayName).text || SITE.name;
  const googleMapsLinks = isRecord(value.googleMapsLinks) ? value.googleMapsLinks : {};
  const reviews = Array.isArray(value.reviews)
    ? value.reviews
        .flatMap((review) => {
          const normalized = normalizeReview(review);
          return normalized ? [normalized] : [];
        })
        .slice(0, GOOGLE_REVIEW_LIMIT)
    : [];

  const responsePlaceId = stringValue(value.id);
  const rating = ratingValue(value.rating);
  const userRatingCount = countValue(value.userRatingCount);
  const googleMapsUri = httpsUrl(googleMapsLinks.placeUri) || httpsUrl(value.googleMapsUri);
  const reviewsUri = httpsUrl(googleMapsLinks.reviewsUri);
  const writeAReviewUri = httpsUrl(googleMapsLinks.writeAReviewUri);

  return {
    place: {
      id: responsePlaceId || expectedPlaceId,
      displayName,
      ...(rating !== undefined ? { rating } : {}),
      ...(userRatingCount !== undefined ? { userRatingCount } : {}),
      ...(googleMapsUri ? { googleMapsUri } : {}),
      ...(reviewsUri ? { reviewsUri } : {}),
      ...(writeAReviewUri ? { writeAReviewUri } : {}),
      attributions: normalizeAttributions(value.attributions),
    },
    reviews,
  };
}

export async function fetchGooglePlaceReviews(
  language: GoogleReviewLanguage,
): Promise<GooglePlaceReviewsDto> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    throw new GooglePlacesRequestError('Google Places API is not configured');
  }

  const endpoint = new URL(`${PLACES_API_BASE_URL}/${encodeURIComponent(SITE.googlePlaceId)}`);
  endpoint.searchParams.set('languageCode', language);
  endpoint.searchParams.set('regionCode', 'ID');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': GOOGLE_PLACE_FIELD_MASK,
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new GooglePlacesRequestError(
        `Google Places request failed with status ${response.status}`,
        response.status,
      );
    }

    return normalizeGooglePlaceResponse(await response.json(), SITE.googlePlaceId);
  } catch (error) {
    if (error instanceof GooglePlacesRequestError) throw error;
    if (controller.signal.aborted) {
      throw new GooglePlacesRequestError('Google Places request timed out');
    }
    throw new GooglePlacesRequestError('Google Places request failed');
  } finally {
    clearTimeout(timeout);
  }
}
