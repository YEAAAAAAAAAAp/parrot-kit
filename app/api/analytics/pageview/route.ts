import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const pageData = await req.json()

    await sql`
      INSERT INTO page_views (
        page_path, session_id, user_id, referrer, device_type
      ) VALUES (
        ${pageData.page_path},
        ${pageData.session_id},
        ${pageData.user_id},
        ${pageData.referrer},
        ${pageData.device_type}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page view tracking error:', error)
    return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 })
  }
}
