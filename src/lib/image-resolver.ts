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
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00.jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(1).jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(2).jpeg',
  ],
  'angel billabong': [
    '/images/Angel%20Bilabong/WhatsApp%20Image%202026-04-19%20at%2019.45.02%20(1).jpeg',
  ],
  'broken beach': [
    '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg',
    '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.24.56.jpeg',
  ],
  'crystal bay': [
    '/images/Crystal%20Bay%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.14.jpeg',
  ],
  'atuh beach': [
    '/images/Atuh%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.35.33.jpeg',
  ],
  'diamond beach': [
    '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.15.jpeg',
    '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.34.15.jpeg',
  ],
  'tree house': [
    '/images/Tree%20House/WhatsApp%20Image%202026-04-19%20at%2019.45.15%20(1).jpeg',
  ],
  'east trip': [
    '/images/East%20Trip/WhatsApp%20Image%202026-04-19%20at%2020.32.36.jpeg',
  ],
  'snorkeling': [
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.13.jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03.jpeg',
    '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03%20(1).jpeg',
  ],
};

// Pool of scenic images for random fallback (excluding souvenirs & vehicle rentals)
const SCENIC_IMAGE_POOL: string[] = [
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.44.59%20(1).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(1).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00%20(2).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01%20(1).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01%20(2).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.02.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.02%20(2).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03%20(1).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.03%20(2).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.13.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.14%20(1).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2019.45.15%20(2).jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2020.25.14.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2020.26.34.jpeg',
  '/images/WhatsApp%20Image%202026-04-19%20at%2020.27.05.jpeg',
  '/images/Angel%20Bilabong/WhatsApp%20Image%202026-04-19%20at%2019.45.02%20(1).jpeg',
  '/images/Atuh%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.35.33.jpeg',
  '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.44.59.jpeg',
  '/images/Broken%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.24.56.jpeg',
  '/images/Crystal%20Bay%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.14.jpeg',
  '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2019.45.15.jpeg',
  '/images/Diamond%20Beach/WhatsApp%20Image%202026-04-19%20at%2020.34.15.jpeg',
  '/images/East%20Trip/WhatsApp%20Image%202026-04-19%20at%2020.32.36.jpeg',
  '/images/Tree%20House/WhatsApp%20Image%202026-04-19%20at%2019.45.15%20(1).jpeg',
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
