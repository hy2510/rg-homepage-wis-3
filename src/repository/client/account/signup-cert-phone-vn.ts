import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  phone: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/signup/phone-certification-vn',
    {
      method: 'post',
      body: {
        phone: input.phone,
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

export { action as postSignupCertPhone_VN }
export type { Output as SignupCertPhone_VN }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newSignupCertPhone_VN }
