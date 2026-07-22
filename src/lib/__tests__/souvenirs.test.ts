import { SOUVENIRS } from '@/lib/constants';
import { getSouvenirs } from '@/lib/souvenirs';

describe('localized souvenirs', () => {
  it('provides complete Indonesian copy without changing product facts', () => {
    const english = getSouvenirs('en');
    const indonesian = getSouvenirs('id');

    expect(english).toHaveLength(SOUVENIRS.length);
    expect(indonesian).toHaveLength(english.length);

    english.forEach((item, index) => {
      expect(indonesian[index]).toMatchObject({
        slug: item.slug,
        price: item.price,
        currency: item.currency,
        image: item.image,
        isAvailable: item.isAvailable,
      });
      expect(indonesian[index].name).not.toBe(item.name);
      expect(indonesian[index].description).not.toBe(item.description);
      expect(indonesian[index].category).not.toBe(item.category);
    });
  });
});
