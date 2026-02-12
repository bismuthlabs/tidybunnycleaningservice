'use client'

import * as React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarClock, Clipboard, MessageCircle, Sparkles } from 'lucide-react'

import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { useToast } from '@/hooks/use-toast'
import { computeQuote, formatGhs, labelServiceType } from '@/components/quote/quote-pricing'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const WHATSAPP_NUMBER = '233595236285'

const QuoteSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name.'),
  phone: z.string().min(7, 'Please enter a valid phone/WhatsApp number.'),

  serviceType: z.enum(['standard', 'deep', 'move', 'turnover', 'guest-ready', 'routine'], {
    required_error: 'Please choose a service.',
  }),
  propertyType: z.enum(['home', 'apartment', 'airbnb', 'hotel', 'guesthouse', 'office', 'other'], {
    required_error: 'Please choose a property type.',
  }),

  bedrooms: z.coerce.number().int().min(0).max(20),
  bathrooms: z.coerce.number().int().min(0).max(20),

  location: z.string().min(2, 'Please enter your area/location in Kumasi.'),
  preferredDate: z.string().optional(),
  timeWindow: z.enum(['morning', 'afternoon', 'evening', 'flexible']).optional(),
  frequency: z.enum(['one-time', 'weekly', 'bi-weekly', 'monthly', 'turnover-only']).optional(),

  addOnWindows: z.boolean().default(false),
  addOnLaundry: z.boolean().default(false),
  addOnFridgeOven: z.boolean().default(false),
  addOnEdgesDetails: z.boolean().default(false),

  notes: z.string().max(800).optional(),
  sendViaWhatsApp: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm WhatsApp submission.' }),
  }),
  confirmCommitment: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm the quote commitment.' }),
  }),
})

type QuoteValues = z.infer<typeof QuoteSchema>

function labelPropertyType(v: QuoteValues['propertyType']) {
  switch (v) {
    case 'home':
      return 'Home'
    case 'apartment':
      return 'Apartment'
    case 'airbnb':
      return 'Airbnb / Short-Stay'
    case 'hotel':
      return 'Hotel'
    case 'guesthouse':
      return 'Guest House'
    case 'office':
      return 'Office'
    case 'other':
      return 'Other'
  }
}

function labelTimeWindow(v?: QuoteValues['timeWindow']) {
  switch (v) {
    case 'morning':
      return 'Morning'
    case 'afternoon':
      return 'Afternoon'
    case 'evening':
      return 'Evening'
    case 'flexible':
      return 'Flexible'
    default:
      return ''
  }
}

function labelFrequency(v?: QuoteValues['frequency']) {
  switch (v) {
    case 'one-time':
      return 'One-time'
    case 'weekly':
      return 'Weekly'
    case 'bi-weekly':
      return 'Bi-weekly'
    case 'monthly':
      return 'Monthly'
    case 'turnover-only':
      return 'Turnovers only (short-stay)'
    default:
      return ''
  }
}

function buildQuoteMessage(values: QuoteValues) {
  const quote = computeQuote({
    serviceType: values.serviceType,
    propertyType: values.propertyType,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    frequency: values.frequency,
    addOnWindows: values.addOnWindows,
    addOnLaundry: values.addOnLaundry,
    addOnFridgeOven: values.addOnFridgeOven,
    addOnEdgesDetails: values.addOnEdgesDetails,
  })

  const schedule = [
    values.preferredDate ? `Preferred date: ${values.preferredDate}` : null,
    values.timeWindow ? `Time: ${labelTimeWindow(values.timeWindow)}` : null,
    values.frequency ? `Frequency: ${labelFrequency(values.frequency)}` : null,
  ].filter(Boolean)

  const lines: string[] = []
  lines.push('Hi Tidy Bunny, I’d like to book a cleaning using the quote below.')
  lines.push('')
  lines.push(`Name: ${values.fullName}`)
  lines.push(`Phone/WhatsApp: ${values.phone}`)
  lines.push('')
  lines.push('QUOTE (generated from your form)')
  lines.push(`Total: ${formatGhs(quote.total)}`)
  lines.push(`Service: ${labelServiceType(values.serviceType)}`)
  lines.push(`Recommended: ${quote.recommendedServiceLabel}`)
  lines.push(`Property: ${labelPropertyType(values.propertyType)}`)
  lines.push(`Rooms: ${values.bedrooms} bed, ${values.bathrooms} bath`)
  lines.push(`Location: ${values.location}`)
  if (schedule.length) lines.push(schedule.join(' • '))

  if (quote.lineItems.length) {
    lines.push('')
    lines.push('Breakdown:')
    quote.lineItems.forEach((x) => {
      const sign = x.amount < 0 ? '-' : ''
      lines.push(`- ${x.label}: ${sign}${formatGhs(Math.abs(x.amount))}`)
    })
  }

  if (values.notes?.trim()) {
    lines.push('')
    lines.push(`Notes: ${values.notes.trim()}`)
  }

  lines.push('')
  lines.push('TERMS (summary)')
  quote.terms.forEach((t) => lines.push(`- ${t}`))
  lines.push('')
  lines.push('I confirm this quote and would like you to schedule the service. I can attach photos after sending.')

  return lines.join('\n')
}

