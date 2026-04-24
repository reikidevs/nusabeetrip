import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Lazy database initialization.
 * Throws only at runtime when db is used, not at build time.
 * This prevents Next.js static generation from failing during `next build`.
 */
function createDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is required. ' +
      'Set it in your .env.local file or Vercel environment variables.'
    );
  }

  const sqlClient = neon(databaseUrl);
  return {
    db: drizzle(sqlClient, { schema }),
    sql: sqlClient,
  };
}

// Lazy singleton — only initialized when first accessed
let _instance: ReturnType<typeof createDb> | null = null;

function getInstance() {
  if (!_instance) {
    _instance = createDb();
  }
  return _instance;
}

export const db = new Proxy({} as ReturnType<typeof createDb>['db'], {
  get(_target, prop) {
    return (getInstance().db as any)[prop];
  },
});

export const sql = new Proxy((() => {}) as ReturnType<typeof createDb>['sql'], {
  apply(_target, _thisArg, args) {
    return (getInstance().sql as any)(...args);
  },
  get(_target, prop) {
    return (getInstance().sql as any)[prop];
  },
});