import {
  generateWhatsAppURL,
  openWhatsAppBooking,
  validateWhatsAppParams,
  generateWhatsAppContactURL,
  openWhatsAppContact,
} from '../whatsapp';
import * as analytics from '../analytics';
import { WhatsAppBookingParams } from '@/types';

// Mock analytics
jest.mock('../analytics', () => ({
  trackBookingClick: jest.fn(),
}));

// Mock constants
jest.mock('../constants', () => ({
  CONTACT_INFO: {
    whatsapp: '+62 896-3128-1234',
  },
}));

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

describe('WhatsApp Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateWhatsAppURL', () => {
    it('generates correct URL for tour service', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 390000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      
      expect(url).toContain('https://wa.me/6289631281234');
      expect(url).toContain('text=');
      
      // Decode the message to check content
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');
      
      expect(message).toContain('West Trip tour');
      expect(message).toContain('390.000 IDR');
      expect(message).toContain('Available dates and times');
      expect(message).toContain('tour package');
    });

    it('generates correct URL for rental service', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'rental',
        serviceName: 'N-Max',
        price: 125000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');
      
      expect(message).toContain('N-Max');
      expect(message).toContain('125.000 IDR per day');
      expect(message).toContain('rental duration');
      expect(message).toContain('helmet, fuel, insurance');
    });

    it('formats Indonesian numbers correctly', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'Mix Trip',
        price: 1500000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');
      
      expect(message).toContain('1.500.000 IDR');
    });

    it('removes non-numeric characters from phone number', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'Test',
        price: 100000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      
      // Check that the phone number part is correctly formatted
      expect(url).toContain('wa.me/6289631281234');
      expect(url).toMatch(/wa\.me\/\d+\?text=/);
      
      // Verify phone number doesn't have special characters
      const phoneMatch = url.match(/wa\.me\/(\d+)/);
      expect(phoneMatch).toBeTruthy();
      expect(phoneMatch![1]).toBe('6289631281234');
    });
  });

  describe('validateWhatsAppParams', () => {
    it('validates correct parameters', () => {
      const validParams: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 390000,
        currency: 'IDR',
      };

      expect(validateWhatsAppParams(validParams)).toBe(true);
    });

    it('rejects invalid service type', () => {
      const invalidParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'invalid' as any,
        serviceName: 'West Trip',
        price: 390000,
        currency: 'IDR',
      };

      expect(validateWhatsAppParams(invalidParams)).toBe(false);
    });

    it('rejects missing service name', () => {
      const invalidParams: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: '',
        price: 390000,
        currency: 'IDR',
      };

      expect(validateWhatsAppParams(invalidParams)).toBe(false);
    });

    it('rejects invalid price', () => {
      const invalidParams: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 0,
        currency: 'IDR',
      };

      expect(validateWhatsAppParams(invalidParams)).toBe(false);
    });

    it('rejects negative price', () => {
      const invalidParams: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: -100,
        currency: 'IDR',
      };

      expect(validateWhatsAppParams(invalidParams)).toBe(false);
    });

    it('rejects missing currency', () => {
      const invalidParams: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 390000,
        currency: '',
      };

      expect(validateWhatsAppParams(invalidParams)).toBe(false);
    });
  });

  describe('openWhatsAppBooking', () => {
    it('opens WhatsApp and tracks analytics', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 390000,
        currency: 'IDR',
      };

      openWhatsAppBooking(params);

      expect(analytics.trackBookingClick).toHaveBeenCalledWith({
        serviceType: 'tour',
        serviceName: 'West Trip',
        price: 390000,
        method: 'whatsapp',
      });

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/6289631281234'),
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('generateWhatsAppContactURL', () => {
    it('generates URL with default message', () => {
      const url = generateWhatsAppContactURL();
      
      expect(url).toContain('wa.me/6289631281234');
      
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');
      
      expect(message).toContain('tour and rental services');
      expect(message).toContain('Nusa Penida');
    });

    it('generates URL with custom message', () => {
      const customMessage = 'I need information about your services';
      const url = generateWhatsAppContactURL(customMessage);
      
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');
      
      expect(message).toBe(customMessage);
    });
  });

  describe('openWhatsAppContact', () => {
    it('opens WhatsApp with default message', () => {
      openWhatsAppContact();

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/6289631281234'),
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('opens WhatsApp with custom message', () => {
      const customMessage = 'Custom inquiry message';
      openWhatsAppContact(customMessage);

      const expectedUrl = expect.stringContaining(encodeURIComponent(customMessage));
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expectedUrl,
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Message Templates', () => {
    it('includes all required information for tour bookings', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'tour',
        serviceName: 'East Trip',
        price: 430000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');

      // Check for all required tour information
      expect(message).toContain('Available dates and times');
      expect(message).toContain('What\'s included in the tour package');
      expect(message).toContain('Meeting point and pickup details');
      expect(message).toContain('Group size and private tour options');
      expect(message).toContain('Payment methods and booking confirmation');
    });

    it('includes all required information for rental bookings', () => {
      const params: WhatsAppBookingParams = {
        phoneNumber: '+62 896-3128-1234',
        serviceType: 'rental',
        serviceName: 'Vario',
        price: 100000,
        currency: 'IDR',
      };

      const url = generateWhatsAppURL(params);
      const urlObj = new URL(url);
      const message = decodeURIComponent(urlObj.searchParams.get('text') || '');

      // Check for all required rental information
      expect(message).toContain('Available dates and rental duration');
      expect(message).toContain('Pickup and drop-off locations');
      expect(message).toContain('What\'s included (helmet, fuel, insurance)');
      expect(message).toContain('Required documents and deposit');
      expect(message).toContain('Payment methods and booking process');
    });
  });
});