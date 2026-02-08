'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Section } from '@/components/section'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'

export default function QuotePage() {
  const [formData, setFormData] = useState({
    serviceType: '',
    propertyType: '',
    bedrooms: '2',
    bathrooms: '1',
    frequency: 'onetime',
    location: '',
    email: '',
    phone: '',
  })
  const [addOns, setAddOns] = useState({
    windows: false,
    laundry: false,
    fridge: false,
    oven: false,
    baseboards: false,
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddOnChange = (addon: string, checked: boolean) => {
    setAddOns((prev) => ({ ...prev, [addon]: checked }))
  }

  const calculateEstimate = () => {
    let basePrice = 0

    // Base pricing logic
    if (formData.serviceType === 'standard' || formData.serviceType === 'maintenance') {
      const bedrooms = parseInt(formData.bedrooms) || 2
      basePrice = 80 + bedrooms * 15
    } else if (formData.serviceType === 'deep') {
      const bedrooms = parseInt(formData.bedrooms) || 2
      basePrice = 150 + bedrooms * 25
    } else if (formData.serviceType === 'turnover') {
      const bedrooms = parseInt(formData.bedrooms) || 2
      basePrice = 120 + bedrooms * 20
    } else if (formData.serviceType === 'guest-ready') {
      const bedrooms = parseInt(formData.bedrooms) || 2
      basePrice = 180 + bedrooms * 30
    }

    // Frequency discounts
    if (formData.frequency === 'biweekly') {
      basePrice *= 0.9 // 10% discount
    } else if (formData.frequency === 'weekly') {
      basePrice *= 0.85 // 15% discount
    }

    // Add-ons
    let addOnsCost = 0
    if (addOns.windows) addOnsCost += 25
    if (addOns.laundry) addOnsCost += 30
    if (addOns.fridge) addOnsCost += 40
    if (addOns.oven) addOnsCost += 50
    if (addOns.baseboards) addOnsCost += 35

    return { basePrice: Math.round(basePrice), addOns: addOnsCost, total: Math.round(basePrice + addOnsCost) }
  }

  const estimate = calculateEstimate()

  const handleSubmit = () => {
    if (!formData.serviceType || !formData.propertyType || !formData.location || !formData.phone) {
      toast({
        title: 'Missing information',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Quote Request Submitted!',
      description: 'We will contact you within 24 hours to confirm. Check your WhatsApp!',
    })

    setFormData({
      serviceType: '',
      propertyType: '',
      bedrooms: '2',
      bathrooms: '1',
      frequency: 'onetime',
      location: '',
      email: '',
      phone: '',
    })
    setAddOns({
      windows: false,
      laundry: false,
      fridge: false,
      oven: false,
      baseboards: false,
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Section>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-primary mb-4 text-center">Get Your Instant Quote</h1>
          <p className="text-center text-foreground/70 mb-12">
            Answer a few quick questions and we'll give you an estimated price. No surprises, no fine print.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card p-8 md:p-12"
          >
            <form className="space-y-6">
              {/* Service Type */}
              <div>
                <Label htmlFor="service" className="text-base font-semibold">
                  What service do you need? *
                </Label>
                <Select value={formData.serviceType} onValueChange={(v) => handleChange('serviceType', v)}>
                  <SelectTrigger id="service" className="mt-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Standard Home Care (Weekly/Bi-weekly)</SelectItem>
                    <SelectItem value="deep">Deep Refresh / One-Time</SelectItem>
                    <SelectItem value="turnover">Turnover Cleaning (Short-Stay)</SelectItem>
                    <SelectItem value="guest-ready">Guest-Ready Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div>
                <Label htmlFor="property" className="text-base font-semibold">
                  Property type? *
                </Label>
                <Select value={formData.propertyType} onValueChange={(v) => handleChange('propertyType', v)}>
                  <SelectTrigger id="property" className="mt-2">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="hotel">Hotel / Guest House</SelectItem>
                    <SelectItem value="airbnb">Airbnb / Short-Stay Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="beds" className="text-base font-semibold">
                    Bedrooms *
                  </Label>
                  <Input
                    id="beds"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="baths" className="text-base font-semibold">
                    Bathrooms *
                  </Label>
                  <Input
                    id="baths"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <Label htmlFor="frequency" className="text-base font-semibold">
                  How often? *
                </Label>
                <Select value={formData.frequency} onValueChange={(v) => handleChange('frequency', v)}>
                  <SelectTrigger id="frequency" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onetime">One-Time</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly (10% discount)</SelectItem>
                    <SelectItem value="weekly">Weekly (15% discount)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Add-Ons */}
              <div className="border-t pt-6">
                <p className="font-semibold text-base mb-4">Any add-ons?</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={addOns.windows}
                      onCheckedChange={(checked) => handleAddOnChange('windows', !!checked)}
                    />
                    <span>Interior Windows (+ GHS 25)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={addOns.laundry}
                      onCheckedChange={(checked) => handleAddOnChange('laundry', !!checked)}
                    />
                    <span>Laundry Wash & Fold (+ GHS 30)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={addOns.fridge}
                      onCheckedChange={(checked) => handleAddOnChange('fridge', !!checked)}
                    />
                    <span>Fridge Interior (+ GHS 40)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={addOns.oven}
                      onCheckedChange={(checked) => handleAddOnChange('oven', !!checked)}
                    />
                    <span>Oven Interior (+ GHS 50)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={addOns.baseboards}
                      onCheckedChange={(checked) => handleAddOnChange('baseboards', !!checked)}
                    />
                    <span>Baseboards & Trim (+ GHS 35)</span>
                  </label>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6 space-y-4">
                <div>
                  <Label htmlFor="location" className="text-base font-semibold">
                    Your area in Kumasi? *
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Osu, Asokwa, Kumasi"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">
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
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email (optional)
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
              </div>

              {/* Estimate Display */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="text-sm text-foreground/70 mb-2">Estimated Total</div>
                <div className="text-4xl font-bold text-accent">GHS {estimate.total}</div>
                <div className="text-xs text-foreground/60 mt-2">
                  {formData.frequency !== 'onetime' && ` (${estimate.basePrice} + ${estimate.addOns} add-ons)`}
                </div>
              </div>

              <Button onClick={handleSubmit} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-8">
                Submit Quote Request
              </Button>
            </form>

            <p className="text-center text-xs text-foreground/60 mt-6">
              We'll contact you via WhatsApp within 24 hours to confirm this estimate and book your service.
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
