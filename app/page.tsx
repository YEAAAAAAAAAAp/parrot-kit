'use client'

import { useState, useEffect } from 'react'
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
import { trackPageView } from '@/lib/analytics'

export default function Home() {
  useEffect(() => {
    // Track page view with our analytics
    trackPageView()
    
    // Also track with GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Parrot Kit - Home',
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }

    // Track section visibility with Intersection Observer
    const sections = document.querySelectorAll('section')
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (window as any).gtag) {
          const sectionId = entry.target.id || 'unknown'
          ;(window as any).gtag('event', 'section_view', {
            event_category: 'engagement',
            event_label: `Section: ${sectionId}`,
            section_name: sectionId
          })
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercentage > maxScroll && scrollPercentage % 25 === 0) {
        maxScroll = scrollPercentage
        if ((window as any).gtag) {
          ;(window as any).gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: `${scrollPercentage}%`,
            value: scrollPercentage
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
