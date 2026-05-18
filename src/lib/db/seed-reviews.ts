/**
 * Seed script — load static testimonials into the reviews table.
 *
 * Run:
 *   npm run db:seed-reviews              (uses DATABASE_URL = dev)
 *   npm run db:seed-reviews:prod         (uses DATABASE_URL_PROD)
 *
 * Idempotent: skips duplicates based on author_name + body.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and } from 'drizzle-orm';
import * as readline from 'readline';
import * as schema from './schema';
import { reviews } from './schema';
import { TESTIMONIALS } from '../testimonials';

async function main() {
  const arg = process.argv[2];
  let databaseUrl: string | undefined;
  let label: string;

  if (arg === 'prod') {
    databaseUrl = process.env.DATABASE_URL_PROD;
    label = 'PRODUCTION';
  } else {
    databaseUrl = process.env.DATABASE_URL;
    label = 'DEVELOPMENT';
  }

  if (!databaseUrl) {
    console.error(`❌ Missing connection URL for ${label}`);
    process.exit(1);
  }

  console.log('');
  console.log(`🎯 Target: ${label}`);
  console.log(`🔌 Host:   ${databaseUrl.replace(/:[^@]+@/, ':***@').slice(0, 100)}...`);
  console.log('');

  // Confirmation for prod
  if (arg === 'prod') {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise<string>((resolve) => {
      rl.question(`Type "yes" to seed ${TESTIMONIALS.length} reviews into PRODUCTION: `, resolve);
    });
    rl.close();
    if (answer.trim().toLowerCase() !== 'yes') {
      console.log('❌ Cancelled.');
      process.exit(0);
    }
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log('🌱 Seeding reviews from static testimonials...');
  let inserted = 0;
  let skipped = 0;

  for (const t of TESTIMONIALS) {
    // Check if already exists (by author + body match)
    const existing = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.authorName, t.name), eq(reviews.body, t.body)))
      .limit(1);

    if (existing.length > 0) {
      console.log(`   ⏭️  Skipped: ${t.name} (already exists)`);
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
    console.log(`   ✅ Inserted: ${t.name} (${t.rating}★) - "${t.title}"`);
    inserted++;
  }

  console.log('');
  console.log(`✅ Done. Inserted: ${inserted}, Skipped: ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
