import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = { customerId: string }

type Output = string

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/customer/find', {
    method: 'get',
    queryString: {
      customerId: input.customerId,
    },
  })
  return await execute(request, (json): Output => {
    return JSON.stringify(json)
  })
}

export { action as getFindCustomer }
