import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { DESTINATIONS } from '@/lib/destinations';
import { getAllGuides } from '@/lib/guides';
import { RENTAL_SERVICES, TOUR_PACKAGES } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

describe('sitemap', () => {
  it('contains only fetchable page URLs and uses real guide modification dates', () => {
    const entries = sitemap();
    const expectedCount =
      11 * 2 +
      TOUR_PACKAGES.filter((tour) => tour.isActive).length * 2 +
      RENTAL_SERVICES.filter((rental) => rental.isAvailable).length * 2 +
      DESTINATIONS.length * 2 +
      getAllGuides().length * 2;

    expect(entries).toHaveLength(expectedCount);
    expect(entries.every((entry) => !entry.url.includes('#'))).toBe(true);
    expect(
      entries.find((entry) => entry.url === 'https://nusabeetrip.com/')
        ?.lastModified,
    ).toEqual(new Date('2026-08-04'));

    const guide = getAllGuides()[0];
    const guideEntry = entries.find(
      (entry) => entry.url === `https://nusabeetrip.com/guides/${guide.slug}`,
    );
    expect(guideEntry?.lastModified).toEqual(new Date(guide.dateModified));

    const indonesianGuide = getAllGuides('id')[0];
    const indonesianGuideEntry = entries.find(
      (entry) => entry.url === `https://nusabeetrip.com/id/guides/${indonesianGuide.slug}`,
    );
    expect(indonesianGuideEntry?.lastModified).toEqual(
      new Date(indonesianGuide.dateModified),
    );
  });
});

describe('robots', () => {
  it('lets crawlers read HTML noindex directives without blocking rendering assets', () => {
    const config = robots() as any;
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    for (const rule of rules) {
      const disallow = Array.isArray(rule.disallow)
        ? rule.disallow
        : rule.disallow
          ? [rule.disallow]
          : [];

      expect(disallow).not.toContain('/_next/');
      expect(disallow).toContain('/api/');
      expect(disallow).not.toContain('/admin/');
      expect(disallow).not.toContain('/demo');
    }
  });
});

describe('page metadata', () => {
  const description = 'A useful page about visiting Nusa Penida.';

  it('uses a compact brand suffix for inner pages', () => {
    const metadata = buildMetadata({
      title: 'Atuh Beach Nusa Penida',
      description,
      path: '/destinations/atuh-beach',
    });

    expect(metadata.title).toBe('Atuh Beach Nusa Penida | NusaBeeTrip');
  });

  it('does not duplicate the brand in the English homepage title', () => {
    const metadata = buildMetadata({
      title: 'Nusa Penida Tours & Private Driver — Official NusaBeeTrip',
      description,
      path: '/',
    });

    expect(metadata.title).toBe(
      'Nusa Penida Tours & Private Driver — Official NusaBeeTrip',
    );
  });

  it('infers Indonesian language metadata from an /id route', () => {
    const metadata = buildMetadata({
      title: 'Paket Tour Nusa Penida',
      description,
      path: '/id',
    }) as any;

    expect(metadata.title).toBe('Paket Tour Nusa Penida | NusaBeeTrip');
    expect(metadata.other['content-language']).toBe('id');
    expect(metadata.openGraph.locale).toBe('id_ID');
    expect(metadata.openGraph.alternateLocale).toEqual(['en_US']);
  });
});
