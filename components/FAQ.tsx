'use client'

import { useState } from 'react'
import { analytics } from '@/lib/analytics'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Is this specifically for UGC Creators?',
      answer: 'Yes, but we go beyond typical sponsored UGC work. ParrotKit helps UGC creators build their own brand and identity by stealing viral formats and making them uniquely yours. Turn winning structures into your signature style—not just brand collabs, but content that grows YOUR audience.'
    },
    {
      question: 'Can I edit the recipe with the chatbot?',
      answer: 'Absolutely. Our real-time chatbot lets you tweak angles, scripts, and shot details instantly. Just chat with it to customize your recipe until it\'s perfect for your style.'
    },
    {
      question: 'Can I shoot directly in the app?',
      answer: 'Yes! Once your recipe is ready, you can shoot shot-by-shot directly in the app using your phone camera. No need to switch between apps—everything flows seamlessly from recipe to recording.'
    },
    {
      question: 'What are Angle, Script, and Resolution features?',
      answer: 'Angle: Real-time camera angle adjustments from your phone. Script: Hyper-personalized scripts beyond generic AI outputs. Resolution: Consistent quality with color grading and filters built in. These are our core differentiators.'
    },
    {
      question: 'Does this copy the original video?',
      answer: 'No. We analyze structure (hook, beats, pacing, Angle, Script, Resolution) and generate a recipe you can adapt with your own unique content and brand voice.'
    },
    {
      question: 'Which platforms are supported?',
      answer: 'TikTok, Instagram Reels, and YouTube Shorts. More platforms coming soon based on UGC creator demand.'
    },
    {
      question: 'How fast will I get my recipe?',
      answer: 'Instant analysis in seconds. You can then refine it with our chatbot in real-time and start shooting immediately in-app.'
    },
    {
      question: 'Can it match my niche and brand tone?',
      answer: 'Yes! Tell us your niche, audience, and tone preferences. Our AI tailors every recipe—from hooks to CTAs—to match your UGC creator style and goals.'
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">FAQ</h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => {
                  // Track FAQ click with our analytics
                  analytics.trackFAQClick(faq.question)
                  
                  // Also track with GA4
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    ;(window as any).gtag('event', 'faq_interaction', {
                      event_category: 'engagement',
                      event_label: faq.question,
                      faq_question: faq.question
                    })
                  }
                  setOpenIndex(openIndex === index ? null : index)
                }}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold pr-8">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
