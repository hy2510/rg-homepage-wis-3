import RenewType from '@/util/string-utils'
export interface BoardNotice { 
  notifyId: string
  title: string
  readCount: number
  startDate: string
  endDate: string
  prevNotifyId: string
  nextNotifyId: string
  totalCount: number
  content: string
  originInsertFileName: string
  insertFileName: string
  originFileName: string
  fileName: string
  allYn: boolean
  customerYn: boolean
  topYn: boolean
  useHtmlYn: boolean
  notifyType: number
  registDate: string
  registStaffId: string
  registStaffName: string
  modifyDate: string
  modifyStaffId: string
  modifyStaffName: string
}

export function makeBoardNotice(json?: any): BoardNotice { 
  return { 
    notifyId: RenewType.renewString(json?.NotifyId), 
    title: RenewType.renewString(json?.Title), 
    readCount: RenewType.renewNumber(json?.ReadCount), 
    startDate: RenewType.renewString(json?.StartDate), 
    endDate: RenewType.renewString(json?.EndDate), 
    prevNotifyId: RenewType.renewString(json?.PrevNotifyId), 
    nextNotifyId: RenewType.renewString(json?.NextNotifyId), 
    totalCount: RenewType.renewNumber(json?.TotalCount), 
    content: RenewType.renewString(json?.Content), 
    originInsertFileName: RenewType.renewString(json?.OriginInsertFileName), 
    insertFileName: RenewType.renewString(json?.InsertFileName), 
    originFileName: RenewType.renewString(json?.OriginFileName), 
    fileName: RenewType.renewString(json?.FileName), 
    allYn: RenewType.renewBoolean(json?.AllYn), 
    customerYn: RenewType.renewBoolean(json?.CustomerYn), 
    topYn: RenewType.renewBoolean(json?.TopYn), 
    useHtmlYn: RenewType.renewBoolean(json?.UseHtmlYn), 
    notifyType: RenewType.renewNumber(json?.NotifyType), 
    registDate: RenewType.renewString(json?.RegistDate), 
    registStaffId: RenewType.renewString(json?.RegistStaffId), 
    registStaffName: RenewType.renewString(json?.RegistStaffName), 
    modifyDate: RenewType.renewString(json?.ModifyDate), 
    modifyStaffId: RenewType.renewString(json?.ModifyStaffId), 
    modifyStaffName: RenewType.renewString(json?.ModifyStaffName), 
  }
}
