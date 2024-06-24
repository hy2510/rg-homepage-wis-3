import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Export from '@/repository/server/export'
import History from '@/repository/server/history'
import { RouteResponse, executeRequestAction, getParameters } from '../../_util'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'type',
    'keyword',
    'startDate',
    'endDate',
    'status',
  )

  const type = parameter.getString('type', '')
  const keyword = parameter.getString('keyword', '')
  const startDate = parameter.getString('startDate', '')
  const endDate = parameter.getString('endDate', '')
  const pStatus = parameter.getString('status', '')

  const action =
    type === 'Date'
      ? History.studyReport(token, {
          startDate,
          endDate,
          status: pStatus,
        })
      : History.studyReportSearch(token, {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          keyword,
          status: pStatus,
        })
  const [payload, status, error] = await executeRequestAction(action)

  const [exPayload, exStatus, exError] = await executeRequestAction(
    Export.reportExcel(token, {
      startDate,
      endDate,
      status: pStatus,
      keyword,
    }),
  )
  if (exStatus && exStatus.status >= 200 && exStatus.status < 300) {
    const downloadUrl = exPayload.Url
    payload['ExcelDownload'] = downloadUrl
  }

  const [ex2Payload, ex2Status, ex2Error] = await executeRequestAction(
    Export.performance(token, {
      startDate,
      endDate,
    }),
  )
  if (ex2Status && ex2Status.status >= 200 && ex2Status.status < 300) {
    const performanceUrl = ex2Payload.Url
    payload['PerformanceReport'] = performanceUrl
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
