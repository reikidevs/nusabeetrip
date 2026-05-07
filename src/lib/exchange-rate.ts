/**
 * Real-time Exchange Rate Service
 * 
 * Fetches USD to IDR exchange rate from external API
 * with caching to avoid excessive API calls
 */

// Cache duration: 1 hour (3600000 ms)
const CACHE_DURATION = 3600000;

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
}

let cache: ExchangeRateCache | null = null;

/**
 * Fetch real-time USD to IDR exchange rate
 * Uses free exchangerate-api.com service
 * Falls back to hardcoded rate if API fails
 */
export async function getUsdToIdrRate(): Promise<number> {
  // Check cache first
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('📊 Using cached exchange rate:', cache.rate);
    return cache.rate;
  }

  try {
    // Using exchangerate-api.com (free, no API key required)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 3600 } // Cache for 1 hour in Next.js
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const rate = data.rates.IDR;

    if (!rate || typeof rate !== 'number') {
      throw new Error('Invalid rate data received');
    }

    // Update cache
    cache = {
      rate,
      timestamp: Date.now()
    };

    console.log('✅ Fetched real-time exchange rate:', rate);
    return rate;

  } catch (error) {
    console.error('❌ Failed to fetch exchange rate:', error);
    console.log('⚠️ Falling back to default rate: 16000');
    
    // Fallback to hardcoded rate
    const fallbackRate = 16000;
    
    // Cache fallback rate for shorter duration (5 minutes)
    cache = {
      rate: fallbackRate,
      timestamp: Date.now() - (CACHE_DURATION - 300000) // Will expire in 5 minutes
    };
    
    return fallbackRate;
  }
}

/**
 * Get cached exchange rate synchronously
 * Returns null if no cache available
 */
export function getCachedRate(): number | null {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.rate;
  }
  return null;
}

/**
 * Clear the exchange rate cache
 * Useful for testing or forcing a refresh
 */
export function clearCache(): void {
  cache = null;
}
