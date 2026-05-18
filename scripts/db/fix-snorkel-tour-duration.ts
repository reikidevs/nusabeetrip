/**
 * Fix duration for West/East Trip + Snorkeling: 10 -> 8 hours.
 *
 * Reason: tours that combine a single direction trip plus a manta snorkeling
 * stop fit within a normal 8-hour day. The 10-hour value did not match the
 * actual operations and was confusing guests.
 *
 * Run:
 *   npx tsx scripts/db/fix-snorkel-tour-duration.ts            (dev)
 *   npx tsx scripts/db/fix-snorkel-tour-duration.ts prod       (prod, asks confirm)
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import * as readline from 'readline';

const SLUGS_TO_UPDATE = ['west-trip-snorkeling', 'east-trip-snorkeling'];
const NEW_DURATION = 8;

async function main() {
  const arg = process.argv[2];
  const url = arg === 'prod' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL;
  if (!url) {
    console.error('Missing DB URL');
    process.exit(1);
  }
  const label = arg === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT';

  const sql = neon(url);

  // Show current values
  console.log(`Target: ${label}\n`);
  console.log('Current durations for snorkel-combo tours:');
  for (const slug of SLUGS_TO_UPDATE) {
    const rows = await sql`
      SELECT slug, name, duration_hours FROM tour_packages WHERE slug = ${slug};
    `;
    if (rows.length > 0) {
      console.log(`  ${rows[0].slug.padEnd(25)} -> ${rows[0].duration_hours} hours`);
    }
  }
  console.log(`\nWill set duration_hours = ${NEW_DURATION} for both packages.\n`);

  if (arg === 'prod') {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ans = await new Promise<string>((r) =>
      rl.question('Type "yes" to apply to PRODUCTION: ', r),
    );
    rl.close();
    if (ans.trim().toLowerCase() !== 'yes') {
      console.log('Cancelled.');
      process.exit(0);
    }
  }

  for (const slug of SLUGS_TO_UPDATE) {
    const result = await sql`
      UPDATE tour_packages
      SET duration_hours = ${NEW_DURATION}, updated_at = NOW()
      WHERE slug = ${slug}
      RETURNING slug, name, duration_hours;
    `;
    if (result.length > 0) {
      console.log(`  updated ${result[0].slug} -> ${result[0].duration_hours} hours`);
    } else {
      console.log(`  not found: ${slug}`);
    }
  }

  console.log('\nDone.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
