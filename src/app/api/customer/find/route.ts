import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { NextRequest } from 'next/server'
import Common from '@/repository/server/common'

export async function GET(request: NextRequest) {
  const parameter = await getParameters(request, 'customerId')
  const customerId = parameter.getString('customerId')

  const [payload, status, error] = await executeRequestAction(
    Common.findCustomer({ customerId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
