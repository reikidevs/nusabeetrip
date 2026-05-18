/**
 * Quick check — list all reviews in DB by status.
 *
 * Run:
 *   npx tsx src/lib/db/check-reviews.ts          (dev)
 *   npx tsx src/lib/db/check-reviews.ts prod     (prod)
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

async function main() {
  const arg = process.argv[2];
  const url = arg === 'prod' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL;
  if (!url) {
    console.error('❌ Missing DB URL');
    process.exit(1);
  }

  const sql = neon(url);
  console.log(`🎯 ${arg === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log('');

  const all = await sql`
    SELECT id, author_name, author_country, rating, title, status, source, created_at
    FROM reviews 
    ORDER BY created_at DESC;
  `;

  if (all.length === 0) {
    console.log('📭 No reviews in DB yet.');
    process.exit(0);
  }

  console.log(`📋 Total reviews: ${all.length}`);
  console.log('');

  // Group by status
  const byStatus: Record<string, any[]> = {};
  all.forEach((r) => {
    const s = r.status as string;
    if (!byStatus[s]) byStatus[s] = [];
    byStatus[s].push(r);
  });

  for (const [status, list] of Object.entries(byStatus)) {
    const emoji = status === 'approved' ? '✅' : status === 'pending' ? '⏳' : status === 'spam' ? '🚫' : '❌';
    console.log(`${emoji} ${status.toUpperCase()} (${list.length}):`);
    list.forEach((r) => {
      const date = new Date(r.created_at).toLocaleString('id-ID');
      console.log(`   #${r.id} · ${r.rating}★ · ${r.author_name} (${r.author_country || '-'}) · ${date}`);
      if (r.title) console.log(`        "${r.title}"`);
    });
    console.log('');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
