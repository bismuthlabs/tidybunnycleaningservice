'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
  Home as HomeIcon,
  Hotel,
  Wand2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Section } from '@/components/section'
import { fadeInScale, fadeInUp } from '@/lib/motion'

type CategoryId = 'homes' | 'shortstays' | 'addons'

type ServiceItem = {
  id: string
  title: string
  subtitle: string
  meta: string
  image: string
  badge?: string
  href?: string

  // modal content
  description?: string
  includes?: string[]
  idealFor?: string
}

const CATEGORIES: Array<{
  id: CategoryId
  label: string
  icon: React.ElementType
  hint: string
}> = [
  {
    id: 'homes',
    label: 'For Homes',
    icon: HomeIcon,
    hint: 'Busy households & high-income residences',
  },
  {
    id: 'shortstays',
    label: 'Short-Stays & Hotels',
    icon: Hotel,
    hint: 'Airbnb, guest houses, hotels',
  },
  {
    id: 'addons',
    label: 'Premium Add-ons',
    icon: Wand2,
    hint: 'Finish-level details',
  },
]

const SERVICES: Record<CategoryId, ServiceItem[]> = {
  homes: [
    {
      id: 'standard-home-care',
      title: 'Standard Home Care',
      subtitle: 'Maintenance sparkle for busy schedules',
      meta: 'Best for weekly / bi-weekly routines',
      image:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      badge: 'Most Popular',
      href: '/for-homes',
      description:
        'This is regular cleaning that keeps your home fresh all the time. We focus on the main areas so your home stays neat and comfortable.',
      includes: [
        'Dust and wipe surfaces',
        'Vacuum and mop floors',
        'Clean and sanitize bathrooms',
        'Clean kitchen counters and sink',
        'Wipe appliance exteriors',
        'Empty trash and refresh bins',
      ],
      idealFor: 'Busy professionals and families who want a clean home every week.',
    },
    {
      id: 'deep-refresh',
      title: 'Deep Refresh',
      subtitle: 'Top-to-bottom reset with premium detail',
      meta: 'Ideal for first-time clients or seasonal resets',
      image:
        'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1600&q=80',
      badge: 'First-Time Favorite',
      href: '/for-homes',
      description:
        'This is a full reset. We go deeper than regular cleaning and handle the parts people usually miss. Your home will feel “new” again.',
      includes: [
        'Everything in Standard Home Care',
        'Baseboards and edges cleaned',
        'Light fixtures and ceiling fans wiped',
        'Extra detail in corners and behind items',
        'Doors, handles, and switches sanitized',
      ],
      idealFor: 'First-time clients, special occasions, or when you want a full refresh.',
    },
    {
      id: 'move-in-out',
      title: 'Move In / Move Out',
      subtitle: 'A pristine start (or handover) with confidence',
      meta: 'Empty-space perfection for smooth transitions',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      href: '/for-homes',
      description:
        'We clean an empty space properly so you can move in comfortably or hand it over confidently. We aim for “handover-ready” cleanliness.',
      includes: [
        'Top-to-bottom cleaning of all rooms',
        'Inside cabinets and closets (if empty)',
        'Detailed bathroom and kitchen cleaning',
        'Floors cleaned and finished',
        'Final walkthrough to catch details',
      ],
      idealFor: 'Moving in, moving out, or preparing a home for a new tenant.',
    },
    {
      id: 'premium-touchups',
      title: 'Premium Touch-Ups',
      subtitle: 'Finish-level upgrades that change how a room feels',
      meta: 'Baseboards, fridge/oven interior, bedding refresh',
      image:
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      href: '/for-homes',
      description:
        'These are upgrades you can add to any clean. They make your home feel extra polished without doing a full deep clean.',
      includes: [
        'Fridge interior or oven interior (optional)',
        'Baseboards detail work',
        'Bedding refresh and neat presentation',
        'Interior window touch-up (optional)',
      ],
      idealFor: 'High-end finishing when you want that premium look and feel.',
    },
  ],
  shortstays: [
    {
      id: 'turnover-cleaning',
      title: 'Turnover Cleaning',
      subtitle: 'Fast, consistent resets between guests',
      meta: 'Planned around check-out → check-in windows',
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      badge: 'Host Essential',
      href: '/for-short-stays',
      description:
        'We reset your space between guests so it is clean, fresh, and ready. We work with your check-out and check-in times.',
      includes: [
        'All surfaces cleaned and sanitized',
        'Beds neatly made (fresh linens if provided)',
        'Bathrooms disinfected and polished',
        'Kitchen reset and appliance exteriors wiped',
        'Floors vacuumed and mopped',
        'Final inspection before we leave',
      ],
      idealFor: 'Airbnb, guest houses, and hotels with back-to-back bookings.',
    },
    {
      id: 'guest-ready-presentation',
      title: 'Guest-Ready Presentation',
      subtitle: 'Photo-ready staging with a hotel-level finish',
      meta: 'Towels, amenities alignment, polish & symmetry',
      image:
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      badge: 'Premium Finish',
      href: '/for-short-stays',
      description:
        'This goes beyond cleaning. We make the space look beautiful for guests—like a hotel. It helps your listing feel premium.',
      includes: [
        'Everything in Turnover Cleaning',
        'Towels folded neatly',
        'Amenities arranged cleanly',
        'Bedding styled for a “wow” look',
        'Final “photo-ready” walkthrough',
      ],
      idealFor: 'Hosts who want better first impressions and stronger reviews.',
    },
    {
      id: 'routine-property-care',
      title: 'Routine Property Care',
      subtitle: 'Scheduled maintenance for consistent standards',
      meta: 'Reliable cadence to protect reviews & reputation',
      image:
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80',
      href: '/for-short-stays',
      description:
        'We keep your property in great condition even when guests are not coming every day. It prevents the space from looking tired.',
      includes: [
        'Regular scheduled cleaning',
        'Common areas refreshed',
        'Quick checks to spot issues early',
        'Consistent standard every visit',
      ],
      idealFor: 'Property managers and hosts who want consistent quality all month.',
    },
    {
      id: 'host-report',
      title: 'Optional Host Report + Photos',
      subtitle: 'Peace of mind after every turnover',
      meta: 'Note issues + quick photos on request',
      image:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80',
      href: '/for-short-stays',
      description:
        'We send a simple report after cleaning. We can add photos and notes so you know exactly what was done and what needs attention.',
      includes: [
        'Completion checklist',
        'Notes on damages or missing items',
        'Optional photo updates',
        'Easy message summary for your records',
      ],
      idealFor: 'Hosts who want clear updates and accountability after each clean.',
    },
  ],
  addons: [
    {
      id: 'interior-windows',
      title: 'Interior Windows',
      subtitle: 'Streak-free glass that lifts the whole space',
      meta: 'Accessible areas only • Interior finish',
      image:
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'We clean interior glass and mirrors to a streak-free finish (accessible areas only).',
      includes: ['Glass cleaned and polished', 'Frames wiped (light)', 'Streak-free final check'],
      idealFor: 'Homes and short-stays that want a brighter look.',
    },
    {
      id: 'laundry',
      title: 'Laundry (Wash & Fold)',
      subtitle: 'Neat, fresh, guest-ready linens and towels',
      meta: 'Perfect for short-stays and busy homes',
      image:
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1600&q=80',
      badge: 'Short-Stay Boost',
      href: '/services',
      description: 'We wash, dry, fold, and present linens neatly so beds and bathrooms look ready.',
      includes: ['Wash and fold linens', 'Towels presented neatly', 'Clean, fresh finish'],
      idealFor: 'Airbnbs and busy homes that want convenience.',
    },
    {
      id: 'fridge-oven',
      title: 'Fridge / Oven Interior',
      subtitle: 'A clean you can feel (and smell)',
      meta: 'Degreased, refreshed, and carefully detailed',
      image:
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description:
        'Interior cleaning to remove spills, smells, and built-up grease (best booked as an add-on).',
      includes: ['Safe degrease and wipe-down', 'Shelves cleaned (as possible)', 'Odour reduction focus'],
      idealFor: 'Homes that want a true deep-clean feeling.',
    },
    {
      id: 'edges-details',
      title: 'Edges & Detail Work',
      subtitle: 'Baseboards, corners, and the “noticeable” little things',
      meta: 'The finishing layer that makes it premium',
      image:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      badge: 'Premium Finish',
      href: '/services',
      description: 'We focus on the small details people notice when a space is truly premium.',
      includes: ['Baseboards cleaned', 'Corners and edges detailed', 'Handles/switches sanitized'],
      idealFor: 'Any space that wants a more luxurious finish.',
    },
  ],
}

