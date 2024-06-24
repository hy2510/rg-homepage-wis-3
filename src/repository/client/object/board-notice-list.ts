import RenewType from '@/util/string-utils'

export interface BoardNoticeList {
  notifyId: string
  title: string
  readCount: number
  startDate: string
  endDate: string
  prevNotifyId: string
  nextNotifyId: string
  registDate: string
  totalCount: number
}

export function makeBoardNoticeList(json?: any): BoardNoticeList {
  return {
    notifyId: RenewType.renewString(json?.NotifyId),
    title: RenewType.renewString(json?.Title),
    readCount: RenewType.renewNumber(json?.ReadCount),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
    prevNotifyId: RenewType.renewString(json?.PrevNotifyId),
    nextNotifyId: RenewType.renewString(json?.NextNotifyId),
    registDate: RenewType.renewString(json?.RegistDate),
    totalCount: RenewType.renewNumber(json?.TotalCount),
  }
}
