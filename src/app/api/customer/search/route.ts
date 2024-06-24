import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { NextRequest } from 'next/server'
import Common from '@/repository/server/common'

export async function GET(request: NextRequest) {
  const parameter = await getParameters(
    request,
    'keyword',
    'type',
    'countryCode',
  )
  const keyword = parameter.getString('keyword')
  const customerType = parameter.getString('type')
  const countryCode = parameter.getString('countryCode')

  const [payload, status, error] = await executeRequestAction(
    Common.searchCustomer({
      keyword,
      customerUse: customerType,
      countryCode,
    }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
