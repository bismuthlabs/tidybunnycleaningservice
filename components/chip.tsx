'use client'

import { motion } from 'framer-motion'

interface ChipProps {
  label: string
  delay?: number
}

export function Chip({ label, delay = 0 }: ChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground/80"
    >
      {label}
    </motion.div>
  )
}
