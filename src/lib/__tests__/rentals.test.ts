import { RENTAL_SERVICES } from '@/lib/constants';
import {
  formatRentalList,
  getRentalIncludedBenefits,
  getRentalTerms,
  localizeRentalFeature,
} from '@/lib/rentals';

describe('rental facts', () => {
  const motorcycle = RENTAL_SERVICES.find(
    (rental) => rental.slug === 'nmax-motorcycle',
  )!;
  const car = RENTAL_SERVICES.find((rental) => rental.slug === 'car-rental')!;

  it('uses only the motorcycle inclusions declared in its features', () => {
    const benefits = getRentalIncludedBenefits(motorcycle, 'en');

    expect(benefits).toEqual([
      'a helmet',
      'a full tank',
      'WhatsApp support from 08:00 to 22:00 WITA',
    ]);
    expect(benefits).not.toContain('insurance');
    expect(benefits).not.toContain('a professional driver');
  });

  it('uses only the car inclusions declared in its features', () => {
    const benefits = getRentalIncludedBenefits(car, 'en');

    expect(benefits).toEqual(['a professional driver', 'fuel', 'insurance']);
    expect(benefits).not.toContain('a helmet');
    expect(benefits).not.toContain('a full tank');
  });

  it('makes licence and age terms motorcycle-specific', () => {
    const motorcycleTerms = getRentalTerms(motorcycle, 'en');
    const carTerms = getRentalTerms(car, 'en');

    expect(motorcycleTerms.join(' ')).toContain('driving license');
    expect(motorcycleTerms.join(' ')).toContain('Minimum age');
    expect(carTerms.join(' ')).not.toContain('driving license');
    expect(carTerms.join(' ')).not.toContain('Minimum age');
  });

  it('localizes known feature labels and lists for Indonesian pages', () => {
    expect(localizeRentalFeature('Full Insurance', 'id')).toBe(
      'Asuransi penuh',
    );
    expect(
      formatRentalList(getRentalIncludedBenefits(car, 'id'), 'id'),
    ).toBe('sopir profesional, BBM, dan asuransi');
  });
});
