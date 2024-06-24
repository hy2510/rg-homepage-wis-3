import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  levelRoundId: string
  studyId: string
  studentHistoryId: string
  classId: string
  mode: string
}

type Output = {
  success: boolean
  code: number
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/library/book-info/study-mode', {
    method: 'post',
    body: {
      levelRoundId: input.levelRoundId,
      studyId: input.studyId,
      studentHistoryId: input.studentHistoryId,
      classId: input.classId,
      mode: input.mode,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json?.success || false,
      code: json?.code || -1,
    }
  })
}

export { action as postStudyMode }
export type { Output as StudyModeResponse }
