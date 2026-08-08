# Integrasi Ulasan Website dan Google Maps

## Alur yang digunakan

1. Tamu mengisi ulasan di website NusaBeeTrip.
2. Ulasan tetap tersimpan di sistem website sesuai alur moderasi yang sudah ada.
3. Setelah berhasil, website menampilkan kembali teks ulasan dan tombol untuk menyalin teks lalu membuka halaman ulasan Google Maps.
4. Tamu login ke akun Google, menempelkan teks bila berkenan, lalu menekan tombol kirim sendiri.

Google Business Profile API tidak menyediakan operasi untuk membuat ulasan pelanggan. Karena itu, website tidak boleh menyatakan bahwa ulasan telah tersinkron otomatis ke Google Maps.

## Konfigurasi sebelum produksi

1. Login ke akun pengelola Google Business Profile NusaBeeTrip.
2. Buka **Baca ulasan** lalu **Dapatkan lebih banyak ulasan**.
3. Salin tautan ulasan resmi yang diberikan Google.
4. Tambahkan environment variable berikut di Vercel:

   ```text
   NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://g.page/r/ID-PROFIL-ANDA/review
   ```

5. Deploy ulang website.

Tanpa nilai tersebut, tombol tetap bekerja tetapi membuka pencarian NusaBeeTrip di Google Maps, bukan langsung ke formulir ulasan.

## Data lama

- Tidak ada migrasi, penghapusan, atau penulisan ulang ulasan lama dalam fase ini.
- Ulasan website dan ulasan Google harus tetap dibedakan sumbernya.
- Jangan memberi hadiah untuk ulasan dan jangan hanya mengarahkan rating tinggi ke Google. Tombol Google harus tersedia secara konsisten untuk semua pelanggan.

## Opsi Google ke website

Menampilkan ulasan Google di website dapat ditambahkan sebagai fase terpisah:

- **Places API (New):** lebih sederhana, tetapi hanya mengembalikan maksimal lima ulasan yang dipilih berdasarkan relevansi dan memerlukan API key serta billing.
- **Business Profile API:** dapat membaca seluruh ulasan profil terverifikasi, tetapi memerlukan OAuth, persetujuan akses Google, penyimpanan token yang aman, pagination, dan proses sinkronisasi server-side.

Untuk jumlah ulasan Google yang masih sedikit, tombol langsung ke Google lebih ringan, transparan, dan mudah dirawat. Integrasi baca dari Google dapat dipertimbangkan kembali saat volume ulasan sudah cukup besar.

## Referensi resmi

- [Google Business Profile review resource](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews)
- [Membuat dan membagikan link atau QR ulasan](https://support.google.com/business/answer/16816815?hl=id)
- [Kebijakan konten Google Maps](https://support.google.com/business/answer/7400114)
- [Places API review fields](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places)
