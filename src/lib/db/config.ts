import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type DbInstance = ReturnType<typeof drizzle<typeof schema>>;
type SqlInstance = NeonQueryFunction<false, false>;

/**
 * Lazy database initialization.
 * Throws only at runtime when getDb() is called, not at module load time (build time).
 * This prevents Next.js static generation from failing during `next build`.
 */
let _db: DbInstance | null = null;
let _sql: SqlInstance | null = null;

function initDb(): { db: DbInstance; sql: SqlInstance } {
  if (_db && _sql) return { db: _db, sql: _sql };

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is required. ' +
      'Set it in your .env.local file or Vercel environment variables.'
    );
  }

  _sql = neon(databaseUrl);
  _db = drizzle(_sql, { schema });

  return { db: _db, sql: _sql };
}

/** Returns the Drizzle DB instance. Throws if DATABASE_URL is not set. */
export function getDb(): DbInstance {
  return initDb().db;
}

/** Returns the Neon SQL client. Throws if DATABASE_URL is not set. */
export function getSql(): SqlInstance {
  return initDb().sql;
}

// Legacy named exports for backward compatibility with existing imports
export const db = new Proxy({} as DbInstance, {
  get(_target, prop) {
    return (initDb().db as any)[prop];
  },
});

export const sql = new Proxy({} as unknown as SqlInstance, {
  get(_target, prop) {
    return (initDb().sql as any)[prop];
  },
  apply(_target, _thisArg, args) {
    return (initDb().sql as any)(...args);
  },
}) as SqlInstance;