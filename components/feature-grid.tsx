'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  label: string
}

interface FeatureGridProps {
  features: Feature[]
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
      {features.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <item.icon className="mb-3 h-8 w-8 text-accent" />
          <p className="text-sm font-medium text-foreground/80">{item.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
