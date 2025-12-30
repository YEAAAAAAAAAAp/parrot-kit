'use client'

import { useState } from 'react'

export default function Hero() {
  const [link, setLink] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (link.trim()) {
      setIsAnalyzing(true)
      setTimeout(() => {
        alert('Thanks for your interest! Join our waitlist to get early access.')
        setIsAnalyzing(false)
        setLink('')
      }, 2000)
    }
  }

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                Join 10K+ creators
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Paste a link.{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Get the structure.
              </span>{' '}
              Ship your version—fast.
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Drop a TikTok / Reels / Shorts link. Our AI deconstructs it into a{' '}
              <strong className="text-gray-900">repeatable shooting + editing recipe</strong>
              —hooks, beats, shots, captions, pacing, and CTA.
            </p>

            {/* Input Box */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Paste a TikTok / Reels / Shorts link…"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Get a sample recipe instantly. Join the waitlist for full access.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition font-semibold text-lg">
                Get early access
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 transition font-semibold text-lg">
                Watch demo
              </button>
            </div>

            <p className="text-sm text-gray-500">
              1,000 creators are already on the waitlist. Invites roll out in batches.
            </p>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Mock Recipe Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Recipe Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">HOOK (0-2s)</div>
                      <div className="text-sm">&quot;Stop doing X. Do this instead.&quot;</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">BEAT 1 (2-6s)</div>
                      <div className="text-sm">Show the problem in one shot</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">BEAT 2 (6-14s)</div>
                      <div className="text-sm">Demo the fix with 3 quick cuts</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">BEAT 3 (14-22s)</div>
                      <div className="text-sm">Proof / result</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">CTA (22-30s)</div>
                      <div className="text-sm">&quot;Comment &apos;TEMPLATE&apos; and I&apos;ll send it.&quot;</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Ready to shoot in 30 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
