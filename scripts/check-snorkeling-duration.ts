/**
 * Script to check Snorkeling duration in database
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function checkDuration() {
  console.log('🔍 Checking Snorkeling duration...\n');

  try {
    const snorkeling = await sql`
      SELECT id, name, slug, duration_hours 
      FROM tour_packages 
      WHERE slug = 'snorkeling-manta'
    `;
    
    if (snorkeling.length === 0) {
      console.log('❌ Snorkeling package not found!');
      return;
    }
    
    const pkg = snorkeling[0];
    console.log('Package:', pkg.name);
    console.log('Slug:', pkg.slug);
    console.log('Duration:', pkg.duration_hours, 'hours');
    console.log('');
    
    if (pkg.duration_hours === 2) {
      console.log('✅ Duration is correct (2 hours)');
    } else {
      console.log('❌ Duration is WRONG! Should be 2 hours, but is', pkg.duration_hours, 'hours');
      console.log('\n🔧 Fixing now...');
      
      await sql`
        UPDATE tour_packages 
        SET duration_hours = 2 
        WHERE slug = 'snorkeling-manta'
      `;
      
      console.log('✅ Fixed! Duration updated to 2 hours');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

checkDuration()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
