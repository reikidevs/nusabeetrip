import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import LegalPage from '@/components/legal/LegalPage';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for NusaBeeTrip tours, snorkeling trips, vehicle rentals, bookings, cancellations, payments, and customer responsibilities.',
  path: '/terms',
  keywords: ['nusabeetrip terms', 'nusa penida tour terms', 'nusa penida rental terms'],
});

const sections = [
  {
    heading: 'Bookings',
    body: [
      'Bookings are confirmed after we verify availability through WhatsApp, email, phone, or another official NusaBeeTrip channel.',
      'Please provide accurate travel dates, group size, pickup location, and contact details. Delayed or incorrect information may affect pickup time, route planning, or service availability.',
    ],
  },
  {
    heading: 'Prices and payments',
    body: [
      'Prices are shown in IDR unless stated otherwise. Package inclusions may vary by service and will be confirmed before booking.',
      'Payment terms are agreed during confirmation. Some services may require a deposit, while others can be paid on the service day.',
    ],
  },
  {
    heading: 'Cancellations and changes',
    body: [
      'If you need to cancel or reschedule, contact us as early as possible. We will help where availability allows.',
      'Weather, sea conditions, road closures, temple ceremonies, or safety concerns may require route changes, rescheduling, or cancellation. Safety decisions are made by the local team.',
    ],
  },
  {
    heading: 'Guest responsibilities',
    body: [
      'Guests are responsible for following guide instructions, wearing safety equipment when provided, respecting local rules, and arriving on time for pickup or rental handover.',
      'For vehicle rentals, guests must be legally allowed and physically able to drive. Damage, fines, late returns, or misuse may result in additional charges.',
    ],
  },
  {
    heading: 'Limitation of service',
    body: [
      'We work hard to deliver reliable tours and rentals, but travel in Nusa Penida can be affected by weather, traffic, sea conditions, and local events beyond our control.',
      'NusaBeeTrip is not responsible for indirect losses, missed third-party connections, or personal expenses caused by delays or conditions outside our reasonable control.',
    ],
  },
  {
    heading: 'Google Maps content',
    body: [
      <>
        The Google Maps profile, review form, and public review panel are Google services. Their use is also governed by the{' '}
        <a
          href="https://maps.google.com/help/terms_maps/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Google Maps/Google Earth Additional Terms of Service
        </a>{' '}
        and the{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Google Terms of Service
        </a>
        , the{' '}
        <a
          href="https://cloud.google.com/maps-platform/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Google Maps Platform Terms of Service
        </a>
        , and the{' '}
        <a
          href="https://cloud.google.com/maps-platform/terms/maps-service-terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Google Maps Platform Service Specific Terms
        </a>
        .
      </>,
      'Google selects and orders the public reviews it returns. NusaBeeTrip does not represent Google review content as a website review or guarantee that every Google review will appear on this website.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-terms"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      <LegalPage
        eyebrow="Legal"
        title="Terms of Service"
        description="Booking terms for NusaBeeTrip tours, snorkeling trips, rentals, payments, and cancellations."
        updatedLabel="Last updated: August 8, 2026"
        sections={sections}
        contactLabel="Questions before booking?"
        contactHref="/contact"
        contactCta="Contact NusaBeeTrip"
      />
    </>
  );
}
