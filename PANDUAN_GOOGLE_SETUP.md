# 🚀 Panduan Lengkap: Setup Google untuk NusaBeeTrip

Step-by-step panduan untuk submit website ke Google + cara dapat ulasan terlihat di Google.

---

## 📋 Daftar Isi
1. [Submit Sitemap ke Google Search Console](#1-submit-sitemap-ke-google-search-console)
2. [Verifikasi Domain Jagoanhosting](#2-verifikasi-domain-jagoanhosting)
3. [Kapan Website Muncul di Google?](#3-kapan-website-muncul-di-google)
4. [Bikin Testimoni di Website (Sudah Ready!)](#4-fitur-testimoni-di-website-sudah-ready)
5. [Google Business Profile (GMB) — Setelah ada waktu](#5-google-business-profile-untuk-bintang-google)

---

## 1. Submit Sitemap ke Google Search Console

### 🎯 Tujuan
Memberitahu Google bahwa website nusabeetrip.com sudah siap untuk di-index, sehingga muncul di hasil pencarian.

### 🪜 Langkah-langkah (5 menit)

#### Step 1: Buka Google Search Console
1. Buka https://search.google.com/search-console
2. Login dengan akun Google bisnis Anda (yang nantinya juga dipakai untuk GMB)

#### Step 2: Tambahkan Property
1. Klik tombol **"Add Property"** di pojok kiri atas
2. Pilih jenis property: **"URL prefix"** (yang kanan)
3. Masukkan domain lengkap: `https://nusabeetrip.com`
4. Klik **Continue**

#### Step 3: Verifikasi Kepemilikan Domain (Pilih salah satu)

**🟢 Cara TERMUDAH — Upload File HTML (recommended untuk Jagoanhosting):**
1. Google akan kasih file HTML, contoh: `googleXXXXXXXXX.html`
2. Download file tersebut
3. Login ke cPanel Jagoanhosting Anda
4. Buka **File Manager** → masuk ke folder `public_html`
5. Upload file HTML tadi ke folder `public_html` (root domain)
6. Kembali ke Search Console → klik **Verify**
7. ✅ Selesai!

**🟡 Cara Alternatif — DNS TXT Record (kalau punya akses DNS):**
1. Pilih opsi "Domain" (bukan URL prefix) saat tambah property
2. Google kasih kode TXT seperti: `google-site-verification=ABC123...`
3. Login ke control panel domain Anda
4. Buka menu **DNS Management** atau **DNS Zone Editor**
5. Tambah record baru:
   - Type: **TXT**
   - Name/Host: `@` (atau kosong)
   - Value: paste kode `google-site-verification=ABC123...`
   - TTL: 3600
6. Save → tunggu 5-30 menit untuk propagasi
7. Klik **Verify** di Search Console

**🔵 Cara Lain — Meta Tag (sudah disiapkan di kode):**
1. Pilih opsi "HTML tag"
2. Copy kode dari Google: contoh `content="ABC123..."`
3. Edit file `.env.local` di project (atau env di Vercel/hosting):
   ```
   GOOGLE_SITE_VERIFICATION=ABC123...
   ```
4. Deploy ulang website
5. Klik **Verify**

#### Step 4: Submit Sitemap (Inti dari step ini!)
Setelah verified:
1. Di Search Console, klik menu **"Sitemaps"** di sidebar kiri
2. Di kolom "Add a new sitemap", ketik: `sitemap.xml`
3. URL lengkap akan jadi: `https://nusabeetrip.com/sitemap.xml`
4. Klik **Submit**
5. Status akan jadi **"Success"** dalam beberapa detik
6. ✅ Selesai!

---

## 2. Verifikasi Domain Jagoanhosting

### Setup DNS (kalau domain Anda di Jagoanhosting tapi hosting lain)

Kalau hosting Anda di Vercel/Netlify/dll tapi domain di Jagoanhosting:

1. Login ke client area Jagoanhosting: https://my.jagoanhosting.com
2. Pilih domain Anda → **DNS Management**
3. Tambah record:
   - **A Record**: `@` → IP server hosting Anda
   - **CNAME**: `www` → domain hosting Anda
4. Save → propagasi 1-24 jam

### Setup Email Server (untuk SEO trust)
Tambah SPF record di DNS:
- Type: TXT
- Name: `@`
- Value: `v=spf1 include:_spf.google.com ~all`

Ini membantu signal trust untuk Google.

---

## 3. Kapan Website Muncul di Google?

### 📅 Timeline Realistis

| Waktu | Yang Terjadi |
|-------|--------------|
| **Hari 1** | Submit sitemap ke Search Console |
| **Hari 1-3** | Google mulai crawling website (`Coverage` muncul di GSC) |
| **Hari 3-14** | Halaman mulai ter-index (muncul di hasil pencarian) |
| **Minggu 2-4** | Mulai muncul untuk keyword brand "NusaBeeTrip" |
| **Bulan 2-3** | Mulai ranking untuk keyword umum (nusa penida tour, dll) |
| **Bulan 3-6** | Star rating ⭐⭐⭐⭐⭐ mulai muncul di SERP (jika rich snippet di-approve) |

### ⚡ Cara MEMPERCEPAT Indexing

#### A. URL Inspection (instan untuk halaman penting)
1. Di Search Console, klik **"URL Inspection"** di top bar
2. Paste URL: `https://nusabeetrip.com`
3. Klik **"Request Indexing"**
4. Ulangi untuk halaman penting:
   - `https://nusabeetrip.com/tours`
   - `https://nusabeetrip.com/rentals`
   - `https://nusabeetrip.com/about`
   - `https://nusabeetrip.com/contact`

#### B. Backlink Cepat (boost trust)
- Daftarkan ke directory wisata gratis:
  - https://www.tripadvisor.com (claim listing)
  - https://www.balitripadvisor.com
  - https://www.indonesia.travel (submit form)
- Share link website di:
  - Bio Instagram
  - WhatsApp Business profile
  - Facebook bio
  - Tiket.com / Traveloka (kalau ada listing)

#### C. Promosikan ke Tamu
Setiap tamu baru, kirim WhatsApp dengan link review:
> "Hi [nama], terima kasih sudah trip bareng NusaBeeTrip! 🌴 Boleh tolong kasih review pendek di sini: nusabeetrip.com — ini sangat membantu bisnis kami. Terima kasih banyak! 🙏"

---

## 4. Fitur Testimoni di Website (Sudah Ready!)

### ✅ Yang Sudah Dibuat

Saya sudah implementasikan fitur testimoni di website Anda:

1. **Section testimoni di homepage** — di antara "Why Us" dan "Vehicle Rentals"
2. **Star rating ⭐⭐⭐⭐⭐ visible di halaman**
3. **Filter bahasa** (English / Indonesia / Semua)
4. **Tombol "Tulis Ulasan"** yang langsung kirim WhatsApp
5. **Schema.org markup** — supaya bintang muncul di Google nanti
6. **6 testimoni sample** sudah saya isi (silakan ganti dengan testimoni asli)

### 📝 Cara Menambah Testimoni Baru

Edit file: `src/lib/testimonials.ts`

Tinggal tambah objek baru di array `TESTIMONIALS`:

```typescript
{
  id: 'review-007',                    // unique ID
  name: 'Nama Tamu',                   // boleh inisial: "John D."
  country: 'Australia',                // negara asal
  countryCode: 'AU',                   // 2 huruf: AU, ID, GB, US, dll
  rating: 5,                           // 1-5
  tour: 'West Trip',                   // nama paket yang diambil
  date: '2026-05-18',                  // tanggal: YYYY-MM-DD
  title: 'Amazing experience!',        // judul singkat (optional)
  body: 'Isi review lengkap...',       // 60-300 karakter ideal
  language: 'en',                      // 'en' atau 'id'
  verified: true,                      // true = ada badge centang biru
  source: 'whatsapp',                  // dari mana review-nya
},
```

Save → refresh website → testimoni langsung muncul!

### 🎯 Cara Dapatkan Testimoni dari Tamu

#### Template WhatsApp untuk minta review:

**Bahasa Indonesia:**
> Halo Kak [Nama]! 🙏
>
> Terima kasih sudah trip bersama NusaBeeTrip! Semoga liburannya menyenangkan ya.
>
> Boleh minta tolong kasih ulasan singkat tentang pengalaman Kak? Cukup 2-3 kalimat saja:
> - Nama: 
> - Asal: 
> - Paket yang diambil: 
> - Rating (1-5): 
> - Cerita pengalaman: 
>
> Ulasan Kak sangat membantu wisatawan lain yang mau ke Nusa Penida. Terima kasih banyak! 🌺

**English:**
> Hi [Name]! 🙏
>
> Thank you for traveling with NusaBeeTrip! We hope you had an amazing time in Nusa Penida.
>
> Could you spare 1 minute to share your experience? Just a few lines would mean a lot:
> - Name:
> - Country:
> - Tour package taken:
> - Rating (1-5):
> - Your experience:
>
> Your review helps fellow travelers and supports our small local business! 🌺

---

## 5. Google Business Profile (untuk bintang Google)

### 🎯 Apa itu GMB / Google Business Profile?
Profil bisnis di Google Maps. Kalau orang search "nusa penida tour", bisnis Anda muncul di **Map Pack** dengan ⭐ rating dan review.

### 📅 Realisasinya Berapa Lama?

| Step | Waktu |
|------|-------|
| Buat profil di https://business.google.com | 10 menit |
| Verifikasi (kirim postcard ke alamat) | **5-14 hari** |
| Profil aktif & bisa terima review | Setelah verified |
| Review pertama muncul di Maps | Instant setelah tamu submit |
| Star rating muncul di Google Search | 1-7 hari |

### 🚀 Mulai Sekarang Saja
1. Buka https://business.google.com
2. Klik "Manage now"
3. Isi:
   - **Business name**: NusaBeeTrip
   - **Category**: Travel agency / Tour operator
   - **Address**: Nusa Penida, Klungkung, Bali
   - **Phone**: +62 896-3128-1234
   - **Website**: https://nusabeetrip.com
4. Pilih verifikasi:
   - **Postcard** (paling reliable, 5-14 hari)
   - **Phone** (kalau available)
   - **Email** (kalau available)
5. Sambil nunggu, sudah bisa setting:
   - Upload foto (10-15 foto bagus dari trip)
   - Tulis "About" / deskripsi
   - Set jam operasional
   - Tambah service: Tour, Snorkeling, Vehicle Rental

### 💡 PRO TIP — Sambil Nunggu Verifikasi

Pakai **fitur testimoni di website** dulu (sudah saya bikin!).
Setelah GMB aktif, Anda bisa minta tamu yang sudah review di WhatsApp untuk ulang review-nya di Google Maps.

---

## ✅ Checklist Action Plan (Mulai Hari Ini)

### Today
- [ ] Submit sitemap ke Search Console (15 menit)
- [ ] Request indexing untuk 5 halaman utama (5 menit)
- [ ] Daftar Google Business Profile + minta postcard verification (10 menit)
- [ ] Edit `src/lib/testimonials.ts` — ganti sample dengan testimoni asli dari tamu lama

### Minggu ini
- [ ] Update bio Instagram dengan link `nusabeetrip.com`
- [ ] Update WhatsApp Business profile dengan link
- [ ] Minta 3-5 tamu lama untuk kasih testimoni (via WA template di atas)
- [ ] Daftar TripAdvisor business listing

### Bulan depan
- [ ] Cek Search Console untuk performance keyword
- [ ] Verifikasi Google Business Profile (postcard arrived)
- [ ] Minta tamu baru kasih review di Google Maps
- [ ] Update testimoni di website dengan yang baru

---

## 🆘 Troubleshooting

### Q: Sitemap "Couldn't fetch" di Search Console
- Pastikan website sudah live dan bisa diakses
- Cek `https://nusabeetrip.com/sitemap.xml` di browser → harus tampil XML
- Cek `https://nusabeetrip.com/robots.txt` → harus tampil text

### Q: Sudah submit tapi belum muncul di Google?
- Tunggu 3-14 hari (normal)
- Search dengan `site:nusabeetrip.com` di Google → kalau halaman muncul, berarti sudah ter-index
- Kalau setelah 2 minggu tetap tidak muncul, cek Coverage report di Search Console

### Q: Bintang ⭐ kapan muncul di hasil Google?
- Schema sudah saya pasang dengan benar
- Tapi Google butuh waktu 1-3 bulan untuk percaya & menampilkan rich snippet
- Penting: jangan rekayasa rating! Pakai testimoni asli saja

### Q: Domain Jagoanhosting saya, tapi hosting di mana?
- Project Next.js ini bisa di-host di:
  - **Vercel** (recommended, gratis untuk traffic kecil) — vercel.com
  - **Netlify** — netlify.com
  - **VPS** (Jagoanhosting Cloud VPS) — perlu setup manual
- Kalau bingung, deploy ke Vercel paling mudah, lalu point domain Jagoanhosting ke Vercel.

---

**Selamat! Web sudah siap SEO Powerful + fitur review.** 🎉
Tinggal eksekusi checklist di atas. Kalau ada yang stuck, kabari saya.
