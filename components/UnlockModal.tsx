'use client'

import { useState, useEffect } from 'react'
import { landingConfig } from '@/lib/landingConfig'

interface UnlockModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UnlockModal({ isOpen, onClose }: UnlockModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [waitlistRank, setWaitlistRank] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Check if user already has a rank
      const stored = localStorage.getItem('waitlist_rank')
      if (stored) {
        setWaitlistRank(parseInt(stored))
      }
    }
  }, [isOpen])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    // GA4 Event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'waitlist_submit', {
        event_category: 'conversion',
        event_label: 'Unlock Modal Waitlist'
      })
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name: '', 
          role: 'ASPIRING' 
        })
      })

      if (response.ok) {
        // Generate and store waitlist rank
        const rank = landingConfig.waitlistCount + Math.floor(Math.random() * 100)
        localStorage.setItem('waitlist_rank', rank.toString())
        setWaitlistRank(rank)
        setSubmitted(true)

        // GA4 Success Event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'signup_success', {
            event_category: 'conversion',
            event_label: 'Waitlist Signup Success'
          })
        }
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFoundingDropClick = () => {
    // GA4 Event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'founding_drop_click', {
        event_category: 'conversion',
        event_label: 'Founding Concierge Drop'
      })
    }

    const subject = encodeURIComponent(landingConfig.foundingDropContactSubject)
    const body = encodeURIComponent(`Hi, I'm interested in the Founding Concierge Drop (${landingConfig.foundingDropRecipeCount} recipes in ${landingConfig.foundingDropDeliveryHours}h for $${landingConfig.foundingDropOneTimePrice}).

Please let me know the next steps!`)
    
    window.location.href = `mailto:${landingConfig.supportEmail}?subject=${subject}&body=${body}`
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Unlock Full Recipe</h2>
              <p className="text-gray-600">Choose your path to access</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">You&apos;re in!</h3>
              <p className="text-gray-600 mb-4 text-lg">
                Check your email for your full recipe access link.
              </p>
              {waitlistRank && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 inline-block">
                  <p className="text-sm text-purple-600 font-medium">
                    Waitlist position: <span className="text-2xl font-bold">#{waitlistRank}</span>
                  </p>
                </div>
              )}
              <button
                onClick={onClose}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold shadow-lg hover:shadow-xl transition"
              >
                Got it!
              </button>
            </div>
          ) : (
            <>
              {/* Option 1: Waitlist */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 mb-4 hover:border-purple-300 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2">Join Waitlist</h3>
                    <p className="text-sm text-gray-600">
                      Get full recipe access + early Pro features
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    FREE
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-700">
                    <strong>⏰ Next batch:</strong> {landingConfig.nextBatchDate} • {landingConfig.nextBatchInvites} invites
                  </p>
                </div>

                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 text-white py-3.5 rounded-lg hover:bg-purple-700 active:scale-98 transition font-bold disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist & Unlock'}
                  </button>
                </form>
              </div>

              {/* Option 2: Founding Drop */}
              <div className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-xl">Founding Concierge Drop</h3>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LIMITED
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      Skip the wait — Human-crafted in {landingConfig.foundingDropDeliveryHours}h
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700"><strong>{landingConfig.foundingDropRecipeCount} custom recipes</strong> for your niche</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700"><strong>{landingConfig.foundingDropDeliveryHours}h delivery</strong> guarantee</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Full shot-by-shot + b-roll notes</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">🔥 Only <strong>{landingConfig.foundingDropSpotsLeft}/{landingConfig.foundingDropTotalSpots} spots</strong> left</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-5 bg-white rounded-lg p-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">${landingConfig.foundingDropOneTimePrice}</div>
                    <div className="text-sm text-gray-600">one-time payment</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Save 70%</div>
                    <div className="text-sm text-gray-400 line-through">$129</div>
                  </div>
                </div>

                <button
                  onClick={handleFoundingDropClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 active:scale-98 transition font-bold text-lg shadow-xl hover:shadow-2xl"
                >
                  Get Founding Drop
                </button>

                <p className="text-xs text-gray-600 mt-3 text-center">
                  ✉️ Opens email to {landingConfig.supportEmail}
                </p>
              </div>

              {/* Safety note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  ⚖️ <strong>Legal note:</strong> We analyze structure and pacing — not the original content. You create your own version.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
