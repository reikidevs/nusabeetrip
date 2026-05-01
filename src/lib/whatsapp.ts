import { WhatsAppBookingParams } from '@/types';
import { CONTACT_INFO } from './constants';
import { trackBookingClick } from './analytics';
import type { Language } from './translations';

const WA_NUMBER = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '');

/**
 * Bilingual message templates for different service types
 */
const MESSAGE_TEMPLATES = {
  en: {
    tour: (name: string, price: string, cur: string) =>
      `Hi! I'm interested in booking the ${name} tour (${price} ${cur}).\n\nCould you please provide more information about:\n- Available dates and times\n- What's included in the tour package\n- Meeting point and pickup details\n- Group size and private tour options\n- Payment methods and booking confirmation\n\nThank you!`,
    rental: (name: string, price: string, cur: string) =>
      `Hi! I'm interested in renting the ${name} (${price} ${cur} per day).\n\nCould you please provide more information about:\n- Available dates and rental duration\n- Pickup and drop-off locations\n- What's included (helmet, fuel, insurance)\n- Required documents and deposit\n- Payment methods and booking process\n\nThank you!`,
    souvenir: (name: string, price: string, cur: string) =>
      `Hi! I'm interested in ordering ${name} (${price} ${cur}).\n\nCould you please provide more information about:\n- Product availability and stock\n- Size/color options (if applicable)\n- Shipping or pickup options\n- Payment methods\n- Delivery time\n\nThank you!`,
    general: 'Hi! I would like to know more about your tour and rental services in Nusa Penida. Thank you!',
    bookTour: "Hi! I'm interested in booking a tour.",
    rentVehicle: "Hi! I'm interested in renting a vehicle.",
    orderSouvenir: "Hi! I'm interested in Nusa Penida souvenirs.",
    services: "Hi! I'm interested in NusaBeeTrip services.",
  },
  id: {
    tour: (name: string, price: string, cur: string) =>
      `Halo! Saya tertarik untuk memesan tur ${name} (${price} ${cur}).\n\nBisa tolong informasikan tentang:\n- Tanggal dan waktu yang tersedia\n- Apa saja yang termasuk dalam paket tur\n- Titik kumpul dan detail penjemputan\n- Ukuran grup dan opsi tur privat\n- Metode pembayaran dan konfirmasi booking\n\nTerima kasih!`,
    rental: (name: string, price: string, cur: string) =>
      `Halo! Saya tertarik untuk menyewa ${name} (${price} ${cur} per hari).\n\nBisa tolong informasikan tentang:\n- Tanggal dan durasi sewa yang tersedia\n- Lokasi pengambilan dan pengembalian\n- Apa saja yang termasuk (helm, bensin, asuransi)\n- Dokumen yang diperlukan dan deposit\n- Metode pembayaran dan proses booking\n\nTerima kasih!`,
    souvenir: (name: string, price: string, cur: string) =>
      `Halo! Saya tertarik untuk memesan ${name} (${price} ${cur}).\n\nBisa tolong informasikan tentang:\n- Ketersediaan produk dan stok\n- Pilihan ukuran/warna (jika ada)\n- Opsi pengiriman atau pengambilan\n- Metode pembayaran\n- Waktu pengiriman\n\nTerima kasih!`,
    general: 'Halo! Saya ingin tahu lebih lanjut tentang layanan tur dan sewa kendaraan di Nusa Penida. Terima kasih!',
    bookTour: 'Halo! Saya tertarik untuk memesan tur.',
    rentVehicle: 'Halo! Saya tertarik untuk menyewa kendaraan.',
    orderSouvenir: 'Halo! Saya tertarik dengan souvenir Nusa Penida.',
    services: 'Halo! Saya tertarik dengan layanan NusaBeeTrip.',
  },
} as const;

/**
 * Simple helper to build a WhatsApp link with the given message.
 * Used for inline href attributes in JSX.
 */
export function getWhatsAppLink(
  messageKey: 'bookTour' | 'rentVehicle' | 'orderSouvenir' | 'services' | 'general',
  lang: Language = 'en'
): string {
  const msg = MESSAGE_TEMPLATES[lang][messageKey];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Build a WhatsApp link for a specific product/item order.
 */
export function getWhatsAppItemLink(itemName: string, lang: Language = 'en'): string {
  const msg = lang === 'id'
    ? `Halo! Saya ingin memesan ${itemName}.`
    : `Hi! I'd like to order ${itemName}.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Build a WhatsApp link for a specific vehicle rental.
 */
export function getWhatsAppRentalLink(vehicleName: string, lang: Language = 'en'): string {
  const msg = lang === 'id'
    ? `Halo! Saya ingin menyewa ${vehicleName}.`
    : `Hi! I'd like to rent a ${vehicleName}.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Generates a WhatsApp URL with pre-filled message for booking inquiries
 */
export function generateWhatsAppURL(params: WhatsAppBookingParams & { lang?: Language }): string {
  const { serviceType, serviceName, price, currency, lang = 'en' } = params;
  
  const formattedPrice = new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US').format(price);
  const template = MESSAGE_TEMPLATES[lang][serviceType];
  const message = encodeURIComponent(template(serviceName, formattedPrice, currency));
  
  return `https://wa.me/${WA_NUMBER}?text=${message}`;
}

/**
 * Opens WhatsApp with booking inquiry and tracks analytics
 */
export function openWhatsAppBooking(params: WhatsAppBookingParams & { lang?: Language }): void {
  const whatsappURL = generateWhatsAppURL(params);
  
  // Track booking click for analytics
  trackBookingClick({
    serviceType: params.serviceType,
    serviceName: params.serviceName,
    price: params.price,
    method: 'whatsapp'
  });
  
  // Open WhatsApp in new tab/window
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

/**
 * Validates WhatsApp booking parameters
 */
export function validateWhatsAppParams(params: WhatsAppBookingParams): boolean {
  return !!(
    params.serviceType &&
    params.serviceName &&
    typeof params.price === 'number' &&
    params.price > 0 &&
    params.currency &&
    ['tour', 'rental', 'souvenir'].includes(params.serviceType)
  );
}

/**
 * Generates a general WhatsApp contact URL
 */
export function generateWhatsAppContactURL(message?: string, lang: Language = 'en'): string {
  const defaultMessage = MESSAGE_TEMPLATES[lang].general;
  const finalMessage = message || defaultMessage;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
}

/**
 * Opens general WhatsApp contact
 */
export function openWhatsAppContact(message?: string, lang: Language = 'en'): void {
  const whatsappURL = generateWhatsAppContactURL(message, lang);
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}