import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const funnelData = await req.json()

    await sql`
      INSERT INTO conversion_funnel (
        session_id, step, step_order, completed
      ) VALUES (
        ${funnelData.session_id},
        ${funnelData.step},
        ${funnelData.step_order},
        ${funnelData.completed}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Funnel tracking error:', error)
    return NextResponse.json({ error: 'Failed to track funnel' }, { status: 500 })
  }
}
