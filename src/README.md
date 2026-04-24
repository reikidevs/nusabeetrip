# NusaBeeTrip Source Code Structure

This document outlines the organization of the NusaBeeTrip website source code.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (pages)/           # Page routes
│   │   ├── tours/         # Tours page
│   │   ├── rentals/       # Rentals page
│   │   ├── contact/       # Contact page
│   │   └── about/         # About page
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form API
│   │   ├── sitemap.xml/   # Dynamic sitemap generation
│   │   └── robots.txt/    # Dynamic robots.txt generation
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components organized by category
│   ├── layout/           # Layout components (Header, Footer, Navigation)
│   ├── ui/               # Reusable UI components (Button, Card, Input)
│   ├── business/         # Business-specific components (TourCard, RentalCard)
│   ├── forms/            # Form components (ContactForm, BookingForm)
│   ├── seo/              # SEO-related components (SEOHead, StructuredData)
│   └── index.ts          # Component exports
├── lib/                  # Utility functions and configurations
│   ├── constants.ts      # Business data and configuration constants
│   ├── utils.ts          # General utility functions
│   ├── whatsapp.ts       # WhatsApp integration utilities
│   ├── env.ts            # Environment variable configuration
│   ├── analytics.ts      # Analytics tracking utilities
│   └── seo.ts            # SEO utilities and structured data
├── styles/               # CSS files and styling utilities
│   ├── variables.css     # CSS custom properties and brand colors
│   ├── components.css    # Component-specific styles
│   ├── utilities.css     # Custom utility classes
│   └── README.md         # Styles documentation
└── types/                # TypeScript type definitions
    └── index.ts          # All type definitions
```

## Key Features

### 1. Environment Configuration
- `.env.local` - Local development environment variables
- `.env.example` - Template for environment variables
- `src/lib/env.ts` - Environment variable validation and configuration

### 2. Absolute Imports
- Configured with `@/` alias pointing to `src/`
- Example: `import { Button } from '@/components/ui'`

### 3. Component Organization
- **Layout**: Header, Footer, Navigation components
- **UI**: Reusable components like Button, Card, Input
- **Business**: Tour packages, rental services, booking components
- **Forms**: Contact forms and booking inquiry forms
- **SEO**: Meta tags, structured data, and SEO optimization components

### 4. Utility Libraries
- **Constants**: Business information, tour packages, rental services
- **Utils**: Formatting, validation, and helper functions
- **WhatsApp**: Booking integration and message generation
- **Analytics**: Event tracking and Google Analytics integration
- **SEO**: Meta tag generation and structured data

### 5. Styling System
- **Tailwind CSS**: Primary styling framework with custom brand colors
- **CSS Variables**: Brand colors extracted from NusaBeeTrip logo
- **Custom Utilities**: Brand-specific utility classes
- **Component Styles**: Styles that can't be handled by Tailwind

### 6. Type Safety
- Comprehensive TypeScript types for all business entities
- Component prop types for better development experience
- API response types for consistent data handling
- Database types for future scalability

## Development Guidelines

### 1. Component Creation
- Use PascalCase for component names
- Place components in appropriate category folders
- Export components through index files
- Include TypeScript interfaces for props

### 2. Styling Approach
- Prefer Tailwind CSS classes over custom CSS
- Use brand color variables for consistency
- Create utility classes for repeated patterns
- Keep component-specific styles in components.css

### 3. Import Organization
- Use absolute imports with `@/` alias
- Import from index files when available
- Group imports: React, Next.js, external libraries, internal modules

### 4. Environment Variables
- Add new variables to both `.env.local` and `.env.example`
- Validate required variables in `src/lib/env.ts`
- Use environment-specific configurations

## Next Steps

This structure provides a solid foundation for:
1. Component development (Task 3)
2. WhatsApp booking integration (Task 4)
3. Contact form implementation (Task 5)
4. SEO optimization (Task 6)
5. Page development (Task 7)
6. Performance optimization (Task 9)
7. Analytics integration (Task 10)

Each subsequent task will build upon this organized structure to create a comprehensive tourism website for NusaBeeTrip.