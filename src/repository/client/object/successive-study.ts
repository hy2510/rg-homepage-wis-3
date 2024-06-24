import RenewType from '@/util/string-utils'

export interface SuccessiveStudy {
  straightDayCount: number
  achievedDate: string
}

export function makeSuccessiveStudy(json?: any): SuccessiveStudy {
  return {
    straightDayCount: RenewType.renewNumber(json?.StraightDayCount),
    achievedDate: RenewType.renewString(json?.AchievedDate),
  }
}
