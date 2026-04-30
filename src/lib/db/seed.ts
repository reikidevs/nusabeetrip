import { db } from './config';
import { tourPackages, rentalServices, seoData } from './schema';

// Initial tour packages data
const initialTourPackages = [
  {
    name: 'West Trip',
    slug: 'west-trip',
    description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach',
    priceIdr: 390000,
    durationHours: 8,
    includesSnorkeling: false,
    features: [
      'Kelingking Beach',
      'Angel Billabong',
      'Broken Beach',
      'Crystal Bay',
      'Professional Guide',
      'Transportation',
      'Entrance Fees'
    ],
    imageUrl: '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg',
    isActive: true,
  },
  {
    name: 'East Trip',
    slug: 'east-trip',
    description: 'Discover the eastern wonders of Nusa Penida with breathtaking viewpoints',
    priceIdr: 430000,
    durationHours: 8,
    includesSnorkeling: false,
    features: [
      'Atuh Beach',
      'Diamond Beach',
      'Tree House',
      'Thousand Islands Viewpoint',
      'Professional Guide',
      'Transportation',
      'Entrance Fees'
    ],
    imageUrl: '/images/East%20Trip/WhatsApp%20Image%202026-04-19%20at%2020.32.36.jpeg',
    isActive: true,
  },
  {
    name: 'West Trip + Snorkeling',
    slug: 'west-trip-snorkeling',
    description: 'West trip combined with amazing snorkeling experience at Crystal Bay',
    priceIdr: 550000,
    durationHours: 10,
    includesSnorkeling: true,
    features: [
      'Kelingking Beach',
      'Angel Billabong',
      'Broken Beach',
      'Crystal Bay Snorkeling',
      'Snorkeling Equipment',
      'Underwater Guide',
      'Professional Guide',
      'Transportation',
      'Entrance Fees'
    ],
    imageUrl: '/images/Crystal%20Bay%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.14.jpeg',
    isActive: true,
  },
  {
    name: 'East Trip + Snorkeling',
    slug: 'east-trip-snorkeling',
    description: 'East trip with snorkeling adventure at the best spots',
    priceIdr: 550000,
    durationHours: 10,
    includesSnorkeling: true,
    features: [
      'Atuh Beach',
      'Diamond Beach',
      'Tree House',
      'Thousand Islands Viewpoint',
      'Snorkeling at Best Spots',
      'Snorkeling Equipment',
      'Underwater Guide',
      'Professional Guide',
      'Transportation',
      'Entrance Fees'
    ],
    imageUrl: '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.15.jpeg',
    isActive: true,
  },
  {
    name: 'Mix Trip (West & East)',
    slug: 'mix-trip',
    description: 'Combined west and east attractions tour for the complete Nusa Penida experience',
    priceIdr: 500000,
    durationHours: 12,
    includesSnorkeling: false,
    features: [
      'Best of West Attractions',
      'Best of East Attractions',
      'Full Island Experience',
      'Professional Guide',
      'Transportation',
      'Entrance Fees'
    ],
    imageUrl: '/images/Atuh%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.35.33.jpeg',
    isActive: true,
  },
];

// Initial rental services data
const initialRentalServices = [
  {
    vehicleType: 'motorcycle',
    model: 'N-Max',
    slug: 'nmax-motorcycle',
    pricePerDayIdr: 125000,
    pricePerHourIdr: null,
    features: [
      'Automatic Transmission',
      'Comfortable Seat',
      'Storage Space',
      'Helmet Included',
      'Full Tank',
      'Insurance Covered'
    ],
    imageUrl: '/images/rentals/nmax.jpg',
    isAvailable: true,
  },
  {
    vehicleType: 'motorcycle',
    model: 'Vario',
    slug: 'vario-motorcycle',
    pricePerDayIdr: 100000,
    pricePerHourIdr: null,
    features: [
      'Automatic Transmission',
      'Fuel Efficient',
      'Easy Handling',
      'Helmet Included',
      'Full Tank',
      'Insurance Covered'
    ],
    imageUrl: '/images/rentals/vario.jpg',
    isAvailable: true,
  },
  {
    vehicleType: 'motorcycle',
    model: 'Scoopy',
    slug: 'scoopy-motorcycle',
    pricePerDayIdr: 100000,
    pricePerHourIdr: null,
    features: [
      'Automatic Transmission',
      'Lightweight',
      'Perfect for Beginners',
      'Helmet Included',
      'Full Tank',
      'Insurance Covered'
    ],
    imageUrl: '/images/rentals/scoopy.jpg',
    isAvailable: true,
  },
  {
    vehicleType: 'car',
    model: 'Car Rental',
    slug: 'car-rental',
    pricePerDayIdr: 500000,
    pricePerHourIdr: 125000,
    features: [
      'Air Conditioning',
      'Driver Included',
      'Comfortable for 4-6 People',
      'Full Tank',
      'Insurance Covered',
      'Local Driver Knowledge'
    ],
    imageUrl: '/images/rentals/car.jpg',
    isAvailable: true,
  },
];

