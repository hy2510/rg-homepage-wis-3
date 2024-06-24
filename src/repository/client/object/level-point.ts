import RenewType from '@/util/string-utils'
export interface LevelPoint {
  levelName: string
  nextLevelName: string
  point: number
  books: number
  myRgPoint: number
  requiredRgPoint: number
  remainingRgPoint: number
  levelCode: string
  levelId: string
}
export function makeLevelUpStatus(json?: any): LevelPoint {
  return {
    levelName: RenewType.renewString(json?.LevelName),
    nextLevelName: RenewType.renewString(json?.NextLevelName),
    point: RenewType.renewNumber(json?.Point),
    books: RenewType.renewNumber(json?.Books),
    myRgPoint: RenewType.renewNumber(json?.MyRgPoint),
    requiredRgPoint: RenewType.renewNumber(json?.RequiredRgPoint),
    remainingRgPoint: RenewType.renewNumber(json?.RemainingRgPoint),
    levelCode: RenewType.renewString(json?.LevelCode),
    levelId: RenewType.renewString(json?.LevelId),
  }
}
