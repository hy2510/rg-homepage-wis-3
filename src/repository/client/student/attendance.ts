import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = { deviceType: string; mobileYn: string }

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/attendance', {
    method: 'put',
    body: {
      deviceType: input.deviceType,
      mobileYn: input.mobileYn,
    },
  })
  return await execute(request, (json): Output => {
    return { success: json.success }
  })
}

export { action as putAttendance }
