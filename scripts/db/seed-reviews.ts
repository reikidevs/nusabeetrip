/**
 * Seed script: load static testimonials into the reviews table.
 *
 * Run:
 *   npm run db:seed-reviews            (uses DATABASE_URL = dev)
 * Production seeding is deliberately disabled: these are development fixtures.
 *
 * Idempotent: skips duplicates by author_name + body.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and } from 'drizzle-orm';
import * as schema from '../../src/lib/db/schema';
import { reviews } from '../../src/lib/db/schema';
import { TESTIMONIALS } from '../../src/lib/testimonials';

async function main() {
  const arg = process.argv[2];
  let databaseUrl: string | undefined;
  let label: string;

  if (arg === 'prod') {
    console.error(
      'Production seeding is disabled: static testimonials are development fixtures, not verified customer records.',
    );
    process.exit(1);
  } else {
    databaseUrl = process.env.DATABASE_URL;
    label = 'DEVELOPMENT';
  }

  if (!databaseUrl) {
    console.error(`Missing connection URL for ${label}`);
    process.exit(1);
  }

  console.log('');
  console.log(`Target: ${label}`);
  console.log(`Host:   ${databaseUrl.replace(/:[^@]+@/, ':***@').slice(0, 100)}...`);
  console.log('');

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log('Seeding reviews from static testimonials...');
  let inserted = 0;
  let skipped = 0;

  for (const t of TESTIMONIALS) {
    const existing = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.authorName, t.name), eq(reviews.body, t.body)))
      .limit(1);

    if (existing.length > 0) {
      console.log(`   skipped: ${t.name} (already exists)`);
      skipped++;
      continue;
    }

    await db.insert(reviews).values({
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
      status: 'approved',
      isVerified: t.verified || false,
      isFeatured: false,
      createdAt: new Date(t.date),
      updatedAt: new Date(t.date),
    });
    console.log(`   inserted: ${t.name} (${t.rating} stars) - "${t.title}"`);
    inserted++;
  }

  console.log('');
  console.log(`Done. Inserted: ${inserted}, Skipped: ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
