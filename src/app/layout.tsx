import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'
import { LanguageProvider } from '@/lib/LanguageContext'
import ExchangeRateProvider from '@/components/ExchangeRateProvider'
import PageViewTracker from '@/components/PageViewTracker'
import { JsonLd } from '@/components/seo'
import {
  buildMetadata,
  organizationJsonLd,
  travelAgencyJsonLd,
  websiteJsonLd,
  siteNavigationJsonLd,
  howToBookJsonLd,
  localBusinessEnhancedJsonLd,
} from '@/lib/seo'
import { getReviewsForSeo, getAggregateRatingForSeo } from '@/lib/reviews-server'
import { SITE } from '@/lib/site-config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  // Use a variable for the body, smaller weight set for faster TBT.
  variable: '--font-inter',
  // We only ship the weights actually used in the design.
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
  adjustFontFallback: true,
})

export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Tours, Snorkeling & Vehicle Rentals',
  description:
    'Local-owned Nusa Penida tours, snorkeling with Manta Rays, and motorcycle/car rentals. West Trip, East Trip & Mix Trip from 390K IDR. Book instantly via WhatsApp. Best prices guaranteed.',
  path: '/',
  keywords: [
    'nusa penida',
    'best travel nusa penida',
    'tour package nusa penida',
    'sewa motor nusa penida',
    'snorkeling manta ray',
    'nusa penida day trip from bali',
    'kelingking beach',
    'diamond beach nusa penida',
    'things to do in nusa penida',
    'wisata nusa penida',
    'paket tour nusa penida murah',
  ],
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
})

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Pull real, approved reviews + aggregate rating from the DB for JSON-LD.
  // Both helpers fall back to static testimonials if the DB is unreachable.
  const [{ ratingValue, reviewCount }, reviews] = await Promise.all([
    getAggregateRatingForSeo(),
    getReviewsForSeo(6),
  ])

  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* Preload critical hero image for LCP — homepage only.
            Other routes will swap their own LCP image via next/image priority. */}
        <link
          rel="preload"
          as="image"
          href="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
        {/* Site-wide JSON-LD: identifies the organization & site to Google */}
        <JsonLd id="ld-website" data={websiteJsonLd()} />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd
          id="ld-business"
          data={localBusinessEnhancedJsonLd({
            ratingValue,
            reviewCount,
            reviews: reviews.map((r) => ({
              authorName: r.authorName,
              title: r.title,
              body: r.body,
              rating: r.rating,
              date: r.date,
            })),
          })}
        />
        <JsonLd id="ld-navigation" data={siteNavigationJsonLd()} />
        <JsonLd id="ld-howto-book" data={howToBookJsonLd()} />

        <LanguageProvider>
          <ExchangeRateProvider />
          <PageViewTracker />
          <SiteChrome>
            {children}
          </SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  )
}
