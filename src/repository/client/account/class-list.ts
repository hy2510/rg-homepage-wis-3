import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { Class, makeClass } from '../object/class'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  classGroupId: string
}

type Output = Class[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/class', {
    method: 'get',
    queryString: {
      classGroupId: input.classGroupId,
    },
  })
  return await execute(request, (json): Output => {
    return json?.Class?.map((item: any) => {
      return makeClass(item)
    })
  })
}

export { action as getClassList }
export type { Output as ClassListResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newClassList }
