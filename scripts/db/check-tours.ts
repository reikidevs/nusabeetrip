/**
 * Print all tour packages in a database with their canonical fields.
 * Run: npx tsx scripts/db/check-tours.ts [prod|dev]
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

async function main() {
  const arg = process.argv[2];
  const url = arg === 'prod' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL;
  if (!url) {
    console.error('Missing DB URL');
    process.exit(1);
  }
  const sql = neon(url);

  console.log(`Target: ${arg === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT'}\n`);

  const rows = await sql`
    SELECT id, slug, name, price_idr, duration_hours, includes_snorkeling, is_active
    FROM tour_packages
    ORDER BY id;
  `;

  console.log('Tour packages:');
  for (const r of rows) {
    const flags = [
      r.is_active ? 'active' : 'INACTIVE',
      r.includes_snorkeling ? 'snorkel' : '-',
    ].join(', ');
    console.log(
      `  #${r.id} ${(r.slug as string).padEnd(25)} | ${(r.name as string).padEnd(35)} | ${String(r.duration_hours).padStart(2)} h | ${(r.price_idr as number).toLocaleString('id-ID').padStart(10)} IDR | ${flags}`,
    );
  }
  console.log('');

  const rentals = await sql`
    SELECT id, slug, model, vehicle_type, price_per_day_idr, price_per_hour_idr, is_available
    FROM rental_services
    ORDER BY id;
  `;
  console.log('Rental services:');
  for (const r of rentals) {
    const ph = r.price_per_hour_idr ? `${(r.price_per_hour_idr as number).toLocaleString('id-ID')}/h` : '-';
    console.log(
      `  #${r.id} ${(r.slug as string).padEnd(20)} | ${(r.model as string).padEnd(20)} | ${(r.vehicle_type as string).padEnd(10)} | ${(r.price_per_day_idr as number).toLocaleString('id-ID').padStart(10)} IDR/d | ${ph.padStart(12)} | ${r.is_available ? 'available' : 'UNAVAILABLE'}`,
    );
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
