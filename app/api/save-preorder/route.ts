import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, timestamp, amount, currency } = body

    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: 여기에 실제 데이터베이스 저장 로직 추가
    // 예시: await db.preorders.create({ email, timestamp, amount, currency })
    
    // 임시로 콘솔에 로그 출력
    console.log('💰 New Preorder:', {
      email,
      timestamp,
      amount,
      currency,
      date: new Date(timestamp).toLocaleString()
    })

    // TODO: 이메일 발송 로직 추가 (선택사항)
    // 예시: await sendWelcomeEmail(email)

    return NextResponse.json({
      success: true,
      message: 'Preorder saved successfully'
    })
  } catch (error) {
    console.error('Error saving preorder:', error)
    return NextResponse.json(
      { error: 'Failed to save preorder' },
      { status: 500 }
    )
  }
}
