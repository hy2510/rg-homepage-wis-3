import { BookInfo, makeBookInfo } from '../../object/book-info'
import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'

type Input = {
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
}

type Output = BookInfo

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/book-info`, {
    method: 'get',
    queryString: {
      levelRoundId: input.levelRoundId,
      studyId: input.studyId,
      studentHistoryId: input.studentHistoryId,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return makeBookInfo(json)
  })
}

export { action as getBookInfo }
export type { Output as BookInfoResponse }

function newInstance(): Output {
  return makeBookInfo()
}
export { newInstance as newBookInfo }
