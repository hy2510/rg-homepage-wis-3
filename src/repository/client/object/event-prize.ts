import RenewType from '@/util/string-utils'
export interface EventPrize {
  eventId: string
  eventPrizeId: string
  prizePoint: number
  prizeTitle: string
  prizeDays: number
}
export function makeEventPrize(json?: any): EventPrize {
  return {
    eventId: RenewType.renewString(json?.EventId),
    eventPrizeId: RenewType.renewString(json?.EventPrizeId),
    prizePoint: RenewType.renewNumber(json?.PrizePoint),
    prizeTitle: RenewType.renewString(json?.PrizeTitle),
    prizeDays: RenewType.renewNumber(json?.PrizeDays),
  }
}
