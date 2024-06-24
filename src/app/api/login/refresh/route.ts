import {
  deleteTokenWithCookie,
  getAuthorizationWithCookie,
  setTokenWithCookie,
} from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest, NextResponse } from 'next/server'
import { postRefreshToken } from '@/repository/server/api'

export async function POST(request: NextRequest) {
  const authorization = getAuthorizationWithCookie()

  if (!authorization.token) {
    return NextResponse.json({ message: 'Not found token.' }, { status: 400 })
  }
  const token = authorization.token

  // 사용자 인증 정보
  const apiRes = await postRefreshToken(token.accessToken, {
    refreshToken: token.refreshToken,
  })

  if (apiRes.ok) {
    const token = {
      ...apiRes.data!,
      tag: 'tag-blabla',
    }
    // 사용자 인증 성공 시 쿠키에 토큰 추가
    const nextResponse = setTokenWithCookie(
      NextResponse.json(token, { status: 200 }),
      token!,
    )
    return nextResponse
  } else {
    // 인증 실패 시 401 리턴

    const nextResponse = deleteTokenWithCookie(
      NextResponse.json({ message: 'Invalidate token.' }, { status: 400 }),
    )
    return nextResponse
  }
}
