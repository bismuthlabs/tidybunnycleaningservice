'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { FeatureGrid } from '@/components/feature-grid'
import { motion } from 'framer-motion'
import { Sparkles, Clock, Shield, CheckCircle } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function ForHomesPage() {
  const faqs = [
    {
      q: 'How often should I schedule cleaning?',
      a: 'It depends on your lifestyle. Most busy professionals prefer weekly or bi-weekly. We can customize the frequency to match your needs.',
    },
    {
      q: 'Can you customize the service?',
      a: 'Absolutely. Tell us what matters most to you, and we\'ll create a cleaning plan that fits your home and budget.',
    },
    {
      q: 'Do you use eco-friendly products?',
      a: 'We use premium, professional-grade products that are safe for families and pets. Request eco-friendly options if preferred.',
    },
    {
      q: 'What if I\'m not home during cleaning?',
      a: 'No problem. Many clients leave us a key or access code. All our staff are background-checked and fully insured.',
    },
    // {
    //   q: 'Do you offer recurring discounts?',
    //   a: 'Yes. Weekly and bi-weekly clients receive priority booking and consistent team assignment for better results.',
    // },
    {
      q: 'How do I schedule?',
      a: 'Simply fill out our quick quote form or call us. We\'ll confirm availability and send you pricing and scheduling details.',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="Premium Home Cleaning for Busy Professionals"
        subheading="Your home should feel like a sanctuary. Let us handle the cleaning so you can focus on what matters. Hotel-level finish, every time."
      />

      {/* BENEFITS */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose Tidy Bunny for Your Home?</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Consistent Quality</h3>
            <p className="text-foreground/70">
              Same team, same standard every visit. We build relationships with our clients and understand your home.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Your Time is Precious</h3>
            <p className="text-foreground/70">
              Flexible scheduling around your life. One-time deep cleans, weekly maintenance, or occasional touch-ups.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Total Trust</h3>
            <p className="text-foreground/70">
              Background-checked staff, fully insured, and respectful of your privacy. Your home is in good hands.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">Attention to Detail</h3>
            <p className="text-foreground/70">
              We clean the corners you forget about. Every surface sparkles, every corner is cared for.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Services for Your Home</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Standard Home Care</h3>
            <p className="text-foreground/70 mb-4">
              Regular maintenance cleaning to keep your home fresh. Perfect for weekly or bi-weekly schedules.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 ml-4">
              <li>Floors (vacuum & mop)</li>
              <li>Bathrooms (sanitized & sparkling)</li>
              <li>Kitchen (counters, sink, appliance exteriors)</li>
              <li>Dusting & surfaces</li>
              <li>Trash removal</li>
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Deep Refresh</h3>
            <p className="text-foreground/70 mb-4">
              A top-to-bottom reset for when you need everything extra clean. Great for seasonal deep cleans.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 ml-4">
              <li>Everything in Standard Home Care</li>
              <li>Interior windows</li>
              <li>Baseboards & trim</li>
              <li>Inside appliances (fridge, oven)</li>
              <li>Light fixtures & ceiling fans</li>
              <li>Detailed corner & edge cleaning</li>
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-2xl font-semibold text-primary mb-3">Premium Add-Ons</h3>
            <p className="text-foreground/70 mb-4">
              Customize your service with extras that matter to you.
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 ml-4">
              <li>Bedding refresh & change</li>
              <li>Laundry wash & fold</li>
              <li>Carpet spot treatment</li>
              <li>Upholstery refresh</li>
              <li>Organization assist</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* PLANS */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Choose Your Plan</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">One-Time</h3>
            <p className="text-foreground/70 mb-6">Perfect for move-ins, move-outs, or one-time deep cleans.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Full cleaning as needed
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
            <h3 className="text-2xl font-bold text-primary mb-2">Bi-Weekly</h3>
            <p className="text-foreground/70 mb-6">The sweet spot for most busy homes.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Priority scheduling
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Same team every visit
              </li>
              {/* <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                10% discount
              </li> */}
            </ul>
            <Link href="/quote">
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border-2 border-border bg-card p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">Weekly</h3>
            <p className="text-foreground/70 mb-6">For the ultimate maintenance routine.</p>
            <ul className="text-sm text-foreground/80 text-left space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Ultra-consistent sparkle
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                Dedicated team
              </li>
              {/* <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                15% discount
              </li> */}
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
      <Section>
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
        <h2 className="text-4xl font-bold mb-4">Ready for a Cleaner Home?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Contact us today for a free consultation and personalized quote for your home.
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
            Chat on WhatsApp
          </Button>
        </div>
      </Section>
    </div>
  )
}
