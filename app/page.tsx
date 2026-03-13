import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { MethodologySection } from '@/components/sections/methodology-section'
import { SectorsSection } from '@/components/sections/sectors-section'
import { AssessmentCTA } from '@/components/sections/assessment-cta'
import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <SectorsSection />
      <AssessmentCTA />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
