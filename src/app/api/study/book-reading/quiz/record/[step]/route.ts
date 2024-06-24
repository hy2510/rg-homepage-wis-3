import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { step: string } },
) {
  return await commonGet(`record/${params.step}`, request.nextUrl.search)
}