function CategoryTabs({
  value,
  onChange,
}: {
  value: CategoryId
  onChange: (v: CategoryId) => void
}) {
  return (
    <div className="relative">
      {/* Fade edges like Airbnb horizontal category strip */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex gap-2 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => {
          const ActiveIcon = cat.icon
          const active = value === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={[
                'shrink-0 rounded-full border px-3.5 py-2 text-sm transition',
                'flex items-center gap-2',
                active
                  ? 'border-primary/30 bg-primary/5 text-primary shadow-sm'
                  : 'border-border bg-card hover:bg-secondary/30 text-foreground/80',
              ].join(' ')}
              aria-pressed={active}
            >
              <ActiveIcon className={active ? 'h-4 w-4' : 'h-4 w-4 opacity-80'} />
              <span className="font-medium">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ServiceDetailsModal({
  open,
  onOpenChange,
  item,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: ServiceItem | null
}) {
  if (!item) return null

  const learnMoreHref =
    item.href === '/for-homes' ? '/for-homes'
    : item.href === '/for-short-stays' ? '/for-short-stays'
    : item.href || '/services'

  const learnMoreLabel =
    item.href === '/for-homes' ? 'Learn more on the Homes page'
    : item.href === '/for-short-stays' ? 'Learn more on the Short-Stays page'
    : 'Learn more'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
          <div className="max-w-[60%] truncate text-sm font-medium">
            <DialogHeader className="space-y-0 text-left">
              <DialogTitle className="truncate text-base sm:text-lg">{item.title}</DialogTitle>
            </DialogHeader>
            {/* <p className="truncate text-xs sm:text-sm text-foreground/60">{item.subtitle}</p> */}
          </div>

          <DialogClose asChild>
            <button
              aria-label="Close"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground/80 hover:bg-secondary/30"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </DialogClose>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[50vh] overflow-y-auto">
          {/* Image hero */}
          <div className="relative aspect-[16/9]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
            {item.badge ? (
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {item.badge}
                </span>
              </div>
            ) : null}

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.meta}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur">
                  <Clock className="h-3.5 w-3.5" />
                  Quote in minutes on WhatsApp
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left: At-a-glance */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-border bg-secondary/10 p-4">
                  <p className="text-sm font-semibold text-primary">Overview</p>
                  <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                    {item.description ||
                      'This is a premium service. We clean carefully and leave the space looking fresh and ready.'}
                  </p>
                </div>

                {item.idealFor ? (
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-sm font-semibold text-primary">Ideal for</p>
                    <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{item.idealFor}</p>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-primary">Our standard</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                    {[
                      { icon: ShieldCheck, text: 'Discreet, respectful, and reliable in your space' },
                      { icon: CheckCircle2, text: 'Detail-focused finishing touches (not rushed)' },
                      { icon: Sparkles, text: 'Hotel-level presentation when requested' },
                    ].map(({ icon: Icon, text }) => (
                      <li key={text} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-secondary/20 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Included */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                  <p className="text-sm font-semibold text-primary mb-3">What we do</p>
                  {item.includes?.length ? (
                    <ul className="grid gap-2">
                      {item.includes.map((x) => (
                        <li key={x} className="flex gap-3 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground/80">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <CheckCircle2 className="h-4 w-4" />
                          </span>
                          <span className="leading-relaxed">{x}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-foreground/70">
                      We tailor the checklist to your space so the finish looks consistently premium.
                    </p>
                  )}

                  <div className="mt-5 rounded-xl border border-border bg-secondary/10 p-4">
                    <p className="text-sm font-semibold text-primary">Next steps</p>
                    <ol className="mt-3 grid gap-2 text-sm text-foreground/75 sm:grid-cols-3">
                      <li className="rounded-xl border border-border bg-background px-3 py-2">1) Get a quote</li>
                      <li className="rounded-xl border border-border bg-background px-3 py-2">2) Confirm schedule</li>
                      <li className="rounded-xl border border-border bg-background px-3 py-2">3) Enjoy the finish</li>
                    </ol>
                    <p className="mt-3 text-xs text-foreground/60">
                      Quotes depend on the size of the space and how deep the clean needs to be.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-foreground/60">
              Ready? Generate your quote and send it via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {/* <Link href={learnMoreHref} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl">
                  {learnMoreLabel}
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ServiceListingCard({
  item,
  onOpenDetails,
}: {
  item: ServiceItem
  onOpenDetails: (item: ServiceItem) => void
}) {
  return (
    <motion.div {...fadeInScale} className="group">
      <div className="rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
          {item.badge ? (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {item.badge}
              </span>
            </div>
          ) : null}
        </div>

        <div className="p-3 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm md:text-base font-semibold text-primary">{item.title}</p>
              <p className="mt-1 text-xs md:text-sm text-foreground/70 line-clamp-2">{item.subtitle}</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-foreground/60 line-clamp-2">{item.meta}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-foreground/55">View checklist & details</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-primary/20 text-primary hover:bg-primary/5"
              onClick={() => onOpenDetails(item)}
            >
              View details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesAirbnbSection() {
  const [active, setActive] = React.useState<CategoryId>('homes')
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<ServiceItem | null>(null)

  const activeCategory = React.useMemo(() => CATEGORIES.find((c) => c.id === active), [active])

  const openDetails = (item: ServiceItem) => {
    setSelected(item)
    setOpen(true)
  }

  return (
    <Section id="services">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeInUp} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-primary">
              Services tailored to your space
            </h2>
            <p className="mt-3 text-base sm:text-lg text-foreground/65">
              Pick a category, open any service, and see the checklist, ideal fit, and next steps.
            </p>
          </div>

          {/* <div className="flex items-center gap-2">
            <Link href="/services">
              <Button variant="outline" className="rounded-xl">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div> */}
        </motion.div>

        <div className="mt-8">
          <CategoryTabs value={active} onChange={setActive} />
        </div>

        <p className="mt-3 text-sm text-foreground/60">{activeCategory?.hint}</p>

        <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES[active].map((item) => (
            <ServiceListingCard key={item.id} item={item} onOpenDetails={openDetails} />
          ))}
        </div>

        <ServiceDetailsModal open={open} onOpenChange={setOpen} item={selected} />
      </div>
    </Section>
  )
}
