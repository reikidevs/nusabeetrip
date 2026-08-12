# Checklist SEO, Local SEO, dan GEO — NusaBeeTrip

Status diperbarui: 13 Agustus 2026.

Legenda: `[x]` selesai di kode, `[ ]` masih membutuhkan deploy, akses akun, data pelanggan, atau pekerjaan rutin.

## Sudah dikerjakan di website

- [x] Menghapus `aggregateRating` dan `Review` dari schema bisnis agar error Search Console “Ulasan memiliki beberapa rating gabungan” tidak muncul lagi.
- [x] Menyatukan identitas entity `NusaBeeTrip` pada `TravelAgency`, `WebSite`, artikel, publisher, alamat, koordinat, Place ID, telepon, dan profil Google Maps.
- [x] Menyediakan canonical, hreflang EN/ID, sitemap, image sitemap, robots.txt, dan `llms.txt`.
- [x] Memperkuat H1 homepage untuk intent non-brand: private driver dan tour Nusa Penida.
- [x] Memperkuat metadata, keyword, H1, isi, pickup, dan pilihan rute halaman mobil dengan sopir/private driver.
- [x] Menyamakan jam layanan website dan schema menjadi 08.00–22.00 WITA.
- [x] Mengganti klaim “24/7” pada area komersial dengan jam layanan yang dapat dibuktikan.
- [x] Menjadikan semua ulasan website—positif maupun negatif—berstatus `pending` sampai dimoderasi; spam tetap tersembunyi.
- [x] Menyembunyikan enam testimonial fixture lama dari API publik tanpa menghapus record auditnya.
- [x] Menonaktifkan script seed testimonial fixture ke database production.
- [x] Menghapus fallback testimonial statis dan generator AggregateRating lama untuk mencegah error schema kembali.
- [x] Memisahkan jelas ulasan Google dan ulasan yang dikirim melalui website.
- [x] Menjalankan 191 unit/component/route tests: semuanya lulus.
- [x] Menjalankan build production dan audit render lokal: H1, metadata private driver, jam 08.00, BlogPosting/FAQ, serta ketiadaan Review/AggregateRating telah terverifikasi.

## Wajib setelah deploy

- [ ] Deploy perubahan ini ke production.
- [ ] Buka Rich Results Test untuk homepage dan satu halaman guide; pastikan tidak ada `aggregateRating` atau `Review` pada entity NusaBeeTrip.
- [ ] Di Search Console, buka masalah “Ulasan memiliki beberapa rating gabungan” lalu klik **Validasi perbaikan**.
- [ ] Inspect dan minta indexing untuk `/`, `/rentals/car-rental`, `/id/rentals/car-rental`, dan guide scooter.
- [ ] Pastikan sitemap terbaru berhasil dibaca dan semua URL penting berstatus indexable.

## Google Business Profile — prioritas tertinggi

- [ ] Pastikan jam profil Google persis 08.00–22.00 WITA setiap hari, termasuk jam tutupnya.
- [ ] Tetapkan kategori utama paling relevan (tour operator/travel agency) dan kategori tambahan hanya untuk layanan nyata.
- [ ] Isi layanan beserta harga awal: West Trip, East Trip, Mix Trip, snorkeling, private driver, dan scooter rental.
- [ ] Tambahkan minimal 20 foto asli: tim/sopir, kendaraan, pickup, tamu berizin, dan tiap destinasi; lanjutkan 3–5 foto baru per bulan.
- [ ] Publikasikan satu Google Post per minggu.
- [ ] Balas seluruh ulasan Google secara spesifik dan natural.
- [ ] Jika ulasan Google yang ada ditulis pemilik, staf, developer, keluarga, atau pihak berkepentingan, hapus; gunakan hanya pengalaman pelanggan asli.
- [ ] Minta 5–10 pelanggan asli pertama menulis ulasan Google melalui link resmi setelah trip, tanpa hadiah dan tanpa memilih hanya pelanggan yang puas.

## Kepercayaan dan E-E-A-T

- [ ] Audit 18 ulasan website lama yang bukan fixture: cocokkan dengan bukti booking/WhatsApp dan izin publikasi.
- [ ] Pertahankan hanya ulasan yang provenance-nya dapat dibuktikan; tandai `isVerified` hanya setelah pemeriksaan.
- [ ] Tambahkan nama lengkap pemilik/penanggung jawab, foto asli, peran, dan pengalaman nyata pada halaman About setelah datanya dikonfirmasi.
- [ ] Tambahkan nomor legal/izin usaha jika tersedia dan memang boleh dipublikasikan.
- [ ] Buat halaman kebijakan pembatalan/refund yang spesifik, mudah ditemukan, dan konsisten dengan proses booking WhatsApp.

## Otoritas topik dan GEO/AI discovery

- [ ] Terbitkan 2 artikel lapangan per bulan berdasarkan pertanyaan pelanggan nyata; sertakan tanggal update, kondisi lapangan, dan tautan ke layanan yang relevan.
- [ ] Tambahkan sumber primer untuk fakta yang mudah berubah seperti jadwal kapal, tarif masuk, dan aturan berkendara.
- [ ] Bangun mention/link asli dari homestay, operator fast boat, dive shop, direktori pariwisata lokal, dan media travel yang relevan.
- [ ] Jaga konsistensi NAP: NusaBeeTrip, alamat Banjarnyuh–Ped, dan nomor telepon pada semua profil.

## Pengukuran

- [ ] Catat baseline Search Console: klik, impresi, CTR, posisi, dan query non-brand untuk homepage/private driver.
- [ ] Pantau mingguan query posisi 5–20 dan perbaiki halaman yang sudah mendapat impresi sebelum membuat banyak halaman baru.
- [ ] Pantau jumlah panggilan, klik WhatsApp, permintaan arah, dan booking per landing page.
- [ ] Evaluasi setelah 28 hari dan 90 hari; SEO lokal dan organik tidak dapat dinilai dari satu kali crawl.

## Target selesai terdekat

1. Deploy dan validasi schema di Search Console.
2. Rapikan Google Business Profile dan dapatkan ulasan pelanggan asli.
3. Verifikasi provenance ulasan website lama.
4. Ukur query non-brand “private driver nusa penida” dan optimasi berdasarkan data 28 hari.
