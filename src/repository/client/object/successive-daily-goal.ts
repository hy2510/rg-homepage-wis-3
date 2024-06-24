import RenewType from '@/util/string-utils'

export interface SuccessiveDailyGoal {
  achievedCount: number
  achievedDate: string
}

export function makeSuccessiveDailyGoal(json?: any): SuccessiveDailyGoal {
  return {
    achievedCount: RenewType.renewNumber(json?.AchievedCount),
    achievedDate: RenewType.renewString(json?.AchievedDate),
  }
}
