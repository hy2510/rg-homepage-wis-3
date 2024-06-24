import { ApiResponse } from '@/http/common/response'
import { SearchBook, makeSearchBook } from '../object/search-book'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  year: number
  month: number
}

type Output = {
  EB: SearchBook[]
  PB: SearchBook[]
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/library/new-books', {
    method: 'get',
    queryString: {
      ...input,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      EB: json.EBook ? json.EBook.map((item: any) => makeSearchBook(item)) : [],
      PB: json.PBook ? json.PBook.map((item: any) => makeSearchBook(item)) : [],
    }
  })
}

export { action as getNewBooks }
export type { Output as NewBooksResponse }

function newInstance(): Output {
  return {
    EB: [],
    PB: [],
  }
}
export { newInstance as newNewBooks }
