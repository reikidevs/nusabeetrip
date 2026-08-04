import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'
import { LanguageProvider } from '@/lib/LanguageContext'
import ExchangeRateProvider from '@/components/ExchangeRateProvider'
import PageViewTracker from '@/components/PageViewTracker'
import MarketingAnalytics from '@/components/MarketingAnalytics'
import { JsonLd } from '@/components/seo'
import {
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
  siteNavigationJsonLd,
  localBusinessEnhancedJsonLd,
} from '@/lib/seo'
import { localeFromPath, stripLocaleFromPath } from '@/lib/site-config'

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
  title: 'Nusa Penida Tours & Private Driver — Official NusaBeeTrip',
  description:
    'NusaBeeTrip official website. Local-owned Nusa Penida tours, Manta Ray snorkeling, scooter rentals, and car with driver. Book direct via WhatsApp.',
  path: '/',
  keywords: [
    'nusabeetrip',
    'nusabeetrip official',
    'nusabeetrip.com',
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
  const pathname = headers().get('x-pathname') || '/'
  const initialLanguage = localeFromPath(pathname)
  const isHomepage = stripLocaleFromPath(pathname) === '/'

  return (
    <html lang={initialLanguage} dir="ltr" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* Preload critical hero image for LCP — homepage only.
            Other routes will swap their own LCP image via next/image priority. */}
        {isHomepage && (
          <link
            rel="preload"
            as="image"
            href="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
            type="image/jpeg"
            fetchPriority="high"
          />
        )}
      </head>
      <body className={inter.className}>
        {/* Site-wide JSON-LD: identifies the organization & site to Google */}
        <JsonLd id="ld-website" data={websiteJsonLd()} />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-business" data={localBusinessEnhancedJsonLd()} />
        <JsonLd id="ld-navigation" data={siteNavigationJsonLd(initialLanguage)} />
        <LanguageProvider initialLanguage={initialLanguage}>
          <ExchangeRateProvider />
          <MarketingAnalytics />
          <PageViewTracker />
          <SiteChrome>
            {children}
          </SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  )
}
