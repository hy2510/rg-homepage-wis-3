import { executeWithAuth, makeRequest } from '../../utils'
import { ApiResponse } from '@/http/common/response'
import { SearchBook } from '../../object/search-book'

type Input = {}

type Output = {
  success: boolean
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/library/favorite?isAll=Y', {
    method: 'delete',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteFavoriteAll }
