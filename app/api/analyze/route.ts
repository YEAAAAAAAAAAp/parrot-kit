import { NextResponse } from 'next/server'

/**
 * Stub API for analyzing video links
 * Returns deterministic "teaser" data based on URL hash
 */

// Simple hash function for deterministic results
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

const hookTypes = [
  'Pattern interrupt',
  'Bold statement',
  'Question hook',
  'Story opener',
  'Before/After tease'
]

const pacingStyles = [
  'Fast-cut (0.5-1s per shot)',
  'Medium pace (1-2s per shot)',
  'Slow burn (2-3s per shot)',
  'Dynamic (mixed timing)'
]

const subtitleStyles = [
  'Bold center, keyword highlight',
  'Bottom third, minimal',
  'Animated word-by-word',
  'None (visual only)'
]

const ctaBeats = [
  'Comment for template',
  'Save for later',
  'Follow for more',
  'Link in bio',
  'DM for details'
]

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    // Basic URL validation
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      )
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate deterministic teaser based on URL
    const hash = hashString(url)
    const cutCount = 8 + (hash % 15) // 8-22 cuts
    
    const teaser = {
      hookType: hookTypes[hash % hookTypes.length],
      pacing: pacingStyles[hash % pacingStyles.length],
      cutCount: cutCount,
      subtitleStyle: subtitleStyles[hash % subtitleStyles.length],
      ctaBeat: ctaBeats[hash % ctaBeats.length],
      duration: '15-30s',
      url: url
    }

    return NextResponse.json({ teaser })
  } catch (error) {
    console.error('Analyze API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze' },
      { status: 500 }
    )
  }
}
