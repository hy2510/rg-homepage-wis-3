import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  email: string
  phone: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/signup/signup-vn', {
    method: 'post',
    body: {
      email: input.email,
      phone: input.phone,
    },
  })
  return await execute(request, (json): Output => {
    return {
      code: json.code,
      success: json.success,
    }
  })
}

export { action as postSignup_VN }
export type { Output as Signup_VN }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newSignup_VN }
