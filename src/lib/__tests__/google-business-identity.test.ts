import { buildMetadata, localBusinessEnhancedJsonLd } from '@/lib/seo';
import { SITE } from '@/lib/site-config';

const GOOGLE_PLACE_ID = 'ChIJUwlc6Uhz0i0RUwOyEzu2e-Y';
const GOOGLE_BUSINESS_PROFILE_URL =
  'https://maps.app.goo.gl/AT6nfQVX19KM9ryZ6';
const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJUwlc6Uhz0i0RUwOyEzu2e-Y';

const EXPECTED_GEO = {
  latitude: -8.6791946,
  longitude: 115.4921559,
  addressLocality: 'Nusa Penida',
  addressRegion: 'Bali',
  postalCode: '80771',
  addressCountry: 'ID',
  streetAddress: 'Desa Banjarnyuh, Ped',
  fullAddress:
    'Desa Banjarnyuh, Ped, Kec. Nusa Penida, Kabupaten Klungkung, Bali 80771',
} as const;

describe('verified Google Business identity', () => {
  it('keeps the exact NusaBeeTrip Place ID, Maps links, and listing location', () => {
    expect(SITE.googlePlaceId).toBe(GOOGLE_PLACE_ID);
    expect(SITE.googleBusinessProfileUrl).toBe(GOOGLE_BUSINESS_PROFILE_URL);
    expect(SITE.googleReviewUrl).toBe(GOOGLE_REVIEW_URL);
    expect(SITE.geo).toEqual(EXPECTED_GEO);
    expect(SITE.externalProfiles).toContain(GOOGLE_BUSINESS_PROFILE_URL);
  });

  it('uses the verified listing in LocalBusiness structured data', () => {
    const schema = localBusinessEnhancedJsonLd();

    expect(schema).toMatchObject({
      hasMap: GOOGLE_BUSINESS_PROFILE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: EXPECTED_GEO.streetAddress,
        addressLocality: EXPECTED_GEO.addressLocality,
        addressRegion: EXPECTED_GEO.addressRegion,
        postalCode: EXPECTED_GEO.postalCode,
        addressCountry: EXPECTED_GEO.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: EXPECTED_GEO.latitude,
        longitude: EXPECTED_GEO.longitude,
      },
      sameAs: expect.arrayContaining([GOOGLE_BUSINESS_PROFILE_URL]),
    });
  });

  it('emits the verified listing coordinates in page geo metadata', () => {
    const metadata = buildMetadata({
      title: 'Contact NusaBeeTrip',
      description: 'Contact details for NusaBeeTrip in Nusa Penida.',
      path: '/contact',
    }) as any;

    expect(metadata.other).toMatchObject({
      'geo.position': '-8.6791946;115.4921559',
      ICBM: '-8.6791946, 115.4921559',
    });
  });
});
