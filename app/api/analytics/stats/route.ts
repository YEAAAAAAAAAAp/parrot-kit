import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        summary: {
          totalEvents: 0,
          totalPageViews: 0,
          uniqueUsers: 0,
          uniqueSessions: 0,
          ctr: 0,
          cvr: 0
        },
        topEvents: [],
        eventsByDay: [],
        deviceBreakdown: [],
        browserBreakdown: [],
        funnelData: [],
        recentEvents: [],
        topPages: [],
        referrerSources: [],
        needsSetup: true,
        message: 'Database not configured. Please set DATABASE_URL in .env.local and run: npm run setup:analytics'
      })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '7')

    // Calculate date threshold
    const dateThreshold = new Date()
    dateThreshold.setDate(dateThreshold.getDate() - days)

    // Get total events (with fallback for empty tables)
    const totalEventsResult = await sql`
      SELECT COUNT(*) as count 
      FROM analytics_events 
      WHERE created_at > ${dateThreshold.toISOString()}
    `
    const totalEvents = totalEventsResult[0] || { count: 0 }

    // Get total page views
    const totalPageViewsResult = await sql`
      SELECT COUNT(*) as count 
      FROM page_views 
      WHERE created_at > ${dateThreshold.toISOString()}
    `
    const totalPageViews = totalPageViewsResult[0] || { count: 0 }

    // Get unique users
    const uniqueUsersResult = await sql`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM analytics_events 
      WHERE created_at > ${dateThreshold.toISOString()}
    `
    const uniqueUsers = uniqueUsersResult[0] || { count: 0 }

    // Get unique sessions
    const uniqueSessionsResult = await sql`
      SELECT COUNT(DISTINCT session_id) as count 
      FROM analytics_events 
      WHERE created_at > ${dateThreshold.toISOString()}
    `
    const uniqueSessions = uniqueSessionsResult[0] || { count: 0 }

    // Get top events
    const topEvents = await sql`
      SELECT 
        event_name,
        event_category,
        COUNT(*) as count
      FROM analytics_events
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY event_name, event_category
      ORDER BY count DESC
      LIMIT 10
    `

    // Get events by day
    const eventsByDay = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM analytics_events
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Get device breakdown
    const deviceBreakdown = await sql`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM analytics_events
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY device_type
    `

    // Get browser breakdown
    const browserBreakdown = await sql`
      SELECT 
        browser,
        COUNT(*) as count
      FROM analytics_events
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY browser
    `

    // Calculate CTR (CTA clicks / page views)
    const ctaClicksResult = await sql`
      SELECT COUNT(*) as count
      FROM analytics_events
      WHERE event_name = 'cta_click'
      AND created_at > ${dateThreshold.toISOString()}
    `
    const ctaClicks = ctaClicksResult[0] || { count: 0 }
    const ctr = totalPageViews.count > 0 
      ? ((ctaClicks.count / totalPageViews.count) * 100).toFixed(2)
      : '0'

    // Calculate CVR (conversions / unique sessions)
    const conversionsResult = await sql`
      SELECT COUNT(DISTINCT session_id) as count
      FROM analytics_events
      WHERE event_name IN ('signup_success', 'form_submit')
      AND created_at > ${dateThreshold.toISOString()}
    `
    const conversions = conversionsResult[0] || { count: 0 }
    const cvr = uniqueSessions.count > 0
      ? ((conversions.count / uniqueSessions.count) * 100).toFixed(2)
      : '0'

    // Get funnel data
    const funnelData = await sql`
      SELECT 
        step,
        step_order,
        COUNT(DISTINCT session_id) as sessions,
        SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed
      FROM conversion_funnel
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY step, step_order
      ORDER BY step_order ASC
    `

    // Get recent events
    const recentEvents = await sql`
      SELECT 
        event_name,
        event_category,
        event_label,
        page_path,
        device_type,
        created_at
      FROM analytics_events
      WHERE created_at > ${dateThreshold.toISOString()}
      ORDER BY created_at DESC
      LIMIT 50
    `

    // Get top pages
    const topPages = await sql`
      SELECT 
        page_path,
        COUNT(*) as views,
        AVG(duration_seconds) as avg_duration
      FROM page_views
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `

    // Get referrer sources
    const referrerSources = await sql`
      SELECT 
        CASE 
          WHEN referrer = 'direct' THEN 'Direct'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          WHEN referrer LIKE '%twitter%' THEN 'Twitter'
          WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
      FROM page_views
      WHERE created_at > ${dateThreshold.toISOString()}
      GROUP BY source
      ORDER BY count DESC
    `

    return NextResponse.json({
      summary: {
        totalEvents: Number(totalEvents.count) || 0,
        totalPageViews: Number(totalPageViews.count) || 0,
        uniqueUsers: Number(uniqueUsers.count) || 0,
        uniqueSessions: Number(uniqueSessions.count) || 0,
        ctr: parseFloat(ctr),
        cvr: parseFloat(cvr)
      },
      topEvents: topEvents || [],
      eventsByDay: eventsByDay || [],
      deviceBreakdown: deviceBreakdown || [],
      browserBreakdown: browserBreakdown || [],
      funnelData: funnelData || [],
      recentEvents: recentEvents || [],
      topPages: topPages || [],
      referrerSources: referrerSources || []
    })
  } catch (error) {
    console.error('Analytics stats error:', error)
    return NextResponse.json({ error: 'Failed to get analytics stats' }, { status: 500 })
  }
}
