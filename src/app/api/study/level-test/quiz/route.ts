import { commonGet } from '@/app/api/study/level-test/common-api'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return await commonGet('quiz', request.nextUrl.search)
}
