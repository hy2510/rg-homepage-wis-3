import { ApiResponse } from '@/http/common/response'
import {
  SuccessiveStudy,
  makeSuccessiveStudy,
} from '../object/successive-study'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = SuccessiveStudy[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/successive-study', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Study.map((item: any) => makeSuccessiveStudy(item))
  })
}

export { action as getSuccessiveStudy }
export type { Output as SuccessiveStudyResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSuccessiveStudy }
