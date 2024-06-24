import RenewType from '@/util/string-utils'
export interface RankReadingking { 
  num: number
  loginId: string
  studentName: string
  schoolName: string
  customerName: string
  rgPoint: number
  studyDay: number
  bookCount: number
  studentId: string
  totalRank: number
  avatarId: string
  imgAvatarRankingList: string
  gradeName: string
}

export function makeRankReadingking(json?: any): RankReadingking { 
  return { 
    num: RenewType.renewNumber(json?.Num), 
    loginId: RenewType.renewString(json?.LoginId), 
    studentName: RenewType.renewString(json?.StudentName), 
    schoolName: RenewType.renewString(json?.SchoolName), 
    customerName: RenewType.renewString(json?.CustomerName), 
    rgPoint: RenewType.renewNumber(json?.RgPoint), 
    studyDay: RenewType.renewNumber(json?.StudyDay), 
    bookCount: RenewType.renewNumber(json?.BookCount), 
    studentId: RenewType.renewString(json?.StudentId), 
    totalRank: RenewType.renewNumber(json?.TotalRank), 
    avatarId: RenewType.renewString(json?.AvatarId), 
    imgAvatarRankingList: RenewType.renewString(json?.ImgAvatarRankingList), 
    gradeName: RenewType.renewString(json?.GradeName), 
  }
}
