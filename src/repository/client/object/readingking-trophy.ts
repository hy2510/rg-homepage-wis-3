import RenewType from '@/util/string-utils'

export interface ReadingKingTrophy {
  prizeTitle: string
  prizeGrade: number
  registDate: string
}

export function makeReadingKingTrophy(json?: any): ReadingKingTrophy {
  return {
    prizeTitle: RenewType.renewString(json?.PrizeTitle),
    prizeGrade: RenewType.renewNumber(json?.PrizeGrade),
    registDate: RenewType.renewString(json?.PrizeDate),
  }
}
