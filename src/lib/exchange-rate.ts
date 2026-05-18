/**
 * Real-time USD ↔ IDR exchange rate with 1-hour caching and graceful fallback.
 *
 * Performance: console output is dev-only so production logs stay clean and
 * the bundle stays small after dead-code elimination.
 */

const isDev = process.env.NODE_ENV === 'development';

const CACHE_DURATION = 3600000; // 1 hour

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
}

let cache: ExchangeRateCache | null = null;

/**
 * Fetch real-time USD to IDR exchange rate.
 * Uses the free exchangerate-api.com service. Falls back to a hardcoded rate
 * if the API is unreachable.
 */
export async function getUsdToIdrRate(): Promise<number> {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    if (isDev) console.log('[exchange-rate] using cached rate:', cache.rate);
    return cache.rate;
  }

  try {
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates?.IDR;

    if (!rate || typeof rate !== 'number') {
      throw new Error('Invalid rate data received');
    }

    cache = { rate, timestamp: Date.now() };
    if (isDev) console.log('[exchange-rate] fetched real-time rate:', rate);
    return rate;
  } catch (error) {
    if (isDev) console.error('[exchange-rate] fetch failed:', error);

    const fallbackRate = 16000;
    // Cache the fallback for 5 minutes so we retry the API soon, but stop
    // hammering it during an outage.
    cache = {
      rate: fallbackRate,
      timestamp: Date.now() - (CACHE_DURATION - 300000),
    };
    return fallbackRate;
  }
}

/** Synchronously read the cached rate. Returns null if no fresh cache. */
export function getCachedRate(): number | null {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.rate;
  }
  return null;
}

/** Clear the cache. Used by tests and the manual refresh utility. */
export function clearCache(): void {
  cache = null;
}