export function QuoteRequestForm() {
  const reduceMotion = useReducedMotion()
  const { toast } = useToast()

  const form = useForm<QuoteValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      serviceType: 'standard',
      propertyType: 'home',
      bedrooms: 2,
      bathrooms: 1,
      location: '',
      preferredDate: '',
      timeWindow: 'flexible',
      frequency: 'one-time',
      addOnWindows: false,
      addOnLaundry: false,
      addOnFridgeOven: false,
      addOnEdgesDetails: false,
      notes: '',
      sendViaWhatsApp: true,
      confirmCommitment: true,
    },
    mode: 'onBlur',
  })

  const watched = useWatch({ control: form.control })
  const messagePreview = React.useMemo(() => buildQuoteMessage(watched as QuoteValues), [watched])
  const quote = React.useMemo(
    () =>
      computeQuote({
        serviceType: (watched as QuoteValues).serviceType,
        propertyType: (watched as QuoteValues).propertyType,
        bedrooms: Number((watched as QuoteValues).bedrooms ?? 0),
        bathrooms: Number((watched as QuoteValues).bathrooms ?? 0),
        frequency: (watched as QuoteValues).frequency,
        addOnWindows: (watched as QuoteValues).addOnWindows,
        addOnLaundry: (watched as QuoteValues).addOnLaundry,
        addOnFridgeOven: (watched as QuoteValues).addOnFridgeOven,
        addOnEdgesDetails: (watched as QuoteValues).addOnEdgesDetails,
      }),
    [
      (watched as QuoteValues).serviceType,
      (watched as QuoteValues).propertyType,
      (watched as QuoteValues).bedrooms,
      (watched as QuoteValues).bathrooms,
      (watched as QuoteValues).frequency,
      (watched as QuoteValues).addOnWindows,
      (watched as QuoteValues).addOnLaundry,
      (watched as QuoteValues).addOnFridgeOven,
      (watched as QuoteValues).addOnEdgesDetails,
    ],
  )

  const canSuggestSwitch = quote.recommendedServiceType !== (watched as QuoteValues).serviceType

  const openWhatsApp = React.useCallback(
    (values: QuoteValues) => {
      const message = buildQuoteMessage(values)
      const url = buildWhatsAppUrl(WHATSAPP_NUMBER, message)
      const w = window.open(url, '_blank', 'noopener,noreferrer')
      if (!w) window.location.href = url
    },
    [],
  )

  const copyMessage = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(messagePreview)
      toast({ title: 'Copied', description: 'Your WhatsApp message is copied. Paste it into WhatsApp to send.' })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Please select the message and copy it manually.',
        variant: 'destructive',
      })
    }
  }, [messagePreview, toast])

  const onSubmit = (values: QuoteValues) => {
    toast({
      title: 'Opening WhatsApp',
      description: 'Your quote is included. Tap send to commit, then attach photos if you’d like.',
    })
    openWhatsApp(values)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        className="lg:col-span-7"
      >
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Request a Quote</CardTitle>
            <CardDescription>
              Fastest response is on WhatsApp. Fill this form once—then send your request as a WhatsApp message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ama Mensah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone/WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 059 123 4567" inputMode="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard Home Care</SelectItem>
                            <SelectItem value="deep">Deep Refresh</SelectItem>
                            <SelectItem value="move">Move In / Move Out</SelectItem>
                            <SelectItem value="turnover">Turnover Cleaning (Short-Stay)</SelectItem>
                            <SelectItem value="guest-ready">Guest-Ready Presentation</SelectItem>
                            <SelectItem value="routine">Routine Property Care</SelectItem>
                          </SelectContent>
                        </Select>
                        {canSuggestSwitch ? (
                          <div className="mt-2 rounded-xl border border-accent/30 bg-accent/10 p-3">
                            <p className="text-sm font-semibold text-primary">
                              Recommended: {quote.recommendedServiceLabel}
                            </p>
                            <p className="mt-1 text-sm text-foreground/70">{quote.recommendationReason}</p>
                            <div className="mt-3">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => form.setValue('serviceType', quote.recommendedServiceType, { shouldDirty: true })}
                              >
                                Switch to recommended
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <FormDescription>
                            Recommended: {quote.recommendedServiceLabel}. {quote.recommendationReason}
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a property" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="airbnb">Airbnb / Short-Stay</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="guesthouse">Guest House</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} max={20} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} max={20} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area / location (Kumasi)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Asokwa, Ahodwo, Adum…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred date (optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeWindow"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time window</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="one-time">One-time</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="turnover-only">Turnovers only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-2xl border border-border bg-secondary/10 p-4">
                  <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" /> Add-ons (optional)
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="addOnWindows"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <FormLabel className="font-normal">Interior windows</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addOnLaundry"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <FormLabel className="font-normal">Laundry (wash & fold)</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addOnFridgeOven"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <FormLabel className="font-normal">Fridge/oven interior</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addOnEdgesDetails"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                          </FormControl>
                          <FormLabel className="font-normal">Edges & detail work</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority areas / notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., focus on kitchen + bathrooms, strong pet hair, guest check-in at 3pm…"
                          className="min-h-[110px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-primary flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-accent" /> How it works (quick)
                  </p>
                  <ol className="mt-3 grid gap-2 text-sm text-foreground/70 sm:grid-cols-3">
                    <li className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2">1) Tell us about your space</li>
                    <li className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2">2) Get a clear quote</li>
                    <li className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2">3) Confirm schedule</li>
                    <li className="rounded-xl border border-border bg-card px-3 py-2">4) Prep (optional) + arrival</li>
                    <li className="rounded-xl border border-border bg-card px-3 py-2">5) Premium clean + finishing</li>
                    <li className="rounded-xl border border-border bg-card px-3 py-2">6) Final check + follow-up</li>
                  </ol>
                  <p className="mt-3 text-xs text-foreground/60">
                    Your quote is generated on this page. Sending the WhatsApp message confirms your request at this quote.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="sendViaWhatsApp"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="font-normal">Send via WhatsApp (required)</FormLabel>
                        <FormDescription>
                          We prefer receiving quote requests on WhatsApp for the fastest response.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmCommitment"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="font-normal">I understand the commitment</FormLabel>
                        <FormDescription>
                          By sending the WhatsApp message, I’m committing to this quote, scope, and terms. Tidy Bunny will reply to confirm date/time and access details.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" size="lg" className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send quote via WhatsApp
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="rounded-xl" onClick={copyMessage}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy message
                  </Button>
                </div>

                <div className="text-xs text-foreground/60">
                  Prefer to message immediately?{' '}
                  <a
                    className="underline underline-offset-4"
                    href={buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hi Tidy Bunny, I’d like to request a cleaning quote.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp chat
                  </a>
                  .
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] as const }}
        className="lg:col-span-5"
      >
        <Card className="rounded-2xl lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-xl">Your quote</CardTitle>
            <CardDescription>Clear pricing + terms, generated from your answers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border bg-secondary/10 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-foreground/60">Total</p>
                  <p className="mt-1 text-3xl font-bold text-primary">{formatGhs(quote.total)}</p>
                  <p className="mt-2 text-sm text-foreground/70">
                    Recommended: <span className="font-semibold text-primary">{quote.recommendedServiceLabel}</span>
                  </p>
                </div>
                <div className="shrink-0 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground/60">
                  Generated on page
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {quote.lineItems.map((x) => (
                  <div key={x.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-foreground/75">{x.label}</span>
                    <span className={x.amount < 0 ? 'text-foreground/70' : 'text-foreground/80'}>
                      {x.amount < 0 ? '-' : ''}
                      {formatGhs(Math.abs(x.amount))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <p className="text-sm font-semibold text-primary">Terms & conditions (summary)</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {quote.terms.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Label className="text-xs text-foreground/60">WhatsApp message preview</Label>
            </div>
            <div className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-secondary/10 p-4 text-sm text-foreground/80 leading-relaxed">
              {messagePreview}
            </div>

            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <p className="text-sm font-semibold text-primary">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>You send the WhatsApp message (this confirms the quote).</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>We reply to confirm the schedule, access details, and any final notes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span>We arrive and deliver a premium clean with finishing touches.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
