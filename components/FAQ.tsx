'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Does this copy the original video?',
      answer: 'No. We analyze structure (hook, beats, pacing) and generate a recipe you can adapt with your own content.'
    },
    {
      question: 'Which links are supported?',
      answer: 'TikTok, Instagram Reels, and YouTube Shorts (more soon).'
    },
    {
      question: 'Can it match my niche / tone?',
      answer: 'Yes, tell us your niche and style, and we tailor the recipe to your channel goals.'
    },
    {
      question: 'Do I get a script too?',
      answer: 'You\'ll get hook options + beat-by-beat talking points. Full scripts are optional (coming soon).'
    },
    {
      question: 'Will it generate the full video?',
      answer: 'Recipe first. Video drafts are in progress, early users get priority access.'
    },
    {
      question: 'How fast is it?',
      answer: 'A sample breakdown takes seconds. Full tailored recipes may take a bit longer depending on demand.'
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
