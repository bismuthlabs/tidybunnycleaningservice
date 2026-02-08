'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface SiteHeaderProps {
  onQuoteClick?: () => void
}

export function SiteHeader({ onQuoteClick }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'For Homes', href: '/for-homes' },
    { label: 'For Short-Stays', href: '/for-short-stays' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const openWhatsApp = () => {
    window.open('https://wa.me/233595236285', '_blank')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-2xl font-bold text-primary">Tidy Bunny</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" onClick={onQuoteClick}>
              Request Quote
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Call/WhatsApp
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href="tel:+233595236285" className="cursor-pointer">
                    Call: 059 523 6285
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={openWhatsApp} className="w-full cursor-pointer text-left">
                    WhatsApp: 059 523 6285
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border py-4 lg:hidden"
          >
            <nav className="mb-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  onQuoteClick?.()
                  setMobileMenuOpen(false)
                }}
              >
                Request Quote
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Call/WhatsApp
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem asChild>
                    <a href="tel:+233595236285" className="cursor-pointer">
                      Call: 059 523 6285
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={openWhatsApp} className="w-full cursor-pointer text-left">
                      WhatsApp: 059 523 6285
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
