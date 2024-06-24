import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { quizType: string } },
) {
  return await commonGet(`quiz/${params.quizType}`, request.nextUrl.search)
}
