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

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
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
            Join the waitlist to get early access and a sample recipe. We&apos;re onboarding in batches—secure your spot now.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">You&apos;re in!</h3>
            <p className="text-white/90">We&apos;ll email your invite soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
            />
            
            <input
              type="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
            />
            
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white transition"
            >
              <option value="" disabled>I&apos;m a...</option>
              {roleOptions.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <button 
              type="submit"
              className="w-full bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-bold text-lg"
            >
              Get early access
            </button>

            <p className="text-sm text-white/70">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
