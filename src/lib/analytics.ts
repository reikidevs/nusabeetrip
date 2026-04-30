/**
 * Analytics tracking utilities for Google Analytics and custom events
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Google Analytics tracking events
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track booking clicks for analytics
 */
export const trackBookingClick = (params: {
  serviceType: 'tour' | 'rental' | 'souvenir';
  serviceName: string;
  price: number;
  method: 'whatsapp' | 'contact_form';
}) => {
  trackEvent('booking_click', 'engagement', params.serviceName, params.price);
  
  // Custom analytics for business insights
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/booking-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...params,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }),
    }).catch(console.error);
  }
};

/**
 * Track contact form submissions
 */
export const trackContactSubmission = (serviceType?: string) => {
  trackEvent('contact_form_submit', 'engagement', serviceType);
};

/**
 * Track page views
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = (context: string) => {
  trackEvent('whatsapp_click', 'engagement', context);
};

/**
 * Track phone clicks
 */
export const trackPhoneClick = () => {
  trackEvent('phone_click', 'engagement', 'header_phone');
};

/**
 * Track email clicks
 */
export const trackEmailClick = () => {
  trackEvent('email_click', 'engagement', 'header_email');
};

/**
 * Track Instagram clicks
 */
export const trackInstagramClick = () => {
  trackEvent('instagram_click', 'engagement', 'social_media');
};