import RenewType from '@/util/string-utils'
export interface LevelTestInfo {
  isAvailableLevelTest: boolean
  isLatest: boolean
  latestLevelTestDate?: string
  latestLevelTestLevel?: string
  report?: string
}
export function makeLevelTestInfo(json?: any): LevelTestInfo {
  const latest = json?.Latest
  const isLatest = !!latest
  return {
    isAvailableLevelTest: RenewType.renewBoolean(json?.IsAvailableLevelTest),
    isLatest: isLatest,
    latestLevelTestDate: RenewType.renewString(latest?.LevelTestDate),
    latestLevelTestLevel: RenewType.renewString(latest?.LevelTestLevel),
    report: RenewType.renewString(latest?.LevelTestReport),
  }
}
