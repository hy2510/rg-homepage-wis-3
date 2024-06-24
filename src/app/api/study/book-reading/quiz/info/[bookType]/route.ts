import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookType: string } },
) {
  return await commonGet(`${params.bookType}`, request.nextUrl.search)
}
