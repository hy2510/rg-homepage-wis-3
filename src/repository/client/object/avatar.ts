import RenewType from '@/util/string-utils'
export interface Avatar {
  avatarId: string
  nameKor: string
  nameEng: string
  nameVie: string
  birthDay: string
  home: string
  gender: string
  backgroundCSS: string
  imgAccountList: string
  sndAccountList: string
  imgAvatarList: string
  sndAvatarList: string
  imgEntranceMorning: string
  sndEntranceMorning: string
  imgEntranceAfternoon: string
  sndEntranceAfternoon: string
  imgEntranceEvening: string
  sndEntranceEvening: string
  imgEntranceNight: string
  sndEntranceNight: string
  imgHeader: string
  sndHeader: string
  imgTestRecord: string
  sndTestRecord: string
  deleteYn: boolean
  registDate: string
  imgTopNav: string
  sndTopNav: string
  imgRankingList1: string
  sndRankingList1: string
  imgRankingList2: string
  sndRankingList2: string
  backgroundColor: string
}

export function makeAvatar(json?: any): Avatar {
  return {
    avatarId: RenewType.renewString(json?.AvatarId),
    nameKor: RenewType.renewString(json?.NameKor),
    nameEng: RenewType.renewString(json?.NameEng),
    nameVie: RenewType.renewString(json?.NameVie),
    birthDay: RenewType.renewString(json?.BirthDay),
    home: RenewType.renewString(json?.Home),
    gender: RenewType.renewString(json?.Gender),
    backgroundCSS: RenewType.renewString(json?.BackgroundCSS),
    imgAccountList: RenewType.renewString(json?.ImgAccountList),
    sndAccountList: RenewType.renewString(json?.SndAccountList),
    imgAvatarList: RenewType.renewString(json?.ImgAvatarList),
    sndAvatarList: RenewType.renewString(json?.SndAvatarList),
    imgEntranceMorning: RenewType.renewString(json?.ImgEntranceMorning),
    sndEntranceMorning: RenewType.renewString(json?.SndEntranceMorning),
    imgEntranceAfternoon: RenewType.renewString(json?.ImgEntranceAfternoon),
    sndEntranceAfternoon: RenewType.renewString(json?.SndEntranceAfternoon),
    imgEntranceEvening: RenewType.renewString(json?.ImgEntranceEvening),
    sndEntranceEvening: RenewType.renewString(json?.SndEntranceEvening),
    imgEntranceNight: RenewType.renewString(json?.ImgEntranceNight),
    sndEntranceNight: RenewType.renewString(json?.SndEntranceNight),
    imgHeader: RenewType.renewString(json?.ImgHeader),
    sndHeader: RenewType.renewString(json?.SndHeader),
    imgTestRecord: RenewType.renewString(json?.ImgTestRecord),
    sndTestRecord: RenewType.renewString(json?.SndTestRecord),
    deleteYn: RenewType.renewBoolean(json?.DeleteYn),
    registDate: RenewType.renewString(json?.RegistDate),
    imgTopNav: RenewType.renewString(json?.ImgTopNav),
    sndTopNav: RenewType.renewString(json?.SndTopNav),
    imgRankingList1: RenewType.renewString(json?.ImgRankingList1),
    sndRankingList1: RenewType.renewString(json?.SndRankingList1),
    imgRankingList2: RenewType.renewString(json?.ImgRankingList2),
    sndRankingList2: RenewType.renewString(json?.SndRankingList2),
    backgroundColor: RenewType.renewString(json?.BackgroundColor),
  }
}
