/**
 * Quick moderation tool — approve, reject, feature, or delete a review.
 *
 * Usage:
 *   npx tsx src/lib/db/moderate-review.ts <action> <id> [target]
 *
 *   action: approve | reject | spam | feature | unfeature | delete
 *   id: review ID (number)
 *   target: 'prod' or 'dev' (default: dev)
 *
 * Examples:
 *   npx tsx src/lib/db/moderate-review.ts approve 7 prod
 *   npx tsx src/lib/db/moderate-review.ts feature 1
 *   npx tsx src/lib/db/moderate-review.ts reject 12 prod
 *   npx tsx src/lib/db/moderate-review.ts delete 13 prod
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

async function main() {
  const [action, idStr, target = 'dev'] = process.argv.slice(2);

  if (!action || !idStr) {
    console.error('Usage: tsx moderate-review.ts <action> <id> [prod|dev]');
    console.error('Actions: approve | reject | spam | feature | unfeature | delete');
    process.exit(1);
  }

  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    console.error('❌ ID must be a number');
    process.exit(1);
  }

  const url = target === 'prod' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL;
  if (!url) {
    console.error(`❌ Missing DB URL for ${target}`);
    process.exit(1);
  }

  const sql = neon(url);
  const label = target === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT';
  console.log(`🎯 ${label} · Review #${id}`);

  // Fetch current review
  const before = await sql`SELECT * FROM reviews WHERE id = ${id} LIMIT 1;`;
  if (before.length === 0) {
    console.error(`❌ Review #${id} not found.`);
    process.exit(1);
  }
  console.log(`   Current: ${before[0].rating}★ "${before[0].title || before[0].body.slice(0, 40)}..." [${before[0].status}]`);

  let result;
  switch (action) {
    case 'approve':
      result = await sql`
        UPDATE reviews 
        SET status = 'approved', moderated_at = NOW(), moderated_by = 'cli', is_verified = true, updated_at = NOW()
        WHERE id = ${id} RETURNING *;
      `;
      console.log(`✅ Approved & verified.`);
      break;
    case 'reject':
      result = await sql`
        UPDATE reviews 
        SET status = 'rejected', moderated_at = NOW(), moderated_by = 'cli', updated_at = NOW()
        WHERE id = ${id} RETURNING *;
      `;
      console.log(`❌ Rejected.`);
      break;
    case 'spam':
      result = await sql`
        UPDATE reviews 
        SET status = 'spam', moderated_at = NOW(), moderated_by = 'cli', updated_at = NOW()
        WHERE id = ${id} RETURNING *;
      `;
      console.log(`🚫 Marked as spam.`);
      break;
    case 'feature':
      result = await sql`
        UPDATE reviews SET is_featured = true, updated_at = NOW() WHERE id = ${id} RETURNING *;
      `;
      console.log(`📌 Featured (pinned to top).`);
      break;
    case 'unfeature':
      result = await sql`
        UPDATE reviews SET is_featured = false, updated_at = NOW() WHERE id = ${id} RETURNING *;
      `;
      console.log(`📌 Unfeatured.`);
      break;
    case 'delete':
      result = await sql`DELETE FROM reviews WHERE id = ${id} RETURNING *;`;
      console.log(`🗑️  Deleted permanently.`);
      break;
    default:
      console.error(`❌ Unknown action: ${action}`);
      console.error('Valid: approve | reject | spam | feature | unfeature | delete');
      process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
