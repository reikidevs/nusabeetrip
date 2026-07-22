import { SOUVENIRS } from './constants';
import type { SiteLocale } from './site-config';
import type { Souvenir } from '@/types';

type IndonesianSouvenirCopy = Pick<Souvenir, 'name' | 'description' | 'category'>;

const INDONESIAN_SOUVENIR_COPY: Record<string, IndonesianSouvenirCopy> = {
  'nusa-penida-tshirt': {
    name: 'Kaos Nusa Penida',
    description: 'Kaos katun premium dengan desain khas Nusa Penida',
    category: 'Pakaian',
  },
  'kelingking-keychain': {
    name: 'Gantungan Kunci Kelingking Beach',
    description: 'Gantungan kunci buatan tangan dengan ikon Kelingking Beach',
    category: 'Aksesori',
  },
  'nusa-penida-cap': {
    name: 'Topi Nusa Penida',
    description: 'Topi bergaya dengan bordir logo Nusa Penida',
    category: 'Pakaian',
  },
  'island-sticker-pack': {
    name: 'Paket Stiker Pulau',
    description: 'Lima stiker tahan air bergambar landmark Nusa Penida',
    category: 'Alat Tulis',
  },
  'fridge-magnet-set': {
    name: 'Set Magnet Kulkas',
    description: 'Set magnet dengan ilustrasi destinasi Nusa Penida',
    category: 'Dekorasi Rumah',
  },
  'canvas-tote-bag': {
    name: 'Tas Tote Kanvas',
    description: 'Tas tote ramah lingkungan dengan motif Nusa Penida',
    category: 'Tas',
  },
  'postcard-collection': {
    name: 'Koleksi Kartu Pos',
    description: 'Sepuluh kartu pos premium dengan pemandangan Nusa Penida',
    category: 'Alat Tulis',
  },
  'handmade-bracelet': {
    name: 'Gelang Buatan Tangan',
    description: 'Gelang tradisional buatan tangan perajin lokal',
    category: 'Perhiasan',
  },
  'wooden-wall-art': {
    name: 'Hiasan Dinding Kayu',
    description: 'Hiasan dinding kayu buatan tangan berbentuk peta Nusa Penida',
    category: 'Dekorasi Rumah',
  },
};

export function getSouvenirs(locale: SiteLocale = 'en'): Souvenir[] {
  if (locale === 'en') return SOUVENIRS;

  return SOUVENIRS.map((souvenir) => {
    const translation = INDONESIAN_SOUVENIR_COPY[souvenir.slug];
    if (!translation) {
      throw new Error(`Missing Indonesian souvenir copy for "${souvenir.slug}"`);
    }

    return { ...souvenir, ...translation };
  });
}
