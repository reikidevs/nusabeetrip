# Database operations

CLI scripts for inspecting and maintaining the Neon database. They are not bundled with the app — only run them locally with `tsx`.

All scripts read connection details from `.env.local`:

- `DATABASE_URL` — development branch (default target)
- `DATABASE_URL_PROD` — production branch (used when you pass `prod` as an argument)

## Inspection

`list-tables.ts` — show tables and row counts on a branch.

```bash
npm run db:list-tables          # dev
npm run db:list-tables:prod     # prod
```

`check-reviews.ts` — list every review grouped by status (`pending`, `approved`, `rejected`, `spam`).

```bash
npm run db:check-reviews
npm run db:check-reviews:prod
```

## Migration

`migrate-missing-tables.ts` — safely add any missing tables (`reviews`, `page_views`, `contact_inquiries`) without touching existing data. Useful for older databases that were created before those tables existed.

```bash
npm run db:migrate-missing            # dev
npm run db:migrate-missing:prod       # prod (asks for confirmation)
```

`push-prod.ts` — wraps `drizzle-kit push` against the production URL with an extra confirmation step. Prefer `migrate-missing-tables.ts` for additive changes.

```bash
npm run db:push:prod
```

For day-to-day dev schema changes, use `npm run db:push` (Drizzle's standard command).

## Seeding

`seed.ts` — populate `tour_packages`, `rental_services`, and `seo_data` with the canonical content set. Idempotent (uses `onConflictDoNothing`).

```bash
npm run db:seed
```

`seed-reviews.ts` — load the static testimonials from `src/lib/testimonials.ts` into the `reviews` table with status `approved`. Skips duplicates by name + body.

```bash
npm run db:seed-reviews
npm run db:seed-reviews:prod
```

## Review moderation

`moderate-review.ts` — approve, reject, feature, unfeature, mark as spam, or delete a review by ID.

```bash
# Format: <action> <id> [prod|dev]
npx tsx scripts/db/moderate-review.ts approve 12 prod
npx tsx scripts/db/moderate-review.ts reject 13 prod "off-topic"
npx tsx scripts/db/moderate-review.ts feature 1
npx tsx scripts/db/moderate-review.ts delete 99 prod
```

Approving sets `status = 'approved'`, stamps `moderated_at`, and flags `is_verified = true`.

## Notes

- These scripts use the Neon HTTP driver. Some PostgreSQL DDL needs the tagged template form (`sql\`CREATE TABLE ...\``) rather than `sql.unsafe()`, which only returns a wrapper object. The migration script uses a small helper to handle this.
- Production scripts always print which host they target and require typed confirmation before running.
- If something looks wrong, run the matching `*list-tables*` or `*check-reviews*` script — they are read-only.
