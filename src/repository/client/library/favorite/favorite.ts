import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  status?: string
  page?: number
}

type Output = {
  book: SearchBook[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
  download?: string
}

async function action(input?: Input): Promise<ApiResponse<Output>> {
  const status = input?.status || 'All'

  const request = makeRequest('api/library/favorite', {
    method: 'get',
    queryString: {
      status,
      page: input?.page || 1,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      book: json.Books.map((item: any): SearchBook => makeSearchBook(item)),
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
      download: json.ExcelDownload,
    }
  })
}

export { action as getFavorite }
export type { Output as FavoriteResponse }

function newInstance(): Output {
  return {
    book: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export { newInstance as newFavorite }
