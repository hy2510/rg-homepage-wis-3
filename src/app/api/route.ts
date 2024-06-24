import { NextRequest, NextResponse } from 'next/server'
import { getParameters } from './_util'

export async function GET(request: NextRequest) {
  console.log(request.cookies.get('lang')?.value)

  const parameter = await getParameters(request, 'status', 'time')
  const status = parameter.getNumber('status', 200)
  const time = parameter.getNumber('time', 1000)

  const timer = new Promise((resolve) => {
    setTimeout(() => {
      resolve(0)
    }, time)
  })
  await timer
  return NextResponse.json({}, { status })
}
