import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import LegalPage from '@/components/legal/LegalPage';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy policy for NusaBeeTrip bookings, WhatsApp inquiries, contact forms, analytics, and customer support in Nusa Penida, Bali.',
  path: '/privacy',
  keywords: ['nusabeetrip privacy policy', 'nusa penida tour privacy'],
});

const sections = [
  {
    heading: 'Information we collect',
    body: [
      'We collect the details you share when you contact us, request a booking, submit a review, or ask a question. This may include your name, WhatsApp number, email, travel date, group size, pickup area, and booking notes.',
      'We may also collect basic website analytics such as visited pages, device type, approximate location, and booking button clicks so we can improve our website and services.',
    ],
  },
  {
    heading: 'How we use information',
    body: [
      'We use your information to answer inquiries, arrange tours or rentals, confirm availability, provide customer support, and improve the NusaBeeTrip website.',
      'We do not sell personal information. We only share booking details with local team members or service partners when needed to deliver the tour, rental, pickup, or support you requested.',
    ],
  },
  {
    heading: 'WhatsApp and third-party services',
    body: [
      'Most bookings are handled through WhatsApp. When you message us there, WhatsApp processes your data under its own privacy policy.',
      'We may use email, hosting, database, analytics, or form services to operate the website. These providers process data only for website operation, security, communication, and service delivery.',
    ],
  },
  {
    heading: 'Google Maps reviews',
    body: [
      'When the Google reviews panel is available, the website requests selected public place and review information from Google Maps Platform. This may include the Google rating, rating count, review text, rating, publication time, and the author name, photo, and profile link provided by Google.',
      <>
        Google processes information related to this feature under the{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Google Privacy Policy
        </a>
        . NusaBeeTrip does not permanently store the Google review content returned by this feature.
      </>,
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'We keep booking and inquiry details only as long as reasonably needed for customer support, accounting, service quality, dispute handling, and legal obligations.',
      'You can ask us to update or delete your contact details unless we need to keep them for an active booking, safety issue, payment record, or legal reason.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'If you have privacy questions or want to request an update to your information, contact NusaBeeTrip through our contact page.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-privacy"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <LegalPage
        eyebrow="Legal"
        title="Privacy Policy"
        description="How NusaBeeTrip handles booking inquiries, contact details, reviews, and website analytics."
        updatedLabel="Last updated: August 8, 2026"
        sections={sections}
        contactLabel="Need help with your data?"
        contactHref="/contact"
        contactCta="Contact NusaBeeTrip"
      />
    </>
  );
}
