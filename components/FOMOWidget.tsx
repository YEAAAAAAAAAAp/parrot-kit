'use client'

import { useEffect, useState } from 'react'
import { landingConfig } from '@/lib/landingConfig'

export default function FOMOWidget() {
  const [waitlistRank, setWaitlistRank] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const stored = localStorage.getItem('waitlist_rank')
    if (stored) {
      setWaitlistRank(parseInt(stored))
    }
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const deadline = landingConfig.nextBatchDeadline.getTime()
      const difference = deadline - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center mb-8">
      {landingConfig.showNextBatch && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition">
          <span className="flex items-center gap-2">
            ⏰ CLOSING SOON:
            <span className="inline-flex items-center gap-1 font-mono text-base">
              <span className="inline-flex items-baseline gap-0.5">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] font-normal">d</span>
              </span>
              <span>:</span>
              <span className="inline-flex items-baseline gap-0.5">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] font-normal">h</span>
              </span>
              <span>:</span>
              <span className="inline-flex items-baseline gap-0.5">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] font-normal">m</span>
              </span>
              <span>:</span>
              <span className="inline-flex items-baseline gap-0.5">
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] font-normal">s</span>
              </span>
            </span>
            • Only {landingConfig.nextBatchInvites} spots
          </span>
        </div>
      )}
      
      {landingConfig.showFoundingDropSpots && (
        <div className="bg-gradient-to-r from-pink-50 to-red-50 border-2 border-red-300 text-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition">
          <span className="flex items-center gap-1.5">
            🔥 ALMOST GONE: Only {landingConfig.foundingDropSpotsLeft}/{landingConfig.foundingDropTotalSpots} left!
          </span>
        </div>
      )}
      
      {landingConfig.showWaitlistRank && waitlistRank && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition">
          <span className="flex items-center gap-1.5">
            ✅ You're #<span className="text-lg">{waitlistRank}</span> in line - Early access secured!
          </span>
        </div>
      )}
    </div>
  )
}
