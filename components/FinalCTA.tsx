'use client'

import { useState } from 'react'

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to your backend/email service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', role: '' })
    }, 3000)
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
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white transition"
            >
              <option value="" disabled>I&apos;m a...</option>
              <option value="aspiring">Aspiring creator</option>
              <option value="prospective">Prospective creator</option>
              <option value="brand">Brand</option>
              <option value="marketer">Marketer</option>
              <option value="agency">Agency</option>
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
