import { TourPackage, RentalService, BusinessInfo, ContactInfo } from '@/types';

// Business contact information
export const CONTACT_INFO: ContactInfo = {
  phone: '+62 896-3128-1234',
  whatsapp: '+62 896-3128-1234',
  email: 'sidiqdwiatmoko@gmail.com',
  instagram: 'sidiq_1312',
};

// Business information
export const BUSINESS_INFO: BusinessInfo = {
  name: 'NusaBeeTrip',
  location: 'Nusa Penida, Bali',
  description: 'Professional tour and rental services in Nusa Penida, offering the best travel experience with local expertise and personalized service.',
  contactInfo: CONTACT_INFO,
};

// Tour packages data
export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'west-trip',
    name: 'West Trip',
    slug: 'west-trip',
    description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach and Angel Billabong',
    price: 390000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: [
      'Kelingking Beach',
      'Angel Billabong',
      'Broken Beach',
      'Crystal Bay',
      'Professional Guide',
      'Transportation Included'
    ],
    image: '/images/tours/west-trip.jpg',
    isActive: true,
  },
  {
    id: 'east-trip',
    name: 'East Trip',
    slug: 'east-trip',
    description: 'Discover the eastern wonders of Nusa Penida with stunning beaches and breathtaking viewpoints',
    price: 430000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: [
      'Atuh Beach',
      'Diamond Beach',
      'Tree House',
      'Thousand Islands Viewpoint',
      'Professional Guide',
      'Transportation Included'
    ],
    image: '/images/tours/east-trip.jpg',
    isActive: true,
  },
  {
    id: 'west-trip-snorkeling',
    name: 'West Trip + Snorkeling',
    slug: 'west-trip-snorkeling',
    description: 'West trip combined with an amazing snorkeling experience in crystal clear waters',
    price: 550000,
    currency: 'IDR',
    duration: 10,
    includesSnorkeling: true,
    features: [
      'Kelingking Beach',
      'Angel Billabong',
      'Broken Beach',
      'Crystal Bay',
      'Snorkeling Equipment',
      'Underwater Guide',
      'Professional Guide',
      'Transportation Included'
    ],
    image: '/images/tours/west-trip-snorkeling.jpg',
    isActive: true,
  },
  {
    id: 'east-trip-snorkeling',
    name: 'East Trip + Snorkeling',
    slug: 'east-trip-snorkeling',
    description: 'East trip with snorkeling adventure in the pristine waters around Nusa Penida',
    price: 550000,
    currency: 'IDR',
    duration: 10,
    includesSnorkeling: true,
    features: [
      'Atuh Beach',
      'Diamond Beach',
      'Tree House',
      'Thousand Islands Viewpoint',
      'Snorkeling Equipment',
      'Underwater Guide',
      'Professional Guide',
      'Transportation Included'
    ],
    image: '/images/tours/east-trip-snorkeling.jpg',
    isActive: true,
  },
  {
    id: 'mix-trip',
    name: 'Mix Trip (West & East)',
    slug: 'mix-trip',
    description: 'Combined experience of both western and eastern attractions for the ultimate Nusa Penida adventure',
    price: 500000,
    currency: 'IDR',
    duration: 12,
    includesSnorkeling: false,
    features: [
      'Best of West Attractions',
      'Best of East Attractions',
      'Full Island Experience',
      'Lunch Included',
      'Professional Guide',
      'Transportation Included'
    ],
    image: '/images/tours/mix-trip.jpg',
    isActive: true,
  },
];

// Rental services data
export const RENTAL_SERVICES: RentalService[] = [
  {
    id: 'nmax-motorcycle',
    vehicleType: 'motorcycle',
    model: 'N-Max',
    slug: 'nmax-motorcycle',
    pricePerDay: 125000,
    currency: 'IDR',
    features: [
      'Automatic Transmission',
      'Comfortable Seat',
      'Storage Space',
      'Helmet Included',
      'Full Tank',
      '24/7 Support'
    ],
    image: '/images/rentals/nmax.jpg',
    isAvailable: true,
  },
  {
    id: 'vario-motorcycle',
    vehicleType: 'motorcycle',
    model: 'Vario',
    slug: 'vario-motorcycle',
    pricePerDay: 100000,
    currency: 'IDR',
    features: [
      'Automatic Transmission',
      'Fuel Efficient',
      'Easy Handling',
      'Helmet Included',
      'Full Tank',
      '24/7 Support'
    ],
    image: '/images/rentals/vario.jpg',
    isAvailable: true,
  },
  {
    id: 'scoopy-motorcycle',
    vehicleType: 'motorcycle',
    model: 'Scoopy',
    slug: 'scoopy-motorcycle',
    pricePerDay: 100000,
    currency: 'IDR',
    features: [
      'Automatic Transmission',
      'Lightweight',
      'Perfect for Beginners',
      'Helmet Included',
      'Full Tank',
      '24/7 Support'
    ],
    image: '/images/rentals/scoopy.jpg',
    isAvailable: true,
  },
  {
    id: 'car-rental',
    vehicleType: 'car',
    model: 'Car Rental',
    slug: 'car-rental',
    pricePerDay: 500000,
    pricePerHour: 125000, // 4-hour minimum
    currency: 'IDR',
    features: [
      'Air Conditioning',
      'Driver Included',
      '4-Hour Minimum',
      'Comfortable for 4-6 People',
      'Full Insurance',
      'Professional Driver'
    ],
    image: '/images/rentals/car.jpg',
    isAvailable: true,
  },
];

// SEO target keywords
export const TARGET_KEYWORDS = [
  'best travel nusa penida',
  'nusa penida tour',
  'nusa penida rental',
  'bali island tour',
  'nusa penida west trip',
  'nusa penida east trip',
  'kelingking beach tour',
  'diamond beach tour',
  'nusa penida motorcycle rental',
  'nusa penida car rental',
];

// Social media links
export const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    url: `https://instagram.com/${CONTACT_INFO.instagram}`,
    icon: 'instagram',
  },
  {
    platform: 'WhatsApp',
    url: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`,
    icon: 'whatsapp',
  },
];

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Site configuration
export const SITE_CONFIG = {
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
  url: 'https://nusabeetrip.com',
  ogImage: '/images/og-image.jpg',
  links: {
    instagram: `https://instagram.com/${CONTACT_INFO.instagram}`,
    whatsapp: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`,
    email: `mailto:${CONTACT_INFO.email}`,
    phone: `tel:${CONTACT_INFO.phone}`,
  },
};