import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Load environment variables
import { config } from 'dotenv';
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create the Neon client
const sql = neon(process.env.DATABASE_URL);

// Create the Drizzle database instance
export const db = drizzle(sql, { schema });

// Export the SQL client for raw queries if needed
export { sql };