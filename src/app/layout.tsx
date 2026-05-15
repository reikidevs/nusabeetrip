import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components'
import { LanguageProvider } from '@/lib/LanguageContext'
import ExchangeRateProvider from '@/components/ExchangeRateProvider'
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
import { SITE } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        {/* Preload critical hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg"
          type="image/jpeg"
        />
      </head>
      <body className={inter.className}>
        {/* Site-wide JSON-LD: identifies the organization & site to Google */}
        <JsonLd id="ld-website" data={websiteJsonLd()} />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-business" data={localBusinessEnhancedJsonLd()} />
        <JsonLd id="ld-navigation" data={siteNavigationJsonLd()} />
        <JsonLd id="ld-howto-book" data={howToBookJsonLd()} />

        <LanguageProvider>
          <ExchangeRateProvider />
          <Layout>
            {children}
          </Layout>
        </LanguageProvider>
      </body>
    </html>
  )
}
