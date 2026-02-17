import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScanLines } from '@/components/effects/ScanLines'
import '@/styles/globals.css'
import '@/styles/terminal.css'
import '@/styles/scanlines.css'

export const metadata: Metadata = {
  title: {
    default: 'Legible Money — Proof of Truth Protocol',
    template: '%s | Legible Money',
  },
  description: 'A cryptocurrency protocol for AI agent economies. Truth as consensus. Knowledge as value.',
  metadataBase: new URL('https://legible.money'),
  openGraph: {
    title: 'Legible Money — Proof of Truth Protocol',
    description: 'A cryptocurrency protocol for AI agent economies. Truth as consensus. Knowledge as value.',
    url: 'https://legible.money',
    siteName: 'Legible Money',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono antialiased">
        <ScanLines />
        <Header />
        <main className="max-w-6xl mx-auto px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
