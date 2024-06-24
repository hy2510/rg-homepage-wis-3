import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'
import { searchBook } from '../search-book'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'year', 'month')
  const today = new Date()
  const year = parameter.getNumber('year', today.getFullYear())
  const month = parameter.getNumber('month', today.getMonth() + 1)

  return searchBook({
    searchRequest: Library.newBooks(token, { year, month }),
    isSearchNewBook: true,
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'year', 'month')
  const today = new Date()
  const year = parameter.getNumber('year', today.getFullYear())
  const month = parameter.getNumber('month', today.getMonth() + 1)

  const action = Library.newBooks(token, { year, month })
  const [payload, status, error] = await executeRequestAction(action)
  if (error) {
    return RouteResponse.commonError()
  }
  if (!status || status.status < 200 || status.status > 401) {
    return RouteResponse.commonError()
  }
  payload.EBook = payload.EBook?.map((book: any) => {
    const GetableRgPoint = book.BookPoint
    return {
      ...book,
      GetableRgPoint,
    }
  })
  payload.PBook = payload.PBook?.map((book: any) => {
    const GetableRgPoint = book.BookPoint
    return {
      ...book,
      GetableRgPoint,
    }
  })
  return RouteResponse.response(payload, status)
}
*/
