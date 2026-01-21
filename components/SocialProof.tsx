'use client'

export default function SocialProof() {
  const handleJoinClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'cta_click', {
        event_category: 'conversion',
        event_label: 'Social Proof Join Creators'
      })
    }
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInterviewClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'contact_click', {
        event_category: 'engagement',
        event_label: 'Talk to Us Email'
      })
    }
    window.location.href = 'mailto:ParrotKit@gmail.com?subject=I want to talk about ParrotKit'
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Built for <span className="text-purple-600">aspiring UGC creators</span> and{' '}
              <span className="text-purple-600">lean teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              who want consistent output without trial-and-error.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button 
              onClick={handleJoinClick}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition font-semibold"
            >
              Join us with 10K+ UGC Creators
            </button>
            <button 
              onClick={handleInterviewClick}
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition font-semibold"
            >
              Talk to us
            </button>
          </div>

          <p className="text-gray-500">
            Want a faster invite?{' '}
            <span className="font-semibold text-purple-600">Book a Free demo</span>
          </p>
        </div>
      </div>
    </section>
  )
}
