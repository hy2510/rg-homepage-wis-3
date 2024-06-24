import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  level: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/daily-learning', {
    method: 'put',
    queryString: {
      type: 'LEVEL',
      level: input.level,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as putStudentDailyLearningSaveLevel }
