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
  const parameter = await getParameters(
    request,
    'bookType',
    'searchText',
    'page',
  )
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchKeyword(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      searchText,
      page,
    }),
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const parameter = await getParameters(
    request,
    'bookType',
    'searchText',
    'page',
  )
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const page = parameter.getNumber('page', 1)

  const [payload, status, error] = await executeRequestAction(
    Library.searchKeyword(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      searchText,
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
  return RouteResponse.response(payload, status)
}
*/
