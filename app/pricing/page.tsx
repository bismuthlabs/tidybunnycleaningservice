'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="Transparent, Premium Pricing"
        subheading="No surprises. We believe you deserve to know exactly what you're paying for. Our pricing reflects the quality and professionalism you'll receive."
      />

      {/* PRICING NOTE */}
      <Section className="bg-secondary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-foreground/70 mb-6">
            <strong>Every home is unique.</strong> Pricing depends on size, frequency, and specific services. Below are our standard starting ranges to help guide you.
          </p>
          <p className="text-lg text-foreground/70">
            For a personalized quote, fill out our quick form or message us on WhatsApp.
          </p>
        </div>
      </Section>

      {/* RESIDENTIAL PRICING */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Residential Cleaning Plans</h2>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8">
            <h3 className="text-2xl font-bold text-primary mb-2">One-Time Deep Clean</h3>
            <p className="text-foreground/70 mb-6 text-sm">Full home refresh</p>
            <div className="text-3xl font-bold text-accent mb-6">From GHS 250</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Complete deep clean</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">All rooms included</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Flexible scheduling</span>
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-accent bg-card p-8">
            <div className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Bi-Weekly</h3>
            <p className="text-foreground/70 mb-6 text-sm">Recurring maintenance</p>
            <div className="text-3xl font-bold text-accent mb-6">From GHS 80/visit</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">10% discount</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Priority booking</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Same team every visit</span>
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Weekly</h3>
            <p className="text-foreground/70 mb-6 text-sm">Maximum consistency</p>
            <div className="text-3xl font-bold text-accent mb-6">From GHS 70/visit</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">15% discount</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Dedicated cleaner</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Ultra-consistent quality</span>
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Get Quote
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-foreground/70 text-sm">
            * Prices depend on home size, location, and specific service add-ons. The ranges above are for a typical 3-bedroom, 2-bathroom home. Contact us for your personalized quote.
          </p>
        </div>
      </Section>

      {/* SHORT-STAY PRICING */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Turnover & Short-Stay Pricing</h2>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-12">
          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Standard Turnover</h3>
            <p className="text-foreground/70 mb-6 text-sm">2-3 hours, fully guest-ready</p>
            <div className="text-3xl font-bold text-accent mb-6">From GHS 120</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Full turnover standard</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Linen change included</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Photo-ready finish</span>
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-accent bg-card p-8">
            <div className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground mb-4">
              Express
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Express Turnover</h3>
            <p className="text-foreground/70 mb-6 text-sm">1.5 hours, back-to-back ready</p>
            <div className="text-3xl font-bold text-accent mb-6">From GHS 150</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Fast turnaround</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Still photo-ready</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Premium efficiency</span>
              </li>
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-foreground/70 text-sm">
            * Recurring turnovers (weekly/bi-weekly) receive 10-20% discounts. Multi-property hosts get custom rates.
          </p>
        </div>
      </Section>

      {/* ADD-ONS */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Popular Add-Ons</h2>

        <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
          {[
            { name: 'Interior Windows', price: 'From GHS 25' },
            { name: 'Laundry Wash & Fold', price: 'From GHS 30/load' },
            { name: 'Fridge Interior', price: 'From GHS 40' },
            { name: 'Oven Interior', price: 'From GHS 50' },
            { name: 'Baseboards & Trim', price: 'From GHS 35' },
            { name: 'Carpet Spot Treatment', price: 'From GHS 25' },
            { name: 'Bedding Refresh', price: 'From GHS 20' },
            { name: 'Host Report + Photos', price: 'From GHS 15' },
          ].map((addon, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="flex justify-between items-center rounded-lg border border-border bg-card p-4"
            >
              <span className="font-medium text-foreground">{addon.name}</span>
              <span className="text-accent font-semibold">{addon.price}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* WHY PREMIUM PRICING */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">Why Premium Pricing?</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-foreground/70">
          <p>
            Our pricing reflects the quality you receive. Here's what you're investing in:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span><strong>Trained professionals</strong> who care about quality, not speed.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span><strong>Premium products</strong> that clean better and safer.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span><strong>Reliability & consistency</strong> you can count on every time.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span><strong>Insured and background-checked</strong> for your peace of mind.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3 font-bold">•</span>
              <span><strong>Attention to detail</strong> that turns a clean home into a pristine one.</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-4">Ready for Premium Cleaning?</h2>
        <p className="text-lg opacity-90 mb-8">
          Request a personalized quote based on your home, frequency, and location.
        </p>
        <Link href="/quote">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get Your Quote Today
          </Button>
        </Link>
      </Section>
    </div>
  )
}
