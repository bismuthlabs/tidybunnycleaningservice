const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT },
  viewport: { once: true },
} as const

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: EASE_OUT },
  viewport: { once: true },
} as const
