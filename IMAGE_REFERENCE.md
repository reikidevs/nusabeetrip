# Image Reference Guide

This document lists all images that should be displayed on the website.

## Tour Packages Images

### 1. West Trip
- **Image**: Kelingking Beach (main view)
- **File**: `public/images/West Trip/West trip  kelingking beach.jpeg`
- **URL**: `/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg`
- **Note**: Has 2 spaces between "trip" and "kelingking"

### 2. East Trip
- **Image**: Diamond Beach (main view)
- **File**: `public/images/East Trip/East trip DIAMOND BEACH.jpeg`
- **URL**: `/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg`

### 3. West Trip + Snorkeling
- **Image**: Kelingking Beach with Manta Snorkeling overlay
- **File**: `public/images/West Trip/West Trip Kelingking Manta Snorkeling.png`
- **URL**: `/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png`

### 4. East Trip + Snorkeling
- **Image**: Diamond Beach with Snorkeling overlay
- **File**: `public/images/East Trip/East Trip Diamond Beach Snorkeling.png`
- **URL**: `/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png`

### 5. Mix Trip (West & East)
- **Image**: Combined Diamond Beach and Kelingking Beach
- **File**: `public/images/Mix Trip Diamond Kelingking.png`
- **URL**: `/images/Mix%20Trip%20Diamond%20Kelingking.png`

### 6. Snorkeling with Manta Ray's
- **Image**: Snorkeling scene
- **File**: `public/images/Snorkeling + Manta Rays/snorkeling 1.jpeg`
- **URL**: `/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg`
- **Duration**: 2 hours

## Rental Services Images

### 1. N-Max Motorcycle
- **Image**: Yamaha N-Max
- **File**: `public/images/Vehicle Rentals/Yamaha N-Max.webp`
- **URL**: `/images/Vehicle%20Rentals/Yamaha%20N-Max.webp`
- **Price**: 125,000 IDR/day

### 2. Vario Motorcycle
- **Image**: Honda Vario
- **File**: `public/images/Vehicle Rentals/Honda Vario.png`
- **URL**: `/images/Vehicle%20Rentals/Honda%20Vario.png`
- **Price**: 100,000 IDR/day

### 3. Scoopy Motorcycle
- **Image**: Honda Scoopy
- **File**: `public/images/Vehicle Rentals/Honda Scoopy.webp`
- **URL**: `/images/Vehicle%20Rentals/Honda%20Scoopy.webp`
- **Price**: 100,000 IDR/day

### 4. Car Rental
- **Image**: Car with Driver
- **File**: `public/images/Vehicle Rentals/Car with Driver.jpg`
- **URL**: `/images/Vehicle%20Rentals/Car%20with%20Driver.jpg`
- **Price**: 500,000 IDR/day or 125,000 IDR/hour

## Verification

To verify all images are correct:

```bash
# Check database image URLs
npm run tsx scripts/check-images.ts

# Verify image files exist
npm run tsx scripts/verify-images.ts

# Compare expected vs actual
npm run tsx scripts/compare-db-images.ts
```

## Important Notes

1. All image URLs use URL encoding (%20 for spaces, %2B for +)
2. File names are case-sensitive
3. The "West trip  kelingking beach.jpeg" file has 2 spaces (not 1)
4. All images are committed to git and should be available in production
5. Next.js image optimization is enabled with cache TTL of 60 seconds

## Troubleshooting

If images don't appear in production:

1. Check Vercel deployment logs
2. Verify images are in the GitHub repository
3. Clear browser cache
4. Wait for Vercel image optimization cache to refresh
5. Check Network tab in browser DevTools for 404 errors
