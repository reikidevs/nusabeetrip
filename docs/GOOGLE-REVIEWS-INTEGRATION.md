# Integrasi Ulasan Website dan Google Maps

## Alur yang digunakan

1. Tamu mengisi ulasan di website NusaBeeTrip.
2. Ulasan tetap tersimpan di sistem website sesuai alur moderasi yang sudah ada.
3. Setelah berhasil, website menampilkan kembali teks ulasan dan tombol untuk menyalin teks lalu membuka halaman ulasan Google Maps.
4. Tamu login ke akun Google, menempelkan teks bila berkenan, lalu menekan tombol kirim sendiri.

Google Business Profile API tidak menyediakan operasi untuk membuat ulasan pelanggan. Karena itu, website tidak boleh menyatakan bahwa ulasan telah tersinkron otomatis ke Google Maps.

## Identitas Google Maps yang digunakan

- Place ID: `ChIJUwlc6Uhz0i0RUwOyEzu2e-Y`
- Link profil: <https://maps.app.goo.gl/AT6nfQVX19KM9ryZ6>
- Link ulasan langsung: <https://search.google.com/local/writereview?placeid=ChIJUwlc6Uhz0i0RUwOyEzu2e-Y>
- Koordinat listing: `-8.6791946, 115.4921559`

Identitas ini sudah menjadi konfigurasi tetap website. URL pencarian umum tidak lagi digunakan untuk tombol profil maupun tombol ulasan, dan environment variable lama tidak dapat mengarahkannya ke listing lain.

## Data lama

- Tidak ada migrasi, penghapusan, atau penulisan ulang ulasan lama dalam fase ini.
- Ulasan website dan ulasan Google harus tetap dibedakan sumbernya.
- Jangan memberi hadiah untuk ulasan dan jangan hanya mengarahkan rating tinggi ke Google. Tombol Google harus tersedia secara konsisten untuk semua pelanggan.

## Google ke website melalui Places API (New)

Endpoint read-only `/api/google-reviews` mengambil rating profil dan maksimal lima
ulasan yang dipilih serta diurutkan Google berdasarkan relevansi. Endpoint ini
tidak mengubah database dan tidak menghapus atau mengganti ulasan website lama.

### Konfigurasi Google Cloud dan Vercel

1. Buat atau pilih Google Cloud project dan aktifkan billing.
2. Aktifkan **Places API (New)**.
3. Buat API key terpisah dan batasi key hanya untuk **Places API (New)**.
4. Atur hard quota per menit/hari di Google Cloud. Budget alert hanya memberi
   notifikasi dan bukan pembatas biaya.
5. Pasang rate limit atau WAF rule pada `/api/google-reviews` di platform
   deployment sebelum endpoint berbayar diaktifkan.
6. Tambahkan key dan flag opt-in ke Vercel sebagai server-side environment variable:

   ```text
   GOOGLE_PLACES_API_KEY=YOUR_SERVER_SIDE_KEY
   GOOGLE_REVIEWS_ENABLED=true
   ```

7. Jangan menggunakan awalan `NEXT_PUBLIC_`; key tidak boleh dikirim ke browser.
8. Deploy ulang lalu buka `/api/google-reviews?language=id`. Response sukses
   memiliki `configured: true`, data profil, dan array `reviews`.

Jika key atau flag opt-in belum tersedia, endpoint mengembalikan status 200
dengan `configured: false`, sehingga website tetap menampilkan ulasan lama tanpa error.

### Kebijakan data dan atribusi

- Konten Places diambil langsung saat diperlukan dengan `no-store`; konten
  ulasan Google tidak disalin ke tabel `reviews` dan tidak disimpan sebagai
  fallback. Place ID boleh disimpan sebagai konfigurasi.
- Ulasan Google harus berada dalam container yang jelas berlabel **Google Maps**
  dan terpisah dari rating ulasan website.
- Setiap ulasan Google harus menampilkan atribusi penulis yang tersedia serta
  tautan individual `googleMapsUri` kembali ke Google Maps.
- Urutan hasil tidak boleh diklaim sebagai urutan terbaru. Teks antarmuka harus
  menjelaskan bahwa Google mengembalikan maksimal lima ulasan berdasarkan relevansi.
- Ulasan Google tidak boleh diberi badge “terverifikasi”. Google melakukan
  pemeriksaan konten, tetapi tidak menyatakan setiap ulasan sebagai terverifikasi.

Places API (New) tidak menyediakan seluruh riwayat ulasan. Jika kelak seluruh
ulasan diperlukan, Business Profile API membutuhkan OAuth, persetujuan akses,
pagination, dan pengelolaan token server-side. API tersebut tetap tidak dapat
membuat ulasan pelanggan atas nama pengguna.

## Referensi resmi

- [Google Business Profile review resource](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews)
- [Membuat dan membagikan link atau QR ulasan](https://support.google.com/business/answer/16816815?hl=id)
- [Kebijakan konten Google Maps](https://support.google.com/business/answer/7400114)
- [Places API review fields](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places)
- [Place Details (New)](https://developers.google.com/maps/documentation/places/web-service/place-details)
- [Kebijakan cache dan atribusi Places API](https://developers.google.com/maps/documentation/places/web-service/policies)
- [Panduan keamanan API key Google Maps](https://developers.google.com/maps/api-security-best-practices)
