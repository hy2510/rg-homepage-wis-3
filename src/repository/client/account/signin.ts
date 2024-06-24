import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  id: string
  password: string
  deviceType: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/signin', {
    method: 'post',
    body: {
      id: input.id,
      password: input.password,
      deviceType: input.deviceType,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as postSignin }
export type { Output as SigninResponse }

function newInstance(): Output {
  return { success: false }
}
export { newInstance as newSignin }
