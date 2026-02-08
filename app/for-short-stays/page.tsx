'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { motion } from 'framer-motion'
import { Sparkles, Star, Clock, Shield } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function ForShortStaysPage() {
  const faqs = [
    {
      q: 'What turnaround time can you offer?',
      a: 'Standard turnover is 2-3 hours. Express turnovers (1.5 hours) available for back-to-back guests. We understand urgency.',
    },
    {
      q: 'Do you provide host reports?',
      a: 'Yes. Optional before/after photos and completion reports available for your records and guest communications.',
    },
    {
      q: 'Can you manage amenity restocking?',
      a: 'Absolutely. We can restock linens, toiletries, coffee, snacks, or any guest amenities as part of your service.',
    },
    {
      q: 'What if there\'s damage or excessive mess?',
      a: 'We communicate immediately. Standard cleaning covers normal use. Damage or deep stains are noted and discussed before additional charges.',
    },
    {
      q: 'Do you offer recurring discounts for hosts?',
      a: 'Yes. Properties with weekly or bi-weekly turnovers receive priority booking, consistent team, and discounted rates.',
    },
    {
      q: 'How do I schedule turnover cleanings?',
      a: 'Contact us with your calendar. We integrate with your booking system or can work on a recurring schedule.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="Turn Guests into Five-Star Reviews"
        subheading="Fast, efficient, photo-ready turnovers that keep your guests happy and your property pristine. Perfect for Airbnbs, hotels, guest houses, and short-stay properties."
      />

      {/* WHY US */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Hosts Choose Tidy Bunny</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Guest Satisfaction</h3>
            <p className="text-foreground/70">
              Photo-ready finishes lead to happy guests and five-star reviews. We know what impresses travelers.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Fast Turnaround</h3>
            <p className="text-foreground/70">
              We get your property ready between guests quickly. No stress about back-to-back bookings.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Reliable & Trustworthy</h3>
            <p className="text-foreground/70">
              Background-checked team, insured, and professional. You can trust us with your property.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Consistency Matters</h3>
            <p className="text-foreground/70">
              Same team for recurring properties means consistency and familiarity with your space.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* TURNOVER STANDARD */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">The Tidy Bunny Turnover Standard</h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Every turnover is a fresh start. Here's exactly what your guests experience.
        </p>

        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
          {[
            'Fresh linens & perfectly made beds (photo-ready finish)',
            'Bathrooms disinfected, polished, and restocked (supplies provided)',
            'Kitchen reset: counters, sink, appliance exteriors, dining area wiped down',
            'High-touch points sanitized (handles, switches, remotes, thermostats)',
            'Floors finished properly (vacuum + mop, edges included)',
            'Trash removed, bins relined, and space fully refreshed',
            'Final inspection walkthrough before lock-up',
            'Optional: Before/after photos + completion report for your records',
          ].map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex-shrink-0 mt-1">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <p className="font-medium text-foreground/80">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Services for Short-Stay Properties</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Turnover Cleaning</h3>
            <p className="text-foreground/70 mb-4">
              Complete guest-ready cleaning between check-outs and check-ins. Our bread and butter.
            </p>
            <p className="text-sm text-foreground/70 font-medium">Standard time: 2-3 hours | Express: 1.5 hours</p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Guest-Ready Presentation</h3>
            <p className="text-foreground/70 mb-4">
              Beyond just clean. We stage and present your property beautifully for maximum guest delight.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 ml-4">
              <li>Perfect linens arrangement</li>
              <li>Welcome amenities displayed</li>
              <li>Decor & accents thoughtfully placed</li>
              <li>Lighting optimized</li>
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Routine Property Care</h3>
            <p className="text-foreground/70 mb-4">
              Weekly, bi-weekly, or monthly maintenance to keep your property in peak condition between guests.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Host Report + Photos</h3>
            <p className="text-foreground/70 mb-4">
              Optional documentation of every turnover. Perfect for your records and guest communications.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 ml-4">
              <li>Before/after photos</li>
              <li>Completion checklist</li>
              <li>Any issues or notes flagged</li>
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Amenity Management</h3>
            <p className="text-foreground/70 mb-4">
              We can handle restocking for you. Linens, toiletries, coffee, snacks, welcome items.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* PRICING TIERS */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Pricing Plans for Hosts</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">As-Needed</h3>
            <p className="text-foreground/70 mb-6">Perfect for occasional guests or seasonal properties.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Standard pricing per turnover
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Flexible scheduling
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                No commitment
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-accent bg-card p-8 text-center">
            <div className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Regular Host</h3>
            <p className="text-foreground/70 mb-6">For properties with frequent turnover.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                10-15% discount
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Priority scheduling
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Dedicated team
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">Multi-Property</h3>
            <p className="text-foreground/70 mb-6">For property managers with multiple units.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                20% discount
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Customized schedule
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Account manager
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.details
              key={idx}
              {...fadeInUp}
              className="rounded-xl border border-border bg-card p-6 cursor-pointer group"
            >
              <summary className="font-semibold text-primary flex items-center justify-between">
                {faq.q}
                <span className="transform group-open:rotate-180 transition-transform text-accent">▼</span>
              </summary>
              <p className="text-foreground/70 mt-4">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-4">Start Getting Five-Star Turnovers</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Let us handle the cleaning. You focus on guests and bookings. Contact us for a turnover consultation.
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
