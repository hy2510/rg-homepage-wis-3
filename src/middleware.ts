import { NextRequest } from 'next/server'
import localizationMiddleware from './localization/localization-middleware'

export function middleware(request: NextRequest) {
  const localizationMiddlewareResult = localizationMiddleware(request)
  if (localizationMiddlewareResult) {
    return localizationMiddlewareResult
  }
}

export const config = {
  matcher: [
    /*
     * 다음과 같이 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - public 폴더 하위 집합 (assets, favicon, manifast, src .. 등등)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|faviconL.png|faviconL.svg|faviconM.png|faviconM.svg|faviconS.png|faviconS.svg|manifest.json|public|rg-study-result|src|study).*)',
  ],
}
