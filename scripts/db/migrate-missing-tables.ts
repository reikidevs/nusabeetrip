/**
 * Safe migration: ONLY adds missing tables, never touches existing data.
 *
 * Use this when:
 * - You have an existing prod database with old schema
 * - You want to add new tables (reviews, page_views, contact_inquiries) without
 *   risking data loss from drizzle-kit's interactive prompts
 *
 * Run:
 *   npm run db:migrate-missing          (uses DATABASE_URL = dev)
 *   npm run db:migrate-missing:prod     (uses DATABASE_URL_PROD)
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import * as readline from 'readline';

/**
 * Execute a raw SQL string via the Neon driver.
 * The Neon serverless driver's tagged template literal evaluates immediately,
 * but `sql.unsafe()` only returns a wrapper. We use the tagged template
 * with a single-element array workaround.
 */
async function execRaw(sql: NeonQueryFunction<false, false>, query: string): Promise<unknown[]> {
  // Build a TemplateStringsArray-like object so the tagged template path is taken
  const strings = Object.assign([query], { raw: [query] }) as unknown as TemplateStringsArray;
  return (sql as any)(strings);
}

const TABLE_DDL: Record<string, string> = {
  contact_inquiries: `
    CREATE TABLE IF NOT EXISTS "contact_inquiries" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "email" varchar(255) NOT NULL,
      "phone" varchar(50),
      "message" text NOT NULL,
      "tour_interest" varchar(255),
      "rental_interest" varchar(255),
      "status" varchar(50) DEFAULT 'new',
      "created_at" timestamp DEFAULT now(),
      "updated_at" timestamp DEFAULT now()
    );
  `,
  page_views: `
    CREATE TABLE IF NOT EXISTS "page_views" (
      "id" serial PRIMARY KEY NOT NULL,
      "page_path" varchar(255) NOT NULL,
      "user_agent" text,
      "referrer" varchar(500),
      "ip_address" inet,
      "created_at" timestamp DEFAULT now()
    );
  `,
  reviews: `
    CREATE TABLE IF NOT EXISTS "reviews" (
      "id" serial PRIMARY KEY NOT NULL,
      "author_name" varchar(255) NOT NULL,
      "author_email" varchar(255),
      "author_phone" varchar(50),
      "author_country" varchar(100),
      "author_country_code" varchar(2),
      "author_photo_url" varchar(500),
      "rating" integer NOT NULL,
      "title" varchar(255),
      "body" text NOT NULL,
      "language" varchar(5) DEFAULT 'en',
      "tour_slug" varchar(255),
      "tour_name" varchar(255),
      "service_type" varchar(50),
      "photos" jsonb DEFAULT '[]'::jsonb,
      "status" varchar(20) DEFAULT 'pending' NOT NULL,
      "moderated_at" timestamp,
      "moderated_by" varchar(100),
      "rejection_reason" text,
      "source" varchar(50) DEFAULT 'website',
      "ip_address" inet,
      "user_agent" text,
      "google_review_id" varchar(255),
      "google_review_url" varchar(500),
      "synced_to_google" boolean DEFAULT false,
      "helpful_count" integer DEFAULT 0,
      "is_featured" boolean DEFAULT false,
      "is_verified" boolean DEFAULT false,
      "owner_response" text,
      "owner_responded_at" timestamp,
      "created_at" timestamp DEFAULT now(),
      "updated_at" timestamp DEFAULT now(),
      CONSTRAINT "reviews_rating_check" CHECK (rating >= 1 AND rating <= 5),
      CONSTRAINT "reviews_status_check" CHECK (status IN ('pending', 'approved', 'rejected', 'spam'))
    );
  `,
};

const REVIEWS_INDEXES = [
  `CREATE INDEX IF NOT EXISTS "idx_reviews_status" ON "reviews"("status");`,
  `CREATE INDEX IF NOT EXISTS "idx_reviews_language" ON "reviews"("language");`,
  `CREATE INDEX IF NOT EXISTS "idx_reviews_tour_slug" ON "reviews"("tour_slug");`,
  `CREATE INDEX IF NOT EXISTS "idx_reviews_created_at" ON "reviews"("created_at" DESC);`,
  `CREATE INDEX IF NOT EXISTS "idx_reviews_featured" ON "reviews"("is_featured") WHERE "is_featured" = true;`,
];

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
    console.error(`   Set ${arg === 'prod' ? 'DATABASE_URL_PROD' : 'DATABASE_URL'} in .env.local`);
    process.exit(1);
  }

  const masked = databaseUrl.replace(/:[^@]+@/, ':***@');
  console.log('');
  console.log(`🎯 Target: ${label}`);
  console.log(`🔌 Host:   ${masked.slice(0, 100)}...`);
  console.log('');

  const sql = neon(databaseUrl);

  // Check what's missing
  const tables = await sql`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `;
  const existing = new Set(tables.map((t) => t.table_name));
  const required = ['contact_inquiries', 'page_views', 'reviews'];
  const missing = required.filter((t) => !existing.has(t));

  if (missing.length === 0) {
    console.log('✅ All required tables already exist. Nothing to do.');
    process.exit(0);
  }

  console.log(`📋 Will create ${missing.length} missing table(s):`);
  missing.forEach((t) => console.log(`   + ${t}`));
  console.log('');
  console.log('ℹ️  Existing data will NOT be touched.');
  console.log('');

  // Confirmation for prod
  if (arg === 'prod') {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise<string>((resolve) => {
      rl.question('Type "yes" to apply to PRODUCTION: ', resolve);
    });
    rl.close();
    if (answer.trim().toLowerCase() !== 'yes') {
      console.log('❌ Cancelled.');
      process.exit(0);
    }
  }

  // Execute migrations
  for (const tableName of missing) {
    const ddl = TABLE_DDL[tableName];
    if (!ddl) continue;
    console.log(`🔨 Creating ${tableName}...`);
    try {
      await execRaw(sql, ddl);
      console.log(`   ✅ ${tableName} created`);
    } catch (err) {
      console.error(`   ❌ Failed: ${err}`);
      process.exit(1);
    }
  }

  // Add reviews indexes if reviews was just created
  if (missing.includes('reviews')) {
    console.log('🔨 Creating indexes for reviews...');
    for (const stmt of REVIEWS_INDEXES) {
      try {
        await execRaw(sql, stmt);
      } catch (err) {
        console.error(`   ⚠️  Index error (non-fatal): ${err}`);
      }
    }
    console.log('   ✅ Indexes created');
  }

  // Verify
  console.log('');
  console.log('🔍 Verifying...');
  const tablesAfter = await sql`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;
  console.log(`📋 Tables now in database (${tablesAfter.length}):`);
  tablesAfter.forEach((t) => console.log(`   - ${t.table_name}`));

  const stillMissing = required.filter(
    (r) => !tablesAfter.some((t) => t.table_name === r),
  );
  console.log('');
  if (stillMissing.length === 0) {
    console.log('✅ Migration complete. All required tables present.');
  } else {
    console.log(`⚠️  Some tables still missing: ${stillMissing.join(', ')}`);
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
