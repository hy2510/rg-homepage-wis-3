import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  email: string
  password: string
  studentName: string
}

type Output = {
  code: number
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/signup/email-certification',
    {
      method: 'post',
      body: {
        email: input.email,
        password: input.password,
        studentName: input.studentName,
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

export { action as postSignupCertEmail }
export type { Output as SignupCertEmail }

function newInstance(): Output {
  return { code: -1, success: false }
}
export { newInstance as newSignupCertEmail }
