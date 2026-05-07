/**
 * Currency Formatting Utility
 * 
 * Converts and formats prices based on active language:
 * - 'id' → Rupiah (IDR): Rp 390.000
 * - 'en' → US Dollar (USD): $24
 * 
 * All source prices in the system are stored in IDR.
 * Souvenir prices are stored in USD.
 * 
 * Exchange rate is fetched in real-time from external API.
 */

import type { Language } from './translations';
import { getCachedRate } from './exchange-rate';

// Default fallback rate if API fails: 1 USD = 16,000 IDR
const DEFAULT_IDR_TO_USD_RATE = 16000;

/**
 * Get current exchange rate (cached or default)
 */
function getCurrentRate(): number {
  const cachedRate = getCachedRate();
  return cachedRate || DEFAULT_IDR_TO_USD_RATE;
}

/**
 * Format a price in IDR according to the active language.
 * 
 * - `id` → "Rp 390.000"
 * - `en` → "$24" (converted using real-time rate)
 */
export function formatPriceByLang(
  amountIdr: number,
  language: Language
): { display: string; currencyLabel: string } {
  if (language === 'en') {
    const rate = getCurrentRate();
    const usd = Math.round(amountIdr / rate);
    return {
      display: `$${usd.toLocaleString('en-US')}`,
      currencyLabel: 'USD',
    };
  }

  return {
    display: `Rp ${amountIdr.toLocaleString('id-ID')}`,
    currencyLabel: 'IDR',
  };
}

/**
 * Format a price originally stored in USD according to the active language.
 * Used for souvenirs which have USD as base currency.
 * 
 * - `id` → "Rp 80.000" (converted using real-time rate)
 * - `en` → "$5"
 */
export function formatUsdPriceByLang(
  amountUsd: number,
  language: Language
): { display: string; currencyLabel: string } {
  if (language === 'id') {
    const rate = getCurrentRate();
    const idr = amountUsd * rate;
    return {
      display: `Rp ${idr.toLocaleString('id-ID')}`,
      currencyLabel: 'IDR',
    };
  }

  return {
    display: `$${amountUsd.toLocaleString('en-US')}`,
    currencyLabel: 'USD',
  };
}
