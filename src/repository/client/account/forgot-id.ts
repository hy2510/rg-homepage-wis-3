import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { ForgotId, makeForgotId } from '../object/forgot-id'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  type: 'Email' | 'Phone'
  keyword: string
}

type Output = ForgotId[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/forgot/id', {
    method: 'get',
    queryString: {
      type: input.type,
      keyword: input.keyword,
    },
  })
  return await execute(request, (json): Output => {
    return json?.ID?.map((item: any) => {
      return makeForgotId(item)
    })
  })
}

export { action as getForgotId }
export type { Output as ForgotIdResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newForgotId }
