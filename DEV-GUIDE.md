# Development Guide - NusaBeeTrip

## 🚀 Quick Start

### Cara Menjalankan Development Server

**Jika sering error cache webpack:**

```bash
# Gunakan script ini (otomatis clear cache)
npm run dev:clean
```

**Atau gunakan script PowerShell/Batch:**

```bash
# PowerShell
.\dev.ps1

# Command Prompt
dev.bat
```

**Normal development (tanpa clear cache):**

```bash
npm run dev
```

## 🧹 Mengatasi Error Cache

### Error: "Cannot find module './948.js'"

Ini adalah webpack cache corruption. Solusinya:

**Option 1: Gunakan script otomatis**
```bash
npm run dev:clean
```

**Option 2: Manual**
```bash
# Hapus cache
npm run clean

# Atau manual
Remove-Item -Recurse -Force .next  # PowerShell
rmdir /s /q .next                   # CMD

# Lalu jalankan dev server
npm run dev
```

## 📦 Available Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Development server normal |
| `npm run dev:clean` | Development server + auto clear cache |
| `npm run build` | Build production |
| `npm run build:clean` | Build production + clear cache dulu |
| `npm run clean` | Hapus .next cache saja |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

## 🔧 Database Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run db:push` | Push schema ke database |
| `npm run db:seed` | Seed data ke database |
| `npm run db:setup` | Push + seed (setup lengkap) |
| `npm run db:studio` | Buka Drizzle Studio |
| `npm run db:verify` | Verify data di database |

## 💡 Tips Development

1. **Gunakan `npm run dev:clean` jika:**
   - Sering error webpack cache
   - Setelah update banyak file
   - Setelah pull dari git

2. **Gunakan `npm run dev` biasa jika:**
   - Development normal
   - Tidak ada masalah cache

3. **Restart dev server jika:**
   - Update .env file
   - Install package baru
   - Update next.config.js

## 🐛 Common Issues

### 1. Port 3000 sudah dipakai
```bash
# Next.js otomatis akan coba port 3001
# Atau kill process di port 3000:
npx kill-port 3000
```

### 2. Module not found
```bash
npm install
npm run dev:clean
```

### 3. Build error
```bash
npm run build:clean
```

## 📝 Notes

- Dev server akan running di: http://localhost:3001 (jika 3000 terpakai)
- Hot reload otomatis aktif
- Error akan muncul di browser dan terminal
- Cache di `.next` folder bisa dihapus kapan saja

## 🎯 Workflow Recommended

```bash
# 1. Pull latest code
git pull

# 2. Install dependencies (jika ada update)
npm install

# 3. Start dev server dengan clean cache
npm run dev:clean

# 4. Development...

# 5. Test build sebelum commit
npm run build

# 6. Commit & push
git add .
git commit -m "your message"
git push
```
