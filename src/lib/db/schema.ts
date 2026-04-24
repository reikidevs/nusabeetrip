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

export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;