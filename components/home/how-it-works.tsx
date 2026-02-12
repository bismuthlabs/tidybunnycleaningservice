'use client'

import * as React from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  Sparkles,
} from 'lucide-react'

import { Section } from '@/components/section'

const STEP_MS = 3000
const PAUSE_AFTER_CLICK_MS = 9000

type HowItWorksStep = {
  id: string
  number: string
  title: string
  summary: string
  icon: React.ElementType
  youDo: string[]
  weDo: string[]
  timeLabel?: string
  tip?: string
}

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'tell-us',
    number: '01',
    title: 'Tell us about your space',
    summary: 'A few details help us recommend the right clean.',
    icon: MessageSquareText,
    timeLabel: '2–5 min',
    youDo: ['Message us your location (Kumasi) + space type', 'Share size/rooms and any priority areas'],
    weDo: ['Ask the right questions (so nothing is missed)', 'Recommend the best service + add-ons'],
    tip: 'Tip: A quick photo or short note about “pain points” helps us quote faster.',
  },
  {
    id: 'quote',
    number: '02',
    title: 'Get a clear quote',
    summary: 'Transparent scope, no confusion.',
    icon: ClipboardList,
    timeLabel: 'Same day',
    youDo: ['Confirm what you want cleaned (standard vs deep)', 'Tell us if you want add-ons like fridge/oven'],
    weDo: ['Explain exactly what’s included', 'Send a clear price estimate based on your needs'],
    tip: 'We prioritize premium finishing—baseboards, corners, and touch-up details when requested.',
  },
  {
    id: 'schedule',
    number: '03',
    title: 'Confirm your schedule',
    summary: 'Choose a time that fits your day (or guest turnover).',
    icon: CalendarClock,
    timeLabel: '1–2 min',
    youDo: ['Pick a preferred day + time window', 'Share access info (gate code / key handover)'],
    weDo: ['Confirm arrival window and duration', 'Send a simple reminder before we arrive'],
  },
  {
    id: 'prep',
    number: '04',
    title: 'Prep (optional) + arrival',
    summary: 'Small prep makes results even better.',
    icon: CheckCircle2,
    timeLabel: '0–10 min',
    youDo: ['Put away fragile items (if any)', 'Point out anything we should avoid or handle gently'],
    weDo: ['Arrive discreetly and ready', 'Protect surfaces and work respectfully in your space'],
    tip: 'No heavy prep required—this is just to protect valuables and speed up the clean.',
  },
  {
    id: 'clean',
    number: '05',
    title: 'Premium clean + finishing',
    summary: 'Hotel-level polish, not just “looks okay”.',
    icon: Sparkles,
    timeLabel: 'Varies',
    youDo: ['Relax, work, or run errands', 'Message us if priorities change mid-clean'],
    weDo: ['Clean, sanitize, and detail carefully', 'Finish with symmetry, shine, and fresh presentation'],
    tip: 'For short-stays, we can help your space look “photo-ready” for guests.',
  },
  {
    id: 'final',
    number: '06',
    title: 'Final check + follow-up',
    summary: 'We don’t leave until it feels finished.',
    icon: Camera,
    timeLabel: '2–4 min',
    youDo: ['Do a quick walk-through (if you’re home)', 'Tell us if you’d like recurring visits'],
    weDo: ['Do a final inspection and touch-ups', 'Optional notes/photos for hosts on request'],
    tip: 'We love feedback—small notes help us keep your standard consistent every visit.',
  },
]

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { amount: 0.5 })

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [hoverPaused, setHoverPaused] = React.useState(false)
  const [focusPaused, setFocusPaused] = React.useState(false)
  const [clickPausedUntil, setClickPausedUntil] = React.useState<number>(0)
  const [resumeTick, setResumeTick] = React.useState(0)
  const [progressCycle, setProgressCycle] = React.useState(0)

  const now = Date.now()
  const clickPaused = clickPausedUntil > now

  React.useEffect(() => {
    if (!clickPaused) return
    const ms = clamp(clickPausedUntil - Date.now(), 0, PAUSE_AFTER_CLICK_MS)
    const t = window.setTimeout(() => setResumeTick((x) => x + 1), ms + 20)
    return () => window.clearTimeout(t)
  }, [clickPaused, clickPausedUntil])

  const running = inView && !reduceMotion && !hoverPaused && !focusPaused && !clickPaused

  React.useEffect(() => {
    if (!running) return
    setProgressCycle((c) => c + 1)
  }, [running, activeIndex, resumeTick, inView, reduceMotion])

  React.useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % HOW_IT_WORKS_STEPS.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [running])

  const active = HOW_IT_WORKS_STEPS[activeIndex]!

  const onSelectStep = (idx: number) => {
    setActiveIndex(idx)
    if (!reduceMotion) setClickPausedUntil(Date.now() + PAUSE_AFTER_CLICK_MS)
  }

  return (
    <Section className="bg-secondary/20">
      <div ref={wrapRef}>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">How It Works</h2>
        <p className="mx-auto max-w-3xl text-center text-foreground/70">
          Simple & predictable. We guide you from quote → schedule → a hotel-level finish—every time.
        </p>

        <div
          className="mt-12"
          onPointerEnter={() => setHoverPaused(true)}
          onPointerLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setFocusPaused(true)}
          onBlurCapture={(e) => {
            const next = e.relatedTarget as Node | null
            if (!next || !e.currentTarget.contains(next)) setFocusPaused(false)
          }}
        >
          {/* Step selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {HOW_IT_WORKS_STEPS.map((s, idx) => {
              const isActive = idx === activeIndex
              const Icon = s.icon

              return (
                <motion.button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectStep(idx)}
                  aria-pressed={isActive}
                  className={[
                    'relative text-left rounded-2xl border px-4 py-4 transition',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'border-accent/40 bg-gradient-to-b from-accent/10 via-background to-background shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                      : 'border-border bg-card hover:bg-secondary/30',
                  ].join(' ')}
                  layout
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground/55">{s.number}</p>
                      <p className="mt-1 text-sm font-semibold text-primary leading-snug">{s.title}</p>
                    </div>

                    <motion.div
                      aria-hidden="true"
                      className={[
                        'shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border',
                        isActive ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border bg-background text-foreground/70',
                      ].join(' ')}
                      animate={
                        !reduceMotion && isActive
                          ? { y: [0, -3, 0], rotate: [0, -2, 0] }
                          : { y: 0, rotate: 0 }
                      }
                      transition={
                        !reduceMotion && isActive
                          ? { duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] as const }
                          : { duration: 0.2 }
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <p className="mt-2 text-xs text-foreground/65 line-clamp-2">{s.summary}</p>

                  {/* {isActive ? (
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-foreground/55">
                      <span className="inline-flex h-5 items-center rounded-full border border-border bg-background px-2">
                        {s.timeLabel || 'Quick'}
                      </span>
                      <span className="truncate">
                        {clickPaused ? 'Paused while you browse' : running ? 'Auto-advancing' : 'Ready'}
                      </span>
                    </div>
                  ) : null} */}
                </motion.button>
              )
            })}
          </div>

          {/* Detail panel */}
          {/* <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative h-1 bg-secondary/40">
              {running ? (
                <motion.div
                  key={`${active.id}-${progressCycle}`}
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ transformOrigin: '0% 50%' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_MS / 1000, ease: [0, 0, 1, 1] as const }}
                />
              ) : (
                <div className="absolute inset-y-0 left-0 w-0 bg-accent" />
              )}
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground/55">{active.number}</p>
                  <p className="mt-1 text-xl sm:text-2xl font-semibold text-primary">{active.title}</p>
                  <p className="mt-2 text-sm text-foreground/70">{active.summary}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>{active.timeLabel || 'Quick step'}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
                  className="mt-6 grid gap-6 md:grid-cols-2"
                >
                  <div className="rounded-xl border border-border bg-secondary/15 p-4">
                    <p className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" /> You do
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                      {active.youDo.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/80" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/15 p-4">
                    <p className="text-sm font-semibold text-primary flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> We do
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                      {active.weDo.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/80" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              {active.tip ? (
                <div className="mt-6 rounded-xl border border-border bg-background p-4">
                  <p className="text-sm text-foreground/75 flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-secondary/20 text-accent">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span>{active.tip}</span>
                  </p>
                </div>
              ) : null}
            </div>
          </div> */}

          {/* Subtle “infinite loop” cue */}
          {/* <div className="mt-5 flex items-center justify-center gap-2 text-xs text-foreground/55">
            <CalendarClock className="h-4 w-4" />
            <span>
              {reduceMotion
                ? 'Animations are reduced for your settings.'
                : running
                  ? 'Auto-advancing through steps.'
                  : 'Hover/focus pauses — click any step to explore.'}
            </span>
          </div> */}
        </div>
      </div>
    </Section>
  )
}
