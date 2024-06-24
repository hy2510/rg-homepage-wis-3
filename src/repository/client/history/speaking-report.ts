import { ApiResponse } from '@/http/common/response'
import { SpeakingReport, makeSpeakingReport } from '../object/speaking-report'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  startDate: string
  endDate: string
  status: string
}

type Output = SpeakingReport[]

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/history/speaking?startDate=${input.startDate}&endDate=${input.endDate}&status=${input.status}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, (json): Output => {
    return json.History.map((item: any) => {
      return makeSpeakingReport(item)
    })
  })
}

export { action as getSpeakingReport }
export type { Output as SpeakingReportResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newSpeakingReport }
