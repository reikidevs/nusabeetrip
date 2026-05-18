/**
 * Seed script — load static testimonials into the reviews table.
 *
 * Run once after creating the reviews table:
 *   npx tsx src/lib/db/seed-reviews.ts
 *
 * Or add to package.json:
 *   "db:seed-reviews": "tsx src/lib/db/seed-reviews.ts"
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from './config';
import { reviews } from './schema';
import { TESTIMONIALS } from '../testimonials';

async function seedReviews() {
  console.log('🌱 Seeding reviews from static testimonials...');

  const records = TESTIMONIALS.map((t) => ({
    authorName: t.name,
    authorCountry: t.country,
    authorCountryCode: t.countryCode,
    rating: t.rating,
    title: t.title,
    body: t.body,
    language: t.language,
    tourName: t.tour,
    serviceType: t.tour.toLowerCase().includes('rental') ? 'rental' : 'tour',
    source: t.source || 'website',
    status: 'approved' as const, // pre-approved seed data
    isVerified: t.verified || false,
    isFeatured: false,
    createdAt: new Date(t.date),
    updatedAt: new Date(t.date),
  }));

  try {
    const inserted = await db.insert(reviews).values(records).returning();
    console.log(`✅ Seeded ${inserted.length} reviews successfully`);
    inserted.forEach((r) => {
      console.log(`   - ${r.authorName} (${r.rating}★): "${r.title || r.body.slice(0, 40)}..."`);
    });
  } catch (error) {
    console.error('❌ Failed to seed reviews:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedReviews();
