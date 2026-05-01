/**
 * Currency Formatting Utility
 * 
 * Converts and formats prices based on active language:
 * - 'id' → Rupiah (IDR): Rp 390.000
 * - 'en' → US Dollar (USD): $24
 * 
 * All source prices in the system are stored in IDR.
 * Souvenir prices are stored in USD.
 */

import type { Language } from './translations';

// Approximate exchange rate: 1 USD = 16,000 IDR
const IDR_TO_USD_RATE = 16000;

/**
 * Format a price in IDR according to the active language.
 * 
 * - `id` → "Rp 390.000"
 * - `en` → "$24"
 */
export function formatPriceByLang(
  amountIdr: number,
  language: Language
): { display: string; currencyLabel: string } {
  if (language === 'en') {
    const usd = Math.round(amountIdr / IDR_TO_USD_RATE);
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
 * - `id` → "Rp 80.000" (converted from $5)
 * - `en` → "$5"
 */
export function formatUsdPriceByLang(
  amountUsd: number,
  language: Language
): { display: string; currencyLabel: string } {
  if (language === 'id') {
    const idr = amountUsd * IDR_TO_USD_RATE;
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
