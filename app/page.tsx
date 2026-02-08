'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sparkles, ChevronDown, Shield, Clock, Camera } from 'lucide-react'
import { motion } from 'framer-motion'
import { ParallaxHero } from '@/components/parallax-hero'
import { Section } from '@/components/section'
import { ServiceCard } from '@/components/service-card'
import { Hero } from '@/components/hero'
import { Chip } from '@/components/chip'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function Home() {
  const openWhatsApp = () => {
    window.open('https://wa.me/233595236285', '_blank')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">



      {/* PARALLAX HERO SECTION */}
      <ParallaxHero
        headline="Premium Cleaning for Homes & Short-Stays in Kumasi."
        subheading="Tidy Bunny delivers a calm, sparkling home—cleaned with joy, precision, and respect for your time. Ideal for busy professionals, high-income households, guest houses, hotels, and Airbnbs that must always look ready."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* SERVICES SECTION */}
      <Section id="services">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">
          {/* Cleaning designed for how you live—and how you host. */}
          Categories tailored to your unique needs.
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          {/* We specialize in two distinct service categories tailored to your unique needs. */}
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* For Homes */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-6">For Homes</h3>
            <ServiceCard
              title="Standard Home Care"
              description="Maintenance sparkle for busy lifestyles"
            />
            <ServiceCard
              title="Deep Refresh"
              description="Top-to-bottom reset for a complete renewal"
            />
            <ServiceCard
              title="Premium Touch-Ups"
              description="Add-ons: fridge/oven interior, bedding refresh, baseboards"
            />
          </motion.div>

          {/* For Short-Stays */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-6">For Short-Stays & Hotels</h3>
            <ServiceCard
              title="Turnover Cleaning"
              description="Between-guest refresh with meticulous attention to detail"
            />
            <ServiceCard
              title="Guest-Ready Presentation"
              description="Staging: towels, amenities, photo-ready finish"
            />
            <ServiceCard
              title="Routine Property Care"
              description="Scheduled maintenance to keep spaces pristine"
            />
          </motion.div>
        </div>
      </Section>

      {/* OUR STANDARD */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-primary">
          Our Standard
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Precision & Shine',
              desc: 'We clean for the finish: surfaces that sparkle, corners that look cared for, and rooms that feel light.',
            },
            {
              title: 'Calm, Respectful Service',
              desc: 'Professional, discreet, mindful of your belongings and privacy.',
            },
            {
              title: 'Joy in Every Visit',
              desc: 'We bring positive energy and goodwill into your home—because a clean space should feel good.',
            },
          ].map((standard, idx) => (
            <motion.div
              key={idx}
              {...fadeInScale}
              className="rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{standard.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{standard.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TURNOVER STANDARD */}
      <Section>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">
          Turnover Standard
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Guest-Ready Every Time
        </p>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            'Fresh linens & perfectly made beds (photo-ready finish)',
            'Bathrooms disinfected, polished, and restocked (supplies provided)',
            'Kitchen reset: counters, sink, appliance exteriors, dining area wiped down',
            'High-touch points sanitized (handles, switches, remotes)',
            'Floors finished properly (vacuum + mop, edges included)',
            'Trash removed, bins relined, and space fully refreshed',
            'Final inspection walkthrough before lock-up',
            'Optional host report + photos',
          ].map((bullet, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="mt-1 flex-shrink-0">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <p className="text-foreground/80 font-medium">{bullet}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-primary">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            { num: '01', title: 'Request a Quote', desc: 'Call or WhatsApp us with your details' },
            { num: '02', title: 'Choose Schedule', desc: 'One-time or recurring cleaning service' },
            { num: '03', title: 'Enjoy the Sparkle', desc: 'Premium finish, every single time' },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              {...fadeInScale}
              className="relative text-center"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl font-bold">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
              <p className="text-foreground/70">{step.desc}</p>
              {idx < 2 && (
                <div className="absolute -right-4 top-8 hidden md:block h-1 w-8 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT STRIP */}
      <motion.section
        {...fadeInUp}
        className="py-20 bg-primary text-primary-foreground"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Book premium cleaning in Kumasi
          </h2>
          <p className="text-lg opacity-90 mb-8">
            For homes, Airbnbs, guest houses, and hotels—reach out for a quote or schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Call / WhatsApp 059 523 6285
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
            <Link href="/quote">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Request a Quote
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center text-sm">
            <div>
              <p className="font-semibold">Address</p>
              <p className="opacity-80">Estes Park Street, Kumasi</p>
            </div>
            <div className="hidden sm:block w-px bg-primary-foreground/20" />
            <div>
              <p className="font-semibold">Hours</p>
              <p className="opacity-80">Mon–Sat by appointment</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
