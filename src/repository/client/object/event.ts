import RenewType from '@/util/string-utils'
export interface Event {
  eventId: string
  eventTitle: string
  startDate: string
  endDate: string
}
export function makeEvent(json?: any): Event {
  return {
    eventId: RenewType.renewString(json?.EventId),
    eventTitle: RenewType.renewString(json?.EventTitle),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
  }
}
