'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="The Story Behind Tidy Bunny"
        subheading="We believe your home should feel like a sanctuary. That's why we started Tidy Bunny—to bring joy, precision, and trust to cleaning."
      />

      {/* BRAND VALUES */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Precision</h3>
            <p className="text-foreground/70">
              We clean for the finish. Every corner matters. Every surface sparkles. Details make the difference.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Joy</h3>
            <p className="text-foreground/70">
              We bring positive energy into your home. A clean space should feel good. It's about goodwill, respect, and care.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-accent/10 p-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Trust</h3>
            <p className="text-foreground/70">
              Your home is safe with us. Background-checked, insured, professional. We earn your trust every visit.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* STORY */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">Why We Started Tidy Bunny</h2>

          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <motion.p {...fadeInUp}>
              Tidy Bunny was born from a simple observation: <strong>people are busy</strong>. Busy with work, family, guests, bookings—and somewhere in the middle, their homes get neglected.
            </motion.p>

            <motion.p {...fadeInUp}>
              We realized that <strong>premium cleaning shouldn't be complicated</strong>. It shouldn't involve sketchy contractors, inconsistent quality, or homes left in worse shape than before.
            </motion.p>

            <motion.p {...fadeInUp}>
              So we created Tidy Bunny to deliver exactly what busy people need: <strong>reliable, professional, joyful cleaning</strong>. A service that respects your time, your home, and your peace of mind.
            </motion.p>

            <motion.p {...fadeInUp}>
              Whether you're a busy professional wanting to come home to a sparkling sanctuary, or a host managing multiple short-stay properties, Tidy Bunny is here to handle the cleaning so you can focus on what matters.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* THE STANDARD */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">The Tidy Bunny Standard</h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-3xl font-bold text-accent">01</div>
              <h3 className="text-lg font-semibold text-primary mb-3">Precision & Shine</h3>
              <p className="text-foreground/70 text-sm">
                We clean for the finish. Surfaces that sparkle, corners that look cared for, rooms that feel light and fresh.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-3xl font-bold text-accent">02</div>
              <h3 className="text-lg font-semibold text-primary mb-3">Calm, Respectful Service</h3>
              <p className="text-foreground/70 text-sm">
                Professional, discreet, mindful of your belongings and privacy. We treat your home like our own.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-3xl font-bold text-accent">03</div>
              <h3 className="text-lg font-semibold text-primary mb-3">Joy in Every Visit</h3>
              <p className="text-foreground/70 text-sm">
                We bring positive energy and goodwill. Because a clean space should feel good, not just look clean.
              </p>
            </motion.div>
          </div>

          <motion.p {...fadeInUp} className="text-center text-foreground/70">
            Every cleaning is an opportunity to earn your trust and exceed your expectations.
          </motion.p>
        </div>
      </Section>

      {/* TEAM */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Our Team</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Every member of the Tidy Bunny team is carefully selected, background-checked, and trained to our premium standard. We're not just cleaners—we're caretakers of your space.
          </p>
          <p className="text-foreground/70">
            Your consistent team approach means better results, familiarity with your space, and the kind of care that comes from building a real relationship with a home.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-4">Experience the Tidy Bunny Difference</h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Ready to let us take care of your home? Book your first cleaning today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            onClick={() => window.open('https://wa.me/233595236285', '_blank')}
          >
            Chat with Us
          </Button>
        </div>
      </Section>
    </div>
  )
}
