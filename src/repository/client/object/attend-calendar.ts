import RenewType from '@/util/string-utils'
export interface AttendCalendar { 
  studentId: string
  regDate: string
  attendDate: string
  loginIp: string
  mobileYn: string
  deviceType: string
  validYn: boolean
  totalAttendCount: number
  levelUpLevel: string
  studyCountHundred: number
  today: string
}

export function makeAttendCalendar(json?: any): AttendCalendar { 
  return { 
    studentId: RenewType.renewString(json?.StudentId), 
    regDate: RenewType.renewString(json?.RegDate), 
    attendDate: RenewType.renewString(json?.AttendDate), 
    loginIp: RenewType.renewString(json?.LoginIp), 
    mobileYn: RenewType.renewString(json?.MobileYn), 
    deviceType: RenewType.renewString(json?.DeviceType), 
    validYn: RenewType.renewBoolean(json?.ValidYn), 
    totalAttendCount: RenewType.renewNumber(json?.TotalAttendCount), 
    levelUpLevel: RenewType.renewString(json?.LevelUpLevel), 
    studyCountHundred: RenewType.renewNumber(json?.StudyCountHundred), 
    today: RenewType.renewString(json?.Today), 
  }
}
