/**
 * Landing page configuration - single source of truth for all numbers, dates, and copy
 */

export const landingConfig = {
  // Next batch info
  nextBatchDate: 'Jan 15, 2026',
  nextBatchInvites: 500,
  nextBatchDeadline: new Date('2026-01-08T23:59:59'), // 7일 후

  // Founding Concierge Drop
  foundingDropTotalSpots: 100,
  foundingDropSpotsLeft: 77, // Update this manually as spots are taken
  foundingDropOneTimePrice: 39,
  foundingDropDeliveryHours: 48,
  foundingDropRecipeCount: 3,

  // Early-bird pricing
  earlyBirdDeadline: 'Jan 10, 2026',
  earlyBirdProPrice: 20,
  laterProPrice: 29,
  earlyBirdTeamPrice: 35,
  laterTeamPrice: 49,

  // Current pricing (for existing users)
  proMonthlyPrice: 20,
  teamMonthlyPrice: 35,

  // Social proof
  waitlistCount: 10000,
  creatorsJoined: '10K+',

  // FOMO messages
  showWaitlistRank: true,
  showFoundingDropSpots: true,
  showNextBatch: true,

  // Contact/support
  supportEmail: 'hello@parrotkit.com',
  foundingDropContactSubject: 'Founding Concierge Drop - Interest',
} as const

export type LandingConfig = typeof landingConfig
