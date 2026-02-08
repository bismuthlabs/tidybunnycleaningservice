'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface QuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    serviceType: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    preferredDate: '',
  })
  const { toast } = useToast()

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (formData.serviceType && formData.propertyType && formData.bedrooms && formData.bathrooms && formData.location) {
      toast({
        title: 'Quote Request Submitted!',
        description: 'We will contact you within 24 hours with a personalized quote.',
      })
      onOpenChange(false)
      setFormData({
        serviceType: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        location: '',
        preferredDate: '',
      })
    } else {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request a Premium Quote</DialogTitle>
          <DialogDescription>Fill out the form below and we'll contact you within 24 hours.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="service">Service Type *</Label>
            <Select value={formData.serviceType} onValueChange={(v) => handleFormChange('serviceType', v)}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Home Care</SelectItem>
                <SelectItem value="deep">Deep Refresh</SelectItem>
                <SelectItem value="premium">Premium Touch-Ups</SelectItem>
                <SelectItem value="turnover">Turnover Cleaning</SelectItem>
                <SelectItem value="guest">Guest-Ready Presentation</SelectItem>
                <SelectItem value="routine">Routine Property Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="property">Property Type *</Label>
            <Select value={formData.propertyType} onValueChange={(v) => handleFormChange('propertyType', v)}>
              <SelectTrigger id="property">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="guesthouse">Guest House</SelectItem>
                <SelectItem value="airbnb">Airbnb</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms *</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="e.g., 3"
                value={formData.bedrooms}
                onChange={(e) => handleFormChange('bedrooms', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms *</Label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="e.g., 2"
                value={formData.bathrooms}
                onChange={(e) => handleFormChange('bathrooms', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Your area in Kumasi"
              value={formData.location}
              onChange={(e) => handleFormChange('location', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleFormChange('preferredDate', e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Submit Quote Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
