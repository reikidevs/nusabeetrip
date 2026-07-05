import type { Metadata } from 'next';
import ContactPage from '../../contact/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Kontak & Booking NusaBeeTrip',
  description:
    'Hubungi NusaBeeTrip untuk booking tour Nusa Penida, snorkeling Manta Ray, sewa motor, mobil dengan sopir, dan souvenir lokal. Respon cepat via WhatsApp.',
  path: '/id/contact',
  keywords: [
    'booking tour nusa penida',
    'kontak nusabeetrip',
    'whatsapp tour nusa penida',
  ],
  image: '/images/NusaBeeTrip-Logo-final.png',
  imageAlt: 'Kontak NusaBeeTrip',
});

export default ContactPage;
