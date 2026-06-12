# SEO Action Checklist — NusaBeeTrip

Setup teknis di kode sudah selesai. Dokumen ini adalah pekerjaan **off-page** (gratis) yang menentukan apakah kamu muncul di Google. Kerjakan berurutan.

---

## 1. Google Search Console (WAJIB — gratis)

Tanpa ini kamu buta: tidak tahu keyword apa yang sudah masuk Google.

1. Buka https://search.google.com/search-console
2. Add property → pilih **URL prefix** → `https://nusabeetrip.com`
3. Verifikasi pakai **HTML tag**:
   - Salin kode dari meta tag `google-site-verification`
   - Isi ke Vercel: Environment Variable `GOOGLE_SITE_VERIFICATION` (tanpa tanda kutip)
   - Redeploy, lalu klik Verify
4. Setelah verified → menu **Sitemaps** → submit:
   - `sitemap.xml`
   - `image-sitemap.xml`
5. Menu **URL Inspection** → tempel `https://nusabeetrip.com` → **Request Indexing**. Ulangi untuk halaman penting (tours, bali-day-trip, tiap guide baru).

**Cek mingguan:** menu Performance → lihat query mana yang muncul. Keyword di posisi 5–15 = peluang; perkuat kontennya.

---

## 2. Google Business Profile (DAMPAK TERBESAR — gratis)

Untuk "tour nusa penida", "best tour bali" Google menampilkan **Map Pack** (3 bisnis + peta) di atas hasil organik. Tanpa GBP kamu tidak muncul di sana sama sekali.

1. Buka https://business.google.com → Add business
2. Nama: **NusaBeeTrip**
3. Kategori utama: **Tour operator** / **Tour agency**
   - Kategori tambahan: _Boat tour agency_, _Motor scooter rental agency_
4. Lokasi: Nusa Penida (set service area kalau tidak punya toko fisik — pilih "I deliver goods and services to my customers")
5. Service area: Nusa Penida, Nusa Lembongan, Nusa Ceningan, Klungkung
6. Telepon: +62 896-3128-1234 · Website: https://nusabeetrip.com
7. Jam buka: 06:00–22:00 (samakan dengan `site-config.ts`)
8. **Verifikasi** (video/postcard) — wajib supaya profil tampil

Setelah aktif:

- Upload **minimal 20 foto** asli (tiap destinasi, kendaraan, tamu) — foto = sinyal ranking kuat di Maps
- Tulis deskripsi 750 karakter pakai keyword utama
- Tambahkan **Products/Services**: West Trip, East Trip, Mix Trip, Snorkeling, Rental — beri harga
- Posting **Google Posts** tiap minggu (promo/foto) — gratis & boost aktivitas

**Review = bahan bakar utama Map Pack:**

- Minta setiap tamu kasih review Google setelah trip
- Buat link pendek review (dari dashboard GBP → "Ask for reviews")
- Kirim link itu via WhatsApp setelah tour selesai
- **Balas semua review** (positif & negatif) — sinyal engagement

---

## 3. Bing Webmaster Tools (gratis, 5 menit)

1. https://www.bing.com/webmasters → import langsung dari Google Search Console (1 klik)
2. Atau verifikasi manual: isi env `BING_SITE_VERIFICATION` di Vercel
3. Submit `sitemap.xml`

---

## 4. Konten — lever terbesar untuk "keyword apapun"

Tiap artikel = satu pintu masuk Google. Kompetitor yang ranking punya 30–50 artikel.

**Sudah dibuat (sesi ini):**

- Guides baru: is-nusa-penida-worth-it, nusa-penida-tour-cost, manta-ray-snorkeling, renting-a-scooter, where-to-stay
- Destinasi baru: tree-house-molenteng
- Landing page: /bali-day-trip

**Ide artikel berikutnya (long-tail, mudah menang):**

- "Nusa Penida vs Gili Islands"
- "Nusa Penida with kids / family guide"
- "Best beaches in Nusa Penida"
- "Nusa Penida photography spots"
- "Nusa Penida 1 day from Kuta/Seminyak/Ubud" (1 artikel per kota asal)
- "Sanur to Nusa Penida fast boat schedule"

**Cara nambah:** edit `src/lib/guides.ts` (tiru struktur guide yang ada) — schema, sitemap, internal link otomatis ikut.

---

## 5. Backlink & brand mentions (gratis)

Google percaya situs yang disebut situs lain.

- **TripAdvisor** — daftar bisnis + minta tamu review (muncul di pencarian travel)
- **Listing direktori**: Google Maps, Maps.me, iOverlander, direktori wisata Bali
- **Instagram** (@sidiq_1312): taruh link website di bio, sebut nusabeetrip.com di caption
- **Kolaborasi**: tukar link dengan guesthouse/homestay Nusa Penida, blog travel
- **WhatsApp/Linktree**: arahkan ke website, bukan cuma WA

---

## 6. Ritme rutin (jaga ranking)

| Frekuensi   | Tindakan                                                         |
| ----------- | ---------------------------------------------------------------- |
| Harian      | Balas review GBP, posting story IG dengan link                   |
| Mingguan    | 1 Google Post, cek Search Console Performance, minta review tamu |
| Bulanan     | 1–2 artikel guide baru, update foto GBP                          |
| Per quarter | Audit keyword posisi 5–15, perkuat artikelnya                    |

---

## Prioritas (kalau waktu terbatas)

1. **Google Business Profile + review** ← kerjakan ini dulu, dampak tercepat
2. **Google Search Console** + submit sitemap
3. **Minta review tamu** secara konsisten
4. **Tambah artikel** rutin
5. Backlink

Teknis sudah 9/10. Sisanya murni eksekusi off-page yang konsisten.
