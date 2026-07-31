'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  trackPageView,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics';

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim();
const whatsappConversion =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION?.trim();
const phoneConversion =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION?.trim();
const formConversion =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION?.trim();

function adsDestinationId(conversion?: string): string | undefined {
  const destination = conversion?.split('/')[0];
  return destination && /^AW-\d+$/.test(destination)
    ? destination
    : undefined;
}

const tagDestinations = Array.from(
  new Set(
    [
      googleTagId,
      adsDestinationId(whatsappConversion),
      adsDestinationId(phoneConversion),
      adsDestinationId(formConversion),
    ].filter((value): value is string => Boolean(value)),
  ),
);

const primaryTagId = tagDestinations[0];

/**
 * Loads one Google tag for GA4 and/or Google Ads, records SPA page views,
 * and measures ordinary WhatsApp/phone links that do not have their own
 * explicit analytics handler.
 */
export default function MarketingAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!primaryTagId) return;

    const sendPageView = () => {
      const pagePath = `${pathname || '/'}${window.location.search}`;
      trackPageView(pagePath);
    };

    sendPageView();
    window.addEventListener('google-tag-ready', sendPageView);
    return () => window.removeEventListener('google-tag-ready', sendPageView);
  }, [pathname]);

  useEffect(() => {
    if (!primaryTagId) return;

    const trackContactLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.dataset.analyticsHandled === 'true') return;

      const context =
        anchor.dataset.analyticsContext || `site_link:${pathname || '/'}`;
      const rawHref = anchor.getAttribute('href') || '';

      if (rawHref.toLowerCase().startsWith('tel:')) {
        trackPhoneClick(context);
        return;
      }

      try {
        const hostname = new URL(anchor.href).hostname.toLowerCase();
        if (
          hostname === 'wa.me' ||
          hostname === 'whatsapp.com' ||
          hostname.endsWith('.whatsapp.com')
        ) {
          trackWhatsAppClick(context);
        }
      } catch {
        // Ignore malformed or non-HTTP links; navigation must never break.
      }
    };

    document.addEventListener('click', trackContactLink, true);
    return () => document.removeEventListener('click', trackContactLink, true);
  }, [pathname]);

  if (!primaryTagId) return null;

  const initialization = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    ${JSON.stringify(tagDestinations)}.forEach(function(id) {
      window.gtag('config', id, { send_page_view: false });
    });
    window.dispatchEvent(new Event('google-tag-ready'));
  `;

  return (
    <>
      <Script
        id="google-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: initialization }}
      />
      <Script
        id="google-tag-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryTagId)}`}
        strategy="afterInteractive"
      />
    </>
  );
}
