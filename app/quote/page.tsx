import { QuoteRequestForm } from '@/components/quote/quote-request-form'
import { Sparkles } from 'lucide-react'

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Quote requests are handled on WhatsApp
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Get a clear quote—fast
            </h1>
            <p className="mt-4 text-base sm:text-lg text-foreground/70">
              Your quote (price, breakdown, and terms) is generated on this page. When you tap send in WhatsApp, it confirms your request at this quote—then you can attach photos and any extra details.
            </p>
          </div>

          <div className="mt-10">
            <QuoteRequestForm />
          </div>
        </div>
      </section>
    </div>
  )
}
