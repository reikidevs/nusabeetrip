import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About NusaBeeTrip - Your Trusted Nusa Penida Tour Guide',
  description: 'Learn about NusaBeeTrip and our commitment to providing the best travel experience in Nusa Penida, Bali.',
  keywords: ['about nusabeetrip', 'nusa penida guide', 'bali tour operator', 'pak sidiq'],
};

export default function AboutPage() {
  return (
    <div>
      <h1>About NusaBeeTrip</h1>
      <p>Your trusted partner for Nusa Penida adventures</p>
      {/* About content will be implemented in later tasks */}
    </div>
  );
}