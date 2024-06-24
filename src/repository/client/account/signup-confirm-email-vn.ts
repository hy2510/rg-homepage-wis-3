import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  email: string
  authCode: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/signup/email-confirm-vn',
    {
      method: 'post',
      body: {
        email: input.email,
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

export { action as postSignupConfirmEmail_VN }
export type { Output as SignupConfirmEmail_VN }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newSignupConfirmEmail_VN }