// Initial SEO data
const initialSeoData = [
  {
    pagePath: '/',
    title: 'Best Travel Nusa Penida | NusaBeeTrip - Tours & Rentals Bali',
    description: 'Discover the best travel experience in Nusa Penida with NusaBeeTrip. Professional tour packages, motorcycle & car rentals. Book your Bali island adventure today!',
    keywords: ['best travel nusa penida', 'nusa penida tour', 'nusa penida rental', 'bali island tour', 'kelingking beach tour', 'nusa penida motorcycle rental'],
    canonicalUrl: 'https://nusabeetrip.com/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'NusaBeeTrip',
      description: 'Professional tour and rental services in Nusa Penida, Bali',
      url: 'https://nusabeetrip.com',
      telephone: '+62 896-3128-1234',
      email: 'sidiqdwiatmoko@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nusa Penida',
        addressRegion: 'Bali',
        addressCountry: 'Indonesia'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -8.7274,
        longitude: 115.5447
      },
      priceRange: 'IDR 100,000 - 550,000',
      serviceArea: {
        '@type': 'Place',
        name: 'Nusa Penida, Bali, Indonesia'
      }
    }
  },
  {
    pagePath: '/tours',
    title: 'Nusa Penida Tour Packages | Best Travel Tours - NusaBeeTrip',
    description: 'Explore Nusa Penida with our professional tour packages. West trip, East trip, Mix trip with snorkeling options. Starting from 390,000 IDR. Book now!',
    keywords: ['nusa penida tour packages', 'kelingking beach tour', 'diamond beach tour', 'nusa penida snorkeling', 'west east trip nusa penida'],
    canonicalUrl: 'https://nusabeetrip.com/tours',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: 'Nusa Penida Tours by NusaBeeTrip',
      description: 'Professional guided tours to the best attractions in Nusa Penida',
      url: 'https://nusabeetrip.com/tours'
    }
  },
  {
    pagePath: '/rentals',
    title: 'Nusa Penida Vehicle Rental | Motorcycle & Car Rental - NusaBeeTrip',
    description: 'Rent motorcycles and cars in Nusa Penida. N-Max, Vario, Scoopy motorcycles and cars with driver. Affordable rates starting from 100,000 IDR/day.',
    keywords: ['nusa penida motorcycle rental', 'nusa penida car rental', 'nmax rental nusa penida', 'vario rental bali', 'vehicle rental nusa penida'],
    canonicalUrl: 'https://nusabeetrip.com/rentals',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Vehicle Rental Services Nusa Penida',
      description: 'Motorcycle and car rental services in Nusa Penida, Bali',
      provider: {
        '@type': 'LocalBusiness',
        name: 'NusaBeeTrip'
      }
    }
  },
  {
    pagePath: '/contact',
    title: 'Contact NusaBeeTrip | Book Your Nusa Penida Tour & Rental',
    description: 'Contact NusaBeeTrip for tour bookings and vehicle rentals in Nusa Penida. WhatsApp, phone, email available. Fast response guaranteed!',
    keywords: ['contact nusabeetrip', 'book nusa penida tour', 'nusa penida booking', 'tour booking bali'],
    canonicalUrl: 'https://nusabeetrip.com/contact',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact NusaBeeTrip',
      description: 'Get in touch with NusaBeeTrip for bookings and inquiries'
    }
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert tour packages
    console.log('📦 Inserting tour packages...');
    for (const tourPackage of initialTourPackages) {
      await db.insert(tourPackages).values(tourPackage).onConflictDoNothing();
    }

    // Insert rental services
    console.log('🚗 Inserting rental services...');
    for (const rentalService of initialRentalServices) {
      await db.insert(rentalServices).values(rentalService).onConflictDoNothing();
    }

    // Insert SEO data
    console.log('🔍 Inserting SEO data...');
    for (const seo of initialSeoData) {
      await db.insert(seoData).values(seo).onConflictDoNothing();
    }

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}