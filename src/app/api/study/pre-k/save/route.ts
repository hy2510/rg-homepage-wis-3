import { commonPost } from '@/app/api/study/pre-k/common-api'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  return await commonPost(`save`, data)
}
