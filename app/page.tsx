import { ParallaxHero } from '@/components/parallax-hero'
import { ContactStrip } from '@/components/home/contact-strip'
import { HowItWorks } from '@/components/home/how-it-works'
import { ServicesAirbnbSection } from '@/components/home/services-airbnb-section'

export default function Home() {
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

      <HowItWorks />

      <ContactStrip />
    </div>
  )
}
