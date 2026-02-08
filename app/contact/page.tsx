'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: 'Missing information',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Message Received!',
      description: 'We will get back to you within 24 hours.',
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <Hero
        headline="Get in Touch"
        subheading="Have questions? Want to schedule a cleaning? We're here to help. Reach out via phone, WhatsApp, or the form below."
      />

      {/* CONTACT INFO CARDS */}
      <Section className="bg-secondary/20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          <motion.a
            {...fadeInUp}
            href="tel:+233595236285"
            className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Call Us</h3>
            <p className="text-sm text-foreground/70">059 523 6285</p>
            <p className="text-xs text-foreground/50 mt-2">Mon–Sat, 9am–6pm</p>
          </motion.a>

          <motion.a
            {...fadeInUp}
            href="https://wa.me/233595236285"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-primary mb-2">WhatsApp</h3>
            <p className="text-sm text-foreground/70">Chat instantly</p>
            <p className="text-xs text-foreground/50 mt-2">Fast replies guaranteed</p>
          </motion.a>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Address</h3>
            <p className="text-sm text-foreground/70">Estes Park Street</p>
            <p className="text-xs text-foreground/50 mt-2">Kumasi</p>
          </motion.div>

          <motion.div {...fadeInUp} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Hours</h3>
            <p className="text-sm text-foreground/70">Mon–Sat</p>
            <p className="text-xs text-foreground/50 mt-2">By appointment</p>
          </motion.div>
        </div>
      </Section>

      {/* CONTACT FORM & TEXT */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div {...fadeInUp} className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-semibold">
                  Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-semibold">
                  Phone/WhatsApp *
                </Label>
                <Input
                  id="phone"
                  placeholder="059 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-semibold">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what you need..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="mt-2 min-h-32"
                />
              </div>

              <Button onClick={handleSubmit} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Send Message
              </Button>
            </div>
          </motion.div>

          {/* Info Text */}
          <motion.div {...fadeInUp} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Quick Response</h3>
              <p className="text-foreground/70 leading-relaxed">
                We check messages constantly and aim to respond within 24 hours. For urgent matters, WhatsApp is the fastest way to reach us.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Service Area</h3>
              <p className="text-foreground/70 leading-relaxed">
                We currently serve Kumasi and nearby areas. Contact us to confirm your location and discuss special arrangements if needed.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">What to Include</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• Your location in Kumasi</li>
                <li>• Type of property (home, apartment, hotel, etc.)</li>
                <li>• Preferred service and frequency</li>
                <li>• Any special requests or questions</li>
              </ul>
            </div>

            <Link href="/quote">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Quick Quote Instead?
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary/20">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Common Questions</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'Do you service my area?',
              a: 'We serve Kumasi and nearby areas. WhatsApp your location and we\'ll confirm coverage.',
            },
            {
              q: 'How far in advance should I book?',
              a: 'For recurring service, one week advance notice. One-time deep cleans, ideally 2-3 days. Urgent requests—ask us!',
            },
            {
              q: 'What if I\'m not satisfied?',
              a: 'Your satisfaction is guaranteed. If anything isn\'t perfect, we\'ll make it right at no extra charge.',
            },
            {
              q: 'Can you work around my schedule?',
              a: 'Absolutely. We offer flexible scheduling. Early mornings, evenings, weekends—let us know what works.',
            },
          ].map((faq, idx) => (
            <motion.details
              key={idx}
              {...fadeInUp}
              className="rounded-xl border border-border bg-card p-6 cursor-pointer group"
            >
              <summary className="font-semibold text-primary flex items-center justify-between">
                {faq.q}
                <span className="transform group-open:rotate-180 transition-transform text-accent">▼</span>
              </summary>
              <p className="text-foreground/70 mt-4">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-lg opacity-90 mb-8">
          Reach out now. We're excited to help with your cleaning needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => window.open('https://wa.me/233595236285', '_blank')}
          >
            Message on WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            asChild
          >
            <a href="tel:+233595236285">Call Us Now</a>
          </Button>
        </div>
      </Section>
    </div>
  )
}
