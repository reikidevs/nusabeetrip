import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Best Travel Nusa Penida | NusaBeeTrip - Tours & Rentals',
  description: 'Discover the best travel experience in Nusa Penida with NusaBeeTrip. Professional tour packages and vehicle rentals for your perfect Bali island adventure.',
  keywords: ['best travel nusa penida', 'nusa penida tour', 'nusa penida rental', 'bali island tour'],
  authors: [{ name: 'NusaBeeTrip' }],
  creator: 'NusaBeeTrip',
  publisher: 'NusaBeeTrip',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Layout>
            {children}
          </Layout>
        </LanguageProvider>
      </body>
    </html>
  )
}