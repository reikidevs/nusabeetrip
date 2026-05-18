'use client';

import { useEffect } from 'react';
import { getUsdToIdrRate } from '@/lib/exchange-rate';

const ONE_HOUR_MS = 3_600_000;
const isDev = process.env.NODE_ENV === 'development';

/**
 * Fetches and caches the USD to IDR exchange rate on mount.
 *
 * Performance:
 * - Wraps the initial fetch in `requestIdleCallback` (or a `setTimeout`
 *   fallback) so it never competes with hero rendering for main-thread time.
 * - Hourly refresh continues in the background.
 * - Dev-only console output to keep production logs clean.
 */
export default function ExchangeRateProvider() {
  useEffect(() => {
    const safeFetch = () => {
      getUsdToIdrRate()
        .then((rate) => {
          if (isDev) console.log('[exchange-rate] initialized:', rate);
        })
        .catch((err) => {
          if (isDev) console.error('[exchange-rate] init failed:', err);
        });
    };

    // Defer past first paint.
    type RIC = (cb: () => void, opts?: { timeout?: number }) => number;
    const idle: RIC | undefined =
      typeof window !== 'undefined' && (window as any).requestIdleCallback;
    if (idle) {
      idle(safeFetch, { timeout: 2000 });
    } else {
      setTimeout(safeFetch, 1500);
    }

    const interval = setInterval(() => {
      getUsdToIdrRate().catch((err) => {
        if (isDev) console.error('[exchange-rate] refresh failed:', err);
      });
    }, ONE_HOUR_MS);

    return () => clearInterval(interval);
  }, []);

  return null;
}
