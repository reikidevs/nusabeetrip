/**
 * Image Resolver Utility
 * 
 * Resolves tour/rental images by matching content keywords to available
 * image folders. Falls back to a random scenic image when no contextual
 * match is found.
 * 
 * Works server-side: verifies file existence via `fs` before trusting
 * any imageUrl from the database.
 */

import fs from 'fs';
import path from 'path';

// Mapping of content keywords → image folder/file paths
// Each key is a lowercase keyword found in tour features, names, or descriptions
const KEYWORD_IMAGE_MAP: Record<string, string[]> = {
  'kelingking': [
    '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
    '/images/West%20Trip/West%20trip%20Kelingking%20Beach%202.jpeg',
    '/images/West%20Trip/West%20trip%20Kelingking%20Beach%203.jpeg',
    '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
    '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%205.jpeg',
    '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%206.jpeg',
  ],
  'angel billabong': [
    '/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg',
  ],
  'broken beach': [
    '/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg',
    '/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg',
    '/images/West%20Trip/West%20Trip%20Broken%20Beach%203.jpeg',
    '/images/West%20Trip/West%20Trip%20Broken%20Beach%204.jpeg',
  ],
  'crystal bay': [
    '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
    '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%202.jpeg',
    '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%203.jpeg',
    '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%204.jpeg',
    '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%205.jpeg',
  ],
  'atuh beach': [
    '/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg',
  ],
  'diamond beach': [
    '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%202.jpeg',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%203.jpeg',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%204.jpeg',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%205.jpeg',
  ],
  'tree house': [
    '/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg',
  ],
  'thousand island': [
    '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg',
  ],
  'east trip': [
    '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
    '/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg',
    '/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg',
    '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg',
  ],
  'west trip': [
    '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
    '/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg',
    '/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg',
    '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
  ],
  'snorkeling': [
    '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
    '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
    '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
  ],
  'manta': [
    '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
  ],
  'mix trip': [
    '/images/Mix%20Trip%20Diamond%20Kelingking.png',
  ],
};

// Pool of scenic images for random fallback (excluding souvenirs & vehicle rentals)
const SCENIC_IMAGE_POOL: string[] = [
  // West Trip images
  '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
  '/images/West%20Trip/West%20trip%20Kelingking%20Beach%202.jpeg',
  '/images/West%20Trip/West%20trip%20Kelingking%20Beach%203.jpeg',
  '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
  '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%205.jpeg',
  '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%206.jpeg',
  '/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg',
  '/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg',
  '/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg',
  '/images/West%20Trip/West%20Trip%20Broken%20Beach%203.jpeg',
  '/images/West%20Trip/West%20Trip%20Broken%20Beach%204.jpeg',
  '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
  '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%202.jpeg',
  '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%203.jpeg',
  '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%204.jpeg',
  '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%205.jpeg',
  // East Trip images
  '/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg',
  '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
  '/images/East%20Trip/East%20Trip%20Diamond%20Beach%202.jpeg',
  '/images/East%20Trip/East%20Trip%20Diamond%20Beach%203.jpeg',
  '/images/East%20Trip/East%20Trip%20Diamond%20Beach%204.jpeg',
  '/images/East%20Trip/East%20Trip%20Diamond%20Beach%205.jpeg',
  '/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg',
  '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg',
];

/**
 * Check if a public image file actually exists on disk.
 * Handles URL-encoded paths (e.g. `%20` → space).
 */
function imageFileExists(imageUrl: string): boolean {
  try {
    // Decode percent-encoded characters to get real filesystem path
    const decoded = decodeURIComponent(imageUrl);
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, decoded);
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

/**
 * Deterministic pseudo-random index derived from a string seed.
 * Ensures the same tour always gets the same "random" image (no layout shift).
 */
function seededIndex(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash) % max;
}

/**
 * Resolve the best image for a tour package based on its content.
 * 
 * Priority:
 * 1. If the existing imageUrl points to a real file on disk, use it
 * 2. Match tour name, features, or description against keyword map
 * 3. Fall back to a deterministic "random" scenic image
 * 
 * @param context - Object containing tour name, features, description, slug, and current imageUrl
 * @returns Resolved image path string
 */
export function resolveTourImage(context: {
  name: string;
  features: string[];
  description: string;
  slug: string;
  imageUrl?: string | null;
}): string {
  const { name, features, description, slug, imageUrl } = context;

  // 1. If imageUrl exists, is not a placeholder, AND the file actually exists → use it
  if (
    imageUrl &&
    !imageUrl.includes('placeholder') &&
    imageFileExists(imageUrl)
  ) {
    return imageUrl;
  }

  // 2. Collect ALL matching images from keyword map
  const searchText = [name, ...features, description].join(' ').toLowerCase();
  const matchedImages: string[] = [];

  for (const [keyword, images] of Object.entries(KEYWORD_IMAGE_MAP)) {
    if (searchText.includes(keyword)) {
      matchedImages.push(...images);
    }
  }

  // Deduplicate matched images
  const uniqueMatches = Array.from(new Set(matchedImages));

  if (uniqueMatches.length > 0) {
    // Pick one from all matched images using slug as seed for variety
    const index = seededIndex(slug, uniqueMatches.length);
    return uniqueMatches[index];
  }

  // 3. Deterministic random from scenic pool
  const index = seededIndex(slug, SCENIC_IMAGE_POOL.length);
  return SCENIC_IMAGE_POOL[index];
}
