# NusaBeeTrip

The website for NusaBeeTrip, a local tour and rental operator on Nusa Penida, Bali. It runs on Next.js 14 with the App Router, Tailwind for styling, and Drizzle ORM on Neon Postgres for content.

Live site: https://nusabeetrip.com

## Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS
- Drizzle ORM + Neon serverless Postgres
- Deployed on Vercel (Singapore region)
- Bilingual UI (English / Bahasa Indonesia) via React context
- USD/IDR conversion using a real-time exchange rate with caching

## Getting started

```bash
git clone https://github.com/reikidevs/nusabeetrip.git
cd nusabeetrip
npm install
cp .env.example .env.local
# Fill in DATABASE_URL and other values in .env.local
npm run dev
```

The dev server runs at http://localhost:3000. If the build cache misbehaves, use `npm run dev:clean`.

## Project layout

```
.
├── public/            Static assets (logos, tour photos, souvenirs)
├── src/
│   ├── app/           Routes (App Router): home, tours, rentals, souvenirs, contact, about
│   ├── components/    UI building blocks
│   │   ├── business/  Tour/rental cards, testimonials, review form
│   │   ├── layout/    Header, footer, navigation
│   │   ├── seo/       JSON-LD generators, breadcrumbs
│   │   └── ui/        Generic UI primitives
│   ├── lib/
│   │   ├── db/        Drizzle config, schema, queries (runtime only)
│   │   ├── seo.ts     Metadata builder + Schema.org generators
│   │   ├── translations.ts
│   │   ├── currency.ts, exchange-rate.ts
│   │   └── ...
│   ├── styles/        Shared CSS variables and utilities
│   └── types/         Shared TypeScript types
├── scripts/
│   └── db/            One-off database operations (seed, migrate, moderate reviews)
├── drizzle/           SQL migration files
├── next.config.js
├── tailwind.config.js
├── drizzle.config.ts
└── package.json
```

Anything in `src/lib/db/` is imported by the running app. Anything in `scripts/db/` is a CLI tool you run manually with `tsx` and never ships to production.

## Common scripts

```bash
# Dev / build
npm run dev              # Start dev server
npm run dev:clean        # Clear .next cache then start dev
npm run build            # Production build
npm start                # Run the production build
npm run lint             # ESLint
npm test                 # Jest

# Database (development branch by default)
npm run db:push                  # Push schema changes
npm run db:studio                # Open Drizzle Studio
npm run db:list-tables           # List tables and row counts
npm run db:check-reviews         # Show reviews grouped by status
npm run db:seed                  # Seed tours / rentals / SEO data
npm run db:seed-reviews          # Seed sample testimonials

# Database (production branch — requires DATABASE_URL_PROD in .env.local)
npm run db:list-tables:prod
npm run db:check-reviews:prod
npm run db:migrate-missing:prod  # Add missing tables without touching existing data
npm run db:seed-reviews:prod

# Review moderation (CLI)
npm run db:moderate -- approve <id> [prod]
npm run db:moderate -- reject <id> [prod]
npm run db:moderate -- feature <id>
npm run db:moderate -- delete <id>
```

See `scripts/db/README.md` for details on each operational script.

## Environment variables

All variables live in `.env.local` (never committed). The template is in `.env.example`.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string used by the running app and dev scripts |
| `DATABASE_URL_PROD` | Optional. Lets local ops scripts target the production branch separately |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata, sitemap, and JSON-LD |
| `GOOGLE_SITE_VERIFICATION` | Search Console verification code (string, no quotes inside) |
| `BING_SITE_VERIFICATION` | Bing Webmaster verification code |
| `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL` | Used by the contact form when email delivery is enabled |
| `GOOGLE_ANALYTICS_ID` | Optional analytics |

In production these are set in the Vercel project settings.

## Database

Schema is defined in `src/lib/db/schema.ts`. Tables:

- `tour_packages` — published tour packages
- `rental_services` — motorcycle and car rentals
- `seo_data` — per-page metadata overrides
- `contact_inquiries` — submissions from the contact form
- `page_views` — lightweight view tracking
- `reviews` — guest testimonials (rating, body, status, optional Google sync columns)

The `reviews` table is designed to mirror the shape of Google Business Profile reviews so they can be merged in later without changing the UI.

### Review moderation flow

When a visitor submits a review through the website:

- Rating 3–5 → published immediately
- Rating 1–2 → held as `pending` for manual review
- Spam patterns (URLs, HTML, blocklisted words) → marked as `spam` and never shown

Approve or reject pending reviews with `npm run db:moderate -- approve <id>` or via SQL.

## Deployment

The project deploys to Vercel automatically on push to `main`. Things to confirm before promoting a build:

1. Environment variables are set in Vercel (production environment)
2. Schema on the production database matches `src/lib/db/schema.ts` (`npm run db:list-tables:prod`)
3. `npm run build` passes locally

If schema is out of date, run `npm run db:migrate-missing:prod`. It only adds tables that do not exist and never touches existing data.

## SEO

Metadata is built in one place via `buildMetadata()` in `src/lib/seo.ts`. Every page sets its own canonical URL, hreflang variants, OpenGraph image, and JSON-LD. The homepage emits a richer set of schemas (FAQ, ItemList, AggregateRating, LocalBusiness with reviews, HowTo). Sitemap and robots are generated by `src/app/sitemap.ts` and `src/app/robots.ts`.

## License

All rights reserved. The codebase is published for transparency and learning purposes.
