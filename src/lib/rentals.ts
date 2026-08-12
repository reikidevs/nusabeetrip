import type { RentalService } from '@/types';
import type { Language } from '@/lib/translations';

const INDONESIAN_FEATURE_LABELS: Record<string, string> = {
  'automatic transmission': 'Transmisi otomatis',
  'comfortable seat': 'Jok nyaman',
  'storage space': 'Ruang penyimpanan',
  'helmet included': 'Helm termasuk',
  'full tank': 'Tangki penuh',
  'whatsapp support 08:00-22:00 wita': 'Dukungan WhatsApp 08.00–22.00 WITA',
  'fuel efficient': 'Hemat BBM',
  'easy handling': 'Mudah dikendarai',
  lightweight: 'Ringan',
  'perfect for beginners': 'Cocok untuk pemula',
  'air conditioning': 'AC',
  'professional driver': 'Sopir profesional',
  'driver included': 'Sopir termasuk',
  'comfortable for 4-6 people': 'Nyaman untuk 4–6 orang',
  'full insurance': 'Asuransi penuh',
  'insurance covered': 'Dilindungi asuransi',
  'fuel included': 'BBM termasuk',
  'flexible routes': 'Rute fleksibel',
  'local driver knowledge': 'Sopir berpengalaman lokal',
};

function hasFeature(rental: RentalService, pattern: RegExp): boolean {
  return rental.features.some((feature) => pattern.test(feature.trim()));
}

export function localizeRentalFeature(
  feature: string,
  language: Language,
): string {
  if (language === 'en') return feature;
  return INDONESIAN_FEATURE_LABELS[feature.trim().toLowerCase()] || feature;
}

/**
 * Return only inclusions explicitly present in the selected vehicle's features.
 * This prevents motorcycle-only benefits from leaking onto car pages (and vice versa).
 */
export function getRentalIncludedBenefits(
  rental: RentalService,
  language: Language,
): string[] {
  const benefits: string[] = [];
  const add = (matches: boolean, en: string, id: string) => {
    if (matches) benefits.push(language === 'id' ? id : en);
  };

  if (rental.vehicleType === 'car') {
    add(
      hasFeature(rental, /(?:professional driver|driver included)/i),
      'a professional driver',
      'sopir profesional',
    );
  }

  add(hasFeature(rental, /helmet included/i), 'a helmet', 'helm');
  add(hasFeature(rental, /full tank/i), 'a full tank', 'tangki penuh');
  add(hasFeature(rental, /fuel included/i), 'fuel', 'BBM');
  add(
    hasFeature(rental, /insurance/i),
    'insurance',
    'asuransi',
  );
  add(
    hasFeature(rental, /whatsapp support 08:00-22:00 wita/i),
    'WhatsApp support from 08:00 to 22:00 WITA',
    'dukungan WhatsApp pukul 08.00–22.00 WITA',
  );

  return benefits;
}

export function formatRentalList(
  items: string[],
  language: Language,
): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];

  const conjunction = language === 'id' ? 'dan' : 'and';
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;

  return `${items.slice(0, -1).join(', ')}, ${conjunction} ${items.at(-1)}`;
}

export function getRentalTerms(
  rental: RentalService,
  language: Language,
): string[] {
  const terms =
    rental.vehicleType === 'motorcycle'
      ? language === 'id'
        ? [
            'SIM sepeda motor yang masih berlaku diperlukan',
            'Usia minimum: 18 tahun',
          ]
        : [
            'A valid motorcycle driving license is required',
            'Minimum age: 18 years',
          ]
      : [];

  const benefits = getRentalIncludedBenefits(rental, language);
  if (benefits.length > 0) {
    terms.push(
      language === 'id'
        ? `Khusus kendaraan ini termasuk ${formatRentalList(benefits, language)}`
        : `This vehicle includes ${formatRentalList(benefits, language)}`,
    );
  }

  return terms;
}
