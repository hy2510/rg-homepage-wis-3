import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  type: 'Email' | 'Id'
  keyword: string
}

type Output = {
  code: number
  email: string
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/forgot/password', {
    method: 'get',
    queryString: {
      type: input.type,
      keyword: input.keyword,
    },
  })
  return await execute(request, (json): Output => {
    return {
      code: json.code,
      email: json.email,
      success: json.success,
    }
  })
}

export { action as getForgotPassword }
export type { Output as ForgotPasswordResponse }

function newInstance(): Output {
  return { code: -1, email: '', success: false }
}
export { newInstance as newForgotPassword }
