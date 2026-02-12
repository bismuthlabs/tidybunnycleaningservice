'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Camera, ChevronDown, Clock, Shield, Sparkles } from 'lucide-react'
import { Chip } from '@/components/chip'

interface ParallaxHeroProps {
  headline: string
  subheading: string
  backgroundImage: string
  onQuoteClick?: () => void
}

export function ParallaxHero({
  headline,
  subheading,
  backgroundImage,
  onQuoteClick,
}: ParallaxHeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Smooth section-based parallax (no manual scroll listeners)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90])
  const bgScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.05, 1.12])

  const openWhatsApp = React.useCallback(() => {
    window.open('https://wa.me/233595236285', '_blank', 'noopener,noreferrer')
  }, [])

  const chips = ['Busy Homes', 'High-Income Residences', 'Airbnbs / Short-Stays']

  const trust = [
    { icon: Sparkles, label: 'Hotel-level finish' },
    { icon: Shield, label: 'Discreet & reliable' },
    { icon: Clock, label: 'Flexible scheduling' },
    { icon: Camera, label: 'Guest-ready presentation' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden"
      aria-label="Tidy Bunny premium cleaning hero"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={backgroundImage || '/placeholder.svg'}
            alt="Premium cleaned interior"
            fill
            priority
            quality={92}
            className="object-cover object-left-top opacity-90"
          />
        </motion.div>

        {/* Premium overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(255,255,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_35%,rgba(218,165,32,0.10),transparent_60%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Subtle grain (premium texture) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('/hulki-okan-tabak-x3kQTL7yw30-unsplas.jpg')]" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[72vh] py-16 sm:py-20 lg:py-24 flex items-center">
          <div className="w-full">
            {/* Eyebrow / location badge */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-6 flex flex-wrap justify-center items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                Kumasi • Premium Cleaning
              </div>

              <div className="text-xs sm:text-sm text-white/70">
                Estes Park Street, Kumasi
              </div>
            </motion.div>

            <div className="gri gap-10 lg:grid-cols-12 lg:items-en flex justify-center">
              {/* Left: Primary message */}
              <div className="lg:col-span-7">
                <motion.h1
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                  className="text-secondary text-balance text-4xl text-center sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] uppercase leading-tight"
                >
                  Cleaning Service <span className='block text-[45%] norm text-background'>for Homes & Short-Stays</span>
                </motion.h1>

                <motion.p
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
                  className="mt-5 max-w-2xl m-auto text-center text-pretty text-sm sm:text-lg md:block leading-relaxed text-white/80"
                >
                  {subheading}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                >
                  {onQuoteClick ? (
                    <Button
                      size="lg"
                      onClick={onQuoteClick}
                      className="h-12 px-6 rounded-xl bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      Request a Quote
                    </Button>
                  ) : (
                    <Link href="/quote" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto h-12 px-6 rounded bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      >
                        Request a Quote
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          {/* <p className="text-xs font-medium tracking-wide">Scroll</p> */}
          <div className="h-10 w-6 rounded-full border border-white/30 bg-white/5 p-1 backdrop-blur">
            <motion.div
              className="h-2 w-1.5 rounded-full bg-white/60 mx-auto"
              animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
              transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
