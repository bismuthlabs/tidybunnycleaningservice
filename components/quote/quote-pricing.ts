export type QuoteServiceType =
  | 'standard'
  | 'deep'
  | 'move'
  | 'turnover'
  | 'guest-ready'
  | 'routine'

export type QuotePropertyType =
  | 'home'
  | 'apartment'
  | 'airbnb'
  | 'hotel'
  | 'guesthouse'
  | 'office'
  | 'other'

export type QuoteFrequency =
  | 'one-time'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'turnover-only'
  | undefined

export type QuoteInput = {
  serviceType: QuoteServiceType
  propertyType: QuotePropertyType
  bedrooms: number
  bathrooms: number
  frequency?: QuoteFrequency

  addOnWindows?: boolean
  addOnLaundry?: boolean
  addOnFridgeOven?: boolean
  addOnEdgesDetails?: boolean
}

export type QuoteLineItem = {
  label: string
  amount: number
}

export type QuoteResult = {
  serviceLabel: string
  recommendedServiceLabel: string
  recommendedServiceType: QuoteServiceType
  recommendationReason: string
  lineItems: QuoteLineItem[]
  total: number
  terms: string[]
}

const ADDON_PRICES = {
  windows: 35,
  laundry: 45,
  fridgeOven: 70,
  edgesDetails: 50,
} as const

const PROPERTY_MULTIPLIER: Record<QuotePropertyType, number> = {
  home: 1,
  apartment: 0.95,
  airbnb: 1,
  hotel: 1.12,
  guesthouse: 1.06,
  office: 1.18,
  other: 1.08,
}

const FREQUENCY_DISCOUNT: Record<Exclude<QuoteFrequency, undefined>, number> = {
  'one-time': 0,
  weekly: 0.1,
  'bi-weekly': 0.05,
  monthly: 0.02,
  'turnover-only': 0,
}

function roundToNearest(amount: number, nearest: number) {
  if (!Number.isFinite(amount)) return 0
  return Math.round(amount / nearest) * nearest
}

export function formatGhs(amount: number) {
  const n = Math.max(0, Math.round(amount))
  return `GHS ${n}`
}

export function labelServiceType(v: QuoteServiceType) {
  switch (v) {
    case 'standard':
      return 'Standard Home Care'
    case 'deep':
      return 'Deep Refresh'
    case 'move':
      return 'Move In / Move Out'
    case 'turnover':
      return 'Turnover Cleaning (Short-Stay)'
    case 'guest-ready':
      return 'Guest-Ready Presentation'
    case 'routine':
      return 'Routine Property Care'
  }
}

export function recommendService(input: QuoteInput) {
  const { propertyType, frequency, serviceType } = input

  const hospitality = propertyType === 'airbnb' || propertyType === 'hotel' || propertyType === 'guesthouse'
  if (hospitality) {
    if (serviceType === 'guest-ready') {
      return {
        recommendedServiceType: 'guest-ready' as const,
        recommendedServiceLabel: labelServiceType('guest-ready'),
        recommendationReason: 'Best for a photo-ready, hotel-style presentation for guests.',
      }
    }

    return {
      recommendedServiceType: 'turnover' as const,
      recommendedServiceLabel: labelServiceType('turnover'),
      recommendationReason:
        frequency === 'turnover-only'
          ? 'Best for consistent resets between guests.'
          : 'Short-stays usually benefit most from a consistent turnover clean.',
    }
  }

  if (serviceType === 'standard' && (frequency === 'one-time' || !frequency)) {
    return {
      recommendedServiceType: 'deep' as const,
      recommendedServiceLabel: labelServiceType('deep'),
      recommendationReason: 'One-time cleans typically feel best with a deeper reset.',
    }
  }

  if (frequency && frequency !== 'one-time' && frequency !== 'turnover-only') {
    return {
      recommendedServiceType: 'standard' as const,
      recommendedServiceLabel: labelServiceType('standard'),
      recommendationReason: 'Recurring visits are best kept consistent with Standard Home Care.',
    }
  }

  return {
    recommendedServiceType: input.serviceType,
    recommendedServiceLabel: labelServiceType(input.serviceType),
    recommendationReason: 'Matches your selection.',
  }
}

