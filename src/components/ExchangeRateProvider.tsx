'use client';

import { useEffect } from 'react';
import { getUsdToIdrRate } from '@/lib/exchange-rate';

/**
 * Exchange Rate Provider Component
 * 
 * Fetches and caches the USD to IDR exchange rate on mount
 * This ensures the rate is available for all currency conversions
 */
export default function ExchangeRateProvider() {
  useEffect(() => {
    // Fetch exchange rate on component mount
    getUsdToIdrRate()
      .then(rate => {
        console.log('💱 Exchange rate initialized:', rate);
      })
      .catch(error => {
        console.error('Failed to initialize exchange rate:', error);
      });

    // Refresh every hour
    const interval = setInterval(() => {
      getUsdToIdrRate()
        .then(rate => {
          console.log('💱 Exchange rate refreshed:', rate);
        })
        .catch(error => {
          console.error('Failed to refresh exchange rate:', error);
        });
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // This component doesn't render anything
  return null;
}
