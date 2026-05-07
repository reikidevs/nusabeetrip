# Real-Time Exchange Rate System

## Overview

Website sekarang menggunakan **real-time USD to IDR exchange rate** dari API eksternal, bukan lagi hardcoded rate.

## Sebelumnya ❌

```typescript
// Hardcoded rate
const IDR_TO_USD_RATE = 16000; // Fixed, tidak update
```

**Masalah:**
- Rate tidak pernah update
- Tidak akurat dengan kondisi pasar real
- Harus manual update code jika rate berubah

## Sekarang ✅

```typescript
// Real-time rate dari API
const rate = await getUsdToIdrRate(); // Fetch dari API
```

**Keuntungan:**
- ✅ Rate update otomatis setiap 1 jam
- ✅ Akurat dengan kondisi pasar real
- ✅ Tidak perlu manual update
- ✅ Ada fallback jika API gagal

## Cara Kerja

### 1. Exchange Rate Service (`src/lib/exchange-rate.ts`)

**Fungsi Utama:**
- `getUsdToIdrRate()` - Fetch rate dari API
- `getCachedRate()` - Get cached rate (sync)
- `clearCache()` - Clear cache (untuk testing)

**API yang Digunakan:**
- **Provider**: exchangerate-api.com
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest/USD`
- **Gratis**: Tidak perlu API key
- **Limit**: Cukup untuk traffic normal

**Caching:**
- Cache duration: **1 hour** (3600000 ms)
- Jika API gagal: fallback ke rate 16,000 (cache 5 menit)
- Cache di-refresh otomatis

### 2. Currency Formatter (`src/lib/currency.ts`)

**Fungsi:**
- `formatPriceByLang()` - Format IDR price
- `formatUsdPriceByLang()` - Format USD price

**Behavior:**
```typescript
// Bahasa Indonesia
formatPriceByLang(390000, 'id') 
// → "Rp 390.000" (IDR)

// English
formatPriceByLang(390000, 'en') 
// → "$24" (converted with real-time rate)
```

### 3. Exchange Rate Provider (`src/components/ExchangeRateProvider.tsx`)

**Fungsi:**
- Fetch rate saat aplikasi load
- Auto-refresh setiap 1 jam
- Berjalan di background

**Lifecycle:**
```
App Load → Fetch Rate → Cache (1 hour) → Auto Refresh → Repeat
```

## Contoh Rate Real-Time

**Saat ini (contoh):**
```
1 USD = 15,850 IDR (real-time dari API)
```

**Konversi Otomatis:**
```
Tour West Trip:
- IDR: Rp 390.000
- USD: $25 (390,000 / 15,850 ≈ 25)

Snorkeling:
- IDR: Rp 200.000
- USD: $13 (200,000 / 15,850 ≈ 13)
```

## Fallback System

Jika API gagal (network error, API down, dll):

1. **Coba fetch dari API** ✅
2. **Jika gagal** → Use fallback rate: **16,000**
3. **Cache fallback** untuk 5 menit
4. **Retry** setelah 5 menit

**Log Console:**
```
✅ Fetched real-time exchange rate: 15850
// atau
❌ Failed to fetch exchange rate: [error]
⚠️ Falling back to default rate: 16000
```

## Testing

### Test di Local

```bash
# Run development server
npm run dev

# Check console untuk log:
# "💱 Exchange rate initialized: 15850"
```

### Test Fallback

```typescript
// Di browser console
// Simulate API failure
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(r => r.json())
  .then(console.log)
```

### Manual Clear Cache

```typescript
import { clearCache } from '@/lib/exchange-rate';

// Clear cache untuk force refresh
clearCache();
```

## Monitoring

### Check Current Rate

Di browser console:
```javascript
// Check cached rate
import { getCachedRate } from '@/lib/exchange-rate';
console.log('Current rate:', getCachedRate());
```

### Check API Status

```bash
curl https://api.exchangerate-api.com/v4/latest/USD
```

Response:
```json
{
  "base": "USD",
  "date": "2026-05-07",
  "rates": {
    "IDR": 15850,
    ...
  }
}
```

## Performance

### Cache Strategy

- **First Load**: Fetch dari API (~200ms)
- **Subsequent Loads**: Use cache (instant)
- **After 1 Hour**: Auto refresh di background

### Impact

- ✅ Minimal performance impact
- ✅ Cache reduces API calls
- ✅ Async fetch tidak block UI
- ✅ Fallback ensures reliability

## Configuration

### Change Cache Duration

Edit `src/lib/exchange-rate.ts`:
```typescript
// Default: 1 hour
const CACHE_DURATION = 3600000;

// Change to 30 minutes
const CACHE_DURATION = 1800000;
```

### Change Fallback Rate

Edit `src/lib/currency.ts`:
```typescript
// Default: 16,000
const DEFAULT_IDR_TO_USD_RATE = 16000;

// Change to 15,000
const DEFAULT_IDR_TO_USD_RATE = 15000;
```

### Change API Provider

Edit `src/lib/exchange-rate.ts`:
```typescript
// Current: exchangerate-api.com
const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

// Alternative: fixer.io (requires API key)
const response = await fetch('https://api.fixer.io/latest?base=USD&symbols=IDR');
```

## Troubleshooting

### Rate tidak update

**Check:**
1. Console log: "💱 Exchange rate initialized"
2. Network tab: Request ke exchangerate-api.com
3. Cache: `getCachedRate()` di console

**Solution:**
```typescript
// Clear cache
import { clearCache } from '@/lib/exchange-rate';
clearCache();

// Reload page
window.location.reload();
```

### API Error

**Symptoms:**
- Console: "❌ Failed to fetch exchange rate"
- Using fallback rate: 16,000

**Causes:**
- Network error
- API down
- Rate limit exceeded

**Solution:**
- Wait 5 minutes (auto retry)
- Check API status
- Use fallback rate (automatic)

### Wrong Conversion

**Check:**
1. Current rate: `getCachedRate()`
2. Expected rate: Check exchangerate-api.com
3. Calculation: `IDR / rate = USD`

**Example:**
```
390,000 IDR / 15,850 = 24.6 USD ≈ $25
```

## Future Improvements

### Possible Enhancements

1. **Multiple API Providers**
   - Primary: exchangerate-api.com
   - Fallback: fixer.io, currencyapi.com

2. **Admin Dashboard**
   - View current rate
   - Manual override
   - Rate history

3. **Rate Alerts**
   - Notify if rate changes > 5%
   - Email/WhatsApp notification

4. **Historical Data**
   - Store rate history
   - Show rate trends
   - Analytics

## Summary

✅ **Real-time exchange rate** dari API eksternal
✅ **Auto-refresh** setiap 1 jam
✅ **Caching** untuk performance
✅ **Fallback** jika API gagal
✅ **Zero configuration** - works out of the box

**Status**: ✅ Active & Working
**Last Updated**: May 7, 2026
