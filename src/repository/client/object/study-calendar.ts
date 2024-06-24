import RenewType from '@/util/string-utils'
export interface StudyCalendar {
  studentId: string
  aimPoint: number
  settingBooks: number
  totalPoint: number
  totalBooks: number
  endDateCount: number
  endDate: string
  point: number
  books: number
  regDate: string
  validYn: boolean
  successYn: boolean
  diffMonth: number
  settingType: string
  changeYn: boolean
  today: string
}

export function makeStudyCalendar(json?: any): StudyCalendar {
  return {
    studentId: RenewType.renewString(json?.StudentId),
    aimPoint: RenewType.renewNumber(json?.AimPoint),
    settingBooks: RenewType.renewNumber(json?.SettingBooks),
    totalPoint: RenewType.renewNumber(json?.TotalPoint),
    totalBooks: RenewType.renewNumber(json?.TotalBooks),
    endDateCount: RenewType.renewNumber(json?.EndDateCount),
    endDate: RenewType.renewString(json?.EndDate),
    point: RenewType.renewNumber(json?.POINT),
    books: RenewType.renewNumber(json?.Books),
    regDate: RenewType.renewString(json?.RegDate),
    validYn: RenewType.renewBoolean(json?.ValidYn),
    successYn: RenewType.renewBoolean(json?.SuccessYn),
    diffMonth: RenewType.renewNumber(json?.DiffMonth),
    settingType: RenewType.renewString(json?.SettingType),
    changeYn: RenewType.renewBoolean(json?.ChangeYn),
    today: RenewType.renewString(json?.Today),
  }
}
