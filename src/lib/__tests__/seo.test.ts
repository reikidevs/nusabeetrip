import { RENTAL_SERVICES, TOUR_PACKAGES } from '@/lib/constants';
import {
  homepageJsonLd,
  localBusinessEnhancedJsonLd,
  rentalServiceListJsonLd,
  serviceJsonLd,
  siteNavigationJsonLd,
  tourPackageListJsonLd,
} from '@/lib/seo';

describe('catalog JSON-LD', () => {
  it('represents the tours collection as an ItemList of detail URLs', () => {
    const schema = tourPackageListJsonLd();
    const activeTours = TOUR_PACKAGES.filter((tour) => tour.isActive);

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': 'https://nusabeetrip.com/tours#tour-list',
      url: 'https://nusabeetrip.com/tours',
      numberOfItems: activeTours.length,
      itemListOrder: 'https://schema.org/ItemListUnordered',
    });
    expect(schema.itemListElement).toEqual(
      activeTours.map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tour.name,
        url: `https://nusabeetrip.com/tours/${tour.slug}`,
      })),
    );
    expect(JSON.stringify(schema)).not.toContain('"@type":"Product"');
  });

  it('represents the rentals collection as an ItemList of detail URLs', () => {
    const schema = rentalServiceListJsonLd();
    const availableRentals = RENTAL_SERVICES.filter((service) => service.isAvailable);

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': 'https://nusabeetrip.com/rentals#rental-list',
      url: 'https://nusabeetrip.com/rentals',
      numberOfItems: availableRentals.length,
      itemListOrder: 'https://schema.org/ItemListUnordered',
    });
    expect(schema.itemListElement).toEqual(
      availableRentals.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.model,
        url: `https://nusabeetrip.com/rentals/${service.slug}`,
      })),
    );
    expect(JSON.stringify(schema)).not.toContain('"@type":"Product"');
  });

  it('uses Indonesian catalog URLs and labels for Indonesian routes', () => {
    const tourSchema = tourPackageListJsonLd(undefined, 'id');
    const rentalSchema = rentalServiceListJsonLd(undefined, 'id');

    expect(tourSchema).toMatchObject({
      '@id': 'https://nusabeetrip.com/id/tours#tour-list',
      name: 'Paket Tour Nusa Penida',
      url: 'https://nusabeetrip.com/id/tours',
    });
    expect(
      tourSchema.itemListElement.every((item) =>
        item.url.startsWith('https://nusabeetrip.com/id/tours/'),
      ),
    ).toBe(true);

    expect(rentalSchema).toMatchObject({
      '@id': 'https://nusabeetrip.com/id/rentals#rental-list',
      name: 'Rental Kendaraan Nusa Penida',
      url: 'https://nusabeetrip.com/id/rentals',
    });
    expect(
      rentalSchema.itemListElement.every((item) =>
        item.url.startsWith('https://nusabeetrip.com/id/rentals/'),
      ),
    ).toBe(true);
  });

  it('uses the exact active data rendered by the collection page', () => {
    const [activeTour, inactiveTour] = TOUR_PACKAGES;
    const schema = tourPackageListJsonLd([
      activeTour,
      { ...inactiveTour, isActive: false },
    ]);

    expect(schema.numberOfItems).toBe(1);
    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0].url).toBe(
      `https://nusabeetrip.com/tours/${activeTour.slug}`,
    );
  });

  it('does not describe tour or rental services as shippable merchant products', () => {
    const schemas = JSON.stringify([
      tourPackageListJsonLd(),
      rentalServiceListJsonLd(),
    ]);

    expect(schemas).not.toContain('"@type":"Product"');
    expect(schemas).not.toContain('"OfferShippingDetails"');
    expect(schemas).not.toContain('"shippingDetails"');
    expect(schemas).not.toContain('"deliveryTime"');
  });
});

describe('homepage JSON-LD', () => {
  it('keeps the English homepage entity on the root URL', () => {
    const schema = homepageJsonLd('en');

    expect(schema).toMatchObject({
      '@id': 'https://nusabeetrip.com/#webpage',
      url: 'https://nusabeetrip.com/',
      inLanguage: 'en-US',
      datePublished: '2024-01-01',
      dateModified: '2026-07-31',
    });
    expect(schema.breadcrumb.itemListElement[0]).toMatchObject({
      name: 'Home',
      item: 'https://nusabeetrip.com/',
    });
  });

  it('uses the Indonesian homepage URL and language-specific copy', () => {
    const schema = homepageJsonLd('id');

    expect(schema).toMatchObject({
      '@id': 'https://nusabeetrip.com/id#webpage',
      url: 'https://nusabeetrip.com/id',
      inLanguage: 'id-ID',
    });
    expect(schema.name).toContain('Situs Resmi NusaBeeTrip');
    expect(schema.breadcrumb.itemListElement[0]).toMatchObject({
      name: 'Beranda',
      item: 'https://nusabeetrip.com/id',
    });
  });

  it('does not invent an offer expiry date', () => {
    expect(JSON.stringify(localBusinessEnhancedJsonLd())).not.toContain(
      'priceValidUntil',
    );
  });
});

describe('site navigation JSON-LD', () => {
  it('keeps Indonesian navigation names and URLs inside the Indonesian locale', () => {
    const schema = siteNavigationJsonLd('id');

    expect(schema.name).toBe('Navigasi Utama');
    expect(schema.hasPart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Beranda', url: 'https://nusabeetrip.com/id' }),
        expect.objectContaining({
          name: 'Panduan',
          url: 'https://nusabeetrip.com/id/guides',
        }),
      ]),
    );
    expect(
      schema.hasPart.every((item) =>
        item.url === 'https://nusabeetrip.com/id' || item.url.startsWith('https://nusabeetrip.com/id/'),
      ),
    ).toBe(true);
  });
});

describe('detail service JSON-LD', () => {
  it('keeps price data in an Offer without creating a Product entity', () => {
    const schema = serviceJsonLd({
      name: 'West Trip',
      description: 'A full-day guided tour of western Nusa Penida.',
      price: 390000,
      currency: 'IDR',
      available: false,
      unitText: 'per day',
      image: '/images/west-trip.jpg',
      url: '/tours/west-trip',
    });

    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'West Trip',
      url: 'https://nusabeetrip.com/tours/west-trip',
      offers: {
        '@type': 'Offer',
        price: 390000,
        priceCurrency: 'IDR',
        availability: 'https://schema.org/OutOfStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: 390000,
          priceCurrency: 'IDR',
          unitText: 'per day',
        },
      },
    });
    expect(JSON.stringify(schema)).not.toContain('"@type":"Product"');
  });
});
