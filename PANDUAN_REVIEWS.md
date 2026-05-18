# 📝 Panduan: Sistem Review/Testimoni NusaBeeTrip

Panduan lengkap untuk fitur ulasan tamu yang sudah terhubung database, siap untuk Google integration nanti.

---

## ✅ Yang Sudah Dibuat

### 1. Database
- **Tabel `reviews`** dengan 30+ kolom siap pakai
- Field `google_review_id`, `google_review_url`, `synced_to_google` — disiapkan untuk sync ke Google Business Profile nantinya
- Sistem moderasi (`pending` / `approved` / `rejected` / `spam`)
- Owner response (Anda bisa balas review)
- Featured/Pinned review (review penting bisa di-pin ke atas)

### 2. UI Komponen — Google Style
- **Section testimoni di homepage** dengan layout mirip Google reviews
- **Avatar bulat** dengan inisial nama (sama seperti Google)
- **Star rating** dengan animasi hover
- **Country flag emoji** dari ISO code
- **Filter bahasa** (English / Indonesia / Semua)
- **Logo Google** di kartu rating sebagai trust signal
- **Verified badge** ✓ biru untuk tamu real
- **Owner response box** kalau Anda sudah balas

### 3. Form Submission Review
- Modal popup elegan saat tombol "Write a review" diklik
- Field: nama, email, country, tour, rating, judul, body
- Validasi minimal 20 karakter
- Spam detection otomatis
- Submit → masuk database dengan status `pending`
- Anda harus approve dulu sebelum tampil di website

### 4. API Endpoint
- `GET /api/reviews` — fetch reviews approved (untuk display)
- `POST /api/reviews` — submit review baru (auto pending)

---

## 🚀 Setup Database (1x doang)

### Step 1: Apply Migration ke Neon

**Cara A — Lewat Drizzle Push (paling mudah):**
```bash
npm run db:push
```
Ini akan push schema baru ke database. Drizzle akan deteksi tabel `reviews` belum ada dan membuatnya.

**Cara B — Lewat SQL manual (kalau Cara A error):**
1. Buka https://console.neon.tech
2. Pilih project Anda → SQL Editor
3. Copy isi file `drizzle/0001_add_reviews_table.sql`
4. Paste & Run

### Step 2: Seed Data Awal (Opsional)

Kalau mau pakai testimoni yang sudah saya tulis sebagai starter content:
```bash
npm run db:seed-reviews
```

Ini akan masukkan 6 testimoni sample ke DB dengan status `approved`.

### Step 3: Test
1. Jalankan: `npm run dev`
2. Buka `http://localhost:3000`
3. Scroll ke section "Reviews from Our Guests"
4. Klik tombol "Write a review"
5. Isi form → submit
6. Check database — review akan ada dengan status `pending`

---

## 🛠️ Cara Moderasi Review (Approve/Reject)

### Opsi 1: Via Neon SQL Editor (untuk sekarang, paling cepat)

Login ke https://console.neon.tech → SQL Editor:

**Lihat review yang menunggu moderasi:**
```sql
SELECT id, author_name, author_country, rating, title, body, created_at 
FROM reviews 
WHERE status = 'pending'
ORDER BY created_at DESC;
```

**Approve review (ganti `1` dengan ID review):**
```sql
UPDATE reviews 
SET status = 'approved', 
    moderated_at = NOW(), 
    moderated_by = 'admin',
    is_verified = true
WHERE id = 1;
```

**Reject review:**
```sql
UPDATE reviews 
SET status = 'rejected', 
    moderated_at = NOW(), 
    moderated_by = 'admin',
    rejection_reason = 'Off-topic / spam'
WHERE id = 1;
```

**Pin review penting ke atas (featured):**
```sql
UPDATE reviews 
SET is_featured = true 
WHERE id = 1;
```

**Balas review:**
```sql
UPDATE reviews 
SET owner_response = 'Thank you so much! We appreciate your kind words. See you again next time! 🌴',
    owner_responded_at = NOW()
WHERE id = 1;
```

### Opsi 2: Buat halaman Admin (rekomendasi nanti)

Buatkan halaman `/admin/reviews` yang protected dengan password sederhana. Bisa saya bantu kalau diperlukan.

---

## 🔗 Google Business Profile Integration (Persiapan)

Tabel `reviews` sudah punya kolom siap pakai untuk sync dengan Google:

