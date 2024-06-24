import { ApiResponse } from '@/http/common/response'
import {
  SuccessiveDailyGoal,
  makeSuccessiveDailyGoal,
} from '../object/successive-daily-goal'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = SuccessiveDailyGoal[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/successive-daily-goal', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json.Study.map((item: any) => makeSuccessiveDailyGoal(item))
  })
}

export { action as getSuccessiveDailyGoal }
export type { Output as SuccessiveDailyGoalResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSuccessiveDailyGoal }
