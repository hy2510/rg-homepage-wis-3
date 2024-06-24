import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../../utils'

type Input = {
  levelRoundIds: string[]
  studentHistoryId: string
}

type Output = string

async function action(input: Input): Promise<ApiResponse<Output>> {
  let levelRoundIds = ''
  input.levelRoundIds.forEach((levelRoundId) => {
    levelRoundIds += `${levelRoundId}|`
  })
  const request = makeRequest('api/export/vocabulary', {
    method: 'get',
    queryString: {
      levelRoundIds,
      studentHistoryId: input.studentHistoryId,
    },
  })
  return await execute(request, (json): Output => {
    return json.Url
  })
}

export { action as getExportVocabulary }
