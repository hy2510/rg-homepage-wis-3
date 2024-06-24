import RenewType from '@/util/string-utils'
export interface RankPoint {
  no: number
  studentId: string
  loginId: string
  name: string
  nameEng: string
  gradeName: string
  className: string
  rgPoint: number
  bookCount: number
  classRank: number
  totalRank: number
  imgAvatarList: string
  avatarId: string
  imgRankingList2: string
}

export function makeRankPoint(json?: any): RankPoint {
  return {
    no: RenewType.renewNumber(json?.NO),
    studentId: RenewType.renewString(json?.StudentId),
    loginId: RenewType.renewString(json?.LoginId),
    name: RenewType.renewString(json?.Name),
    nameEng: RenewType.renewString(json?.NameEng),
    gradeName: RenewType.renewString(json?.GradeName),
    className: RenewType.renewString(json?.ClassName),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    classRank: RenewType.renewNumber(json?.ClassRank),
    totalRank: RenewType.renewNumber(json?.TotalRank),
    imgAvatarList: RenewType.renewString(json?.ImgAvatarList),
    avatarId: RenewType.renewString(json?.AvatarId),
    imgRankingList2: RenewType.renewString(json?.ImgRankingList2),
  }
}
