import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../../object/search-book'

type Input = {
  activity: string
  status?: string
}

type Output = {
  book: SearchBook[]
}

async function action({
  activity,
  status = '',
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/dodoabc?activity=${activity}&status=${status}`,
    {
      method: 'get',
    }
  )
  return await executeWithAuth(request, (json): Output => {
    return {
      book: json.Books.map((item: any) => makeSearchBook(item)),
    }
  })
}

export { action as getSearchDodoABCBook }
export type { Output as SearchDodoABCBookResponse }

function newInstance(): Output {
  return {
    book: [],
  }
}
export { newInstance as newSearchDodoABC }
