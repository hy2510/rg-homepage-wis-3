import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  keyword: string
  authCode: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/forgot/password-confirm',
    {
      method: 'post',
      body: {
        keyword: input.keyword,
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

export { action as postForgotPasswordConfirm }
export type { Output as ForgotPasswordConfirmResponse }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newForgotPasswordConfirm }
