import {
  getAllGuides,
  getDestinationRelatedGuideLinks,
  getGuideBySlug,
  getGuideRelatedDestinationLinks,
  getTourRelatedGuideLinks,
} from '@/lib/guides';
import { GUIDE_ID_TRANSLATIONS } from '@/lib/guides-id';

describe('Indonesian guide content', () => {
  it('provides a complete, structurally equivalent translation for every guide', () => {
    const englishGuides = getAllGuides('en');
    const indonesianGuides = getAllGuides('id');

    expect(indonesianGuides).toHaveLength(englishGuides.length);
    expect(Object.keys(GUIDE_ID_TRANSLATIONS).sort()).toEqual(
      englishGuides.map((guide) => guide.slug).sort(),
    );

    for (const englishGuide of englishGuides) {
      const indonesianGuide = indonesianGuides.find(
        (guide) => guide.slug === englishGuide.slug,
      );

      expect(indonesianGuide).toBeDefined();
      expect(indonesianGuide?.title).not.toBe(englishGuide.title);
      expect(indonesianGuide?.excerpt).not.toBe(englishGuide.excerpt);
      expect(indonesianGuide?.excerpt.length).toBeLessThanOrEqual(165);
      expect(indonesianGuide?.datePublished).toBe('2026-07-22');
      expect(indonesianGuide?.dateModified).toBe(
        englishGuide.dateModified > '2026-07-22'
          ? englishGuide.dateModified
          : '2026-07-22',
      );
      expect(indonesianGuide?.sections).toHaveLength(englishGuide.sections.length);
      expect(indonesianGuide?.sections).not.toEqual(englishGuide.sections);
      expect(indonesianGuide?.faq ?? []).toHaveLength(englishGuide.faq?.length ?? 0);
      expect(indonesianGuide?.howTo?.steps ?? []).toHaveLength(
        englishGuide.howTo?.steps.length ?? 0,
      );

      if (englishGuide.faq?.length) {
        expect(indonesianGuide?.faq).not.toEqual(englishGuide.faq);
      }
      if (englishGuide.howTo?.steps.length) {
        expect(indonesianGuide?.howTo).not.toEqual(englishGuide.howTo);
      }

      indonesianGuide?.sections.forEach((section, index) => {
        expect(section.paragraphs).toHaveLength(
          englishGuide.sections[index].paragraphs.length,
        );
        expect(section.bullets ?? []).toHaveLength(
          englishGuide.sections[index].bullets?.length ?? 0,
        );
      });
    }
  });

  it('keeps related destination and guide links inside the Indonesian locale', () => {
    const guide = getGuideBySlug('nusa-penida-day-trip-from-ubud', 'id');

    expect(guide?.title).toContain('Ubud');
    expect(guide).not.toBeNull();

    const destinationLinks = getGuideRelatedDestinationLinks(guide!, 'id');
    expect(destinationLinks.length).toBeGreaterThan(0);
    expect(
      destinationLinks.every((link) => link.href.startsWith('/id/destinations/')),
    ).toBe(true);

    const guideLinks = getDestinationRelatedGuideLinks(
      ['nusa-penida-day-trip-from-ubud'],
      'id',
    );
    expect(guideLinks[0]?.href).toBe(
      '/id/guides/nusa-penida-day-trip-from-ubud',
    );
    expect(guideLinks[0]?.label).toBe(guide?.title);
  });

  it('consolidates the Ubud search-query cluster on one canonical guide', () => {
    const guide = getGuideBySlug('nusa-penida-day-trip-from-ubud', 'en');

    expect(guide?.title).toBe(
      'Ubud to Nusa Penida: Distance, Ferry & Day Trip',
    );
    expect(guide?.keywords).toEqual(
      expect.arrayContaining([
        'ubud to nusa penida',
        'ubud to nusa penida distance',
        'how far is nusa penida from ubud',
        'nusa penida to ubud',
        'nusa penida day tour from ubud',
      ]),
    );
    expect(guide?.faq?.map((item) => item.question)).toEqual(
      expect.arrayContaining([
        'How far is Nusa Penida from Ubud?',
        'How do I get from Nusa Penida back to Ubud?',
        'Is Ubud pickup included in a Nusa Penida tour?',
      ]),
    );

    for (const tourSlug of ['west-trip', 'mix-trip']) {
      expect(
        getTourRelatedGuideLinks(tourSlug, 'en').map((link) => link.href),
      ).toContain('/guides/nusa-penida-day-trip-from-ubud');
    }
  });
});
