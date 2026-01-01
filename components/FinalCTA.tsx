'use client'

import { useState } from 'react'
import { UserRole } from '@/lib/role'

export default function FinalCTA() {

  type WaitlistForm = {
    name: string
    email: string
    role: UserRole | ''
  }

  const [formData, setFormData] = useState<WaitlistForm>({
    name: '',
    email: '',
    role: ''
  })

  const [submitted, setSubmitted] = useState(false)


  const roleOptions = [
    { label: 'Aspiring creator', value: UserRole.ASPIRING },
    { label: 'Prospective creator', value: UserRole.PROSPECTIVE },
    { label: 'Brand', value: UserRole.BRAND },
    { label: 'Marketer', value: UserRole.MARKETER },
    { label: 'Agency', value: UserRole.AGENCY }
  ]

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // GA4 Event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: 'Waitlist Signup',
        user_role: formData.role
      })
    }

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      // GA4 Success Event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'signup_success', {
          event_category: 'conversion',
          event_label: 'Waitlist Signup Success'
        })
      }
      
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', role: '' })
      }, 3000)
    } else {
      alert('Something went wrong. Please try again.')
    }
  }


  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="space-y-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Your next Short starts with one link.
          </h2>
          <p className="text-xl text-white/90">
            Join the waitlist to get early access and a sample recipe. We&apos;re onboarding in batches, secure your spot now.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-3">You&apos;re on the list!</h3>
            <p className="text-xl text-white/90">Check your email for next steps.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-10 space-y-5 border-2 border-white/20 shadow-2xl">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/30 transition text-lg"
            />
            
            <input
              type="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/30 transition text-lg"
            />
            
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white focus:bg-white/30 transition text-lg"
            >
              <option value="" disabled>I&apos;m a...</option>
              {roleOptions.map(r => (
                <option key={r.value} value={r.value} className="bg-purple-600 text-white">
                  {r.label}
                </option>
              ))}
            </select>

            <button 
              type="submit"
              className="w-full bg-white text-purple-600 px-8 py-5 rounded-xl hover:bg-gray-50 active:scale-98 transition-all font-bold text-lg shadow-xl hover:shadow-2xl"
            >
              Get early access
            </button>

            <p className="text-sm text-white/70 pt-2">
              🔒 No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
