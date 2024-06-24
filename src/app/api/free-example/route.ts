import { getFreeExample } from '@/repository/server/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const response = await getFreeExample()
  if (response.ok) {
    let output = {}
    if (response.data) {
      output = response.data
    }
    return NextResponse.json(output, { status: response.status })
  }
  let output = {}
  if (response.extra) {
    output = response.extra
  }
  return NextResponse.json(output, { status: response.status })
}
