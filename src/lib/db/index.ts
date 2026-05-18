// Re-export the runtime DB pieces used by app code.
// Operational scripts (seed, list-tables, migrations) live in /scripts/db/.

export { db, sql, getDb, getSql } from './config';
export * from './schema';
export * from './queries';
