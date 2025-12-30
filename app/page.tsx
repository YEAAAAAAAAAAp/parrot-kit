'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import OutputPreview from '@/components/OutputPreview'
import UseCases from '@/components/UseCases'
import WhyUs from '@/components/WhyUs'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <OutputPreview />
      <UseCases />
      <WhyUs />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
