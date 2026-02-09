'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, easeOut } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
  viewport: { once: true },
}

type ServiceTile = {
  tag: string
  title: string
  description: string
  href: string
  image: string
}

const tiles: ServiceTile[] = [
  {
    tag: 'For Homes',
    title: 'Standard Home Care',
    description: 'Maintenance sparkle for busy lifestyles.',
    href: '/for-homes',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'For Homes',
    title: 'Deep Refresh',
    description: 'Top-to-bottom reset for a complete renewal.',
    href: '/for-homes',
    image:
      'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'For Homes',
    title: 'Premium Touch-Ups',
    description: 'Fridge/oven interior, baseboards, bedding refresh.',
    href: '/services',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Short-Stays & Hotels',
    title: 'Turnover Cleaning',
    description: 'Between-guest refresh with meticulous attention to detail.',
    href: '/for-short-stays',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Short-Stays & Hotels',
    title: 'Guest-Ready Presentation',
    description: 'Towels, amenities, photo-ready finishing touches.',
    href: '/for-short-stays',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
  },
  {
    tag: 'Short-Stays & Hotels',
    title: 'Routine Property Care',
    description: 'Scheduled maintenance to keep spaces consistently pristine.',
    href: '/for-short-stays',
    image:
      'https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&w=1600&q=80',
  },
]

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function AirbnbScrollServices() {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [hintOpacity, setHintOpacity] = React.useState(1)

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onScroll = () => {
      // fade the "scroll" hint once user starts interacting
      const x = el.scrollLeft
      setHintOpacity(1 - clamp(x / 120, 0, 1))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-primary">
              Categories tailored to your unique needs.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-foreground/65">
              Explore premium cleaning options for homes, short-stays, and hospitality spaces—designed
              to feel guest-ready every time.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/services">
              <Button variant="outline" className="rounded-xl">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scroll rail */}
        <div className="relative mt-10">
          {/* Edge fades (Airbnb-style) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-14 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute right-4 top-[-34px] hidden sm:flex items-center gap-2 text-xs text-foreground/55"
            aria-hidden="true"
          >
            <span className="inline-flex h-6 items-center rounded-full border border-border bg-card px-2">
              Scroll
            </span>
            <span>→</span>
          </motion.div>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8
                       snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 lg:scroll-px-8
                       [scrollbar-width:none] [-ms-overflow-style:none]"
            aria-label="Service categories"
          >
            {/* Hide scrollbar (webkit) */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {tiles.map((t, idx) => (
              <ServiceTileCard key={idx} tile={t} />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 flex md:hidden">
            <Link href="/services" className="w-full">
              <Button variant="outline" className="w-full rounded-xl">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceTileCard({ tile }: { tile: ServiceTile }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="snap-start shrink-0 w-[82%] sm:w-[56%] md:w-[42%] lg:w-[32%]"
    >
      <Link
        href={tile.href}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative h-52 sm:h-56">
          <Image
            src={tile.image}
            alt={`${tile.tag} - ${tile.title}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 32vw"
          />
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Tag */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-200/90" />
            {tile.tag}
          </div>

          {/* Title over image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
              {tile.title}
            </h3>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{tile.description}</p>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <p className="text-sm text-foreground/70">
            Learn more <span className="text-foreground/50">→</span>
          </p>
          <span className="inline-flex h-9 items-center rounded-xl border border-border bg-background px-3 text-sm font-medium text-primary transition group-hover:bg-secondary/30">
            Explore
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
