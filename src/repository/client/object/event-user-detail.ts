import RenewType from '@/util/string-utils'
export interface EventUserDetail {
  studentId: string
  startDate: string
  endDate: string
  eventPrizeId: string
  eventId: string
  eventTitle: string
  prizeTitle: string
  aimPoint: number
  aimDays: number
  totalPoint: number
  totalBooks: number
  totalReadingDays: number
  totalDays: number
  remainingDays: number
  spnPeriod: number
  spnProgressing: number
  viewEventDaysProgressYn: boolean
}
export function makeEventuserDetail(json?: any): EventUserDetail {
  return {
    studentId: RenewType.renewString(json?.StudentId),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
    eventPrizeId: RenewType.renewString(json?.EventPrizeId),
    eventId: RenewType.renewString(json?.EventId),
    eventTitle: RenewType.renewString(json?.EventTitle),
    prizeTitle: RenewType.renewString(json?.PrizeTitle),
    aimPoint: RenewType.renewNumber(json?.AimPoint),
    aimDays: RenewType.renewNumber(json?.AimDays),
    totalPoint: RenewType.renewNumber(json?.TotalPoint),
    totalBooks: RenewType.renewNumber(json?.TotalBooks),
    totalReadingDays: RenewType.renewNumber(json?.TotalReadingDays),
    totalDays: RenewType.renewNumber(json?.TotalDays),
    remainingDays: RenewType.renewNumber(json?.RemainingDays),
    spnPeriod: RenewType.renewNumber(json?.SpnPeriod),
    spnProgressing: RenewType.renewNumber(json?.SpnProgressing),
    viewEventDaysProgressYn: RenewType.renewBoolean(
      json?.ViewEventDaysProgressYn
    ),
  }
}
