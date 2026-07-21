import { RENTAL_SERVICES, TOUR_PACKAGES } from '@/lib/constants';
import {
  rentalServiceListJsonLd,
  serviceJsonLd,
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
