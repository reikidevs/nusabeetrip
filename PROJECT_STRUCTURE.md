# Project Structure - NusaBeeTrip

Dokumentasi struktur project setelah pembersihan dan optimasi.

## 📁 Root Directory

```
nusabeetrip/
├── .git/                    # Git repository
├── .next/                   # Next.js build output (auto-generated)
├── node_modules/            # Dependencies (auto-generated)
├── public/                  # Static assets
│   └── images/             # Tour & rental images
├── scripts/                 # Database maintenance scripts
├── src/                     # Source code
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities & configurations
│   └── types/              # TypeScript types
├── .env.example            # Environment variables template
├── .env.local              # Local environment (gitignored)
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── DEPLOYMENT_CHECKLIST.md # Deployment guide
├── DEV-GUIDE.md            # Development guide
├── drizzle.config.ts       # Drizzle ORM config
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Main documentation
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── vercel.json             # Vercel deployment config
```

## 📂 Detailed Structure

### `/src/app/` - Pages & Routes
```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── globals.css             # Global styles
├── tours/
│   ├── page.tsx           # Tour packages page
│   └── ToursPageContent.tsx
├── rentals/
│   └── page.tsx           # Vehicle rentals page
└── contact/
    └── page.tsx           # Contact page
```

### `/src/components/` - Reusable Components
```
components/
├── Header.tsx              # Navigation header
├── Footer.tsx              # Site footer
├── TourCard.tsx            # Tour package card
├── RentalCard.tsx          # Rental vehicle card
└── WhatsAppButton.tsx      # WhatsApp CTA button
```

### `/src/lib/` - Utilities & Config
```
lib/
├── db/
│   ├── config.ts          # Database connection
│   ├── schema.ts          # Database schema
│   ├── queries.ts         # Database queries
│   └── seed.ts            # Seed data
├── image-resolver.ts       # Image path resolver
└── utils.ts               # Helper functions
```

### `/scripts/` - Maintenance Scripts
```
scripts/
├── README.md                      # Scripts documentation
├── sync-production-db.ts          # Sync production data
├── update-features.ts             # Update tour features
└── verify-combined-features.ts    # Verify features
```

### `/public/images/` - Static Images
```
images/
├── East Trip/              # East tour images
├── West Trip/              # West tour images
├── Snorkeling + Manta Rays/ # Snorkeling images
├── Vehicle Rentals/        # Rental vehicle images
├── Souvenir Nusa Penida/   # Souvenir images
├── Mix Trip Diamond Kelingking.png
└── NusaBeeTrip-Logo-final.png
```

## 🗑️ Files Removed (Cleanup)

### Temporary Documentation
- ❌ `DATABASE_SETUP_COMPLETE.md` - Setup sudah selesai
- ❌ `FEATURE_UPDATE_COMPLETE.md` - Update sudah selesai
- ❌ `IMAGE_REFERENCE.md` - Tidak diperlukan lagi
- ❌ `VERCEL_SETUP.md` - Sudah di-merge ke DEPLOYMENT_CHECKLIST.md
- ❌ `VERIFICATION_REPORT.md` - Temporary report

### Unused Scripts
- ❌ `scripts/check-duration.ts` - Diganti verify-combined-features.ts
- ❌ `scripts/check-features.ts` - Diganti verify-combined-features.ts
- ❌ `scripts/check-images.ts` - Tidak diperlukan lagi
- ❌ `scripts/compare-db-images.ts` - Tidak diperlukan lagi
- ❌ `scripts/update-tours-db.ts` - Diganti sync-production-db.ts
- ❌ `scripts/verify-images.ts` - Tidak diperlukan lagi

### Auto-generated Files
- ❌ `tsconfig.tsbuildinfo` - Auto-generated, di-gitignore

## 📝 Key Files

### Configuration Files
- **package.json** - Dependencies, scripts, project metadata
- **tsconfig.json** - TypeScript compiler options
- **next.config.js** - Next.js configuration & optimizations
- **tailwind.config.js** - Tailwind CSS customization
- **drizzle.config.ts** - Database ORM configuration
- **vercel.json** - Vercel deployment settings

### Documentation Files
- **README.md** - Main project documentation
- **DEV-GUIDE.md** - Development guide
- **DEPLOYMENT_CHECKLIST.md** - Deployment & troubleshooting
- **scripts/README.md** - Scripts documentation

### Environment Files
- **.env.example** - Template for environment variables
- **.env.local** - Local environment (gitignored)

## 🎯 File Naming Conventions

### Components
- PascalCase: `TourCard.tsx`, `Header.tsx`
- One component per file
- Co-located styles if needed

### Pages
- lowercase: `page.tsx`, `layout.tsx`
- Following Next.js App Router conventions

### Scripts
- kebab-case: `sync-production-db.ts`
- Descriptive names
- `.ts` extension

### Images
- Organized by category in folders
- Descriptive names with spaces allowed
- URL-encoded when used in code

## 🔒 Gitignored Items

```
node_modules/       # Dependencies
.next/              # Build output
.env*.local         # Environment variables
.vercel/            # Vercel config
*.tsbuildinfo       # TypeScript build info
.vscode/            # VS Code settings
.kiro/              # Kiro AI settings
.swc/               # SWC compiler cache
```

## 📊 Project Stats

- **Total Scripts**: 3 (essential only)
- **Documentation Files**: 4 (organized)
- **Source Files**: ~20 TypeScript/React files
- **Image Assets**: ~40 images organized by category
- **Dependencies**: ~30 packages (production + dev)

## 🚀 Quick Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run lint               # Check code quality

# Database
npm run db:push            # Push schema changes
npm run db:studio          # Open database GUI
npm run db:seed            # Seed initial data

# Scripts
npx tsx scripts/sync-production-db.ts          # Sync data
npx tsx scripts/verify-combined-features.ts    # Verify features
```

## 📌 Notes

- Struktur sudah dioptimalkan untuk maintainability
- Hanya file essential yang disimpan
- Dokumentasi sudah dikonsolidasikan
- Scripts sudah dikurangi ke yang paling penting
- Semua temporary files sudah dihapus
- Project siap untuk development dan deployment

---

**Last Updated**: May 7, 2026
**Status**: ✅ Clean & Optimized
