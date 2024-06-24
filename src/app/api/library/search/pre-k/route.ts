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

  const parameter = await getParameters(request, 'activity', 'status', 'page')
  const activity = parameter.getString('activity') as any
  const pStatus = parameter.getString('status', 'All') as any
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchPreKBook(token, {
      activity,
      status: pStatus,
      page,
    }),
    filterUpdateRequest: Library.changeFilterPk(token, {
      course: activity,
    }),
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'activity', 'status', 'page')
  const activity = parameter.getString('activity') as any
  const pStatus = parameter.getString('status', 'All') as any
  const page = parameter.getNumber('page', 1)

  const [payload, status, error] = await executeRequestAction(
    Library.searchPreKBook(token, { activity, status: pStatus, page }),
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
  await executeRequestAction(
    Library.changeFilterPk(token, {
      course: activity,
    }),
  )
  return RouteResponse.response(payload, status)
}
*/
