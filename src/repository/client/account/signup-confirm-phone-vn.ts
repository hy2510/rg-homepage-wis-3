import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  phone: string
  authCode: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/signup/phone-confirm-vn',
    {
      method: 'post',
      body: {
        phone: input.phone,
        authCode: input.authCode,
      },
    },
  )
  return await execute(request, (json): Output => {
    return {
      code: json.code,
      success: json.success,
    }
  })
}

export { action as postSignupConfirmPhone_VN }
export type { Output as SignupConfirmPhone_VN }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newSignupConfirmPhone_VN }
