import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { SearchCustomer, makeSearchCustomer } from '../object/search-customer'
import { makeRequest } from '../utils'

type Input = {
  keyword?: string
  type?: string
  countryCode?: string
}

type Output = SearchCustomer[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/customer/search', {
    method: 'get',
    queryString: {
      type: input.type,
      keyword: input.keyword,
      countryCode: input.countryCode,
    },
  })
  return await execute(request, (json): Output => {
    return json.Customers.map((item: any) => {
      return makeSearchCustomer(item)
    })
  })
}

export { action as getSearchCustomer }
export type { Output as SearchCustomerResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSearchCustomer }
