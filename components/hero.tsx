'use client'

import React from "react"

import { motion } from 'framer-motion'

interface HeroProps {
  headline: string
  subheading: string
  children?: React.ReactNode
}

export function Hero({ headline, subheading, children }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden pt-20 pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-primary mb-6">
            {headline}
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            {subheading}
          </p>
        </motion.div>

        {children}
      </div>
    </motion.section>
  )
}
