import { WhatsAppBookingParams } from '@/types';
import { CONTACT_INFO } from './constants';
import { trackBookingClick } from './analytics';

/**
 * Message templates for different service types
 */
const MESSAGE_TEMPLATES = {
  tour: (serviceName: string, formattedPrice: string, currency: string) => `Hi! I'm interested in booking the ${serviceName} tour (${formattedPrice} ${currency}).

Could you please provide more information about:
- Available dates and times
- What's included in the tour package
- Meeting point and pickup details
- Group size and private tour options
- Payment methods and booking confirmation

Thank you!`,

  rental: (serviceName: string, formattedPrice: string, currency: string) => `Hi! I'm interested in renting the ${serviceName} (${formattedPrice} ${currency} per day).

Could you please provide more information about:
- Available dates and rental duration
- Pickup and drop-off locations
- What's included (helmet, fuel, insurance)
- Required documents and deposit
- Payment methods and booking process

Thank you!`,

  souvenir: (serviceName: string, formattedPrice: string, currency: string) => `Hi! I'm interested in ordering ${serviceName} (${formattedPrice} ${currency}).

Could you please provide more information about:
- Product availability and stock
- Size/color options (if applicable)
- Shipping or pickup options
- Payment methods
- Delivery time

Thank you!`,
} as const;

/**
 * Generates a WhatsApp URL with pre-filled message for booking inquiries
 */
export function generateWhatsAppURL(params: WhatsAppBookingParams): string {
  const { serviceType, serviceName, price, currency } = params;
  
  const formattedPrice = new Intl.NumberFormat('id-ID').format(price);
  const template = MESSAGE_TEMPLATES[serviceType];
  const message = encodeURIComponent(template(serviceName, formattedPrice, currency));
  
  const phoneNumber = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

/**
 * Opens WhatsApp with booking inquiry and tracks analytics
 */
export function openWhatsAppBooking(params: WhatsAppBookingParams): void {
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
export function generateWhatsAppContactURL(message?: string): string {
  const phoneNumber = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    'Hi! I would like to know more about your tour and rental services in Nusa Penida. Thank you!'
  );
  
  const finalMessage = message ? encodeURIComponent(message) : defaultMessage;
  return `https://wa.me/${phoneNumber}?text=${finalMessage}`;
}

/**
 * Opens general WhatsApp contact
 */
export function openWhatsAppContact(message?: string): void {
  const whatsappURL = generateWhatsAppContactURL(message);
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}