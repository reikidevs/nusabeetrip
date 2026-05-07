# Deployment Checklist - NusaBeeTrip

## ✅ Pre-Deployment Verification

### 1. Database Check
```bash
# Check tour durations
npx tsx scripts/check-duration.ts

# Check features (Tax Island, Parking Ticket)
npx tsx scripts/check-features.ts

# Check image URLs
npx tsx scripts/check-images.ts

# Compare expected vs actual
npx tsx scripts/compare-db-images.ts
```

### 2. Local Build Test
```bash
# Build the project
npm run build

# Check for errors
# Should complete without errors
```

### 3. Git Status
```bash
# Ensure all changes are committed
git status

# Check recent commits
git log --oneline -5

# Ensure pushed to GitHub
git push
```

## 🚀 Vercel Deployment

### Automatic Deployment
- Push to `main` branch triggers automatic deployment
- Wait 2-3 minutes for build to complete
- Check Vercel dashboard for deployment status

### Manual Deployment (if needed)
1. Go to https://vercel.com/dashboard
2. Select `nusabeetrip` project
3. Go to "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"
6. Select "Use existing Build Cache" = **NO** (force fresh build)

## 🔄 Cache Clearing

### Browser Cache
```
Chrome/Edge: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
Firefox: Ctrl + Shift + Delete
Safari: Cmd + Option + E
```

### Vercel Cache
The following will trigger cache clear:
- ✅ Changing `IMAGE_CACHE_VERSION` in next.config.js
- ✅ Changing `BUILD_TIME` env variable
- ✅ Adding/modifying vercel.json
- ✅ Redeploying without build cache

### CDN Cache
- Vercel automatically purges CDN cache on new deployment
- Wait 2-3 minutes for global propagation

## 📊 Post-Deployment Verification

### 1. Check Website
```
URL: https://nusabeetrip.com/tours
```

**Verify:**
- [ ] Snorkeling duration shows **2 hours** (not 4)
- [ ] All tours show **Tax Island** in features
- [ ] All tours show **Parking Ticket** in features
- [ ] Images load correctly
- [ ] No console errors

### 2. Check Vercel Logs
1. Go to Vercel dashboard
2. Click on latest deployment
3. Click "View Function Logs"
4. Look for:
   - ✅ `Successfully fetched X tour packages from database`
   - ❌ `Failed to fetch` or `Using fallback`

### 3. Performance Check
```
Tools:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

Target Metrics:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
```

## 🐛 Troubleshooting

### Issue: Deployment berhasil tapi perubahan belum muncul

**Gejala:**
- ✅ Build berhasil di Vercel (no errors)
- ❌ Perubahan data belum terlihat di website
- ❌ Masih menampilkan data lama

**Penyebab:** Cache di multiple layers (Browser, CDN, Vercel)

**Solusi (coba berurutan):**

**1. Hard Refresh Browser**
```
Windows: Ctrl + Shift + R atau Ctrl + F5
Mac: Cmd + Shift + R
```

**2. Clear Browser Cache Completely**
```
Chrome/Edge:
1. F12 (DevTools)
2. Right-click refresh button
3. "Empty Cache and Hard Reload"

Or:
1. Ctrl + Shift + Delete
2. Select "Cached images and files"
3. Clear data
```

**3. Test in Incognito/Private Mode**
```
Chrome: Ctrl + Shift + N
Firefox: Ctrl + Shift + P
Safari: Cmd + Shift + N
```
Ini akan bypass semua browser cache

**4. Force Vercel Redeploy (NO CACHE)**
```
1. Buka https://vercel.com/dashboard
2. Pilih project "nusabeetrip"
3. Tab "Deployments"
4. Klik "..." di deployment terakhir
5. Klik "Redeploy"
6. ⚠️ PENTING: UNCHECK "Use existing Build Cache"
7. Klik "Redeploy"
```

**5. Verifikasi Database Production**
```bash
npx tsx scripts/verify-combined-features.ts
```
Pastikan database sudah benar (✅ semua package)

**6. Check Vercel Function Logs**
```
1. Vercel Dashboard > Deployments
2. Klik deployment terakhir
3. Tab "Functions"
4. Cari log: "Successfully fetched X tour packages"
5. Jika ada "Using fallback", berarti database tidak terkoneksi
```

**7. Trigger Cache Bust (sudah otomatis)**
```
IMAGE_CACHE_VERSION sudah di-bump ke 4
Setiap push akan force rebuild
```

**Catatan Penting:**
- ⏱️ Tunggu 2-3 menit setelah deployment selesai
- 🌍 CDN propagation bisa butuh waktu
- 🔄 Jika masih belum muncul setelah 5 menit, lakukan step 4 (Force Redeploy NO CACHE)
- ✅ Database production sudah benar, masalahnya di cache layer

---

### Issue: Old data still showing

**Solution 1: Force Browser Refresh**
```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
```

**Solution 2: Incognito/Private Mode**
```
Open website in incognito/private browsing mode
This bypasses all browser cache
```

**Solution 3: Redeploy Vercel**
```bash
# Make a small change to force rebuild
git commit --allow-empty -m "chore: force Vercel rebuild"
git push
```

**Solution 4: Check Database Connection**
```bash
# Verify DATABASE_URL is set in Vercel
# Go to: Settings > Environment Variables
# Ensure DATABASE_URL exists for Production
```

### Issue: Images not loading

**Check:**
1. Images exist in `public/images/` folder
2. Image paths use URL encoding (%20 for spaces)
3. Git tracked the images: `git ls-files public/images/`
4. Vercel build logs show images copied

**Fix:**
```bash
# Ensure images are committed
git add public/images/
git commit -m "fix: ensure all images are tracked"
git push
```

### Issue: Slow loading

**Optimize:**
1. Check image sizes (should be < 500KB each)
2. Enable image optimization in next.config.js
3. Use WebP/AVIF formats
4. Enable compression
5. Check Vercel region (should be close to users)

## 📝 Current Configuration

### Database
- **Provider:** Neon PostgreSQL
- **Connection:** Serverless (HTTP)
- **Location:** Check Neon dashboard

### Vercel
- **Framework:** Next.js 14.2.18
- **Node Version:** 20.x
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### Environment Variables (Vercel)
Required:
- `DATABASE_URL` - Neon PostgreSQL connection string

Optional:
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TO_EMAIL`
- `BUSINESS_PHONE`
- `BUSINESS_EMAIL`
- `BUSINESS_INSTAGRAM`

## ✅ Success Criteria

Deployment is successful when:
- [x] Build completes without errors
- [x] Website loads in < 3 seconds
- [x] All images display correctly
- [x] Snorkeling shows 2 hours duration
- [x] All tours show Tax Island & Parking Ticket
- [x] Database connection works (check logs)
- [x] No console errors in browser
- [x] Mobile responsive works
- [x] WhatsApp buttons work

## 🔗 Quick Links

- **Website:** https://nusabeetrip.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/reikidevs/nusabeetrip
- **Neon Dashboard:** https://console.neon.tech

## 📞 Support

If issues persist after following this checklist:
1. Check Vercel deployment logs
2. Check Neon database status
3. Verify environment variables
4. Test in incognito mode
5. Check browser console for errors
