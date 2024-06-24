import RenewType from '@/util/string-utils'
export interface LevelBook {
  levelCode: string
  levelName: string
  studyTypeCode: string
  studyTypeName: string
  books: number
  completedBooks: number
  totalBooks: number
}
export function makeLevelBook(json?: any): LevelBook {
  return {
    levelCode: RenewType.renewString(json?.LevelCode),
    levelName: RenewType.renewString(json?.LevelName),
    studyTypeCode: RenewType.renewString(json?.StudyTypeCode),
    studyTypeName: RenewType.renewString(json?.StudyTypeName),
    books: RenewType.renewNumber(json?.Books),
    completedBooks: RenewType.renewNumber(json?.CompletedBooks),
    totalBooks: RenewType.renewNumber(json?.TotalBooks),
  }
}
