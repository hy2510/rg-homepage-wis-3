import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  type:
    | 'All'
    | 'StartScreen'
    | 'ViewStep3Hint'
    | 'ViewStep2Skip'
    | 'EBKListenRepeat'
    | 'EB1ListenRepeat'
  startScreen?: string
  isEbkListenRepeat?: boolean
  isEb1ListenRepeat?: boolean
  isViewStep3Hint?: boolean
  isViewStep2Skip?: boolean
  studyReadingUnitId?: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-study-setting', {
    method: 'post',
    body: {
      type: input.type,
      startScreen: input.startScreen,
      isEbkListenRepeat: input.isEbkListenRepeat,
      isEb1ListenRepeat: input.isEb1ListenRepeat,
      isViewStep3Hint: input.isViewStep3Hint,
      isViewStep2Skip: input.isViewStep2Skip,
      studyReadingUnitId: input.studyReadingUnitId,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return { success: json.success }
  })
}

export { action as postChangeStudySetting }
export type { Output as ChangeStudySettingResponse }
