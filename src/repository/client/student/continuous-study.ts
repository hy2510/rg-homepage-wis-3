import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = {
  continuous: number
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/continuous-study', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      continuous: json?.ContinuousStudy || 0,
    }
  })
}

export { action as getContinuousStudy }
export type { Output as LevelTestInfoResponse }

function newInstance(): Output {
  return {
    continuous: 0,
  }
}
export { newInstance as newContinuousStudy }
