import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  oldPassword: string
  newPassword: string
}

type Output = {
  success: boolean
  code: number
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-password', {
    method: 'post',
    body: {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
      code: json.code,
    }
  })
}

export { action as postChangePassword }
export type { Output as ChangePasswordResponse }
