import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parrot Kit - Turn Any Short into a Shoot-Ready Recipe',
  description: 'Paste a TikTok, Reels, or Shorts link. Get a repeatable shooting + editing recipe—hooks, beats, shots, captions, pacing, and CTA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
