# NusaBeeTrip 🏝️

Platform booking tour dan rental kendaraan modern untuk Nusa Penida, Bali.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🗄️ Database Management

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio (Database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed

# Sync production database
npx tsx scripts/sync-production-db.ts
```

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database Scripts
- `scripts/sync-production-db.ts` - Sync production database with latest data
- `scripts/update-features.ts` - Update tour package features
- `scripts/verify-combined-features.ts` - Verify tour package features

## 🌐 Deployment

Project ini di-deploy otomatis ke Vercel setiap kali ada push ke branch `main`.

**Live URL**: [https://nusabeetrip.com](https://nusabeetrip.com)

### Deployment Checklist
- ✅ Repository harus public (untuk Vercel Hobby Plan)
- ✅ Environment variables sudah di-set di Vercel
- ✅ Database connection string valid
- ✅ Build berhasil tanpa error

## 📚 Documentation

- **DEV-GUIDE.md** - Panduan development lengkap
- **DEPLOYMENT_CHECKLIST.md** - Checklist deployment dan troubleshooting

## 🎯 Features

### Tour Packages
- West Trip (Kelingking Beach, Angel Billabong, Broken Beach, Crystal Bay)
- East Trip (Diamond Beach, Atuh Beach, Tree House, Thousand Island)
- Mix Trip (Kombinasi West & East)
- Snorkeling with Manta Rays
- West/East Trip + Snorkeling

### Vehicle Rentals
- Motorcycle: N-Max, Vario, Scoopy
- Car with Driver

### All Packages Include
- Professional Guide
- Transportation
- Tax Island & Parking Ticket in Any Spot

## 🔧 Environment Variables

```env
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_SITE_URL=https://nusabeetrip.com
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── tours/          # Tour packages page
│   ├── rentals/        # Vehicle rentals page
│   └── contact/        # Contact page
├── components/          # Reusable React components
├── lib/                # Utilities and configurations
│   ├── db/             # Database schema and queries
│   └── utils/          # Helper functions
└── types/              # TypeScript type definitions

scripts/                 # Database and maintenance scripts
public/                  # Static assets (images)
```

## 📞 Contact

- **Email**: sidiqdwiatmoko@gmail.com
- **WhatsApp**: +62 896-3128-1234
- **Instagram**: @sidiq_1312
- **Location**: Nusa Penida, Bali, Indonesia

## 📄 License

© 2026 NusaBeeTrip. All rights reserved.
