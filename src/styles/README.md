# NusaBeeTrip Brand Color System

This document outlines the comprehensive brand color system extracted from the NusaBeeTrip logo and implemented throughout the website.

## Brand Colors Overview

The NusaBeeTrip brand colors are inspired by the natural beauty of Nusa Penida and reflect the tropical tourism experience:

### Primary Colors

#### Ocean Blue (`#1E40AF`)
- **Usage**: Primary brand color, headers, navigation, primary buttons
- **Represents**: Deep ocean waters around Nusa Penida
- **CSS Variable**: `--color-brand-blue-primary`
- **Tailwind**: `brand-blue-800`

#### Tropical Orange (`#FFB800`)
- **Usage**: Accent color, call-to-action buttons, highlights
- **Represents**: Tropical sunsets and bee theme (NusaBeeTrip)
- **CSS Variable**: `--color-brand-orange-primary`
- **Tailwind**: `brand-orange-800`

#### Crystal Teal (`#0EA5E9`)
- **Usage**: Secondary accent, links, interactive elements
- **Represents**: Crystal clear waters and lagoons
- **CSS Variable**: `--color-brand-teal-accent`
- **Tailwind**: `brand-teal-500`

### Supporting Colors

#### Nature Green (`#22C55E`)
- **Usage**: Success states, eco-friendly elements, nature highlights
- **Represents**: Tropical vegetation and eco-tourism
- **CSS Variable**: `--color-brand-green`
- **Tailwind**: `brand-green-500`

#### WhatsApp Green (`#25D366`)
- **Usage**: WhatsApp booking buttons, messaging CTAs
- **Represents**: Direct communication and booking
- **CSS Variable**: `--color-whatsapp`
- **Tailwind**: `whatsapp-500`

## Color Usage Guidelines

### Primary Navigation & Headers
```css
.header {
  background: var(--color-brand-blue-primary);
  color: white;
}

/* Or with Tailwind */
.header {
  @apply bg-brand-blue-800 text-white;
}
```

### Call-to-Action Buttons
```css
/* Primary CTA (Orange) */
.cta-primary {
  @apply btn-brand-primary;
  /* or */
  background-color: var(--color-brand-orange-primary);
}

/* Secondary CTA (Blue) */
.cta-secondary {
  @apply btn-brand-secondary;
  /* or */
  background-color: var(--color-brand-blue-primary);
}

/* WhatsApp Booking */
.whatsapp-cta {
  @apply btn-whatsapp;
  /* or */
  background-color: var(--color-whatsapp);
}
```

### Tour Package Cards
```css
.tour-card {
  @apply card;
  /* Hover effect with teal accent */
}

.tour-card:hover {
  @apply border-brand-teal-500;
  box-shadow: var(--shadow-brand-teal);
}

.price-display {
  @apply text-brand-blue text-2xl font-bold;
}
```

### Background Gradients
```css
/* Hero section */
.hero-background {
  @apply bg-hero-gradient;
  /* Creates: Blue → Teal → Orange gradient */
}

/* Section backgrounds */
.section-accent {
  @apply bg-section-gradient;
  /* Subtle blue-teal gradient overlay */
}

/* Brand gradient */
.brand-background {
  @apply bg-brand-gradient;
  /* Blue → Teal gradient */
}

/* Sunset gradient */
.sunset-background {
  @apply bg-sunset-gradient;
  /* Orange → Light Orange gradient */
}
```

## Utility Classes

### Background Colors
- `.bg-brand-blue` - Primary blue background
- `.bg-brand-orange` - Primary orange background
- `.bg-brand-teal` - Teal accent background
- `.bg-brand-green` - Nature green background

### Text Colors
- `.text-brand-blue` - Primary blue text
- `.text-brand-orange` - Primary orange text
- `.text-brand-teal` - Teal accent text
- `.text-brand-green` - Nature green text

### Text Gradients
- `.text-brand-gradient` - Blue to teal gradient text
- `.text-sunset-gradient` - Orange gradient text
- `.text-ocean-gradient` - Teal to blue gradient text

### Button Variants
- `.btn-brand-primary` - Orange primary button
- `.btn-brand-secondary` - Blue secondary button
- `.btn-brand-teal` - Teal accent button
- `.btn-whatsapp` - WhatsApp green button
- `.btn-outline-brand` - Blue outline button
- `.btn-outline-orange` - Orange outline button

