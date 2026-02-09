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
            className="object-cover"
          />
        </motion.div>

        {/* Premium overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(255,255,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_35%,rgba(218,165,32,0.10),transparent_60%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Subtle grain (premium texture) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('/noise.png')]" />
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
                  className="text-balance text-4xl text-center sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white"
                >
                  {headline}
                </motion.h1>

                <motion.p
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
                  className="mt-5 max-w-2xl m-auto text-center text-pretty text-base sm:text-lg hidden md:block leading-relaxed text-white/80"
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
                        className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      >
                        Request a Quote
                      </Button>
                    </Link>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-6 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur"
                      >
                        Call / WhatsApp 059 523 6285
                        <ChevronDown className="ml-2 h-4 w-4 opacity-80" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem asChild>
                        <a href="tel:+233595236285" className="cursor-pointer">
                          Call: 059 523 6285
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button
                          onClick={openWhatsApp}
                          className="w-full cursor-pointer text-left"
                        >
                          WhatsApp: 059 523 6285
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>

                {/* Chips */}
                {/* <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.28 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {chips.map((label, i) => (
                    <Chip key={label} label={label} delay={0.3 + i * 0.06} />
                  ))}
                </motion.div> */}
              </div>

              {/* Right: Trust / premium panel */}
              {/* <motion.aside
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
                className="lg:col-span-5"
              >
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white/90">The Tidy Bunny Standard</p>
                        <p className="mt-1 text-sm text-white/65">
                          Calm, polished, and guest-ready—every visit.
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                        Premium Finish
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {trust.map((t, idx) => (
                        <div
                          key={t.label}
                          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
                        >
                          <t.icon className="h-5 w-5 text-amber-200/90 mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white/90 leading-snug">
                              {t.label}
                            </p>
                            <p className="mt-1 text-xs text-white/60">
                              {idx === 0 && 'Details that feel luxurious.'}
                              {idx === 1 && 'Professional & respectful.'}
                              {idx === 2 && 'Fits busy schedules.'}
                              {idx === 3 && 'Photo-ready presentation.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs text-white/60">
                        Tip: For first-time visits, choose <span className="text-white/80">Deep Refresh</span> to
                        set the standard, then maintain with recurring care.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
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
