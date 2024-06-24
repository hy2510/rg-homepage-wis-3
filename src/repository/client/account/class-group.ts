import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { ClassGroup, makeClassGroup } from '../object/class-group'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = ClassGroup[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/account/class/group', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return json?.ClassGroup?.map((item: any) => {
      return makeClassGroup(item)
    })
  })
}

export { action as getClassGroup }
export type { Output as ClassGroupResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newClassGroup }
