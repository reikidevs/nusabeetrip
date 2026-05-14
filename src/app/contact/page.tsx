import { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = buildMetadata({
  title: 'Contact NusaBeeTrip — Book Tours & Rentals via WhatsApp',
  description:
    'Reach NusaBeeTrip on WhatsApp +62 896-3128-1234 for instant booking. Tours, rentals, and souvenirs in Nusa Penida, Bali. Open 06:00 — 22:00 WITA.',
  path: '/contact',
  keywords: [
    'contact nusa penida tour',
    'book nusa penida whatsapp',
    'nusabeetrip phone',
    'tour operator nusa penida contact',
  ],
});

const FAQ = [
  {
    question: 'How do I book a tour with NusaBeeTrip?',
    answer:
      'Contact us via WhatsApp at +62 896-3128-1234 with your preferred tour package, date, and number of participants. We confirm availability within minutes.',
  },
  {
    question: 'Do you offer hotel pickup in Nusa Penida?',
    answer:
      'Yes. Free pickup is included from any hotel or accommodation across Nusa Penida.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Cash (IDR) and bank transfer. Payment is collected on the day of the tour or rental.',
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer:
      'Free cancellation or rescheduling up to 24 hours before your tour. Contact us via WhatsApp.',
  },
  {
    question: 'What are your operating hours?',
    answer:
      'Tours and rentals run 06:00 — 22:00 WITA (GMT+8). WhatsApp support is available 24/7.',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-contact"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <JsonLd id="ld-faq-contact" data={faqJsonLd(FAQ)} />
      <ContactPageContent />
    </>
  );
}
