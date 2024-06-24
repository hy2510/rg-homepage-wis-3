import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import { RouteResponse, executeRequestAction } from '../../../_util'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const notifyId = params.id

  const [payload, status, error] = await executeRequestAction(
    Home.noticeDetail(customer, { id: notifyId }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
