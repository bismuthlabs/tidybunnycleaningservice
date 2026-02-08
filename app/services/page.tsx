'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { ServiceCard } from '@/components/service-card'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="Our Complete Service Menu"
        subheading="From weekly maintenance to guest-ready turnover, we offer premium cleaning tailored to your needs."
      />

      {/* FOR HOMES */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">For Homes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-8">
          <ServiceCard
            title="Standard Home Care"
            description="Maintenance sparkle for busy lifestyles. Weekly or bi-weekly cleaning for those who want their home to stay fresh between deep cleans."
          />
          <ServiceCard
            title="Deep Refresh"
            description="Top-to-bottom reset for a complete renewal. Perfect for seasonal deep cleans or when you need everything extra pristine."
          />
          <ServiceCard
            title="Move In/Out"
            description="Comprehensive cleaning for transitions. Pre-move-out condition or move-in ready presentation."
          />
          <ServiceCard
            title="Fridge Interior"
            description="Deep fridge cleaning and organization. Includes shelf removal, sanitization, and spill cleanup."
          />
          <ServiceCard
            title="Oven Interior"
            description="Heavy-duty oven cleaning. Professional-grade degreasing and sanitization."
          />
          <ServiceCard
            title="Bedding Refresh"
            description="Mattress cleaning, bed change, and refresh service. Fresh linens included."
          />
        </div>
        <p className="text-center text-foreground/70 mb-8">
          All services can be customized. Contact us for pricing and availability.
        </p>
      </Section>

      {/* FOR SHORT-STAYS */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">For Short-Stays, Hotels & Guest Houses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-8">
          <ServiceCard
            title="Turnover Cleaning"
            description="Between-guest refresh with meticulous attention to detail. Includes linen change, bathroom disinfection, and kitchen reset."
          />
          <ServiceCard
            title="Guest-Ready Presentation"
            description="Staging and photo-ready finish. Perfect linens, amenities, and presentation for maximum guest satisfaction."
          />
          <ServiceCard
            title="Routine Property Care"
            description="Scheduled maintenance to keep spaces pristine. Weekly, bi-weekly, or monthly service options."
          />
          <ServiceCard
            title="Host Report + Photos"
            description="Optional documentation of cleaning completion. Photos for your records and guest communications."
          />
          <ServiceCard
            title="Express Turnover"
            description="Fast-track cleaning between back-to-back guests. Professional efficiency without compromising quality."
          />
          <ServiceCard
            title="Amenity Restocking"
            description="Manage guest amenities. We can restock toiletries, linens, and welcome items as needed."
          />
        </div>
        <p className="text-center text-foreground/70">
          Flexible scheduling available. We understand the urgency of turnover cleaning.
        </p>
      </Section>

      {/* ADD-ONS */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Add-Ons & Extras</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Interior Windows</h3>
              <p className="text-foreground/70 text-sm">Professional interior window cleaning by room or entire property.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Laundry Wash & Fold</h3>
              <p className="text-foreground/70 text-sm">Professional laundry service. Linens, towels, or guest laundry.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Baseboards & Trim</h3>
              <p className="text-foreground/70 text-sm">Detailed cleaning of baseboards, trim, and architectural details.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Carpet Spot Treatment</h3>
              <p className="text-foreground/70 text-sm">Professional spot cleaning for carpets and rugs.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Upholstery Refresh</h3>
              <p className="text-foreground/70 text-sm">Light cleaning and refresh for couches and chairs.</p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Organization Assist</h3>
              <p className="text-foreground/70 text-sm">Help organizing and arranging spaces while cleaning.</p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Contact us for a free consultation and personalized quote for your cleaning needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Request a Quote
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            onClick={() => window.open('https://wa.me/233595236285', '_blank')}
          >
            Message on WhatsApp
          </Button>
        </div>
      </Section>
    </div>
  )
}
