import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } },
) {
  return await commonGet(`hint/${params.type}`, request.nextUrl.search)
}