| Kolom | Fungsi |
|-------|--------|
| `google_review_id` | ID review di Google (unique) |
| `google_review_url` | Link ke review di Google Maps |
| `synced_to_google` | Boolean — sudah disinkronkan atau belum |
| `source` | Asal review: `'website'`, `'google'`, `'whatsapp'`, dll |

### Skenario Sync (kalau GMB sudah aktif nanti)

**Skenario A — Manual sync (paling mudah):**
1. Tamu kasih review di Google Maps
2. Anda copy review tersebut → masukkan via API atau SQL ke tabel `reviews`
3. Set `source = 'google'`, isi `google_review_id` dan `google_review_url`
4. Set `status = 'approved'`
5. Review tampil di website dengan badge "From Google"

**Skenario B — Auto sync (nanti, kalau ada budget):**
1. Pakai Google Business Profile API
2. Setup webhook / cron job yang fetch new Google reviews
3. Auto insert ke tabel `reviews` dengan `source = 'google'`, status auto-approved
4. Saya bisa bantu setup ini saat GMB sudah aktif & verified

---

## 📊 Status Review (Lifecycle)

```
pending  ──[approve]──> approved (tampil di website)
   │
   ├──[reject]──> rejected (tidak tampil, tersimpan)
   │
   └──[auto]──> spam (tidak tampil, dari spam detection)
```

Hanya status `approved` yang tampil ke publik.

---

## 📈 Strategi Mendapatkan Review

### 1. Setelah Trip
Kirim WhatsApp template:
> Halo Kak [Nama]! 🙏 Terima kasih sudah trip bersama NusaBeeTrip. Semoga liburannya menyenangkan!
>
> Boleh tolong kasih ulasan singkat di website kami? Cuma butuh 1 menit:
> https://nusabeetrip.com/#testimonials
>
> Klik "Write a review" → isi rating & ceritanya
>
> Ulasan Kak sangat membantu wisatawan lain yang mau ke Nusa Penida. Trims! 🌺

### 2. Insert Manual (kalau review datang via WA)

Kalau tamu kasih testimoni via WhatsApp dan tidak mau isi form sendiri, masukkan manual via SQL:

```sql
INSERT INTO reviews (
  author_name, author_country, author_country_code,
  rating, title, body, language,
  tour_name, service_type, source,
  status, is_verified, is_featured
) VALUES (
  'Sarah M.', 'Australia', 'AU',
  5, 'Amazing experience!', 
  'The whole West Trip was perfect. Our guide was super friendly and knowledgeable. Highly recommend!',
  'en',
  'West Trip', 'tour', 'whatsapp',
  'approved', true, false
);
```

### 3. Insentif (opsional)
Tawarkan diskon kecil untuk tamu yang kasih review:
> "Kasih review jujur → dapat 10% diskon untuk trip berikutnya!"

---

## 🎨 Style Notes

Komponen testimoni dibuat menyerupai Google reviews:
- **Avatar bulat** dengan inisial → sama seperti Google
- **Layout 3 kolom** di desktop, responsive
- **Logo Google** di rating card → memberikan signal trust
- **Star rating yellow** standar Google
- **Owner response box** dengan quote icon → mirip Google

Saat GMB sudah aktif nanti, tampilan di website sudah "siap merge" dengan style Google asli, hanya tinggal switch source.

---

## 🆘 Troubleshooting

### Q: Form submit error "Failed to submit"
- Pastikan `DATABASE_URL` sudah set di `.env.local`
- Pastikan migration sudah di-apply (`npm run db:push`)
- Cek browser console untuk error detail

### Q: Review yang submit tidak muncul
- Default status adalah `pending` — Anda harus approve dulu
- Lihat panduan moderasi di atas

### Q: Mau tampilkan langsung tanpa moderasi?
Edit `src/app/api/reviews/route.ts`, ganti:
```typescript
status: isSpam ? 'spam' : 'pending',
```
Jadi:
```typescript
status: isSpam ? 'spam' : 'approved',
```
**⚠️ Tidak rekomendasi** — bisa bikin website penuh spam tanpa moderasi.

### Q: Bagaimana sambungkan dengan Google Maps Reviews nanti?
Setelah Google Business Profile aktif:
1. Saya bisa bantu setup Google Places API key
2. Buat cron job harian yang fetch review terbaru
3. Auto-insert ke DB dengan `source = 'google'`
4. Review Google muncul otomatis di website Anda

---

**Selesai! Sistem review sudah ready, tinggal apply migration & seed.** 🎉
