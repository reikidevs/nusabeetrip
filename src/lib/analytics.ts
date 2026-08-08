/**
 * Analytics tracking utilities for Google Analytics and custom events
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParameters = Record<string, string | number | boolean | undefined>;

function sendGoogleEvent(action: string, parameters: EventParameters) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
}

function sendGoogleAdsConversion(sendTo?: string) {
  if (
    typeof window !== 'undefined' &&
    window.gtag &&
    sendTo &&
    /^AW-\d+\/[\w-]+$/.test(sendTo)
  ) {
    window.gtag('event', 'conversion', { send_to: sendTo });
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
  sendGoogleEvent(action, {
    event_category: category,
    event_label: label,
    value,
  });
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

  if (params.method === 'whatsapp') {
    trackWhatsAppClick(`booking:${params.serviceType}:${params.serviceName}`);
  }
  
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
  sendGoogleEvent('generate_lead', {
    method: 'Contact form',
    lead_source: serviceType || 'contact',
  });
  sendGoogleAdsConversion(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION,
  );
};

/**
 * Track page views
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = (context: string) => {
  trackEvent('whatsapp_click', 'engagement', context);
  sendGoogleEvent('generate_lead', {
    method: 'WhatsApp',
    lead_source: context,
  });
  sendGoogleAdsConversion(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION,
  );
};

/**
 * Track phone clicks
 */
export const trackPhoneClick = (context = 'sitewide_phone') => {
  trackEvent('phone_click', 'engagement', context);
  sendGoogleEvent('generate_lead', {
    method: 'Phone',
    lead_source: context,
  });
  sendGoogleAdsConversion(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION,
  );
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

/** Track hand-offs from the website to the official Google review flow. */
export const trackGoogleReviewClick = (context: string) => {
  trackEvent('google_review_click', 'engagement', context);
};
