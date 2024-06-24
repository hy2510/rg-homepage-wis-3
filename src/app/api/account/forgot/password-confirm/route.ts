import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Account from '@/repository/server/account'

export async function POST(request: NextRequest) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const parameter = await getBodyParameters(request, 'keyword', 'authCode')
  const keyword = parameter.getString('keyword')
  const authCode = parameter.getString('authCode')

  const [payload, status, error] = await executeRequestAction(
    Account.forgotPasswordConfirm(customer, {
      keyword,
      authCode,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
