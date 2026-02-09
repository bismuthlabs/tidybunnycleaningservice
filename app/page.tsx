'use client'

import Link from 'next/link'
import Image from 'next/image'
import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
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
    },
    {
      id: 'deep-refresh',
      title: 'Deep Refresh',
      subtitle: 'Top-to-bottom reset with premium detail',
      meta: 'Ideal for first-time clients or seasonal resets',
      image:
        'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1600&q=80',
      badge: 'First-Time Favorite',
      href: '/services',
    },
    {
      id: 'move-in-out',
      title: 'Move In / Move Out',
      subtitle: 'A pristine start (or handover) with confidence',
      meta: 'Empty-space perfection for smooth transitions',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
    },
    {
      id: 'premium-touchups',
      title: 'Premium Touch-Ups',
      subtitle: 'Finish-level upgrades that change how a room feels',
      meta: 'Baseboards, fridge/oven interior, bedding refresh',
      image:
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
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
    },
    {
      id: 'routine-property-care',
      title: 'Routine Property Care',
      subtitle: 'Scheduled maintenance for consistent standards',
      meta: 'Reliable cadence to protect reviews & reputation',
      image:
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
    },
    {
      id: 'host-report',
      title: 'Optional Host Report + Photos',
      subtitle: 'Peace of mind after every turnover',
      meta: 'Note issues + quick photos on request',
      image:
        'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80',
      href: '/for-short-stays',
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
    },
    {
      id: 'fridge-oven',
      title: 'Fridge / Oven Interior',
      subtitle: 'A clean you can feel (and smell)',
      meta: 'Degreased, refreshed, and carefully detailed',
      image:
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80',
      href: '/services',
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
              {/* <p className="mt-1 text-sm text-foreground/70">{item.subtitle}</p> */}
            </div>

            {/* Airbnb-style “rating” spot → replace with “Premium” */}
            {/* <div className="shrink-0 rounded-full border border-border bg-secondary/30 px-2.5 py-1 text-xs font-medium text-foreground/80">
              Premium
            </div> */}
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              {/* <MapPin className="h-3.5 w-3.5" /> */}
              <span className="line-clamp-2">{item.meta}</span>
            </div>

            <Link
              href={item.href || '/services'}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
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
            {/* <p className="text-xl font-semibold text-primary">{activeCategory?.label}</p> */}
            <p className="text-sm text-foreground/60">{activeCategory?.hint}</p>
          </div>

          {/* <div className="flex items-center gap-2">
            <Link href="/quote">
              <Button className="rounded-xl">Request a Quote</Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="rounded-xl">
                View all services
              </Button>
            </Link>
          </div> */}
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
        // | Tidy Bunny delivers a calm, sparkling home—cleaned with joy, precision, and respect for your time. Ideal for busy professionals, high-income households, guest houses, hotels, and Airbnbs that must always look ready.
        
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

      {/* TURNOVER STANDARD */}
      {/* <Section>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">
          Turnover Standard
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Guest-Ready Every Time
        </p>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            'Fresh linens & perfectly made beds (photo-ready finish)',
            'Bathrooms disinfected, polished, and restocked (supplies provided)',
            'Kitchen reset: counters, sink, appliance exteriors, dining area wiped down',
            'High-touch points sanitized (handles, switches, remotes)',
            'Floors finished properly (vacuum + mop, edges included)',
            'Trash removed, bins relined, and space fully refreshed',
            'Final inspection walkthrough before lock-up',
            'Optional host report + photos',
          ].map((bullet, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="mt-1 flex-shrink-0">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <p className="text-foreground/80 font-medium">{bullet}</p>
            </motion.div>
          ))}
        </div>
      </Section> */}

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
