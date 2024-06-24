import { ApiResponse } from '@/http/common/response'
import { StudyReport, makeStudyReport } from '../object/study-report'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  startDate?: string
  endDate?: string
  keyword: string
  status: string
}

type Output = {
  history: StudyReport[]
  download?: string
  performanceReport?: string
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const dateParams =
    input.startDate && input.endDate
      ? `&startDate=${input.startDate}&endDate=${input.endDate}`
      : ''
  const request = makeRequest(
    `api/history/study?type=Search&keyword=${input.keyword}&status=${input.status}${dateParams}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      history: json.History.map((item: any) => {
        return makeStudyReport(item)
      }),
      download: json.ExcelDownload,
      performanceReport: json.PerformanceReport,
    }
  })
}

export { action as getStudyReportSearch }
export type { Output as StudyReportResponse }

function newInstance(): Output {
  return {
    history: [],
  }
}
export { newInstance as newStudyReport }
