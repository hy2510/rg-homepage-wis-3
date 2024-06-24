import { executeWithAuth, makeRequest } from '../utils'
import { ApiResponse } from '@/http/common/response'
import { LevelBook, makeLevelBook } from '../object/level-book'

type Input = {}

type Output = {
  EB: LevelBook[]
  PB: LevelBook[]
  PreK: LevelBook[]
  DodoABC: LevelBook[]
  Movie: LevelBook[]
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/achievement/level-books', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      EB: json.EB.map((item: any) => makeLevelBook(item)),
      PB: json.PB.map((item: any) => makeLevelBook(item)),
      PreK: json.PreK.map((item: any) => makeLevelBook(item)),
      DodoABC: json.DodoABC.map((item: any) => makeLevelBook(item)),
      Movie: json.Movie.map((item: any) => makeLevelBook(item)),
    }
  })
}

export { action as getLevelBooks }
export type { Output as LevelBookResponse }

function newInstance(): Output {
  return {
    EB: [],
    PB: [],
    PreK: [],
    DodoABC: [],
    Movie: [],
  }
}
export { newInstance as newLevelBooks }
