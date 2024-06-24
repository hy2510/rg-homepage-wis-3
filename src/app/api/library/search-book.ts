import { NextResponse } from 'next/server'
import { ApiResponse } from '@/repository/server/utils'
import { RouteResponse, executeRequestAction } from '../_util'

export async function searchBook({
  searchRequest,
  isSearchNewBook = false,
  downloadRequest,
  filterUpdateRequest,
}: {
  searchRequest: Promise<ApiResponse>
  isSearchNewBook?: boolean
  downloadRequest?: Promise<ApiResponse>
  filterUpdateRequest?: Promise<ApiResponse>
}): Promise<NextResponse<unknown>> {
  // 도서 목록 검색
  const [payload, status, error] = await executeRequestAction(searchRequest)
  if (error) {
    return RouteResponse.commonError()
  }
  if (isErrorResponseStatus(status)) {
    return RouteResponse.commonError()
  }
  // 획득 가능한 포인트 계산
  if (!isSearchNewBook) {
    payload['Books'] = injectGetableRgPoint(payload['Books'])
  } else {
    payload['EBook'] = injectGetableRgPoint(payload['EBook'])
    payload['PBook'] = injectGetableRgPoint(payload['PBook'])
  }

  // 다운로드 링크 추가
  if (downloadRequest) {
    const [dwPayload, dwStatus, _dwError] =
      await executeRequestAction(downloadRequest)
    if (isOkResponseStatus(dwStatus)) {
      const downloadUrl = dwPayload.Url
      payload['ExcelDownload'] = downloadUrl
    }
  }

  // 필터 업데이트
  if (filterUpdateRequest) {
    await executeRequestAction(filterUpdateRequest)
  }

  return RouteResponse.response(payload, status)
}

function isOkResponseStatus({ status }: { status: number }) {
  return 200 <= status && status < 300
}

function isErrorResponseStatus({ status }: { status: number }) {
  return status < 200 || 401 < status
}

function injectGetableRgPoint(books: unknown[]): unknown[] {
  const bookRes = books.map((book: any) => {
    const bookPoint = Math.round(book.BookPoint * 100) / 100
    const earnPoint = Math.round(book.RgPointSum * 100) / 100
    const passCount = Number(book.RgPointCount)
    let GetableRgPoint = bookPoint
    if (passCount === 1 && earnPoint - bookPoint === 0) {
      GetableRgPoint = Math.round(bookPoint * 0.5 * 100) / 100
    } else if (passCount === 2) {
      GetableRgPoint = 0
    }
    return {
      ...book,
      GetableRgPoint,
    }
  })
  return bookRes
}
