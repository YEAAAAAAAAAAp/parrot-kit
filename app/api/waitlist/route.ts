import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { UserRole } from '@/lib/role'

const validRoles = Object.values(UserRole)

export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json()

    if (!email || !validRoles.includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role or email' },
        { status: 400 }
      )
    }

    await sql`
      INSERT INTO users (name, email, role)
      VALUES (${name}, ${email}, ${role})
      ON CONFLICT (email) DO NOTHING
    `

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
