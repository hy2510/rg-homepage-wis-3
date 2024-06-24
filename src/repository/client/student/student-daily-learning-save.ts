import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  type: string
  level: string
  value: number
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/daily-learning', {
    method: 'put',
    queryString: {
      type: input.type,
      level: input.level,
      value: input.value,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as putStudentDailyLearningSave }
