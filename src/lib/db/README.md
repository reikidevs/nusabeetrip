# NusaBeeTrip Database Setup

This directory contains the complete database setup for the NusaBeeTrip tourism website using Neon PostgreSQL and Drizzle ORM.

## Database Architecture

### Technology Stack
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM with TypeScript
- **Migration Tool**: Drizzle Kit
- **Connection**: @neondatabase/serverless

### Database Schema

#### Tables Created

1. **tour_packages** - Tour package information
   - West Trip (390,000 IDR)
   - East Trip (430,000 IDR) 
   - West Trip + Snorkeling (550,000 IDR)
   - East Trip + Snorkeling (550,000 IDR)
   - Mix Trip (500,000 IDR)

2. **rental_services** - Vehicle rental services
   - N-Max Motorcycle (125,000 IDR/day)
   - Vario Motorcycle (100,000 IDR/day)
   - Scoopy Motorcycle (100,000 IDR/day)
   - Car Rental (500,000 IDR/day)

3. **contact_inquiries** - Customer contact form submissions
4. **seo_data** - SEO metadata for pages
5. **page_views** - Analytics tracking

## Available Scripts

### Database Management
```bash
# Push schema to database (create/update tables)
npm run db:push

# Seed database with initial data
npm run db:seed

# Complete setup (push + seed)
npm run db:setup

# Test database connection
npm run db:test

# Verify seeded data
npm run db:verify

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Development Workflow

1. **Initial Setup**:
   ```bash
   npm run db:setup
   ```

2. **Schema Changes**:
   - Modify `src/lib/db/schema.ts`
   - Run `npm run db:push`

3. **Data Changes**:
   - Modify `src/lib/db/seed.ts`
   - Run `npm run db:seed`

## File Structure

```
src/lib/db/
├── config.ts          # Database connection configuration
├── schema.ts          # Database schema definitions
├── queries.ts         # Database query functions
├── seed.ts            # Initial data seeding
├── test-connection.ts # Connection testing utilities
├── verify-data.ts     # Data verification utilities
├── index.ts           # Main exports
└── README.md          # This documentation
```

## Environment Variables

Required in `.env.local`:
```env
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

## Usage Examples

### Querying Data
```typescript
import { getTourPackages, getRentalServices } from '@/lib/db';

// Get all active tour packages
const tours = await getTourPackages();

// Get all available rental services
const rentals = await getRentalServices();
```

### Creating Contact Inquiries
```typescript
import { createContactInquiry } from '@/lib/db';

const inquiry = await createContactInquiry({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Interested in West trip tour',
  tourInterest: 'West Trip'
});
```

### SEO Data Management
```typescript
import { getSeoDataByPath, upsertSeoData } from '@/lib/db';

// Get SEO data for a page
const seoData = await getSeoDataByPath('/tours');

// Update SEO data
await upsertSeoData({
  pagePath: '/tours',
  title: 'Nusa Penida Tours | NusaBeeTrip',
  description: 'Best tour packages in Nusa Penida...',
  keywords: ['nusa penida tour', 'bali tour'],
  canonicalUrl: 'https://nusabeetrip.com/tours'
});
```

## Database Connection Details

- **Provider**: Neon PostgreSQL
- **Region**: Asia Pacific (Singapore)
- **SSL**: Required with channel binding
- **Connection Pooling**: Enabled
- **Serverless**: Auto-scaling based on usage

## Security Features

- SSL/TLS encryption in transit
- Connection string with authentication
- Environment variable protection
- Input validation with Drizzle ORM
- SQL injection prevention

## Performance Optimizations

- Connection pooling via Neon
- Indexed columns (id, slug, email)
- Efficient query patterns
- Minimal data transfer
- Serverless auto-scaling

## Monitoring & Maintenance

### Health Checks
```bash
# Test connection and verify tables
npm run db:test

# Verify data integrity
npm run db:verify
```

### Backup Strategy
- Neon provides automatic backups
- Point-in-time recovery available
- Export data via Drizzle Studio if needed

### Scaling Considerations
- Neon auto-scales compute resources
- Connection pooling handles concurrent requests
- Read replicas available for high traffic
- Database branching for development/staging

## Troubleshooting

### Common Issues

1. **Connection Errors**:
   - Verify DATABASE_URL in `.env.local`
   - Check Neon dashboard for database status
   - Ensure SSL mode is correctly configured

2. **Schema Sync Issues**:
   - Run `npm run db:push` to sync schema
   - Check for conflicting migrations

3. **Seeding Problems**:
   - Verify database is empty or use `onConflictDoNothing()`
   - Check data format matches schema

### Debug Commands
```bash
# Detailed connection test
npm run db:test

# Check current schema
npm run db:studio

# Verify environment variables
echo $DATABASE_URL
```

## Next Steps

This database setup provides the foundation for:
- Contact form submissions
- Tour package management
- Rental service tracking
- SEO optimization
- Analytics collection

The schema is designed to be scalable and can be extended with additional features like:
- User authentication
- Booking management
- Payment tracking
- Review systems
- Multi-language content