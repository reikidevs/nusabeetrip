/**
 * Script to fix "Angel Bilabong" → "Angel Billabong" (correct spelling)
 */
import { neon } from '@neondatabase/serverless';

const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function fixSpelling() {
  console.log('🔄 Fixing "Angel Bilabong" → "Angel Billabong"...\n');

  try {
    const tours = await sql`SELECT id, name, slug, features FROM tour_packages`;
    
    for (const tour of tours) {
      let features = tour.features as string[];
      const hasIncorrect = features.includes('Angel Bilabong');
      
      if (hasIncorrect) {
        features = features.map(f => f === 'Angel Bilabong' ? 'Angel Billabong' : f);
        
        await sql`
          UPDATE tour_packages 
          SET features = ${JSON.stringify(features)}::jsonb
          WHERE id = ${tour.id}
        `;
        
        console.log(`✅ ${tour.name}`);
        console.log(`   Features: ${features.join(', ')}`);
        console.log('');
      }
    }
    
    console.log('🎉 All spelling corrected!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixSpelling()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
