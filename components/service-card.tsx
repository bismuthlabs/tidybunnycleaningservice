'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  title: string
  description: string
}

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
      <p className="text-foreground/70 mb-4">{description}</p>
      <Link href="/quote">
        <Button
          size="sm"
          variant="outline"
          className="text-accent border-accent hover:bg-accent/5 bg-transparent"
        >
          Request Quote
        </Button>
      </Link>
    </motion.div>
  )
}
