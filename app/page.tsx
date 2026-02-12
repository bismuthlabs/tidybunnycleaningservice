'use client'

import Link from 'next/link'
import Image from 'next/image'
import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronDown,
  Sparkles,
  Home as HomeIcon,
  Hotel,
  Wand2,
  MapPin,
  X,
} from 'lucide-react'
import { ParallaxHero } from '@/components/parallax-hero'
import { Section } from '@/components/section'

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true },
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true },
}

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
  { id: 'homes', label: 'For Homes', icon: HomeIcon, hint: 'Busy households & high-income residences' },
  { id: 'shortstays', label: 'Short-Stays & Hotels', icon: Hotel, hint: 'Airbnb, guest houses, hotels' },
  { id: 'addons', label: 'Premium Add-ons', icon: Wand2, hint: 'Finish-level details' },
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
      description: 'Interior cleaning to remove spills, smells, and built-up grease (best booked as an add-on).',
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10" />

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
      {/* Remove the default close icon (we provide a vivid sticky one) */}
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden"
        // in case your shadcn dialog adds a default close button, we hide it
      >
        {/* Sticky top bar with vivid cancel button */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <DialogHeader className="space-y-0">
              <DialogTitle className="truncate text-base sm:text-lg">{item.title}</DialogTitle>
            </DialogHeader>
            <p className="truncate text-xs sm:text-sm text-foreground/60">{item.subtitle}</p>
          </div>

          <DialogClose asChild>
            <button
              aria-label="Close"
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-500/15"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </DialogClose>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Image */}
          <div className="relative aspect-[16/9]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
            {item.badge ? (
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {item.badge}
                </span>
              </div>
            ) : null}
          </div>

          <div className="p-5 sm:p-6">
            {/* Simple English explanation */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/70 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{item.meta}</span>
              </p>

              {item.description ? (
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
              ) : (
                <p className="text-foreground/80 leading-relaxed">
                  This is a premium service. We clean carefully and leave the space looking fresh and ready.
                </p>
              )}
            </div>

            {/* Ideal For */}
            {item.idealFor ? (
              <div className="mt-6 rounded-xl border border-border bg-secondary/20 p-4">
                <p className="text-sm font-semibold text-primary">Ideal for</p>
                <p className="mt-1 text-sm text-foreground/75">{item.idealFor}</p>
              </div>
            ) : null}

            {/* Includes */}
            {item.includes?.length ? (
              <div className="mt-6">
                <p className="text-sm font-semibold text-primary mb-3">What we do</p>
                <ul className="space-y-2">
                  {item.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-sm text-foreground/75">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Links + CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                  Request a Quote
                </Button>
              </Link>

              <Link href={learnMoreHref} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl">
                  {learnMoreLabel}
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-xs text-foreground/55">
              Quick note: Pricing depends on the size of the space and how deep the clean needs to be.
            </p>
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
      <div className="rounded border border-border bg-card shadow-sm transition hover:shadow-lg overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
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

          <div className="mt-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              <span className="line-clamp-2">{item.meta}</span>
            </div>

            {/* ✅ CHANGED: Details link -> button that opens modal */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg border-primary/20 text-primary hover:bg-primary/5"
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

function ServicesAirbnbSection() {
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
        <div>
          <CategoryTabs value={active} onChange={setActive} />
        </div>

        <motion.div {...fadeInUp} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-foreground/60">{activeCategory?.hint}</p>
          </div>

          {/* <div className="flex items-center gap-2">
            <Link href="/quote">
              <Button className="rounded-xl">Request a Quote</Button>
            </Link>
          </div> */}
        </motion.div>

        <div className="mt-4 grid gap-1 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES[active].map((item) => (
            <ServiceListingCard key={item.id} item={item} onOpenDetails={openDetails} />
          ))}
        </div>

        {/* Modal */}
        <ServiceDetailsModal open={open} onOpenChange={setOpen} item={selected} />
      </div>
    </Section>
  )
}

export default function Home() {
  const openWhatsApp = () => {
    window.open('https://wa.me/233595236285', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* PARALLAX HERO SECTION */}
      <ParallaxHero
        headline="Cleaning Service for Homes & Short-Stays in Kumasi."
        subheading="Tidy Bunny Cleaning Service is a reliable and detailed-oriented cleaning service committed to delivering spotless, healthy, and refereshing spaces. We provide high quality residential and commercial cleaning using safe and effective methods tailored to each clients needs. With Tidy Bunny, cleaning is not just a service - it's a standard."
        backgroundImage="/woman-is-holding-cleaning-product-gloves-rags-basin-white-wall.jpg"
      />

      {/* ✅ SERVICES SECTION (Airbnb-inspired category browsing UI + modal details) */}
      <ServicesAirbnbSection />

      {/* HOW IT WORKS */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-primary">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            { num: '01', title: 'Request a Quote', desc: 'Call or WhatsApp us with your details' },
            { num: '02', title: 'Choose Schedule', desc: 'One-time or recurring cleaning service' },
            { num: '03', title: 'Enjoy the Sparkle', desc: 'Premium finish, every single time' },
          ].map((step, idx) => (
            <motion.div key={idx} {...fadeInScale} className="relative text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl font-bold">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
              <p className="text-foreground/70">{step.desc}</p>
              {idx < 2 && <div className="absolute -right-4 top-8 hidden md:block h-1 w-8 bg-border" />}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT STRIP */}
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
    </div>
  )
}
