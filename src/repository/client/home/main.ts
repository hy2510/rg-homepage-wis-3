import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { Main, makeMain } from '../object/main'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = Main

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/home', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return makeMain(json)
  })
}

export { action as getMain }
export type { Output as MainResponse }
