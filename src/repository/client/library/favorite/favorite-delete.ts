import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  levelRoundIds: string[]
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  let levelRoundIds = ''
  input.levelRoundIds.forEach((levelRoundId) => {
    levelRoundIds += `${levelRoundId}|`
  })
  const request = makeRequest(
    `api/library/favorite?levelRoundIds=${levelRoundIds}`,
    {
      method: 'delete',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteFavorite }
