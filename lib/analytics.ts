'use client'

// Generate or retrieve session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

// Generate or retrieve user ID
export function getUserId(): string {
  if (typeof window === 'undefined') return ''
  
  let userId = localStorage.getItem('user_id')
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('user_id', userId)
  }
  return userId
}

// Get device type
export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Get browser name
export function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'
  return 'Other'
}

interface TrackEventParams {
  eventName: string
  eventCategory?: string
  eventLabel?: string
  metadata?: Record<string, any>
}

// Track custom event
export async function trackEvent({
  eventName,
  eventCategory = 'engagement',
  eventLabel,
  metadata = {}
}: TrackEventParams) {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()
  const userId = getUserId()
  const deviceType = getDeviceType()
  const browser = getBrowser()

  const eventData = {
    event_name: eventName,
    event_category: eventCategory,
    event_label: eventLabel,
    user_id: userId,
    session_id: sessionId,
    page_path: window.location.pathname,
    referrer: document.referrer || 'direct',
    device_type: deviceType,
    browser: browser,
    metadata
  }

  // Send to our analytics API
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }

  // Also send to GA4 if available
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      ...metadata
    })
  }
}

// Track page view
export async function trackPageView() {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()
  const userId = getUserId()
  const deviceType = getDeviceType()

  try {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_path: window.location.pathname,
        session_id: sessionId,
        user_id: userId,
        referrer: document.referrer || 'direct',
        device_type: deviceType
      })
    })
  } catch (error) {
    console.error('Page view tracking error:', error)
  }
}

// Track conversion funnel step
export async function trackFunnelStep(step: string, stepOrder: number, completed: boolean = false) {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()

  try {
    await fetch('/api/analytics/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        step,
        step_order: stepOrder,
        completed
      })
    })
  } catch (error) {
    console.error('Funnel tracking error:', error)
  }
}

// Common event trackers
export const analytics = {
  // CTA clicks
  trackCTAClick: (location: string, ctaText: string) => 
    trackEvent({
      eventName: 'cta_click',
      eventCategory: 'conversion',
      eventLabel: location,
      metadata: { cta_text: ctaText }
    }),

  // Button clicks
  trackButtonClick: (buttonName: string, location: string) =>
    trackEvent({
      eventName: 'button_click',
      eventCategory: 'engagement',
      eventLabel: location,
      metadata: { button_name: buttonName }
    }),

  // Section views
  trackSectionView: (sectionName: string) =>
    trackEvent({
      eventName: 'section_view',
      eventCategory: 'engagement',
      eventLabel: sectionName
    }),

  // Video interactions
  trackVideoPlay: (videoTitle: string) =>
    trackEvent({
      eventName: 'video_play',
      eventCategory: 'engagement',
      eventLabel: videoTitle
    }),

  // Form interactions
  trackFormStart: (formName: string) =>
    trackEvent({
      eventName: 'form_start',
      eventCategory: 'conversion',
      eventLabel: formName
    }),

  trackFormSubmit: (formName: string, success: boolean) =>
    trackEvent({
      eventName: 'form_submit',
      eventCategory: 'conversion',
      eventLabel: formName,
      metadata: { success }
    }),

  // Pricing interactions
  trackPricingView: (planName: string) =>
    trackEvent({
      eventName: 'pricing_view',
      eventCategory: 'conversion',
      eventLabel: planName
    }),

  trackPricingClick: (planName: string, price: number) =>
    trackEvent({
      eventName: 'pricing_click',
      eventCategory: 'conversion',
      eventLabel: planName,
      metadata: { price }
    }),

  // Link clicks
  trackLinkClick: (linkText: string, destination: string) =>
    trackEvent({
      eventName: 'link_click',
      eventCategory: 'engagement',
      eventLabel: linkText,
      metadata: { destination }
    }),

  // Social proof
  trackSocialProofView: () =>
    trackEvent({
      eventName: 'social_proof_view',
      eventCategory: 'engagement'
    }),

  // FAQ interactions
  trackFAQClick: (question: string) =>
    trackEvent({
      eventName: 'faq_click',
      eventCategory: 'engagement',
      eventLabel: question
    })
}
