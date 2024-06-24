import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'
import { searchBook } from '../../search-book'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'activity', 'status')
  const activity = parameter.getString('activity') as any
  const pStatus = parameter.getString('status', 'All') as any

  return searchBook({
    searchRequest: Library.searchDodoABCBook(token, {
      activity,
      status: pStatus,
    }),
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'activity', 'status')
  const activity = parameter.getString('activity') as any
  const pStatus = parameter.getString('status', 'All') as any

  const [payload, status, error] = await executeRequestAction(
    Library.searchDodoABCBook(token, { activity, status: pStatus }),
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
  return RouteResponse.response(payload, status)
}
*/
