import { deleteTokenWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  const nextResponse = deleteTokenWithCookie(
    NextResponse.json({ success: true }, { status: 201 }),
  )
  return nextResponse
}
