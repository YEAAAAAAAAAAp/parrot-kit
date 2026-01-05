import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const eventData = await req.json()

    await sql`
      INSERT INTO analytics_events (
        event_name, event_category, event_label,
        user_id, session_id, page_path, referrer,
        device_type, browser, metadata
      ) VALUES (
        ${eventData.event_name},
        ${eventData.event_category},
        ${eventData.event_label},
        ${eventData.user_id},
        ${eventData.session_id},
        ${eventData.page_path},
        ${eventData.referrer},
        ${eventData.device_type},
        ${eventData.browser},
        ${JSON.stringify(eventData.metadata || {})}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics track error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}
