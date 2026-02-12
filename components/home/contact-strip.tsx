'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/lib/motion'

export function ContactStrip() {
  return (
    <motion.section {...fadeInUp} className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Book premium cleaning in Kumasi</h2>
        <p className="text-lg opacity-90 mb-8">
          For homes, Airbnbs, guest houses, and hotels—reach out for a quote or schedule.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/quote">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground rounded hover:bg-primary-foreground/10 bg-transparent"
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
  )
}