function computeBase(input: QuoteInput) {
  const beds = Math.max(0, Math.min(20, Math.round(input.bedrooms)))
  const baths = Math.max(0, Math.min(20, Math.round(input.bathrooms)))

  switch (input.serviceType) {
    case 'standard':
      return 95 + beds * 18 + baths * 14
    case 'deep':
      return 170 + beds * 30 + baths * 22
    case 'move':
      return 190 + beds * 34 + baths * 26
    case 'turnover':
      return 140 + beds * 24 + baths * 18
    case 'guest-ready':
      return 210 + beds * 32 + baths * 24
    case 'routine':
      return 120 + beds * 20 + baths * 16
  }
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const serviceLabel = labelServiceType(input.serviceType)
  const rec = recommendService(input)

  const base = computeBase(input)
  const propertyMultiplier = PROPERTY_MULTIPLIER[input.propertyType]
  const propertyAdjusted = base * propertyMultiplier

  const frequency = input.frequency ?? 'one-time'
  const discountRate = FREQUENCY_DISCOUNT[frequency] ?? 0
  const discount = propertyAdjusted * discountRate

  const addOnTotal =
    (input.addOnWindows ? ADDON_PRICES.windows : 0) +
    (input.addOnLaundry ? ADDON_PRICES.laundry : 0) +
    (input.addOnFridgeOven ? ADDON_PRICES.fridgeOven : 0) +
    (input.addOnEdgesDetails ? ADDON_PRICES.edgesDetails : 0)

  const beforeRound = propertyAdjusted - discount + addOnTotal
  const total = roundToNearest(beforeRound, 5)

  const lineItems: QuoteLineItem[] = [{ label: `${serviceLabel} (base)`, amount: Math.round(base) }]

  if (Math.abs(propertyMultiplier - 1) > 0.001) {
    const delta = Math.round(propertyAdjusted - base)
    lineItems.push({
      label: `Property adjustment (${Math.round(propertyMultiplier * 100)}%)`,
      amount: delta,
    })
  }

  if (discountRate > 0) {
    lineItems.push({
      label: `Recurring discount (-${Math.round(discountRate * 100)}%)`,
      amount: -Math.round(discount),
    })
  }

  if (input.addOnWindows) lineItems.push({ label: 'Add-on: Interior windows', amount: ADDON_PRICES.windows })
  if (input.addOnLaundry) lineItems.push({ label: 'Add-on: Laundry (wash & fold)', amount: ADDON_PRICES.laundry })
  if (input.addOnFridgeOven) lineItems.push({ label: 'Add-on: Fridge/oven interior', amount: ADDON_PRICES.fridgeOven })
  if (input.addOnEdgesDetails) lineItems.push({ label: 'Add-on: Edges & detail work', amount: ADDON_PRICES.edgesDetails })

  const itemsSum = lineItems.reduce((acc, x) => acc + x.amount, 0)
  const rounding = total - itemsSum
  if (rounding !== 0) {
    lineItems.push({ label: 'Rounding adjustment', amount: rounding })
  }

  const terms = [
    'This quote is based on the details you provided (rooms, property type, and add-ons).',
    'We clean accessible areas; please secure fragile items if needed.',
    'If you request extra scope beyond this quote, we will confirm any added cost on WhatsApp before proceeding.',
    'By sending the WhatsApp message, you’re committing to this quoted service and price (we’ll reply to confirm date/time).',
  ]

  return {
    serviceLabel,
    recommendedServiceLabel: rec.recommendedServiceLabel,
    recommendedServiceType: rec.recommendedServiceType,
    recommendationReason: rec.recommendationReason,
    lineItems,
    total,
    terms,
  }
}
