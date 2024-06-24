import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Account from '@/repository/server/account'

export async function GET(request: NextRequest) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const parameter = await getParameters(request, 'type', 'keyword')
  const type = parameter.getString('type')
  if (type !== 'Email' && type !== 'Phone') {
    //TODO : Parameter Type ERROR
    return RouteResponse.commonError()
  }
  const keyword = parameter.getString('keyword')

  const [payload, status, error] = await executeRequestAction(
    Account.forgotId(customer, {
      type,
      keyword,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
