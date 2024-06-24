import { commonPost } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  return await commonPost(`reading/complete`, data)
}