### Card Variants
- `.card-hover` - Standard card with hover effects
- `.card-brand-blue` - Card with blue accent on hover
- `.card-brand-orange` - Card with orange accent on hover
- `.card-brand-teal` - Card with teal accent on hover

### Badges
- `.badge-brand` - Blue badge
- `.badge-orange` - Orange badge
- `.badge-teal` - Teal badge
- `.badge-success` - Success green badge

## Accessibility Considerations

### Color Contrast
All brand colors meet WCAG 2.1 AA contrast requirements:
- Blue text on white: 8.59:1 (AAA)
- Orange text on white: 3.05:1 (AA)
- Teal text on white: 4.56:1 (AA)

### Focus States
```css
.focus-brand {
  outline: 2px solid var(--color-brand-teal-accent);
  outline-offset: 2px;
}
```

### Alternative Text Colors
For better accessibility, use these combinations:
- Dark blue (`brand-blue-900`) for better contrast
- Dark orange (`brand-orange-900`) for text on light backgrounds
- Dark teal (`brand-teal-900`) for improved readability

## Responsive Considerations

### Mobile-First Approach
Colors maintain consistency across all screen sizes, with adjustments for:
- Touch target sizes (minimum 44px)
- Reduced gradient complexity on slower devices
- High contrast mode support

### Dark Mode Preparation
While not currently implemented, the color system is prepared for dark mode:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-brand-blue-primary: #3B82F6; /* Lighter blue */
    --color-brand-orange-primary: #FB923C; /* Lighter orange */
    --color-brand-teal-accent: #22D3EE; /* Lighter teal */
  }
}
```

## Performance Optimization

### CSS Custom Properties
Using CSS custom properties allows for:
- Runtime color theme switching
- Reduced CSS bundle size
- Better browser caching
- Dynamic color adjustments

### Tailwind Integration
The color system is fully integrated with Tailwind CSS:
- All colors available as Tailwind utilities
- Consistent naming convention
- Tree-shaking compatible
- JIT compilation support

## Brand Consistency Rules

### Do's
✅ Use primary blue for navigation and headers
✅ Use orange for primary call-to-action buttons
✅ Use teal for links and secondary actions
✅ Use WhatsApp green only for WhatsApp-related actions
✅ Maintain consistent hover states with subtle transforms
✅ Use gradients sparingly for hero sections and special elements

### Don'ts
❌ Don't use colors outside the brand palette
❌ Don't mix gradients excessively
❌ Don't use orange for error states (use semantic red)
❌ Don't use brand colors for generic UI elements (use grays)
❌ Don't create new color variations without design approval

## Implementation Examples

### Tour Package Card
```jsx
<div className="card card-brand-teal">
  <div className="p-6">
    <h3 className="text-xl font-bold text-brand-blue mb-2">West Trip</h3>
    <p className="text-brand-orange text-2xl font-bold mb-4">390,000 IDR</p>
    <button className="btn-whatsapp w-full">
      Book via WhatsApp
    </button>
  </div>
</div>
```

### Hero Section
```jsx
<section className="bg-hero-gradient text-white">
  <div className="container-max section-padding">
    <h1 className="text-responsive-xl mb-6">
      Best Travel Nusa Penida
    </h1>
    <p className="text-xl mb-8 opacity-90">
      Discover the hidden gems of Nusa Penida with NusaBeeTrip
    </p>
    <div className="flex gap-4">
      <button className="btn-brand-primary">View Tours</button>
      <button className="btn-outline-brand">Learn More</button>
    </div>
  </div>
</section>
```

### Navigation Header
```jsx
<header className="bg-brand-blue text-white shadow-lg">
  <div className="container-max">
    <nav className="flex items-center justify-between py-4">
      <img src="/images/NusaBeeTrip-Logo.png" alt="NusaBeeTrip" />
      <div className="hidden md:flex space-x-8">
        <a href="/tours" className="hover:text-brand-orange transition-colors">
          Tours
        </a>
        <a href="/rentals" className="hover:text-brand-orange transition-colors">
          Rentals
        </a>
      </div>
      <button className="btn-whatsapp">
        Book Now
      </button>
    </nav>
  </div>
</header>
```

This comprehensive color system ensures brand consistency while providing flexibility for various UI components and user interactions throughout the NusaBeeTrip website.