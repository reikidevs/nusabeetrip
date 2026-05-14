import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components'
import { LanguageProvider } from '@/lib/LanguageContext'
import ExchangeRateProvider from '@/components/ExchangeRateProvider'
import { JsonLd } from '@/components/seo'
import { buildMetadata, organizationJsonLd, travelAgencyJsonLd, websiteJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Tours, Snorkeling & Vehicle Rentals',
  description: SITE.description,
  path: '/',
  keywords: [
    'nusa penida',
    'best travel nusa penida',
    'tour package nusa penida',
    'sewa motor nusa penida',
    'snorkeling manta ray',
  ],
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
      </head>
      <body className={inter.className}>
        {/* Site-wide JSON-LD: identifies the organization & site to Google */}
        <JsonLd id="ld-website" data={websiteJsonLd()} />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-business" data={travelAgencyJsonLd()} />

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
