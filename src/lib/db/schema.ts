import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  integer, 
  boolean, 
  timestamp, 
  jsonb,
  inet 
} from 'drizzle-orm/pg-core';

// Tour packages table
export const tourPackages = pgTable('tour_packages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  priceIdr: integer('price_idr').notNull(),
  durationHours: integer('duration_hours'),
  includesSnorkeling: boolean('includes_snorkeling').default(false),
  features: jsonb('features'),
  imageUrl: varchar('image_url', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Rental services table
export const rentalServices = pgTable('rental_services', {
  id: serial('id').primaryKey(),
  vehicleType: varchar('vehicle_type', { length: 100 }).notNull(), // 'motorcycle' or 'car'
  model: varchar('model', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  pricePerDayIdr: integer('price_per_day_idr').notNull(),
  pricePerHourIdr: integer('price_per_hour_idr'),
  features: jsonb('features'),
  imageUrl: varchar('image_url', { length: 500 }),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact inquiries table
export const contactInquiries = pgTable('contact_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  tourInterest: varchar('tour_interest', { length: 255 }),
  rentalInterest: varchar('rental_interest', { length: 255 }),
  status: varchar('status', { length: 50 }).default('new'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// SEO data table
export const seoData = pgTable('seo_data', {
  id: serial('id').primaryKey(),
  pagePath: varchar('page_path', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  keywords: text('keywords').array(),
  canonicalUrl: varchar('canonical_url', { length: 500 }),
  structuredData: jsonb('structured_data'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reviews / Testimonials table — Google-style guest reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),

  // Reviewer info
  authorName: varchar('author_name', { length: 255 }).notNull(),
  authorEmail: varchar('author_email', { length: 255 }), // for verification & spam prevention
  authorPhone: varchar('author_phone', { length: 50 }),
  authorCountry: varchar('author_country', { length: 100 }),
  authorCountryCode: varchar('author_country_code', { length: 2 }), // ISO 3166-1 alpha-2
  authorPhotoUrl: varchar('author_photo_url', { length: 500 }),

  // Review content
  rating: integer('rating').notNull(), // 1-5
  title: varchar('title', { length: 255 }),
  body: text('body').notNull(),
  language: varchar('language', { length: 5 }).default('en'), // 'en' | 'id'

  // Tour reference (optional — links to tour package or rental)
  tourSlug: varchar('tour_slug', { length: 255 }),
  tourName: varchar('tour_name', { length: 255 }),
  serviceType: varchar('service_type', { length: 50 }), // 'tour' | 'rental' | 'general'

  // Photos (JSON array of image URLs)
  photos: jsonb('photos').default([]),

  // Moderation
  status: varchar('status', { length: 20 }).notNull().default('pending'), // 'pending' | 'approved' | 'rejected' | 'spam'
  moderatedAt: timestamp('moderated_at'),
  moderatedBy: varchar('moderated_by', { length: 100 }),
  rejectionReason: text('rejection_reason'),

  // Source tracking
  source: varchar('source', { length: 50 }).default('website'), // 'website' | 'whatsapp' | 'google' | 'instagram' | 'tripadvisor'
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),

  // Google integration (future — for syncing with Google Business Profile)
  googleReviewId: varchar('google_review_id', { length: 255 }), // populate when synced to Google
  googleReviewUrl: varchar('google_review_url', { length: 500 }),
  syncedToGoogle: boolean('synced_to_google').default(false),

  // Engagement
  helpfulCount: integer('helpful_count').default(0),
  isFeatured: boolean('is_featured').default(false), // pin to top
  isVerified: boolean('is_verified').default(false), // confirmed real customer

  // Owner response (you can reply to reviews)
  ownerResponse: text('owner_response'),
  ownerRespondedAt: timestamp('owner_responded_at'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Analytics tracking table
export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  pagePath: varchar('page_path', { length: 255 }).notNull(),
  userAgent: text('user_agent'),
  referrer: varchar('referrer', { length: 500 }),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for TypeScript
export type TourPackage = typeof tourPackages.$inferSelect;
export type NewTourPackage = typeof tourPackages.$inferInsert;

export type RentalService = typeof rentalServices.$inferSelect;
export type NewRentalService = typeof rentalServices.$inferInsert;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;

export type SeoData = typeof seoData.$inferSelect;
export type NewSeoData = typeof seoData.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;