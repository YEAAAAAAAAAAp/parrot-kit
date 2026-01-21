'use client'

import { useState } from 'react'

export default function OutputPreview() {
  const outputs = [
    { title: 'Hook formula', time: '0-2s', description: 'Pattern interrupt + promise' },
    { title: 'Beat map', time: '15-30s', description: 'What happens, when, and why' },
    { title: 'Shot list', time: null, description: 'Framing, actions, props, B-roll cues' },
    { title: 'Caption + on-screen text', time: null, description: 'Style, rhythm, keywords' },
    { title: 'Edit cues', time: null, description: 'Cuts, pacing, sound beats, transitions' },
    { title: 'CTA', time: null, description: 'Comment prompt / follow / link strategy' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Steal viral formats. <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Make them yours.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deconstruct any winning video into a recipe you can customize and own
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            Edit with our chatbot, shoot shot-by-shot in-app, and build your signature style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outputs.map((output, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg group-hover:text-purple-600 transition">{output.title}</h3>
                {output.time && (
                  <span className="text-xs bg-purple-100 text-purple-600 px-2.5 py-1 rounded-full font-medium">{output.time}</span>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{output.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
