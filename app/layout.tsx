import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Tidy Bunny - Premium Cleaning in Kumasi',
  description: 'Professional home cleaning and turnover cleaning for short-stays, Airbnbs, and hotels in Kumasi. Hotel-level finish, every time.',
  keywords: 'cleaning service, kumasi, home cleaning, airbnb cleaning, hotel cleaning, turnover',
  openGraph: {
    title: 'Tidy Bunny - Premium Cleaning in Kumasi',
    description: 'Professional cleaning for homes and short-stays.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
