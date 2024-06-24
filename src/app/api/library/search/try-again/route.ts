import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Export from '@/repository/server/export'
import Library from '@/repository/server/library'
import { searchBook } from '../../search-book'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'page')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchTryAgain(token, {
      page,
    }),
    downloadRequest: Export.searchExcel(token, {
      status: 'Fail',
    }),
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'page')
  const page = parameter.getNumber('page', 1)

  const [payload, status, error] = await executeRequestAction(
    Library.searchTryAgain(token, {
      page,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  if (!status || status.status < 200 || status.status > 401) {
    return RouteResponse.commonError()
  }
  payload.Books = payload.Books.map((book: any) => {
    const GetableRgPoint = book.BookPoint
    return {
      ...book,
      GetableRgPoint,
    }
  })
  const [dwPayload, dwStatus, dwError] = await executeRequestAction(
    Export.searchExcel(token, {
      status: 'Fail',
    }),
  )
  if (dwStatus && dwStatus.status >= 200 && dwStatus.status < 300) {
    const downloadUrl = dwPayload.Url
    payload['ExcelDownload'] = downloadUrl
  }

  return RouteResponse.response(payload, status)
}
*/
