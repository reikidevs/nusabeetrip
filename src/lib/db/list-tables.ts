/**
 * Quick utility to list all tables in a database.
 * Run: npx tsx src/lib/db/list-tables.ts
 *      npx tsx src/lib/db/list-tables.ts prod   (uses DATABASE_URL_PROD)
 *      npx tsx src/lib/db/list-tables.ts <CONNECTION_STRING>
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

async function listTables() {
  const arg = process.argv[2];

  let databaseUrl: string | undefined;
  let label = 'default (DATABASE_URL)';

  if (!arg) {
    databaseUrl = process.env.DATABASE_URL;
  } else if (arg === 'prod') {
    databaseUrl = process.env.DATABASE_URL_PROD;
    label = 'prod (DATABASE_URL_PROD)';
  } else if (arg === 'dev') {
    databaseUrl = process.env.DATABASE_URL;
    label = 'dev (DATABASE_URL)';
  } else if (arg.startsWith('postgresql://') || arg.startsWith('postgres://')) {
    databaseUrl = arg;
    label = 'custom URL from arg';
  }

  if (!databaseUrl) {
    console.error('❌ No database URL provided.');
    console.error('   Set DATABASE_URL or DATABASE_URL_PROD in .env.local');
    console.error('   Or pass connection string as argument');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  console.log(`🔌 Target: ${label}`);
  console.log(`🔌 Host:   ${databaseUrl.replace(/:[^@]+@/, ':***@').slice(0, 100)}...`);
  console.log('');

  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    console.log(`📋 Found ${tables.length} tables:`);
    for (const t of tables) {
      const tableName = t.table_name as string;
      // Use tagged template literal — sql.unsafe() doesn't auto-execute
      const strings = Object.assign([`SELECT COUNT(*)::int as count FROM "${tableName}";`], {
        raw: [`SELECT COUNT(*)::int as count FROM "${tableName}";`],
      }) as unknown as TemplateStringsArray;
      const countResult = await (sql as any)(strings);
      const count = countResult[0]?.count ?? 0;
      console.log(`   - ${tableName.padEnd(25)} ${count} rows`);
    }
    console.log('');

    const expected = ['tour_packages', 'rental_services', 'contact_inquiries', 'seo_data', 'page_views', 'reviews'];
    const existing = tables.map((t) => t.table_name);
    const missing = expected.filter((e) => !existing.includes(e));

    if (missing.length > 0) {
      console.log('⚠️  Missing tables:', missing.join(', '));
      console.log('');
      console.log('To create them, run one of:');
      console.log('   npm run db:push                  (push schema, recommended)');
      console.log('   npm run db:push:prod             (push to prod URL)');
    } else {
      console.log('✅ All expected tables present.');
    }
  } catch (error) {
    console.error('❌ Failed to list tables:', error);
    process.exit(1);
  }

  process.exit(0);
}

listTables();
