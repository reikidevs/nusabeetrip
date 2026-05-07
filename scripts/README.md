# Scripts Documentation

Kumpulan script untuk maintenance database dan verifikasi data.

## 📝 Available Scripts

### 1. sync-production-db.ts
**Fungsi**: Sync data production database dengan data terbaru

**Kapan digunakan**:
- Setelah update data tour packages atau rentals
- Setelah perubahan harga atau fitur
- Untuk reset database ke state yang benar

**Cara pakai**:
```bash
npx tsx scripts/sync-production-db.ts
```

**Yang dilakukan**:
- Update semua tour packages dengan data terbaru
- Update semua rental services dengan data terbaru
- Memastikan semua data sesuai dengan seed file

---

### 2. update-features.ts
**Fungsi**: Update fitur-fitur tour packages

**Kapan digunakan**:
- Ketika ada perubahan fitur tour packages
- Untuk menambah/menghapus fitur tertentu
- Bulk update features

**Cara pakai**:
```bash
npx tsx scripts/update-features.ts
```

**Yang dilakukan**:
- Menghapus fitur lama yang tidak diperlukan
- Menambah fitur baru
- Memastikan semua package punya fitur yang konsisten

---

### 3. verify-combined-features.ts
**Fungsi**: Verifikasi bahwa semua tour packages memiliki fitur yang benar

**Kapan digunakan**:
- Setelah menjalankan update-features.ts
- Untuk memastikan data konsisten
- Debugging masalah fitur

**Cara pakai**:
```bash
npx tsx scripts/verify-combined-features.ts
```

**Yang diverifikasi**:
- ✅ Semua package punya "Tax Island & Parking Ticket in Any Spot"
- ✅ Semua package punya "Professional Guide"
- ✅ Tidak ada fitur lama yang terpisah
- ✅ Menampilkan semua fitur per package

---

## 🔧 Environment Variables

Semua script membutuhkan `.env.local` dengan:

```env
DATABASE_URL=your_neon_database_url
```

## 📌 Notes

- Semua script menggunakan `tsx` untuk menjalankan TypeScript
- Script akan otomatis load environment variables dari `.env.local`
- Pastikan database connection valid sebelum menjalankan script
- Script akan menampilkan progress dan hasil di console

## 🚨 Troubleshooting

**Error: DATABASE_URL not found**
- Pastikan file `.env.local` ada
- Pastikan `DATABASE_URL` sudah di-set dengan benar

**Error: Connection timeout**
- Cek koneksi internet
- Pastikan Neon database tidak sedang maintenance
- Cek apakah database URL masih valid

**Error: Permission denied**
- Pastikan database user punya permission untuk update data
- Cek apakah database tidak dalam read-only mode
