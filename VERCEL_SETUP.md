# Vercel Environment Variables Setup

## Critical: Database Connection

The website MUST have `DATABASE_URL` set in Vercel environment variables to fetch data from the database.

### How to Check/Set Environment Variables in Vercel:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select project: `nusabeetrip`

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Check if DATABASE_URL exists**
   - Look for `DATABASE_URL` variable
   - It should be set for "Production", "Preview", and "Development"

4. **If DATABASE_URL is missing, add it:**
   - Click "Add New" button
   - Name: `DATABASE_URL`
   - Value: Your Neon PostgreSQL connection string
     ```
     postgresql://username:password@hostname/database?sslmode=require
     ```
   - Select: Production, Preview, Development (all three)
   - Click "Save"

5. **Redeploy after adding environment variables:**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## How to Verify Database Connection

After deployment, check Vercel Function Logs:

1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click "View Function Logs"
4. Look for these messages:

### ✅ Success (Database Connected):
```
✅ Successfully fetched 6 tour packages from database
✅ Successfully fetched 4 rental services from database
```

### ❌ Failure (Using Fallback):
```
❌ Failed to fetch tour packages from database: [error message]
⚠️ Using fallback static data
```

## Current Environment Variables Needed:

### Required for Database:
- `DATABASE_URL` - Neon PostgreSQL connection string

### Optional (for full functionality):
- `RESEND_API_KEY` - For contact form emails
- `FROM_EMAIL` - Email sender address
- `TO_EMAIL` - Email recipient address
- `BUSINESS_PHONE` - WhatsApp number
- `BUSINESS_EMAIL` - Business email
- `BUSINESS_INSTAGRAM` - Instagram handle
- `BUSINESS_NAME` - Business name
- `BUSINESS_LOCATION` - Business location

## Troubleshooting

### Images not showing correctly?

1. **Check if database is connected** (see logs above)
2. **If using fallback data**, the images should still be correct now
3. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check Vercel deployment logs** for errors

### Database connection failing?

1. **Verify DATABASE_URL is set** in Vercel environment variables
2. **Check Neon database is active** (not paused)
3. **Verify connection string is correct** (copy from Neon dashboard)
4. **Check IP allowlist** in Neon (should allow all IPs for Vercel)

## Quick Fix Commands

If you need to update production database manually:

```bash
# Run sync script (requires DATABASE_URL in .env.local)
npx tsx scripts/sync-production-db.ts

# Verify database data
npx tsx scripts/check-images.ts

# Compare expected vs actual
npx tsx scripts/compare-db-images.ts
```

## Contact

If issues persist, check:
- Vercel deployment logs
- Neon database status
- GitHub repository (all images should be committed)
