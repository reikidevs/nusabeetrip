import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Book Your Nusa Penida Adventure | NusaBeeTrip',
  description: 'Contact NusaBeeTrip for tour bookings and vehicle rentals in Nusa Penida. WhatsApp, phone, email, and Instagram available.',
  keywords: ['contact nusabeetrip', 'book nusa penida tour', 'nusa penida booking', 'tour inquiry'],
};

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch for bookings and inquiries</p>
      {/* Contact form and information will be implemented in later tasks */}
    </div>
  );
}