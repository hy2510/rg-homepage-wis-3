import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/signout', {
    method: 'delete',
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteSignout }
export type { Output as SignoutResponse }

function newInstance(): Output {
  return { success: false }
}
export { newInstance as newSignout }
