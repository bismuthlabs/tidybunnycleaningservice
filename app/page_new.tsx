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
  Shield,
  Clock,
  Camera,
  Home as HomeIcon,
  Hotel,
  Wand2,
  ArrowRight,
  MapPin,
  X,
} from 'lucide-react'
import { ParallaxHero } from '@/components/parallax-hero'
import { Section } from '@/components/section'

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true },
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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
  description: string
  includes: string[]
  idealFor: string
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
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      badge: 'Most Popular',
      href: '/for-homes',
      description: 'Keep your home fresh and clean with our regular maintenance service. Perfect for busy professionals who want a spotless home without the stress. We handle the weekly or bi-weekly cleaning so you can focus on what matters most.',
      includes: [
        'Dusting and vacuuming all rooms',
        'Bathroom cleaning and sanitizing',
        'Kitchen surfaces and appliance wipe-down',
        'Floor care and mopping',
        'Trash removal and bin refreshing',
        'Consistent team for your home',
      ],
      idealFor: 'Busy professionals and families who want regular maintenance without the effort.',
    },
    {
      id: 'deep-refresh',
      title: 'Deep Refresh',
      subtitle: 'Top-to-bottom reset with premium detail',
      meta: 'Ideal for first-time clients or seasonal resets',
      image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1600&q=80',
      badge: 'First-Time Favorite',
      href: '/services',
      description: 'A comprehensive, top-to-bottom cleaning that leaves your home feeling completely refreshed. We get into those details often overlooked in regular cleaning, giving your home the hotel-quality finish it deserves.',
      includes: [
        'Complete interior window cleaning',
        'Behind furniture and appliance cleaning',
        'Baseboards and trim detail work',
        'Ceiling fans and light fixtures',
        'Kitchen deep clean (fridge exterior, oven top)',
        'Bathroom fixtures polished',
        'Door frames and handles sanitized',
        'Carpet edge cleaning',
      ],
      idealFor: 'First-time clients or seasonal refresh when you want everything thoroughly cleaned.',
    },
    {
      id: 'move-in-out',
      title: 'Move In / Move Out',
      subtitle: 'A pristine start (or handover) with confidence',
      meta: 'Empty-space perfection for smooth transitions',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'Making transitions smooth and clean. Whether moving into a new home or preparing to leave one, we ensure your space is in pristine condition for the next chapter.',
      includes: [
        'All surfaces cleaned from top to bottom',
        'Walls wiped down and baseboards cleaned',
        'Inside all cabinets and closets',
        'Appliance interiors and exteriors',
        'Floors stripped and polished',
        'Every corner and edge detailed',
        'Final inspection walk-through',
      ],
      idealFor: 'Anyone moving in or out who wants to leave the space perfect or start fresh in a spotless home.',
    },
    {
      id: 'premium-touchups',
      title: 'Premium Touch-Ups',
      subtitle: 'Finish-level upgrades that change how a room feels',
      meta: 'Baseboards, fridge/oven interior, bedding refresh',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'Add those special finishing touches that make your home feel truly premium. These targeted upgrades give rooms that extra sparkle and care without a full cleaning.',
      includes: [
        'Interior fridge and oven cleaning',
        'Baseboard detail and polish',
        'Bedding refresh (wash and perfectly make beds)',
        'Wall touch-ups and spot cleaning',
        'Interior window detail',
        'Door and handle sanitizing',
        'Custom detail work of your choice',
      ],
      idealFor: 'Homeowners who want to elevate specific areas and add those finishing touches that make a home shine.',
    },
  ],
  shortstays: [
    {
      id: 'turnover-cleaning',
      title: 'Turnover Cleaning',
      subtitle: 'Fast, consistent resets between guests',
      meta: 'Planned around check-out → check-in windows',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      badge: 'Host Essential',
      href: '/for-short-stays',
      description: 'Your guests deserve to arrive to a pristine space. We handle fast, professional turnovers between check-outs and check-ins so you can welcome the next guest with confidence.',
      includes: [
        'All surfaces cleaned and sanitized',
        'Fresh linens and perfectly made beds',
        'Bathroom disinfected and restocked',
        'Kitchen reset and appliances wiped',
        'High-touch points sanitized (handles, switches, remotes)',
        'Floors vacuumed and mopped',
        'Final walk-through inspection',
        'Quick turnarounds (2-3 hours standard)',
      ],
      idealFor: 'Airbnb hosts, hotels, and guest house owners managing back-to-back bookings.',
    },
    {
      id: 'guest-ready-presentation',
      title: 'Guest-Ready Presentation',
      subtitle: 'Photo-ready staging with a hotel-level finish',
      meta: 'Towels, amenities alignment, polish & symmetry',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      badge: 'Premium Finish',
      href: '/for-short-stays',
      description: 'Make your listing shine. We prepare every detail with guest impression in mind—photo-ready staging that impresses from the moment your guest arrives.',
      includes: [
        'Everything from Turnover Cleaning',
        'Amenity alignment and arrangement',
        'Towel folding and display',
        'Bedding styled for visual appeal',
        'Candles and fresh scents placed',
        'Welcome items arranged nicely',
        'Minor decorative touches',
        'Photo-ready final presentation',
      ],
      idealFor: 'Hosts who want that premium, five-star hotel experience that keeps guests happy and reviews glowing.',
    },
    {
      id: 'routine-property-care',
      title: 'Routine Property Care',
      subtitle: 'Scheduled maintenance for consistent standards',
      meta: 'Reliable cadence to protect reviews & reputation',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'Keep your property in top condition between guests. Regular scheduled cleaning maintains your property standards and protects your reputation with consistent care.',
      includes: [
        'Weekly or bi-weekly maintenance',
        'Common areas refreshed regularly',
        'Quick inspections for maintenance needs',
        'Consistent cleaning standard',
        'Property condition monitored',
        'Guest experience maintained',
        'Flexible scheduling options',
      ],
      idealFor: 'Multi-property managers and hosts who need consistent maintenance care regardless of booking status.',
    },
    {
      id: 'host-report',
      title: 'Optional Host Report + Photos',
      subtitle: 'Peace of mind after every turnover',
      meta: 'Note issues + quick photos on request',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80',
      href: '/for-short-stays',
      description: 'Get documentation of every turnover. We provide before/after photos and detailed notes so you know exactly what was done and can spot any guest damage or needed repairs.',
      includes: [
        'Before and after photos',
        'Detailed completion checklist',
        'Any damage or issues noted',
        'Time-stamped report',
        'Photo documentation of condition',
        'Easy reference for your records',
        'Peace of mind and accountability',
      ],
      idealFor: 'Property managers and hosts who want detailed documentation and verification of each cleaning.',
    },
  ],
  addons: [
    {
      id: 'interior-windows',
      title: 'Interior Windows',
      subtitle: 'Streak-free glass that lifts the whole space',
      meta: 'Accessible areas only • Interior finish',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'Clean windows make spaces feel brighter and more open. We provide professional streak-free cleaning of all accessible interior windows for that crystal-clear finish.',
      includes: [
        'All interior window panes cleaned',
        'Window frames wiped down',
        'Sills dusted and cleaned',
        'Streak-free professional finish',
        'Glass polished to shine',
        'Accessible areas only',
      ],
      idealFor: 'Anyone wanting to brighten their space with crystal-clear windows.',
    },
    {
      id: 'laundry',
      title: 'Laundry (Wash & Fold)',
      subtitle: 'Neat, fresh, guest-ready linens and towels',
      meta: 'Perfect for short-stays and busy homes',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1600&q=80',
      badge: 'Short-Stay Boost',
      href: '/services',
      description: 'Fresh, clean, perfectly folded linens and towels. Perfect for short-stay properties between guests or busy households who want one less thing to worry about.',
      includes: [
        'Linens and towels washed',
        'Professional folding',
        'Neat stacking and storage',
        'Fresh scent',
        'Guest-ready presentation',
        'Quick turnaround',
        'Custom organization',
      ],
      idealFor: 'Short-stay hosts needing fresh linens and busy households wanting laundry off their plate.',
    },
    {
      id: 'fridge-oven',
      title: 'Fridge / Oven Interior',
      subtitle: 'A clean you can feel (and smell)',
      meta: 'Degreased, refreshed, and carefully detailed',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
      description: 'These appliances take a beating and need special care. We deep clean the interior of your fridge and oven, removing grease, odors, and making them feel brand new.',
      includes: [
        'Fridge shelves and drawers cleaned',
        'Interior wiped and sanitized',
        'Odor removal and freshening',
        'Oven interior degreased',
        'Racks cleaned thoroughly',
        'Safe, effective cleaning methods',
        'Detailed attention to every corner',
      ],
      idealFor: 'Anyone wanting a deep clean of these heavily-used appliances without the DIY hassle.',
    },
    {
      id: 'edges-details',
      title: 'Edges & Detail Work',
      subtitle: 'Baseboards, corners, and the "noticeable" little things',
      meta: 'The finishing layer that makes it premium',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      badge: 'Premium Finish',
      href: '/services',
      description: 'It\'s the details that separate good cleaning from premium cleaning. We focus on baseboards, corners, door frames, and all those finishing touches that make homes shine.',
      includes: [
        'Baseboard cleaning and polish',
        'Corner and edge detail work',
        'Door frame and handle sanitizing',
        'Light switch and outlet cleaning',
        'Trim and molding attention',
        'Ceiling edge dusting',
        'Wall touch-ups and spot cleaning',
      ],
      idealFor: 'Those who want that premium, luxury finish with attention to every detail.',
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 b-gradient-to-r from-background to-transparent" />
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

function ServiceListingCard({ item }: { item: ServiceItem }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
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
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <span className="line-clamp-2">{item.meta}</span>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Details <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Details Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Fixed Close Button */}
          <div className="sticky top-0 z-50 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
            <DialogTitle className="text-2xl font-bold text-primary">{item.title}</DialogTitle>
            <DialogClose className="rounded-full p-2 hover:bg-secondary transition-colors">
              <X className="h-5 w-5 text-primary" />
            </DialogClose>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Subtitle and Description */}
            <div>
              <p className="text-lg font-semibold text-primary mb-2">{item.subtitle}</p>
              <p className="text-foreground/80 leading-relaxed">{item.description}</p>
            </div>

            {/* What's Included Section */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">What's Included</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.includes.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For Section */}
            <div className="bg-secondary/20 rounded-lg p-4 border border-secondary">
              <p className="text-sm text-foreground/70 mb-1">
                <span className="font-semibold text-foreground">Perfect For: </span>
                {item.idealFor}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4">
              <Link href="/quote" className="flex-1">
                <Button className="w-full rounded-lg">Request a Quote</Button>
              </Link>
              <Link href={item.href || '/services'} className="flex-1">
                <Button variant="outline" className="w-full rounded-lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ServicesAirbnbSection() {
  const [active, setActive] = React.useState<CategoryId>('homes')

  const activeCategory = React.useMemo(
    () => CATEGORIES.find((c) => c.id === active),
    [active]
  )

  return (
    <Section id="services">
      <div className="mx-auto max-w-6xl">
        <div className="mt-">
          <CategoryTabs value={active} onChange={setActive} />
        </div>

        {/* Category header line (Airbnb-like: label + hint) */}
        <motion.div
          {...fadeInUp}
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm text-foreground/60">{activeCategory?.hint}</p>
          </div>
        </motion.div>

        <div className="mt-4 grid gap-1 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES[active].map((item) => (
            <ServiceListingCard key={item.id} item={item} />
          ))}
        </div>
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
        backgroundImage="/anton-SnKfmC1I9fU-unsplash.jpg"
      />

      {/* ✅ SERVICES SECTION (Airbnb-inspired category browsing UI) */}
      <ServicesAirbnbSection />

      {/* OUR STANDARD */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-primary">
          Our Standard
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Precision & Shine',
              desc: 'We clean for the finish: surfaces that sparkle, corners that look cared for, and rooms that feel light.',
            },
            {
              title: 'Calm, Respectful Service',
              desc: 'Professional, discreet, mindful of your belongings and privacy.',
            },
            {
              title: 'Joy in Every Visit',
              desc: 'We bring positive energy and goodwill into your home—because a clean space should feel good.',
            },
          ].map((standard, idx) => (
            <motion.div
              key={idx}
              {...fadeInScale}
              className="rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{standard.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{standard.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Call / WhatsApp 059 523 6285
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <a href="tel:+233595236285" className="cursor-pointer">
                    Call: 059 523 6285
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={openWhatsApp} className="w-full cursor-pointer text-left">
                    WhatsApp: 059 523 6285
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/quote">
              <Button size="lg" variant="outline" className="border-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
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
